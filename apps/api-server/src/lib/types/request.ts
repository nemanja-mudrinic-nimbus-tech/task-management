import { Request } from "express";

export interface AppRequest extends Request {
  requestId: string;
  requestStart: [number, number];
}
