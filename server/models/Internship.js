import mongoose from "mongoose";

const InternshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Internship title is required"],
      trim: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
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
    duration: {
      type: String,
      required: [true, "Duration is required"],
    },
    positions: {
      type: Number,
      required: [true, "Number of positions is required"],
      min: 1,
    },
    applications: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Upcoming", "Closed"],
      default: "Active",
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    remote: {
      type: Boolean,
      default: false,
    },
    stipend: String,
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    skills: {
      type: [String],
      required: [true, "Skills are required"],
    },
    registeredStudents:[
      {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
      }
    ]
  },
  { timestamps: true }
);

// Indexes for performance
InternshipSchema.index({ status: 1 });
InternshipSchema.index({ company: 1 });
InternshipSchema.index({ startDate: 1 });
InternshipSchema.index({ status: 1, startDate: 1 }); // Compound index for filtering active internships
InternshipSchema.index({ registeredStudents: 1 });

export default  mongoose.model("Internship", InternshipSchema);
