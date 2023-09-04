import mongoose from "mongoose";
import { ITask } from "./task.schema";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true, match: /.+\@.+\..+/ }, // Using a simple regex match to ensure the username is an email format.
  password: { type: String, required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

export type IUser = {
  _id: string;
  username: string;
  password: string;
  tasks: (ITask["_id"] | ITask)[];
} & mongoose.Document["_id"];

type UserDocument = IUser & mongoose.Document;

export const User = mongoose.model<UserDocument>("User", UserSchema);
