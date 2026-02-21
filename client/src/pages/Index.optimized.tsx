// Performance Optimized Index Page with Lazy Loading
import { lazy, Suspense } from "react";

// Lazy load heavy components
const CanvasPage = lazy(() => import("@/components/Canvas"));
const Hero = lazy(() => import("@/components/Hero"));
const AboutSec = lazy(() => import("@/components/AboutSec"));
const ClientSec = lazy(() => import("@/components/ClientSec"));
const ServicesSec = lazy(() => import("@/components/ServicesSec"));
const ProjectSec = lazy(() => import("@/components/ProjectSec"));
const Process = lazy(() => import("@/components/Process"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const CTAsec = lazy(() => import("@/components/CTAsec"));

// Loading fallback component
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const Index = () => {
  return (
    <div className="w-screen h-full overflow-hidden">
      {/* Canvas - Load first but in suspense */}
      <Suspense fallback={<div className="w-full h-[100vh] fixed top-0 -z-10" />}>
        <CanvasPage />
      </Suspense>

      {/* Hero Section - Critical, load immediately */}
      <Suspense fallback={<div className="h-svh" />}>
        <Hero />
      </Suspense>

      {/* Below-the-fold sections - Lazy load */}
      <Suspense fallback={<SectionLoader />}>
        <AboutSec />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ClientSec />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ServicesSec />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <ProjectSec />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Process />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <Testimonials />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <CTAsec />
      </Suspense>
    </div>
  );
};

export default Index;
