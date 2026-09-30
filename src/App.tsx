import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/layout/GlobalSearchModal';
import { ToastContainer } from './components/common/Toast';
import { AIAssistantModal } from './components/ai/AIAssistantModal';

// Views
import { LandingPage } from './views/LandingPage';
import { StudentDashboard } from './views/student/StudentDashboard';
import { StudentAttendance } from './views/student/StudentAttendance';
import { StudentCourses } from './views/student/StudentCourses';
import { StudentAssignments } from './views/student/StudentAssignments';
import { StudentLibrary } from './views/student/StudentLibrary';
import { StudentDocuments } from './views/student/StudentDocuments';
import { StudentEvents } from './views/student/StudentEvents';
import { StudentCalendar } from './views/student/StudentCalendar';
import { StudentMap } from './views/student/StudentMap';
import { StudentHelpdesk } from './views/student/StudentHelpdesk';
import { StudentProfile } from './views/student/StudentProfile';

import { FacultyDashboard } from './views/faculty/FacultyDashboard';
import { FacultyAttendanceManager } from './views/faculty/FacultyAttendanceManager';
import { FacultyAssignments } from './views/faculty/FacultyAssignments';
import { FacultyLibraryManager } from './views/faculty/FacultyLibraryManager';
import { FacultyEvents } from './views/faculty/FacultyEvents';
import { FacultyCalendarManager } from './views/faculty/FacultyCalendarManager';
import { FacultyProfile } from './views/faculty/FacultyProfile';

const AppContent: React.FC = () => {
  const { isLoggedIn, role, currentRoute, navigate, showToast } = useApp();

  // Route security & RBAC guard
  useEffect(() => {
    if (!isLoggedIn) {
      if (currentRoute !== '/' && currentRoute !== '/login') {
        navigate('/');
      }
      return;
    }

    // Role-based restrictions
    if (role === 'student' && currentRoute.startsWith('/faculty')) {
      showToast('Restricted Access', 'Faculty authorization required for this portal.', 'warning');
      navigate('/student-dashboard');
    } else if (role === 'faculty' && currentRoute === '/student/documents') {
      showToast('Student Private Vault', 'Faculty cannot view private student identity documents.', 'warning');
      navigate('/faculty-dashboard');
    }
  }, [isLoggedIn, role, currentRoute, navigate, showToast]);

  // If not logged in, render public Landing Page
  if (!isLoggedIn || currentRoute === '/' || currentRoute === '/login') {
    return (
      <>
        <LandingPage />
        <ToastContainer />
      </>
    );
  }

  // Router Dispatcher
  const renderCurrentView = () => {
    switch (currentRoute) {
      // Student Routes
      case '/student-dashboard':
        return <StudentDashboard />;
      case '/student/attendance':
        return <StudentAttendance />;
      case '/student/courses':
        return <StudentCourses />;
      case '/student/assignments':
        return <StudentAssignments />;
      case '/student/library':
        return <StudentLibrary />;
      case '/student/documents':
        return <StudentDocuments />;
      case '/student/events':
        return <StudentEvents />;
      case '/student/calendar':
        return <StudentCalendar />;
      case '/student/map':
        return <StudentMap />;
      case '/student/helpdesk':
        return <StudentHelpdesk />;
      case '/student/profile':
      case '/student/settings':
        return <StudentProfile />;

      // Faculty Routes
      case '/faculty-dashboard':
        return <FacultyDashboard />;
      case '/faculty/attendance':
        return <FacultyAttendanceManager />;
      case '/faculty/assignments':
        return <FacultyAssignments />;
      case '/faculty/library':
        return <FacultyLibraryManager />;
      case '/faculty/events':
        return <FacultyEvents />;
      case '/faculty/calendar':
        return <FacultyCalendarManager />;
      case '/faculty/map':
        return <StudentMap />;
      case '/faculty/helpdesk':
        return <StudentHelpdesk />;
      case '/faculty/profile':
      case '/faculty/settings':
        return <FacultyProfile />;

      default:
        return role === 'student' ? <StudentDashboard /> : <FacultyDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navigation Bar */}
      <Navbar />

      {/* Main Workspace: Sidebar + Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Overlays */}
      <GlobalSearchModal />
      <AIAssistantModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
