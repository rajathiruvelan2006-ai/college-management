import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

interface AttendanceRecord {
  id: string;
  studentName: string;
  courseName: string;
  date: string;
  status: 'present' | 'absent' | 'late';
}

interface AttendanceListProps {
  records: AttendanceRecord[];
  onDeleteRecord: (id: string) => void;
}

export function AttendanceList({ records, onDeleteRecord }: AttendanceListProps) {
  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No attendance records found</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-800';
      case 'absent':
        return 'bg-red-100 text-red-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden animate-fade-in">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Student Name</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id} className="hover:bg-muted/50">
              <TableCell className="font-medium text-foreground">
                {record.studentName}
              </TableCell>
              <TableCell className="text-muted-foreground">{record.courseName}</TableCell>
              <TableCell className="text-muted-foreground">{record.date}</TableCell>
              <TableCell>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                  {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDeleteRecord(record.id)}
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
  );
}
