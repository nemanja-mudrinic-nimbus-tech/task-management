import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);
export const refreshTokenRequestSchema = z
  .object({
    refreshToken: z.string(),
  })
  .openapi("RefreshTokenRequest");

export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
