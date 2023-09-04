import mongoose from "mongoose";

export abstract class MongoRepository<T extends mongoose.Document> {
  protected model: mongoose.Model<T>;

  constructor(model: mongoose.Model<T>) {
    this.model = model;
  }
}
