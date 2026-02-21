// contact.controller.js
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { Contact } from "../models/Contact.js";
dotenv.config();

// Email transporter configuration
let transporter = null;

const initializeEmailService = () => {
  if (
    process.env.EMAIL_HOST &&
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASS
  ) {
    transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production", // Strict in production
      },
    });

    // Verify transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error(
          "❌ Email transporter configuration error:",
          error.message
        );
        transporter = null;
      } else {
        console.log("✅ Email server is ready to send messages");
      }
    });
  } else {
    console.warn("⚠️  Email configuration missing - emails will not be sent");
    console.log("Required env vars: EMAIL_HOST, EMAIL_USER, EMAIL_PASS");
  }
};

// Initialize on module load
initializeEmailService();

// Helper function to escape HTML
const escapeHtml = (text) => {
  if (!text) return "";
  return text.replace(/[&<>'"]/g, (match) => {
    const escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return escape[match];
  });
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, company, message } = req.body;

    // Input validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || "Not provided",
      message: message.trim(),
    };

    // Always save the contact submission to the database
    const contactSubmission = await Contact.create({
      ...sanitizedData,
      status: "new",
    });

    // Try to send emails if transporter is configured
    let emailsSent = false;
    if (transporter) {
      try {
        // Email to admin
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || "admin@company.com",
          subject: `New Contact: ${escapeHtml(
            sanitizedData.name
          )} - ${escapeHtml(sanitizedData.company)}`,
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                  New Contact Form Submission
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                  <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background: #f8f9fa; font-weight: bold; width: 120px;">Name:</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${escapeHtml(
                      sanitizedData.name
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background: #f8f9fa; font-weight: bold;">Email:</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${escapeHtml(
                      sanitizedData.email
                    )}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px; border: 1px solid #ddd; background: #f8f9fa; font-weight: bold;">Company:</td>
                    <td style="padding: 12px; border: 1px solid #ddd;">${escapeHtml(
                      sanitizedData.company
                    )}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px;">
                  <h3 style="color: #2c3e50;">Message:</h3>
                  <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #3498db; border-radius: 4px;">
                    ${escapeHtml(sanitizedData.message).replace(/\n/g, "<br>")}
                  </div>
                </div>
                <div style="margin-top: 30px; padding: 15px; background: #e8f6ff; border-radius: 4px;">
                  <small style="color: #666;">
                    Submitted on: ${new Date().toLocaleString()}<br>
                    Contact ID: ${contactSubmission._id}
                  </small>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        // Email confirmation to user
        const userMailOptions = {
          from: process.env.EMAIL_USER,
          to: sanitizedData.email,
          subject: "Thank you for contacting us - We'll be in touch soon!",
          html: `
            <!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #2c3e50; border-bottom: 2px solid #27ae60; padding-bottom: 10px;">
                  Thank you for contacting us!
                </h2>
                <p style="font-size: 16px;">Dear ${escapeHtml(
                  sanitizedData.name
                )},</p>
                <p style="font-size: 16px;">
                  We have successfully received your message and appreciate you taking the time to reach out to us. 
                  Our team will review your inquiry and get back to you within 24-48 hours.
                </p>
                
                <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #27ae60; border-radius: 4px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: #2c3e50;">Your Message:</h3>
                  <p style="margin-bottom: 0;">${escapeHtml(
                    sanitizedData.message
                  ).replace(/\n/g, "<br>")}</p>
                </div>
                
                <div style="margin-top: 30px; padding: 20px; background: #e8f8f5; border-radius: 4px; text-align: center;">
                  <p style="margin: 0; font-size: 16px; color: #2c3e50;">
                    <strong>Need immediate assistance?</strong><br>
                    Feel free to call us at <a href="tel:+1234567890" style="color: #27ae60;">(123) 456-7890</a>
                  </p>
                </div>
                
                <div style="margin-top: 30px; text-align: center; border-top: 1px solid #ddd; padding-top: 20px;">
                  <p style="margin: 0; color: #666;">
                    Best regards,<br>
                    <strong style="color: #2c3e50;">The DSPL Team</strong>
                  </p>
                </div>
                
                <div style="margin-top: 20px; text-align: center;">
                  <small style="color: #999;">
                    Reference ID: ${contactSubmission._id}
                  </small>
                </div>
              </div>
            </body>
            </html>
          `,
        };

        // Send emails
        await Promise.all([
          transporter.sendMail(adminMailOptions),
          transporter.sendMail(userMailOptions),
        ]);

        emailsSent = true;
        console.log(
          `✅ Emails sent successfully for contact: ${sanitizedData.name}`
        );
      } catch (emailError) {
        console.error("❌ Failed to send emails:", emailError.message);
        // Continue execution - we'll notify the client that emails couldn't be sent
      }
    }

    return res.status(200).json({
      success: true,
      message: emailsSent
        ? "Contact form submitted successfully! Confirmation emails have been sent."
        : "Contact form submitted successfully! We'll respond via email soon.",
      data: {
        contactId: contactSubmission._id,
        emailsDelivered: emailsSent,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Contact form submission error:", error);
    return res.status(500).json({
      success: false,
      message:
        "We're experiencing technical difficulties. Please try again later.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// .env file example
/*
# Database
MONGODB_URI=mongodb://localhost:27017/your-database

# Email Configuration (Choose one)
# Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-digit-app-password
EMAIL_SECURE=false

# SendGrid (Recommended for production)
# EMAIL_HOST=smtp.sendgrid.net
# EMAIL_PORT=587
# EMAIL_USER=apikey
# EMAIL_PASS=your-sendgrid-api-key
# EMAIL_SECURE=false

# Admin email
ADMIN_EMAIL=admin@yourcompany.com

# App
NODE_ENV=development
PORT=3000
*/

// Get all contact submissions (admin only)
export const getContactSubmissions = async (req, res) => {
  try {
    const submissions = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return res.status(500).json({
      success: false,
      message: "Server error processing your request",
      error: error.message,
    });
  }
};

// Update contact submission status (admin only)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "read", "responded"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be: new, read, or responded",
      });
    }

    const submission = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: submission,
    });
  } catch (error) {
    console.error("Error updating contact status:", error);
    return res.status(500).json({
      success: false,
      message: "Server error processing your request",
      error: error.message,
    });
  }
};
