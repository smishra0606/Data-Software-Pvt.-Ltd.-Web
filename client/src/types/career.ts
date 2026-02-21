
export interface Career {
  _id: string;
  id?: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  qualifications: string[];
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote";
  salary?: string;
  positions: number;
  status: "Open" | "Closed" | "Draft";
  applicants: CareerApplicant[];
  applicationCount: number;
  postedDate: string;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface CareerApplicant {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    profileImage?: string;
  };
  resume: string;
  coverLetter?: string;
  appliedDate: string;
  status: "Applied" | "Under Review" | "Shortlisted" | "Rejected" | "Hired";
}

export interface CareerApplication {
  careerId: string;
  data: {
    resume: string;
    coverLetter?: string;
  };
}

export interface ApplicantStatusUpdate {
  careerId: string;
  applicantId: string;
  status: "Applied" | "Under Review" | "Shortlisted" | "Rejected" | "Hired";
}
