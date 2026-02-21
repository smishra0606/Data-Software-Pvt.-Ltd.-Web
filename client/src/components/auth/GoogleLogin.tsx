import { useState } from "react";
import { KeyRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";

interface GoogleLoginProps {
  text?: string;
  disabled?: boolean;
}

const GoogleLoginButton = ({
  text = "Sign in with Google",
  disabled = false,
}: GoogleLoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { googleLogin } = useAuth();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        setIsLoading(true);
        try {
          const decodedToken = parseJwt(credentialResponse.credential);
          await googleLogin({
            name: decodedToken.name,
            email: decodedToken.email,
            profileImage: decodedToken.picture,
            googleId: decodedToken.sub,
          });

          toast.success("Google sign-in successful!");
        } catch (error) {
          console.error("Google authentication error:", error);
          toast.error("Google authentication failed");
        } finally {
          setIsLoading(false);
        }
      }}
      onError={() => {
        toast.error("Google sign-in failed. Please try again.");
      }}
    />
  );
};

// ✅ Helper function to decode JWT token from Google
const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default GoogleLoginButton;
