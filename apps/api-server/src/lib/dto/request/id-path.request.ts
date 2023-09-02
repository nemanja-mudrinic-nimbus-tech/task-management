import { z } from "zod";

export const idPathRequestSchema = z.object({
  id: z.string(),
});

export type IdPathRequest = z.infer<typeof idPathRequestSchema>;
