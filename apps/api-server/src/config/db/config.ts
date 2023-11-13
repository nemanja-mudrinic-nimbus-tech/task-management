import mongoose from "mongoose";
import { logEvent } from "../../lib/utils/logger/logger";
import { Severity } from "../../lib/utils/enum/severity.enum";

export const openDbConnection = async () => {
  try {
    await mongoose.connect(
      // `mongodb://${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || '27017'}`,
      // {
      //   dbName: process.env.MONGO_DB || 'task-db',
      //   user: process.env.MONGO_USER || 'task-dev',
      //   pass: process.env.MONGO_PASSWORD || 'SuperCoolPassword123!',
      // }
        'mongodb+srv://task-dev:SuperCoolPassword123!@cluster0.infm2re.mongodb.net/?retryWrites=true&w=majority'
    );

    logEvent(
      "Connected to db",
      {},
      { severity: Severity.Info, resource: "startup" },
    );
  } catch (error) {
    // TODO: Create new exception
    logEvent(
      "Connected to db",
      {
        // @ts-ignore
        error: error.message,
      },
      { severity: Severity.Error, resource: "startup" },
    );
    process.exit(1);
  }
};
