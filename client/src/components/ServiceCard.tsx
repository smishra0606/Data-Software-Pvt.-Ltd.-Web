import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
  className?: string;
  id: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  index = 0,
  className,
  id,
}: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative group glass-card backdrop-blur-lg rounded-xl overflow-hidden p-8 transition-all duration-300",
        isHovered ? "shadow-lg" : "shadow-sm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient border on hover */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
          "bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-xl -z-10"
        )}
        style={{
          transform: "scale(1.01)",
          filter: "blur(8px)",
        }}
      />

      {/* Service icon */}
      <div className="mb-6 relative">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>

      {/* Learn more link */}
      <Link to={"/services#" + id}>
        <Button variant="outline" className="">
          <span className="text-primary">Learn more</span>
          <ArrowRight
            className={cn(
              "ml-1 h-4 w-4 text-primary transition-transform",
              isHovered ? "translate-x-1" : ""
            )}
          />
        </Button>
      </Link>
    </div>
  );
};

export default ServiceCard;
