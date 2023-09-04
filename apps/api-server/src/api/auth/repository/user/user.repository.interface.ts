import { IUser } from "../../../../config/db/schemas/user.schema";
import { AppPromise } from "../../../../lib/types/app-result";
export interface IUserRepository {
  createUser(user: Partial<IUser>): AppPromise<IUser>;
  findUserByUsername(username: string): AppPromise<IUser>;
}
