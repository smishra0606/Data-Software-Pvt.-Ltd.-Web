import Course from "../models/Course.js";
import User from "../models/User.js";
import Internship from "../models/Internship.js";
import Career from "../models/Career.js";

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getStats = async (req, res, next) => {
  try {
    // Get basic counts (fast - uses indexes)
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();
    const totalInternships = await Internship.countDocuments();
    const totalCareers = await Career.countDocuments();
    
    // Use aggregation for enrollment statistics (much faster than loading all users)
    const enrollmentStats = await User.aggregate([
      { $unwind: { path: '$enrolledCourses', preserveNullAndEmptyArrays: false } },
      {
        $group: {
          _id: null,
          totalEnrollments: { $sum: 1 },
          completedCourses: {
            $sum: { $cond: ['$enrolledCourses.completed', 1, 0] }
          },
          totalRatings: {
            $sum: { $cond: [{ $gt: ['$enrolledCourses.rating', 0] }, '$enrolledCourses.rating', 0] }
          },
          ratingCount: {
            $sum: { $cond: [{ $gt: ['$enrolledCourses.rating', 0] }, 1, 0] }
          }
        }
      }
    ]);
    
    const enrollData = enrollmentStats[0] || {
      totalEnrollments: 0,
      completedCourses: 0,
      totalRatings: 0,
      ratingCount: 0
    };
    
    // Calculate course statistics
    const totalEnrollments = enrollData.totalEnrollments;
    const completedCourses = enrollData.completedCourses;
    const averageRating = enrollData.ratingCount > 0 
      ? (enrollData.totalRatings / enrollData.ratingCount).toFixed(1) 
      : 0;
    const completionRate = totalEnrollments > 0 
      ? Math.round((completedCourses / totalEnrollments) * 100) 
      : 0;
    const totalRevenue = totalEnrollments * 99; // Assuming $99 per course
    
    // Get active courses count
    const activeCourses = await Course.countDocuments({ status: "published" });
    
    // Internship statistics using aggregation
    const activeInternships = await Internship.countDocuments({ status: "Active" });
    
    const internshipStats = await User.aggregate([
      { $unwind: { path: '$appliedInternships', preserveNullAndEmptyArrays: false } },
      {
        $group: {
          _id: null,
          totalApplications: { $sum: 1 },
          acceptedApplications: {
            $sum: { $cond: [{ $eq: ['$appliedInternships.status', 'Accepted'] }, 1, 0] }
          }
        }
      }
    ]);
    
    const internData = internshipStats[0] || {
      totalApplications: 0,
      acceptedApplications: 0
    };
    
    // Career statistics using aggregation
    const openCareers = await Career.countDocuments({ status: "Open" });
    
    const careerStats = await Career.aggregate([
      { $unwind: { path: '$applicants', preserveNullAndEmptyArrays: false } },
      {
        $group: {
          _id: null,
          totalApplications: { $sum: 1 },
          acceptedApplications: {
            $sum: {
              $cond: [
                { $in: ['$applicants.status', ['Hired', 'Shortlisted']] },
                1,
                0
              ]
            }
          }
        }
      }
    ]);
    
    const careerData = careerStats[0] || {
      totalApplications: 0,
      acceptedApplications: 0
    };
    
    const careerAcceptanceRate = careerData.totalApplications > 0 
      ? Math.round((careerData.acceptedApplications / careerData.totalApplications) * 100) 
      : 0;
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalCourses,
        totalInternships,
        totalCareers,
        totalRevenue: Math.round(totalRevenue),
        courseStats: {
          totalEnrollments,
          activeCourses,
          averageRating: parseFloat(averageRating),
          completionRate,
        },
        internshipStats: {
          activeInternships,
          totalApplications: internData.totalApplications,
          acceptedApplications: internData.acceptedApplications,
        },
        careerStats: {
          openPositions: openCareers,
          totalApplications: careerData.totalApplications,
          acceptedApplications: careerData.acceptedApplications,
          acceptanceRate: careerAcceptanceRate
        },
      },
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching admin statistics',
    });
  }
};

// @desc    Get all course enrollments
// @route   GET /api/admin/enrollments
// @access  Private (Admin only)
export const getEnrollments = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Find all users with enrolled courses (paginated)
    const users = await User.find({ "enrolledCourses.0": { $exists: true } })
      .populate("enrolledCourses.course")
      .select("name email enrolledCourses")
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const totalCount = await User.countDocuments({ "enrolledCourses.0": { $exists: true } });
    
    // Format the data for easier consumption by the frontend
    const enrollments = users.flatMap(user => 
      user.enrolledCourses.map(enrollment => {
        // Make sure enrollment.course exists and has the expected properties
        if (!enrollment.course) {
          console.error(`Course not found for enrollment: ${enrollment._id}`);
          return null;
        }
        
        return {
          _id: enrollment._id,
          userName: user.name,
          userEmail: user.email,
          userId: user._id,
          courseId: enrollment.course._id,
          courseTitle: enrollment.course.title || "Unknown Course",
          enrollmentDate: enrollment.enrollmentDate,
          progress: enrollment.progress || 0,
          completed: enrollment.completed || false,
          certificate: enrollment.completed ? {
            id: enrollment._id,
            userId: user._id,
            courseId: enrollment.course._id
          } : null
        };
      }).filter(Boolean) // Remove null entries
    );
    
    res.status(200).json({
      success: true,
      count: enrollments.length,
      total: totalCount,
      page,
      pages: Math.ceil(totalCount / limit),
      data: enrollments,
    });
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching enrollments',
    });
  }
};

// @desc    Generate certificate for a user
// @route   POST /api/admin/certificates
// @access  Private (Admin only)
export const generateCertificate = async (req, res, next) => {
  try {
    const { userId, courseId, title } = req.body;
    
    if (!userId || !courseId || !title) {
      return res.status(400).json({
        success: false,
        message: "Please provide userId, courseId, and title",
      });
    }
    
    // Find user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }
    
    // Check if user is enrolled in the course
    const isEnrolled = user.enrolledCourses.some(
      (enrollment) => enrollment.course.toString() === courseId
    );
    
    if (!isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "User is not enrolled in this course",
      });
    }
    
    // Generate certificate details
    const certificateId = `CERT-${Date.now()}-${userId.substring(0, 5)}`;
    const issueDate = new Date();
    
    // Generate certificate URL (in a real app, this would be generated)
    const certificateUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1/${certificateId}.pdf`;
    const certificatePublicId = `certificates/${certificateId}`;
    
    // Add certificate to user
    await User.findByIdAndUpdate(userId, {
      $push: {
        certificates: {
          title,
          courseId,
          certificateId,
          issueDate,
          certificateUrl,
          publicId: certificatePublicId
        },
      },
    });
    
    res.status(200).json({
      success: true,
      message: "Certificate generated successfully",
      data: {
        certificateId,
        title,
        userName: user.name,
        courseName: course.title,
        issueDate,
        certificateUrl,
        publicId: certificatePublicId
      },
    });
  } catch (error) {
    console.error('Generate certificate error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating certificate',
    });
  }
};

// @desc    Get all internship applications
// @route   GET /api/admin/applications
// @access  Private (Admin only)
export const getApplications = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Find all users with applied internships (paginated)
    const users = await User.find({ "appliedInternships.0": { $exists: true } })
      .populate("appliedInternships.internship")
      .select("name email appliedInternships")
      .skip(skip)
      .limit(limit);
    
    // Get total count for pagination
    const totalCount = await User.countDocuments({ "appliedInternships.0": { $exists: true } });
    
    // Format the data for easier consumption by the frontend
    const applications = users.flatMap(user => 
      user.appliedInternships.map(application => {
        // Make sure application.internship exists
        if (!application.internship) {
          console.error(`Internship not found for application: ${application._id}`);
          return null;
        }
        
        // Parse resume URL to extract filename and public ID if available
        let resumeFileName = "Resume";
        let resumePublicId = null;
        
        if (application.resume) {
          try {
            // Extract the public ID from URL if it follows Cloudinary pattern
            const urlParts = application.resume.split('/');
            const fileNameWithExt = urlParts[urlParts.length - 1]; // Gets filename.ext
            resumeFileName = fileNameWithExt;
            
            // Try to extract public ID if it's a Cloudinary URL
            if (application.resume.includes('cloudinary')) {
              const uploadIndex = application.resume.indexOf('upload/');
              if (uploadIndex !== -1) {
                resumePublicId = application.resume.slice(uploadIndex + 7); // After 'upload/'
              }
            }
          } catch (error) {
            console.error("Error parsing resume URL:", error);
          }
        }
        
        return {
          _id: application._id,
          userName: user.name,
          userEmail: user.email,
          userId: user._id,
          internshipId: application.internship._id,
          internshipTitle: application.internship.title || "Unknown Internship",
          company: application.internship.company || "Unknown Company",
          status: application.status,
          appliedDate: application.appliedDate,
          resume: application.resume,
          resumeFileName: resumeFileName,
          resumePublicId: resumePublicId,
          coverLetter: application.coverLetter,
        };
      }).filter(Boolean) // Remove null entries
    );
    
    res.status(200).json({
      success: true,
      count: applications.length,
      total: totalCount,
      page,
      pages: Math.ceil(totalCount / limit),
      data: applications,
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching applications',
    });
  }
};

// @desc    Update application status
// @route   PUT /api/admin/applications/:id
// @access  Private (Admin only)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Please provide status",
      });
    }
    
    const validStatuses = ["Applied", "In Review", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }
    
    // Find user with this application
    const user = await User.findOne({
      "appliedInternships._id": id,
    });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    
    // Update application status
    const applicationIndex = user.appliedInternships.findIndex(
      (app) => app._id.toString() === id
    );
    
    if (applicationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    
    user.appliedInternships[applicationIndex].status = status;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
    });
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating application status',
    });
  }
};

// @desc    Get career applications with applicant details
// @route   GET /api/admin/career-applications
// @access  Private (Admin only)
export const getCareerApplications = async (req, res, next) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Use aggregation to efficiently fetch careers with applicant details (fixes N+1 query)
    const careersWithApplicants = await Career.aggregate([
      // Match only careers that have applicants
      { $match: { 'applicants.0': { $exists: true } } },
      // Unwind applicants array
      { $unwind: '$applicants' },
      // Lookup user details for each applicant (single query instead of loop)
      {
        $lookup: {
          from: 'users',
          localField: 'applicants.user',
          foreignField: '_id',
          as: 'applicantUser'
        }
      },
      // Unwind the user array
      { $unwind: { path: '$applicantUser', preserveNullAndEmptyArrays: true } },
      // Project the fields we need
      {
        $project: {
          careerId: '$_id',
          careerTitle: '$title',
          company: '$company',
          location: '$location',
          applicantId: '$applicants._id',
          userId: '$applicantUser._id',
          userName: '$applicantUser.name',
          userEmail: '$applicantUser.email',
          status: '$applicants.status',
          appliedDate: '$applicants.appliedDate',
          resume: '$applicants.resume',
          coverLetter: '$applicants.coverLetter'
        }
      },
      // Skip for pagination
      { $skip: skip },
      // Limit for pagination
      { $limit: limit }
    ]);
    
    // Get total count for pagination
    const totalCountResult = await Career.aggregate([
      { $match: { 'applicants.0': { $exists: true } } },
      { $unwind: '$applicants' },
      { $count: 'total' }
    ]);
    const totalCount = totalCountResult[0]?.total || 0;
    
    // Format the data with parsed resume info
    const applications = careersWithApplicants.map(app => {
      let resumeFileName = "Resume";
      let resumePublicId = null;
      
      if (app.resume) {
        try {
          const urlParts = app.resume.split('/');
          const fileNameWithExt = urlParts[urlParts.length - 1];
          resumeFileName = fileNameWithExt;
          
          if (app.resume.includes('cloudinary')) {
            const uploadIndex = app.resume.indexOf('upload/');
            if (uploadIndex !== -1) {
              resumePublicId = app.resume.slice(uploadIndex + 7);
            }
          }
        } catch (error) {
          console.error("Error parsing resume URL:", error);
        }
      }
      
      return {
        _id: app.applicantId,
        careerId: app.careerId,
        careerTitle: app.careerTitle,
        company: app.company,
        location: app.location,
        userId: app.userId,
        userName: app.userName,
        userEmail: app.userEmail,
        status: app.status,
        appliedDate: app.appliedDate,
        resume: app.resume,
        resumeFileName,
        resumePublicId,
        coverLetter: app.coverLetter
      };
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      total: totalCount,
      page,
      pages: Math.ceil(totalCount / limit),
      data: applications,
    });
  } catch (error) {
    console.error('Get career applications error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching career applications',
    });
  }
};
