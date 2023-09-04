import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { TaskPriority } from "../../../../../lib/utils/enum/task-priority.enum";

extendZodWithOpenApi(z);
export const updateTaskRequestRequestSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    done: z.boolean().optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
  })
  .openapi("UpdateTaskRequest", {
    example: {
      title: "asc",
    },
  });

export type UpdateTaskRequest = z.infer<typeof updateTaskRequestRequestSchema>;
