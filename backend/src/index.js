import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

// imported routes.
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config({ path: "./src/.env" });

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

connectDB(process.env.MONGO_URI);

app.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});
