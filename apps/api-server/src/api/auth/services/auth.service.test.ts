import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";
import AuthService from "./auth.service";

describe("AuthService", () => {
  describe("signUp", () => {
    it("should return error if user already exists", async () => {
      const result = await AuthService.signUp({
        username: "exist@test.com",
        password: "anyPassword",
      });

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should sign up successfully if user does not exist", async () => {
      const result = await AuthService.signUp({
        username: "newuser@test.com",
        password: "anyPassword",
      });
      expect(result.isSuccess()).toBeTruthy();
    });
  });

  describe("signIn", () => {
    it("should return error for non-existing user", async () => {
      const result = await AuthService.signIn({
        username: "nonexist@test.com",
        password: "anyPassword",
      });
      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should return error for incorrect password", async () => {
      const result = await AuthService.signIn({
        username: "exist@test.com",
        password: "wrongPassword",
      });
      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should sign in successfully with correct credentials", async () => {
      const result = await AuthService.signIn({
        username: "exist@test.com",
        password: "password",
      });

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.accessToken).toBe("dummyToken");
        expect(result.value.user.username).toBe("dummy@test.com");
      }
    });
  });
});
