import { loginRequestSchema } from "../dto/request/login/login.request";
import { registry } from "../../../config/swagger/swagger-registry";
import { loginResponseSchema } from "../dto/response/login/login.response";
import { registrationRequestSchema } from "../dto/request/registration/registration.request";
import { refreshTokenRequestSchema } from "../dto/request/refresh-token/refresh-token.request";
import { refreshTokenResponseSchema } from "../dto/response/refresh-token/refresh-token.response";

export const registerAuthApi = () => {
  registry.registerPath({
    tags: ["Auth"],
    method: "post",
    path: "api/v1/auth/login",
    description: "Login endpoint",
    request: {
      body: {
        description: "body",
        content: {
          "application/json": {
            schema: loginRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Object with user data.",
        content: {
          "application/json": {
            schema: loginResponseSchema,
          },
        },
      },
    },
  });
  registry.registerPath({
    tags: ["Auth"],
    method: "post",
    path: "api/v1/auth/registration",
    description: "Registration endpoint",
    request: {
      body: {
        description: "body",
        content: {
          "application/json": {
            schema: registrationRequestSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: "Object with user data.",
        content: {},
      },
    },
  });

  registry.registerPath({
    tags: ["Auth"],
    method: "post",
    path: "api/v1/auth/refresh",
    description: "Refresh access token",
    request: {
      body: {
        description: "body",
        content: {
          "application/json": {
            schema: refreshTokenRequestSchema,
          },
        },
      },
    },
    responses: {
      200: {
        description: "Refreshed token resppnse",
        content: {
          "application/json": {
            schema: refreshTokenResponseSchema,
          },
        },
      },
    },
  });
};
