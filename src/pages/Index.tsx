import { useState } from 'react';
import { Header } from '@/components/college/Header';
import { Dashboard } from '@/components/college/Dashboard';
import { StudentForm } from '@/components/college/StudentForm';
import { StudentList } from '@/components/college/StudentList';
import { CourseForm } from '@/components/college/CourseForm';
import { CourseList } from '@/components/college/CourseList';
import { AttendanceForm } from '@/components/college/AttendanceForm';
import { AttendanceList } from '@/components/college/AttendanceList';
import { useCollegeData } from '@/hooks/useCollegeData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [attendanceRecords, setAttendanceRecords] = useState<Array<{
    id: string;
    studentName: string;
    studentId: string;
    courseName: string;
    courseId: string;
    date: string;
    status: 'present' | 'absent' | 'late';
  }>>([]);
  const {
    students,
    courses,
    stats,
    addStudent,
    deleteStudent,
    addCourse,
    deleteCourse,
  } = useCollegeData();

  const handleAddAttendance = (record: {
    studentId: string;
    courseId: string;
    date: string;
    status: 'present' | 'absent' | 'late';
  }) => {
    const student = students.find((s) => s.id === record.studentId);
    const course = courses.find((c) => c.id === record.courseId);
    
    if (student && course) {
      const newRecord = {
        id: Date.now().toString(),
        studentName: student.name,
        studentId: record.studentId,
        courseName: course.courseName,
        courseId: record.courseId,
        date: record.date,
        status: record.status,
      };
      setAttendanceRecords([...attendanceRecords, newRecord]);
    }
  };

  const handleDeleteAttendance = (id: string) => {
    setAttendanceRecords(attendanceRecords.filter((record) => record.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && <Dashboard stats={stats} />}

        {activeTab === 'students' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Student Management</h2>
              <p className="text-muted-foreground mt-1">
                Add, view, and manage student records
              </p>
            </div>
            <StudentForm onAddStudent={addStudent} />
            <StudentList students={students} onDeleteStudent={deleteStudent} />
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Course Management</h2>
              <p className="text-muted-foreground mt-1">
                Add, view, and manage course offerings
              </p>
            </div>
            <CourseForm onAddCourse={addCourse} />
            <CourseList courses={courses} onDeleteCourse={deleteCourse} />
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Attendance Management</h2>
              <p className="text-muted-foreground mt-1">
                Record and track student attendance
              </p>
            </div>
            <AttendanceForm
              students={students}
              courses={courses.map((c) => ({ id: c.id, name: c.courseName }))}
              onAddRecord={handleAddAttendance}
            />
            <AttendanceList
              records={attendanceRecords}
              onDeleteRecord={handleDeleteAttendance}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-auto py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 College Management System. Built with React & Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
