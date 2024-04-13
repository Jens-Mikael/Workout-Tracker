"use client";
import { useMemo, useState } from "react";

import { IoIosArrowDown } from "react-icons/io";

import Set from "./Set";
import { TExercise } from "@/types";

interface IProps {
  exercise: TExercise;
}
const Exercise = ({ exercise }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [repsString, setRepsString] = useState("");
  const [weightString, setWeightString] = useState("");
  const visibleTodos = useMemo(() => {
    const weights: number[] = [];
    const reps: number[] = [];
    exercise.set.forEach((set) => {
      weights.push(set.weight || 0);
      reps.push(set.reps || 0);
    });
    setRepsString(`${Math.min(...reps)}-${Math.max(...reps)}`);
    setWeightString(`${Math.min(...weights)}-${Math.max(...weights)}`);
  }, [exercise]);

  return (
    <div className="overflow-hidden rounded-t-2xl bg-white">
      <div className="flex justify-center bg-stone-900 p-3 text-xl text-white">
        <div>{exercise.movement}</div>
      </div>
      <div className="flex flex-col gap-5 rounded-b-2xl border border-t-0 border-black/20 p-5">
        <div className="flex flex-col gap-5">
          <div
            id="container"
            style={{
              height: isOpen
                ? document.querySelector(`#container`)?.scrollHeight
                : 0,
            }}
            className="flex flex-col gap-5 overflow-hidden pb-7 transition-[height]"
          >
            <div className="flex items-stretch text-center text-lg">
              <div className="flex-1">Sets</div>
              <div className="flex-1">Weigth</div>
              <div className="flex-1">Reps</div>
            </div>
            {exercise.set.map((set, i) => (
              <Set index={i} set={set} key={set.id} />
            ))}
          </div>
          <div className="flex items-stretch text-center text-2xl font-bold">
            <div className="flex-1">{exercise.set.length}</div>
            <div className="flex-1">{weightString} kg</div>
            <div className="flex-1">{repsString}</div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className={`${
              isOpen && "rotate-180"
            } h-fit rounded-full p-2 transition-all hover:bg-black/5`}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <IoIosArrowDown size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
