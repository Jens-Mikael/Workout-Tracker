"use client";
import { useGetCurrentWorkout } from "@/lib/hooks/get";
import { useEffect, useMemo, useState } from "react";

const Timer = () => {
  const { data } = useGetCurrentWorkout();
  const current = new Date().getTime() - data?.created!.getTime()!;
  const [duration, setDuration] = useState(Math.floor(current / 1000));
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();
  const [timerString, setTimerString] = useState("");
  useEffect(() => {
    const id = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(id || intervalId);
  }, []);

  useEffect(() => {
    // Calculate and set timer string whenever duration changes
    let difference = Math.abs(duration); // difference in seconds
    const hours = Math.floor(difference / 3600);
    difference -= hours * 3600;
    const minutes = Math.floor(difference / 60) % 60;
    difference -= minutes * 60;
    const seconds = Math.floor(difference % 60);
    setTimerString(
      `${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`,
    );
  }, [duration]);

  return (
    <div className=" absolute  top-5 self-center text-center text-4xl font-light">
      {timerString}
    </div>
  );
};

export default Timer;
