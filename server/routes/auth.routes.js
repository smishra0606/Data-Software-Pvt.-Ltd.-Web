import express from "express";
import passport from 'passport'; // Add this import
import { 
  register, 
  login, 
  getMe, 
  googleAuth, 
  forgotPassword, 
  resetPassword 
} from "../controllers/auth.controller.js";

const router = express.Router();

// ... register and login routes ...

// GET /api/auth/google
// This triggers the Google login screen
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// GET /api/auth/google/callback
// This handles the return from Google and calls your googleAuth controller
router.get("/google/callback", 
  passport.authenticate("google", { session: false, failureRedirect: '/login' }), 
  googleAuth 
);

// ... other routes ...

export default router;