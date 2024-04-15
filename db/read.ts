import { auth } from "../lib/auth";
import { and, asc, eq, or } from "drizzle-orm";
import { exercise, set, workout } from "@/db/schema";
import { db } from ".";

export const getCurrentWorkout = async () => {
  const session = await auth();
  if (!session) throw new Error("No session");
  //get user active workout
  const activeWorkout = await db.query.workout.findFirst({
    where: and(
      eq(workout.user_id, session.user?.id as string),
      or(eq(workout.isCompleted, false), eq(workout.isReviewed, false)),
    ),
    with: {
      exercise: {
        with: {
          set: {
            orderBy: [asc(set.created)],
          },
        },
        orderBy: [asc(exercise.created)],
      },
    },
  });
  if (!activeWorkout) return null;

  return activeWorkout;
};

export const getWorkout = async (workoutId: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  const res = await db.query.workout.findFirst({
    where: and(
      eq(workout.user_id, session.user?.id as string),
      eq(workout.id, workoutId),
      eq(workout.isCompleted, true),
      eq(workout.isReviewed, true),
    ),
    with: {
      exercise: {
        with: {
          set: true,
        },
      },
    },
  });
  if (!res) return null;
  return res;
};

export const getPreviousWorkout = async () => {
  const session = await auth();
  if (!session) throw new Error("No session");
  const res = await db.query.workout.findFirst({
    where: and(
      eq(workout.user_id, session.user?.id as string),
      eq(workout.isCompleted, true),
    ),
    columns: {
      id: true,
      type: true,
      duration: true,
      rating: true,
      created: true,
    },
    with: {
      exercise: {
        with: {
          set: {
            columns: {
              weight: true,
            },
          },
        },
        columns: {
          movement: true,
          id: true,
        },
      },
    },
  });
  if (!res) return null;
  return res;
};

export const getAllPreviousWorkouts = async () => {
  const session = await auth();
  if (!session) throw new Error("No session");
  const res = await db.query.workout.findMany({
    where: and(
      eq(workout.user_id, session.user?.id as string),
      eq(workout.isCompleted, true),
      eq(workout.isReviewed, true),
    ),
    columns: {
      isCompleted: false,
      user_id: false,
    },
    with: {
      exercise: {
        columns: { movement: true },
      },
    },
  });

  if (!res) return null;
  return res;
};
