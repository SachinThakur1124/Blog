import mongoose from "mongoose";
import { MONGO_URL } from "../config/envVars.config.js";

const connectionDB = async () => {
  try {
    const res = await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connection established at ", res.connection.host);
  } catch (error) {
    console.log("Connection Error:", error);
  }
};

export default connectionDB;
