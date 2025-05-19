import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// imported routes.
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./utils/socketio.js";

dotenv.config({ path: "./src/.env" });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

connectDB(process.env.MONGO_URI);

server.listen(process.env.PORT, () => {
  console.log(`server is running on PORT ${process.env.PORT}`);
});
