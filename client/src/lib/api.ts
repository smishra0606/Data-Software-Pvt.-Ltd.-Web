
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// Create an axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to inject token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { response } = error;

    // Handle unauthorized errors and redirect to login
    if (response?.status === 401) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
      toast.error("Session expired. Please log in again.");
    }

    // Don't show error toast for aborted requests (happens during normal navigation)
    if (error.message === 'canceled') {
      return Promise.reject(error);
    }

    // Show error message
    const errorMessage =
      (response?.data as any)?.message ||
      error.message ||
      "Network error occurred";
    
    // Only show toast for non-aborted requests
    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

// Generic API request function
export async function fetchApi<T>(
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<T> {
  try {
    // Check for undefined in URL - prevent malformed requests
    if (endpoint.includes('undefined') || endpoint.includes('null')) {
      console.error(`API request contains undefined/null values: ${endpoint}`);
      throw new Error('Invalid request URL: contains undefined or null values');
    }

    const response: AxiosResponse<T> = await axiosInstance({
      url: endpoint,
      ...options,
    });

    return response.data;
  } catch (error) {
    console.error("API request failed:", endpoint, error);
    throw error;
  }
}

// Helper methods for common API operations
export const api = {
  get: <T>(endpoint: string, options?: AxiosRequestConfig) =>
    fetchApi<T>(endpoint, { method: "GET", ...options }),

  post: <T>(endpoint: string, data: unknown, options?: AxiosRequestConfig) =>
    fetchApi<T>(endpoint, {
      method: "POST",
      data,
      ...options,
    }),

  put: <T>(endpoint: string, data: unknown, options?: AxiosRequestConfig) =>
    fetchApi<T>(endpoint, {
      method: "PUT",
      data,
      ...options,
    }),

  patch: <T>(endpoint: string, data: unknown, options?: AxiosRequestConfig) =>
    fetchApi<T>(endpoint, {
      method: "PATCH",
      data,
      ...options,
    }),

  delete: <T>(endpoint: string, options?: AxiosRequestConfig) =>
    fetchApi<T>(endpoint, { method: "DELETE", ...options }),
};
