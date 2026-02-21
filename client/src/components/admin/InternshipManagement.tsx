import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Check,
  X,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { format } from "date-fns";
import { useInternships } from "@/hooks/useInternships";
import { useAdminManagement } from "@/hooks/useAdminManagement";

const InternshipManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<string | null>(
    null
  );

  const { getInternships, deleteInternship } = useInternships();
  const { getInternshipApplications, updateApplicationStatus } =
    useAdminManagement();

  const { data: internshipsData, isLoading: internshipsLoading } =
    getInternships();
  const { data: applicationsData, isLoading: applicationsLoading } =
    getInternshipApplications();

  const deleteInternshipMutation = deleteInternship();
  const updateStatusMutation = updateApplicationStatus();

  const filteredInternships =
    internshipsData?.data.filter((internship) => {
      const matchesSearch =
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase());

      if (activeTab === "all") return matchesSearch;
      if (activeTab === "active")
        return matchesSearch && internship.status === "Active";
      if (activeTab === "closed")
        return matchesSearch && internship.status === "Closed";
      if (activeTab === "upcoming")
        return matchesSearch && internship.status === "Upcoming";

      return matchesSearch;
    }) || [];

  const handleDeleteInternship = async () => {
    if (!selectedInternship) return;

    try {
      await deleteInternshipMutation.mutateAsync(selectedInternship);
      toast.success("Internship deleted successfully");
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete internship");
    }
  };

  const handleUpdateStatus = async (applicationId: string, status: string) => {
    try {
      await updateStatusMutation.mutateAsync({ applicationId, status });
      toast.success(`Application status updated to ${status}`);
    } catch (error) {
      toast.error("Failed to update application status");
    }
  };
 
  if (internshipsLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 gl-container">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Internships</h2>
        <Button onClick={() => navigate("/admin/internships/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create Internship
        </Button>
      </div>

      <Tabs defaultValue="internships" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="internships">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>All Internships</CardTitle>
                  <CardDescription>
                    Manage internship listings and view applications
                  </CardDescription>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      className="pl-10 w-full md:w-[200px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <Tabs
                    defaultValue="all"
                    className="w-full md:w-auto"
                    onValueChange={setActiveTab}
                  >
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      <TabsTrigger value="active">Active</TabsTrigger>
                      <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                      <TabsTrigger value="closed">Closed</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInternships.length > 0 ? (
                    filteredInternships.map((internship) => (
                      <TableRow key={internship.id}>
                        <TableCell className="font-medium">
                          {internship.title}
                        </TableCell>
                        <TableCell>{internship.company}</TableCell>
                        <TableCell>{internship.duration}</TableCell>
                        <TableCell>{internship.applications}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              internship.status === "Active"
                                ? "default"
                                : internship.status === "Upcoming"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {internship.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                navigate(`/internships/${internship.id}`)
                              }
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                navigate(
                                  `/admin/internships/edit/${internship.id}`
                                )
                              }
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedInternship(internship.id);
                                setDeleteDialogOpen(true);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-6">
                        No internships found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
              <CardDescription>
                Review and manage internship applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              {applicationsLoading ? (
                <div className="flex justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Internship</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Resume</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationsData?.data &&
                    applicationsData.data.length > 0 ? (
                      applicationsData.data.map((application) => (
                        <TableRow key={application._id}>
                          <TableCell className="font-medium">
                            {application.userName}
                          </TableCell>
                          <TableCell>{application.internshipTitle}</TableCell>
                          <TableCell>
                            {format(
                              new Date(application.appliedDate),
                              "MMM d, yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                application.status === "Accepted"
                                  ? "default"
                                  : application.status === "Rejected"
                                  ? "destructive"
                                  : application.status === "In Review"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {application.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" asChild>
                              <a
                                href={application.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="h-4 w-4 mr-1" />
                                Download
                              </a>
                            </Button>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Update Status
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      application._id,
                                      "In Review"
                                    )
                                  }
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Mark as In Review
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      application._id,
                                      "Accepted"
                                    )
                                  }
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Accept Application
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleUpdateStatus(
                                      application._id,
                                      "Rejected"
                                    )
                                  }
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Reject Application
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-6">
                          No applications found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Internship</DialogTitle>
          </DialogHeader>
          <p className="py-4">
            Are you sure you want to delete this internship? This action cannot
            be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteInternship}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InternshipManagement;
