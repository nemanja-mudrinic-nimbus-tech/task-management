import { updateTaskRequestRequestSchema } from "./update-task.request";
import {TaskPriority} from "../../../../../lib/utils/enum/task-priority.enum";

describe("updateTaskRequestRequestSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      title: "Task Title",
      description: "Task Description",
      done: true,
      priority: TaskPriority.High,
    };

    const validationResult =
      updateTaskRequestRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should validate data with optional fields missing", () => {
    const validData = {
      title: "Task Title",
    };

    const validationResult =
      updateTaskRequestRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should validate data with only done field", () => {
    const validData = {
      done: false,
    };

    const validationResult =
      updateTaskRequestRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on non-boolean done field", () => {
    const invalidDoneData: any = {
      done: "maybe",
    };

    const validationResult =
      updateTaskRequestRequestSchema.safeParse(invalidDoneData);

    expect(validationResult.success).toBeFalsy();
  });
});
