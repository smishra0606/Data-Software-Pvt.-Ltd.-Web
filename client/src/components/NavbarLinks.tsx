
import { Link } from "react-router-dom";
import { LogIn, UserPlus, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const NavbarLinks = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex items-center space-x-4">
      <Link 
        to="/courses"
        className="text-sm font-medium hover:text-amber-500 transition-colors"
      >
        Courses
      </Link>
      <Link 
        to="/internships"
        className="text-sm font-medium hover:text-amber-500 transition-colors"
      >
        <Briefcase className="h-4 w-4 inline mr-1" />
        Internships
      </Link>
      
      {isAuthenticated ? (
        <Link 
          to={user?.role === "admin" ? "/admin/dashboard" : "/dashboard"}
          className="text-sm font-medium hover:text-amber-500 transition-colors"
        >
          Dashboard
        </Link>
      ) : (
        <>
          <Button variant="ghost" asChild className="gap-1">
            <Link to="/login">
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </Button>
          <Button asChild>
            <Link to="/register">
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Register</span>
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export default NavbarLinks;
