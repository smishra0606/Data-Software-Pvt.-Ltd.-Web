
export interface Course {
  _id?: string;  // MongoDB uses _id instead of id
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration: string;
  rating: number;
  studentsEnrolled: number;
  featured: boolean;
  lessons: number;
  modules: number;
  lastUpdated: string;
  instructor: Instructor;
  learningOutcomes: string[];
  curriculum: Module[];
  status?: 'draft' | 'published' | 'archived';
  enrollmentCount?: number;
  completionRate?: number;
  createdAt?: string;
}

export interface Instructor {
  name: string;
  title: string;
  bio: string;
  avatar: string;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export interface Lesson {
  title: string;
  duration: string;
  videoUrl?: string;
  completed?: boolean;
}
