import express from "express";
import cors from "cors";
import {
  requestHandler,
  responseHandler,
} from "./lib/handlers/request/request.handler";
import appRoute from "./lib/health/health.controller";

const app = express();

(async () => {
  app.use(cors());
  app.use(express.json());
  app.use(requestHandler);

  app.use(appRoute);

  app.use(responseHandler);

  app.listen(3000, () => console.log("Server is running"));
})();
