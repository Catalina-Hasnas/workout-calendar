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
}

// export type SubTypeWorkoutType = {
//   options?:
//     | StrengthWorkoutType[]
//     | CardioWorkoutType[]
//     | MobilityWorkoutType[]
//     | [];
// };
