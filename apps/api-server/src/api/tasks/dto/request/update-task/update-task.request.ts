import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const updateTaskRequestRequestSchema = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    done: z.boolean().optional(),
    priority: z.string().optional(),
  })
  .openapi("UpdateTaskRequest", {
    example: {
      title: "asc",
    },
  });

export type UpdateTaskRequest = z.infer<typeof updateTaskRequestRequestSchema>;
