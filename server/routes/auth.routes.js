import express from "express";
import { 
  register, 
  login, 
  getMe, 
  googleAuth, 
  forgotPassword, 
  resetPassword 
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import {
  registerValidation,
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} from "../middleware/validation.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);

// Google Auth Route - Changed to GET for direct browser redirect
// This allows window.location.href to work and bypasses CORS
router.get("/google", googleAuth);

// Protected routes
router.get("/me", protect, getMe);

// Password management
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPassword);

export default router;
