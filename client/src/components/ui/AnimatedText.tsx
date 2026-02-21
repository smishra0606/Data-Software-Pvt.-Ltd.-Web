import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  highlightWords?: string[];
}

const AnimatedText = ({
  text,
  className,
  once = true,
  delay = 0,
  tag: Tag = "h1",
  highlightWords = [],
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLHeadingElement | null>(null);
  const textArray = text.split(" ");
  const { theme } = useTheme();

  useGSAP(() => {
    const wordElements =
      containerRef.current?.querySelectorAll(".word-element");
    const container = containerRef.current;

    if (wordElements && container) {
      // Initial state - hidden words
      gsap.set(wordElements, {
        opacity: 0,
        y: 10,
        filter: "blur(10px)",
      });

      // Animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: once
            ? "play none none none"
            : "play reverse play reverse",
        },
        delay: delay / 1000,
      });

      // Add staggered reveal animation
      tl.to(wordElements, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        stagger: 0.02,
        ease: "power4.out",
      });

      // Add hover animations with GSAP instead of CSS
      wordElements.forEach((word) => {
        word.addEventListener("mouseenter", () => {
          gsap.to(word, {
            duration: 0.2,
            ease: "power1.out",
          });
        });

        word.addEventListener("mouseleave", () => {
          gsap.to(word, {
            duration: 0.2,
            ease: "power1.in",
          });
        });
      });
    }
  }, [once, delay, text]);

  return (
    <Tag ref={containerRef} className={cn("overflow-hidden", className)}>
      {textArray.map((word, i) => {
        const isHighlighted = highlightWords.includes(word);
        return (
          <span
            key={i}
            className={cn(
              "word-element inline-block mr-[0.25em]",
              isHighlighted &&
                "text-gradient font-semibold dark:text-white dark:font-bold"
            )}
            style={{
              marginRight: i === textArray.length - 1 ? 0 : undefined,
              textShadow:
                isHighlighted && theme === "dark"
                  ? "0 0 10px rgba(243, 114, 24, 0.7)"
                  : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </Tag>
  );
};

export default AnimatedText;
