import { addExerciseAction, setExerciseMovementAction } from "@/server/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workoutOptions } from ".";

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

export const useSetExerciseMovement = () =>
  useMutation({
    mutationFn: ({
      exerciseId,
      movement,
    }: {
      exerciseId: string;
      movement: string;
    }) => setExerciseMovementAction(exerciseId, movement),
    onError: (err: Error) => {
      console.log(err);
      return err;
    },
  });
