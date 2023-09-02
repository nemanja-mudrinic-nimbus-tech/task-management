import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";
import TasksService from "./tasks.service";

describe("TasksService", () => {
  describe("createTask", () => {
    it("should successfully create a task", async () => {
      const task = {
        description: "test description",
        title: "test title",
      };

      const result = await TasksService.createTask(task);

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.title).toBe("test title");
      }
    });
  });

  describe("deleteTask", () => {
    it("should successfully delete a task", async () => {
      const result = await TasksService.deleteTask("123"); // Assuming 123 is a valid task id

      expect(result.isSuccess()).toBeTruthy();
    });

    it("should return an error for a non-existent task", async () => {
      const result = await TasksService.deleteTask("1");

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("getTask", () => {
    it("should successfully get a task", async () => {
      const result = await TasksService.getTask("123");

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.title).toBe("asfas");
      }
    });

    it("should return an error for a non-existent task", async () => {
      const result = await TasksService.getTask("1");

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("getTasks", () => {
    it("should successfully get tasks", async () => {
      const result = await TasksService.getTasks({});

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.count).toBe(1);
      }
    });

    it("should filter tasks", async () => {
      const filters = {
        priority: "LOW",
      };

      const result = await TasksService.getTasks(filters);

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.count).toBe(0);
      }
    });
  });

  describe("updateTask", () => {
    it("should successfully update a task", async () => {
      const update = {
        description: "updated description",
        title: "updated title",
      };

      const result = await TasksService.updateTask("123", update);

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.title).toEqual(update.title);
      }
    });

    it("should return an error for a non-existent task", async () => {
      const update = {
        description: "non-existent",
        title: "non-existent",
      };

      const result = await TasksService.updateTask("1", update);

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
