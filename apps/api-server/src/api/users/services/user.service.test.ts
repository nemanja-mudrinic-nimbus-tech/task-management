import { Success } from "result";
import { IUserRepository } from "../repository/user.repository.interface";
import UserService from "./user.service";

const mockedUserRepository = {
  findUserById: jest.fn(),
};

const userService = new UserService(
  mockedUserRepository as unknown as IUserRepository,
);

describe("UserService", () => {
  describe("getMe", () => {
    it("should successfully get a user", async () => {
      const user = {
        id: "6614e7fd00488498f8777f2d",
        username: "johndoe@gmail.com"
      };

      mockedUserRepository.findUserById.mockResolvedValueOnce(
        Success.create(user),
      );

      const result = await userService.getMe("6614e7fd00488498f8777f2d");

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.username).toBe("johndoe@gmail.com");
      }
    });
  });
});
