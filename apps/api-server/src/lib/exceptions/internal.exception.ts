import { Severity } from "../utils/enum/severity";

export abstract class InternalException extends Error {
  response: string;
  status: number;
  severity?: Severity;
  title?: string;
  detail?: string;
  meta?: unknown;
  code?: string;
  protected constructor(data: {
    title: string;
    message?: string;
    status?: number;
    code?: string;
    detail?: string;
    severity?: Severity;
    meta?: unknown
  }) {
    super(data.message || data.detail || data.title);
    this.title = data.title;
    this.status = data.status || 500;
    this.detail = data.detail;
    this.severity = data.severity;
    this.code = data.code;
    this.meta = data.meta
  }
}
