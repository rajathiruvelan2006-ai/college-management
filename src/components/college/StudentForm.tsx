import { useState } from 'react';
import { UserPlus } from 'lucide-react';
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
import { Student } from '@/types/college';
import { toast } from 'sonner';

interface StudentFormProps {
  onAddStudent: (student: Omit<Student, 'id' | 'createdAt'>) => void;
}

const departments = [
  'Computer Science',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
  'Mathematics',
  'Physics',
  'Chemistry',
];

export function StudentForm({ onAddStudent }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    department: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.rollNumber || !formData.department || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    onAddStudent(formData);
    toast.success(`Student "${formData.name}" added successfully!`);
    
    // Reset form
    setFormData({
      name: '',
      rollNumber: '',
      department: '',
      email: '',
    });
  };

  return (
    <div className="form-section">
      <div className="flex items-center gap-2 mb-6">
        <UserPlus className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Add New Student</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter student name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rollNumber">Roll Number</Label>
            <Input
              id="rollNumber"
              placeholder="e.g., CS2024001"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={formData.department}
              onValueChange={(value) => setFormData({ ...formData, department: value })}
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="student@college.edu"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </form>
    </div>
  );
}
