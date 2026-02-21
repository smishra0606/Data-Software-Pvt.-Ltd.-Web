import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  ArrowUpRight,
  LogIn,
  UserPlus,
  User,
  LogOut,
  User2Icon,
  LayoutDashboard,
  BookKey,
  InboxIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { mainRoutes, projectRoutes, serviceRoutes } from "@/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={cn(
        "fixed global-padding xl:px-24 px-4 top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-amber-500/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className=" flex items-center justify-between h-16 md:h-20 ">
        <Link
          to="/"
          className="font-display text-2xl gap-2 font-bold flex items-center"
        >
          <img 
            src="/logo.png" 
            alt="DSPL Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
            DSPL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-3">
          <NavigationMenu>
            <NavigationMenuList className="gap-4">
              {mainRoutes.map((route) => (
                <NavigationMenuItem key={route.path}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={route.path}
                      className={cn(
                        "text-sm font-medium hover:text-amber-500 transition-colors",
                        location.pathname === route.path &&
                          "text-amber-500 font-semibold"
                      )}
                    >
                      {route.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuLink asChild className="">
                  <Link
                    to={"/projects"}
                    className={cn(
                      "text-sm font-medium hover:text-amber-500 transition-colors",
                      location.pathname === "/projects" &&
                        "text-amber-500 font-semibold"
                    )}
                  >
                    Projects
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/contact"
                    className="text-sm font-medium hover:text-amber-500 transition"
                  >
                    Contact
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className="group rounded-full px-3 py-1">
                  Services
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-background/95 absolute left-0 backdrop-blur-xl border border-amber-500/10 shadow-xl rounded-lg p-3">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[400px] w-[55vw] overflow-y-auto">
                    {serviceRoutes.map((service) => (
                      <a
                        key={service.path}
                        href={service.path}
                        className="flex p-3 rounded-lg hover:bg-amber-500/10 transition"
                      >
                        <div className="flex gap-4 items-start">
                          <div className="p-2 rounded-md bg-amber-500/10 text-amber-500">
                            {service.icon}
                          </div>
                          <div>
                            <p className="text-base font-medium">
                              {service.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <div className="mt-3 border-t pt-3 text-center">
                    <Link
                      to="/services"
                      className="text-sm text-amber-500 hover:underline"
                    >
                      View all services
                      <ArrowUpRight className="inline-block h-4 w-4" />
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4 border-l pl-4 border-amber-500/10">
            <ThemeToggle />

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.name?.split(" ")[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2 text-sm font-medium">
                    {user?.name}
                  </div>
                  <div className="px-3 py-1 text-xs text-muted-foreground">
                    {user?.email}
                  </div>
                  <DropdownMenuSeparator />
                  {user?.role === "user" && (
                    <DropdownMenuItem asChild>
                      <Link
                        to={"/profile"}
                        className="py-2 text-sm flex items-center justify-start gap-2 hover:text-amber-500 transition"
                      >
                        <User2Icon className="w-3 h-3" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem asChild>
                    <Link
                      to={
                        user?.role === "admin"
                          ? "/admin/dashboard"
                          : "/dashboard"
                      }
                      className="flex items-center justify-start gap-2"
                    >
                      <LayoutDashboard className="w-3 h-3" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>

                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/courses">
                          <BookKey className="w-3 h-3 mr-1" /> Manage Courses
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/admin/internships">
                          <InboxIcon className="w-3 h-3 mr-1" /> Manage
                          Internships
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center xl:hidden gap-4">
          <ThemeToggle />

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link
                    to={
                      user?.role === "admin" ? "/admin/dashboard" : "/dashboard"
                    }
                    className="block py-2 text-sm hover:text-amber-500 transition"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {user?.role === "user" && (
                  <DropdownMenuItem asChild>
                    <Link
                      to={"/profile"}
                      className="block py-2 text-sm hover:text-amber-500 transition"
                    >
                      <User2Icon className="w-4 h-4 mr-1" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" asChild size="icon" className="sm:hidden">
              <Link to="/login">
                <LogIn className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-background p-6">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Main navigation links and user actions</SheetDescription>
              </VisuallyHidden>
              <nav className="space-y-4">
                {mainRoutes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    className={cn(
                      "block py-2 text-sm font-medium hover:text-amber-500 transition",
                      location.pathname === route.path &&
                        "text-amber-500 font-semibold"
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
                <Link
                  to="/services"
                  className="block py-2 text-sm hover:text-amber-500 transition"
                >
                  Services
                </Link>
                <Link
                  to="/projects"
                  className="block py-2 text-sm hover:text-amber-500 transition"
                >
                  Projects
                </Link>
                <Link
                  to="/contact"
                  className="block py-2 text-sm hover:text-amber-500 transition"
                >
                  Contact
                </Link>
              </nav>

              {!isAuthenticated && (
                <div className="mt-6">
                  <Button asChild>
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
