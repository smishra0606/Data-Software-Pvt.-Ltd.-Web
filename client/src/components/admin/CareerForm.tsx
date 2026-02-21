
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Briefcase, Building, Calendar, Loader2, MapPin, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useCareers } from "@/hooks/useCareers";
import { Career } from "@/types/career";

interface CareerFormProps {
  mode: "create" | "edit";
}

const CareerForm = ({ mode }: CareerFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCareerById, createCareer, updateCareer } = useCareers();
  const { data: careerData, isLoading: isLoadingCareer } = 
    mode === "edit" ? getCareerById(id) : { data: null, isLoading: false };
  
  const createMutation = createCareer();
  const updateMutation = updateCareer();

  const [formData, setFormData] = useState<Partial<Career>>({
    title: "",
    department: "",
    description: "",
    requirements: [],
    responsibilities: [],
    qualifications: [],
    location: "",
    type: "Full-time",
    positions: 1,
    status: "Draft",
    salary: "",
    deadline: "",
  });
  
  const [newRequirement, setNewRequirement] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  const [newQualification, setNewQualification] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load career data if editing
  useEffect(() => {
    if (mode === "edit" && careerData) {
      const career = careerData;
      
      setFormData({
        title: career.title,
        department: career.department,
        description: career.description,
        requirements: career.requirements,
        responsibilities: career.responsibilities,
        qualifications: career.qualifications,
        location: career.location,
        type: career.type,
        positions: career.positions,
        status: career.status,
        salary: career.salary || "",
        deadline: new Date(career.deadline).toISOString().split("T")[0],
      });
    }
  }, [mode, careerData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: string) => {
    const numberValue = parseInt(value);
    if (!isNaN(numberValue) && numberValue > 0) {
      setFormData((prev) => ({ ...prev, [name]: numberValue }));
    }
  };

  const addItem = (field: "requirements" | "responsibilities" | "qualifications", value: string) => {
    if (!value.trim()) return;
    
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] || []), value.trim()],
    }));
    
    // Clear input field
    if (field === "requirements") setNewRequirement("");
    else if (field === "responsibilities") setNewResponsibility("");
    else setNewQualification("");
  };

  const removeItem = (field: "requirements" | "responsibilities" | "qualifications", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!formData.title) {
      toast.error("Title is required");
      return false;
    }
    if (!formData.department) {
      toast.error("Department is required");
      return false;
    }
    if (!formData.description) {
      toast.error("Description is required");
      return false;
    }
    if (!formData.location) {
      toast.error("Location is required");
      return false;
    }
    if (!(formData.requirements || []).length) {
      toast.error("At least one requirement is required");
      return false;
    }
    if (!(formData.responsibilities || []).length) {
      toast.error("At least one responsibility is required");
      return false;
    }
    if (!(formData.qualifications || []).length) {
      toast.error("At least one qualification is required");
      return false;
    }
    if (!formData.deadline) {
      toast.error("Application deadline is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (mode === "create") {
        await createMutation.mutateAsync(formData as any);
        toast.success("Career position created successfully");
      } else if (mode === "edit" && id) {
        await updateMutation.mutateAsync({ id, data: formData } as any);
        toast.success("Career position updated successfully");
      }
      
      navigate("/admin/careers");
    } catch (error: any) {
      toast.error(error.message || "Error saving career position");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (mode === "edit" && isLoadingCareer) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="gl-container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "create"
              ? "Create New Career Position"
              : "Edit Career Position"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "create"
              ? "Add a new position to your careers page"
              : "Update the details of this career position"}
          </p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin/careers")}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details about this career position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Senior Software Engineer"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="e.g. Engineering"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Provide a detailed description of the job role..."
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. New York, NY"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        handleSelectChange("type", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="positions">Number of Positions *</Label>
                    <Input
                      id="positions"
                      name="positions"
                      type="number"
                      min="1"
                      value={formData.positions}
                      onChange={(e) =>
                        handleNumberChange("positions", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary (Optional)</Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g. $80,000 - $100,000"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deadline">Application Deadline *</Label>
                    <Input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status *</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) =>
                        handleSelectChange("status", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Requirements & Responsibilities</CardTitle>
                <CardDescription>
                  List the key requirements and responsibilities for this
                  position
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Requirements *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="Add a requirement..."
                    />
                    <Button
                      type="button"
                      onClick={() => addItem("requirements", newRequirement)}
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(formData.requirements || []).map((req, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="pl-2 pr-1 py-1 flex items-center gap-1"
                      >
                        {req}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20 rounded-full"
                          onClick={() => removeItem("requirements", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {!(formData.requirements || []).length && (
                      <p className="text-sm text-muted-foreground">
                        No requirements added yet
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Responsibilities *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      placeholder="Add a responsibility..."
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        addItem("responsibilities", newResponsibility)
                      }
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(formData.responsibilities || []).map((resp, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="pl-2 pr-1 py-1 flex items-center gap-1"
                      >
                        {resp}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20 rounded-full"
                          onClick={() => removeItem("responsibilities", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {!(formData.responsibilities || []).length && (
                      <p className="text-sm text-muted-foreground">
                        No responsibilities added yet
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label>Qualifications *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newQualification}
                      onChange={(e) => setNewQualification(e.target.value)}
                      placeholder="Add a qualification..."
                    />
                    <Button
                      type="button"
                      onClick={() =>
                        addItem("qualifications", newQualification)
                      }
                      size="icon"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {(formData.qualifications || []).map((qual, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="pl-2 pr-1 py-1 flex items-center gap-1"
                      >
                        {qual}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20 rounded-full"
                          onClick={() => removeItem("qualifications", index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                    {!(formData.qualifications || []).length && (
                      <p className="text-sm text-muted-foreground">
                        No qualifications added yet
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Career Position Preview</CardTitle>
                <CardDescription>
                  Publish your career position when you're ready
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 mb-4">
                  <h3 className="font-medium text-lg">
                    {formData.title || "Job Title"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {formData.department && (
                      <Badge variant="outline">
                        <Building className="h-3 w-3 mr-1" />
                        {formData.department}
                      </Badge>
                    )}
                    {formData.location && (
                      <Badge variant="outline">
                        <MapPin className="h-3 w-3 mr-1" />
                        {formData.location}
                      </Badge>
                    )}
                    {formData.type && (
                      <Badge variant="outline">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {formData.type}
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="mb-2 text-sm text-muted-foreground">
                    Status
                  </div>
                  <Badge
                    variant={
                      formData.status === "Open"
                        ? "default"
                        : formData.status === "Draft"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {formData.status}
                  </Badge>
                </div>

                {formData.deadline && (
                  <div>
                    <div className="mb-2 text-sm text-muted-foreground">
                      Deadline
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-primary" />
                      {formData.deadline}
                    </div>
                  </div>
                )}

                <Separator />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {mode === "create" ? "Creating..." : "Updating..."}
                    </>
                  ) : mode === "create" ? (
                    "Create Position"
                  ) : (
                    "Update Position"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CareerForm;
