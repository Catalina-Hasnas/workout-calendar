import { DayProps } from "../../../pages/day/[date]";
import { WorkoutType } from "./types";

const WorkoutData = ({ workout }: DayProps) => {
  return (
    <div>
      <p>Workout Type: {workout.workoutType}</p>
      <p>Subworkout: {workout.subTypeWorkout}</p>
    </div>
  );
};

export default WorkoutData;
