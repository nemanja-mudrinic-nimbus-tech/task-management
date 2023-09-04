import mongoose from "mongoose";

import { TaskPriority } from "../../../lib/utils/enum/task-priority.enum";
import { IUser } from "./user.schema";

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    description: String,
    title: { type: String, required: true },
    priority: {
      type: String,
      required: true,
      enum: Object.values(TaskPriority),
      default: TaskPriority.High,
    },
    dueDate: { type: Date, default: Date.now },
    done: { type: Boolean, required: true, default: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

export type ITask = {
  description: string;
  title: string;
  priority: TaskPriority;
  dueDate: Date;
  done: boolean;
  user: IUser["_id"] | IUser;
} & mongoose.Document["_id"];

type TaskDocument = ITask & mongoose.Document;

export const Task = mongoose.model<TaskDocument>("Task", TaskSchema);
