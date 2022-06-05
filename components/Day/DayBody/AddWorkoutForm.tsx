import { useRouter } from "next/router";
import { useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormField from "./FormField";
import { IAddWorkoutFormProps, IFormInput } from "./types";

const AddWorkoutForm = ({ setIsOpen }: IAddWorkoutFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const router = useRouter();
  const { date } = router.query;

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch(`/api/workouts/${date}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    setIsOpen(false);
  };

  const selectedWorkoutType = watch("workoutType");

  const subTypeWorkout = useMemo(() => {
    switch (selectedWorkoutType) {
      case "strength":
        return {
          options: ["Upper body", "Lower body", "Full body"],
        };
      case "cardio":
        return {
          options: ["Aerobic", "Dancing", "Hiking", "Swimming"],
        };
      case "mobility":
        return {
          options: ["Stretching", "Balance"],
        };
      default:
        return {
          options: [],
        };
    }
  }, [selectedWorkoutType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <FormField
        as="select"
        name="workoutType"
        required={true}
        requiredMessage="Workout type is required"
        label="Workout type"
        register={register}
        errors={errors}
      >
        {[
          "Select a workout type",
          "Strength",
          "Cardio",
          "Mobility",
          "Custom",
        ].map((workoutType, index) => (
          <option
            value={
              workoutType === "Select a workout type"
                ? ""
                : workoutType.toLowerCase()
            }
            key={index}
          >
            {workoutType}
          </option>
        ))}
      </FormField>

      {selectedWorkoutType && selectedWorkoutType !== "custom" && (
        <FormField
          as="select"
          name="subTypeWorkout"
          required={false}
          label="Workout subtype"
          register={register}
          errors={errors}
        >
          {subTypeWorkout.options.map((workoutOption) => {
            return (
              <option value={workoutOption} key={workoutOption}>
                {workoutOption}
              </option>
            );
          })}
        </FormField>
      )}

      {selectedWorkoutType && selectedWorkoutType === "custom" && (
        <FormField
          as="input"
          name="subTypeWorkout"
          required={true}
          requiredMessage="It is required to specify the custom workout"
          label="Custom Workout"
          register={register}
          errors={errors}
          customId={true}
        />
      )}

      <FormField
        as="input"
        name="duration"
        required={false}
        label="Duration"
        register={register}
        errors={errors}
      />

      <FormField
        as="textarea"
        name="notes"
        required={false}
        label="Notes"
        register={register}
        errors={errors}
      />

      <div className="flex justify-center">
        <input
          className="py-3 px-6 bg bg-sky-700 text-sky-50 text-center"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
};

export default AddWorkoutForm;
