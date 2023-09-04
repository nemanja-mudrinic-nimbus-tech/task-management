import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { TaskPriority } from "../../../../../lib/utils/enum/task-priority.enum";

extendZodWithOpenApi(z);
export const createTaskRequestRequestSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
  })
  .openapi("CreateTaskRequest", {
    example: {
      title: "asc",
      description: "task description",
    },
  });

export type CreateTaskRequest = z.infer<typeof createTaskRequestRequestSchema>;
