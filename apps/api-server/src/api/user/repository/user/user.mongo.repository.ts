import { MongoRepository } from "../../../../config/db/repository/mongo.repository";
import { IUser, User } from "../../../../config/db/schemas/user.schema";
import { IUserRepository } from "./user.repository.interface";
import { AppPromise } from "../../../../lib/types/app-result";
import { Failure, Success } from "result";
import { BadRequestException } from "../../../../lib/exceptions/bad-request.exception";

class UserMongoRepository
  extends MongoRepository<IUser>
  implements IUserRepository
{
  constructor() {
    super(User);
  }
  async createUser(): AppPromise<IUser> {
    const createdUser = await this.model.create({
      username: "nemanj12a@email.com",
      password: `${new Date().getTime()}-123`,
    });

    return Success.create(createdUser);
  }

  public async findUserByUsername(username: string): AppPromise<IUser> {
    const user = await this.model.findOne({ username });

    if (!user) {
      return Failure.create(new BadRequestException("User not found"));
    }

    return Success.create({ username: "nemanja", password: "123", tasks: [] });
  }
}

export default new UserMongoRepository();
