import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { DotPattern } from "@/components/ui/dotPattern";
import AnimatedText from "@/components/ui/AnimatedText";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/useCourses";
import SEOHead from "@/seo/SEOHead";

const Courses = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { getCourses } = useCourses();
  const {
    data: coursesResponse,
    isLoading,
    error,
  } = getCourses({
    category: activeCategory || undefined,
  });

  const handleCategoryClick = (category: string | null) => {
    setActiveCategory(category === activeCategory ? null : category);
  };

  // List of available categories
  const categories = ["Web Development", "UI/UX Design", "Marketing", "Business"];

  return (
    <>
      <SEOHead
        title="Courses | Data Analytics, Web Development & More | DSPL"
        description="Browse industry-ready courses offered by Data Software Pvt Ltd (DSPL), including data analytics, web development, and career-building programs."
        url="https://www.datasoftwareltd.com/courses"
      />

      <div className="relative global-padding py-24 overflow-hidden">
        <DotPattern className="absolute inset-0 opacity-20" />

        <div className="container  px-4">
          <div className="max-w-3xl mb-16">
            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">Our Courses</span>
            <AnimatedText
              text="Expand your knowledge with our expert-led courses"
              className="text-3xl md:text-4xl font-medium mb-6 text-balance"
              tag="h1"
            />
            <p className="text-muted-foreground mb-8">
              Unlock your potential with our comprehensive selection of courses designed to help you grow professionally
              and personally.
            </p>
          </div>

          {/* Course filters */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Button variant={activeCategory === null ? "default" : "outline"} onClick={() => handleCategoryClick(null)}>
              All Courses
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Course listings */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">Failed to load courses. Please try again later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coursesResponse?.data?.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

          {/* No courses found message */}
          {coursesResponse?.data?.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground mb-4">
                No courses found for this category. Please try another filter.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;
