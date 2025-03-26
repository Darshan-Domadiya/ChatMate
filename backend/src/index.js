import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config({ path: "./src/.env" });

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});
