import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Building,
  CheckCircle,
  XCircle,
  Upload,
  Loader2,
  FileText,
  User,
  Mail,
  Phone,
  Link,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, isPast } from "date-fns";
import { useCareers } from "@/hooks/useCareers";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import AnimatedText from "@/components/ui/AnimatedText";
import { DotPattern } from "@/components/ui/dotPattern";
import { api } from "@/lib/api";
import axios from "axios";

const CareerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: authLoading } = useAuth();
  const { getCareerById, applyToCareer } = useCareers();
  const { data: careerResponse, isLoading } = getCareerById(id);
  const applyMutation = applyToCareer();

  const career = careerResponse || null;

  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResumeFile(file);
      setResume(file.name);
    }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to apply");
      navigate("/login");
      return;
    }

    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }

    try {
      setIsSubmitting(true);

      // In a real app, you'd upload the resumeFile to storage and get a URL
      console.log("hello");
      const formData = new FormData();
      formData.append('file',resumeFile)

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      const uploadResponse = await axios.post(
        `http://localhost:8000/api/upload`,
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
      console.log(uploadResponse, "hello");


      await applyMutation.mutateAsync({
        careerId: id,
        data: {
          resume: uploadResponse.data.data.url,
          coverLetter,
        },
        
      });

      toast.success("Application submitted successfully");
      setResume("");
      setCoverLetter("");
      setResumeFile(null);
    } catch (error) {
      console.error("Error applying:", error);
      toast.error("Failed to submit application");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!career) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Career not found</h1>
        <p className="text-muted-foreground mb-8">
          The career position you're looking for doesn't exist or has been
          removed.
        </p>
        <Button onClick={() => navigate("/careers")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Careers
        </Button>
      </div>
    );
  }

  const isDeadlinePassed = isPast(new Date(career.deadline));
  const canApply = career.status === "Open" && !isDeadlinePassed;

  return (
    <div className="relative gl-container overflow-hidden">
      <DotPattern className="absolute inset-0 opacity-20" />

      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-8"
          onClick={() => navigate("/careers")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Positions
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Career Details (Left Column) */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant={career.status === "Open" ? "default" : "secondary"}
                  >
                    {career.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Posted {format(new Date(career.postedDate), "MMM d, yyyy")}
                  </span>
                </div>
                <AnimatedText
                  text={career.title}
                  className="text-3xl font-bold mb-2"
                  tag="h1"
                />
                <div className="flex items-center text-muted-foreground">
                  <Building className="h-4 w-4 mr-1" />
                  <span>{career.department}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">Location</div>
                  <div className="text-muted-foreground">{career.location}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">Job Type</div>
                  <div className="text-muted-foreground">{career.type}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">Application Deadline</div>
                  <div
                    className={`${
                      isDeadlinePassed
                        ? "text-red-500"
                        : "text-muted-foreground"
                    }`}
                  >
                    {format(new Date(career.deadline), "MMM d, yyyy")}
                    {isDeadlinePassed && " (Expired)"}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <div>
                  <div className="font-medium">Positions Available</div>
                  <div className="text-muted-foreground">
                    {career.positions}
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Job Description</h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: career.description }}
              />
            </div>

            {/* Requirements */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-2">
                {career.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsibilities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
              <ul className="space-y-2">
                {career.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Qualifications */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Qualifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {career.qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-center">
                    <Badge className="mr-2">{qualification}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Application Form (Right Column) */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
              </CardHeader>
              <CardContent>
                {!canApply ? (
                  <div className="text-center py-8">
                    <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Applications Closed
                    </h3>
                    <p className="text-muted-foreground">
                      {career.status !== "Open"
                        ? "This position is no longer accepting applications"
                        : "The application deadline for this position has passed"}
                    </p>
                    <Button
                      className="mt-6"
                      onClick={() => navigate("/careers")}
                    >
                      Browse Other Positions
                    </Button>
                  </div>
                ) : user ? (
                  <form onSubmit={handleApply}>
                    <div className="space-y-6">
                      {/* User Information (Pre-filled) */}
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{user.name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{user.email}</span>
                        </div>
                      </div>

                      <Separator />

                      {/* Resume Upload */}
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume/CV (Required)</Label>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                              document.getElementById("resume")?.click()
                            }
                            className="w-full justify-start"
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {resume ? resume : "Upload Resume"}
                          </Button>
                        </div>
                        <Input
                          type="file"
                          id="resume"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={handleResumeChange}
                        />
                        <p className="text-xs text-muted-foreground">
                          Supported formats: PDF, DOCX, DOC (Max 5MB)
                        </p>
                      </div>

                      {/* Cover Letter */}
                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">
                          Cover Letter (Optional)
                        </Label>
                        <Textarea
                          id="coverLetter"
                          placeholder="Tell us why you're a good fit for this position..."
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          rows={5}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || !resume}
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

                      <p className="text-xs text-muted-foreground text-center mt-4">
                        By submitting this application, you agree to our{" "}
                        <Link
                          href="/terms"
                          className="text-primary hover:underline"
                        >
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-primary hover:underline"
                        >
                          Privacy Policy
                        </Link>
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Login Required
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      You need to be logged in to apply for this position
                    </p>
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => navigate("/register")}
                      >
                        Create an Account
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {career.salary && (
              <Card className="mt-4">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-1">Salary Range</h3>
                  <p className="text-lg font-semibold text-primary">
                    {career.salary}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerDetails;
