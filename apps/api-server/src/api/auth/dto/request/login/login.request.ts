import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const loginRequestSchema = z
  .object({
    username: z.string().email({ message: "Enter valid email" }),
    password: z
      .string()
      .min(5, { message: "Password needs to be at least 5 letters long!" }),
  })
  .openapi("LoginRequest", {
    example: {
      username: "johndoe@email.com",
      password: "12345",
    },
  });

export type LoginRequest = z.infer<typeof loginRequestSchema>;
