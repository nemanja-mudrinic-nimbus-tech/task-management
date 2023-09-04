import { taskResponseSchema } from "./task.response";
import { TaskPriority } from "../../../../../lib/utils/enum/task-priority.enum";

describe("taskResponseSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      id: "12345",
      title: "Task Title",
      description: "Task Description",
      done: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: TaskPriority.High,
    };

    const validationResult = taskResponseSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on non-boolean done field", () => {
    const invalidDoneData: any = {
      id: "12345",
      title: "Task Title",
      description: "Task Description",
      done: "maybe",
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: TaskPriority.High,
    };

    const validationResult = taskResponseSchema.safeParse(invalidDoneData);

    expect(validationResult.success).toBeFalsy();
  });

  it("should fail validation on missing fields", () => {
    const missingFieldsData: any = {
      id: "12345",
      title: "Task Title",
      done: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const validationResult = taskResponseSchema.safeParse(missingFieldsData);

    expect(validationResult.success).toBeFalsy();
  });
});
