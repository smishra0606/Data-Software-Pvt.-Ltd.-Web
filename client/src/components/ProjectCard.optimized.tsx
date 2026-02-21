// Performance Optimized Project Card
import { useState, memo } from 'react';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  link?: string;
  className?: string;
}

const ProjectCard = memo(({
  title,
  category,
  imageUrl,
  description,
  link = "#",
  className,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "group relative rounded-xl overflow-hidden",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image with lazy loading */}
      <div className="aspect-[4/3] overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full h-full object-cover transition-transform duration-500 will-change-transform",
            isHovered ? "scale-105" : "scale-100"
          )}
          style={{ 
            contentVisibility: 'auto',
            transform: 'translateZ(0)' // Force GPU acceleration
          }}
        />
      </div>
      
      {/* Overlay on hover */}
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent",
          "flex flex-col justify-end p-6 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="transform transition-transform duration-300 translate-y-0">
          <span className="text-xs font-medium uppercase tracking-wider text-white/80 mb-2 block">
            {category}
          </span>
          <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
          <p className="text-white/80 text-sm mb-4 max-w-md">{description}</p>
          
          <a 
            href={link} 
            className="inline-flex items-center text-white font-medium text-sm group/link"
          >
            View project 
            <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
          </a>
        </div>
      </div>
      
      {/* Info when not hovered */}
      <div className="mt-4">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground block">
          {category}
        </span>
        <h3 className="text-lg font-medium mt-1">{title}</h3>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
