import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token); // Store the token
      navigate("/dashboard"); // Redirect to your protected dashboard
    } else {
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Completing login, please wait...</p>
    </div>
  );
};

export default AuthSuccess;
