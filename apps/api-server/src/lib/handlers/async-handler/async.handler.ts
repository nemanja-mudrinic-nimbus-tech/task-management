import { NextFunction, Request, Response } from "express";
import { errorHandler } from "../exception/exception.handler";

export const asyncHandler = (fn: Function) => [
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next))
      .then(next)
      .catch(next),
  errorHandler,
];
