
import User from "../models/User.js";
import Course from "../models/Course.js";
import Internship from "../models/Internship.js";

// @desc    Get enrolled courses for current user
// @route   GET /api/users/enrollments
// @access  Private
export const getEnrolledCourses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");

    res.status(200).json({
      success: true,
      count: user.enrolledCourses.length,
      data: user.enrolledCourses,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applied internships for current user
// @route   GET /api/users/applications
// @access  Private
export const getAppliedInternships = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "appliedInternships.internship",
      model: "Internship",
    });

    res.status(200).json({
      success: true,
      count: user.appliedInternships.length,
      data: user.appliedInternships,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user certificates
// @route   GET /api/users/certificates
// @access  Private
export const getUserCertificates = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user.certificates) {
      return res.status(200).json({
        success: true,
        count: 0,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      count: user.certificates.length,
      data: user.certificates,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user career applications
// @route   GET /api/users/career-applications
// @access  Private
export const getCareerApplications = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "appliedCareers.career",
      select: "title department location type",
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      count: user.appliedCareers ? user.appliedCareers.length : 0,
      data: user.appliedCareers || [],
    });
  } catch (error) {
    console.error("Error fetching career applications:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Get user by ID (admin only)
// @route   GET /api/users/:id
// @access  Private (Admin)
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("enrolledCourses.course")
      .populate("appliedInternships.internship")
      .populate("appliedCareers.career");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      phone: req.body.phone,
      preferences: req.body.preferences,
      bio: req.body.bio, // Added bio field
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        phone: user.phone,
        preferences: user.preferences,
        bio: user.bio, // Include bio in response
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile image
// @route   PUT /api/users/updateUserProfile
// @access  Private
export const updateProfileImage = async (req, res, next) => {
  try {
    const { profileImage } = req.body;
    
    if (!profileImage) {
      return res.status(400).json({
        success: false,
        message: "Profile image URL is required",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id, 
      { profileImage }, 
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        phone: user.phone,
        preferences: user.preferences,
        bio: user.bio, // Include bio in response
      },
      message: "Profile image updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private (Admin)
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
