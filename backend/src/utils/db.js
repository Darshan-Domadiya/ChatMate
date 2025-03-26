import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("MongoDB is connected!");
  } catch (error) {
    console.log("ERROR while connecting to the database!", error);
  }
};

export default connectDB;
