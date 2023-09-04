import { MongoRepository } from "../../../../config/db/repository/mongo.repository";
import { IUser, User } from "../../../../config/db/schemas/user.schema";
import { IUserRepository } from "./user.repository.interface";
import { AppPromise } from "../../../../lib/types/app-result";
import { Failure, Success } from "result";
import { BadRequestException } from "../../../../lib/exceptions/bad-request.exception";
import { ServerInternalException } from "../../../../lib/exceptions/server-internal.exception";

class UserMongoRepository
  extends MongoRepository<IUser>
  implements IUserRepository
{
  constructor() {
    super(User);
  }
  async createUser(user: Partial<IUser>): AppPromise<IUser> {
    try {
      const createdUser = await this.model.create({
        username: user.username,
        password: user.password,
      });

      return Success.create(createdUser);
    } catch (error) {
      return Failure.create(
        new ServerInternalException((error as Error)?.message || undefined),
      );
    }
  }

  public async findUserByUsername(username: string): AppPromise<IUser> {
    const user = await this.model.findOne({ username });

    if (!user) {
      return Failure.create(new BadRequestException("User not found"));
    }

    return Success.create(user);
  }
}

export default new UserMongoRepository();
