import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dotPattern";
import AnimatedText from "@/components/ui/AnimatedText";
import {
  Loader2,
  BookOpen,
  Clock,
  Calendar,
  Award,
  GraduationCap,
  FileText,
  ExternalLink,
  Download,
  Briefcase,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

// Component for dashboard statistics cards
const StatCard = ({ icon: Icon, title, value }) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold flex items-center">
        <Icon className="mr-2 h-5 w-5 text-primary" />
        {value}
      </div>
    </CardContent>
  </Card>
);

// Component for empty state
const EmptyState = ({ message, buttonText, onClick }) => (
  <div className="col-span-2 text-center py-10">
    <div className="text-muted-foreground mb-4">{message}</div>
    <Button onClick={onClick}>{buttonText}</Button>
  </div>
);

// Component for certificates tab
const CertificatesTab = ({ certificates, handleViewCertificate, navigate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {certificates?.length > 0 ? (
      certificates.map((certificate) => (
        <Card key={certificate._id}>
          <CardHeader>
            <CardTitle>{certificate.title}</CardTitle>
            <CardDescription>
              Issued on {new Date(certificate.issueDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  handleViewCertificate(certificate.certificateUrl || "#")
                }
              >
                <Award className="h-4 w-4 mr-1" />
                View Certificate
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))
    ) : (
      <EmptyState
        message="Complete courses to earn certificates."
        buttonText="Browse Courses"
        onClick={() => navigate("/courses")}
      />
    )}
  </div>
);

// Component for careers tab
const CareersTab = ({ careers, handleViewCareer, navigate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {careers?.length > 0 ? (
      careers.map((application) => (
        <Card key={application._id}>
          <CardHeader>
            <CardTitle>{application.career?.title}</CardTitle>
            <CardDescription>
              <span className="flex items-center">
                <Building className="h-4 w-4 mr-1" />
                {application.career?.department}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Status:</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    application.status === "Hired"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : application.status === "Rejected"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : application.status === "Shortlisted"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Applied:{" "}
                  {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-1 text-primary" />
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Resume
                  </a>
                </div>

                {application.coverLetter && (
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-1 text-primary" />
                    <a
                      href={application.coverLetter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Cover Letter
                    </a>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewCareer(application.career._id)}
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Position Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))
    ) : (
      <EmptyState
        message="You haven't applied to any career positions yet."
        buttonText="Browse Career Opportunities"
        onClick={() => navigate("/careers")}
      />
    )}
  </div>
);

// Component for internships tab
const InternshipsTab = ({ internships, handleViewInternship, navigate }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {internships?.length > 0 ? (
      internships.map((application) => (
        <Card key={application._id}>
          <CardHeader>
            <CardTitle>{application.internship?.title}</CardTitle>
            <CardDescription>{application.internship?.company}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Status:</span>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    application.status === "Accepted"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : application.status === "Rejected"
                      ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      : application.status === "In Review"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  Applied:{" "}
                  {new Date(application.appliedDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-1 text-primary" />
                  <a
                    href={application.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Resume
                  </a>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    handleViewInternship(application.internship._id)
                  }
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  View Internship
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))
    ) : (
      <EmptyState
        message="You haven't applied to any internships yet."
        buttonText="Browse Internships"
        onClick={() => navigate("/internships")}
      />
    )}
  </div>
);

// Component for courses tab
const CoursesTab = ({
  courses,
  handleContinueCourse,
  handleGenerateCertificate,
  navigate,
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {courses?.length > 0 ? (
      courses.map((course) => (
        <Card key={course._id}>
          <div className="flex flex-col md:flex-row gap-4 p-6">
            <div className="w-full md:w-1/3">
              <img
                src={
                  course.thumbnail || "https://placehold.co/600x400?text=Course"
                }
                alt={course.title}
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-1" />
                <span>Last accessed: Today</span>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handleContinueCourse(course._id)}>
                  Continue Learning
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleGenerateCertificate(course._id)}
                >
                  <Award className="h-4 w-4 mr-1" />
                  Get Certificate
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))
    ) : (
      <EmptyState
        message="You haven't enrolled in any courses yet."
        buttonText="Browse Courses"
        onClick={() => navigate("/courses")}
      />
    )}
  </div>
);

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserData } = useUserDashboard();

  const {
    data: dashboardData,
    isLoading: isDashboardLoading,
    refetch,
  } = getUserData();
  console.log(dashboardData, "dash");

  useEffect(() => {
    // console.log(dashboardData);
  }, [isDashboardLoading]);

  const handleContinueCourse = (courseId: string) => {
    navigate(`/courses/${courseId}`);
    toast.success("Resuming your course...");
  };

  const handleViewInternship = (internshipId: string) => {
    navigate(`/internships/${internshipId}`);
  };

  const handleViewCareer = (careerId: string) => {
    navigate(`/careers/${careerId}`);
  };

  const handleGenerateCertificate = async (courseId: string) => {
    try {
      // await generateCertificate(courseId);
      toast.success("Certificate generated successfully!");
      refetch();
    } catch (error) {
      console.error("Error generating certificate:", error);
      toast.error("Failed to generate certificate");
    }
  };

  const handleViewCertificate = (certificateUrl: string) => {
    window.open(certificateUrl, "_blank");
  };

  if (isDashboardLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative gl-container overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4">
        <div className="mb-10">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Dashboard
          </span>
          <AnimatedText
            text={`Welcome back, ${user?.name || "User"}`}
            className="text-3xl md:text-4xl font-medium mb-6"
            tag="h1"
          />
          <p className="text-muted-foreground">
            Track your learning progress and manage your courses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={BookOpen}
            title="Enrolled Courses"
            value={dashboardData?.enrolledCourses?.length || 0}
          />
          <StatCard
            icon={GraduationCap}
            title="Internships"
            value={dashboardData?.appliedInternships?.length || 0}
          />
          <StatCard
            icon={Briefcase}
            title="Careers"
            value={dashboardData?.appliedCareers?.length || 0}
          />
          <StatCard
            icon={Award}
            title="Certificates"
            value={dashboardData?.certificates?.length || 0}
          />
        </div>

        <Tabs defaultValue="courses" className="mb-10">
          <TabsList className="mb-6">
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <CoursesTab
              courses={dashboardData?.enrolledCourses}
              handleContinueCourse={handleContinueCourse}
              handleGenerateCertificate={handleGenerateCertificate}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="internships">
            <InternshipsTab
              internships={dashboardData?.appliedInternships}
              handleViewInternship={handleViewInternship}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="careers">
            <CareersTab
              careers={dashboardData?.appliedCareers}
              handleViewCareer={handleViewCareer}
              navigate={navigate}
            />
          </TabsContent>

          <TabsContent value="certificates">
            <CertificatesTab
              certificates={dashboardData?.certificates}
              handleViewCertificate={handleViewCertificate}
              navigate={navigate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserDashboard;
