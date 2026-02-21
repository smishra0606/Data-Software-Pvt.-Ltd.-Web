
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Loader2,
  User,
  Mail,
  Save,
  Camera,
  Key,
  Lock,
  FileText,
  Phone,
  Settings,
  XCircle,
  Check,
  Edit,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { getCroppedImg } from "@/utility/getCropedImage";
import ImageCropper from "@/components/Image/ImageCrop";

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferences: "",
    profileImage: "",
    role: "",
    bio: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        preferences: user?.preferences || "",
        profileImage: user?.profileImage || "",
        role: user?.role || "",
        bio: user?.bio || "",
      });
    }
  }, [user]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await api.put("/users/profile", formData);

      if ((response as any).success) {
        // Update the user in context
        updateUser({
          ...user,
          ...(response as any).data,
        });
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setIsCropping(true);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCropDone = async (imageSrc, croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setProfileImage(croppedImage);
      setImagePreview(URL.createObjectURL(croppedImage));
      setIsCropping(false);
      toast.success("Image cropped! Upload to save changes");
    } catch (error) {
      console.error("Error cropping image:", error);
      toast.error("Failed to crop image");
      setIsCropping(false);
    }
  };
  
  const cancelCropping = () => {
    setIsCropping(false);
    setProfileImage(null);
    setImagePreview(null);
  };
  
  const handleEdit = () => {
    // When editing, we want to go back to cropping with the existing image preview
    if (imagePreview) {
      setIsCropping(true);
    }
  };

  const uploadProfileImage = async () => {
    if (!profileImage) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", profileImage);

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if ((response as any).success) {
        // Update the user profile with the new image URL
        const imageUrl = (response as any).data.url;
        const result = await api.put("/users/updateUserProfile", {
          profileImage: imageUrl,
        });

        if ((result as any).success) {
          // Update local state and context
          setFormData((prev) => ({
            ...prev,
            profileImage: imageUrl,
          }));

          // Update the user in context
          updateUser({
            ...user,
            profileImage: imageUrl,
          });

          toast.success("Profile image updated successfully");
          setProfileImage(null);
          setImagePreview(null);
        }
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      toast.error("Failed to upload profile image");
    } finally {
      setUploadingImage(false);
    }
  };

  const updatePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await api.put("/users/password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      if ((response as any).success) {
        toast.success("Password updated successfully");
        setShowPasswordDialog(false);
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full gl-container max-w-4xl mx-auto space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </div>
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={imagePreview || formData?.profileImage}
                alt={user?.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {user?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <button
              className="absolute -bottom-2 right-0 border-2 bg-black p-2 flex justify-center items-center rounded-full"
              onClick={() => document.getElementById("profile-image")?.click()}
            >
              <Camera className="h-3 w-3" />
            </button>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </CardHeader>

        {imagePreview && !isCropping && (
          <div className="px-6 pt-2 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-sm text-muted-foreground truncate block">
                  New profile image selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleEdit}>
                  <Edit className="mr-2 h-4 w-4" />
                </button>

                <button
                  onClick={() => {
                    setProfileImage(null);
                    setImagePreview(null);
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                </button>
                <Button
                  size="sm"
                  onClick={uploadProfileImage}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Save Image
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}

        {isCropping && (
          <div className="px-6 pt-2 pb-4">
            <div className="mb-3 flex justify-between items-center">
              <h3 className="text-lg font-medium">Crop Your Profile Image</h3>
              <Button size="sm" variant="outline" onClick={cancelCropping}>
                <XCircle className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <ImageCropper
                imageSrc={profileImage}
                onCropDone={handleCropDone}
                setCroppedAreaPixels={setCroppedAreaPixels}
                croppedAreaPixels={croppedAreaPixels}
              />
            </div>
          </div>
        )}

        <Separator />

        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-5 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  disabled={true}
                  className="pl-10 bg-muted cursor-not-allowed"
                  required
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed. Please contact support if you need to
                  update your email.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferences">Preferences</Label>
              <div className="relative">
                <Settings className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="preferences"
                  name="preferences"
                  placeholder="Your learning/notification preferences"
                  value={formData.preferences}
                  onChange={handleChange}
                  className="pl-10 min-h-[80px]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={handleChange}
                  className="pl-10 min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPasswordDialog(true)}
              >
                <Key className="mr-2 h-4 w-4" />
              </Button>

              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Update your password to keep your account secure.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPasswordDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={updatePassword}>Update Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
