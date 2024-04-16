import { InternalException } from "../../exceptions/internal.exception";
import { NextFunction, Request, Response } from "express";
import { logEvent } from "../../utils/logger/logger";
import { Severity } from "../../utils/enum/severity.enum";
import { AppRequest } from "../../types/request";
import { BadRequestException } from "../../exceptions/bad-request.exception";
import { NotFoundException } from "../../exceptions/not-found.exception";
import { ValidationException } from "../../exceptions/validation.exception";
import { UnauthenticatedException } from "../../exceptions/unauthenticated.exception";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception";
import { DBException } from "../../../lib/exceptions/db.exception";

export const errorHandler = (
  err: InternalException,
  req: Request,
  res: Response,
  _: NextFunction,
) => {
  // check status of error
  logEvent("error", undefined, {
    exception: err,
    request: req as AppRequest,
    resource: "exception-handler",
    severity: Severity.Error,
  });

  if (
    err instanceof BadRequestException ||
    err instanceof NotFoundException ||
    err instanceof ValidationException ||
    err instanceof UnauthenticatedException ||
    err instanceof UnauthorizedException ||
    err instanceof DBException
  ) {
    return res.status(err.status).send({
      message: err.message || err.detail || err.title,
      code: err.code,
    });
  }

  // TODO: log to sentry

  return res.send({
    message: "Something went wrong",
    code: "serverError",
  });
};
