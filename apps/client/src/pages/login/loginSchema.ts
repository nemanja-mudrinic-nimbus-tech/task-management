import * as z from "zod";

import { FormNames } from "../../shared/forms/formNames";

export const schema = z.object({
  username: z.string().email(),
  password: z.string().min(3),
});

export type FormData = z.infer<typeof schema>;

export const loginFormFields: FormNames<FormData> = {
  username: "username",
  password: "password",
} as const;
