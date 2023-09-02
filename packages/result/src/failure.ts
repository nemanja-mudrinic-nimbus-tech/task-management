import { Success } from './success';

export class Failure<T> {
  readonly error: T;

  private constructor(error: T) {
    this.error = error;
  }

  isFailure(): this is Failure<T> {
    return true;
  }

  isSuccess(): this is Success<never> {
    return false;
  }

  static create<U>(error: U): Failure<U> {
    return new Failure(error);
  }
}
