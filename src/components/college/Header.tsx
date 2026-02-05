import { GraduationCap } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'students', label: 'Students' },
  { id: 'courses', label: 'Courses' },
  { id: 'attendance', label: 'Attendance' },
];

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="bg-primary p-1 rounded-lg flex items-center justify-center">
              <img src="/LOGO.png" alt="PSREC Logo" className="h-8 w-8 object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">PSREC</h1>
              <p className="text-xs text-muted-foreground">Academic Administration</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`nav-item ${
                  activeTab === tab.id ? 'nav-item-active' : 'nav-item-inactive'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
