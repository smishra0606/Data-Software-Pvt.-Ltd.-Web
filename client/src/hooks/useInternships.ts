
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/reactQuery";
import { Internship } from "@/types/internship";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface InternshipResponse {
  success: boolean;
  data: Internship;
}

interface InternshipsResponse {
  success: boolean;
  count: number;
  data: Internship[];
  pagination?: {
    next?: { page: number; limit: number };
    prev?: { page: number; limit: number };
  };
}

export function useInternships() {
  const { user } = useAuth();
  const token = user ? localStorage.getItem("token") : null;

  // Fetch all internships
  const getInternships = () => {
    return useQuery({
      queryKey: ["internships"],
      queryFn: () => api.get<InternshipsResponse>("/internships"),
    });
  };

  // Fetch a single internship
  const getInternship = (id: string | undefined) => {
    return useQuery({
      queryKey: ["internships", id],
      queryFn: () => {
        if (!id || id === "undefined" || id === "null") {
          throw new Error("Invalid internship ID");
        }
        return api.get<InternshipResponse>(`/internships/${id}`);
      },
      // Only run the query if we have a valid ID - prevent undefined ID requests
      enabled: !!id && id !== "undefined" && id !== "null",
    });
  };

  // Create a new internship
  const createInternship = () => {
    return useMutation({
      mutationFn: (data: Omit<Internship, "id" | "createdAt" | "updatedAt">) => 
        api.post<InternshipResponse>("/internships", data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["internships"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        toast.success("Internship created successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to create internship");
      }
    });
  };

  // Update an internship
  const updateInternship = () => {
    return useMutation({
      mutationFn: ({ id, data }: { id: string; data: Partial<Internship> }) => 
        api.put<InternshipResponse>(`/internships/${id}`, data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["internships"] });
        queryClient.invalidateQueries({ queryKey: ["internships", variables.id] });
        queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        toast.success("Internship updated successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to update internship");
      }
    });
  };

  // Delete an internship
  const deleteInternship = () => {
    return useMutation({
      mutationFn: (id: string) => 
        api.delete<void>(`/internships/${id}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["internships"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        toast.success("Internship deleted successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to delete internship");
      }
    });
  };

  // Apply for an internship
  const applyForInternship = () => {
    return useMutation({
      mutationFn: ({ internshipId, data }: { internshipId: string; data: { resume: string; coverLetter?: string } }) => {
        if (!internshipId || internshipId === "undefined" || internshipId === "null") {
          throw new Error("Invalid internship ID");
        }
        return api.post<{ success: boolean; message: string }>(`/internships/${internshipId}/apply`, data);
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["internships", variables.internshipId] });
        queryClient.invalidateQueries({ queryKey: ["user", "applications"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
        queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
        toast.success("Application submitted successfully");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to submit application");
      }
    });
  };

  return {
    getInternships,
    getInternship,
    createInternship,
    updateInternship,
    deleteInternship,
    applyForInternship,
  };
}
