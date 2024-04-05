import { useQuery } from "@tanstack/react-query";
import { workoutOptions } from ".";

export const useGetCurrentWorkout = () => useQuery(workoutOptions);
