import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DayBody from "../../../components/Day/DayBody/NoWorkoutAdded";
import DayHeader from "../../../components/Day/DayHeader";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import NoWorkoutAdded from "../../../components/Day/DayBody/NoWorkoutAdded";
import WorkoutData from "../../../components/Day/DayBody/WorkoutData";
import Head from "next/head";

export const getStaticPaths: GetStaticPaths = async () => {
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

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const date = context?.params?.date;
  const docRef = doc(db, "workouts", date as string);
  const docSnap = await getDoc(docRef);

  return {
    props: { workout: docSnap.data() ?? null },
  };
};

export interface DayProps {
  workout: {
    workoutType: string;
    subTypeWorkout: string;
  };
}

const Day: NextPage<DayProps> = ({ workout }) => {
  const router = useRouter();
  const { date } = router.query;

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  const workoutPageBody =
    workout === null ? <NoWorkoutAdded /> : <WorkoutData workout={workout} />;

  return (
    <div className="backgroundPattern min-h-screen">
      <Head>
        <title>Workout Day</title>
        <meta name="description" content="Current day workout" />
      </Head>

      <DayHeader key={router.asPath} />
      <div className="max-w-screen-xl m-auto bg-white mt-5">
        <div className="flex flex-col justify-around items-center p-5">
          {workoutPageBody}
        </div>
      </div>
    </div>
  );
};

export default Day;
