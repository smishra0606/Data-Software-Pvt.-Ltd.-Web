import React from "react";
import AnimatedText from "./ui/AnimatedText";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { featuredProjects } from "@/constant";
import ScrollReveal from "./ui/ScrollReveal";
import ProjectCard from "./ProjectCard";

const ProjectSec = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between mb-16">
          <div className="max-w-2xl mb-8 lg:mb-0">
            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
              Featured Projects
            </span>
            <AnimatedText
              text="Innovative solutions for forward-thinking clients"
              className="text-3xl md:text-4xl font-medium mb-6 text-balance"
              tag="h2"
            />
            <p className="text-muted-foreground">
              Explore our portfolio of successful projects that showcase our
              expertise in creating impactful digital experiences.
            </p>
          </div>
          <Button variant="outline" asChild>
            <a href="/projects" className="flex items-center">
              View all projects
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.slice(0, 3).map((project, index) => (
            <ScrollReveal
              className="!mix-blend-normal"
              key={index}
              delay={index * 0.1}
            >
              <ProjectCard
                title={project.title}
                category={project.category}
                imageUrl={project.imageUrl}
                description={project.description}
                link={project?.link}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSec;
