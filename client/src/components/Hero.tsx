import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import ScrollReveal from "./ui/ScrollReveal";
import { ButtonGrad } from "./ui/buttonGrad";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={heroRef}
      className={cn(
        "relative h-svh hero-parent flex flex-col items-center justify-end overflow-hidden",
        className
      )}
    >
      <div
        ref={badgeRef}
        className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap mix-blend-difference items-center px-2 py-2 border border-white/15 rounded-full bg-primary/5 backdrop-blur-sm text-sm font-medium text-white futuristic-glow dark:bg-primary/10 dark:border-primary/30"
      >
        <span className="inline-block w-2 h-2 rounded-full mix-blend-difference bg-white mr-2"></span>
        DSPL Technology
      </div>

      {/* Glassmorphism content container */}
      <div className="relative z-10 p-[1px] rounded-3xl border-[1px] ambient-future mb-5">
        <div className="hero-container md:text-start md:items-start md:flex-row w-fit p-10 rounded-3xl dark:bg-black/60 backdrop-blur-md ">
          <ScrollReveal className="!backdrop-blur-none">
            <h1 className="text-3xl md:text-2xl lg:text-3xl  h-full font-medium leading-tight md:leading-tight lg:leading-tight mb-8 tracking-tight">
              We design and build digital experiences that define the future
            </h1>
          </ScrollReveal>
          <ScrollReveal className="!backdrop-blur-none">
            <h1 className="text-xl font-normal h-full lg:block hidden  text-muted-foreground max-w-2xl mb-12">
              A creative technology agency specializing in crafting innovative
              digital solutions that merge cutting-edge design with advanced
              functionality.
            </h1>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-4 ">
            <Link to="/services">
              <ButtonGrad>Explore our work</ButtonGrad>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
