import React from "react";
import ServiceCard from "./ServiceCard";
import ScrollReveal from "./ui/ScrollReveal";
import { features } from "@/constant";
import AnimatedText from "./ui/AnimatedText";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const ServicesSec = () => {
  return (
    <section className="section-padding ">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Our Services
          </span>
          <AnimatedText
            text="Comprehensive solutions for modern digital challenges"
            className="text-3xl md:text-4xl font-medium mb-6 text-balance"
            tag="h2"
          />
          <p className="text-muted-foreground">
            We offer a full spectrum of digital services to help businesses
            innovate, grow, and succeed in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8">
          {features.map((service, index) => (
            <ScrollReveal className="" key={index} delay={index * 0.01}>
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                id={service.id}
              />
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild>
            <a href="/services">
              View all services
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSec;
