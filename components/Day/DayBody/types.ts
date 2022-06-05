import { Dispatch, ElementType, ReactNode, SetStateAction } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { boolean } from "yup";

export enum WorkoutType {
  strength = "strength",
  cardio = "cardio",
  swimming = "swimming",
  mobility = "mobility",
  custom = "custom",
}

export enum StrengthWorkoutType {
  upperBody = "Upper body",
  lowerBody = "Lower body",
  fullBody = "Full body",
}

export enum CardioWorkoutType {
  aerobic = "Aerobic",
  dancing = "Dancing",
  hiking = "Hiking",
  swimming = "Swimming",
}

export enum MobilityWorkoutType {
  stretching = "Strecthing",
  balance = "Balance",
}

export interface IFormInput {
  workoutType: WorkoutType;
  subTypeWorkout: StrengthWorkoutType | CardioWorkoutType | MobilityWorkoutType;
  customWorkoutType?: string;
  duration: string;
  notes: string;
}

export interface IAddWorkoutFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface IFormField {
  as: ElementType;
  name: "workoutType" | "subTypeWorkout" | "duration" | "notes";
  required: boolean;
  label: string;
  children?: ReactNode;
  requiredMessage?: string;
  register: UseFormRegister<IFormInput>;
  errors: FieldErrors<IFormInput>;
  customId?: boolean;
}

// export type SubTypeWorkoutType = {
//   options?:
//     | StrengthWorkoutType[]
//     | CardioWorkoutType[]
//     | MobilityWorkoutType[]
//     | [];
// };
