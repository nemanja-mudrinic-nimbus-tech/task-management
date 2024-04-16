import { IUser } from "src/config/db/schemas/user.schema";

export const mapUserToPartialResponse = (user: IUser) => ({
  id: user._id,
  username: user.username,
});
