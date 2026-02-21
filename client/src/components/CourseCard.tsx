
import React from "react";
import { Clock, Users, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/course";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border transition-all duration-300 hover:shadow-lg group">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          loading="lazy"
          decoding="async"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </AspectRatio>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
            {course.category}
          </span>
          {course.featured && (
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-amber-100 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400">
              Featured
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{course.title}</h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">{course.description}</p>
        
        <div className="flex justify-between items-center mb-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{course.studentsEnrolled} students</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>{course.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-xl font-bold">${course.price}</div>
          <Button onClick={() => navigate(`/courses/${course._id}`)}>
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
