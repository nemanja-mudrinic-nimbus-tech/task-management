import { Failure } from './failure';

export class Success<T> {
  readonly value: T;

  private constructor(value: T) {
    this.value = value;
  }

  isFailure(): this is Failure<never> {
    return false;
  }

  isSuccess(): this is Success<T> {
    return true;
  }

  static create<U>(value: U): Success<U> {
    return new Success(value);
  }
}
