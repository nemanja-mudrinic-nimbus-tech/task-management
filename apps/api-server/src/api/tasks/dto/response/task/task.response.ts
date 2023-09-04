import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { TaskPriority } from "../../../../../lib/utils/enum/task-priority.enum";
import { ITask } from "../../../../../config/db/schemas/task.schema";

extendZodWithOpenApi(z);
export const taskResponseSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    done: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    priority: z.nativeEnum(TaskPriority),
  })
  .openapi("TaskResponse");

export type TaskResponse = z.infer<typeof taskResponseSchema>;

export const mapTaskToTaskResponse = (task: ITask): TaskResponse => ({
  id: task._id,
  title: task.title,
  description: task.description,
  done: task.done,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt,
  priority: task.priority,
});
