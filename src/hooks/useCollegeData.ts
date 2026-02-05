import { useState, useCallback } from 'react';
import { Student, Course, CollegeStats } from '@/types/college';

// Generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initial sample data
const initialStudents: Student[] = [
  {
    id: generateId(),
    name: 'Alice Johnson',
    rollNumber: 'CS2024001',
    department: 'Computer Science',
    email: 'alice.johnson@college.edu',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    name: 'Bob Smith',
    rollNumber: 'EE2024002',
    department: 'Electrical Engineering',
    email: 'bob.smith@college.edu',
    createdAt: new Date(),
  },
  {
    id: generateId(),
    name: 'Carol Davis',
    rollNumber: 'ME2024003',
    department: 'Mechanical Engineering',
    email: 'carol.davis@college.edu',
    createdAt: new Date(),
  },
];

const initialCourses: Course[] = [
  {
    id: generateId(),
    courseName: 'Data Structures',
    courseCode: 'CS201',
    credits: 4,
    createdAt: new Date(),
  },
  {
    id: generateId(),
    courseName: 'Digital Electronics',
    courseCode: 'EE101',
    credits: 3,
    createdAt: new Date(),
  },
  {
    id: generateId(),
    courseName: 'Thermodynamics',
    courseCode: 'ME301',
    credits: 4,
    createdAt: new Date(),
  },
];

export function useCollegeData() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [courses, setCourses] = useState<Course[]>(initialCourses);

  // Student CRUD operations
  const addStudent = useCallback((studentData: Omit<Student, 'id' | 'createdAt'>) => {
    const newStudent: Student = {
      ...studentData,
      id: generateId(),
      createdAt: new Date(),
    };
    setStudents((prev) => [...prev, newStudent]);
    return newStudent;
  }, []);

  const deleteStudent = useCallback((id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  }, []);

  // Course CRUD operations
  const addCourse = useCallback((courseData: Omit<Course, 'id' | 'createdAt'>) => {
    const newCourse: Course = {
      ...courseData,
      id: generateId(),
      createdAt: new Date(),
    };
    setCourses((prev) => [...prev, newCourse]);
    return newCourse;
  }, []);

  const deleteCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  }, []);

  // Calculate statistics
  const stats: CollegeStats = {
    totalStudents: students.length,
    totalCourses: courses.length,
    departments: [...new Set(students.map((s) => s.department))],
    totalCredits: courses.reduce((sum, c) => sum + c.credits, 0),
  };

  return {
    students,
    courses,
    stats,
    addStudent,
    deleteStudent,
    addCourse,
    deleteCourse,
  };
}
