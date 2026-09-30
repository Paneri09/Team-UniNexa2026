import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  StudentProfile,
  FacultyProfile,
  SubjectAttendance,
  SubjectCourse,
  Assignment,
  LibraryItem,
  DocumentRecord,
  CampusEvent,
  CalendarEvent,
  SupportTicket,
  Notification,
  StudentAttendanceEntry,
} from '../types';
import {
  DEMO_STUDENT_ECE,
  DEMO_STUDENT_ECS,
  INITIAL_FACULTY,
  ECE_COURSES,
  ECS_COURSES,
  ECE_SUBJECT_ATTENDANCE,
  ECS_SUBJECT_ATTENDANCE,
  ECE_ASSIGNMENTS,
  ECS_ASSIGNMENTS,
  ECE_LIBRARY_ITEMS,
  ECS_LIBRARY_ITEMS,
  ECE_DOCUMENTS,
  ECS_DOCUMENTS,
  ECE_NOTIFICATIONS,
  ECS_NOTIFICATIONS,
  INITIAL_EVENTS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_TICKETS,
  INITIAL_SECTION_STUDENTS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Auth & Session
  role: Role;
  isLoggedIn: boolean;
  selectedStudentId: string;
  student: StudentProfile;
  faculty: FacultyProfile;
  currentRoute: string;
  theme: 'light' | 'dark';
  isSidebarCollapsed: boolean;
  isSearchOpen: boolean;
  isAiOpen: boolean;
  toasts: ToastMessage[];

  // App Data
  courses: SubjectCourse[];
  subjectAttendance: SubjectAttendance[];
  assignments: Assignment[];
  libraryItems: LibraryItem[];
  documents: DocumentRecord[];
  events: CampusEvent[];
  calendarEvents: CalendarEvent[];
  tickets: SupportTicket[];
  notifications: Notification[];
  sectionStudents: StudentAttendanceEntry[];

  // Actions
  login: (role: Role, studentId?: string) => void;
  logout: () => void;
  navigate: (route: string) => void;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setIsSearchOpen: (open: boolean) => void;
  setIsAiOpen: (open: boolean) => void;
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  selectDemoStudent: (studentId: string) => void;

  // Domain Actions (RBAC Synchronized)
  updateStudentAttendanceStatus: (studentId: string, status: 'present' | 'absent') => void;
  markAllSectionPresent: () => void;
  saveFacultyAttendanceSession: (subjectName: string, date: string) => void;
  createAssignment: (newAssignment: Omit<Assignment, 'id' | 'status' | 'assignedDate'>) => void;
  submitAssignment: (assignmentId: string, note?: string) => void;
  uploadLibraryItem: (newItem: Omit<LibraryItem, 'id' | 'uploadedDate' | 'downloads'>) => void;
  registerForEvent: (eventId: string) => void;
  createCampusEvent: (newEvent: Omit<CampusEvent, 'id' | 'registeredCount' | 'isCompleted'>) => void;
  addCalendarEvent: (event: Omit<CalendarEvent, 'id'>) => void;
  deleteCalendarEvent: (id: string) => void;
  createSupportTicket: (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt' | 'updatedAt' | 'studentName' | 'studentId'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'nexaone_vikram_uni_v2';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getSaved = (key: string, fallback: any) => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_${key}`);
      return saved ? JSON.parse(saved) : fallback;
    } catch {
      return fallback;
    }
  };

  const [role, setRole] = useState<Role>(() => getSaved('role', 'student'));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getSaved('isLoggedIn', false));
  const [selectedStudentId, setSelectedStudentId] = useState<string>(() =>
    getSaved('selectedStudentId', 'VU26ECE014')
  );

  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return getSaved('currentRoute', '/');
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return getSaved('theme', 'dark');
  });

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Students registry
  const [eceStudent, setEceStudent] = useState<StudentProfile>(() =>
    getSaved('eceStudent', DEMO_STUDENT_ECE)
  );
  const [ecsStudent, setEcsStudent] = useState<StudentProfile>(() =>
    getSaved('ecsStudent', DEMO_STUDENT_ECS)
  );

  const [faculty] = useState<FacultyProfile>(INITIAL_FACULTY);

  // Per-branch state
  const [eceAttendance, setEceAttendance] = useState<SubjectAttendance[]>(() =>
    getSaved('eceAttendance', ECE_SUBJECT_ATTENDANCE)
  );
  const [ecsAttendance, setEcsAttendance] = useState<SubjectAttendance[]>(() =>
    getSaved('ecsAttendance', ECS_SUBJECT_ATTENDANCE)
  );

  const [eceAssignments, setEceAssignments] = useState<Assignment[]>(() =>
    getSaved('eceAssignments', ECE_ASSIGNMENTS)
  );
  const [ecsAssignments, setEcsAssignments] = useState<Assignment[]>(() =>
    getSaved('ecsAssignments', ECS_ASSIGNMENTS)
  );

  const [eceLibrary, setEceLibrary] = useState<LibraryItem[]>(() =>
    getSaved('eceLibrary', ECE_LIBRARY_ITEMS)
  );
  const [ecsLibrary, setEcsLibrary] = useState<LibraryItem[]>(() =>
    getSaved('ecsLibrary', ECS_LIBRARY_ITEMS)
  );

  const [eceDocuments, setEceDocuments] = useState<DocumentRecord[]>(() =>
    getSaved('eceDocuments', ECE_DOCUMENTS)
  );
  const [ecsDocuments, setEcsDocuments] = useState<DocumentRecord[]>(() =>
    getSaved('ecsDocuments', ECS_DOCUMENTS)
  );

  const [eceNotifications, setEceNotifications] = useState<Notification[]>(() =>
    getSaved('eceNotifications', ECE_NOTIFICATIONS)
  );
  const [ecsNotifications, setEcsNotifications] = useState<Notification[]>(() =>
    getSaved('ecsNotifications', ECS_NOTIFICATIONS)
  );

  // Common campus resources
  const [events, setEvents] = useState<CampusEvent[]>(() =>
    getSaved('events', INITIAL_EVENTS)
  );
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() =>
    getSaved('calendarEvents', INITIAL_CALENDAR_EVENTS)
  );
  const [tickets, setTickets] = useState<SupportTicket[]>(() =>
    getSaved('tickets', INITIAL_TICKETS)
  );
  const [sectionStudents, setSectionStudents] = useState<StudentAttendanceEntry[]>(() =>
    getSaved('sectionStudents', INITIAL_SECTION_STUDENTS)
  );

  // Dynamic values resolved by current selected student
  const isEcs = selectedStudentId === 'VU26ECS021';
  const student = isEcs ? ecsStudent : eceStudent;
  const courses = isEcs ? ECS_COURSES : ECE_COURSES;
  const subjectAttendance = isEcs ? ecsAttendance : eceAttendance;
  const assignments = isEcs ? ecsAssignments : eceAssignments;
  const libraryItems = isEcs ? ecsLibrary : eceLibrary;
  const documents = isEcs ? ecsDocuments : eceDocuments;
  const notifications = isEcs ? ecsNotifications : eceNotifications;

  // Synchronize theme
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem(`${STORAGE_KEY}_theme`, JSON.stringify(theme));
  }, [theme]);

  // Persist critical state
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_role`, JSON.stringify(role));
    localStorage.setItem(`${STORAGE_KEY}_isLoggedIn`, JSON.stringify(isLoggedIn));
    localStorage.setItem(`${STORAGE_KEY}_selectedStudentId`, JSON.stringify(selectedStudentId));
    localStorage.setItem(`${STORAGE_KEY}_currentRoute`, JSON.stringify(currentRoute));
    localStorage.setItem(`${STORAGE_KEY}_eceStudent`, JSON.stringify(eceStudent));
    localStorage.setItem(`${STORAGE_KEY}_ecsStudent`, JSON.stringify(ecsStudent));
    localStorage.setItem(`${STORAGE_KEY}_eceAttendance`, JSON.stringify(eceAttendance));
    localStorage.setItem(`${STORAGE_KEY}_ecsAttendance`, JSON.stringify(ecsAttendance));
    localStorage.setItem(`${STORAGE_KEY}_eceAssignments`, JSON.stringify(eceAssignments));
    localStorage.setItem(`${STORAGE_KEY}_ecsAssignments`, JSON.stringify(ecsAssignments));
    localStorage.setItem(`${STORAGE_KEY}_eceLibrary`, JSON.stringify(eceLibrary));
    localStorage.setItem(`${STORAGE_KEY}_ecsLibrary`, JSON.stringify(ecsLibrary));
    localStorage.setItem(`${STORAGE_KEY}_eceDocuments`, JSON.stringify(eceDocuments));
    localStorage.setItem(`${STORAGE_KEY}_ecsDocuments`, JSON.stringify(ecsDocuments));
    localStorage.setItem(`${STORAGE_KEY}_eceNotifications`, JSON.stringify(eceNotifications));
    localStorage.setItem(`${STORAGE_KEY}_ecsNotifications`, JSON.stringify(ecsNotifications));
    localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
    localStorage.setItem(`${STORAGE_KEY}_calendarEvents`, JSON.stringify(calendarEvents));
    localStorage.setItem(`${STORAGE_KEY}_tickets`, JSON.stringify(tickets));
    localStorage.setItem(`${STORAGE_KEY}_sectionStudents`, JSON.stringify(sectionStudents));
  }, [
    role,
    isLoggedIn,
    selectedStudentId,
    currentRoute,
    eceStudent,
    ecsStudent,
    eceAttendance,
    ecsAttendance,
    eceAssignments,
    ecsAssignments,
    eceLibrary,
    ecsLibrary,
    eceDocuments,
    ecsDocuments,
    eceNotifications,
    ecsNotifications,
    events,
    calendarEvents,
    tickets,
    sectionStudents,
  ]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const selectDemoStudent = (id: string) => {
    setSelectedStudentId(id);
    const chosen = id === 'VU26ECS021' ? DEMO_STUDENT_ECS : DEMO_STUDENT_ECE;
    showToast(
      `Demo Profile Switched`,
      `Active: ${chosen.name} (${chosen.branch} · ${chosen.identifier})`,
      'success'
    );
  };

  const login = (newRole: Role, studentIdChoice?: string) => {
    setRole(newRole);
    if (newRole === 'student') {
      const activeId = studentIdChoice || selectedStudentId;
      setSelectedStudentId(activeId);
      const chosen = activeId === 'VU26ECS021' ? ecsStudent : eceStudent;
      setIsLoggedIn(true);
      setCurrentRoute('/student-dashboard');
      showToast(
        `Welcome to Vikram University`,
        `Logged in as ${chosen.name} (${chosen.branch})`,
        'success'
      );
    } else {
      setIsLoggedIn(true);
      setCurrentRoute('/faculty-dashboard');
      showToast(
        `Welcome to Vikram University`,
        `Logged in as ${faculty.name} (FACULTY)`,
        'success'
      );
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentRoute('/');
    showToast('Signed out', 'Session closed successfully', 'info');
  };

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  // Faculty marks student attendance
  const updateStudentAttendanceStatus = (studentId: string, status: 'present' | 'absent') => {
    setSectionStudents((prev) =>
      prev.map((s) => (s.studentId === studentId ? { ...s, status } : s))
    );
  };

  const markAllSectionPresent = () => {
    setSectionStudents((prev) => prev.map((s) => ({ ...s, status: 'present' })));
    showToast('Marked All Present', 'All students set to present for this session', 'info');
  };

  const saveFacultyAttendanceSession = (subjectName: string, date: string) => {
    // Check Aarav status
    const aaravEntry = sectionStudents.find((s) => s.studentId === 'VU26ECE014');
    const wasAaravPresent = aaravEntry ? aaravEntry.status === 'present' : true;

    // Check Ananya status
    const ananyaEntry = sectionStudents.find((s) => s.studentId === 'VU26ECS021');
    const wasAnanyaPresent = ananyaEntry ? ananyaEntry.status === 'present' : true;

    // Update ECE Attendance
    setEceAttendance((prev) =>
      prev.map((sub) => {
        if (sub.subjectName === subjectName || sub.subjectCode === 'ECE106') {
          const newAttended = wasAaravPresent ? sub.attendedClasses + 1 : sub.attendedClasses;
          const newTotal = sub.totalClasses + 1;
          return {
            ...sub,
            attendedClasses: newAttended,
            totalClasses: newTotal,
            percentage: Math.round((newAttended / newTotal) * 100),
            lastUpdated: 'Just now',
            history: [{ date, status: wasAaravPresent ? 'present' : 'absent' }, ...sub.history],
          };
        }
        return sub;
      })
    );

    // Update ECS Attendance
    setEcsAttendance((prev) =>
      prev.map((sub) => {
        if (sub.subjectName.includes('Digital') || sub.subjectCode === 'ECS102') {
          const newAttended = wasAnanyaPresent ? sub.attendedClasses + 1 : sub.attendedClasses;
          const newTotal = sub.totalClasses + 1;
          return {
            ...sub,
            attendedClasses: newAttended,
            totalClasses: newTotal,
            percentage: Math.round((newAttended / newTotal) * 100),
            lastUpdated: 'Just now',
            history: [{ date, status: wasAnanyaPresent ? 'present' : 'absent' }, ...sub.history],
          };
        }
        return sub;
      })
    );

    // Update student counters
    setEceStudent((prev) => {
      const newPresent = wasAaravPresent ? prev.presentClasses + 1 : prev.presentClasses;
      const newTotal = prev.totalClasses + 1;
      return {
        ...prev,
        presentClasses: newPresent,
        totalClasses: newTotal,
        overallAttendance: Math.round((newPresent / newTotal) * 100),
      };
    });

    setEcsStudent((prev) => {
      const newPresent = wasAnanyaPresent ? prev.presentClasses + 1 : prev.presentClasses;
      const newTotal = prev.totalClasses + 1;
      return {
        ...prev,
        presentClasses: newPresent,
        totalClasses: newTotal,
        overallAttendance: Math.round((newPresent / newTotal) * 100),
      };
    });

    showToast(
      'Attendance Saved Successfully',
      `Session for ${subjectName} synced to Vikram University academic server.`,
      'success'
    );
  };

  // Faculty creates an assignment
  const createAssignment = (newAsg: Omit<Assignment, 'id' | 'status' | 'assignedDate'>) => {
    const id = `asg-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const created: Assignment = {
      ...newAsg,
      id,
      status: 'pending',
      assignedDate: today,
    };

    if (newAsg.branch.includes('ECS')) {
      setEcsAssignments((prev) => [created, ...prev]);
    } else {
      setEceAssignments((prev) => [created, ...prev]);
    }

    showToast('Assignment Published', `"${newAsg.title}" is now visible to enrolled students.`, 'success');
  };

  // Student submits assignment
  const submitAssignment = (assignmentId: string, note?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const updater = (a: Assignment) =>
      a.id === assignmentId
        ? {
            ...a,
            status: 'submitted' as const,
            submissionDate: today,
            submissionNote: note || 'Solution submitted via Vikram University NexaONE Portal.',
          }
        : a;

    if (isEcs) {
      setEcsAssignments((prev) => prev.map(updater));
    } else {
      setEceAssignments((prev) => prev.map(updater));
    }
    showToast('Assignment Submitted', 'Your submission has been securely recorded for evaluation.', 'success');
  };

  // Faculty uploads library item
  const uploadLibraryItem = (newItem: Omit<LibraryItem, 'id' | 'uploadedDate' | 'downloads'>) => {
    const id = `lib-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    const created: LibraryItem = {
      ...newItem,
      id,
      uploadedDate: today,
      downloads: 0,
    };

    if (newItem.branch.includes('ECS')) {
      setEcsLibrary((prev) => [created, ...prev]);
    } else {
      setEceLibrary((prev) => [created, ...prev]);
    }

    showToast('Material Uploaded', `Categorized under ${newItem.branch} > ${newItem.subject}.`, 'success');
  };

  // Event registration
  const registerForEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, isRegistered: true, registeredCount: e.registeredCount + 1 }
          : e
      )
    );
    showToast('Registration Successful!', 'Your seat at Swarna Jayanti Sabhagar has been reserved.', 'success');
  };

  // Faculty publishes new event
  const createCampusEvent = (newEvent: Omit<CampusEvent, 'id' | 'registeredCount' | 'isCompleted'>) => {
    const id = `evt-${Date.now()}`;
    const created: CampusEvent = {
      ...newEvent,
      id,
      registeredCount: 1,
      isCompleted: false,
    };
    setEvents((prev) => [created, ...prev]);
    showToast('Event Published', `"${newEvent.title}" is now open for campus registrations.`, 'success');
  };

  // Calendar Management
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id'>) => {
    const id = `cal-${Date.now()}`;
    const created: CalendarEvent = { ...event, id };
    setCalendarEvents((prev) => [created, ...prev]);
    showToast('Calendar Updated', `"${event.title}" added to academic schedule.`, 'success');
  };

  const deleteCalendarEvent = (id: string) => {
    setCalendarEvents((prev) => prev.filter((e) => e.id !== id));
    showToast('Event Removed', 'Calendar entry was deleted.', 'info');
  };

  // Support ticket
  const createSupportTicket = (ticket: Omit<SupportTicket, 'id' | 'ticketNumber' | 'status' | 'createdAt' | 'updatedAt' | 'studentName' | 'studentId'>) => {
    const randomNum = Math.floor(2000 + Math.random() * 900);
    const id = `tkt-${Date.now()}`;
    const nowStr = new Date().toLocaleString([], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newTicket: SupportTicket = {
      ...ticket,
      id,
      ticketNumber: `NX-${randomNum}`,
      status: 'In Progress',
      createdAt: nowStr,
      updatedAt: nowStr,
      studentName: student.name,
      studentId: student.identifier,
      response: 'Ticket routed to Vikram University campus helpdesk. Resolution expected within 24 hours.',
    };

    setTickets((prev) => [newTicket, ...prev]);
    showToast('Ticket Created Successfully', `Ticket reference: ${newTicket.ticketNumber}`, 'success');
  };

  const markNotificationAsRead = (id: string) => {
    if (isEcs) {
      setEcsNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    } else {
      setEceNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }
  };

  const clearAllNotifications = () => {
    if (isEcs) {
      setEcsNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } else {
      setEceNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }
    showToast('All notifications marked as read', undefined, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        isLoggedIn,
        selectedStudentId,
        student,
        faculty,
        currentRoute,
        theme,
        isSidebarCollapsed,
        isSearchOpen,
        isAiOpen,
        toasts,
        courses,
        subjectAttendance,
        assignments,
        libraryItems,
        documents,
        events,
        calendarEvents,
        tickets,
        notifications,
        sectionStudents,
        login,
        logout,
        navigate,
        toggleTheme,
        toggleSidebar,
        setIsSearchOpen,
        setIsAiOpen,
        showToast,
        removeToast,
        selectDemoStudent,
        updateStudentAttendanceStatus,
        markAllSectionPresent,
        saveFacultyAttendanceSession,
        createAssignment,
        submitAssignment,
        uploadLibraryItem,
        registerForEvent,
        createCampusEvent,
        addCalendarEvent,
        deleteCalendarEvent,
        createSupportTicket,
        markNotificationAsRead,
        clearAllNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
