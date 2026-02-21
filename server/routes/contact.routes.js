
import express from 'express';
import { submitContactForm, getContactSubmissions, updateContactStatus } from '../controllers/contact.controller.js';
import { protect, authorize } from '../middleware/auth.js';
import { contactFormValidation, mongoIdValidation } from '../middleware/validation.js';

const router = express.Router();

// Public route - anyone can submit contact form
router.post('/', contactFormValidation, submitContactForm);

// Protected admin routes - only admins can see/manage submissions
router.get('/', protect, authorize('admin'), getContactSubmissions);
router.put('/:id/status', protect, authorize('admin'), mongoIdValidation, updateContactStatus);

export default router;
