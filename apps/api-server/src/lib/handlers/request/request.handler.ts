import { NextFunction, Request, Response } from "express";
import { getClientIp } from "request-ip";

import { AppRequest } from "../../types/request";
import { makeId } from "../../utils/uuid/uuid";
import { Severity } from "../../utils/enum/severity.enum";
import { logEvent } from "../../utils/logger/logger";

export const requestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  (req as AppRequest).requestId = makeId();
  (req as AppRequest).requestStart = process.hrtime();

  // Add tracker to frontend
  res.setHeader("X-API-REQUEST-ID", (req as AppRequest).requestId);

  next();
};

export const responseHandler = (
  req: Request,
  res: Response,
  next: Function,
) => {
  const end = process.hrtime((req as AppRequest).requestStart);

  const eventLog = {
    remoteIp: getClientIp(req as AppRequest) || undefined,
    requestId: (req as AppRequest).requestId,
    requestRoute: `${(req as AppRequest).method}:${(req as AppRequest).route
      ?.path}`,
    requestUrl: `${(req as AppRequest).method}:${(req as AppRequest).url}`,
    responseCode: res?.statusCode,
  };

  if ((req as AppRequest).requestStart) {
    // @ts-ignore
    eventLog["responseTime"] = (end[0] * 1e9 + end[1]) / 1000000;
  }

  logEvent("Response", eventLog, {
    request: req as AppRequest,
    severity: Severity.Info,
  });

  next();
};
