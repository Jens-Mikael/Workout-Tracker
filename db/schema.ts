import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
} from "drizzle-orm/pg-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { randomUUID } from "crypto";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  name: text("name"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccount["type"]>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").notNull().primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);

export const workout = pgTable("workout", {
  id: text("id").primaryKey().notNull().$default(randomUUID),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  type: text("type").notNull(),
  created: timestamp("created", { mode: "string" }),
});

export const exercise = pgTable("exercise", {
  id: text("id").primaryKey().notNull().$default(randomUUID),
  workout_id: text("workout_id")
    .notNull()
    .references(() => workout.id),
  movement: text("movement").notNull(),
  created: timestamp("created", { mode: "string" }),
});

export const set = pgTable("set", {
  id: text("id").primaryKey().notNull().$default(randomUUID),
  user_id: text("user_id")
    .notNull()
    .references(() => users.id),
  exercise_id: text("exercise_id")
    .notNull()
    .references(() => exercise.id),
  weight: integer("weight").notNull(),
  movement: text("movement").notNull(),
  created: timestamp("created", { mode: "string" }),
});
