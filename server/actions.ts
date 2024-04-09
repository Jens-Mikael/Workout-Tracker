"use server";

import {
  addExercise,
  addSet,
  beginWorkout,
  deleteExercise,
  deleteSet,
  editSet,
  setExerciseMovement,
} from "@/db/write";
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
  await setExerciseMovement(workoutId, movement);
  revalidatePath("/track-workout");
}

export async function addSetAction(workoutId: string, movement: string) {
  await addSet(workoutId, movement);
  revalidatePath("/track-workout");
}

export async function editSetAction(
  setId: string,
  type: string,
  amount: number,
) {
  await editSet(setId, type, amount);
  revalidatePath("/track-workout");
}

export async function deleteSetAction(setId: string) {
  await deleteSet(setId);
  revalidatePath("/track-workout");
}

export async function deleteExerciseAction(exerciseId: string) {
  await deleteExercise(exerciseId);
  revalidatePath("/track-workout");
}
