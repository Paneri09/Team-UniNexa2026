import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Briefcase,
  Mail,
  MapPin,
  Clock,
  BookOpen,
  Settings,
  Sun,
  Moon,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const FacultyProfile: React.FC = () => {
  const { faculty, theme, toggleTheme } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={faculty.avatar}
          alt={faculty.name}
          referrerPolicy="no-referrer"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-lg"
        />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {faculty.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold">
                  Faculty Lead
                </span>
              </div>
              <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">
                {faculty.identifier} · {faculty.designation}
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official Email: <strong className="text-slate-700 dark:text-slate-200">{faculty.email}</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500">
            <span>Specialization: <strong>{faculty.specialization}</strong></span>
            <span>·</span>
            <span>Office: <strong>{faculty.officeLocation}</strong></span>
          </div>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Department Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-indigo-500" />
            Faculty Responsibilities
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <span className="text-slate-500">Academic Department</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {faculty.department}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500 block mb-1">Assigned Subjects (Teaching Load)</span>
              <div className="space-y-1">
                {faculty.assignedSubjects.map((sub) => (
                  <div key={sub} className="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
              <span className="text-slate-500">Student Counseling Hours</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                Mon-Fri · 03:00 PM – 05:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-500" />
            Portal Preferences
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Interface Theme
                </span>
                <span className="text-[11px] text-slate-400">
                  Current: {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold flex items-center gap-1.5"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5" />}
                <span>Toggle</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Automated Attendance Reports
                </span>
                <span className="text-[11px] text-slate-400">
                  Email weekly ledger digest to HOD office
                </span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded bg-slate-800 text-indigo-600 w-4 h-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
