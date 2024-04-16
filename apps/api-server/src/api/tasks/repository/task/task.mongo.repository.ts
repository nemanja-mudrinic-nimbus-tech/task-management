import { MongoRepository } from "../../../../config/db/repository/mongo.repository";
import { ITask, Task } from "../../../../config/db/schemas/task.schema";
import { ITaskRepository } from "./task.repository.interface";
import { AppPromise } from "../../../../lib/types/app-result";
import { Failure, Success } from "result";
import { TaskPriority } from "../../../../lib/utils/enum/task-priority.enum";
import mongoose from "mongoose";
import { User } from "../../../../config/db/schemas/user.schema";
import { DBException } from "../../../../lib/exceptions/db.exception";
import { NotFoundException } from "../../../../lib/exceptions/not-found.exception";

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
        userId: new mongoose.Types.ObjectId(task.userId),
      });

      await User.updateOne(
        { _id: task.userId },
        { $push: { tasks: createdTask._id } },
      );

      return Success.create(createdTask);
    } catch (error: any) {
      return Failure.create<DBException>(new DBException(`${error.message}`));
    }
  }

  async deleteTask(taskId: string): AppPromise<Promise<void>> {
    try {
      await this.model.deleteOne({ _id: taskId });
      return Success.create(Promise.resolve());
    } catch (error: any) {
      return Failure.create<DBException>(new DBException(`${error.message}`));
    }
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
    try {
      const [tasks, count] = await Promise.all([
        this.model
          .find(query)
          .sort({
            [sortAndPageable.sortField]:
              sortAndPageable.direction === "asc" ? -1 : 1,
          })
          .skip(sortAndPageable.offset || 0)
          .limit(sortAndPageable.limit || 10),
        this.model.count(query),
      ]);
  
      return Success.create({
        items: tasks,
        count,
      });
    } catch (error: any) {
      return Failure.create<DBException>(new DBException(`${error.message}`));
    }
  }

  async findTaskByTaskId(taskId: string): AppPromise<ITask> {
    try {
      const task = await this.model.findById(taskId);

      if (!task) {
        return Failure.create(new NotFoundException(`Task with id = ${taskId} does not exist.`));
      }

      return Success.create(task);
    } catch (error: any) {
      return Failure.create<DBException>(new DBException(`${error.message}`));
    }
  }

  async updateTask(taskId: string, task: ITask): AppPromise<ITask> {
    try {
      await this.model.updateOne({ _id: taskId }, task);

      return this.findTaskByTaskId(taskId);
    } catch (error: any) {
      return Failure.create<DBException>(new DBException(`${error.message}`));
    }
  }
}

export default new TaskMongoRepository();
