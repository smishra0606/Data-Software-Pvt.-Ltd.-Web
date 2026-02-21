import React from "react";
import ScrollReveal from "./ui/ScrollReveal";
import { Button } from "@/components/ui/button";
import AnimatedText from "./ui/AnimatedText";
import { ArrowRight } from "lucide-react";
import { stats } from "@/constant";

const AboutSec = () => {
  return (
    <section id="about-section" className="section-padding backdrop-blur-sm">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
              About Us
            </span>
            <AnimatedText
              text="We blend creativity with technology to craft exceptional digital experiences"
              className="text-3xl md:text-4xl font-medium mb-6 text-balance"
              tag="h2"
            />
            <p className="text-muted-foreground mb-8">
              DSPL is a creative technology agency that specializes in crafting
              innovative digital solutions. With a team of passionate designers,
              developers, and strategists, we work collaboratively to help
              businesses transform their digital presence and achieve their
              goals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To create innovative digital solutions that solve real
                  problems and drive business growth.
                </p>
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg font-medium mb-2">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be at the forefront of digital innovation, pushing the
                  boundaries of what's possible.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <a href="/about">
                  Learn more about us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/contact">Contact us</a>
              </Button>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={.1}>
            <div className="relative">
              <div className="aspect-video rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2800&q=80"
                  alt="Our team working together"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Stats overlay */}
              <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-background rounded-xl p-6 shadow-lg max-w-xs">
                <div className="grid grid-cols-2 gap-6">
                  {stats.slice(0, 4).map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-semibold text-gradient">
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default AboutSec;
