import { InternalException } from "./internal.exception";
import { Severity } from "../utils/enum/severity.enum";

export class NotFoundException extends InternalException {
    // TODO: Pass an object instead of this
    constructor(
        detail?: string,
        code?: string,
        title = "Not found",
        severity = Severity.Info,
    ) {
        super({
            detail,
            code: code || "not-found",
            status: 404,
            title,
            severity,
        });
    }
}
