"use client";
import { IoArrowBackOutline } from "react-icons/io5";
import { ImSpinner8 } from "react-icons/im";

import CreateExercise from "./CreateExercise";
import MobileTap from "../MobileTap";
import BeginWorkout from "../forms/beginWorkout";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetTrackWorkout } from "@/lib/hooks/get";
import {
  useAddExercise,
  useDeleteExercise,
  useFinishTrackWorkout,
} from "@/lib/hooks/mutate";
import { useEffect } from "react";
import Timer from "../Timer";
import { useToast } from "../ui/use-toast";

const NewWorkout = () => {
  const { toast } = useToast();
  const { data } = useGetTrackWorkout();
  const { mutateAsync: addExercise, isPending: isAddExercisePending } =
    useAddExercise();
  const { mutateAsync: deleteExercise } = useDeleteExercise();
  const {
    mutateAsync: finishWorkout,
    isPending: isFinishWorkoutPending,
    error: finishError,
  } = useFinishTrackWorkout();
  const handleDeleteExercise = (exerciseId: string) => {
    deleteExercise(exerciseId);
    toast({
      description: "Set has been deleted",
    });
  };
  const handleFinishWorkout = async () => {
    if (!data?.id || !data?.created)
      return toast({
        description: "No date for workout creation",
        variant: "destructive",
      });
    const duration = Math.floor(
      (new Date().getTime() - data?.created.getTime()) / 1000,
    );
    await finishWorkout({
      workoutId: data?.id,
      duration,
    });
    toast({
      description: "Workout has been finished",
    });
  };
  useEffect(() => {
    if (isAddExercisePending)
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [isAddExercisePending]);

  return (
    <div className="flex min-h-screen flex-col gap-7 p-5">
      <Link
        href="/"
        className="w-fit rounded-full p-2 transition-all hover:bg-black/5"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-xl  flex-col gap-7">
          {data?.created && <Timer />}

          <div className="w-full text-3xl font-semibold">
            Track New Workout 🏋️‍♂️
          </div>
          {data ? (
            <div className="flex w-full flex-col gap-7">
              {data.exercise.length > 0 &&
                data.exercise.map((exercise) => (
                  <CreateExercise
                    currentExercise={exercise}
                    handleDeleteExercise={handleDeleteExercise}
                  />
                ))}
              {/* ADD EXERCISE */}
              <MobileTap
                onClick={async () => {
                  addExercise(data.id);
                  window.scrollTo({
                    top: document.body.scrollHeight,
                    behavior: "smooth",
                  });
                }}
                className="rounded-2xl border border-black/20 py-10 text-xl transition-all hover:scale-105"
              >
                Add Exercise
              </MobileTap>
              <Button
                disabled={isFinishWorkoutPending}
                onClick={handleFinishWorkout}
                className="w-32 self-end"
              >
                {isFinishWorkoutPending ? (
                  <ImSpinner8 className="animate-spin" />
                ) : (
                  "Finish Workout"
                )}
              </Button>
            </div>
          ) : (
            <BeginWorkout />
          )}
        </div>
      </div>
    </div>
  );
};

export default NewWorkout;
