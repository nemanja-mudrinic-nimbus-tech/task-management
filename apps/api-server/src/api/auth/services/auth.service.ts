import { IAuthService } from "./auth.service.interface";
import { RegistrationRequest } from "../dto/request/registration/registration.request";
import { LoginRequest } from "../dto/request/login/login.request";
import { LoginResponse } from "../dto/response/login/login.response";
import { AppPromise, AppResult } from "../../../lib/types/app-result";
import { Failure, Success } from "result";
import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";

class AuthService implements IAuthService {
  public async signUp(
    registrationRequest: RegistrationRequest,
  ): AppPromise<Promise<void>> {
    const userResult = await this.getUserByUsername(
      registrationRequest.username,
    );

    if (userResult.isSuccess()) {
      return Failure.create(new BadRequestException("User already exist"));
    }

    return Success.create(Promise.resolve());
  }

  public async signIn(loginRequest: LoginRequest): AppPromise<LoginResponse> {
    const userResult = await this.getUserByUsername(loginRequest.username);

    if (userResult.isFailure()) {
      return Failure.create(new BadRequestException("bad credentials"));
    }

    const user = userResult.value;

    if (loginRequest.password !== user.password) {
      return Failure.create(new BadRequestException("bad credentials"));
    }

    return Success.create({
      user: {
        id: "124",
        username: "dummy@test.com",
      },
      accessToken: "dummyToken",
    });
  }
  private async getUserByUsername(
    username: string,
  ): AppPromise<{ id: number; username: string; password: string }> {
    if (username !== "exist@test.com") {
      return Failure.create(new BadRequestException("User already exist"));
    }

    return Success.create({
      id: 1,
      username,
      password: "password",
    });
  }
}

export default new AuthService();
