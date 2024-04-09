import { AppPromise } from "../../../lib/types/app-result";
import { PartialUserResponse } from "../dto/response/partial-user.response";

export interface IUserService {
  getMe(id: string): AppPromise<PartialUserResponse>;
}
