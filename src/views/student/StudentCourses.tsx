import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SubjectCourse } from '../../types';
import {
  GraduationCap,
  Clock,
  MapPin,
  User,
  BookOpen,
  FileText,
  CheckCircle2,
  ArrowRight,
  Download,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export const StudentCourses: React.FC = () => {
  const { student, courses, assignments, libraryItems, navigate } = useApp();
  const [selectedCourse, setSelectedCourse] = useState<SubjectCourse>(courses[0]);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'materials' | 'tasks'>('syllabus');

  const courseAssignments = assignments.filter((a) => a.subjectCode === selectedCourse.code);
  const courseMaterials = libraryItems.filter((l) => l.subject === selectedCourse.name);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>{student.branch}</span>
            <span>·</span>
            <span>{student.semester}</span>
            <span>·</span>
            <span>Curriculum Scheme 2026</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
            Enrolled Academic Courses
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl font-medium">
            Total Credits: 20
          </span>
        </div>
      </div>

      {/* Main Grid: Subject Cards List + Dynamic Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Course Cards */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
            Subject Index ({courses.length})
          </div>

          {courses.map((course) => {
            const isSelected = course.code === selectedCourse.code;
            const coursePendingTasks = assignments.filter(
              (a) => a.subjectCode === course.code && a.status === 'pending'
            ).length;

            return (
              <div
                key={course.code}
                onClick={() => setSelectedCourse(course)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/30 shadow-md ring-1 ring-indigo-500'
                    : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {course.code}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {course.name}
                    </h3>
                  </div>

                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {course.credits} Credits
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {course.faculty}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {course.schedule}
                  </span>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-rose-500" />
                    {course.room}
                  </span>

                  {coursePendingTasks > 0 ? (
                    <span className="text-amber-600 dark:text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded">
                      {coursePendingTasks} task due
                    </span>
                  ) : (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      All tasks submitted
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Subject Detailed Workspace */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded">
                    {selectedCourse.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    {selectedCourse.credits} Credits · Core Course
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">
                  {selectedCourse.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-3">
                  <span>Instructor: <strong className="text-slate-700 dark:text-slate-300">{selectedCourse.faculty}</strong></span>
                  <span>·</span>
                  <span>Lecture Hall: <strong className="text-slate-700 dark:text-slate-300">{selectedCourse.room}</strong></span>
                </p>
              </div>

              <button
                onClick={() => navigate('/student/library')}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 self-start"
              >
                <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                <span>Open in Library</span>
              </button>
            </div>

            {/* Segmented Control for Subject Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl my-5">
              <button
                onClick={() => setActiveTab('syllabus')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'syllabus'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Curriculum Units
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'materials'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Materials & Notes ({courseMaterials.length})
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeTab === 'tasks'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Assignments ({courseAssignments.length})
              </button>
            </div>

            {/* Tab 1: Syllabus Units */}
            {activeTab === 'syllabus' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Course Learning Outcomes & Syllabus Modules
                </div>
                <div className="space-y-2">
                  {selectedCourse.syllabus.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Course Materials */}
            {activeTab === 'materials' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Official Recommended Texts & Lab Sheets
                </div>

                {courseMaterials.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500">
                    No custom uploads yet. Standard handbook available in central library.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {courseMaterials.map((mat) => (
                      <div
                        key={mat.id}
                        className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900 dark:text-white">
                            {mat.title}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            By {mat.author} · {mat.materialType} · {mat.fileSize}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate('/student/library')}
                          className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>View Book</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Assignments */}
            {activeTab === 'tasks' && (
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Assigned Homework, Labs & Problem Sets
                </div>

                {courseAssignments.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-500">
                    No assignments currently scheduled for this course.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {courseAssignments.map((a) => (
                      <div
                        key={a.id}
                        className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                              {a.title}
                            </h4>
                            <span className="text-[10px] text-slate-400">· Max {a.maxMarks} Marks</span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Due date: {a.dueDate}
                          </p>
                        </div>

                        {a.status === 'pending' ? (
                          <button
                            onClick={() => navigate('/student/assignments')}
                            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold transition-all"
                          >
                            Submit Solution
                          </button>
                        ) : (
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Submitted
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Schedule: {selectedCourse.schedule}</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              Department of ECE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
