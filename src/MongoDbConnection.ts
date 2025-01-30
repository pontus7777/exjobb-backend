import mongoose from "mongoose";

class MongoDbConnection {
  private static instance: MongoDbConnection;
  private MONGO_URI: string =
    process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

  private constructor() {}

  public static getInstance(): MongoDbConnection {
    if (!MongoDbConnection.instance) {
      MongoDbConnection.instance = new MongoDbConnection();
    }
    return MongoDbConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions);

      console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
      console.error("❌ MongoDB Connection Error:", error);
      process.exit(1); // Exit the process if unable to connect
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log("🔌 MongoDB Disconnected");
    } catch (error) {
      console.error("❌ MongoDB Disconnection Error:", error);
    }
  }
}

export default MongoDbConnection;
