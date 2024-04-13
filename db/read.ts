import { db } from "@/db";
import { auth } from "../lib/auth";
import { and, eq } from "drizzle-orm";
import { workout } from "@/db/schema";

export const getCurrentWorkout = async () => {
  const session = await auth();
  if (!session) throw new Error("No session");
  //get user active workout
  console.log("fetched");
  const res = await db.query.workout.findFirst({
    where: and(
      eq(workout.user_id, session.user?.id as string),
      eq(workout.completed, false),
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

export const getWorkout = async (workoutId: string) => {
  const session = await auth();
  if (!session) throw new Error("No session");
  console.log(workoutId);
  const res = await db.query.workout.findFirst({
    where: and(
      eq(workout.user_id, session.user?.id as string),
      eq(workout.id, workoutId),
      eq(workout.completed, true),
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
      eq(workout.completed, true),
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
