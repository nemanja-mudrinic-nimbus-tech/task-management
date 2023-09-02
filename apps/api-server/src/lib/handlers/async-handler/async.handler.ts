import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../exception/exception.handler";
import {
  ValidatedRequestSchemas,
  validateRequest,
} from "../validator/zod-validator";

export const asyncHandler = (
  fn: Function,
  validationSchemas?: ValidatedRequestSchemas,
) => {
  const requestPipe = [];

  if (validationSchemas) {
    requestPipe.push((req: Request, res: Response, next: NextFunction) =>
      Promise.resolve(validateRequest(validationSchemas)(req, res, next))
        .then(next)
        .catch(next),
    );
  }

  requestPipe.push((req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next))
      .then(next)
      .catch(next),
  );

  return [...requestPipe, errorHandler];
};
