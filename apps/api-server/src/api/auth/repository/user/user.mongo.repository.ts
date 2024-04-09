import { MongoRepository } from "../../../../config/db/repository/mongo.repository";
import { IUser, User } from "../../../../config/db/schemas/user.schema";
import { IUserRepository } from "./user.repository.interface";
import { AppPromise } from "../../../../lib/types/app-result";
import { Failure, Success } from "result";
import { BadRequestException } from "../../../../lib/exceptions/bad-request.exception";
import { DBException } from "../../../../lib/exceptions/db.exception";

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
    } catch (error: any) {
      return Failure.create<DBException>(new DBException(`${error.message}`));
    }
  }

  public async findUserByUsername(username: string): AppPromise<IUser> {
    try {
      const user = await this.model.findOne({ username });

      if (!user) {
        return Failure.create(new BadRequestException("User not found"));
      }

      return Success.create(user);
    } catch (error: any) {
      return Failure.create<DBException>(new DBException(`${error.message}`));
    }
  }
}

export default new UserMongoRepository();
