import express from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", authenticateUser, getUsersForSidebar);

router.get("/userMessages/:id", authenticateUser, getMessages);

router.post("/send-message/:id", authenticateUser, sendMessage);

export default router;
