import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  mongoose.set("strictQuery", false);

  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connect to DB!");
};
