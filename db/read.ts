import { db } from "@/db";
import { auth } from "../lib/auth";
import { and, eq } from "drizzle-orm";
import { workout } from "@/db/schema";

export const getCurrentWorkout = async () => {
  const session = await auth();
  if (!session) throw new Error("No session");
  //get user active workout
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
  return res;
};
