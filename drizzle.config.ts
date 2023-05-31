import "dotenv/config";
import type { Config } from "drizzle-kit";

const { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } =
  process.env;

export default {
  schema: "./src/db/schema.ts",
  out: "./db/drizzle",
  connectionString: `mysql://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}/${DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
} satisfies Config;
