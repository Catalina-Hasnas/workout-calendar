import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AddWorkoutForm from "./AddWorkoutForm";

const NoWorkoutAdded = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <p className="text-6xl p-3"> No workout added on this day </p>
      <button
        onClick={() => setIsOpen(true)}
        className="py-3 px-6 bg bg-sky-700 text-sky-50 text-center"
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
                    className="text-sky-700 text-center font-bold text-xl pb-6"
                  >
                    Add a workout
                  </Dialog.Title>
                  <AddWorkoutForm setIsOpen={setIsOpen} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NoWorkoutAdded;
