import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const partialUserResponseSchema = z
  .object({
    id: z.string(),
    username: z.string().email({ message: "Enter valid email" }),
  })
  .openapi("PartialUserResponse");

export type PartialUserResponse = z.infer<typeof partialUserResponseSchema>;
