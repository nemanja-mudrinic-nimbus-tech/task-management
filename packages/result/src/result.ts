import { Failure } from './failure';
import { Success } from './success';

/**
 * Read about the usage here: https://dev.to/milos192/error-handling-with-the-either-type-2b63
 */
export type Result<T, U> = Failure<T> | Success<U>;
