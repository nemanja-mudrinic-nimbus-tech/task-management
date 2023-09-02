import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { registry } from "../../../config/swagger/swagger-registry";
import { createTaskRequestRequestSchema } from "../dto/request/create-task/create-task.request";
import { taskResponseSchema } from "../dto/response/task/task.response";
import { updateTaskRequestRequestSchema } from "../dto/request/update-task/update-task.request";
import { taskListResponseSchema } from "../dto/response/task-list/task-list.response";
import { getTaskListQueryRequestSchema } from "../dto/request/get-task-list/get-task-list.request";

extendZodWithOpenApi(z);
export const registerTaskApi = () => {
  registry.registerPath({
    tags: ["Tasks"],
    method: "post",
    path: "api/v1/tasks",
    description: "Create task endpoint",
    request: {
      body: {
        description: "body",
        content: {
          "application/json": {
            schema: createTaskRequestRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Object with user data.",
        content: {
          "application/json": {
            schema: taskResponseSchema,
          },
        },
      },
    },
  });
  registry.registerPath({
    tags: ["Tasks"],
    method: "patch",
    path: `api/v1/tasks/{id}`,
    description: "Update task endpoint",
    request: {
      params: z.object({
        id: z.string().openapi({ example: "1212121" }),
      }),
      body: {
        description: "body",
        content: {
          "application/json": {
            schema: updateTaskRequestRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Object with user data.",
        content: {
          "application/json": {
            schema: taskResponseSchema,
          },
        },
      },
    },
  });
  registry.registerPath({
    tags: ["Tasks"],
    method: "delete",
    path: `api/v1/tasks/{id}`,
    description: "Delete task endpoint",
    request: {
      params: z.object({
        id: z.string().openapi({ example: "1212121" }),
      }),
    },
    responses: {
      204: {
        description: "Object with user data.",
        content: {},
      },
    },
  });
  registry.registerPath({
    tags: ["Tasks"],
    method: "get",
    path: `api/v1/tasks/{id}`,
    description: "Get task endpoint",
    request: {
      params: z.object({
        id: z.string().openapi({ example: "1212121" }),
      }),
    },
    responses: {
      200: {
        description: "Object with user data.",
        content: {
          "application/json": {
            schema: taskResponseSchema,
          },
        },
      },
    },
  });
  registry.registerPath({
    tags: ["Tasks"],
    method: "get",
    path: `api/v1/tasks`,
    description: "Get tasks endpoint",
    request: {
      query: getTaskListQueryRequestSchema,
    },
    responses: {
      200: {
        description: "Object with user data.",
        content: {
          "application/json": {
            schema: taskListResponseSchema,
          },
        },
      },
    },
  });
};
