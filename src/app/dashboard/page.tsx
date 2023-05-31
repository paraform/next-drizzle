import { Button, Input } from "@/ui";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { createTask, deleteTask, getTasksForUser } from "./actions";

import { UserButton } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export default async function Page() {
  const taskData = await getTasksForUser();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <div className="absolute right-4 top-4">
        <UserButton afterSignOutUrl="/" />
      </div>
      <CreateTaskForm />
      <Table className="mt-8">
        <TableCaption>Task List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task Name</TableHead>
            <TableHead>Task Description</TableHead>
            <TableHead>Delete Task</TableHead>
          </TableRow>
        </TableHeader>
        {taskData.length > 0 ? (
          <TableBody>
            {taskData.map((item, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <form
                      action={async () => {
                        "use server";
                        deleteTask(item.id);
                        revalidatePath("/");
                      }}
                    >
                      <Button type="submit">X</Button>
                    </form>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <div>No Tasks</div>
        )}
      </Table>
    </main>
  );
}

type CreateTaskFormProps = {};

function CreateTaskForm(props: CreateTaskFormProps) {
  return (
    <form
      action={createTask}
      className="border-1 flex w-full items-end gap-4 rounded-md border-solid border-border"
    >
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="name">Name</label>
        <div className="flex w-full items-center space-x-2">
          <Input
            id="name"
            name="name"
            placeholder="Name"
            className="block w-full rounded-lg p-2.5 text-sm text-gray-900"
            tabIndex={0}
            required
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <label htmlFor="description">Description</label>
        <div className="flex w-full items-center space-x-2">
          <Input
            id="description"
            name="description"
            placeholder="Description"
            className="block w-full rounded-lg p-2.5 text-sm text-gray-900"
            tabIndex={0}
            required
          />
        </div>
      </div>

      <Button className="min-w-fit shrink-0" type="submit">
        Add Task
      </Button>
    </form>
  );
}
