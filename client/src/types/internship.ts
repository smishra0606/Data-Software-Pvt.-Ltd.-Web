
export interface Internship {
  id?: string;
  _id?: string; // MongoDB id field
  title: string;
  company: string;
  description: string;
  requirements: string[];
  duration: string;
  positions: number;
  applications: number;
  status: "Active" | "Upcoming" | "Closed";
  location: string;
  remote: boolean;
  stipend?: string;
  startDate: string;
  endDate: string;
  skills: string[];
  createdAt?: string;
  updatedAt?: string;
  registeredStudents?: string[];
}

export interface InternshipApplication {
  id?: string;
  _id?: string; // MongoDB id field
  internshipId?: string;
  internship?: string | Internship; // Can be either the ID or the populated object
  userId?: string;
  user?: any; // User object when populated
  status: 'Applied' | 'In Review' | 'Accepted' | 'Rejected';
  appliedDate: string;
  resume: string;
  coverLetter?: string;
  updatedAt?: string;
}
