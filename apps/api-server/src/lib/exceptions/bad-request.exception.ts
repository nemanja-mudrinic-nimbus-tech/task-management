import { InternalException } from "./internal.exception";
import { Severity } from "../utils/enum/severity.enum";

export class BadRequestException extends InternalException {
  // TODO: Pass an object instead of this
  constructor(
    detail?: string,
    code?: string,
    title = "Bad request",
    severity = Severity.Info,
  ) {
    super({
      detail,
      code: code || "bad-request",
      status: 400,
      title,
      severity,
    });
  }
}
