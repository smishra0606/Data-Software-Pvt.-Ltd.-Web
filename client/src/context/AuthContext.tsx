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

        if (!token) {
          return null;
        }

        // 1. Set initial local user if available
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // 2. Verify token with backend - REMOVED leading slash
        const response = await api.get<{ success: boolean; user: User }>(
          "auth/me" 
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

  // Use mutations for login - REMOVED leading slash
  const loginMutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return api.post<AuthResponse>("auth/login", { email, password });
    },
    onSuccess: (response) => {
      if (response.success) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        toast.success("Logged in successfully");
        queryClient.invalidateQueries({ queryKey: ["auth"] });

        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 
                          "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    },
  });

  // Use mutations for registration - REMOVED leading slash
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
      return api.post<AuthResponse>("auth/register", {
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

        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 
                          "Registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });

  const updateUser = (userData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const updatedUser = { ...prevUser, ...userData };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Google Login mutation - REMOVED leading slash
  const googleLoginMutation = useMutation({
    mutationFn: async (userData: GoogleUserData) => {
      return api.post<AuthResponse>("auth/google", userData);
    },
    onSuccess: (response) => {
      if (response.success) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("token", response.token);
        toast.success("Google sign-in successful");
        queryClient.invalidateQueries({ queryKey: ["auth"] });

        if (response.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    },
    onError: (error) => {
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
