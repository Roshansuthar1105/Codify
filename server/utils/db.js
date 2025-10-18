import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    // Use dbName option so we don't have to change the URI used by the project
    await mongoose.connect(URI, {
      dbName: process.env.MONGODB_DB_NAME || "codify",
    });
    console.log("connected to database successfully");
  } catch (error) {
    console.log(`Error during connecting to mongo db : ${error}`);
  }
};
export default connectDB;


