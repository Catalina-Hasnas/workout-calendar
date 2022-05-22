import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { Fragment, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFormInput } from "./types";

// export async function getStaticProps() {
//   const res = await fetch("https://.../posts");
//   const posts = await res.json();

//   return {
//     props: {
//       posts,
//     },
//   };
// }

const DayBody = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormInput>();

  const [isOpen, setIsOpen] = useState(false);

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
      case "custom":
        return {
          options: [],
        };
      default:
        return {
          options: [],
        };
    }
  }, [selectedWorkoutType]);

  return (
    <div className="max-w-screen-xl m-auto bg-white mt-5">
      <div className="flex flex-col justify-around items-center p-5">
        <p className="text-6xl p-3"> No workout added on this day </p>
        <button
          onClick={() => setIsOpen(true)}
          className="py-3 px-6 bg bg-sky-700 text-sky-50"
        >
          Add a workout
        </button>

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add a workout
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <label>Workout type</label>
                      <select
                        className={`${
                          errors.workoutType &&
                          " focus:border-red-500 focus:ring-red-500 border-red-500"
                        }`}
                        {...register("workoutType", {
                          required: "Workout type is required",
                        })}
                      >
                        <option value="">Select a workout type</option>
                        <option value="strength">Strength</option>
                        <option value="cardio">Cardio</option>
                        <option value="mobility">Mobility</option>
                        <option value="custom">Custom</option>
                      </select>
                      <div>
                        {errors.workoutType && (
                          <span className="text-sm text-red-500">
                            {errors.workoutType.message}
                          </span>
                        )}
                      </div>
                      {selectedWorkoutType && selectedWorkoutType !== "custom" && (
                        <select {...register("subTypeWorkout")}>
                          {subTypeWorkout.options.map((workoutOption) => {
                            return (
                              <option value={workoutOption} key={workoutOption}>
                                {workoutOption}
                              </option>
                            );
                          })}
                        </select>
                      )}
                      <input type="submit" value={"Submit"} />
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default DayBody;
