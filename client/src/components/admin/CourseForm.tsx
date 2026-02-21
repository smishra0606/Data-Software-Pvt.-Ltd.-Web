
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Course } from "@/types/course";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Image, Loader2 } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";

const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  duration: z.string().min(1, "Duration is required"),
  thumbnail: z.string().url("Please provide a valid URL"),
  lessons: z.coerce.number().min(1, "Course must have at least 1 lesson"),
  modules: z.coerce.number().min(1, "Course must have at least 1 module"),
  featured: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface CourseFormProps {
  course?: Course;
  onSubmit: (data: Course) => void;
  isSubmitting?: boolean;
}

const CourseForm = ({ course, onSubmit, isSubmitting = false }: CourseFormProps) => {
  const isEditMode = !!course;
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { uploadCourseImage } = useCourses();
  const uploadMutation = uploadCourseImage();
  
  const defaultValues: Partial<CourseFormValues> = {
    title: course?.title || "",
    description: course?.description || "",
    category: course?.category || "",
    price: course?.price || 0,
    duration: course?.duration || "",
    thumbnail: course?.thumbnail || "",
    lessons: course?.lessons || 1,
    modules: course?.modules || 1,
    featured: course?.featured || false,
  };

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsUploading(true);
    
    try {
      const result = await uploadMutation.mutateAsync(file);
      if (result.success && result.data?.url) {
        setUploadedImage(result.data.url);
        form.setValue('thumbnail', result.data.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (data: CourseFormValues) => {
    // Create a new course object
    const newCourse: Course = {
      title: data.title,
      description: data.description,
      category: data.category,
      price: data.price,
      duration: data.duration,
      thumbnail: data.thumbnail,
      lessons: data.lessons,
      modules: data.modules,
      featured: data.featured,
      rating: course?.rating || 0,
      studentsEnrolled: course?.studentsEnrolled || 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      instructor: course?.instructor || {
        name: "John Doe",
        title: "Instructor",
        bio: "Experienced instructor with a passion for teaching.",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      },
      learningOutcomes: course?.learningOutcomes || [
        "Understand the fundamentals",
        "Build real-world projects",
        "Master advanced techniques",
      ],
      curriculum: course?.curriculum || [
        {
          title: "Introduction",
          lessons: [
            { title: "Getting Started", duration: "10 min" },
            { title: "Course Overview", duration: "15 min" },
          ],
        },
      ],
    };
    
    onSubmit(newCourse);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter course title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Web Development">Web Development</SelectItem>
                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Programming">Programming</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 8 weeks, 24 hours" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lessons"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Lessons</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="modules"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Modules</FormLabel>
                <FormControl>
                  <Input type="number" min="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Course Thumbnail</FormLabel>
                <div className="space-y-4">
                  <FormControl>
                    <Input placeholder="Enter thumbnail URL" {...field} />
                  </FormControl>
                  
                  <div className="flex flex-col gap-4">
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-4">
                      <label htmlFor="thumbnail-upload" className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <span className="text-sm text-muted-foreground">Click to upload an image</span>
                        <input
                          id="thumbnail-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                        />
                      </label>
                    </div>
                    
                    {(uploadedImage || field.value) && !isUploading && (
                      <div className="relative rounded-lg overflow-hidden border">
                        <img 
                          src={uploadedImage || field.value} 
                          alt="Course thumbnail preview" 
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm flex items-center">
                          <Image className="h-4 w-4 mr-2" />
                          Thumbnail Preview
                        </div>
                      </div>
                    )}
                    
                    {isUploading && (
                      <div className="h-48 border rounded-lg flex items-center justify-center">
                        <div className="flex flex-col items-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                          <span className="text-sm text-muted-foreground">Uploading image...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <FormDescription>
                    Upload an image or provide a URL for the course thumbnail
                  </FormDescription>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter course description" 
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="featured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <input
                    type="checkbox"
                    className="h-4 w-4 mt-1"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Featured Course</FormLabel>
                  <FormDescription>
                    Featured courses will be highlighted on the homepage
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting || isUploading}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditMode ? "Updating..." : "Creating..."}
              </>
            ) : (
              isEditMode ? "Update Course" : "Create Course"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CourseForm;
