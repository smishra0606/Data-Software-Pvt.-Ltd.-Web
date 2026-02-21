
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Clock, Calendar, Award, Users, CheckCircle, 
  BookOpen, Play, Loader2, ArrowLeft, ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { DotPattern } from "@/components/ui/dotPattern";
import { useCourses } from "@/hooks/useCourses";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const { getCourse, enrollInCourse } = useCourses();
  const { data: courseResponse, isLoading, isError } = getCourse(courseId || '');
  const enrollMutation = enrollInCourse();

  const course = courseResponse?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="container  mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="mb-8">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/courses")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${courseId}` } });
      return;
    }
    
    enrollMutation.mutate(course._id);
  };

  // Format the date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return 'Unknown date';
    }
  };

  return (
    <div className="relative global-padding py-20 overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-20" />

      <div className="container flex flex-col gap-5 px-4">
        {/* Navigation */}
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Course Info - Left Column */}
          <div className="lg:col-span-2">
            <div className="mb-6">
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
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    Last updated:{" "}
                    {formatDate(course.lastUpdated || course.createdAt || "")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>{course.studentsEnrolled} enrolled</span>
                </div>
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 border mb-8">
              <h2 className="text-2xl font-semibold mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.learningOutcomes?.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                )) || (
                  <p className="text-muted-foreground">
                    Learning outcomes not specified.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-background rounded-xl p-6 border mb-8">
              <h2 className="text-2xl font-semibold mb-6">Course Content</h2>
              <div className="mb-4">
                <p className="text-muted-foreground">
                  {course.lessons} lessons • {course.modules} modules •{" "}
                  {course.duration} total length
                </p>
              </div>

              <Accordion type="single" collapsible className="w-full">
                {course.curriculum?.map((module, index) => (
                  <AccordionItem key={index} value={`module-${index}`}>
                    <AccordionTrigger className="text-lg">
                      {module.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pl-2">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lessonIndex}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted"
                          >
                            <div className="flex items-center gap-3">
                              <Play className="h-4 w-4 text-primary" />
                              <span>{lesson.title}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {lesson.duration}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )) || (
                  <p className="text-muted-foreground">
                    No curriculum available.
                  </p>
                )}
              </Accordion>
            </div>

            <div className="bg-background rounded-xl p-6 border">
              <h2 className="text-2xl font-semibold mb-6">Instructor</h2>
              {course.instructor ? (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        course.instructor.avatar ||
                        "https://via.placeholder.com/200"
                      }
                      alt={course.instructor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-medium">
                        {course.instructor.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {course.instructor.title}
                      </p>
                    </div>
                  </div>
                  <p className="mb-4">{course.instructor.bio}</p>
                </>
              ) : (
                <p className="text-muted-foreground">
                  Instructor information not available.
                </p>
              )}
            </div>
          </div>

          {/* Purchase Card - Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl border sticky top-24">
              <div className="aspect-video w-full relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="rounded-t-xl w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="rounded-full w-14 h-14 flex items-center justify-center bg-primary/90 hover:bg-primary">
                    <Play className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-3xl font-bold">${course.price}</div>
                  {course.originalPrice && (
                    <div className="text-xl line-through text-muted-foreground">
                      ${course.originalPrice}
                    </div>
                  )}
                </div>

                <Button
                  className="w-full mb-4"
                  size="lg"
                  onClick={handleEnroll}
                  disabled={enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enrolling...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Enroll Now
                    </>
                  )}
                </Button>

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Full lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-muted-foreground" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
