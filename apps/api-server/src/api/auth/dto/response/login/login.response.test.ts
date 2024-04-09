import { loginResponseSchema } from "./login.response";

describe("loginResponseSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      accessToken: "someToken",
      refreshToken: "refreshToken",
      user: {
        id: "12345",
        username: "johndoe@email.com",
      },
    };

    const validationResult = loginResponseSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on incorrect email format", () => {
    const invalidEmailData = {
      accessToken: "someToken",
      refreshToken: "refreshToken",
      user: {
        id: "12345",
        username: "johndoemail.com",
      },
    };

    const validationResult = loginResponseSchema.safeParse(invalidEmailData);

    expect(validationResult.success).toBeFalsy();
    if (!validationResult.success) {
      expect(validationResult.error.issues[0].message).toBe(
        "Enter valid email",
      );
    }
  });

  it("should fail validation on missing fields", () => {
    const missingFieldsData: any = {
      accessToken: "someToken",
    };

    const validationResult = loginResponseSchema.safeParse(missingFieldsData);

    expect(validationResult.success).toBeFalsy();
  });
});
