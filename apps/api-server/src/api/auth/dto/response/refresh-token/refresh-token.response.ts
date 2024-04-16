import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const refreshTokenResponseSchema = z
  .object({
    accessToken: z.string(),
    refreshToken: z.string(),
  })
  .openapi("RefreshTokenResponse");

export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
