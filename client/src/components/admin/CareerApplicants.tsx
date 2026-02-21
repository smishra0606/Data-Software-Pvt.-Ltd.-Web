
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronLeft,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  MoreHorizontal,
  Search,
  User,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useCareers } from "@/hooks/useCareers";
import { CareerApplicant } from "@/types/career";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CareerApplicants = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCareerById, getCareerApplicants, updateApplicantStatus } = useCareers();
  
  const { data: careerData, isLoading: isLoadingCareer } = getCareerById(id);
  const { data: applicantsData, isLoading: isLoadingApplicants } = getCareerApplicants(id);
  
  const updateStatusMutation = updateApplicantStatus();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<CareerApplicant | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  
  const career = careerData;
  const applicants = applicantsData || [];
  
  const filteredApplicants = applicants.filter((applicant) =>
    applicant.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewResume = (applicant: CareerApplicant) => {
    setSelectedApplicant(applicant);
    setShowResumeDialog(true);
  };

  const handleOpenResume = () => {
    if (selectedApplicant?.resume) {
      window.open(selectedApplicant.resume, "_blank");
    }
  };

  const handleUpdateStatus = async (applicantId: string, status: string) => {
    if (!id) return;
    
    try {
      await updateStatusMutation.mutateAsync({
        careerId: id,
        applicantId,
        status: status as any,
      });
    } catch (error) {
      console.error("Error updating applicant status:", error);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Hired":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Shortlisted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Under Review":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  if (isLoadingCareer || isLoadingApplicants) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!career) {
    return (
      <div className="gl-container mx-auto text-center">
        <p className="text-red-500 mb-4">Career position not found</p>
        <Button onClick={() => navigate("/admin/careers")}>
          Back to Careers
        </Button>
      </div>
    );
  }

  return (
    <div className="gl-container  mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            variant="ghost"
            className="mb-2"
            onClick={() => navigate("/admin/careers")}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Careers
          </Button>
          <h1 className="text-2xl font-bold">{career.title} Applicants</h1>
          <p className="text-muted-foreground">
            Review and manage applications for this position
          </p>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Position Details</CardTitle>
          <CardDescription>
            Basic information about this career position
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Department</p>
              <p>{career.department}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p>{career.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <p>{career.type}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <Badge
                variant={career.status === "Open" ? "default" : "secondary"}
              >
                {career.status}
              </Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Applications</p>
              <p>{career.applicationCount}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Deadline</p>
              <p>{format(new Date(career.deadline), "MMM d, yyyy")}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/careers/${id}`)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            View Full Job Posting
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applicants ({applicants.length})</CardTitle>
          <CardDescription>
            Manage all applicants for this position
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applicants..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {applicants.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Applications Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-4">
                There are no applications for this position yet. Check back
                later or adjust the job posting to attract more candidates.
              </p>
              <Button
                variant="outline"
                onClick={() => navigate(`/admin/careers/edit/${id}`)}
              >
                Edit Job Posting
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Applied On</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplicants.map((applicant) => (
                    <TableRow key={applicant._id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={applicant.user.profileImage}
                              alt={applicant.user.name}
                            />
                            <AvatarFallback>
                              {applicant.user.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {applicant.user.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {applicant.user.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusBadgeVariant(applicant.status)}
                          variant="outline"
                        >
                          {applicant.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(applicant.appliedDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewResume(applicant)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                (window.location.href = `mailto:${applicant.user.email}`)
                              }
                            >
                              <Mail className="mr-2 h-4 w-4" />
                              Email Applicant
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedApplicant(applicant);
                                setSelectedStatus(applicant.status);
                              }}
                            >
                              <User className="mr-2 h-4 w-4" />
                              Update Status
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resume Dialog */}
      <Dialog open={showResumeDialog} onOpenChange={setShowResumeDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Applicant Resume</DialogTitle>
            <DialogDescription>
              {selectedApplicant?.user.name}'s resume for the {career.title}{" "}
              position
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <p className="mb-4 text-sm text-muted-foreground">
              The resume is available as a downloadable document.
            </p>

            {selectedApplicant?.coverLetter && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">Cover Letter</h3>
                <div className="bg-muted p-4 rounded-md text-sm max-h-48 overflow-y-auto">
                  {selectedApplicant.coverLetter}
                </div>
              </div>
            )}

            <div className="bg-muted p-4 rounded-md flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>Resume</span>
              </div>

              <Button variant="outline" size="sm" onClick={handleOpenResume}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowResumeDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Dialog */}
      <Dialog
        open={!!selectedApplicant && !!selectedStatus}
        onOpenChange={(open) => !open && setSelectedApplicant(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Application Status</DialogTitle>
            <DialogDescription>
              Change the status for {selectedApplicant?.user.name}'s application
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Application Status
              </label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                  <SelectItem value="Hired">Hired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedApplicant(null)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedApplicant && selectedStatus) {
                  handleUpdateStatus(selectedApplicant._id, selectedStatus);
                  setSelectedApplicant(null);
                }
              }}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CareerApplicants;
