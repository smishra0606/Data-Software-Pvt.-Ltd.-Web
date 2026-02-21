
import express from "express";
import {
  getEnrolledCourses,
  getAppliedInternships,
  updateProfile,
  updatePassword,
  getUsers,
  getUserCertificates,
  updateProfileImage,
  getCareerApplications,
  getUserById,
} from "../controllers/user.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import {
  updateProfileValidation,
  updatePasswordValidation,
  profileImageValidation,
  mongoIdValidation
} from "../middleware/validation.js";

const router = express.Router();

// Make sure the routes match what's expected in the frontend
router.get("/enrollments", protect, getEnrolledCourses);
router.get("/applications", protect, getAppliedInternships);
router.get("/certificates", protect, getUserCertificates);
router.get("/career-applications", protect, getCareerApplications);
router.put("/profile", protect, updateProfileValidation, updateProfile);
router.put("/updateUserProfile", protect, profileImageValidation, updateProfileImage);
router.put("/password", protect, updatePasswordValidation, updatePassword);
router.get("/", protect, authorize("admin"), getUsers);
router.get("/:id", protect, authorize("admin"), mongoIdValidation, getUserById);

export default router;
