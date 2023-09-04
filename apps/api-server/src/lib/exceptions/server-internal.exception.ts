import { InternalException } from "./internal.exception";
import { Severity } from "../utils/enum/severity.enum";

export class ServerInternalException extends InternalException {
  // TODO: Pass an object instead of this
  constructor(
    detail?: string,
    title = "Something went wrong",
    severity = Severity.Error,
  ) {
    super({
      detail,
      code: "unknown",
      status: 500,
      title,
      severity,
    });
  }
}
