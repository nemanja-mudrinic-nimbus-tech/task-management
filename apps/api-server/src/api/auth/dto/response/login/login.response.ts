import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { IUser } from "../../../../../config/db/schemas/user.schema";

extendZodWithOpenApi(z);
export const loginResponseSchema = z
  .object({
    accessToken: z.string(),
    user: z.object({
      id: z.string(),
      username: z.string().email({ message: "Enter valid email" }),
    }),
  })
  .openapi("LoginResponse");

export type LoginResponse = z.infer<typeof loginResponseSchema>;

// TODO: Move mappers to utils or somewhere else
export const mapUserToUserLoginResponse = (user: IUser) => ({
  id: user._id,
  username: user.username,
});
