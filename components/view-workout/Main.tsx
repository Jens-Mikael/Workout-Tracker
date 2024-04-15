"use client";
import { useGetWorkout } from "@/lib/hooks/get";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoArrowBackOutline } from "react-icons/io5";
import Exercise from "./Exercise";
import { durationAsString, getWeekDay } from "@/lib/utils";
import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import StarRating from "../StarRating";

const ViewWorkout = () => {
  const params = useParams();
  const { data } = useGetWorkout(params.workoutId as string);

  if (!data) return;
  return (
    <div className="flex min-h-screen flex-col gap-7 p-5 ">
      <Link
        href="/"
        className="w-fit rounded-full p-2 transition-all hover:bg-black/5"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="flex flex-col items-center">
        <div className="flex w-full max-w-2xl flex-col gap-10">
          <div className="flex flex-col gap-4">
            <div className="w-full text-3xl font-semibold">
              <div>
                {getWeekDay(data.created?.getDay()!)}{" "}
                {data?.created!.getMonth() + 1}/{data?.created!.getDate()} 🏋️‍♂️
              </div>
            </div>
            <div className="flex flex-col gap-1 text-xl font-medium">
              <div className="flex justify-between">
                <div>Workout type:</div>
                <div className="font-bold">{data?.type}</div>
              </div>
              <div className="flex justify-between">
                <div>Duration:</div>
                <div className="font-bold">
                  {durationAsString(data.duration!)}
                </div>
              </div>
              <div className="flex justify-between">
                <div>Your rating:</div>
                <StarRating rating={data.rating!} size={32} />
              </div>
            </div>
            <div className="font-light italic">
              Felt really good, did a bit of cardio in the beginning and then
              had a long workout and lots of conversations with Veikka
            </div>
          </div>
          {data?.exercise.map((exercise) => (
            <Exercise exercise={exercise} key={exercise.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewWorkout;
