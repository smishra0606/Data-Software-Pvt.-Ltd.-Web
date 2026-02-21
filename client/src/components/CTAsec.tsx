import React from "react";
import AnimatedText from "./ui/AnimatedText";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const CTAsec = () => {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto">
          <AnimatedText
            text="Ready to transform your digital presence?"
            className="text-3xl md:text-4xl font-medium mb-6 text-balance"
            tag="h2"
          />
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's collaborate to create innovative digital solutions that drive
            growth and deliver exceptional results for your business.
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
              className="dark:border-white/80 dark:text-white text-black hover:bg-primary-foreground/10"
            >
              <a href="/projects">View our work</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTAsec;
