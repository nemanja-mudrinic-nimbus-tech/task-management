import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const createTaskRequestRequestSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    priority: z.string().optional(),
  })
  .openapi("CreateTaskRequest", {
    example: {
      title: "asc",
      description: "task description",
    },
  });

export type CreateTaskRequest = z.infer<typeof createTaskRequestRequestSchema>;
