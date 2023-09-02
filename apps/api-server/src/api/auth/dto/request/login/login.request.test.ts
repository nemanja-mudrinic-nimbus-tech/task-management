import { loginRequestSchema } from "./login.request";

describe("loginRequestSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      username: "johndoe@email.com",
      password: "password123",
    };

    const validationResult = loginRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on incorrect email format", () => {
    const invalidEmailData = {
      username: "johndoemail.com",
      password: "password123",
    };

    const validationResult = loginRequestSchema.safeParse(invalidEmailData);

    expect(validationResult.success).toBeFalsy();
    if (!validationResult.success) {
      expect(validationResult.error?.issues[0]?.message).toBe(
        "Enter valid email",
      );
    }
  });

  it("should fail validation when password is less than 5 characters", () => {
    const shortPasswordData = {
      username: "johndoe@email.com",
      password: "1234",
    };

    const validationResult = loginRequestSchema.safeParse(shortPasswordData);

    expect(validationResult.success).toBeFalsy();
    if (!validationResult.success) {
      expect(validationResult.error?.issues[0]?.message).toBe(
        "Password needs to be at least 5 letters long!",
      );
    }
  });

  it("should fail validation on missing fields", () => {
    const missingFieldsData: any = {}; // Note: Using 'any' here to bypass TypeScript's type check for this test scenario.

    const validationResult = loginRequestSchema.safeParse(missingFieldsData);

    expect(validationResult.success).toBeFalsy();
  });
});
