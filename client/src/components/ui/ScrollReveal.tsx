import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type RevealAnimationProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  threshold?: number;
};

const ScrollReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.2,
  threshold = 0.01,
}: RevealAnimationProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useGSAP(() => {
    if (ref.current) {
      // Adjust values based on direction
      const yValue = direction === "up" ? 20 : direction === "down" ? -20 : 0;
      const xValue =
        direction === "left" ? 20 : direction === "right" ? -20 : 0;

      // Initial state
      gsap.set(ref.current, {
        opacity: 0,
        y: yValue,
        x: xValue,
        filter: "blur(20px)",
      });

      // Animation with ScrollTrigger
      gsap.to(ref.current, {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        x: 0,
        duration,
        delay,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ref.current,
          start: `top ${(1 - threshold) * 100}%`,
          toggleActions: "play none none reset",
        },
      });
    }
  }, [direction, duration, delay, threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        className,
        `backdrop-blur-sm ${theme === "dark" && "mix-blend-difference"}`
      )}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
