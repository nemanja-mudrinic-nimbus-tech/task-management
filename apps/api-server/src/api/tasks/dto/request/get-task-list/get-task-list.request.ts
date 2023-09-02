import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { pageableRequestSchema } from "../../../../../lib/dto/request/pageable.request";

extendZodWithOpenApi(z);

const getTaskListQuerySchema = z
  .object({
    title: z.string().optional(),
    createdAt: z.date().optional(),
    done: z.boolean().optional(),
    priority: z.string().optional(),
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
