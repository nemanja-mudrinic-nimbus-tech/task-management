import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

import { configureSwagger } from "./config/swagger/swagger-docs-generator";
import {
  requestHandler,
  responseHandler,
} from "./lib/handlers/request/request.handler";
import { configureRoutes } from "./config/routes/configure-routes";
import { openDbConnection } from "./config/db/config";

configDotenv();

const app = express();

(async () => {
  await openDbConnection();
  configureSwagger(app);

  app.use(cors());
  app.use(express.json());
  app.use(requestHandler);

  configureRoutes(app);
  app.use(responseHandler);

  // TODO: Use eventLog
  app.listen(process.env.APP_PORT, () =>
    console.log(`Server is running at port ${process.env.APP_PORT}`),
  );
})();
