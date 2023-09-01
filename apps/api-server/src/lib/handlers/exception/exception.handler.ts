import { InternalException } from "../../exceptions/internal.exception";
import { NextFunction, Request, Response } from "express";
import { logEvent } from "../../utils/logger/logger";
import { Severity } from "../../utils/enum/severity";
import { AppRequest } from "../../types/request";

export const errorHandler = (
  err: InternalException,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  console.log(123);
  console.log(421, err);

  // check status of error
  logEvent("error", undefined, {
    exception: err,
    request: req as AppRequest,
    resource: "exception-handler",
    severity: Severity.Error,
  });

  // format message

  res.send({
    message: "Something went wrong",
  });

  // log to sentry
};
