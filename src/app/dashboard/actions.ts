"use server";

import { insertTaskSchema, tasks } from "@/db/schema";

import { currentUser } from "@clerk/nextjs";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getTasksForUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) throw Error("No clerk user provided at login.");

  return await db
    .select({
      id: tasks.id,
      name: tasks.name,
      description: tasks.description,
      owner: tasks.owner,
    })
    .from(tasks)
    .where(eq(tasks.owner, clerkUser.id));
}

export async function createTask(formData: FormData) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw Error("No clerk user provided at login.");

  const newTask = insertTaskSchema.parse({
    name: formData.get("name"),
    description: formData.get("description"),
    owner: clerkUser.id,
  });

  const create = await db.insert(tasks).values(newTask);

  revalidatePath("/");
  return create;
}

export async function deleteTask(taskId: number) {
  const clerkUser = await currentUser();
  if (!clerkUser) throw Error("No clerk user provided at login.");

  const remove = await db.delete(tasks).where(eq(tasks.id, taskId));

  revalidatePath("/");
  return remove;
}
