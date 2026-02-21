import { useState } from "react";
import { ArrowRight } from "lucide-react";

import AnimatedText from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { featuredProjects } from "@/constant";
import SEOHead from "@/seo/SEOHead";

// Project categories
const categories = ["All", "Web Development", "Mobile", "UI/UX Design", "Branding", "E-commerce"];

const ProjectsPage = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All" ? featuredProjects : featuredProjects.filter((project) => project.category === filter);

  return (
    <>
      <SEOHead
        title="Our Projects | Web, Mobile, UI/UX, Branding & E-commerce | DSPL"
        description="Explore a diverse portfolio of DSPL projects including web development, mobile apps, UI/UX design, branding, and e-commerce solutions."
        url="https://www.datasoftwareltd.com/projects"
      />

      <div className="flex flex-col min-h-screen pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Our Projects
              </span>
              <AnimatedText
                text="Innovative solutions for forward-thinking clients"
                className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance"
                tag="h1"
              />
              <p className="text-muted-foreground mb-8 text-lg">
                Explore our portfolio of successful projects that showcase our expertise in creating impactful digital
                experiences.
              </p>
            </div>

            {/* Categories Filter */}
            <div className="flex flex-wrap justify-center gap-3 mt-12 mb-16">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={filter === category ? "default" : "outline"}
                  className="rounded-full"
                  onClick={() => setFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredProjects.map((project, index) => (
                <ScrollReveal key={index} delay={(index % 3) * 0.1}>
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

            {/* More Projects Button */}
            {filter === "All" && filteredProjects.length > 6 && (
              <div className="text-center mt-8">
                <a href="https://github.com/DATASOFTWAREPVTLTD">
                  <Button variant="outline">
                    view more
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Featured Case Study */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Case Study
              </span>
              <AnimatedText
                text="Quantum Finance Dashboard: Transforming financial data visualization"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">
                A deep dive into one of our most impactful projects and the results it delivered.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80"
                    alt="Quantum Finance Dashboard"
                    className="w-full h-auto"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {["Finance", "Dashboard", "AI", "Web Application"].map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">The Challenge</h3>
                    <p className="text-muted-foreground mt-2">
                      FinTech Solutions needed a powerful yet intuitive dashboard to help their clients visualize
                      complex financial data, identify trends, and make informed decisions. The existing solution was
                      difficult to navigate and lacked modern predictive capabilities.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Our Approach</h3>
                    <p className="text-muted-foreground mt-2">
                      We conducted extensive user research to understand the needs of financial analysts and
                      decision-makers. Our team designed a clean, information-rich interface and implemented AI-driven
                      analytics to provide actionable insights from raw financial data.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">The Results</h3>
                    <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                      <li>42% increase in user engagement with financial data</li>
                      <li>35% reduction in time spent analyzing reports</li>
                      <li>98% user satisfaction rating post-implementation</li>
                      <li>28% increase in client retention for FinTech Solutions</li>
                    </ul>
                  </div>

                  <Button asChild>
                    <a href="#">
                      View full case study
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Testimonials
              </span>
              <AnimatedText
                text="What our clients say about our work"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">
                Don't take our word for it—hear from the clients whose digital presence we've transformed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ScrollReveal>
                <blockquote className="glass-card p-8 rounded-xl">
                  <div className="text-4xl text-primary/30 mb-4">"</div>
                  <p className="text-foreground/80 mb-6">
                    The team at DSPL delivered beyond our expectations. Their design approach was innovative yet
                    intuitive, and the final product has significantly improved our user engagement metrics. They didn't
                    just build what we asked for; they took the time to understand our business goals and delivered a
                    solution that truly addresses our needs.
                  </p>
                  <footer className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Client"
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium">David Cooper</p>
                      <p className="text-sm text-muted-foreground">CEO, FinTech Solutions Inc.</p>
                    </div>
                  </footer>
                </blockquote>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <blockquote className="glass-card p-8 rounded-xl">
                  <div className="text-4xl text-primary/30 mb-4">"</div>
                  <p className="text-foreground/80 mb-6">
                    Working with DSPL on our mobile app was a game-changer. Their user-centered design approach and
                    technical expertise resulted in an app that our customers love. The attention to detail and
                    commitment to quality are evident in every aspect of the project, from the initial concepts to the
                    final implementation.
                  </p>
                  <footer className="flex items-center">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Client"
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium">Sarah Chen</p>
                      <p className="text-sm text-muted-foreground">Product Manager, Vitality Health Group</p>
                    </div>
                  </footer>
                </blockquote>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Project Inquiries CTA */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedText
                text="Have a project in mind?"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can help you achieve your digital goals with our expertise in design, development,
                and strategy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="secondary">
                  <a href="/contact">
                    Start a project
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  <a href="/services">Explore our services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProjectsPage;
