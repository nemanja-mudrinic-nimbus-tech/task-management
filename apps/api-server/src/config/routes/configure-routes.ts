import { Application, NextFunction, Request, Response, Router } from "express";

import appRoute from "../../lib/health/health.controller";
import tasksController from "../../api/tasks/controller/tasks.controller";
import authController from "../../api/auth/controller/auth.controller";

import { ROUTE_API_V1 } from "../../lib/utils/routes/routes";

const router = Router({ mergeParams: true });

export const configureRoutes = (app: Application) => {
  app.use(ROUTE_API_V1, router);
  router.use(appRoute);
  router.use(tasksController);
  router.use(authController);
};
