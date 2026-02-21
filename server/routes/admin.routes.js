
import express from "express";
import {
  getStats,
  getEnrollments,
  generateCertificate,
  getApplications,
  updateApplicationStatus,
} from "../controllers/admin.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes in this router
router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getStats);
router.get("/enrollments", getEnrollments);
router.post("/certificates", generateCertificate);
router.get("/applications", getApplications);
router.put("/applications/:id", updateApplicationStatus);

export default router;
