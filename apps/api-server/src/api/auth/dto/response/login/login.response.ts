import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

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
