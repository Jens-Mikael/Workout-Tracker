"use server";

import { addExercise, beginWorkout } from "@/lib/write";
import { revalidatePath } from "next/cache";

export async function beginWorkoutAction(workoutType: string) {
  await beginWorkout(workoutType);
  revalidatePath("/track-workout");
}

export async function addExerciseAction(workoutId: string) {
  await addExercise(workoutId);
  revalidatePath("/track-workout");
}
