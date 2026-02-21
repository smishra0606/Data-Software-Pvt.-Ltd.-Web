
import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { queryClient } from "@/lib/reactQuery";
import { toast } from "sonner";
import { User } from "@/context/AuthContext";

export function useAdminUsers() {
  // Get all users (admin only)
  const getUsers = () => {
    return useQuery({
      queryKey: ["admin", "users"],
      queryFn: async () => {
        try {
          const response = await api.get<{ success: boolean; count: number; data: User[] }>(
            "/users"
          );
          return response;
        } catch (error) {
          console.error("Error fetching users:", error);
          throw error;
        }
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get user by ID (admin only)
  const getUserById = (userId: string) => {
    return useQuery({
      queryKey: ["admin", "user", userId],
      queryFn: async () => {
        try {
          const response = await api.get<{ success: boolean; data: User }>(
            `/users/${userId}`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching user ${userId}:`, error);
          throw error;
        }
      },
      enabled: !!userId,
    });
  };

  return {
    getUsers,
    getUserById
  };
}
