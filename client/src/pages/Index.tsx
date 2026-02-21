import Hero from "@/components/Hero";
import AboutSec from "@/components/AboutSec";
import ClientSec from "@/components/ClientSec";
import ServicesSec from "@/components/ServicesSec";
import ProjectSec from "@/components/ProjectSec";
import Testimonials from "@/components/Testimonials";
import CTAsec from "@/components/CTAsec";
import CanvasPage from "@/components/Canvas";
import Process from "@/components/Process";

const Index = () => {
  return (
    <div className="w-screen h-full overflow-hidden">
      {/* Hero Section */}
      <CanvasPage />

      <Hero />

      {/* About Section */}
      <AboutSec />

      {/* Clients Section */}
      <ClientSec />

      {/* Services Section */}
      <ServicesSec />

      {/* Projects Section */}
      <ProjectSec />

      {/* Process Section */}
      <Process />

      {/* Testimonials Section */}
      <Testimonials />

      {/* CTA Section */}
      <CTAsec />
    </div>
  );
};

export default Index;
