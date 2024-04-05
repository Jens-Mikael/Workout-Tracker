import { db } from "@/db";
import { auth } from "../lib/auth";
import { and, eq } from "drizzle-orm";
import { exercise, workout } from "@/db/schema";

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

export const setExerciseMovement = async (
  exerciseId: string,
  movement: string,
) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  
  await db
    .update(exercise)
    .set({ movement })
    .where(eq(exercise.id, exerciseId));
};
