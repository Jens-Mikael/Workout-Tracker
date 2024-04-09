import {
  addExerciseAction,
  addSetAction,
  deleteExerciseAction,
  deleteSetAction,
  editSetAction,
  setExerciseMovementAction,
} from "@/server/actions";
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

export const useAddSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      exerciseId,
      movement,
    }: {
      exerciseId: string;
      movement: string;
    }) => addSetAction(exerciseId, movement),
    onMutate: async ({
      exerciseId,
      movement,
    }: {
      exerciseId: string;
      movement: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: [workoutOptions.queryKey] });
      const previousWorkout = queryClient.getQueryData(workoutOptions.queryKey);
      queryClient.setQueryData(workoutOptions.queryKey, (prev) => {
        if (!prev) return prev;

        const exerciseIndex = prev?.exercise.findIndex(
          (obj) => obj.id === exerciseId,
        );
        if (exerciseIndex === -1) return prev;
        const copyWorkout = prev;

        copyWorkout.exercise[exerciseIndex].set.push({
          id: `${exerciseId}_optimisticSet_${prev.exercise[exerciseIndex].set.length}`,
          user_id: "NKBEKFBKEJBFKJ",
          created: null,
          movement,
          exercise_id: exerciseId,
          weight: null,
          reps: null,
        });

        return copyWorkout;
      });

      return { previousWorkout };
    },
    onError: (err, newWorkout, context) => {
      queryClient.setQueryData(["track-workout"], context?.previousWorkout);
      console.log(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["track-workout"] });
    },
  });
};

export const useEditSet = () =>
  useMutation({
    mutationFn: ({
      setId,
      type,
      amount,
    }: {
      setId: string;
      type: "reps" | "weight";
      amount: number;
    }) => editSetAction(setId, type, amount),
    onError: (err: Error) => {
      console.log(err);
      return err;
    },
  });

export const useDeleteSet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      setId,
      exerciseId,
    }: {
      setId: string;
      exerciseId: string;
    }) => deleteSetAction(setId),
    onMutate: async ({
      setId,
      exerciseId,
    }: {
      setId: string;
      exerciseId: string;
    }) => {
      await queryClient.cancelQueries({ queryKey: [workoutOptions.queryKey] });
      const previousWorkout = queryClient.getQueryData(workoutOptions.queryKey);
      queryClient.setQueryData(workoutOptions.queryKey, (prev) => {
        if (!prev) return prev;

        const exerciseIndex = prev?.exercise.findIndex(
          (obj) => obj.id === exerciseId,
        );
        const copyWorkout = { ...prev }; // Shallow copy
        const res = copyWorkout.exercise[exerciseIndex].set.filter(
          (obj) => obj.id !== setId,
        );
        copyWorkout.exercise[exerciseIndex].set = res;
        console.log(copyWorkout);
        return copyWorkout;
      });
      return { previousWorkout };
    },
    onError: (err, newWorkout, context) => {
      queryClient.setQueryData(["track-workout"], context?.previousWorkout);
      console.log(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["track-workout"] });
    },
  });
};

export const useDeleteExercise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteExerciseAction,
    onMutate: async (exerciseId: string) => {
      await queryClient.cancelQueries({ queryKey: [workoutOptions.queryKey] });
      const previousWorkout = queryClient.getQueryData(workoutOptions.queryKey);
      queryClient.setQueryData(workoutOptions.queryKey, (prev) => {
        if (!prev) return prev;

        const exerciseIndex = prev?.exercise.findIndex(
          (obj) => obj.id === exerciseId,
        );
        const copyWorkout = { ...prev }; // Shallow copy
        copyWorkout.exercise.splice(exerciseIndex, 1);
        return copyWorkout;
      });
      return { previousWorkout };
    },
    onError: (err, newWorkout, context) => {
      queryClient.setQueryData(["track-workout"], context?.previousWorkout);
      console.log(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["track-workout"] });
    },
  });
};
