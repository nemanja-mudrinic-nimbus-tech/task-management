import { IUser } from "../../../config/db/schemas/user.schema";
import { AppPromise } from "../../../lib/types/app-result";

export interface IUserRepository {
  findUserById(id: string): AppPromise<IUser>;
}
