import { z } from "zod";

export const pageableRequestSchema = z.object({
  limit: z.number().optional(),
  offset: z.number().optional(),
  direction: z.enum(["asc", "desc"]).optional(),
});
