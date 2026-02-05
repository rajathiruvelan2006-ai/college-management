import { Trash2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Course } from '@/types/college';
import { toast } from 'sonner';

interface CourseListProps {
  courses: Course[];
  onDeleteCourse: (id: string) => void;
}

export function CourseList({ courses, onDeleteCourse }: CourseListProps) {
  const handleDelete = (course: Course) => {
    onDeleteCourse(course.id);
    toast.success(`Course "${course.courseName}" removed`);
  };

  return (
    <div className="table-container">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <BookOpen className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">
          Available Courses ({courses.length})
        </h3>
      </div>

      {courses.length === 0 ? (
        <div className="p-8 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">No courses available yet</p>
          <p className="text-sm text-muted-foreground/70">
            Add your first course using the form above
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Name</TableHead>
                <TableHead>Course Code</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id} className="animate-fade-in">
                  <TableCell className="font-medium">{course.courseName}</TableCell>
                  <TableCell>
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-mono">
                      {course.courseCode}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-accent/10 text-accent px-2 py-1 rounded text-sm font-semibold">
                      {course.credits} {course.credits === 1 ? 'Credit' : 'Credits'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(course)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
