"use client";
import { useGetCurrentWorkout } from "@/lib/hooks";
import SelectOption from "./SelectOption";
import { Button } from "./ui/button";
import { exercise, set } from "@/db/schema";
import { TExercise, TSet } from "@/types";
import Set from "./Set";

const CreateExercise = ({
  currentExercise,
}: {
  currentExercise: TExercise;
}) => {
  return (
    <div className="overflow-hidden rounded-t-2xl bg-white">
      <div className="flex justify-center bg-stone-900 p-3 text-xl text-white">
        <div>Exercise 1</div>
      </div>
      <div className="flex flex-col gap-10 rounded-b-2xl border border-t-0 border-black/20 p-5">
        <div className="flex flex-col gap-2">
          <div className="font-medium">Exercise Type:</div>
          <SelectOption selectType="movement" workoutType="Pull" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-stretch text-center">
            <div className="flex-1">Set</div>
            <div className="flex-1">Weigth (kg)</div>
            <div className="flex-1">Reps</div>
          </div>
          <Set />
          <Button variant="default">Add set</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateExercise;
