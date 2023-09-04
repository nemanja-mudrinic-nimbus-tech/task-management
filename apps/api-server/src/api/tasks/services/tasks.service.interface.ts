import { CreateTaskRequest } from "../dto/request/create-task/create-task.request";
import { AppPromise } from "../../../lib/types/app-result";
import { TaskResponse } from "../dto/response/task/task.response";
import { UpdateTaskRequest } from "../dto/request/update-task/update-task.request";
import { TaskListResponse } from "../dto/response/task-list/task-list.response";
import { GetTaskListQueryRequest } from "../dto/request/get-task-list/get-task-list.request";

export interface ITasksService {
  createTask(
    createTaskRequest: CreateTaskRequest,
    userId: string,
  ): AppPromise<TaskResponse>;
  updateTask(
    taskId: string,
    updateTaskRequest: UpdateTaskRequest,
  ): AppPromise<TaskResponse>;
  deleteTask(taskId: string): AppPromise<Promise<void>>;
  getTasks(
    taskFilters: GetTaskListQueryRequest,
    userId: string,
  ): AppPromise<TaskListResponse>;
  getTask(taskId: string): AppPromise<TaskResponse>;
}
