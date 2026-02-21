
import mongoose from "mongoose";

const CareerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    requirements: {
      type: [String],
      required: [true, "Requirements are required"],
    },
    responsibilities: {
      type: [String],
      required: [true, "Responsibilities are required"],
    },
    qualifications: {
      type: [String],
      required: [true, "Qualifications are required"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Remote"],
      default: "Full-time",
    },
    salary: String,
    positions: {
      type: Number,
      required: [true, "Number of positions is required"],
      min: 1,
    },
    status: {
      type: String,
      enum: ["Open", "Closed", "Draft"],
      default: "Open",
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        resume: String,
        coverLetter: String,
        appliedDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: ["Applied", "Under Review", "Shortlisted", "Rejected", "Hired"],
          default: "Applied",
        },
      },
    ],
    applicationCount: {
      type: Number,
      default: 0,
    },
    postedDate: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },
  },
  { timestamps: true }
);

// Indexes for performance
CareerSchema.index({ status: 1 });
CareerSchema.index({ department: 1 });
CareerSchema.index({ deadline: 1 });
CareerSchema.index({ status: 1, deadline: 1 }); // Compound index for filtering open positions
CareerSchema.index({ 'applicants.user': 1 });

export default mongoose.model("Career", CareerSchema);
