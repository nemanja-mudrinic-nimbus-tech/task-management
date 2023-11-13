import { ITasksService } from "./tasks.service.interface";
import { UpdateTaskRequest } from "../dto/request/update-task/update-task.request";
import { AppPromise } from "../../../lib/types/app-result";
import { CreateTaskRequest } from "../dto/request/create-task/create-task.request";
import {
  mapTaskToTaskResponse,
  TaskResponse,
} from "../dto/response/task/task.response";
import { GetTaskListQueryRequest } from "../dto/request/get-task-list/get-task-list.request";
import { TaskListResponse } from "../dto/response/task-list/task-list.response";
import { TaskPriority } from "../../../lib/utils/enum/task-priority.enum";
import { ITask } from "../../../config/db/schemas/task.schema";
import { ITaskRepository } from "../repository/task/task.repository.interface";
import {Success} from "../../../lib/utils/success";
import {Failure} from "../../../lib/utils/failure";

class TasksService implements ITasksService {
  constructor(private taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }
  public async createTask(
    createTaskRequest: CreateTaskRequest,
    userId: string,
  ): AppPromise<TaskResponse> {
    const createdTaskResult = await this.taskRepository.createTask({
      title: createTaskRequest.title,
      description: createTaskRequest.description || "",
      priority: createTaskRequest.priority || TaskPriority.High,
      userId,
    });

    if (createdTaskResult.isSuccess()) {
      return Success.create(mapTaskToTaskResponse(createdTaskResult.value));
    }

    // TODO: Map to meaningful error instead of rethrowing - bad practices
    return Failure.create(createdTaskResult.error);
  }

  public async deleteTask(taskId: string): AppPromise<Promise<void>> {
    const taskResult = await this.taskRepository.deleteTask(taskId);

    if (taskResult.isFailure()) {
      // We want to throw same error
      return taskResult;
    }

    // Delete item
    return Success.create(Promise.resolve());
  }

  public async getTask(taskId: string): AppPromise<TaskResponse> {
    return this.getTaskById(taskId);
  }

  public async getTasks(
    taskFilters: GetTaskListQueryRequest,
    userId: string,
  ): AppPromise<TaskListResponse> {
    const query: Partial<ITask> = { userId }; // Always filter by user

    if (taskFilters.title) {
      query.title = new RegExp(taskFilters.title, "i"); // Case-insensitive substring match
    }
    if (taskFilters.createdAt) {
      query.createdAt = taskFilters.createdAt;
    }

    if (taskFilters.done != undefined) {
      query.done = taskFilters.done;
    }

    if (taskFilters.priority) {
      query.priority = taskFilters.priority;
    }

    // TODO: add logic for custom sort field, default sort field if not provided
    const sortField = "createdAt";

    const results =
      await this.taskRepository.findAllTaskByUserIdAndFilterPageable(query, {
        sortField,
        direction: taskFilters.direction || "desc",
        limit: taskFilters.limit || 10,
        offset: taskFilters.offset || 0,
      });

    if (!results.isSuccess()) {
      throw results.error;
    }

    return Success.create({
      count: results.value.count,
      items: results.value.items.map(mapTaskToTaskResponse),
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

    await this.taskRepository.updateTask(taskId, {
      ...taskResult.value,
      ...updateTaskRequest,
    });

    return this.getTaskById(taskId);
  }

  private async getTaskById(taskId: string): AppPromise<ITask> {
    const taskResult = await this.taskRepository.findTaskByTaskId(taskId);

    if (taskResult.isFailure()) {
      // We want to throw same error -
      return Failure.create(taskResult.error);
    }

    return Success.create(mapTaskToTaskResponse(taskResult.value));
  }
}

export default TasksService;
