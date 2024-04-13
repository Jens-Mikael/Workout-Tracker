"use client";
import { Calendar } from "@/components/ui/calendar";
import Link from "next/link";
import { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import WorkoutDialog from "./WorkoutDialog";

const History = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col gap-7 p-5">
      <Link
        href="/"
        className="w-fit rounded-full p-2 transition-all hover:bg-black/5"
      >
        <IoArrowBackOutline size={24} />
      </Link>
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-2xl flex-col items-center gap-5">
          <div className="w-full text-3xl font-semibold">Your History 🗓️</div>
          <Calendar
            className="w-full rounded-md border text-sm"
            selected={[new Date(), new Date(2024, 3, 22)]}
            onDayClick={(date) => setOpen(true)}
            mode="multiple"
          />
        </div>
      </div>
      <WorkoutDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default History;
