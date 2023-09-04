import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { pageableRequestSchema } from "../../../../../lib/dto/request/pageable.request";
import { TaskPriority } from "../../../../../lib/utils/enum/task-priority.enum";

extendZodWithOpenApi(z);

const getTaskListQuerySchema = z
  .object({
    title: z.string().optional(),
    createdAt: z.date().optional(),
    done: z.boolean().optional(),
    priority: z.nativeEnum(TaskPriority).optional(),
  })
  .openapi("GetTaskListQueryRequest", {
    example: {
      title: "asc",
    },
  });

export const getTaskListQueryRequestSchema = pageableRequestSchema.merge(
  getTaskListQuerySchema,
);

export type GetTaskListQueryRequest = z.infer<
  typeof getTaskListQueryRequestSchema
>;
