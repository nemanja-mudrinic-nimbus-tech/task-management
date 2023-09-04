import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";
import TasksService from "./tasks.service";
import { TaskPriority } from "../../../lib/utils/enum/task-priority.enum";
import { Failure, Success } from "result";
import { ITaskRepository } from "../repository/task/task.repository.interface";

// Mock the task repository
jest.mock("../repository/task/task.mongo.repository");

const mockedTaskRepository = {
  createTask: jest.fn(),
  deleteTask: jest.fn(),
  findTaskByTaskId: jest.fn(),
  findAllTaskByUserIdAndFilterPageable: jest.fn(),
  updateTask: jest.fn(),
};

// Initialize the TasksService with the mocked repository
const tasksService = new TasksService(
  mockedTaskRepository as unknown as ITaskRepository,
);

describe("TasksService", () => {
  describe("createTask", () => {
    it("should successfully create a task", async () => {
      const task = {
        description: "test description",
        title: "test title",
      };
      mockedTaskRepository.createTask.mockResolvedValueOnce(
        Success.create(task),
      );

      const result = await tasksService.createTask(task, "userId");

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.title).toBe("test title");
      }
    });
  });

  describe("deleteTask", () => {
    it("should successfully delete a task", async () => {
      mockedTaskRepository.deleteTask.mockResolvedValueOnce(
        Success.create(Promise.resolve()),
      );

      const result = await tasksService.deleteTask("123"); // Assuming 123 is a valid task id

      expect(result.isSuccess()).toBeTruthy();
    });

    it("should return an error for a non-existent task", async () => {
      mockedTaskRepository.deleteTask.mockResolvedValueOnce(
        Failure.create(new BadRequestException("Not found")),
      );

      const result = await tasksService.deleteTask("1");

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("getTask", () => {
    it("should successfully get a task", async () => {
      const task = {
        description: "test description",
        title: "asfas",
      };
      mockedTaskRepository.findTaskByTaskId.mockResolvedValueOnce(
        Success.create(task),
      );

      const result = await tasksService.getTask("123");

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.title).toBe("asfas");
      }
    });

    it("should return an error for a non-existent task", async () => {
      mockedTaskRepository.findTaskByTaskId.mockResolvedValueOnce(
        Failure.create(new BadRequestException("Not found")),
      );

      const result = await tasksService.getTask("1");

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe("getTasks", () => {
    it("should successfully get tasks", async () => {
      const task = {
        description: "test description",
        title: "asfas",
      };
      mockedTaskRepository.findAllTaskByUserIdAndFilterPageable.mockResolvedValueOnce(
        Success.create({
          items: [task],
          count: 1,
        }),
      );

      const result = await tasksService.getTasks({}, "userId");

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.count).toBe(1);
      }
    });

    it("should filter tasks", async () => {
      mockedTaskRepository.findAllTaskByUserIdAndFilterPageable.mockResolvedValueOnce(
        Success.create({
          items: [],
          count: 0,
        }),
      );
      const filters = {
        priority: TaskPriority.Low,
      };

      const result = await tasksService.getTasks(filters, "userId");

      expect(result.isSuccess()).toBeTruthy();
      if (result.isSuccess()) {
        expect(result.value.count).toBe(0);
      }
    });
  });

  describe("updateTask", () => {
    it("should successfully update a task", async () => {
      const task = {
        description: "test description",
        title: "test title",
      };
      const update = {
        description: "updated description",
        title: "updated title",
      };
      mockedTaskRepository.updateTask.mockResolvedValueOnce(
        Success.create(update),
      );
      mockedTaskRepository.findTaskByTaskId
        .mockResolvedValueOnce(Success.create(task))
        .mockResolvedValueOnce(Success.create(update));

      const result = await tasksService.updateTask("123", update);

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
      mockedTaskRepository.findTaskByTaskId.mockResolvedValueOnce(
        Failure.create(new BadRequestException("Not found")),
      );

      const result = await tasksService.updateTask("1", update);

      expect(result.isFailure()).toBeTruthy();
      if (result.isFailure()) {
        expect(result.error).toBeInstanceOf(BadRequestException);
      }
    });
  });
});
