
import { cloudinary } from "../config/cloudinary.js";
import fs from 'fs';
import path from 'path';

// @desc    Upload file to cloudinary
// @route   POST /api/upload
// @access  Private
export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a file",
      });
    }

    // console.log("File received:", req.file);

    // If using multer-storage-cloudinary, the file is automatically uploaded
    if (req.file.path && req.file.filename) {
      // Get file extension and type
      const fileType = req.file.mimetype?.split('/')[0] || 'unknown';
      const fileExt = path.extname(req.file.originalname || '');
      
      // Return the URL and additional metadata to the client
      return res.status(200).json({
        success: true,
        data: {
          url: req.file.path,
          filename: req.file.filename,
          publicId: req.file.filename,
          originalName: req.file.originalname,
          fileType,
          fileExt
        }
      });
    }
    
    // If not using cloudinary middleware, we need to upload manually
    // This is a fallback method
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "uploads",
      resource_type: "auto",
    });
    
    // Remove file from server after upload to cloudinary
    if (req.file.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    
    // Get file extension and type
    const fileType = req.file.mimetype?.split('/')[0] || 'unknown';
    const fileExt = path.extname(req.file.originalname || '');
    
    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        filename: result.public_id,
        publicId: result.public_id,
        originalName: req.file.originalname,
        fileType,
        fileExt
      }
    });
  } catch (error) {
    console.error("Upload file error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error uploading file",
    });
  }
};

// @desc    Get file URL from cloudinary
// @route   GET /api/upload/:filename
// @access  Private
export const getFileUrl = async (req, res, next) => {
  try {
    const { filename } = req.params;

    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Filename is required",
      });
    }

    // Build the Cloudinary URL
    const fileUrl = cloudinary.url(filename);

    res.status(200).json({
      success: true,
      data: {
        url: fileUrl
      }
    });
  } catch (error) {
    console.error("Get file URL error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error getting file URL",
    });
  }
};

// @desc    Download file from cloudinary
// @route   GET /api/upload/download/:filename
// @access  Private
export const downloadFile = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const { originalName } = req.query;
    
    if (!filename) {
      return res.status(400).json({
        success: false,
        message: "Filename is required",
      });
    }

    // Get resource info to check if it exists
    try {
      const resource = await cloudinary.api.resource(filename);
      
      // If we get here, the resource exists and can be downloaded
      const fileUrl = cloudinary.url(filename, { 
        flags: "attachment",
        // Set the content disposition with the original filename if available
        sign_url: true
      });

      res.status(200).json({
        success: true,
        data: {
          url: fileUrl,
          originalName: originalName || resource.original_filename || filename
        }
      });
    } catch (error) {
      console.error("Resource fetch error:", error);
      return res.status(404).json({
        success: false,
        message: "File not found in cloud storage",
      });
    }
  } catch (error) {
    console.error("Download file error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error downloading file",
    });
  }
};
