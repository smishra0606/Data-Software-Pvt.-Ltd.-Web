
import React, { useState } from "react";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, User, Mail, Phone, Calendar, FileText, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import FileViewer from "./FileViewer";

const UserManagement = () => {
  const { getUsers } = useAdminUsers();
  const { data: usersResponse, isLoading } = getUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleViewUser = (user) => {
    setSelectedUser(user);
  };

  const closeUserDialog = () => {
    setSelectedUser(null);
  };

  // Filter users based on search term
  const filteredUsers = usersResponse?.data?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm))
  );

  // Helper function to extract file name from URL
  const getFileNameFromUrl = (url) => {
    if (!url) return "File";
    try {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1] || "File";
    } catch (e) {
      return "File";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers && filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage
                              src={user.profileImage || ""}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone || "Not provided"}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === "admin" ? "default" : "outline"}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.createdAt
                          ? format(new Date(user.createdAt), "MMM d, yyyy")
                          : "Unknown"}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewUser(user)}
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      {searchTerm
                        ? "No users found matching your search."
                        : "No users found in the system."}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* User Profile Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={closeUserDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              Detailed information about the selected user.
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={selectedUser.profileImage || ""}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {selectedUser.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="mr-2 h-4 w-4" />
                    {selectedUser.email}
                  </div>
                  {selectedUser.phone && (
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      {selectedUser.phone}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Basic Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Role</span>
                      <Badge variant={selectedUser.role === "admin" ? "default" : "outline"}>
                        {selectedUser.role}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Member since</span>
                      <span>
                        {selectedUser.createdAt
                          ? format(new Date(selectedUser.createdAt), "MMMM d, yyyy")
                          : "Unknown"}
                      </span>
                    </div>
                    {selectedUser.preferences && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Preferences</span>
                        <span>{selectedUser.preferences}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Activity Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Enrolled Courses</span>
                      <span>{selectedUser.enrolledCourses?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Applied Internships</span>
                      <span>{selectedUser.appliedInternships?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Career Applications</span>
                      <span>{selectedUser.appliedCareers?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Certificates</span>
                      <span>{selectedUser.certificates?.length || 0}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificate Section */}
              {selectedUser.certificates?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Certificates</h4>
                  <div className="space-y-2">
                    {selectedUser.certificates.map((cert) => (
                      <div key={cert._id || cert.certificateId} className="border rounded-md p-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">{cert.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Issued: {cert.issueDate ? format(new Date(cert.issueDate), "MMM d, yyyy") : "Unknown"}
                            </div>
                          </div>
                          
                          {cert.certificateUrl && (
                            <FileViewer
                              fileUrl={cert.certificateUrl}
                              fileName={cert.title || "Certificate"}
                              publicId={cert.publicId}
                              fileType="pdf"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Application History */}
              {(selectedUser.appliedInternships?.length > 0 || selectedUser.appliedCareers?.length > 0) && (
                <div>
                  <h4 className="font-medium mb-2">Application History</h4>
                  
                  {selectedUser.appliedInternships?.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium mb-2">Internships</h5>
                      <div className="space-y-2">
                        {selectedUser.appliedInternships.map((app) => (
                          <div key={app._id} className="border rounded-md p-2">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-medium">{app.internship?.title || "Unknown Internship"}</span>
                                <div className="text-sm text-muted-foreground">
                                  Applied: {app.appliedDate ? format(new Date(app.appliedDate), "MMM d, yyyy") : "Unknown"}
                                </div>
                              </div>
                              <Badge variant={
                                app.status === "Accepted" ? "success" :
                                app.status === "Rejected" ? "destructive" :
                                app.status === "In Review" ? "warning" : "outline"
                              }>
                                {app.status}
                              </Badge>
                            </div>
                            
                            {app.resume && (
                              <div className="mt-2">
                                <FileViewer
                                  fileUrl={app.resume}
                                  fileName={app.resumeFileName || getFileNameFromUrl(app.resume)}
                                  publicId={app.resumePublicId}
                                  fileType="document"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedUser.appliedCareers?.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium mb-2">Careers</h5>
                      <div className="space-y-2">
                        {selectedUser.appliedCareers.map((app) => (
                          <div key={app._id} className="border rounded-md p-2">
                            <div className="flex justify-between items-center mb-2">
                              <div>
                                <span className="font-medium">{app.career?.title || "Unknown Position"}</span>
                                <div className="text-sm text-muted-foreground">
                                  Applied: {app.appliedDate ? format(new Date(app.appliedDate), "MMM d, yyyy") : "Unknown"}
                                </div>
                              </div>
                              <Badge variant={
                                app.status === "Hired" ? "success" :
                                app.status === "Rejected" ? "destructive" :
                                app.status === "Shortlisted" ? "warning" : "outline"
                              }>
                                {app.status}
                              </Badge>
                            </div>
                            
                            {app.resume && (
                              <div className="mt-2">
                                <FileViewer
                                  fileUrl={app.resume}
                                  fileName={app.resumeFileName || getFileNameFromUrl(app.resume)}
                                  publicId={app.resumePublicId}
                                  fileType="document"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
