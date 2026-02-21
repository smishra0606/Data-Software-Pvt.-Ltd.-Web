import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Lesson title is required"],
  },
  duration: {
    type: String,
    required: [true, "Lesson duration is required"],
  },
  videoUrl: String,
});

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Module title is required"],
  },
  lessons: [LessonSchema],
});

const InstructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Instructor name is required"],
  },
  title: String,
  bio: String,
  avatar: String,
});

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    thumbnail: {
      type: String,
      required: [true, "Course thumbnail is required"],
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
    },
    price: {
      type: Number,
      required: [true, "Course price is required"],
      min: 0,
    },
    originalPrice: Number,
    duration: {
      type: String,
      required: [true, "Course duration is required"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    studentsEnrolled: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    lessons: {
      type: Number,
      required: [true, "Number of lessons is required"],
      min: 1,
    },
    modules: {
      type: Number,
      required: [true, "Number of modules is required"],
      min: 1,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
    instructor: InstructorSchema,
    learningOutcomes: [String],
    curriculum: [ModuleSchema],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    enrollmentCount: {
      type: Number,
      default: 0,
    },
    completionRate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Indexes for performance
CourseSchema.index({ category: 1 });
CourseSchema.index({ status: 1 });
CourseSchema.index({ featured: 1 });
CourseSchema.index({ category: 1, status: 1 }); // Compound index for filtering
CourseSchema.index({ studentsEnrolled: -1 }); // For sorting by popularity
CourseSchema.index({ rating: -1 }); // For sorting by rating

export default mongoose.model("Course", CourseSchema);
