import { MongoRepository } from "../../../../config/db/repository/mongo.repository";
import { ITask, Task } from "../../../../config/db/schemas/task.schema";
import { ITaskRepository } from "./task.repository.interface";
import { AppPromise } from "../../../../lib/types/app-result";
import { Success } from "result";
import { TaskPriority } from "../../../../lib/utils/enum/task-priority.enum";

class TaskMongoRepository
  extends MongoRepository<ITask>
  implements ITaskRepository
{
  constructor() {
    super(Task);
  }
  async createTask(
    task: Partial<Omit<ITask, "createdAt" | "updatedAt" | "_id" | "user">>,
  ): AppPromise<ITask> {
    return Success.create({
      _id: "213",
      description: "string",
      title: "string",
      priority: TaskPriority.Low,
      dueDate: new Date(),
      done: false,
    });
  }

  async deleteTask(taskId: string): AppPromise<Promise<void>> {
    return Success.create(Promise.resolve());
  }

  async findAllTaskByUserIdAndFilterPageable(
    id: string,
    filterAndSort: Partial<Omit<ITask, "user" | "_id" | "updatedAt">> & {
      sortDirection?: "asc" | "dsc";
      limit?: number;
      offset?: number;
    },
  ): AppPromise<ITask[]> {
    return Success.create([]);
  }

  async findTaskByTaskId(taskId: string): AppPromise<ITask> {
    return Success.create({
      _id: "213",
      description: "string",
      title: "string",
      priority: TaskPriority.Low,
      dueDate: new Date(),
      done: false,
    });
  }

  async updateTask(
    task: Partial<Omit<ITask, "createdAt" | "updatedAt" | "_id" | "user">>,
  ): AppPromise<ITask> {
    return Success.create({
      _id: "213",
      description: "string",
      title: "string",
      priority: TaskPriority.Low,
      dueDate: new Date(),
      done: false,
    });
  }
}

export default new TaskMongoRepository();
