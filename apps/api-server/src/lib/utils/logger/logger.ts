import { AppRequest } from "../../types/request";
import { InternalException } from "../../exceptions/internal.exception";
import { Severity } from "../enum/severity";

export const logEvent = (
  message: string,
  meta: Record<string, unknown> | undefined,
  context: {
    exception?: InternalException;
    request?: AppRequest;
    resource?: string;
    severity: Severity;
  },
): void => {
  const event = {
    message,
    severity: context?.severity,
    resource: context?.resource,
    meta: meta && Object.keys(meta || {}).length > 0 ? exports : undefined,
    requestId: context?.request?.requestId || meta?.requestId || undefined,
  };
  if (context.exception) {
    if (!event.meta) {
      event.meta = {};
    }

    event.meta.exception = {
      stack: context.exception.stack,
      name: context.exception.name,
      message: context.exception.message,
    };
  }

  const niceMessage = [
    Severity.Error,
    Severity.Critical,
    Severity.Fatal,
    Severity.Warning,
  ].includes(context.severity)
    ? `\x1B[31m${message}\x1B[0m`
    : `\x1B[32m${message}\x1B[0m`;

  const niceExtra =
    event.meta && Object.keys(event.meta).length > 0
      ? "\n" + JSON.stringify(event.meta, null, 2)
      : "";

  console.log(
    `${new Date().toISOString()} [${event.severity}] ${
      event.resource || "-"
    }  "${niceMessage}" ${event.requestId || "-"}${niceExtra}`,
  );
};
