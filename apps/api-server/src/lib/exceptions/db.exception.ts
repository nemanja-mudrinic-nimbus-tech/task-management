import { InternalException } from "./internal.exception";
import { Severity } from "../utils/enum/severity.enum";

export class DBException extends InternalException {
  constructor(
    detail?: string,
    code = "error.databaseException",
    title = "Database exception",
    severity = Severity.Error,
  ) {
    super({
      detail,
      code: code,
      status: 500,
      title: title,
      severity,
      message: detail
    });
  }
}
