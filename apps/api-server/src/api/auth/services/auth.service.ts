import { IAuthService } from "./auth.service.interface";
import { RegistrationRequest } from "../dto/request/registration/registration.request";
import { LoginRequest } from "../dto/request/login/login.request";
import {
  LoginResponse,
  mapUserToUserLoginResponse,
} from "../dto/response/login/login.response";
import { AppPromise } from "../../../lib/types/app-result";
import { Failure, Success } from "result";
import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";
import { IUserRepository } from "../repository/user/user.repository.interface";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../../../config/db/schemas/user.schema";
import { RefreshTokenResponse } from "../dto/response/refresh-token/refresh-token.response";
import { InternalException } from "src/lib/exceptions/internal.exception";

class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }
  public async signUp(
    registrationRequest: RegistrationRequest,
  ): AppPromise<Promise<void>> {
    const userResult = await this.getUserByUsername(
      registrationRequest.username,
    );

    if (userResult.isSuccess()) {
      return Failure.create(new BadRequestException("User already exist"));
    }

    const generatePassword = hashSync(registrationRequest.password, 10);

    const creatingResults = await this.userRepository.createUser({
      username: registrationRequest.username,
      password: generatePassword,
    });

    if (!creatingResults.isSuccess()) {
      throw creatingResults.error;
    }

    return Success.create(Promise.resolve());
  }

  public async signIn(loginRequest: LoginRequest): AppPromise<LoginResponse> {
    const userResult = await this.getUserByUsername(loginRequest.username);

    if (userResult.isFailure()) {
      return Failure.create(new BadRequestException("Bad credentials"));
    }

    const user = userResult.value;

    if (!compareSync(loginRequest.password, user.password)) {
      return Failure.create(new BadRequestException("Bad credentials"));
    }

    // 1 hour token
    const accessToken = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_SECRET! || "testSecret123",
      {
        expiresIn: "3600s",
      },
    );

    // 1 day token
    const refreshToken = jwt.sign(
      {
        username: user.username,
        id: user._id,
      },
      process.env.JWT_REFRESH_SECRET || "refreshSecret123",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "1d",
      }
    );

    return Success.create({
      user: mapUserToUserLoginResponse(user),
      accessToken,
      refreshToken,
    });
  }
  private async getUserByUsername(username: string): AppPromise<IUser> {
    const userResults = await this.userRepository.findUserByUsername(username);
    if (!userResults.isSuccess()) {
      return Failure.create(new BadRequestException("User does not exist"));
    }

    return Success.create(userResults.value);
  }

  public async refreshToken(refreshToken: string): AppPromise<RefreshTokenResponse> {
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || "refreshSecret123")
      const accessToken = jwt.sign(
        {
        // @ts-ignore
        username: decoded.username,
        // @ts-ignore
        id: decoded.id,
        },
        process.env.JWT_SECRET! || "testSecret123",
        {
          expiresIn: "3600s",
        }
      );
      
      return Success.create({
        // @ts-ignore
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } catch (error: any) {
      return Failure.create<BadRequestException>(new BadRequestException('Refresh token is not in valid format'));
    }
  }
}

export default AuthService;
