"use client";
import { useGetPreviousWorkout } from "@/lib/hooks/get";
import { Button } from "./ui/button";
import { durationAsString, getWeekDay } from "@/lib/utils";
import { TExercise } from "@/types";
import Link from "next/link";
import StarRating from "./StarRating";

const PreviousWorkout = () => {
  const { data } = useGetPreviousWorkout();

  if (!data) return;
  console.log(data);
  return (
    <div className=" flex flex-col gap-3">
      <div className="overflow-hidden rounded-t-2xl ">
        <div className="flex justify-between bg-stone-900 px-5 py-3 text-2xl text-white">
          <div>{getWeekDay(data.created?.getDay()!)}</div>
          <div>
            {data?.created!.getMonth() + 1}/{data?.created!.getDate()}
          </div>
        </div>
        <div className="flex flex-col gap-5 rounded-b-2xl border border-t-0 border-black/20 p-5">
          <div className="text-lg font-medium">
            <div className="flex justify-between">
              <div>Workout type:</div>
              <div>{data.type}</div>
            </div>
            <div className="flex justify-between">
              <div>Duration:</div>
              <div>{durationAsString(data.duration!)}</div>
            </div>
            <div className="flex justify-between">
              <div>Rating:</div>
              <StarRating rating={data.rating!} size={20} />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-2xl font-bold">Exercises</div>
            <div className="flex flex-col gap-2 text-lg">
              {data.exercise.map((exercise) => (
                <div key={exercise.id} className="flex justify-between">
                  <div>{exercise.movement}</div>
                  <div>x {exercise.set.length}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <Link href={`/workout/${data.id}`}>
              <Button>View</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousWorkout;
