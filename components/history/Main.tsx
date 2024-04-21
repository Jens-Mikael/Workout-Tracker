"use client";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { useMemo, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import WorkoutDialog from "./WorkoutDialog";
import { useGetAllPreviousWorkouts } from "@/lib/hooks/get";
import { isSameDate } from "@/lib/utils";

const History = () => {
  const [open, setOpen] = useState(false);
  const { data } = useGetAllPreviousWorkouts();
  const [dates, setDates] = useState<Date[]>([]);
  const [clickedWorkoutIndex, setClickedWorkoutIndex] = useState<number[]>([]);
  useMemo(() => {
    const dates: Date[] = [];
    data?.forEach((workout) => {
      dates.push(workout.created!);
    });
    setDates(dates);
  }, [data]);
  return (
    <div className="flex min-h-screen flex-col gap-7 p-5">
      <Link
        href="/"
        className="w-fit rounded-full p-2 transition-all hover:bg-muted"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-2xl flex-col items-center gap-5">
          <div className="w-full text-3xl font-semibold">Your History 🗓️</div>
          <Calendar
            className="w-full rounded-md border text-sm"
            selected={dates}
            onDayClick={(date) => {
              const arr: number[] = [];
              data?.forEach((workout, i) => {
                if (isSameDate(workout.created!, date)) arr.push(i);
              });
              if (arr.length >= 1) {
                setOpen(true);
                setClickedWorkoutIndex(arr);
              }
            }}
            mode="multiple"
          />
        </div>
      </div>
      <WorkoutDialog
        open={open}
        setOpen={setOpen}
        indexes={clickedWorkoutIndex}
      />
    </div>
  );
};

export default History;
