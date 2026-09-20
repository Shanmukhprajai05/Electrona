import express from "express";
import {
  register,
  login,
  forgotPassword,
  profile,
} from "../controllers/authController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Authentication
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);

// Protected Route
router.get("/profile", verifyToken, profile);

export default router;