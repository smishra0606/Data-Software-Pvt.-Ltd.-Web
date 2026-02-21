import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      // 1. Try all common storage keys to be safe
      localStorage.setItem("token", token);
      localStorage.setItem("userToken", token);
      localStorage.setItem("authToken", token);
      
      // 2. Some apps require a 'user' object to consider someone 'logged in'
      // We'll put a placeholder; your 'getMe' API call will update this later
      const basicUser = JSON.stringify({ isAuthenticated: true });
      localStorage.setItem("user", basicUser);
      localStorage.setItem("authUser", basicUser);

      // 3. Give the browser a tiny moment to breathe
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 100);
      
    } else {
      window.location.href = "/login";
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Verifying session... please wait.</p>
    </div>
  );
};

export default AuthSuccess;
