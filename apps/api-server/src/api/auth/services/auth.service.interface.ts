import { RegistrationRequest } from "../dto/request/registration/registration.request";
import { LoginRequest } from "../dto/request/login/login.request";
import { LoginResponse } from "../dto/response/login/login.response";

import { AppPromise } from "../../../lib/types/app-result";
import { RefreshTokenResponse } from "../dto/response/refresh-token/refresh-token.response";

export interface IAuthService {
  signUp(signUp: RegistrationRequest): AppPromise<Promise<void>>;
  signIn(signIn: LoginRequest): AppPromise<LoginResponse>;
  refreshToken(refreshToken: string): AppPromise<RefreshTokenResponse>;
}
