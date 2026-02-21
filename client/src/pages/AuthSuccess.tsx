import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // 1. Save the token exactly where your AuthContext looks for it
      localStorage.setItem("token", token);
      
      toast.success("Authentication successful!");

      // 2. Small delay to ensure localStorage is registered 
      // then redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard"; 
        // Using window.location.href instead of navigate 
        // forces the app to re-read the token on load.
      }, 500);
      
    } else {
      toast.error("Google login failed. Please try again.");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mb-4"></div>
      <p className="text-lg font-medium">Finalizing your login...</p>
    </div>
  );
};

export default AuthSuccess;
