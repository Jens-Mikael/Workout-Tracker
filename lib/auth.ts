import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "@auth/core/providers/google";
import { db } from "@/db";

export const { handlers, auth } = NextAuth({
  providers: [Google],
  adapter: DrizzleAdapter(db),
});
