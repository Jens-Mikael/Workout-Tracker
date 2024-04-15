import {
  drizzle as NeonDrizzle,
  NeonHttpDatabase,
} from "drizzle-orm/neon-http";
import { NeonQueryFunction, neon } from "@neondatabase/serverless";
import {
  drizzle as LocalDrizzle,
  NodePgDatabase,
} from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { Pool } from "pg";

const isProduction = process.env.NODE_ENV === "production";
let sql: NeonQueryFunction<false, false>;
let db: NeonHttpDatabase<typeof schema> | NodePgDatabase<typeof schema>;
if (isProduction) {
  const connectionString = process.env.PROD_NEON_DB_URL as string;
  sql = neon(connectionString);
  db = NeonDrizzle(sql, { schema });
} else {
  const connectionString = process.env.DEV_LOCAL_DB_URL as string;
  const pool = new Pool({
    connectionString,
  });
  db = LocalDrizzle(pool, { schema });
}
export { db };
