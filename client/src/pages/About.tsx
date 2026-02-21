import { Users, Target, Lightbulb, Rocket, ArrowRight, Award } from "lucide-react";

import AnimatedText from "@/components/ui/AnimatedText";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SEOHead from "@/seo/SEOHead";

// Values data
const values = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Innovation",
    description: "We embrace new technologies and methodologies to push the boundaries of what's possible.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from design to development to client service.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Collaboration",
    description: "We believe in the power of teamwork, both within our team and with our clients.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Impact",
    description: "We measure our success by the tangible results and value we create for our clients.",
  },
];

// Timeline data
const timeline = [
  {
    year: "2021",
    title: "Founded",
    description: "DSPL was established with a vision to create innovative digital solutions.",
  },
  {
    year: "2022",
    title: "Growth Phase",
    description: "Expanded our team and services to meet the growing demand for digital transformation.",
  },
  {
    year: "2023",
    title: "National Expansion",
    description: "Opened our first international office and began serving clients globally.",
  },
  {
    year: "2024",
    title: "Innovation Hub",
    description: "Launched our Innovation Lab to explore emerging technologies and their applications.",
  },
  {
    year: "2025",
    title: "Industry Recognition",
    description: "Received multiple awards for our innovative approach and client success stories.",
  },
];

const About = () => {
  return (
    <>
      {" "}
      <SEOHead
        title="About Data Software Pvt Ltd (DSPL)"
        description="Learn about Data Software Pvt Ltd (DSPL), founded by Udit J. in Bengaluru. Meet the team including developer Yash Tiwari and discover our mission to shape data careers."
        url="https://www.datasoftwareltd.com/about"
      />
      <div className="flex flex-col min-h-screen pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal delay={0.01}>
                <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                  About Us
                </span>
                <AnimatedText
                  text="A creative agency driven by passion and innovation"
                  className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 text-balance"
                  tag="h1"
                />
                <p className="text-muted-foreground mb-6">
                  Founded in 2021, DSPL has grown from a small design studio to a full-service creative technology
                  agency. With a team of passionate experts across design, development, and strategy, we help businesses
                  transform their digital presence and achieve tangible results.
                </p>
                <p className="text-muted-foreground mb-8">
                  Our client-centered approach, technical expertise, and creative vision have established us as a
                  trusted partner for businesses of all sizes, from startups to global enterprises. We're not just
                  service providers; we're collaborators invested in your success.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <a href="/services">
                      Our services
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="/contact">Get in touch</a>
                  </Button>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.01}>
                <div className="relative">
                  <div className="aspect-square rounded-xl overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80"
                      alt="Our team"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Mission and Vision Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Our Purpose
              </span>
              <AnimatedText
                text="Driven by purpose, guided by vision"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
              <ScrollReveal>
                <div className="glass-card h-full p-8 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To create innovative digital solutions that solve real problems, drive business growth, and deliver
                    exceptional user experiences. We're committed to helping our clients navigate the digital landscape
                    and achieve their strategic objectives through a combination of creativity, technology, and
                    strategic thinking.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="glass-card h-full p-8 rounded-xl">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <Lightbulb className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-medium mb-4">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be at the forefront of digital innovation, pushing the boundaries of what's possible in the
                    digital realm. We envision a future where technology seamlessly enhances human experiences, and we
                    aim to lead the way in creating those meaningful connections between brands and their audiences.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Our Values
              </span>
              <AnimatedText
                text="The principles that guide everything we do"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">
                Our core values reflect who we are as a company and how we approach our work with clients and each
                other.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="flex gap-6 p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                      <div className="text-primary">{value.icon}</div>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section-padding">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Our Journey
              </span>
              <AnimatedText
                text="The evolution of DSPL over the years"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">
                From our humble beginnings to where we are today, our journey has been defined by growth, innovation,
                and impact.
              </p>
            </div>

            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-px bg-border"></div>

              <div className="space-y-12 relative">
                {timeline.map((item, index) => (
                  <ScrollReveal key={index} delay={index * 0.1}>
                    <div
                      className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} md:gap-8`}
                    >
                      <div className="md:w-1/2 flex md:justify-end items-start">
                        <div
                          className={`bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium mb-4 md:mb-0 inline-block ${
                            index % 2 === 0 ? "md:ml-auto" : ""
                          }`}
                        >
                          {item.year}
                        </div>
                      </div>

                      {/* Timeline dot */}
                      <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>

                      <div className="md:w-1/2 pl-8 md:pl-0">
                        <div className={`glass-card p-6 rounded-xl ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                          <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
                Recognition
              </span>
              <AnimatedText
                text="Awards and achievements"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-muted-foreground">
                Our work has been recognized by industry leaders and organizations for its innovation, impact, and
                excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  year: "2025",
                  award: "Innovation Excellence Award",
                  organization: "Digital Innovation Association",
                },
                {
                  year: "2025",
                  award: "Best User Experience",
                  organization: "UX Design Awards",
                },
                {
                  year: "2024",
                  award: "Top Creative Agency",
                  organization: "Creative Industry Network",
                },
                {
                  year: "2023",
                  award: "Best Mobile Application",
                  organization: "Mobile Excellence Awards",
                },
                {
                  year: "2021",
                  award: "Rising Star Agency",
                  organization: "Agency Growth Awards",
                },
                {
                  year: "2021",
                  award: "Best E-commerce Solution",
                  organization: "E-commerce Excellence",
                },
              ].map((achievement, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center mb-4">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm font-medium">{achievement.year}</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">{achievement.award}</h3>
                    <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding bg-primary text-primary-foreground">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto">
              <AnimatedText
                text="Ready to work with us?"
                className="text-3xl md:text-4xl font-medium mb-6 text-balance"
                tag="h2"
              />
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Let's collaborate to create innovative digital solutions that will transform your business and elevate
                your brand.
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
                  className="border-primary-foreground text-black dark:text-white hover:bg-primary-foreground/10"
                >
                  <a href="/services">Our services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
