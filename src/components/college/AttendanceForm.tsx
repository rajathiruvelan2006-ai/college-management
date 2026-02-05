import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AttendanceFormProps {
  students: Array<{ id: string; name: string }>;
  courses: Array<{ id: string; name: string }>;
  onAddRecord: (record: {
    studentId: string;
    courseId: string;
    date: string;
    status: 'present' | 'absent' | 'late';
  }) => void;
}

export function AttendanceForm({
  students,
  courses,
  onAddRecord,
}: AttendanceFormProps) {
  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present' as 'present' | 'absent' | 'late',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.studentId && formData.courseId && formData.date && formData.status) {
      onAddRecord(formData);
      setFormData({
        studentId: '',
        courseId: '',
        date: new Date().toISOString().split('T')[0],
        status: 'present',
      });
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle>Record Attendance</CardTitle>
        <CardDescription>
          Mark student attendance for a course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="student">Student</Label>
              <Select
                value={formData.studentId}
                onValueChange={(value) =>
                  setFormData({ ...formData, studentId: value })
                }
              >
                <SelectTrigger id="student">
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select
                value={formData.courseId}
                onValueChange={(value) =>
                  setFormData({ ...formData, courseId: value })
                }
              >
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as 'present' | 'absent' | 'late',
                  })
                }
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Record Attendance
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
