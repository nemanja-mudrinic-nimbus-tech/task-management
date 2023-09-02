import { ITasksService } from "./tasks.service.interface";
import { UpdateTaskRequest } from "../dto/request/update-task/update-task.request";
import { AppPromise } from "../../../lib/types/app-result";
import { CreateTaskRequest } from "../dto/request/create-task/create-task.request";
import { TaskResponse } from "../dto/response/task/task.response";
import { GetTaskListQueryRequest } from "../dto/request/get-task-list/get-task-list.request";
import { TaskListResponse } from "../dto/response/task-list/task-list.response";
import { Failure, Success } from "result";
import { BadRequestException } from "../../../lib/exceptions/bad-request.exception";

class TasksService implements ITasksService {
  public async createTask(
    createTaskRequest: CreateTaskRequest,
  ): AppPromise<TaskResponse> {
    // try catch around repo

    return Success.create({
      id: "123",
      description: "des",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: "LOW",
      ...createTaskRequest,
    });
  }

  public async deleteTask(taskId: string): AppPromise<Promise<void>> {
    const taskResult = await this.getTaskById(taskId);

    if (taskResult.isFailure()) {
      // We want to throw same error
      return taskResult;
    }

    // Delete item
    return Success.create(Promise.resolve());
  }

  public async getTask(taskId: string): AppPromise<TaskResponse> {
    const taskResult = await this.getTaskById(taskId);

    if (taskResult.isFailure()) {
      // We want to throw same error
      return taskResult;
    }

    return taskResult;
  }

  public async getTasks(
    taskFilters: GetTaskListQueryRequest,
  ): AppPromise<TaskListResponse> {
    if (taskFilters.priority === "LOW") {
      return Success.create({
        count: 0,
        items: [],
      });
    }

    return Success.create({
      count: 1,
      items: [
        {
          id: "123",
          description: "des",
          done: false,
          title: "asfas",
          createdAt: new Date(),
          updatedAt: new Date(),
          priority: "LOW",
        },
      ],
    });
  }

  public async updateTask(
    taskId: string,
    updateTaskRequest: UpdateTaskRequest,
  ): AppPromise<TaskResponse> {
    const taskResult = await this.getTaskById(taskId);

    if (taskResult.isFailure()) {
      // We want to throw same error
      return taskResult;
    }

    // update entity

    return Success.create({ ...taskResult.value, ...updateTaskRequest });
  }

  private async getTaskById(taskId: string): AppPromise<{
    id: string;
    title: string;
    description: string;
    done: boolean;
    createdAt: Date;
    updatedAt: Date;
    priority: string;
  }> {
    if (taskId === "1") {
      return Failure.create(
        new BadRequestException(
          `Resource task with id: ${taskId} was not found`,
        ),
      );
    }

    return Success.create({
      id: "123",
      description: "des",
      done: false,
      title: "asfas",
      createdAt: new Date(),
      updatedAt: new Date(),
      priority: "LOW",
    });
  }
}

export default new TasksService();
