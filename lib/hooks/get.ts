import { useQuery } from "@tanstack/react-query";
import { previousWorkoutOptions, trackWorkoutOptions, workoutOptions } from ".";

export const useGetTrackWorkout = () => useQuery(trackWorkoutOptions);

export const useGetWorkout = (workoutId: string) =>
  useQuery(workoutOptions(workoutId));

export const useGetPreviousWorkout = () => useQuery(previousWorkoutOptions);
