import express from "express";
import {
  authCheck,
  loginUser,
  logoutUser,
  signUp,
  updateProfilePic,
} from "../controllers/auth.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.put("/update", authenticateUser, updateProfilePic);

router.get("/check", authenticateUser, authCheck);

export default router;
