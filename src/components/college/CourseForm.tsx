import { useState } from 'react';
import { BookPlus } from 'lucide-react';
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
import { Course } from '@/types/college';
import { toast } from 'sonner';

interface CourseFormProps {
  onAddCourse: (course: Omit<Course, 'id' | 'createdAt'>) => void;
}

const creditOptions = [1, 2, 3, 4, 5, 6];

export function CourseForm({ onAddCourse }: CourseFormProps) {
  const [formData, setFormData] = useState({
    courseName: '',
    courseCode: '',
    credits: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.courseName || !formData.courseCode || formData.credits === 0) {
      toast.error('Please fill in all fields');
      return;
    }

    onAddCourse(formData);
    toast.success(`Course "${formData.courseName}" added successfully!`);
    
    // Reset form
    setFormData({
      courseName: '',
      courseCode: '',
      credits: 0,
    });
  };

  return (
    <div className="form-section">
      <div className="flex items-center gap-2 mb-6">
        <BookPlus className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">Add New Course</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="courseName">Course Name</Label>
            <Input
              id="courseName"
              placeholder="e.g., Data Structures"
              value={formData.courseName}
              onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="courseCode">Course Code</Label>
            <Input
              id="courseCode"
              placeholder="e.g., CS201"
              value={formData.courseCode}
              onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credits">Credits</Label>
            <Select
              value={formData.credits.toString()}
              onValueChange={(value) => setFormData({ ...formData, credits: parseInt(value) })}
            >
              <SelectTrigger id="credits">
                <SelectValue placeholder="Select credits" />
              </SelectTrigger>
              <SelectContent>
                {creditOptions.map((credit) => (
                  <SelectItem key={credit} value={credit.toString()}>
                    {credit} {credit === 1 ? 'Credit' : 'Credits'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90 text-accent-foreground">
          <BookPlus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </form>
    </div>
  );
}
