import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { pageableResponseSchema } from "../../../../../lib/dto/response/pageable.response";
import { TaskResponse } from "../task/task.response";

extendZodWithOpenApi(z);
export const taskListResponseSchema = pageableResponseSchema<TaskResponse>(
  z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    done: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    priority: z.string(),
  }),
).openapi("TaskListResponse");

export type TaskListResponse = z.infer<typeof taskListResponseSchema>;
