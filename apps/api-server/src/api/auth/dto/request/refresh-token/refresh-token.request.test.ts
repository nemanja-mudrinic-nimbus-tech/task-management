import { refreshTokenRequestSchema } from "./refresh-token.request";


describe("refreshTokenRequestSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      refreshToken: "refreshToken",
    };

    const validationResult = refreshTokenRequestSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on incorrect fields format", () => {
    const invalidData = {
      refreshToken: 123,
    };

    const validationResult = refreshTokenRequestSchema.safeParse(invalidData);

    expect(validationResult.success).toBeFalsy();
    if (!validationResult.success) {
      expect(validationResult.error.issues.length).toBe(1);
    }
  });

  it("should fail validation on missing fields", () => {
    const missingFieldsData: any = {};

    const validationResult = refreshTokenRequestSchema.safeParse(missingFieldsData);

    expect(validationResult.success).toBeFalsy();
  });
});
