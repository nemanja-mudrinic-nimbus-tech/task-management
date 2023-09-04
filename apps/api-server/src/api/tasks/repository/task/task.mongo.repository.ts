import { MongoRepository } from "../../../../config/db/repository/mongo.repository";
import { ITask, Task } from "../../../../config/db/schemas/task.schema";
import { ITaskRepository } from "./task.repository.interface";
import { AppPromise } from "../../../../lib/types/app-result";
import { Failure, Success } from "result";
import { TaskPriority } from "../../../../lib/utils/enum/task-priority.enum";
import { BadRequestException } from "../../../../lib/exceptions/bad-request.exception";
import { ServerInternalException } from "../../../../lib/exceptions/server-internal.exception";

class TaskMongoRepository
  extends MongoRepository<ITask>
  implements ITaskRepository
{
  constructor() {
    super(Task);
  }
  async createTask(
    task: Partial<
      Omit<ITask, "createdAt" | "updatedAt" | "_id" | "user"> & {
        userId: string;
      }
    >,
  ): AppPromise<ITask> {
    try {
      const createdTask = await this.model.create({
        title: task.title,
        description: task.description || "",
        priority: task.priority || TaskPriority.High,
        user: task.userId,
      });

      return Success.create(createdTask);
    } catch (error) {
      return Failure.create(
        new ServerInternalException((error as Error)?.message || undefined),
      );
    }
  }

  async deleteTask(taskId: string): AppPromise<Promise<void>> {
    await this.model.deleteOne({ _id: taskId });
    return Success.create(Promise.resolve());
  }

  async findAllTaskByUserIdAndFilterPageable(
    query: Partial<ITask>,
    sortAndPageable: {
      offset: number;
      limit: number;
      sortField: string;
      direction: "asc" | "desc";
    },
  ): AppPromise<{ items: ITask[]; count: number }> {
    const [tasks, count] = await Promise.all([
      this.model
        .find(query)
        .sort({
          [sortAndPageable.sortField]:
            sortAndPageable.direction === "desc" ? -1 : 1,
        })
        .skip(sortAndPageable.offset || 0)
        .limit(sortAndPageable.limit || 10),
      this.model.count(query),
    ]);

    return Success.create({
      items: tasks,
      count,
    });
  }

  async findTaskByTaskId(taskId: string): AppPromise<ITask> {
    const task = await this.model.findById(taskId);

    if (!task) {
      return Failure.create(new BadRequestException("Task was not found"));
    }

    return Success.create(task);
  }

  async updateTask(taskId: string, task: ITask): AppPromise<ITask> {
    await this.model.updateOne({ _id: taskId }, task);

    return this.findTaskByTaskId(taskId);
  }
}

export default new TaskMongoRepository();
