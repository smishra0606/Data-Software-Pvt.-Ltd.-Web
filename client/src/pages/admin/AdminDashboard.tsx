import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DotPattern } from "@/components/ui/dotPattern";
import AnimatedText from "@/components/ui/AnimatedText";
import {
  Loader2,
  Users,
  BookOpen,
  GraduationCap,
  BarChart,
  TrendingUp,
  Award,
  PlusCircle,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useCourses } from "@/hooks/useCourses";
import { useInternships } from "@/hooks/useInternships";
import { useCareers } from "@/hooks/useCareers";
import CareerManagement from "@/components/admin/CareerManagement";
import CourseCard from "@/components/CourseCard";
import EnrollmentManagement from "@/components/admin/EnrollmentManagement";
import UserManagement from "@/components/admin/UserManagement";

interface AdminStats {
  totalUsers: number;
  totalCourses: number;
  totalInternships: number;
  totalRevenue: number;
  courseStats: {
    totalEnrollments: number;
    activeCourses: number;
    averageRating: number;
    completionRate: number;
  };
  internshipStats: {
    activeInternships: number;
    totalApplications: number;
    acceptedApplications: number;
  };
  careerStats: {
    openPositions: number;
    totalApplications: number;
    acceptanceRate: number;
  };
}

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

const OverviewTab = ({ adminStats, navigate }) => {
  const handleManageCourses = () => navigate("/admin/courses");
  const handleCreateInternship = () => navigate("/admin/internships/create");
  const handleManageCareers = () => navigate("/admin/careers");

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5" />
            Course Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Enrollments</span>
              <span className="font-semibold">
                {adminStats.courseStats.totalEnrollments}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Courses</span>
              <span className="font-semibold">
                {adminStats.courseStats.activeCourses}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Rating</span>
              <span className="font-semibold">
                {adminStats.courseStats.averageRating}/5
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Completion Rate</span>
              <span className="font-semibold">
                {adminStats.courseStats.completionRate}%
              </span>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleManageCourses} className="flex-1">
                Manage Courses
              </Button>
              <Button
                onClick={() => navigate("/admin/enrollments")}
                variant="outline"
                className="flex-1"
              >
                <Award className="mr-2 h-4 w-4" />
                Certificates
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <GraduationCap className="mr-2 h-5 w-5" />
            Internship Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Active Internships</span>
              <span className="font-semibold">
                {adminStats.internshipStats.activeInternships}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Applications</span>
              <span className="font-semibold">
                {adminStats.internshipStats.totalApplications}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">
                Accepted Applications
              </span>
              <span className="font-semibold">
                {adminStats.internshipStats.acceptedApplications}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Acceptance Rate</span>
              <span className="font-semibold">
                {adminStats.internshipStats.totalApplications > 0
                  ? Math.round(
                      (adminStats.internshipStats.acceptedApplications /
                        adminStats.internshipStats.totalApplications) *
                        100
                    )
                  : 0}
                %
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => navigate("/admin/internships")}
                className="flex-1"
              >
                Manage Internships
              </Button>
              <Button
                onClick={handleCreateInternship}
                variant="outline"
                className="flex-1"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Briefcase className="mr-2 h-5 w-5" />
            Careers Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Open Positions</span>
              <span className="font-semibold">
                {adminStats?.careerStats?.openPositions || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Applications</span>
              <span className="font-semibold">
                {adminStats?.careerStats?.totalApplications || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Acceptance Rate</span>
              <span className="font-semibold">
                {adminStats?.careerStats?.acceptanceRate || 0}%
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleManageCareers} className="flex-1">
                Manage Careers
              </Button>
              <Button
                onClick={() => navigate("/admin/careers/create")}
                variant="outline"
                className="flex-1"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Position
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CoursesTab = ({ coursesResponse, handleManageCourses }) => (
  <>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Course Management</h2>
      <Button onClick={handleManageCourses}>Manage Courses</Button>
    </div>

    <div className="text-center py-10">
      <p className="text-muted-foreground">
        Courses section is temporarily disabled
      </p>
      <Button onClick={handleManageCourses} className="mt-4">
        Manage Courses
      </Button>
    </div>
  </>
);

const InternshipsTab = ({ internshipsResponse, navigate }) => (
  <>
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Internship Management</h2>
      <Button onClick={() => navigate("/admin/internships/create")}>
        Add New Internship
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {internshipsResponse?.data && internshipsResponse.data.length > 0 ? (
        internshipsResponse.data.map((internship) => (
          <Card key={internship.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{internship.title}</CardTitle>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    internship.status === "Active"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : internship.status === "Upcoming"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-800/30 dark:text-gray-400"
                  }`}
                >
                  {internship.status}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{internship.company}</p>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Duration:</span>
                  <span>{internship.duration}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Applications:</span>
                  <span>{internship.applications}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Positions:</span>
                  <span>{internship.positions}</span>
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    navigate(`/admin/internships/edit/${internship.id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() =>
                    navigate(`/admin/internships/${internship.id}/applicants`)
                  }
                >
                  View Applicants
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="col-span-3 text-center py-10">
          <p className="text-muted-foreground mb-4">No internships found</p>
          <Button onClick={() => navigate("/admin/internships/create")}>
            Create Your First Internship
          </Button>
        </div>
      )}
    </div>
  </>
);

const UsersTab = ({ adminStats, navigate }) => (
  <UserManagement />
);

const CareersTab = ({ navigate }) => {
  return <CareerManagement />;
};

const AdminDashboard = () => {
  const navigate = useNavigate();

  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: () =>
      api.get<{ success: boolean; data: AdminStats }>("/admin/stats"),
    throwOnError: true,
  });

  const { getCourses } = useCourses();
  const { data: coursesResponse, isLoading: coursesLoading } = getCourses({
    limit: 6,
  });

  const { getInternships } = useInternships();
  const { data: internshipsResponse, isLoading: internshipsLoading } =
    getInternships();

  const { getCareers } = useCareers();
  const { data: careersData, isLoading: careersLoading } = getCareers();

  const adminStats = statsData?.data || {
    totalUsers: 0,
    totalCourses: 0,
    totalInternships: 0,
    totalRevenue: 0,
    courseStats: {
      totalEnrollments: 0,
      activeCourses: 0,
      averageRating: 0,
      completionRate: 0,
    },
    internshipStats: {
      activeInternships: 0,
      totalApplications: 0,
      acceptedApplications: 0,
    },
    careerStats: {
      openPositions: 0,
      totalApplications: 0,
      acceptanceRate: 0,
    },
  };

  if (careersData && adminStats) {
    const openPositions = careersData.filter(career => career.status === "Open").length;
    let totalApplications = 0;
    
    careersData.forEach(career => {
      totalApplications += career.applicationCount || 0;
    });
    
    adminStats.careerStats = {
      openPositions,
      totalApplications,
      acceptanceRate: totalApplications > 0 ? Math.round((totalApplications * 0.3) / totalApplications * 100) : 0
    };
  }

  const handleManageCourses = () => {
    navigate("/admin/courses");
  };

  const isLoading = statsLoading || coursesLoading || internshipsLoading || careersLoading;

  const formatNumber = (value: number | undefined) => {
    return value !== undefined ? value.toLocaleString() : "0";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative global-padding py-12 overflow-hidden pt-24">
      <DotPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4">
        <div className="mb-10">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Admin Dashboard
          </span>
          <AnimatedText
            text="Platform Overview"
            className="text-3xl md:text-4xl font-medium mb-6"
            tag="h1"
          />
          <p className="text-muted-foreground">
            Manage all aspects of your educational platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={Users}
            title="Total Users"
            value={adminStats.totalUsers}
          />
          <StatCard
            icon={BookOpen}
            title="Total Courses"
            value={adminStats.totalCourses}
          />
          <StatCard
            icon={GraduationCap}
            title="Total Internships"
            value={adminStats.totalInternships}
          />
          <StatCard
            icon={TrendingUp}
            title="Total Revenue"
            value={`$${formatNumber(adminStats.totalRevenue)}`}
          />
        </div>

        <Tabs defaultValue="overview" className="mb-10">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="internships">Internships</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab adminStats={adminStats} navigate={navigate} />
          </TabsContent>

          <TabsContent value="courses">
            <CoursesTab
              coursesResponse={coursesResponse}
              handleManageCourses={handleManageCourses}
            />
          </TabsContent>

          <TabsContent value="internships">
            <InternshipsTab
              internshipsResponse={internshipsResponse}
              navigate={navigate}
            />
          </TabsContent>
          
          <TabsContent value="careers">
            <CareersTab navigate={navigate} />
          </TabsContent>

          <TabsContent value="enrollments">
            <EnrollmentManagement />
          </TabsContent>

          <TabsContent value="users">
            <UsersTab adminStats={adminStats} navigate={navigate} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
