import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  GraduationCap,
  Mail,
  ShieldCheck,
  Calendar,
  CreditCard,
  QrCode,
  Download,
  Settings,
  Bell,
  Sun,
  Moon,
  CheckCircle2,
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { student, theme, toggleTheme, showToast } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={student.avatar}
          alt={student.name}
          referrerPolicy="no-referrer"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-lg"
        />

        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {student.name}
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
                </span>
              </div>
              <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold mt-0.5">
                {student.identifier} · {student.branch}
              </p>
            </div>

            <button
              onClick={() => showToast('Smart ID Card Exported', 'Downloaded secure credential pack.', 'success')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-1.5 self-center sm:self-auto cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Digital Pass</span>
            </button>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Official Email: <strong className="text-slate-700 dark:text-slate-200">{student.email}</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-500">
            <span>Academic Session: <strong>{student.academicYear}</strong></span>
            <span>·</span>
            <span>Current CGPA: <strong className="text-indigo-600 dark:text-indigo-400 tabular-nums">{student.cgpa}</strong></span>
            <span>·</span>
            <span>Overall Attendance: <strong className="text-emerald-600 dark:text-emerald-400 tabular-nums">{student.overallAttendance}%</strong></span>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Academic Details + System Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Academic Details */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            University Academic Enrollment
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Faculty Department</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {student.department}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Curriculum Tier</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                Undergraduate (B.Tech Honors)
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Enrolled Semester</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {student.semester}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="text-slate-500">Fee Clearance</span>
              <span className="font-semibold text-emerald-500">
                100% Cleared (Zero Dues)
              </span>
            </div>
          </div>
        </div>

        {/* Preferences & Theme */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Settings className="w-4 h-4 text-indigo-500" />
            System & Notification Settings
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Interface Appearance
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
                  Attendance Alerts
                </span>
                <span className="text-[11px] text-slate-400">
                  Notify when subject falls below 75%
                </span>
              </div>
              <input
                type="checkbox"
                defaultChecked
                className="rounded bg-slate-800 text-indigo-600 w-4 h-4 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div>
                <span className="font-semibold text-slate-900 dark:text-white block">
                  Assignment Due Reminders
                </span>
                <span className="text-[11px] text-slate-400">
                  Receive SMS & in-app alerts 48h prior
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
