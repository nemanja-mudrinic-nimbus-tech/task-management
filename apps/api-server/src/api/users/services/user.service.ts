import { AppPromise } from "../../../lib/types/app-result";
import { IUserService } from "./user.service.interface";
import { IUserRepository } from "../repository/user.repository.interface";
import { PartialUserResponse } from "../dto/response/partial-user.response";
import { Failure, Success } from "result";
import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";
import { mapUserToPartialResponse } from "../../../lib/utils/mapper/user.mapper";

class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async getMe(id: string): AppPromise<PartialUserResponse> {
    const userResults = await this.userRepository.findUserById(id);
    
    if (!userResults.isSuccess()) {
      return Failure.create(new BadRequestException("User does not exist"));
    }

    return Success.create(mapUserToPartialResponse(userResults.value));
  }
}

export default UserService;
