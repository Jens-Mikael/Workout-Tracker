import { getCurrentWorkout } from "@/db/read";
import { queryOptions } from "@tanstack/react-query";

export const workoutOptions = queryOptions({
  queryKey: ["track-workout"],
  queryFn: getCurrentWorkout,
});