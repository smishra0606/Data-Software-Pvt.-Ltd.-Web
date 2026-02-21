import {
  Palette,
  Monitor,
  SmartphoneNfc,
  BrainCircuit,
  Search,
  PenTool,
  FileStack,
  ArrowRight,
  CheckCircle,
  Zap,
  LineChart,
  Users,
  Share2,
} from "lucide-react";

import AnimatedText from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { features } from "@/constant";
import SEOHead from "@/seo/SEOHead";

const ServicesPage = () => {
  return (
    <>
      <SEOHead
        title="Our Services | Data Analytics, Web Development, Training | DSPL"
        description="Discover the services offered by DSPL, including data analytics solutions, custom web development, and career-oriented training programs."
        url="https://www.datasoftwareltd.com/services"
      />

      <div className="flex flex-col min-h-screen pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">Services</span>
              <AnimatedText
                text="Comprehensive solutions tailored to your unique challenges"
                className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance"
                tag="h1"
              />
              <p className="text-muted-foreground mb-8 text-lg">
                We offer a full spectrum of digital services designed to help businesses innovate, grow, and succeed in
                today's competitive landscape.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((service, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <a
                    href={`#${service.id}`}
                    className="glass-card p-8 rounded-xl group hover:shadow-md transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                        {service.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-medium mb-3 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 flex-grow">{service.description}</p>

                    <div className="flex items-center text-sm font-medium group/link">
                      <span className="text-primary">Learn more</span>
                      <ArrowRight className="ml-1 h-4 w-4 text-primary transition-transform group-hover/link:translate-x-1" />
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Services Section */}
        <section className="py-16">
          <div className="container-wide">
            {features.map((service, index) => (
              <div
                key={index}
                id={service.id}
                className={`pt-16 pb-20 ${index !== features.length - 1 ? "border-b" : ""}`}
              >
                <ScrollReveal>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-6">
                        {service.icon}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-medium mb-6">{service.title}</h2>
                      <p className="text-muted-foreground mb-8 text-lg">{service.description}</p>

                      <h3 className="text-xl font-medium mb-6">Key Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8">
                        {service.benefits.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Button asChild>
                        <a href="/contact">
                          Get started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>

                    <div>
                      <div className="glass-card p-8 rounded-xl">
                        <h3 className="text-xl font-medium mb-6">Our Approach</h3>
                        <div className="space-y-6">
                          {service.process.map((step, sIndex) => (
                            <div key={sIndex} className="flex">
                              <div className="flex-shrink-0 mr-4">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                                  {sIndex + 1}
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">{step.title}</h4>
                                <p className="text-muted-foreground text-sm">{step.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Why Choose Us
              </span>
              <AnimatedText
                text="The benefits of working with DSPL"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">
                Here's what sets us apart and makes us the ideal partner for your digital journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="h-6 w-6" />,
                  title: "Expertise & Experience",
                  description:
                    "Our team brings years of specialized experience across various industries and technologies.",
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  title: "Client-Centered Approach",
                  description:
                    "We prioritize understanding your specific needs and tailoring our solutions accordingly.",
                },
                {
                  icon: <FileStack className="h-6 w-6" />,
                  title: "End-to-End Services",
                  description:
                    "From strategy to implementation to ongoing support, we handle every aspect of your project.",
                },
                {
                  icon: <LineChart className="h-6 w-6" />,
                  title: "Results-Driven",
                  description: "We focus on delivering measurable results that contribute to your business objectives.",
                },
                {
                  icon: <Share2 className="h-6 w-6" />,
                  title: "Collaborative Process",
                  description: "We work closely with you at every stage, ensuring your vision is realized.",
                },
                {
                  icon: <BrainCircuit className="h-6 w-6" />,
                  title: "Innovative Solutions",
                  description: "We stay at the forefront of technology trends to deliver cutting-edge solutions.",
                },
              ].map((benefit, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="glass-card h-full p-8 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <div className="text-primary">{benefit.icon}</div>
                    </div>
                    <h3 className="text-xl font-medium mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Our Process
              </span>
              <AnimatedText
                text="How we bring your projects to life"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">
                Our proven process ensures we deliver exceptional results that meet your business objectives and exceed
                expectations.
              </p>
            </div>

            <div className="relative mt-20">
              {/* Process timeline */}
              <div className="absolute hidden md:flex md:left-1/2 top-0 h-full w-px bg-border"></div>

              <div className="space-y-16 md:space-y-24">
                {[
                  {
                    title: "Discovery",
                    description:
                      "We start by understanding your business, goals, target audience, and challenges. This phase involves research, interviews, and analysis to ensure we have a solid foundation for your project.",
                  },
                  {
                    title: "Strategy",
                    description:
                      "Based on our findings, we develop a comprehensive strategy that outlines objectives, approaches, timelines, and key performance indicators to guide the project forward.",
                  },
                  {
                    title: "Creation",
                    description:
                      "Our team works collaboratively to bring your project to life, whether it's designing interfaces, developing websites, or implementing marketing campaigns.",
                  },
                  {
                    title: "Testing",
                    description:
                      "We rigorously test all aspects of your project to ensure quality, performance, and user satisfaction before moving to the deployment phase.",
                  },
                  {
                    title: "Launch",
                    description:
                      "We carefully manage the launch process to ensure a smooth transition and address any issues that may arise during the initial deployment.",
                  },
                  {
                    title: "Optimization",
                    description:
                      "After launch, we continuously monitor performance and gather feedback to make improvements and optimize results over time.",
                  },
                ].map((step, index) => (
                  <ScrollReveal key={index}>
                    <div className="relative flex items-start">
                      <div className="absolute hidden md:block left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                      <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-16 text-right" : "md:pl-16 md:ml-auto"}`}>
                        <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                          Step {index + 1}
                        </span>
                        <h3 className="text-2xl font-medium mb-3">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">FAQs</span>
              <AnimatedText
                text="Frequently asked questions"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">Find answers to common questions about our services and process.</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="process">Process</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  {[
                    {
                      question: "What types of clients do you work with?",
                      answer:
                        "We work with businesses of all sizes, from startups to enterprise organizations, across various industries. Our approach is tailored to meet the specific needs and goals of each client, regardless of their size or sector.",
                    },
                    {
                      question: "How long does a typical project take?",
                      answer:
                        "Project timelines vary depending on scope and complexity. A simple website might take 4-8 weeks, while a complex web application or comprehensive marketing campaign could take several months. We provide detailed timelines during the proposal phase.",
                    },
                    {
                      question: "Do you offer ongoing support after project completion?",
                      answer:
                        "Yes, we offer various maintenance and support packages to ensure your digital assets continue to perform optimally after launch. These can include regular updates, performance monitoring, content updates, and technical support.",
                    },
                    {
                      question: "Can you work with our existing team?",
                      answer:
                        "Absolutely. We're happy to collaborate with your in-house team or other partners. We can provide specialized expertise to complement your existing resources or take full ownership of specific aspects of your project.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl">
                      <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="process" className="space-y-6">
                  {[
                    {
                      question: "How do you ensure project quality?",
                      answer:
                        "We maintain high-quality standards through rigorous testing protocols, regular code reviews, design critiques, and a structured QA process. We also implement continuous feedback loops with clients to ensure we're meeting expectations throughout the project.",
                    },
                    {
                      question: "How involved will I need to be in the project?",
                      answer:
                        "Client involvement varies based on preference and project needs. We typically recommend regular check-ins and feedback sessions at key milestones. While your input is valuable, we structure our process to minimize the time demands on your team.",
                    },
                    {
                      question: "What if I want to make changes during the project?",
                      answer:
                        "We understand that requirements can evolve. Our process accommodates changes through a structured change request system. We assess the impact on timeline, scope, and budget, and work with you to implement changes in a way that minimizes disruption.",
                    },
                    {
                      question: "How do you handle project communication?",
                      answer:
                        "We establish clear communication channels from the outset, including regular status meetings, progress reports, and dedicated project management tools. You'll have a primary point of contact who coordinates all aspects of your project.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl">
                      <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="pricing" className="space-y-6">
                  {[
                    {
                      question: "How do you structure your pricing?",
                      answer:
                        "We offer flexible pricing models, including project-based fixed quotes, hourly rates, and retainer arrangements. The most appropriate model depends on your project's nature, scope, and requirements. We provide transparent pricing with no hidden costs.",
                    },
                    {
                      question: "Do you require a deposit to start work?",
                      answer:
                        "Yes, we typically require a deposit (usually 30-50% of the project total) to secure your place in our schedule and cover initial project costs. The remainder is billed either at milestones or upon project completion, depending on the project structure.",
                    },
                    {
                      question: "Do you offer payment plans?",
                      answer:
                        "For larger projects, we can arrange payment schedules aligned with project milestones. This approach distributes the cost over the project timeline while ensuring we meet defined objectives at each stage.",
                    },
                    {
                      question: "What's your policy on additional costs?",
                      answer:
                        "Any potential additional costs are communicated upfront before work begins. If scope changes during the project, we'll provide clear estimates for approval before proceeding with any work that would incur extra charges.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="glass-card p-6 rounded-xl">
                      <h3 className="text-lg font-medium mb-3">{faq.question}</h3>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedText
                text="Ready to start your next project?"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how we can help you achieve your digital goals with our comprehensive suite
                of services.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="secondary">
                  <a href="/contact">
                    Get in touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary-foreground/20 hover:bg-primary-foreground/10"
                >
                  <a href="/projects">View our work</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
