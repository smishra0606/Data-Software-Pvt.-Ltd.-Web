
import express from "express";
import { uploadFile, getFileUrl, downloadFile } from "../controllers/upload.controller.js";
import { uploadImage } from "../config/cloudinary.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Upload file (supports images, pdfs, docs)
router.post("/", uploadImage.single("file"), uploadFile);

// Get file URL
router.get("/:filename", getFileUrl);

// Download file
router.get("/download/:filename", downloadFile);

export default router;
