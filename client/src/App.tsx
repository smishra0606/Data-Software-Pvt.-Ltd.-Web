
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "@/context/ThemeProvider";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { queryClient } from "@/lib/reactQuery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEO/SEOHead";
import { OrganizationStructuredData } from "@/components/SEO/StructuredData";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import NotFound from "./pages/NotFound";
// import Courses from "./pages/Course/Courses";
// import CourseDetails from "./pages/Course/CourseDetails";
import AdminPanel from "./pages/admin/AdminPanel";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/User/UserDashboard";
import EnrollmentManagement from "./components/admin/EnrollmentManagement";
import InternshipForm from "./components/admin/InternshipForm";
import Internships from "./pages/Intership/Internships";
import InternshipDetails from "./pages/Intership/InternshipDetails";
import InternshipManagement from "./components/admin/InternshipManagement";
import EditInternshipForm from "./components/admin/EditInternshipForm";
import UserProfile from "./user/UserProfile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CareerManagement from "./components/admin/CareerManagement";
import CareerForm from "./components/admin/CareerForm";
import EditCareerForm from "./components/admin/EditCareerForm";
import CareerApplicants from "./components/admin/CareerApplicants";
import CareerDetails from "./pages/Career/CareerDetails";
import Careers from "./pages/Career/Careers";
import ContactManagement from "./components/admin/ContactManagement";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const NotFoundWrapper = () => {
  const location = useLocation();
  return <NotFound />;
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      {/* <Route path="/courses" element={<Courses />} /> */}
      {/* <Route path="/courses/:courseId" element={<CourseDetails />} /> */}
      <Route path="/internships" element={<Internships />} />
      <Route path="/internships/:id" element={<InternshipDetails />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:id" element={<CareerDetails />} />

      <Route
        path="/admin/courses"
        element={
          <AdminRoute>
            <AdminPanel />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/internships"
        element={
          <AdminRoute>
            <InternshipManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/internships/create"
        element={
          <AdminRoute>
            <InternshipForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/internships/edit/:id"
        element={
          <AdminRoute>
            <EditInternshipForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/enrollments"
        element={
          <AdminRoute>
            <EnrollmentManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/careers"
        element={
          <AdminRoute>
            <CareerManagement />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/careers/create"
        element={
          <AdminRoute>
            <CareerForm mode="create" />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/careers/edit/:id"
        element={
          <AdminRoute>
            <EditCareerForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/careers/:id/applicants"
        element={
          <AdminRoute>
            <CareerApplicants />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/contacts"
        element={
          <AdminRoute>
            <ContactManagement />
          </AdminRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<NotFoundWrapper />} />
    </Routes>
  );
};

const App = () => (
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <TooltipProvider>
            {/* Global SEO */}
            <SEOHead />
            <OrganizationStructuredData 
              sameAs={[
                'https://facebook.com/datasoftware',
                'https://twitter.com/datasoftware',
                'https://linkedin.com/company/datasoftware'
              ]}
            />
            
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <AppRoutes />
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
