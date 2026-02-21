import Internship from "../models/Internship.js";
import User from "../models/User.js";

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
export const getInternships = async (req, res, next) => {
  try {
    // Build query
    let query;
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );

    // Find internships
    query = Internship.find(JSON.parse(queryStr));

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Internship.countDocuments();

    query = query.skip(startIndex).limit(limit);

    // Execute query
    const internships = await query;

    // Map MongoDB _id to id for frontend compatibility
    const formattedInternships = internships.map((internship) => {
      const formattedInternship = internship.toObject();
      formattedInternship.id = formattedInternship._id.toString();
      return formattedInternship;
    });

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

    res.status(200).json({
      success: true,
      count: formattedInternships.length,
      pagination,
      data: formattedInternships,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single internship
// @route   GET /api/internships/:id
// @access  Public
export const getInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: `Internship not found with id of ${req.params.id}`,
      });
    }

    // Add id field for frontend compatibility
    const formattedInternship = internship.toObject();
    formattedInternship.id = formattedInternship._id.toString();

    res.status(200).json({
      success: true,
      data: formattedInternship,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new internship
// @route   POST /api/internships
// @access  Private (Admin)
export const createInternship = async (req, res, next) => {
  try {
    // Create internship
    const internship = await Internship.create(req.body);

    // Add id field for frontend compatibility
    const formattedInternship = internship.toObject();
    formattedInternship.id = formattedInternship._id.toString();

    res.status(201).json({
      success: true,
      data: formattedInternship,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update internship
// @route   PUT /api/internships/:id
// @access  Private (Admin)
export const updateInternship = async (req, res, next) => {
  try {
    let internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: `Internship not found with id of ${req.params.id}`,
      });
    }

    // Update internship
    internship = await Internship.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Add id field for frontend compatibility
    const formattedInternship = internship.toObject();
    formattedInternship.id = formattedInternship._id.toString();

    res.status(200).json({
      success: true,
      data: formattedInternship,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete internship
// @route   DELETE /api/internships/:id
// @access  Private (Admin)
export const deleteInternship = async (req, res, next) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: `Internship not found with id of ${req.params.id}`,
      });
    }

    await internship.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Apply for internship
// @route   POST /api/internships/:id/apply
// @access  Private
export const applyInternship = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: `Internship not found with id of ${req.params.id}`,
      });
    }

    // Check if user has already applied
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyApplied = user.appliedInternships.some(
      (application) =>
        application.internship &&
        application.internship.toString() === req.params.id
    );

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "Already applied to this internship",
      });
    }

    const { resume, coverLetter } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Resume is required",
      });
    }

    // console.log(
    //   `User ${user._id} applying for internship ${internship._id} with resume: ${resume}`
    // );
    internship.registeredStudents.push(userId);
    await internship.save();

    // Add internship to user's appliedInternships
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        appliedInternships: {
          internship: req.params.id,
          resume,
          coverLetter,
          status: "Applied",
          appliedDate: Date.now(),
        },
      },
    });

    // Increment applications count
    internship.applications += 1;
    await internship.save();

    res.status(200).json({
      success: true,
      message: "Successfully applied to internship",
    });
  } catch (error) {
    console.error("Apply internship error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error applying to internship",
    });
  }
};
