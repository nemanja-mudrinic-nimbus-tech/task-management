import { InternalException } from "../exceptions/internal.exception";
import {Result} from "../utils/result";

export type AppResult<T> = Result<InternalException, T>;

export type AppPromise<T> = Promise<AppResult<T>>;
