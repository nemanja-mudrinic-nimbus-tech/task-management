import { createTaskRequestRequestSchema } from "./create-task.request";

describe("createTaskRequestRequestSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      title: "Some Task Title",
      description: "Some Task Description",
      priority: "HIGH",
    };

    const validationResult =
      createTaskRequestRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should validate data with optional fields missing", () => {
    const validData = {
      title: "Only Title",
    };

    const validationResult =
      createTaskRequestRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on missing title", () => {
    const missingTitleData: any = {
      description: "Some Task Description",
    };

    const validationResult =
      createTaskRequestRequestSchema.safeParse(missingTitleData);

    expect(validationResult.success).toBeFalsy();
  });
});
