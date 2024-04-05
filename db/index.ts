import { drizzle } from "drizzle-orm/neon-http";
import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.NEXT_PUBLIC_DEV_DATABASE_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const sql: NeonQueryFunction<boolean, boolean> = neon(connectionString!);
export const db = drizzle(sql, { schema });
