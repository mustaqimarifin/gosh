import type { Config } from "drizzle-kit"

export const connectionString = "postgresql://sos:7878@localhost:5432/postgres"

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString,
  },
} satisfies Config
