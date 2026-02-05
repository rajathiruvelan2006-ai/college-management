import { Users, BookOpen, Building2, Award } from 'lucide-react';
import { CollegeStats } from '@/types/college';

interface DashboardProps {
  stats: CollegeStats;
}

export function Dashboard({ stats }: DashboardProps) {
  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: Users,
      description: 'Enrolled students',
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      description: 'Active courses',
    },
    {
      title: 'Departments',
      value: stats.departments.length,
      icon: Building2,
      description: 'Academic departments',
    },
    {
      title: 'Total Credits',
      value: stats.totalCredits,
      icon: Award,
      description: 'Credit hours offered',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <p className="text-muted-foreground mt-1">
          Overview of your college management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div
            key={stat.title}
            className="stat-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-foreground mt-2">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </div>
              <div className="bg-accent/10 p-3 rounded-xl">
                <stat.icon className="h-6 w-6 text-accent" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Departments List */}
      {stats.departments.length > 0 && (
        <div className="form-section">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Active Departments
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.departments.map((dept) => (
              <span
                key={dept}
                className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-section">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Getting Started
          </h3>
          <p className="text-muted-foreground text-sm">
            Use the Students and Courses tabs to manage your academic records.
            Add new entries, view existing data, and remove records as needed.
          </p>
        </div>
        <div className="form-section">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            System Status
          </h3>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 bg-success rounded-full animate-pulse"></span>
            <span className="text-sm text-muted-foreground">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
