import { AppPromise } from "../../../../lib/types/app-result";
import { ITask } from "../../../../config/db/schemas/task.schema";
export interface ITaskRepository {
  createTask(
    task: Partial<Omit<ITask, "createdAt" | "updatedAt" | "_id" | "user">>,
  ): AppPromise<ITask>;
  updateTask(
    task: Partial<Omit<ITask, "createdAt" | "updatedAt" | "_id" | "user">>,
  ): AppPromise<ITask>;
  findAllTaskByUserIdAndFilterPageable(
    id: string,
    filterAndSort: Partial<Omit<ITask, "user" | "_id" | "updatedAt">> & {
      sortDirection?: "asc" | "dsc";
      limit?: number;
      offset?: number;
    },
  ): AppPromise<ITask[]>;
  deleteTask(taskId: string): AppPromise<Promise<void>>;
  findTaskByTaskId(taskId: string): AppPromise<ITask>;
}
