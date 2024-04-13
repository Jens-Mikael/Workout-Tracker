"use client";
import { useGetTrackWorkout } from "@/lib/hooks/get";
import { durationAsString } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

const Timer = () => {
  const { data } = useGetTrackWorkout();
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
    setTimerString(durationAsString(duration));
  }, [duration]);

  return (
    <div className=" absolute  top-5 self-center text-center text-4xl font-light">
      {timerString}
    </div>
  );
};

export default Timer;
