import mongoose from "mongoose";
export const dbInit = () =>
  mongoose.connect("mongodb://127.0.0.1:27017/ipangram");

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});
