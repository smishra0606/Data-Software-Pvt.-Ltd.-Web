
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { InteractiveSlider } from "@/components/ui/interactive-slider";
import { Button } from "@/components/ui/button";

interface ImageSliderProps {
  images: string[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  indicatorType?: "dots" | "thumbnails" | "slider";
  aspectRatio?: "square" | "video" | "wide" | "ultra-wide" | string;
  variant?: "default" | "glass" | "neon" | "minimal";
}

const aspectRatioClasses = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[16/9]",
  "ultra-wide": "aspect-[21/9]",
};

const ImageSlider = ({
  images,
  className,
  autoPlay = true,
  interval = 5000,
  showControls = true,
  showIndicators = true,
  indicatorType = "dots",
  aspectRatio = "video",
  variant = "default",
}: ImageSliderProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (autoPlay && !isPaused) {
      autoPlayRef.current = setInterval(() => {
        goToNextSlide();
      }, interval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlay, currentImageIndex, isPaused, interval]);

  const goToSlide = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (index > currentImageIndex) {
      setDirection("next");
    } else if (index < currentImageIndex) {
      setDirection("prev");
    }
    
    setCurrentImageIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
      setDirection(null);
    }, 500);
  };

  const goToNextSlide = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    goToSlide(newIndex);
  };

  const goToPrevSlide = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    goToSlide(newIndex);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    if (autoPlay) {
      autoPlayRef.current = setInterval(goToNextSlide, interval);
    }
  };

  // Determine the appearance based on the variant
  const getContainerClasses = () => {
    const baseClasses = "relative overflow-hidden rounded-xl";
    
    switch (variant) {
      case "glass":
        return cn(baseClasses, isDark 
          ? "bg-gray-900/40 backdrop-blur-sm border border-gray-800/60" 
          : "bg-white/60 backdrop-blur-sm border border-gray-200/60 shadow-lg");
      case "neon":
        return cn(baseClasses, isDark 
          ? "bg-gray-900 border-2 border-brand-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)]" 
          : "bg-white border-2 border-brand-500/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]");
      case "minimal":
        return cn(baseClasses, "border-0 shadow-none");
      default:
        return cn(baseClasses, isDark 
          ? "bg-gray-900 border border-gray-800" 
          : "bg-white border border-gray-200 shadow-md");
    }
  };

  const getNavButtonClasses = () => {
    const baseClasses = "absolute top-1/2 -translate-y-1/2 z-10 rounded-full flex items-center justify-center transition-all duration-300";
    
    switch (variant) {
      case "glass":
        return cn(baseClasses, isDark 
          ? "bg-black/30 backdrop-blur-md hover:bg-black/50 text-white" 
          : "bg-white/50 backdrop-blur-md hover:bg-white/70 text-gray-800 shadow-md");
      case "neon":
        return cn(baseClasses, isDark 
          ? "bg-gray-900 border border-brand-500/50 text-brand-400 hover:bg-gray-800 hover:text-brand-300 shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
          : "bg-white border border-brand-500/30 text-brand-600 hover:border-brand-500/80 shadow-[0_0_8px_rgba(34,197,94,0.2)]");
      case "minimal":
        return cn(baseClasses, isDark 
          ? "bg-black/20 hover:bg-black/40 text-white/90" 
          : "bg-white/40 hover:bg-white/70 text-gray-800 shadow-sm");
      default:
        return cn(baseClasses, isDark 
          ? "bg-gray-800 hover:bg-gray-700 text-white" 
          : "bg-white hover:bg-gray-100 text-gray-800 shadow-md");
    }
  };

  // Aspect ratio handling
  const getAspectRatioClass = () => {
    if (aspectRatio in aspectRatioClasses) {
      return aspectRatioClasses[aspectRatio as keyof typeof aspectRatioClasses];
    }
    // Custom aspect ratio
    return `aspect-[${aspectRatio}]`;
  };

  return (
    <div 
      className={cn("w-full", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main slider container */}
      <div className={cn(
        getContainerClasses(),
        getAspectRatioClass()
      )}>
        {/* Images */}
        <div 
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div 
              key={index} 
              className="min-w-full h-full flex-shrink-0"
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className={cn(
                  "w-full h-full object-cover",
                  direction === "next" && currentImageIndex === index ? "animate-slide-in-right" : 
                  direction === "prev" && currentImageIndex === index ? "animate-slide-in-left" : ""
                )}
              />
              
              {/* Optional gradient overlay */}
              {variant === "glass" && (
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t",
                  isDark 
                    ? "from-black/30 to-transparent" 
                    : "from-black/10 to-transparent"
                )}></div>
              )}
            </div>
          ))}
        </div>
        
        {/* Navigation arrows */}
        {showControls && (
          <>
            <Button
              onClick={goToPrevSlide}
              className={cn(
                getNavButtonClasses(),
                "left-4 w-10 h-10",
                variant === "minimal" ? "opacity-0 group-hover:opacity-100" : ""
              )}
              variant="outline"
              size="icon"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>
            
            <Button
              onClick={goToNextSlide}
              className={cn(
                getNavButtonClasses(),
                "right-4 w-10 h-10",
                variant === "minimal" ? "opacity-0 group-hover:opacity-100" : ""
              )}
              variant="outline" 
              size="icon"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </>
        )}
      </div>
      
      {/* Indicators */}
      {showIndicators && (
        <div className="mt-4">
          {indicatorType === "dots" && (
            <div className="flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "transition-all duration-300 rounded-full focus:outline-none",
                    currentImageIndex === index 
                      ? cn(
                          "w-3 h-3",
                          isDark 
                            ? "bg-brand-500" 
                            : "bg-brand-600"
                        ) 
                      : cn(
                          "w-2 h-2",
                          isDark 
                            ? "bg-gray-700 hover:bg-gray-600" 
                            : "bg-gray-300 hover:bg-gray-400"
                        )
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          
          {indicatorType === "thumbnails" && (
            <div className="flex justify-center space-x-2 overflow-x-auto py-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "w-16 h-12 rounded overflow-hidden transition-all duration-300 focus:outline-none",
                    currentImageIndex === index 
                      ? cn(
                          "ring-2 ring-offset-2",
                          isDark 
                            ? "ring-brand-500 ring-offset-gray-900" 
                            : "ring-brand-600 ring-offset-white"
                        ) 
                      : "opacity-60 hover:opacity-100"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
          
          {indicatorType === "slider" && (
            <div className="px-4 py-2">
              <InteractiveSlider
                defaultValue={[currentImageIndex]}
                max={images.length - 1}
                step={1}
                variant="gradient"
                onValueChange={(values) => {
                  goToSlide(values[0]);
                }}
                formatTooltip={(value) => `${value + 1}/${images.length}`}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { ImageSlider };
export type { ImageSliderProps };
