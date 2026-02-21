
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
  googleAuthValidation,
  forgotPasswordValidation,
  resetPasswordValidation
} from "../middleware/validation.js";

const router = express.Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/google", googleAuthValidation, googleAuth);
router.get("/me", protect, getMe);
router.post("/forgot-password", forgotPasswordValidation, forgotPassword);
router.post("/reset-password", resetPasswordValidation, resetPassword);

export default router;
