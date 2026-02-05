// Type definitions for the College Management System

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  department: string;
  email: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  courseName: string;
  courseCode: string;
  credits: number;
  createdAt: Date;
}

export interface CollegeStats {
  totalStudents: number;
  totalCourses: number;
  departments: string[];
  totalCredits: number;
}
