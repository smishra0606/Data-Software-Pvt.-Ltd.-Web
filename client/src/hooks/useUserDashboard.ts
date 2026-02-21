
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { User } from "@/context/AuthContext";
import { Course } from "@/types/course";

interface UserDashboardData {
  enrolledCourses: Course[];
  appliedInternships: Array<{
    _id: string;
    title: string;
    company: string;
    status: string;
    startDate?: string;
    endDate?: string;
    appliedDate?: string;
    internship: any;
    resume: string;
  }>;
  appliedCareers?: Array<{
    _id: string;
    title: string;
    department: string;
    status: string;
    appliedDate?: string;
    resume: string;
    coverLetter?: string;
  }>;
  completedCourses: Course[];
  certificates: Array<{
    _id: string;
    courseId: string;
    title: string;
    issueDate: string;
    completionDate?: string;
    certificateUrl?: string;
  }>;
}

export function useUserDashboard() {
  // Get user data including enrollments
  const getUserData = () => {
    return useQuery({
      queryKey: ["user", "dashboard"],
      queryFn: async () => {
        try {
          // Get enrolled courses
          const enrolledResponse = await api.get<{
            success: boolean;
            count: number;
            data: Course[];
          }>("/users/enrollments");

          // Get applied internships
          const internshipsResponse = await api.get<{
            success: boolean;
            count: number;
            data: any[];
          }>("/users/applications");

          // Get applied careers
          const careersResponse = await api.get<{
            success: boolean;
            count: number;
            data: any[];
          }>("/users/career-applications");

          // Get certificates
          const certificatesResponse = await api.get<{
            success: boolean;
            count: number;
            data: any[];
          }>("/users/certificates");

          const data: UserDashboardData = {
            enrolledCourses: enrolledResponse.data || [],
            appliedInternships: internshipsResponse.data || [],
            appliedCareers: careersResponse.data || [],
            completedCourses: [], // We'll implement this endpoint later
            certificates: certificatesResponse.data || [],
          };

          return data;
        } catch (error) {
          console.error("Error fetching user dashboard data:", error);
          throw error;
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    });
  };

  // Get user profile data
  const getUserProfile = () => {
    return useQuery({
      queryKey: ["user", "profile"],
      queryFn: async () => {
        try {
          const response = await api.get<{ success: boolean; user: User }>(
            "/auth/me"
          );
          return response.user;
        } catch (error) {
          console.error("Error fetching user profile:", error);
          throw error;
        }
      },
    });
  };

  return {
    getUserData,
    getUserProfile,
  };
}
