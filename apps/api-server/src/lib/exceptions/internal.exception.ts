import { Severity } from "../utils/enum/severity";

export interface InternalException extends Error {
  response: string;
  status: number;
  severity?: Severity;
  title?: string;
  detail?: string;
  meta?: unknown;
}
