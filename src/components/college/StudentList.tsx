import { Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Student } from '@/types/college';
import { toast } from 'sonner';

interface StudentListProps {
  students: Student[];
  onDeleteStudent: (id: string) => void;
}

export function StudentList({ students, onDeleteStudent }: StudentListProps) {
  const handleDelete = (student: Student) => {
    onDeleteStudent(student.id);
    toast.success(`Student "${student.name}" removed`);
  };

  return (
    <div className="table-container">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <Users className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">
          Registered Students ({students.length})
        </h3>
      </div>

      {students.length === 0 ? (
        <div className="p-8 text-center">
          <Users className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">No students registered yet</p>
          <p className="text-sm text-muted-foreground/70">
            Add your first student using the form above
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll Number</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id} className="animate-fade-in">
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell>
                    <span className="bg-secondary px-2 py-1 rounded text-sm">
                      {student.rollNumber}
                    </span>
                  </TableCell>
                  <TableCell>{student.department}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.email}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(student)}
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
