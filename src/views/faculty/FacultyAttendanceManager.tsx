import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  Calendar,
  Clock,
  Save,
  Users,
  Check,
  Sparkles,
  Info,
} from 'lucide-react';

export const FacultyAttendanceManager: React.FC = () => {
  const {
    sectionStudents,
    updateStudentAttendanceStatus,
    markAllSectionPresent,
    saveFacultyAttendanceSession,
  } = useApp();

  const [branch, setBranch] = useState('B.Tech ECE');
  const [semester, setSemester] = useState('Semester 1');
  const [subject, setSubject] = useState('Digital Electronics');
  const [section, setSection] = useState('Section A');
  const [date, setDate] = useState('2026-09-30');
  const [period, setPeriod] = useState('Period 2 · 10:30 AM');
  const [isSaving, setIsSaving] = useState(false);

  const presentCount = sectionStudents.filter((s) => s.status === 'present').length;
  const absentCount = sectionStudents.filter((s) => s.status === 'absent').length;

  const handleToggleStatus = (studentId: string, currentStatus: 'present' | 'absent') => {
    updateStudentAttendanceStatus(studentId, currentStatus === 'present' ? 'absent' : 'present');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      saveFacultyAttendanceSession(subject, date);
      setIsSaving(false);
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Faculty Attendance Manager
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Interactive roll call · Tap any student card to toggle Present / Absent status
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={markAllSectionPresent}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all cursor-pointer"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Syncing...</span>
              </span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Attendance Session</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cohort Selectors Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Branch
          </label>
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded-xl border border-transparent focus:border-indigo-500"
          >
            <option value="B.Tech ECE">B.Tech ECE</option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech ME">B.Tech ME</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded-xl border border-transparent focus:border-indigo-500"
          >
            <option value="Semester 1">Semester 1</option>
            <option value="Semester 3">Semester 3</option>
            <option value="Semester 5">Semester 5</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Subject
          </label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded-xl border border-transparent focus:border-indigo-500"
          >
            <option value="Digital Electronics">Digital Electronics (ECE106)</option>
            <option value="Engineering Mathematics">Engineering Math (MATH101)</option>
            <option value="Engineering Physics">Engineering Physics (PHY102)</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Section
          </label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded-xl border border-transparent focus:border-indigo-500"
          >
            <option value="Section A">Section A</option>
            <option value="Section B">Section B</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Lecture Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded-xl border border-transparent focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Period / Slot
          </label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full text-xs bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white p-2 rounded-xl border border-transparent focus:border-indigo-500"
          >
            <option value="Period 2 · 10:30 AM">Period 2 (10:30 AM)</option>
            <option value="Period 4 · 02:00 PM">Period 4 (02:00 PM)</option>
          </select>
        </div>
      </div>

      {/* Real-time Session Summary Counters */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            Total Enrolled: <strong className="text-slate-900 dark:text-white tabular-nums">{sectionStudents.length}</strong>
          </span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            Present: {presentCount} ({Math.round((presentCount / sectionStudents.length) * 100)}%)
          </span>
          <span className="text-rose-500 font-bold">
            Absent: {absentCount}
          </span>
        </div>

        <div className="text-[11px] text-slate-400 hidden sm:block">
          Tap card to flip attendance state
        </div>
      </div>

      {/* Student Cards Grid (Anti-Spreadsheet Modern Design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sectionStudents.map((stu) => {
          const isPresent = stu.status === 'present';
          const isAarav = stu.studentId === 'VU26ECE014';

          return (
            <div
              key={stu.studentId}
              onClick={() => handleToggleStatus(stu.studentId, stu.status)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none group relative overflow-hidden ${
                isPresent
                  ? 'border-emerald-500/80 bg-white dark:bg-slate-900 shadow-xs hover:border-emerald-600'
                  : 'border-rose-500/50 bg-rose-50/20 dark:bg-rose-950/20 hover:border-rose-500'
              }`}
            >
              {/* Highlight badge for demo student Aarav */}
              {isAarav && (
                <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[9px] font-bold">
                  Demo Student
                </div>
              )}

              <div className="flex items-center gap-3">
                <img
                  src={stu.avatar}
                  alt={stu.studentName}
                  referrerPolicy="no-referrer"
                  className={`w-12 h-12 rounded-xl object-cover ring-2 transition-all ${
                    isPresent
                      ? 'ring-emerald-500/60'
                      : 'ring-rose-500/60 grayscale'
                  }`}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {stu.studentName}
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    {stu.studentId}
                  </p>
                  <span className="text-[10px] text-slate-500">
                    Cumulative: <strong className="tabular-nums">{stu.overallPercent}%</strong>
                  </span>
                </div>
              </div>

              {/* Status Indicator Button */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">State:</span>
                <div
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${
                    isPresent
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                  }`}
                >
                  {isPresent ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>PRESENT</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      <span>ABSENT</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
