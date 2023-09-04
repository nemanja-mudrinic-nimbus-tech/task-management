import { z } from "zod";

export const pageableRequestSchema = z.object({
  limit: z
    .number()
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((n) => n >= 0)
    .optional(),
  offset: z
      .number()
      .or(z.string().regex(/\d+/).transform(Number))
      .refine((n) => n >= 0)
      .optional(),
  direction: z.enum(["asc", "desc"]).optional(),
});
