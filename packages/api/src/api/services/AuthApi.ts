/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from "../models/LoginRequest";
import type { LoginResponse } from "../models/LoginResponse";
import type { RegistrationRequest } from "../models/RegistrationRequest";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AuthApi {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * Login endpoint
   * @param requestBody body
   * @returns LoginResponse Object with user data.
   * @throws ApiError
   */
  public postApiV1AuthLogin(
    requestBody?: LoginRequest,
  ): CancelablePromise<LoginResponse> {
    return this.httpRequest.request({
      method: "POST",
      url: "api/v1/auth/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * Registration endpoint
   * @param requestBody body
   * @returns any Object with user data.
   * @throws ApiError
   */
  public postApiV1AuthRegistration(
    requestBody?: RegistrationRequest,
  ): CancelablePromise<any> {
    return this.httpRequest.request({
      method: "POST",
      url: "api/v1/auth/registration",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
