import express from "express";
import {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  uploadCourseImage,
} from "../controllers/course.controller.js";
import { protect, authorize } from "../middleware/auth.js";
import { uploadImage } from "../config/cloudinary.js";
import { createCourseValidation, mongoIdValidation } from "../middleware/validation.js";

const router = express.Router();

router
  .route("/")
  .get(getCourses)
  .post(protect, authorize("admin"), createCourseValidation, createCourse);

router
  .route("/:id")
  .get(mongoIdValidation, getCourse)
  .put(protect, authorize("admin"), mongoIdValidation, updateCourse)
  .delete(protect, authorize("admin"), mongoIdValidation, deleteCourse);

router.post("/:id/enroll", protect, mongoIdValidation, enrollCourse);

// Upload course thumbnail
router.post(
  "/upload",
  protect,
  authorize("admin"),
  uploadImage.single("image"),
  uploadCourseImage
);

export default router;
