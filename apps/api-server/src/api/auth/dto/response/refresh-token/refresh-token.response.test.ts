import { refreshTokenResponseSchema } from "./refresh-token.response";

describe("refreshTokenResponseSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      accessToken: "someToken",
      refreshToken: "refreshToken",
    };

    const validationResult = refreshTokenResponseSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on incorrect fields format", () => {
    const invalidData = {
      accessToken: 123,
      refreshToken: "refreshToken",
    };

    const validationResult = refreshTokenResponseSchema.safeParse(invalidData);

    expect(validationResult.success).toBeFalsy();
    if (!validationResult.success) {
      expect(validationResult.error.issues.length).toBe(1);
    }
  });

  it("should fail validation on missing fields", () => {
    const missingFieldsData: any = {
      accessToken: "someToken",
    };

    const validationResult = refreshTokenResponseSchema.safeParse(missingFieldsData);

    expect(validationResult.success).toBeFalsy();
  });
});
