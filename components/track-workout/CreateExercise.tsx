"use client";
import SelectOption from "../SelectOption";
import { Button } from "../ui/button";
import { TExercise } from "@/types";
import { useGetCurrentWorkout } from "@/lib/hooks/get";
import CreateSet from "./CreateSet";
import { useAddSet, useDeleteSet } from "@/lib/hooks/mutate";
import { useToast } from "../ui/use-toast";
import { FaRegTrashAlt } from "react-icons/fa";

const CreateExercise = ({
  currentExercise,
  handleDeleteExercise,
}: {
  currentExercise: TExercise;
  handleDeleteExercise: (exerciseId: string) => void;
}) => {
  const { data } = useGetCurrentWorkout();
  const { mutateAsync: addSet } = useAddSet();
  const { mutateAsync: deleteSet } = useDeleteSet();
  const { toast } = useToast();

  const handleDeleteSet = (setId: string) => {
    deleteSet({ setId, exerciseId: currentExercise.id });
    toast({
      description: "Set has been deleted",
    });
  };

  return (
    <div className="overflow-hidden rounded-t-2xl bg-white">
      <div className="relative flex items-center justify-center bg-stone-900 p-3 text-xl text-white">
        <div>Exercise 1</div>
        <div
          onClick={() => handleDeleteExercise(currentExercise.id)}
          className="absolute right-2 cursor-pointer rounded-full p-2.5 transition-all hover:bg-white/10"
        >
          <FaRegTrashAlt size={16} />
        </div>
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
            <CreateSet
              handleDeleteSet={handleDeleteSet}
              set={set}
              key={set.id}
              index={i}
            />
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
