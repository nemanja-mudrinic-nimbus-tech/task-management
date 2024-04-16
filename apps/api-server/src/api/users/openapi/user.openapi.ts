import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { registry } from "../../../config/swagger/swagger-registry";
import { z } from "zod";
import { partialUserResponseSchema } from "../dto/response/partial-user.response";

extendZodWithOpenApi(z);

export const registerUserApi = () => {
  registry.registerPath({
    tags: ["Users"],
    method: "get",
    path: "api/v1/me",
    description: "Get me endpoint",
    responses: {
      200: {
        description: "Object with user data.",
        content: {
          "application/json": {
            schema: partialUserResponseSchema,
          },
        },
      },
    },
  });
};