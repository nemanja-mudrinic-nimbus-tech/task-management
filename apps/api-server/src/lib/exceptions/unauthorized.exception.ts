import { InternalException } from "./internal.exception";
import { Severity } from "../utils/enum/severity.enum";

export class UnauthorizedException extends InternalException {
  constructor() {
    super({
      detail: "Unauthorized",
      code: "error.unauthorizedFound",
      status: 403,
      title: "Unauthorized",
      severity: Severity.Info,
    });
  }
}
