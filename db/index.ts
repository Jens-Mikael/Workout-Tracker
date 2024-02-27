import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { NeonQueryFunction, neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const sql: NeonQueryFunction<boolean, boolean> = neon(connectionString!);
export const db = drizzle(sql);