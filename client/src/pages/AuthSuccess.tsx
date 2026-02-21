import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // 1. Clear everything first to be safe
      localStorage.clear(); 
      
      // 2. Set the new token
      localStorage.setItem("token", token);
      
      // 3. FORCE a hard reload to the dashboard
      // This breaks the "redirect loop" by restarting the React app
      window.location.assign("/dashboard");
    } else {
      window.location.assign("/login");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold">Redirecting to Dashboard...</h2>
      </div>
    </div>
  );
};

export default AuthSuccess;
