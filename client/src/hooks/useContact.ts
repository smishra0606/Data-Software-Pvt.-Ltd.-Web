
import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  message: string;
};

type ContactSubmission = {
  _id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: "new" | "read" | "responded";
  createdAt: string;
};

export const useContact = () => {
  const submitContactForm = useMutation({
    mutationFn: async (formData: ContactFormData) => {
      const response = await api.post("/contact", formData);
      return response;
    },
    onSuccess: (response: any) => {
      const { data } = response;
      // Show different toast messages based on email delivery status
      if (data && !data.emailsDelivered) {
        toast.success("Message received", {
          description: "Your message was saved but email notifications couldn't be sent due to server configuration.",
        });
      } else {
        toast.success("Message sent successfully", {
          description: "We'll get back to you as soon as possible.",
        });
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send message");
    },
  });

  // Query to fetch contact submissions (admin only)
  const getContactSubmissions = useQuery({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      const response = await api.get("/contact");
      return response.data;
    },
    enabled: false, // Don't fetch automatically
  });

  // Mutation to update contact status
  const updateContactStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "new" | "read" | "responded" }) => {
      const response = await api.put(`/contact/${id}/status`, { status });
      return response;
    },
    onSuccess: () => {
      toast.success("Status updated successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update status");
    },
  });

  return {
    submitContactForm,
    getContactSubmissions,
    updateContactStatus,
  };
};
