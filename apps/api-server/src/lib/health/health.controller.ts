import { NextFunction, Request, Response, Router } from "express";
import { asyncHandler } from "../handlers/async-handler/async.handler";

const router = Router({ mergeParams: true });

router.get(
  "/health-check",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send({
      status: "ok",
    });
  }),
);

export default router;
