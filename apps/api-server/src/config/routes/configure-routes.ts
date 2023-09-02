import { Application, NextFunction, Request, Response, Router } from "express";

import appRoute from "../../lib/health/health.controller";
import tasksController from "../../api/tasks/controller/tasks.controller";
import authController from "../../api/auth/controller/auth.controller";
import { asyncHandler } from "../../lib/handlers/async-handler/async.handler";
import { NotFoundException } from "../../lib/exceptions/not-found.exception";
import { ROUTE_API_V1 } from "../../lib/utils/routes/routes";

const router = Router();

export const configureRoutes = (app: Application) => {
  router.use(appRoute);
  router.use(tasksController);
  router.use(authController);

  app.use(ROUTE_API_V1, router);
  app.use(
    "/*",
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      throw new NotFoundException(`Route not found under ${req.url}`);
    }),
  );
};
