import { getCurrentWorkout, getPreviousWorkout, getWorkout } from "@/db/read";
import { queryOptions } from "@tanstack/react-query";

export const trackWorkoutOptions = queryOptions({
  queryKey: ["track-workout"],
  queryFn: getCurrentWorkout,
});

export const workoutOptions = (workoutId: string) =>
  queryOptions({
    queryKey: [workoutId],
    queryFn: () => getWorkout(workoutId),
  });

export const previousWorkoutOptions = queryOptions({
  queryKey: ["previous-workout"],
  queryFn: getPreviousWorkout,
});
