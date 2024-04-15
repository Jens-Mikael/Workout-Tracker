import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config();
const isProduction = process.env.NODE_ENV === "production";
let dbString: string;
if (isProduction) {
  dbString = process.env.PROD_DB_URL as string;
} else {
  dbString = process.env.DEV_LOCAL_DB_URL as string;
}

export default {
  schema: "./db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: dbString,
  },
  out: "./drizzle",
} satisfies Config;
