
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/reactQuery";
import { Course } from "@/types/course";
import { toast } from "sonner";

interface CourseResponse {
  success: boolean;
  data: Course;
}

interface CoursesResponse {
  success: boolean;
  count: number;
  data: Course[];
  pagination?: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
}

interface ImageUploadResponse {
  success: boolean;
  data: {
    url: string;
    filename: string;
  };
}

export function useCourses() {
  // Fetch all courses
  const getCourses = (options?: { page?: number; limit?: number; category?: string }) => {
    return useQuery({
      queryKey: ["courses", options],
      queryFn: async () => {
        const queryParams = new URLSearchParams();
        
        if (options?.page) queryParams.append("page", options.page.toString());
        if (options?.limit) queryParams.append("limit", options.limit.toString());
        if (options?.category) queryParams.append("category", options.category);
        
        const endpoint = `/courses${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
        return api.get<CoursesResponse>(endpoint);
      },
    });
  };

  // Fetch a single course
  const getCourse = (id: string) => {
    return useQuery({
      queryKey: ["courses", id],
      queryFn: () => api.get<CourseResponse>(`/courses/${id}`),
      enabled: !!id && id !== "undefined" && id !== "null", // Only run if we have a valid ID
    });
  };

  // Create a new course
  const createCourse = () => {
    return useMutation({
      mutationFn: (data: Omit<Course, "_id">) => 
        api.post<CourseResponse>("/courses", data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        toast.success("Course created successfully");
      },
      onError: (error) => {
        console.error("Failed to create course:", error);
      }
    });
  };

  // Update a course
  const updateCourse = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Course> }) => 
        api.put<CourseResponse>(`/courses/${id}`, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        queryClient.invalidateQueries({ queryKey: ["courses", variables.id] });
        toast.success("Course updated successfully");
      },
      onError: (error) => {
        console.error("Failed to update course:", error);
      }
    });
  };

  // Delete a course
  const deleteCourse = () => {
    return useMutation({
      mutationFn: (id: string) => 
        api.delete(`/courses/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        toast.success("Course deleted successfully");
      },
      onError: (error) => {
        console.error("Failed to delete course:", error);
      }
    });
  };

  // Enroll in a course
  const enrollInCourse = () => {
    return useMutation({
      mutationFn: (courseId: string) => 
        api.post<{ success: boolean; message: string }>(`/courses/${courseId}/enroll`, {}),
      onSuccess: (_, courseId) => {
        queryClient.invalidateQueries({ queryKey: ["courses", courseId] });
        queryClient.invalidateQueries({ queryKey: ["user", "dashboard"] });
        toast.success("Successfully enrolled in course");
      },
      onError: (error) => {
        console.error("Failed to enroll in course:", error);
      }
    });
  };

  // Upload course image
  const uploadCourseImage = () => {
    return useMutation({
      mutationFn: (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        return api.post<ImageUploadResponse>('/courses/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      },
      onSuccess: () => {
        toast.success("Image uploaded successfully");
      },
      onError: (error) => {
        console.error("Failed to upload image:", error);
        toast.error("Failed to upload image");
      }
    });
  };

  return {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    uploadCourseImage
  };
}
