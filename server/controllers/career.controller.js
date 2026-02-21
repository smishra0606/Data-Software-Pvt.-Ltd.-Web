
import Career from "../models/Career.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// @desc    Get all careers
// @route   GET /api/careers
// @access  Public
export const getCareers = async (req, res) => {
  try {
    console.log("Fetching careers with query params:", req.query);
    
    // Build query
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit", "status"];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Find careers - start with an empty query to get all careers
    query = Career.find(JSON.parse(queryStr));
    
    console.log("Base query created with filters:", reqQuery);

    // Filter by status if provided
    if (req.query.status) {
      console.log(`Filtering by status: ${req.query.status}`);
      query = query.find({ status: req.query.status });
    } else {
      // Only apply "Open" filter for non-admin in public routes
      // We'll leave this commented out for now to fetch all careers
      /*if (!req.user || req.user.role !== "admin") {
        console.log("Non-admin request, filtering to Open positions only");
        query = query.find({ status: "Open" });
      }*/
    }

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      console.log(`Selecting fields: ${fields}`);
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      console.log(`Sorting by: ${sortBy}`);
      query = query.sort(sortBy);
    } else {
      query = query.sort("-postedDate");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Career.countDocuments();

    query = query.skip(startIndex).limit(limit);
    console.log(`Pagination: page ${page}, limit ${limit}`);

    // Execute query
    const careers = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    // Add logging for debugging
    console.log(`Found ${careers.length} careers in the database`);
    console.log("Career IDs:", careers.map(c => c._id));

    res.status(200).json({
      success: true,
      count: careers.length,
      pagination,
      data: careers,
    });
  } catch (error) {
    console.error("Get careers error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Get single career
// @route   GET /api/careers/:id
// @access  Public
export const getCareer = async (req, res) => {
  try {
    // Clean the ID to make sure there are no quotes
    const id = req.params.id.replace(/^["'](.*)["']$/, '$1');
    
    // Validate that the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: `Invalid career ID format: ${id}`,
      });
    }

    const career = await Career.findById(id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career not found with id of ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    console.error("Get career error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Create new career
// @route   POST /api/careers
// @access  Private (Admin)
export const createCareer = async (req, res) => {
  try {
    const career = await Career.create(req.body);

    res.status(201).json({
      success: true,
      data: career,
    });
  } catch (error) {
    console.error("Create career error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Update career
// @route   PUT /api/careers/:id
// @access  Private (Admin)
export const updateCareer = async (req, res) => {
  try {
    let career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career not found with id of ${req.params.id}`,
      });
    }

    career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: career,
    });
  } catch (error) {
    console.error("Update career error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Delete career
// @route   DELETE /api/careers/:id
// @access  Private (Admin)
export const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career not found with id of ${req.params.id}`,
      });
    }

    await career.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Delete career error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Apply for career
// @route   POST /api/careers/:id/apply
// @access  Private
export const applyCareer = async (req, res) => {
  try {
    const userId = req.user.id;
    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career not found with id of ${req.params.id}`,
      });
    }

    // Check if career is open for applications
    if (career.status !== "Open") {
      return res.status(400).json({
        success: false,
        message: "This position is no longer accepting applications",
      });
    }

    // Check if deadline has passed
    if (new Date(career.deadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "The application deadline for this position has passed",
      });
    }

    // Check if user has already applied
    const alreadyApplied = career.applicants.some(
      (applicant) => applicant.user.toString() === userId
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this position",
      });
    }

    const { resume, coverLetter } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    // Add user to career's applicants
    career.applicants.push({
      user: userId,
      resume,
      coverLetter: coverLetter || "",
      appliedDate: Date.now(),
      status: "Applied",
    });

    // Increment application count
    career.applicationCount += 1;
    await career.save();

    // Add career to user's applied careers
    await User.findByIdAndUpdate(userId, {
      $push: {
        appliedCareers: {
          career: req.params.id,
          resume,
          coverLetter: coverLetter || "",
          appliedDate: Date.now(),
          status: "Applied",
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Successfully applied to career position",
    });
  } catch (error) {
    console.error("Apply career error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Get career applicants (admin only)
// @route   GET /api/careers/:id/applicants
// @access  Private (Admin)
export const getCareerApplicants = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id).populate({
      path: "applicants.user",
      select: "name email profileImage",
    });

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      count: career.applicants.length,
      data: career.applicants,
    });
  } catch (error) {
    console.error("Get career applicants error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// @desc    Update applicant status (admin only)
// @route   PUT /api/careers/:id/applicants/:applicantId
// @access  Private (Admin)
export const updateApplicantStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    const career = await Career.findById(req.params.id);

    if (!career) {
      return res.status(404).json({
        success: false,
        message: `Career not found with id of ${req.params.id}`,
      });
    }

    // Find the applicant
    const applicant = career.applicants.id(req.params.applicantId);

    if (!applicant) {
      return res.status(404).json({
        success: false,
        message: "Applicant not found",
      });
    }

    // Update the applicant status
    applicant.status = status;
    await career.save();

    // Update the user's application status
    await User.updateOne(
      { 
        _id: applicant.user,
        "appliedCareers.career": req.params.id
      },
      {
        $set: {
          "appliedCareers.$.status": status,
        },
      }
    );

    res.status(200).json({
      success: true,
      data: applicant,
    });
  } catch (error) {
    console.error("Update applicant status error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
