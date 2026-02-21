
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Edit,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
  Eye,
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
import { format, isPast } from "date-fns";
import { useCareers } from "@/hooks/useCareers";
import { Career } from "@/types/career";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CareerManagement = () => {
  const navigate = useNavigate();
  const { getCareers, deleteCareer } = useCareers();
  const { data: careersData, isLoading } = getCareers();
  const deleteMutation = deleteCareer();

  const [searchTerm, setSearchTerm] = useState("");
  const [careerToDelete, setCareerToDelete] = useState<string | null>(null);

  const filteredCareers = careersData?.filter(
    (career: Career) =>
      career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      career.location.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleCreateCareer = () => {
    navigate("/admin/careers/create");
  };

  const handleEditCareer = (id: string) => {
    navigate(`/admin/careers/edit/${id}`);
  };

  const handleViewCareer = (id: string) => {
    navigate(`/careers/${id}`);
  };

  const handleViewApplicants = (id: string) => {
    navigate(`/admin/careers/${id}/applicants`);
  };

  const handleDeleteCareer = async () => {
    if (!careerToDelete) return;

    try {
      await deleteMutation.mutateAsync(careerToDelete);
      setCareerToDelete(null);
    } catch (error) {
      console.error("Error deleting career:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="gl-container  mx-auto ">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Careers</h1>
          <p className="text-muted-foreground">
            Create, edit and manage career positions
          </p>
        </div>
        <Button onClick={handleCreateCareer}>
          <Plus className="mr-2 h-4 w-4" />
          New Position
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Careers Overview</CardTitle>
          <CardDescription>
            Manage all career positions and applicants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-6">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search careers..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCareers.length > 0 ? (
                  filteredCareers.map((career: Career) => (
                    <TableRow key={career._id}>
                      <TableCell className="font-medium">
                        {career.title}
                      </TableCell>
                      <TableCell>{career.department}</TableCell>
                      <TableCell>{career.location}</TableCell>
                      <TableCell>{career.type}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            career.status === "Open" ? "default" : "secondary"
                          }
                        >
                          {career.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {format(new Date(career.deadline), "MMM d, yyyy")}
                        {isPast(new Date(career.deadline)) && (
                          <span className="text-red-500 ml-1">(Expired)</span>
                        )}
                      </TableCell>
                      <TableCell>{career.applicationCount}</TableCell>
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
                              onClick={() => handleViewCareer(career._id)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditCareer(career._id)}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleViewApplicants(career._id)}
                            >
                              <Users className="mr-2 h-4 w-4" />
                              Applicants ({career.applicationCount})
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => setCareerToDelete(career._id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-6">
                      <p className="text-muted-foreground">
                        {searchTerm
                          ? "No careers found matching your search term"
                          : "No career positions created yet"}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={handleCreateCareer}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Position
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog
        open={!!careerToDelete}
        onOpenChange={() => setCareerToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              career position and all associated applicant data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteCareer}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CareerManagement;
