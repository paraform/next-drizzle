import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

import { InferModel } from "drizzle-orm";

export const tasks = mysqlTable("tasks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  description: text("description"),
  owner: text("owner").notNull(),
});

export const insertTaskSchema = createInsertSchema(tasks);
export const selectTaskSchema = createSelectSchema(tasks);

export type Task = InferModel<typeof tasks>;
