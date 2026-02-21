import { clients } from "@/constant";
import React from "react";
import ScrollReveal from "./ui/ScrollReveal";

const ClientSec = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container-wide">
        <div className="text-center mb-10">
          <span className="text-sm font-medium text-muted-foreground mb-4 block">
            Trusted by industry leaders
          </span>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {clients.map((client, index) => (
            <ScrollReveal key={index} delay={index * .1}>
              <img
                src={client.logo}
                alt={client.name}
                loading="lazy"
                decoding="async"
                className="h-8 md:h-10 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientSec;
