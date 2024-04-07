import { db } from "@/db";
import { auth } from "../lib/auth";
import { and, eq } from "drizzle-orm";
import { exercise, set, workout } from "@/db/schema";

export const beginWorkout = async (workoutType: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  await db.transaction(async (tx) => {
    const res = await tx
      .insert(workout)
      .values({
        type: workoutType,
        user_id: session.user!.id as string,
      })
      .returning({ workoutId: workout.id });
    await tx.insert(exercise).values({ workout_id: res[0].workoutId });
  });
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
