import express from "express";
import {
  getInternships,
  getInternship,
  createInternship,
  updateInternship,
  deleteInternship,
  applyInternship,
} from "../controllers/internship.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { createInternshipValidation, applicationValidation, mongoIdValidation } from "../middleware/validation.js";

const router = express.Router();

router
  .route("/")
  .get(getInternships)
  .post(protect, authorize("admin"), createInternshipValidation, createInternship);

router
  .route("/:id")
  .get(mongoIdValidation, getInternship)
  .put(protect, authorize("admin"), mongoIdValidation, updateInternship)
  .delete(protect, authorize("admin"), mongoIdValidation, deleteInternship);

router.post("/:id/apply", protect, mongoIdValidation, applicationValidation, applyInternship);

export default router;
