import { Request } from "express";

export interface AppRequest<P = {}, ResBody = {}, ReqBody = {}, Query = {}>
  extends Request<P, ResBody, ReqBody, Query, {}> {
  requestId: string;
  userId?: string;
  requestStart: [number, number];
}
