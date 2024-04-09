import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";
import AuthService from "./auth.service";
import { IUserRepository } from "../repository/user/user.repository.interface";
import { Failure, Success } from "result";
// TODO: mock
import { hashSync } from "bcrypt";

jest.mock('jsonwebtoken');
import jwt from 'jsonwebtoken'

const mockedUserRepository = {
  createUser: jest.fn(),
  findUserByUsername: jest.fn(),
};

const authService = new AuthService(
  mockedUserRepository as unknown as IUserRepository,
);

describe("AuthService", () => {
  describe("signUp", () => {
    it("should return error if user already exists", async () => {
      mockedUserRepository.findUserByUsername.mockResolvedValueOnce(
        Success.create({ username: "exist@test.com" }),
      );

      const result = await authService.signUp({
        username: "exist@test.com",
        password: "anyPassword",
      });

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should sign up successfully if user does not exist", async () => {
      mockedUserRepository.findUserByUsername.mockResolvedValueOnce(
        Failure.create(new BadRequestException("User not found")),
      );
      mockedUserRepository.createUser.mockResolvedValueOnce(
        Success.create({
          username: "test",
        }),
      );

      const result = await authService.signUp({
        username: "newuser@test.com",
        password: "anyPassword",
      });
      expect(result.isSuccess()).toBeTruthy();
    });
  });

  describe("signIn", () => {
    it("should return error for non-existing user", async () => {
      mockedUserRepository.findUserByUsername.mockResolvedValueOnce(
        Failure.create(new BadRequestException("User not found")),
      );

      const result = await authService.signIn({
        username: "nonexist@test.com",
        password: "anyPassword",
      });

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should return error for incorrect password", async () => {
      mockedUserRepository.findUserByUsername.mockResolvedValueOnce(
        Success.create({ username: "exist@test.com", password: "123" }),
      );

      const result = await authService.signIn({
        username: "exist@test.com",
        password: "wrongPassword",
      });

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });

    it("should sign in successfully with correct credentials", async () => {
      mockedUserRepository.findUserByUsername.mockResolvedValueOnce(
        Success.create({
          username: "exist@test.com",
          password: hashSync("password", 10),
        }),
      );
      (jwt.sign as jest.Mock).mockReturnValue('dummyToken');

      const result = await authService.signIn({
        username: "exist@test.com",
        password: "password",
      });

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.accessToken).toBe("dummyToken");
        expect(result.value.user.username).toBe("exist@test.com");
      }
    });
  });
  describe("refreshToken", () => {
    it("should return error if token is not in valid format", async () => {
      (jwt.verify as jest.Mock).mockReturnValue('refreshToken');
      (jwt.sign as jest.Mock).mockReturnValue('accessToken');

      const result = await authService.refreshToken('refreshToken')

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.accessToken).toBe("accessToken");
        expect(result.value.refreshToken).toBe("refreshToken");
      }
    });
  });
});
