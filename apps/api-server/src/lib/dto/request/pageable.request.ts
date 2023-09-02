import { z } from "zod";

export const pageableRequestSchema = z.object({
  limit: z.number().optional(),
});
