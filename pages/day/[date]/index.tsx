import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DayBody from "../../../components/Day/DayBody/DayBody";
import DayHeader from "../../../components/Day/DayHeader";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { string } from "yup";

export const getStaticPaths: GetStaticPaths = async () => {
  // const res = await fetch("api/workouts");
  // const data = await res.json();

  const querySnapshot = await getDocs(collection(db, "workouts"));
  let idArr: Record<string, string>[] = [];
  await querySnapshot.forEach((doc) => {
    idArr.push({ id: doc.id });
  });

  const paths = idArr.map((date: Record<string, string>) => {
    return {
      params: {
        date: date.id,
      },
    };
  });

  console.log(paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const date = context?.params?.date;
  const docRef = doc(db, "workouts", date as string);
  const docSnap = await getDoc(docRef);
  // const res = await fetch(`api/workouts/${date}`);
  // const data = await res.json();

  return {
    props: { workout: docSnap.data() },
  };
};

const Day: NextPage = ({ workout }: any) => {
  const router = useRouter();
  const { date } = router.query;

  console.log(workout);

  // const get = async () => {
  //   const querySnapshot = await getDocs(collection(db, "workouts"));
  //   let idArr: Record<string, string>[] = [];
  //   querySnapshot.forEach((doc) => {
  //     idArr.push({ id: doc.id });
  //   });

  //   const paths = idArr.map((date: Record<string, string>) => {
  //     return {
  //       params: {
  //         date: date.id,
  //       },
  //     };
  //   });

  //   console.log(paths);
  // };

  // useEffect(() => {
  //   get();
  // }, []);

  const [currentDate, setCurrentDate] = useState(date as string);

  return (
    <div className="backgroundPattern min-h-screen">
      <DayHeader key={router.asPath} />

      <DayBody />
    </div>
  );
};

export default Day;
