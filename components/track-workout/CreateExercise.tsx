"use client";
import SelectOption from "../SelectOption";
import { Button } from "../ui/button";
import { exercise, set } from "@/db/schema";
import { TExercise, TSet } from "@/types";
import { useGetCurrentWorkout } from "@/lib/hooks/get";
import CreateSet from "./CreateSet";
import { useAddExercise, useAddSet } from "@/lib/hooks/mutate";
import { useToast } from "../ui/use-toast";
import { auth } from "@/lib/auth";
import { useSession } from "next-auth/react";

const CreateExercise = ({
  currentExercise,
}: {
  currentExercise: TExercise;
}) => {
  const { data } = useGetCurrentWorkout();
  const { mutateAsync: addSet } = useAddSet();
  const { toast } = useToast();

  return (
    <div className="overflow-hidden rounded-t-2xl bg-white">
      <div className="flex justify-center bg-stone-900 p-3 text-xl text-white">
        <div>Exercise 1</div>
      </div>
      <div className="flex flex-col gap-10 rounded-b-2xl border border-t-0 border-black/20 p-5">
        <div className="flex flex-col gap-2">
          <div className="font-medium">Movement:</div>
          <SelectOption
            selectType="movement"
            workoutType={data?.type}
            exerciseId={currentExercise.id}
            defaultVal={currentExercise.movement || undefined}
          />
        </div>
        <div className="flex flex-col gap-5">
          {currentExercise.set.length > 0 && (
            <div className="flex items-stretch text-center">
              <div className="flex-1">Set</div>
              <div className="flex-1">Weigth (kg)</div>
              <div className="flex-1">Reps</div>
            </div>
          )}
          {currentExercise.set.map((set, i) => (
            <CreateSet set={set} key={set.id} index={i + 1} />
          ))}
          <Button
            onClick={() => {
              console.log("ran");
              if (!currentExercise.movement)
                return toast({
                  title: "Oops!",
                  description: "Define the movement first before adding a set.",
                  variant: "destructive",
                });

              addSet({
                exerciseId: currentExercise.id,
                movement: currentExercise.movement,
              });
            }}
            variant="default"
          >
            Add set
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateExercise;
