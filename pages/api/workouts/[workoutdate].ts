// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

type Data = {
  message: string;
  newWorkout?: Record<string, any>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const date = req.query.workoutdate as string;

  if (req.method === "POST") {
    const newWorkout = { ...req.body };
    setDoc(doc(db, "workouts", date), {
      ...newWorkout,
    });
    res.status(201).json({ message: "Success", newWorkout: { ...req.body } });
  } else {
    const docRef = doc(db, "workouts", date);
    const docSnap = await getDoc(docRef);

    res.status(200).json({ message: "Success", newWorkout: { docSnap } });
  }
}
