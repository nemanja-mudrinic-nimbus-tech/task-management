import { getTaskListQueryRequestSchema } from "./get-task-list.request";
import { TaskPriority } from "../../../../../lib/utils/enum/task-priority.enum";

describe("getTaskListQueryRequestSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      title: "Task Title",
      createdAt: new Date(),
      done: true,
      priority: TaskPriority.High,
      page: 1,
      size: 10,
    };

    const validationResult = getTaskListQueryRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should validate data with optional fields missing", () => {
    const validData = {
      page: 1,
      size: 10,
    };

    const validationResult = getTaskListQueryRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on invalid date", () => {
    const invalidDateData: any = {
      createdAt: "invalid-date",
      page: 1,
      size: 10,
    };

    const validationResult =
      getTaskListQueryRequestSchema.safeParse(invalidDateData);

    expect(validationResult.success).toBeFalsy();
  });
});
