import express from "express";
import passport from 'passport';
import { 
  register, 
  login, 
  getMe, 
  googleAuth, 
  forgotPassword, 
  resetPassword 
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @desc    Register user
 * @route   POST /api/auth/register
 */
router.post("/register", register);

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 */
router.post("/login", login);

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
// This was the missing link!
router.get("/me", protect, getMe); 

/**
 * @desc    Google OAuth Login
 * @route   GET /api/auth/google
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @desc    Google OAuth Callback
 * @route   GET /api/auth/google/callback
 */
router.get("/google/callback", 
  passport.authenticate("google", { session: false, failureRedirect: '/login' }), 
  googleAuth 
);

/**
 * @desc    Forgot Password
 * @route   POST /api/auth/forgotpassword
 */
router.post("/forgotpassword", forgotPassword);

/**
 * @desc    Reset Password
 * @route   PUT /api/auth/resetpassword/:resettoken
 */
router.put("/resetpassword/:resettoken", resetPassword);

export default router;
