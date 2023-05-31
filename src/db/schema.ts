import { mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";

export const tasks = mysqlTable("tasks", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
});
