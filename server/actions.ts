"use server";

import { addExercise, beginWorkout, setExerciseMovement } from "@/db/write";
import { revalidatePath } from "next/cache";

export async function beginWorkoutAction(workoutType: string) {
  await beginWorkout(workoutType);
  revalidatePath("/track-workout");
}

export async function addExerciseAction(workoutId: string) {
  await addExercise(workoutId);
  revalidatePath("/track-workout");
}

export async function setExerciseMovementAction(
  workoutId: string,
  movement: string,
) {
  try {
    await setExerciseMovement(workoutId, movement);
  } catch (error) {
    console.log(error);
  }
  await setExerciseMovement(workoutId, movement);
  revalidatePath("/track-workout");
}
