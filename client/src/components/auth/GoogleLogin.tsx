import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc"; // You may need to: npm install react-icons

interface GoogleLoginProps {
  text?: string;
  disabled?: boolean;
}

const GoogleLoginButton = ({
  text = "Sign in with Google",
  disabled = false,
}: GoogleLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    try {
      // 1. We redirect the user to YOUR backend login route
      // 2. This route triggers the Passport.js / Google Auth flow
      // 3. This bypasses the CORS 'Access-Control-Allow-Origin' error
      window.location.href = "https://data-software-pvt-ltd-web.onrender.com/api/auth/google";
    } catch (error) {
      console.error("Google redirect error:", error);
      toast.error("Could not reach the authentication server");
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full py-6 flex items-center justify-center gap-2"
      onClick={handleGoogleLogin}
      disabled={disabled || isLoading}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></span>
      ) : (
        <FcGoogle className="h-5 w-5" />
      )}
      {text}
    </Button>
  );
};

export default GoogleLoginButton;
