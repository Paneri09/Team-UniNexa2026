import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Info,
  Calendar,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const StudentAttendance: React.FC = () => {
  const { student, subjectAttendance } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectAttendance[0]?.subjectCode || '');

  const isHealthy = student.overallAttendance >= 75;
  const currentSubjectObj = subjectAttendance.find((s) => s.subjectCode === selectedSubject) || subjectAttendance[0];

  // Realistic weekly trends
  const weeklyTrends = [
    { week: 'Week 1', rate: 88 },
    { week: 'Week 2', rate: 85 },
    { week: 'Week 3', rate: 78 },
    { week: 'Week 4', rate: 82 },
    { week: 'Week 5', rate: 84 },
    { week: 'Current', rate: student.overallAttendance },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Academic Attendance Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time biometric & faculty ledger sync · B.Tech ECE 1st Semester
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
          <Info className="w-4 h-4 text-indigo-500" />
          <span>University Minimum Requirement: 75%</span>
        </div>
      </div>

      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Overall Percentage */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Cumulative Standing
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                {student.overallAttendance}%
              </span>
              <span
                className={`text-xs font-bold ${
                  isHealthy ? 'text-emerald-500' : 'text-amber-500'
                }`}
              >
                {isHealthy ? 'Good Standing' : 'Critical Warning'}
              </span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              {student.overallAttendance - 75}% margin above cutoff
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Classes Attended */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Classes Present
          </span>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums mt-1">
            {student.presentClasses}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Successfully recorded in register
          </span>
        </div>

        {/* Classes Absent */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Classes Absent
          </span>
          <div className="text-3xl font-extrabold text-slate-700 dark:text-slate-300 tabular-nums mt-1">
            {student.totalClasses - student.presentClasses}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Permissible leaves remaining: 6
          </span>
        </div>

        {/* Total Lectures */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
            Total Conducted
          </span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums mt-1">
            {student.totalClasses}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Academic Session 2026-27
          </span>
        </div>
      </div>

      {/* Main Subject-Wise Table & Interactive Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Subject List & Progress Bars */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Subject-Wise Attendance Breakdown
              </h2>
              <p className="text-xs text-slate-500">
                Tap on any course to review lecture logs and faculty entries
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {subjectAttendance.length} Subjects
            </span>
          </div>

          <div className="space-y-3">
            {subjectAttendance.map((sub) => {
              const isSubHealthy = sub.percentage >= 75;
              const isSelected = sub.subjectCode === selectedSubject;

              return (
                <div
                  key={sub.subjectCode}
                  onClick={() => setSelectedSubject(sub.subjectCode)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-xs'
                      : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/30 dark:bg-slate-800/30'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {sub.subjectCode}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {sub.subjectName}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 block">
                        Faculty: {sub.facultyName} · Last updated {sub.lastUpdated}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                          {sub.percentage}%
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {sub.attendedClasses} / {sub.totalClasses} Present
                        </span>
                      </div>

                      <div
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 ${
                          isSubHealthy
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {isSubHealthy ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Healthy</span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Warning</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Visual Progress Bar */}
                  <div className="w-full bg-slate-200 dark:bg-slate-700/60 h-2.5 rounded-full overflow-hidden relative">
                    {/* 75% cutoff marker */}
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white z-10 opacity-40"
                      style={{ left: '75%' }}
                      title="75% Requirement Line"
                    />
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isSubHealthy
                          ? sub.percentage >= 85
                            ? 'bg-emerald-500'
                            : 'bg-indigo-600 dark:bg-indigo-500'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${sub.percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Attendance Trend & Selected Subject Log */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weekly Trend Chart Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                Attendance Trend
              </h3>
              <span className="text-[11px] text-slate-400">Past 6 Weeks</span>
            </div>

            {/* Custom SVG Trend Bar Chart */}
            <div className="space-y-2 pt-2">
              {weeklyTrends.map((t) => (
                <div key={t.week} className="flex items-center gap-3 text-xs">
                  <span className="w-14 text-slate-400 text-[11px] shrink-0">{t.week}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        t.rate >= 75 ? 'bg-indigo-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${t.rate}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-bold tabular-nums text-slate-700 dark:text-slate-300">
                    {t.rate}%
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              Maintaining steady pace above the required 75% boundary.
            </div>
          </div>

          {/* Detailed History for Active Subject */}
          {currentSubjectObj && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {currentSubjectObj.subjectName} Log
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  {currentSubjectObj.subjectCode}
                </span>
              </div>

              <p className="text-xs text-slate-500 mb-3">
                Faculty Instructor: <span className="font-semibold text-slate-700 dark:text-slate-300">{currentSubjectObj.facultyName}</span>
              </p>

              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Recent Lecture Register
                </span>

                {currentSubjectObj.history.length === 0 ? (
                  <p className="text-xs text-slate-400 py-3 text-center">No past entries recorded</p>
                ) : (
                  currentSubjectObj.history.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs"
                    >
                      <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {h.date}
                      </span>
                      <span
                        className={`font-bold flex items-center gap-1 text-[11px] ${
                          h.status === 'present'
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : 'text-rose-500'
                        }`}
                      >
                        {h.status === 'present' ? 'PRESENT ✓' : 'ABSENT ✗'}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
