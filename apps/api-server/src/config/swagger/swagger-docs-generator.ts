import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import * as yaml from "yaml";
import fs from "fs";
import { Express, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { registry } from "./swagger-registry";
import { registerAuthApi } from "../../api/auth/openapi/auth.openapi";
import { registerTaskApi } from "../../api/tasks/openapi/task.openapi";
import { ROUTE_API_V1 } from "../../lib/utils/routes/routes";
import { registerUserApi } from "../../api/users/openapi/user.openapi";

const getOpenApiDocumentation = () => {
  registerAuthApi();
  registerTaskApi();
  registerUserApi();

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "Task Management",
      description: "This is the Task Management API",
    },
    servers: [{ url: "api/v1" }],
  });
};

export const writeDocumentation = () => {
  // OpenAPI JSON
  const docs = getOpenApiDocumentation();

  // YAML equivalent
  const fileContent = yaml.stringify(docs);

  fs.writeFileSync(`openapi-docs.yml`, fileContent, {
    encoding: "utf-8",
  });
};

export const configureSwagger = (app: Express) => {
  writeDocumentation();

  const file = fs.readFileSync(`openapi-docs.yml`, {
    encoding: "utf-8",
  });
  const swaggerDocument = yaml.parse(file);

  app.use(`${ROUTE_API_V1}/docs-json`, (req: Request, res: Response) => {
    res.send(swaggerDocument);
  });

  app.use(
    `${ROUTE_API_V1}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument),
  );
};
