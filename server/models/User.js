
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    phone: {
      type: String,
      default: "",
    },
    preferences: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    googleId: {
      type: String,
    },
    profileImage: {
      type: String,
      default: "",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    enrolledCourses: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        enrollmentDate: {
          type: Date,
          default: Date.now,
        },
        progress: {
          type: Number,
          default: 0,
        },
        completed: {
          type: Boolean,
          default: false,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        completionDate: Date,
      },
    ],
    appliedInternships: [
      {
        internship: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Internship",
        },
        status: {
          type: String,
          enum: ["Applied", "In Review", "Accepted", "Rejected"],
          default: "Applied",
        },
        resume: String,
        coverLetter: String,
        appliedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    appliedCareers: [
      {
        career: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Career",
        },
        status: {
          type: String,
          enum: ["Applied", "Under Review", "Shortlisted", "Rejected", "Hired"],
          default: "Applied",
        },
        resume: String,
        coverLetter: String,
        appliedDate: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    certificates: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        title: String,
        certificateId: String,
        issueDate: {
          type: Date,
          default: Date.now,
        },
        completionDate: Date,
        certificateUrl: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Indexes for performance
// Note: email index created automatically by unique: true in schema
UserSchema.index({ role: 1 });
UserSchema.index({ 'enrolledCourses.course': 1 });
UserSchema.index({ 'appliedInternships.internship': 1 });
UserSchema.index({ googleId: 1 });

export default mongoose.model("User", UserSchema);
