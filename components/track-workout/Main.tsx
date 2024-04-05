"use client";
import { IoArrowBackOutline } from "react-icons/io5";
import CreateExercise from "../CreateExercise";
import MobileTap from "../MobileTap";
import BeginWorkout from "../forms/beginWorkout";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetCurrentWorkout } from "@/lib/hooks/get";
import { useAddExercise } from "@/lib/hooks/mutate";

const NewWorkout = () => {
  const { data } = useGetCurrentWorkout();

  const { mutateAsync: addExercise } = useAddExercise();

  return (
    <div className="flex min-h-screen flex-col gap-7 p-5">
      <Link
        href="/"
        className="w-fit rounded-full p-2 transition-all hover:bg-black/5"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="flex w-full flex-col items-center justify-center gap-7">
        <div className="w-full max-w-xl text-3xl font-semibold">
          Track New Workout 🏋️‍♂️
        </div>
        {data ? (
          <div className="flex w-full max-w-xl flex-col gap-7">
            {data.exercise.length > 0 && (
              <CreateExercise currentExercise={data.exercise[0]} />
            )}
            {/* ADD EXERCISE */}
            <MobileTap
              onClick={() => addExercise(data.id)}
              className="rounded-2xl border border-black/20 py-10 text-xl transition-all hover:scale-105"
            >
              Add Exercise
            </MobileTap>
            <Button className="self-end">Finish Workout</Button>{" "}
          </div>
        ) : (
          <BeginWorkout />
        )}
      </div>
    </div>
  );
};

export default NewWorkout;
