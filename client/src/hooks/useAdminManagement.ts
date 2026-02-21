
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/reactQuery";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

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
}

interface Enrollment {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: string;
  progress: number;
  completed: boolean;
}

interface Application {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  appliedDate: string;
  status: string;
  resume: string;
  coverLetter?: string;
}

export function useAdminManagement() {
  const { user } = useAuth();

  // Get admin dashboard stats
  const getAdminStats = () => {
    return useQuery({
      queryKey: ["admin", "stats"],
      queryFn: async () => {
        try {
          const response = await api.get<{ success: boolean; data: AdminStats }>("/admin/stats");
          return response;
        } catch (error) {
          console.error("Error fetching admin stats:", error);
          throw error;
        }
      },
      enabled: !!user && user?.role === "admin",
    });
  };

  // Get all enrollments (admin only)
  const getEnrollments = () => {
    return useQuery({
      queryKey: ["admin", "enrollments"],
      queryFn: async () => {
        try {
          const response = await api.get<{ success: boolean; count: number; data: Enrollment[] }>(
            "/admin/enrollments"
          );
          return response;
        } catch (error) {
          console.error("Error fetching enrollments:", error);
          throw error;
        }
      },
      enabled: !!user && user?.role === "admin",
    });
  };

  // Get all internship applications (admin only)
  const getInternshipApplications = () => {
    return useQuery({
      queryKey: ["admin", "applications"],
      queryFn: async () => {
        try {
          const response = await api.get<{ success: boolean; count: number; data: Application[] }>(
            "/admin/applications"
          );
          return response;
        } catch (error) {
          console.error("Error fetching applications:", error);
          throw error;
        }
      },
      enabled: !!user && user?.role === "admin",
    });
  };

  // Update application status (admin only)
  const updateApplicationStatus = () => {
    return useMutation({
      mutationFn: async ({ applicationId, status }: { applicationId: string; status: string }) => {
        try {
          const response = await api.put<{ success: boolean; message: string }>(
            `/admin/applications/${applicationId}`,
            { status }
          );
          return response;
        } catch (error) {
          console.error("Error updating application status:", error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        toast.success("Application status updated successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update application status");
      }
    });
  };

  // Generate certificate for a user (admin only)
  const generateCertificate = () => {
    return useMutation({
      mutationFn: async ({ userId, courseId, title, completionDate }: { userId: string; courseId: string; title: string; completionDate?: Date }) => {
        try {
          const data = { userId, courseId, title };
          if (completionDate) {
            Object.assign(data, { completionDate });
          }
          
          const response = await api.post<{ success: boolean; message: string; data: { certificateUrl: string } }>(
            `/admin/certificates`,
            data
          );
          return response;
        } catch (error) {
          console.error("Error generating certificate:", error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["admin", "enrollments"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        queryClient.invalidateQueries({ queryKey: ["user", "certificates"] });
        toast.success("Certificate generated successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to generate certificate");
      }
    });
  };

  // Delete a course (admin only)
  const deleteCourse = () => {
    return useMutation({
      mutationFn: async (courseId: string) => {
        try {
          const response = await api.delete<{ success: boolean; message: string }>(
            `/courses/${courseId}`
          );
          return response;
        } catch (error) {
          console.error("Error deleting course:", error);
          throw error;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "enrollments"] });
        toast.success("Course deleted successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to delete course");
      }
    });
  };

  return {
    getAdminStats,
    getEnrollments,
    getInternshipApplications,
    updateApplicationStatus,
    generateCertificate,
    deleteCourse,
  };
}
