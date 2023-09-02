import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const taskResponseSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    done: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    priority: z.string(),
  })
  .openapi("TaskResponse");

export type TaskResponse = z.infer<typeof taskResponseSchema>;
