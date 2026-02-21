
import React, { useState } from "react";
import { useAdminManagement } from "@/hooks/useAdminManagement";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2, Award, Search, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Enrollment {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  courseId: string;
  courseTitle: string;
  enrollmentDate: string;
  progress: number;
  completed: boolean;
}

const EnrollmentManagement = () => {
  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedCourseTitle, setSelectedCourseTitle] = useState<string | null>(null);
  const [completionDate, setCompletionDate] = useState<Date | null>(new Date());

  // Get enrollments data using the admin hook
  const { getEnrollments, generateCertificate } = useAdminManagement();
  const { data: enrollmentsResponse, isLoading } = getEnrollments();
  const generateCertificateMutation = generateCertificate();

  const enrollments: Enrollment[] = enrollmentsResponse?.data || [];
  console.log(enrollments);
  

  // Filter enrollments based on search
  const filteredEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.userName?.toLowerCase().includes(search.toLowerCase()) ||
      enrollment.userEmail?.toLowerCase().includes(search.toLowerCase()) ||
      enrollment.courseTitle?.toLowerCase().includes(search.toLowerCase())
  );

  const handleGenerateCertificate = (userId: string, courseId: string, courseTitle: string) => {
    setSelectedUser(userId);
    setSelectedCourse(courseId);
    setSelectedCourseTitle(courseTitle);
    setIsDialogOpen(true);
  };

  const submitCertificate = () => {
    if (!selectedUser || !selectedCourse || !selectedCourseTitle) {
      toast.error("User, course, and title must be selected");
      return;
    }

    generateCertificateMutation.mutate({
      userId: selectedUser,
      courseId: selectedCourse,
      title: selectedCourseTitle,
      completionDate: completionDate || undefined,
    });

    // Close the dialog after submission
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full ">
        <CardHeader>
          <CardTitle className="text-2xl">Student Enrollments</CardTitle>
          <div className="relative mt-4">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <Input
              placeholder="Search by student name, email or course"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredEnrollments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEnrollments.map((enrollment) => (
                  <TableRow key={enrollment._id}>
                    <TableCell className="font-medium">
                      {enrollment.userName}
                    </TableCell>
                    <TableCell>{enrollment.userEmail}</TableCell>
                    <TableCell>{enrollment.courseTitle}</TableCell>
                    <TableCell>{enrollment.progress}%</TableCell>
                    <TableCell>
                      {enrollment.completed ? "Completed" : "In Progress"}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleGenerateCertificate(
                            enrollment.userId,
                            enrollment.courseId,
                            enrollment.courseTitle
                          )
                        }
                        className="flex items-center"
                      >
                        <Award className="h-4 w-4 mr-1" />
                        Generate Certificate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-8 text-center">
              <p className="text-muted-foreground">No enrollments found</p>
              {search && (
                <Button
                  variant="link"
                  onClick={() => setSearch("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              )}
            </div>
          )}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Generate Certificate</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Generating certificate for {selectedCourseTitle}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Completion Date
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !completionDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {completionDate ? (
                            format(completionDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={completionDate || undefined}
                          onSelect={setCompletionDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={submitCertificate}
                  disabled={generateCertificateMutation.isPending}
                >
                  {generateCertificateMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Certificate"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentManagement;
