import { db } from "@/db";
import { auth } from "../lib/auth";
import { and, eq } from "drizzle-orm";
import { exercise, set, workout } from "@/db/schema";
import { randomUUID } from "crypto";

export const beginWorkout = async (workoutType: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  const workoutId = randomUUID().toString();
  return db.batch([
    db.insert(workout).values({
      type: workoutType,
      user_id: session.user!.id as string,
      id: workoutId,
    }),
    db.insert(exercise).values({ workout_id: workoutId }),
  ]);
};

export const addExercise = async (workoutId: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  return db.insert(exercise).values({ workout_id: workoutId });
};

export const addSet = async (exerciseId: string, movement: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  return db.insert(set).values({
    exercise_id: exerciseId,
    user_id: session.user?.id as string,
    movement,
  });
};

export const setExerciseMovement = async (
  exerciseId: string,
  movement: string,
) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  await db.batch([
    db.update(exercise).set({ movement }).where(eq(exercise.id, exerciseId)),
    db.update(set).set({ movement }).where(eq(set.exercise_id, exerciseId)),
  ]);
};

export const editSet = async (setId: string, type: string, amount: number) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  return db
    .update(set)
    .set({ [type]: amount })
    .where(eq(set.id, setId));
};

export const deleteSet = async (setId: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  return db.delete(set).where(eq(set.id, setId));
};

export const deleteExercise = async (exerciseId: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  return db.batch([
    db.delete(exercise).where(eq(exercise.id, exerciseId)),
    db.delete(set).where(eq(set.exercise_id, exerciseId)),
  ]);
};

export const finishTrackingWorkout = async (
  workoutId: string,
  duration: number,
) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  return db
    .update(workout)
    .set({ completed: true, duration })
    .where(eq(workout.id, workoutId));
};
