import { InternalException } from "./internal.exception";
import { Severity } from "../utils/enum/severity.enum";

export class ValidationException extends InternalException {
  constructor(detail?: string, meta?: unknown) {
    super({
      message: "Validation error",
      detail,
      code: "error.validationError",
      status: 422,
      title: "Validation error",
      severity: Severity.Info,
      meta,
    });
  }
}
