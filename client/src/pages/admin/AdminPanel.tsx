
import React, { useState } from "react";
import { Loader2, Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/dotPattern";
import AnimatedText from "@/components/ui/AnimatedText";
import { Course } from "@/types/course";
import CourseForm from "@/components/admin/CourseForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCourses } from "@/hooks/useCourses";

const AdminPanel = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [courseToDelete, setCourseToDelete] = useState<string | null>(null);

  // Use the custom useCourses hook to access course data and mutations
  const { 
    getCourses, 
    createCourse: createCourseMutation, 
    updateCourse: updateCourseMutation,
    deleteCourse: deleteCourseMutation 
  } = useCourses();

  const { data: coursesResponse, isLoading, isError } = getCourses();
  const createMutation = createCourseMutation();
  const updateMutation = updateCourseMutation();
  const deleteMutation = deleteCourseMutation();

  const handleCreateCourse = (newCourse: Omit<Course, "_id">) => {
    createMutation.mutate(newCourse, {
      onSuccess: () => {
        setIsCreateDialogOpen(false);
      }
    });
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    const { _id, ...courseData } = updatedCourse;
    updateMutation.mutate({ id: _id, data: courseData }, {
      onSuccess: () => {
        setIsEditDialogOpen(false);
        setSelectedCourse(null);
      }
    });
  };

  const confirmDeleteCourse = (courseId: string) => {
    setCourseToDelete(courseId);
  };

  const handleDeleteCourse = () => {
    if (courseToDelete) {
      deleteMutation.mutate(courseToDelete, {
        onSuccess: () => {
          setCourseToDelete(null);
        }
      });
    }
  };

  const openEditDialog = (course: Course) => {
    setSelectedCourse(course);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="relative global-padding py-20 overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="text-sm font-medium text-primary/80 uppercase tracking-wider mb-4 block">
              Admin Panel
            </span>
            <AnimatedText
              text="Course Management"
              className="text-3xl md:text-4xl font-medium mb-6"
              tag="h1"
            />
            <p className="text-muted-foreground">
              Create, update, and manage your course offerings
            </p>
          </div>

          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>
                  Fill out the form below to create a new course
                </DialogDescription>
              </DialogHeader>
              <CourseForm
                onSubmit={handleCreateCourse}
                isSubmitting={createMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="text-center py-20">
            <p className="text-red-500 mb-4">Failed to load courses</p>
            <Button onClick={() => getCourses()}>Try Again</Button>
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coursesResponse?.data?.length ? (
                  coursesResponse.data.map((course) => (
                    <TableRow key={course._id}>
                      <TableCell className="font-medium">
                        {course.title}
                      </TableCell>
                      <TableCell>{course.category}</TableCell>
                      <TableCell>${course.price}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.studentsEnrolled}</TableCell>
                      <TableCell>{course.rating}/5</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(course)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog
                            open={courseToDelete === course._id}
                            onOpenChange={() => setCourseToDelete(null)}
                          >
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => confirmDeleteCourse(course._id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete the course. This
                                  action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={handleDeleteCourse}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  {deleteMutation.isPending ? (
                                    <>
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      Deleting...
                                    </>
                                  ) : (
                                    "Delete"
                                  )}
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6">
                      No courses found. Create your first course!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Edit Course Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>Update the course information</DialogDescription>
          </DialogHeader>
          {selectedCourse && (
            <CourseForm
              course={selectedCourse}
              onSubmit={handleUpdateCourse}
              isSubmitting={updateMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
