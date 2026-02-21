import React from "react";
import ScrollReveal from "./ui/ScrollReveal";
import AnimatedText from "./ui/AnimatedText";
import { testimonials } from "@/constant";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const Testimonials = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Testimonials
          </span>
          <AnimatedText
            text="What our clients say about us"
            className="text-3xl md:text-4xl font-medium mb-6 text-balance"
            tag="h2"
          />
          <p className="text-muted-foreground">
            Don't take our word for it—hear from the clients we've helped
            transform their digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="h-full p-6 rounded-xl bg-transparent border-white/20 flex flex-col shadow-md overflow-hidden">
                <CardHeader className="text-4xl text-primary/30 ">"</CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/80 mb-6">
                    {testimonial.content}
                  </p>
                </CardContent>
                <CardContent className="flex items-center">
                  <div className="mr-4 text-primary">{testimonial.avatar}</div>
                  <div>
                    <CardTitle className="font-medium">
                      {testimonial.author}
                    </CardTitle>
                    <p className="text-sm  text-muted-foreground">
                      {testimonial.position}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
