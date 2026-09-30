import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  FileCheck2,
  BookOpen,
  Sparkles,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  PlusCircle,
  TrendingUp,
  UserCheck,
  FolderPlus,
  CalendarPlus,
} from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const { faculty, assignments, libraryItems, events, navigate, sectionStudents } = useApp();

  const activeAssignmentsCount = assignments.filter((a) => a.status === 'pending').length;
  const libraryUploadsCount = libraryItems.length;

  const todayClasses = [
    {
      time: '10:30 AM – 11:30 AM',
      code: 'ECE106',
      subject: 'Digital Electronics (Lecture)',
      room: 'Hall B-204',
      section: 'Section A (B.Tech ECE Sem 1)',
      status: 'upcoming',
    },
    {
      time: '02:00 PM – 04:00 PM',
      code: 'ECE106-L',
      subject: 'Digital Electronics Hardware Lab',
      room: 'Hardware Lab 102',
      section: 'Section A (Batch 1)',
      status: 'scheduled',
    },
    {
      time: '04:30 PM – 05:30 PM',
      code: 'VLSI301',
      subject: 'Advanced VLSI Architecture (Elective)',
      room: 'Seminar Hall 3',
      section: 'Final Year ECE',
      status: 'scheduled',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {faculty.identifier}
            </span>
            <span className="text-xs text-slate-400">· {faculty.designation}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
            Welcome, {faculty.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {faculty.department} · Office: {faculty.officeLocation}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigate('/faculty/attendance')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <UserCheck className="w-4 h-4" />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={() => navigate('/faculty/assignments')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/15 rounded-xl border border-white/10 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-indigo-400" />
            <span>New Assignment</span>
          </button>
        </div>
      </div>

      {/* 4 Faculty Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => navigate('/faculty/attendance')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Today's Classes
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            3
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            Next: Hall B-204 at 10:30 AM
          </span>
        </div>

        <div
          onClick={() => navigate('/faculty/attendance')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Enrolled Cohort
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            142
          </div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 block">
            86% Avg Class Attendance
          </span>
        </div>

        <div
          onClick={() => navigate('/faculty/assignments')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Assignments
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            8
          </div>
          <span className="text-xs text-amber-600 dark:text-amber-400 mt-1 block">
            14 Submissions to grade
          </span>
        </div>

        <div
          onClick={() => navigate('/faculty/library')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-sky-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Library Uploads
            </span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {libraryUploadsCount}
          </div>
          <span className="text-xs text-sky-600 dark:text-sky-400 mt-1 block">
            342 Student downloads
          </span>
        </div>
      </div>

      {/* Main Grid: Today's Teaching Schedule + Quick Management Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Teaching Schedule */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Today's Lecture & Lab Schedule
              </h2>
              <p className="text-xs text-slate-500">
                Synchronized with the campus smart timetable
              </p>
            </div>

            <button
              onClick={() => navigate('/faculty/attendance')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>Take Attendance</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todayClasses.map((cls, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {cls.code}
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {cls.subject}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Cohort: {cls.section}
                  </p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {cls.time}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {cls.room}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/faculty/attendance')}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all self-start sm:self-center shrink-0"
                >
                  Open Register
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Action Hub for Faculty */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Department Operations
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => navigate('/faculty/attendance')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Attendance Manager
                    </h4>
                    <p className="text-[11px] text-slate-400">Mark student roll call</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/faculty/assignments')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Assignments CMS
                    </h4>
                    <p className="text-[11px] text-slate-400">Publish problem sets & review</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/faculty/library')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
                    <FolderPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      E-Library Upload
                    </h4>
                    <p className="text-[11px] text-slate-400">Add notes & lab manuals</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/faculty/events')}
                className="w-full p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-left transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                    <CalendarPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Campus Event Publisher
                    </h4>
                    <p className="text-[11px] text-slate-400">Organize workshops & fests</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
