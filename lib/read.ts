import { auth } from "./auth";

export const getTodos = async () => {
  try {
    const session = await auth();
    if (!session) throw new Error("No session");
    //get user active workout
    const res = await db.query
  } catch (error) {
    return { error };
  }
};
