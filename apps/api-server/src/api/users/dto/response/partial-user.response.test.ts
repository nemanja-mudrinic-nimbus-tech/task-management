import { partialUserResponseSchema } from "./partial-user.response";

describe("partialUserResponseSchema", () => {
  it("should validate correct data", () => {
    const validData = {
      id: "12345",
      username: "johndoe@email.com",
    };

    const validationResult = partialUserResponseSchema.safeParse(validData);

    expect(validationResult.success).toBeTruthy();
  });

  it("should fail validation on incorrect email format", () => {
    const invalidEmailData = {
      id: "12345",
      username: "johndoemail.com",
    };

    const validationResult = partialUserResponseSchema.safeParse(invalidEmailData);

    expect(validationResult.success).toBeFalsy();
    if (!validationResult.success) {
      expect(validationResult.error.issues[0].message).toBe(
        "Enter valid email",
      );
    }
  });

  it("should fail validation on missing fields", () => {
    const missingFieldsData: any = {
      id: '12345'
    };

    const validationResult = partialUserResponseSchema.safeParse(missingFieldsData);

    expect(validationResult.success).toBeFalsy();
  });
});
