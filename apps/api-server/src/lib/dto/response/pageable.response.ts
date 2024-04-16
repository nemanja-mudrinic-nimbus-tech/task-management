import { z, ZodType } from "zod";

export const pageableResponseSchema = <T>(itemSchema: ZodType<T>) =>
  z.object({
    items: z.array(itemSchema),
    totalItems: z.number(),
    totalPages: z.number(),
    page: z.number(),
  });

type PageableResponseSchemaType<T extends ZodType<any, any>> = ReturnType<
  typeof pageableResponseSchema<T>
>;

export type PageableResponse<T extends ZodType> = z.infer<
  PageableResponseSchemaType<T>
>;
