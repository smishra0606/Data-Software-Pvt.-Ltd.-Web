
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  profileImage?: string;
  bio?: string;
  phone?: string;
  preferences?: string;
}

interface GoogleUserData {
  name: string;
  email: string;
  profileImage: string;
  googleId: string;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  googleLogin: (userData: GoogleUserData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Use React Query to verify token on mount
  const { isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
          return null;
        }

        // Set initial user from localStorage
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        // Verify token with backend
        const response = await api.get<{ success: boolean; user: User }>(
          "/auth/me"
        );

        if (response.success) {
          setUser(response.user);
          localStorage.setItem("user", JSON.stringify(response.user));
          return response.user;
        }

        return null;
      } catch (error) {
        // Token validation failed - clear storage
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // Use mutations for login
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return api.post<AuthResponse>("/auth/login", { email, password });
    },
    onSuccess: (response) => {
      if (response.success) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        toast.success("Logged in successfully");
        queryClient.invalidateQueries({ queryKey: ["auth"] });

        // Redirect based on user role
        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error: any) => {
      console.error("Login error:", error);
      
      const errorMessage = error?.response?.data?.message || 
                          "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    },
  });

  // Use mutations for registration
  const registerMutation = useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => {
      return api.post<AuthResponse>("/auth/register", {
        name,
        email,
        password,
      });
    },
    onSuccess: (response) => {
      if (response.success) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        toast.success("Registration successful");
        queryClient.invalidateQueries({ queryKey: ["auth"] });

        // Redirect based on user role
        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
      
      // Extract detailed error message
      const errorMessage = error?.response?.data?.message || 
                          error?.response?.data?.errors?.[0]?.message ||
                          "Registration failed. Please try again.";
      
      // If there are validation errors, show them
      if (error?.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errors = error.response.data.errors;
        errors.forEach((err: any) => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error(errorMessage);
      }
    },
  });

  // Function to update user data in context and localStorage
  const updateUser = (userData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      
      const updatedUser = { ...prevUser, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Use mutations for Google login
  const googleLoginMutation = useMutation({
    mutationFn: async (userData: GoogleUserData) => {
      return api.post<AuthResponse>("/auth/google", userData);
    },
    onSuccess: (response) => {
      if (response.success) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        toast.success("Google sign-in successful");
        queryClient.invalidateQueries({ queryKey: ["auth"] });

        // Redirect based on user role
        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
      toast.error("Google sign-in failed. Please try again.");
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const register = async (name: string, email: string, password: string) => {
    await registerMutation.mutateAsync({ name, email, password });
  };

  const googleLogin = async (userData: GoogleUserData) => {
    await googleLoginMutation.mutateAsync(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    queryClient.clear();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading:
          isLoading || 
          loginMutation.isPending || 
          registerMutation.isPending ||
          googleLoginMutation.isPending,
        isAuthenticated: !!user,
        login,
        register,
        googleLogin,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
