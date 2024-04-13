import { drizzle } from "drizzle-orm/neon-http";
import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const connectionString = process.env.NEXT_PUBLIC_DEV_DB_URL;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const sql: NeonQueryFunction<boolean, boolean> = neon(connectionString!);
export const db = drizzle(sql, { schema });

// import { Client } from "@neondatabase/serverless";
// import type { NeonDatabase } from "drizzle-orm/neon-serverless";
// import { drizzle } from "drizzle-orm/neon-serverless";
// import * as schema from "./schema";

// const connectionString = process.env.NEXT_PUBLIC_DEV_DATABASE_URL;

// // Disable prefetch as it is not supported for "Transaction" pool mode
// export const sql = new Client(connectionString!);
// export const db = drizzle(sql, { schema });
