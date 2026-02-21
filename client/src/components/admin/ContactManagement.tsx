
import { useState } from "react";
import { Calendar, Search, Inbox, MoreVertical, Check, CheckCheck, RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useContact } from "@/hooks/useContact";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ContactSubmission = {
  _id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "responded";
};

const ContactManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const itemsPerPage = 10;

  const { getContactSubmissions, updateContactStatus } = useContact();
  const { data: contactData, isLoading, error, refetch } = getContactSubmissions;

  // Use real data if available, fall back to empty array
  const submissions: ContactSubmission[] = contactData?.data || [];

  // Filter submissions based on search term
  const filteredSubmissions = submissions.filter(
    (submission) =>
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (submission.company &&
        submission.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
      submission.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate submissions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubmissions = filteredSubmissions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);

  // Handle viewing a submission's details
  const handleViewSubmission = (submission: ContactSubmission) => {
    // If not already read, mark as read
    if (submission.status === "new") {
      updateContactStatus.mutate(
        { id: submission._id, status: "read" },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );
    }
    setSelectedSubmission(submission);
    setDetailsOpen(true);
  };

  // Handle updating a submission status
  const handleUpdateStatus = (id: string, status: "new" | "read" | "responded") => {
    updateContactStatus.mutate(
      { id, status },
      {
        onSuccess: () => {
          refetch();
          // If the submission being updated is currently selected, update its status in the state
          if (selectedSubmission && selectedSubmission._id === id) {
            setSelectedSubmission({
              ...selectedSubmission,
              status,
            });
          }
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Contact Submissions
          </h2>
          <p className="text-muted-foreground">
            Manage and respond to contact form submissions
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search submissions..."
              className="pl-8 w-full md:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => refetch()}
            title="Refresh submissions"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Contact Submissions</CardTitle>
          <CardDescription>
            {filteredSubmissions.length} total submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">Loading submissions...</div>
          ) : error ? (
            <div className="flex justify-center py-8 text-destructive">
              Error loading submissions. Please try again.
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No submissions found</h3>
              <p className="text-muted-foreground">
                {searchTerm
                  ? "Try a different search term"
                  : "Contact submissions will appear here"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSubmissions.map((submission) => (
                    <TableRow key={submission._id}>
                      <TableCell className="font-medium">
                        {submission.name}
                      </TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>
                        {submission.company || "Not provided"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          {format(
                            new Date(submission.createdAt),
                            "MMM dd, yyyy"
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            submission.status === "new"
                              ? "default"
                              : submission.status === "read"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {submission.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleViewSubmission(submission)}
                          >
                            <span className="sr-only">View</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(submission._id, "new")}
                                disabled={submission.status === "new"}
                              >
                                Mark as New
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(submission._id, "read")}
                                disabled={submission.status === "read"}
                              >
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Read
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleUpdateStatus(submission._id, "responded")}
                                disabled={submission.status === "responded"}
                              >
                                <CheckCheck className="mr-2 h-4 w-4" />
                                Mark as Responded
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => window.location.href = `mailto:${submission.email}?subject=Re: Your Contact Form Submission`}>
                                Reply via Email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        {totalPages > 1 && (
          <CardFooter className="flex justify-between items-center border-t px-6 py-4">
            <div className="text-sm text-muted-foreground">
              Showing {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredSubmissions.length)} of{" "}
              {filteredSubmissions.length}
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Contact Submission Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        {selectedSubmission && (
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Contact Submission Details</DialogTitle>
              <DialogDescription>
                Submitted on {format(new Date(selectedSubmission.createdAt), "MMMM dd, yyyy 'at' h:mm a")}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Status:</div>
                <div className="col-span-3">
                  <Badge
                    variant={
                      selectedSubmission.status === "new"
                        ? "default"
                        : selectedSubmission.status === "read"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {selectedSubmission.status}
                  </Badge>
                </div>
                <div className="col-span-1 font-medium">Name:</div>
                <div className="col-span-3">{selectedSubmission.name}</div>
                <div className="col-span-1 font-medium">Email:</div>
                <div className="col-span-3">
                  <a href={`mailto:${selectedSubmission.email}`} className="text-primary hover:underline">
                    {selectedSubmission.email}
                  </a>
                </div>
                <div className="col-span-1 font-medium">Company:</div>
                <div className="col-span-3">{selectedSubmission.company || "Not provided"}</div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Message:</h4>
                <div className="rounded-md bg-secondary/50 p-4 whitespace-pre-wrap">
                  {selectedSubmission.message}
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant={selectedSubmission.status === "responded" ? "outline" : "default"}
                  onClick={() => {
                    const mailtoUrl = `mailto:${selectedSubmission.email}?subject=Re: Your Contact Form Submission&body=Dear ${selectedSubmission.name},%0D%0A%0D%0AThank you for contacting us.%0D%0A%0D%0A`;
                    window.open(mailtoUrl, "_blank");
                    
                    // If not already responded, mark as responded
                    if (selectedSubmission.status !== "responded") {
                      handleUpdateStatus(selectedSubmission._id, "responded");
                    }
                  }}
                >
                  Respond via Email
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setDetailsOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ContactManagement;
