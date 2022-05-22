// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
// import { db } from "../../firebaseConfig";

type Data = {
  message: string;
  data: string[];
  // newWorkout?: Record<string, string>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const querySnapshot = await getDocs(collection(db, "workouts"));
    let idArr: string[] = [];
    await querySnapshot.forEach((doc) => {
      idArr.push(doc.id);
    });
    res.status(200).json({ message: "Success", data: idArr });
  }
  // if (req.method === "POST") {
  //   const newWorkout = { ...req.body };
  //   setDoc(doc(db, "workouts", "onThisDay"), {
  //     ...newWorkout,
  //   });
  //   res.status(201).json({ message: "Success", newWorkout: { ...req.body } });
  // } else {
  // }
}
