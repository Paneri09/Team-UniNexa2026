export type Role = 'student' | 'faculty';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  department: string;
  identifier: string; // Roll No or Faculty ID
}

export interface StudentProfile extends User {
  role: 'student';
  branch: string;
  semester: string;
  academicYear: string;
  cgpa: number;
  overallAttendance: number;
  totalClasses: number;
  presentClasses: number;
}

export interface FacultyProfile extends User {
  role: 'faculty';
  designation: string;
  specialization: string;
  officeLocation: string;
  assignedSubjects: string[];
}

export interface SubjectAttendance {
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  lastUpdated: string;
  history: { date: string; status: 'present' | 'absent' }[];
}

export interface SubjectCourse {
  id: string;
  code: string;
  name: string;
  credits: number;
  faculty: string;
  branch: string;
  semester: string;
  syllabus: string[];
  materialsCount: number;
  assignmentsCount: number;
  schedule: string;
  room: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  branch: string;
  semester: string;
  description: string;
  assignedDate: string;
  dueDate: string;
  maxMarks: number;
  status: 'pending' | 'submitted' | 'graded';
  obtainedMarks?: number;
  attachmentName?: string;
  submissionDate?: string;
  submissionNote?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  branch: string;
  semester: string;
  subject: string;
  materialType: 'Textbook' | 'Lecture Notes' | 'Research Paper' | 'Lab Manual';
  edition?: string;
  pages: number;
  fileSize: string;
  uploadedDate: string;
  downloads: number;
  description: string;
  readUrl?: string;
}

export interface DocumentRecord {
  id: string;
  title: string;
  category: 'id_card' | 'academic' | 'fee' | 'certificate';
  issueDate: string;
  documentNumber: string;
  status: 'verified' | 'pending' | 'active';
  fileSize: string;
  description: string;
  metadata?: Record<string, string>;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'Tech' | 'Workshop' | 'Cultural' | 'Sports' | 'Seminar';
  date: string;
  time: string;
  venue: string;
  description: string;
  organizer: string;
  bannerUrl: string;
  isRegistered?: boolean;
  registrationDeadline: string;
  capacity: number;
  registeredCount: number;
  isCompleted?: boolean;
  certificateAvailable?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  category: 'Classes' | 'Exams' | 'Holidays' | 'Workshops' | 'Festivals' | 'Events';
  description: string;
  location?: string;
  isImportant?: boolean;
}

export interface CampusBuilding {
  id: string;
  name: string;
  shortCode: string;
  department: string;
  category: 'academic' | 'facility' | 'hostel' | 'admin' | 'sports' | 'food' | 'library';
  lat: number;
  lng: number;
  workingHours: string;
  description: string;
  floors: number;
  contact: string;
  amenities: string[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  category: 'IT Support' | 'Academic' | 'Fees' | 'Hostel' | 'Library' | 'Other';
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  updatedAt: string;
  studentName: string;
  studentId: string;
  response?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'assignment' | 'attendance' | 'event' | 'library' | 'document' | 'general';
  actionRoute?: string;
}

export interface StudentAttendanceEntry {
  studentId: string;
  studentName: string;
  avatar: string;
  overallPercent: number;
  status: 'present' | 'absent';
}
