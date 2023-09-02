import { Result } from "result";
import { InternalException } from "../exceptions/internal.exception";

export type AppResult<T> = Result<InternalException, T>;

export type AppPromise<T> = Promise<AppResult<T>>;
