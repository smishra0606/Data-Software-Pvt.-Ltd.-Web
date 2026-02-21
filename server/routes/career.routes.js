
import express from "express";
import {
  getCareers,
  getCareer,
  createCareer,
  updateCareer,
  deleteCareer,
  applyCareer,
  getCareerApplicants,
  updateApplicantStatus,
} from "../controllers/career.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { createCareerValidation, applicationValidation, mongoIdValidation } from "../middleware/validation.js";

const router = express.Router();

// Public routes
router.get("/", getCareers);
router.get("/:id", mongoIdValidation, getCareer);

// Protected routes
router.post("/:id/apply", protect, mongoIdValidation, applicationValidation, applyCareer);

// Admin routes
router.post("/", protect, authorize("admin"), createCareerValidation, createCareer);
router.put("/:id", protect, authorize("admin"), mongoIdValidation, updateCareer);
router.delete("/:id", protect, authorize("admin"), mongoIdValidation, deleteCareer);
router.get("/:id/applicants", protect, authorize("admin"), mongoIdValidation, getCareerApplicants);
router.put(
  "/:id/applicants/:applicantId",
  protect,
  authorize("admin"),
  updateApplicantStatus
);

export default router;
