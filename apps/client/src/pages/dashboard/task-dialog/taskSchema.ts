import * as z from "zod";
import { FormNames } from "../../../shared/forms/formNames.ts";

enum TaskPriority {
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export const schema = z.object({
  title: z.string(),
  description: z.string().optional(),
  done: z.boolean().optional(),
  priority: z.nativeEnum(TaskPriority).optional(),
});

export type FormData = z.infer<typeof schema>;

export const taskFormFields: FormNames<FormData> = {
  title: "title",
  description: "description",
  done: "done",
  priority: "priority",
} as const;
