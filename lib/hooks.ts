import {
  Updater,
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getCurrentWorkout } from "./read";
import { addExerciseAction } from "@/server/actions";

export const workoutOptions = queryOptions({
  queryKey: ["track-workout"],
  queryFn: getCurrentWorkout,
});

export const useGetCurrentWorkout = () => useQuery(workoutOptions);

export const useAddExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addExerciseAction,
    onMutate: async (workout_id: string) => {
      await queryClient.cancelQueries({ queryKey: [workoutOptions.queryKey] });
      const previousWorkout = queryClient.getQueryData(workoutOptions.queryKey);
      queryClient.setQueryData(workoutOptions.queryKey, (prev) => {
        if (!prev) return prev;
        if (!prev.exercise || prev.exercise.length === 0) return prev;
        return {
          ...prev,
          exercise: [
            ...prev.exercise,
            {
              set: [],
              workout_id,
              id: "93287459827394",
              created: null,
              movement: null,
            },
          ],
        };
      });

      return { previousWorkout };
    },
    onError: (err, newWorkout, context) => {
      queryClient.setQueryData(["track-workout"], context?.previousWorkout);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["track-workout"] });
    },
  });
};

//https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates
//handle create workout and optimistic updates for it
