/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Add other environment variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Loader2,
  MapPin,
  Briefcase,
  Calendar,
  Clock,
  Users,
  CreditCard,
  Award,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { DotPattern } from "@/components/ui/dotPattern";
import AnimatedText from "@/components/ui/AnimatedText";
import { toast } from "sonner";
import { useInternships } from "@/hooks/useInternships";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUserDashboard } from "@/hooks/useUserDashboard";

const InternshipDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getInternship, applyForInternship } = useInternships();

  const { data: internshipData, isLoading, error } = getInternship(id);
  const applyMutation = applyForInternship();

  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFileData, setUploadedFileData] = useState<any>(null);

  const internship = internshipData?.data;
  const { getUserData } = useUserDashboard();

  const { data: dashboardData, isLoading: isDashboardLoading } = getUserData();
  let isApplied: boolean = false;
  let appliedInternshipData = [];
  if (!isDashboardLoading) {
    appliedInternshipData = dashboardData?.appliedInternships?.filter(
      (appliedInternship) =>
        appliedInternship?.internship?._id === internshipData?.data.id
    );

    isApplied = appliedInternshipData?.length > 0;
  }

  useEffect(() => {
    if ((error || !id) && !isLoading) {
      toast.error("Internship not found");
      navigate("/internships");
    }
  }, [error, id, isLoading, navigate]);

  const handleApply = async () => {
    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    if (!id) {
      toast.error("Invalid internship ID");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("file", resumeFile);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const uploadResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!uploadResponse.data.success) {
        throw new Error(
          uploadResponse.data.message || "Failed to upload resume"
        );
      }

      // Store uploaded file data
      setUploadedFileData(uploadResponse.data.data);

      await applyMutation.mutateAsync({
        internshipId: id,
        data: {
          resume: uploadResponse.data.data.url,
          resumePublicId:
            uploadResponse.data.data.publicId ||
            uploadResponse.data.data.filename,
          resumeFileName:
            uploadResponse.data.data.originalName || resumeFile.name,
          coverLetter: coverLetter,
        },
      });

      toast.success("Application submitted successfully!");
      setShowApplyDialog(false);
      navigate("/dashboard");
    } catch (error: any) {
      console.error("Application error:", error);
      toast.error(error.message || "Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !internship) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative gl-container overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4">
        <button
          className="mb-6"
          onClick={() =>
            user?.role === "admin"
              ? navigate("/admin/internships")
              : navigate("/internships")
          }
        >
          ← Back to Internships
        </button>

        <div className="grid grid-cols-1 mt-6 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Badge
                  variant={
                    internship.status === "Active" ? "default" : "secondary"
                  }
                >
                  {internship.status}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="h-3 w-3 mr-1" />
                  {internship.location}
                </Badge>
                {internship.remote && (
                  <Badge variant="outline">Remote Available</Badge>
                )}
              </div>

              <AnimatedText
                text={internship.title}
                className="text-3xl font-bold mb-2"
                tag="h1"
              />

              <div className="flex items-center text-lg text-muted-foreground mb-6">
                <Briefcase className="h-5 w-5 mr-2" />
                {internship.company}
              </div>

              <Separator className="mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    Duration
                  </span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-primary" />
                    <span>{internship.duration}</span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    Positions
                  </span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-primary" />
                    <span>{internship.positions}</span>
                  </div>
                </div>

                {internship.stipend && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground mb-1">
                      Stipend
                    </span>
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2 text-primary" />
                      <span>{internship.stipend}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    Start Date
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {format(new Date(internship.startDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    End Date
                  </span>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-primary" />
                    <span>
                      {format(new Date(internship.endDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground mb-1">
                    Applications
                  </span>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>{internship.applications}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="mb-6 whitespace-pre-line">
                {internship.description}
              </p>

              <h2 className="text-xl font-semibold mb-3">Requirements</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                {internship.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>

              <h2 className="text-xl font-semibold mb-3">Skills Required</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {internship.skills.map((skill, index) => (
                  <Badge key={index} variant="outline">
                    <Award className="h-3 w-3 mr-1" />
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {user?.role === "user" && (
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isApplied ? "Applied " : "Apply "}
                    for this Internship
                  </CardTitle>
                  <CardDescription>
                    {isApplied ? "Submitted" : "Submit"} your application for
                    the
                    <span className="text-yellow-400 ml-1">
                      {internship.title}
                    </span>{" "}
                    position at{" "}
                    <span className="text-yellow-400">
                      {internship.company}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isAuthenticated ? (
                    <div className="flex justify-between items-center">
                      {!isApplied ? (
                        <Button onClick={() => setShowApplyDialog(true)}>
                          Apply Now
                        </Button>
                      ) : (
                        <div className="flex flex-col space-y-2 w-full">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              appliedInternshipData[0]?.status === "Accepted"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : appliedInternshipData[0]?.status ===
                                  "Rejected"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                : appliedInternshipData[0]?.status ===
                                  "In Review"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                            }`}
                          >
                            {appliedInternshipData[0]?.status}
                          </span>

                          {appliedInternshipData[0]?.resume && (
                            <div className="text-sm flex items-center mt-2">
                              <FileText className="h-3 w-3 mr-1 text-muted-foreground" />
                              <a
                                href={appliedInternshipData[0].resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                View Submitted Resume
                              </a>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        You need to sign in to apply for this internship.
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => navigate("/login")}
                      >
                        Sign In to Apply
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
      {user?.role === "user" && (
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Apply for {internship.title}</DialogTitle>
              <DialogDescription>
                Submit your resume and cover letter to apply for this internship
                at {internship.company}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="resume">Resume (PDF, DOC, DOCX) *</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFile(e.target.files[0]);
                      }
                    }}
                    required
                  />
                </div>
                {resumeFile && (
                  <p className="text-xs text-muted-foreground">
                    Selected: {resumeFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                <Textarea
                  id="coverLetter"
                  placeholder="Write a brief cover letter explaining why you're a good fit for this position..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowApplyDialog(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleApply}
                disabled={isSubmitting || !resumeFile}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Application"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default InternshipDetails;
