import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();

export default {
  schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_DEV_DATABASE_URL!,
  },
  out: "./drizzle",
} satisfies Config;
