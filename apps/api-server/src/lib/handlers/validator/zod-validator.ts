import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ValidationException } from "../../exceptions/validation.exception";

export type ValidatedRequestSchemas = {
  body?: ZodSchema<any>;
  params?: ZodSchema<any>;
  query?: ZodSchema<any>;
};

// TODO: Take time to make better validator
export const validateRequest = (schemas: ValidatedRequestSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.params) {
        req.params = schemas.params.parse(req.params);
      }

      if (schemas.query) {
        req.query = schemas.query.parse(req.query);
      }
    } catch (error: Error | unknown) {
      throw new ValidationException("Validation error", {
        validationError: (error as Error)?.message || undefined,
      });
    }
  };
};
