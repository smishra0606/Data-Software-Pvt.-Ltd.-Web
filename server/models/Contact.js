import mongoose from "mongoose";

// Define Contact Schema if it doesn't exist yet
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    default: "Not provided",
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["new", "read", "responded"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for performance
ContactSchema.index({ status: 1 });
ContactSchema.index({ createdAt: -1 }); // For sorting by newest first
ContactSchema.index({ email: 1 });

export const Contact = mongoose.model("contact", ContactSchema);
