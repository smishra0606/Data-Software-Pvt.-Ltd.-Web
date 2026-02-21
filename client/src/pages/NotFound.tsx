
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [previousPath, setPreviousPath] = useState("/");

  useEffect(() => {
    // Get the previous path from history state or default to homepage
    const from = location.state?.from || "/";
    setPreviousPath(from);
    
    // Log the 404 error
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Start a countdown to auto-redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate(from);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, location.state, navigate]);

  const handleGoBack = () => navigate(previousPath);
  const handleGoHome = () => navigate("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/50">
      <div className="relative max-w-md w-full mx-auto p-8">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/10 opacity-70 blur-xl rounded-lg" />
        <div className="absolute -inset-0.5 -z-10 bg-gradient-to-r from-primary/30 to-secondary/30 opacity-30 blur rounded-lg" />
        
        <div className="bg-card/80 backdrop-blur-sm shadow-lg rounded-lg border border-border/40 p-8 text-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-9xl font-bold text-primary/80">404</h1>
              <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
              <p className="text-muted-foreground">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>
            
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            
            <div className="text-sm text-muted-foreground">
              <p>Redirecting you {previousPath === "/" ? "home" : "back"} in <span className="font-medium text-primary">{countdown}</span> seconds...</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={handleGoBack}
              >
                <ArrowLeft size={16} />
                Go Back
              </Button>
              
              <Button 
                onClick={handleGoHome}
                className="gap-2"
              >
                <Home size={16} />
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
