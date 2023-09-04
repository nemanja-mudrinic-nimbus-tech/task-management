import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedException } from "../../exceptions/unauthenticated.exception";
import { UnauthorizedException } from "../../exceptions/unauthorized.exception";
import { AppRequest } from "../../types/request";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const url = req.url;

  if (url.includes("auth") || url.includes("health-check")) {
    return next();
  }

  if (token == null) {
    throw new UnauthenticatedException();
  }

  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);
    // @ts-ignore
    (req as AppRequest).userId = jwtPayload["id"];
  } catch (error) {
    throw new UnauthorizedException();
  } finally {
    return next();
  }
};
