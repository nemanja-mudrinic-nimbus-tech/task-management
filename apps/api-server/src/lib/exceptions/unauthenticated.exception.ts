import { InternalException } from "./internal.exception";
import { Severity } from "../utils/enum/severity.enum";

export class UnauthenticatedException extends InternalException {
  constructor() {
    super({
      detail: "Unauthenticated",
      code: "error.unauthenticatedFound",
      status: 401,
      title: "Unauthenticated",
      severity: Severity.Info,
    });
  }
}
