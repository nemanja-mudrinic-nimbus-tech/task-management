import { taskListResponseSchema } from "./task-list.response";

describe("taskListResponseSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      items: [
        {
          id: "12345",
          title: "Task Title",
          description: "Task Description",
          done: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          priority: "HIGH",
        },
      ],
      count: 1,
    };

    const validationResult = taskListResponseSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on invalid task items", () => {
    const invalidTaskData: any = {
      items: [
        {
          id: "12345",
          title: "Task Title",
          description: "Task Description",
          createdAt: new Date(),
          updatedAt: new Date(),
          priority: "HIGH",
        },
      ],
      count: 1,
    };

    const validationResult = taskListResponseSchema.safeParse(invalidTaskData);

    expect(validationResult.success).toBeFalsy();
  });

  it("should fail validation on missing pagination fields", () => {
    const missingPaginationData: any = {
      items: [
        {
          id: "12345",
          title: "Task Title",
          description: "Task Description",
          done: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          priority: "HIGH",
        },
      ],
    };

    const validationResult = taskListResponseSchema.safeParse(
      missingPaginationData,
    );

    expect(validationResult.success).toBeFalsy();
  });
});
