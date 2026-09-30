import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  CalendarCheck,
  GraduationCap,
  FileText,
  BookOpen,
  ShieldCheck,
  Sparkles,
  Calendar,
  MapPin,
  LifeBuoy,
  Settings,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  FolderPlus,
  CalendarPlus,
  FileCheck2,
} from 'lucide-react';

interface NavItem {
  label: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC = () => {
  const {
    role,
    currentRoute,
    navigate,
    isSidebarCollapsed,
    toggleSidebar,
    assignments,
  } = useApp();

  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'pending').length;

  const studentNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/student-dashboard', icon: LayoutDashboard },
    { label: 'Attendance', route: '/student/attendance', icon: CalendarCheck },
    { label: 'Courses', route: '/student/courses', icon: GraduationCap },
    {
      label: 'Assignments',
      route: '/student/assignments',
      icon: FileText,
      badge: pendingAssignmentsCount > 0 ? `${pendingAssignmentsCount}` : undefined,
    },
    { label: 'E-Library', route: '/student/library', icon: BookOpen },
    { label: 'Document Vault', route: '/student/documents', icon: ShieldCheck },
    { label: 'Campus Events', route: '/student/events', icon: Sparkles },
    { label: 'Academic Calendar', route: '/student/calendar', icon: Calendar },
    { label: 'Campus Map', route: '/student/map', icon: MapPin },
    { label: 'Helpdesk', route: '/student/helpdesk', icon: LifeBuoy },
    { label: 'Settings', route: '/student/settings', icon: Settings },
  ];

  const facultyNavItems: NavItem[] = [
    { label: 'Dashboard', route: '/faculty-dashboard', icon: LayoutDashboard },
    { label: 'Attendance Manager', route: '/faculty/attendance', icon: UserCheck },
    { label: 'Assignments CMS', route: '/faculty/assignments', icon: FileCheck2 },
    { label: 'E-Library Manager', route: '/faculty/library', icon: FolderPlus },
    { label: 'Events Manager', route: '/faculty/events', icon: CalendarPlus },
    { label: 'Academic Calendar', route: '/faculty/calendar', icon: Calendar },
    { label: 'Campus Map', route: '/faculty/map', icon: MapPin },
    { label: 'Helpdesk', route: '/faculty/helpdesk', icon: LifeBuoy },
    { label: 'Settings', route: '/faculty/settings', icon: Settings },
  ];

  const navItems = role === 'student' ? studentNavItems : facultyNavItems;

  return (
    <aside
      className={`relative z-30 flex flex-col bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-r border-slate-200/80 dark:border-slate-800/80 transition-all duration-300 select-none ${
        isSidebarCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className={`px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${
          isSidebarCollapsed ? 'text-center' : ''
        }`}>
          {isSidebarCollapsed ? '•••' : role === 'student' ? 'Student Workspace' : 'Faculty Workspace'}
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.route;

          return (
            <button
              key={item.route}
              onClick={() => navigate(item.route)}
              title={isSidebarCollapsed ? item.label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
              } ${isSidebarCollapsed ? 'justify-center' : ''}`}
            >
              <Icon className={`w-4 h-4 shrink-0 transition-transform ${
                isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-500'
              }`} />

              {!isSidebarCollapsed && (
                <span className="truncate flex-1 text-left">{item.label}</span>
              )}

              {!isSidebarCollapsed && item.badge && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                  isActive
                    ? 'bg-white text-indigo-600'
                    : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Floating Tooltip when collapsed */}
              {isSidebarCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-lg shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  {item.label}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
        {!isSidebarCollapsed && (
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
              MPOnline Hackathon
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              v1.0 Demo Build
            </span>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mx-auto"
          aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
};
