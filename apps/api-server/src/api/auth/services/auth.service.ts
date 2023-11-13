import { IAuthService } from "./auth.service.interface";
import { RegistrationRequest } from "../dto/request/registration/registration.request";
import { LoginRequest } from "../dto/request/login/login.request";
import {
  LoginResponse,
  mapUserToUserLoginResponse,
} from "../dto/response/login/login.response";
import { AppPromise } from "../../../lib/types/app-result";
import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";
import { IUserRepository } from "../repository/user/user.repository.interface";
import { hashSync, compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../../../config/db/schemas/user.schema";
import {Success} from "../../../lib/utils/success";
import {Failure} from "../../../lib/utils/failure";

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
      return Failure.create(new BadRequestException("bad credentials"));
    }

    const user = userResult.value;

    if (!compareSync(loginRequest.password, user.password)) {
      return Failure.create(new BadRequestException("bad credentials"));
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

    return Success.create({
      user: mapUserToUserLoginResponse(user),
      accessToken,
    });
  }
  private async getUserByUsername(username: string): AppPromise<IUser> {
    const userResults = await this.userRepository.findUserByUsername(username);
    if (!userResults.isSuccess()) {
      return Failure.create(new BadRequestException("User does not exist"));
    }

    return Success.create(userResults.value);
  }
}

export default AuthService;
