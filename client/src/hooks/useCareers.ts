import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { Career } from "@/types/career";

export const useCareers = () => {
  const queryClient = useQueryClient();

  const getCareers = (filters = {}) => {
    return useQuery({
      queryKey: ["careers", filters],
      queryFn: async () => {
        const queryParams = new URLSearchParams();

        // Add filters to query params
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value.toString());
        });

        const queryString = queryParams.toString()
          ? `?${queryParams.toString()}`
          : "";
        // new changes
        console.log(`Fetching careers with query string: ${queryString}`);
        const response: { data: Career } = await api.get(
          `/careers${queryString}`
        );
        console.log(`Fetched careers data:`, response.data);

        return response.data;
      },
    });
  };

  const getCareerById = (id: string | undefined) => {
    return useQuery({
      queryKey: ["career", id],
      queryFn: async () => {
        if (!id) throw new Error("Career ID is required");

        // Clean the ID to remove any extra quotes
        const cleanId = id.toString().replace(/^["'](.*)["']$/, "$1");

        const response = await api.get(`/careers/${cleanId}`);
        return response.data;
      },
      enabled: !!id,
    });
  };

  const createCareer = () => {
    return useMutation({
      mutationFn: async (careerData) => {
        const response = await api.post("/careers", careerData);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["careers"] });
        toast.success("Career position created successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to create career position");
      },
    });
  };

  const updateCareer = () => {
    return useMutation({
      mutationFn: async ({ id, data }) => {
        const response = await api.put(`/careers/${id}`, data);
        return response.data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: ["careers"] });
        queryClient.invalidateQueries({ queryKey: ["career", variables.id] });
        toast.success("Career position updated successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update career position");
      },
    });
  };

  const deleteCareer = () => {
    return useMutation({
      mutationFn: async (id: string) => {
        const response = await api.delete(`/careers/${id}`);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["careers"] });
        toast.success("Career position deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete career position");
      },
    });
  };

  const applyToCareer = () => {
    return useMutation({
      mutationFn: async ({
        careerId,
        data,
      }: {
        careerId: string;
        data: any;
      }) => {
        const response = await api.post(`/careers/${careerId}/apply`, data);
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["careers"] });
        queryClient.invalidateQueries({ queryKey: ["user-dashboard"] });
        toast.success("Application submitted successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to submit application");
      },
    });
  };

  const getCareerApplicants = (careerId) => {
    return useQuery({
      queryKey: ["career-applicants", careerId],
      queryFn: async () => {
        if (!careerId) throw new Error("Career ID is required");
        const response = await api.get(`/careers/${careerId}/applicants`);
        return response.data;
      },
      enabled: !!careerId,
    });
  };

  const updateApplicantStatus = () => {
    return useMutation({
      mutationFn: async ({ careerId, applicantId, status }: any) => {
        const response = await api.put(
          `/careers/${careerId}/applicants/${applicantId}`,
          { status }
        );
        return response.data;
      },
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["career-applicants", variables.careerId],
        });
        toast.success("Applicant status updated successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update applicant status");
      },
    });
  };

  return {
    getCareers,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer,
    applyToCareer,
    getCareerApplicants,
    updateApplicantStatus,
  };
};
