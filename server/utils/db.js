import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const URI = process.env.MONGODB_URI;
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("connected to database successfully");
  } catch (error) {
    console.log(`Error during connecting to mongo db : ${error}`);
  }
};
export default connectDB;


