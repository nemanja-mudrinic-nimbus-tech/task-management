import { AppPromise } from "../../../../lib/types/app-result";
import { ITask } from "../../../../config/db/schemas/task.schema";
import { GetTaskListQueryRequest } from "../../dto/request/get-task-list/get-task-list.request";
export interface ITaskRepository {
  createTask(
    task: Partial<
      Omit<ITask, "createdAt" | "updatedAt" | "_id" | "user"> & {
        userId: string;
      }
    >,
  ): AppPromise<ITask>;
  updateTask(
    taskId: string,
    task: Partial<Omit<ITask, "createdAt" | "updatedAt" | "_id" | "user">>,
  ): AppPromise<ITask>;
  findAllTaskByUserIdAndFilterPageable(
    query: Partial<ITask>,
    sortAndPageable: {
      offset: number;
      limit: number;
      sortField: string;
      direction: "asc" | "desc";
    },
  ): AppPromise<{ items: ITask[]; count: number }>;
  deleteTask(taskId: string): AppPromise<Promise<void>>;
  findTaskByTaskId(taskId: string): AppPromise<ITask>;
}
