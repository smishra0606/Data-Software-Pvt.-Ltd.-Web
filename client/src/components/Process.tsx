import { ArrowRight, LineChart, Monitor, PenTool, Search } from "lucide-react";
import ScrollReveal from "./ui/ScrollReveal";
import AnimatedText from "./ui/AnimatedText";
import { cn } from "@/lib/utils";

const Process = () => {
  return (
    <section className="section-padding">
      <div className="container-wide">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
            Our Process
          </span>
          <AnimatedText
            text="A systematic approach to solving digital challenges"
            className="text-3xl md:text-4xl font-medium mb-6 text-balance"
            tag="h2"
          />
          <p className="text-muted-foreground">
            Our proven process ensures we deliver exceptional results that meet
            your business objectives and exceed expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Discover",
              icon: <Search className="h-6 w-6" />,
              description: "Understanding your business, goals, and challenges",
            },
            {
              title: "Design",
              icon: <PenTool className="h-6 w-6" />,
              description: "Creating intuitive and engaging user experiences",
            },
            {
              title: "Develop",
              icon: <Monitor className="h-6 w-6" />,
              description: "Building robust and scalable digital solutions",
            },
            {
              title: "Deploy",
              icon: <LineChart className="h-6 w-6" />,
              description:
                "Launching and optimizing for continuous improvement",
            },
          ].map((step, index) => (
            <ScrollReveal
              key={index}
              delay={index * 0.1}
            >
              <div
                className={cn("flex flex-col items-center text-center p-6 ")}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10  flex items-center justify-center mb-6">
                  <div className="text-primary">{step.icon}</div>
                </div>
                <h3 className="text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < 3 && (
                  <div className="hidden lg:block absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
