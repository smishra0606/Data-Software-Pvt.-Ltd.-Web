
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  className?: string;
}

const TeamMember = ({
  name,
  role,
  imageUrl,
  bio,
  social = {},
  className,
}: TeamMemberProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "relative group overflow-hidden ",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            isHovered ? "scale-105" : "scale-100"
          )}
        />
      </div>
      
      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{role}</p>
        <p className="text-sm text-muted-foreground line-clamp-3">{bio}</p>
        
        {/* Social links */}
        <div className="pt-1 flex space-x-3">
          {social.linkedin && (
            <a 
              href={social.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${name}'s LinkedIn`}
            >
              <Linkedin size={18} />
            </a>
          )}
          
          {social.twitter && (
            <a 
              href={social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`${name}'s Twitter`}
            >
              <Twitter size={18} />
            </a>
          )}
          
          {social.email && (
            <a 
              href={`mailto:${social.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail size={18} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
