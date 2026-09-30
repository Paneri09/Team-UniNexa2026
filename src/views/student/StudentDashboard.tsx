import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CalendarCheck,
  FileText,
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  MapPin,
  ShieldCheck,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const {
    student,
    selectedStudentId,
    selectDemoStudent,
    subjectAttendance,
    assignments,
    events,
    calendarEvents,
    navigate,
    setIsAiOpen,
    registerForEvent,
  } = useApp();

  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const upcomingEvents = events.filter((e) => !e.isCompleted).slice(0, 3);
  const isAttendanceHealthy = student.overallAttendance >= 75;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-indigo-950/30 to-slate-900/60 border border-indigo-500/20 shadow-sm backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Good morning, {student.name.split(' ')[0]} 👋
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-300 mt-1">
            Here’s your campus overview for today · Vikram University · {student.branch}, {student.semester} · {student.identifier}
          </p>

          {/* Quick Demo Switcher Pill for Judges */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            <span className="text-[11px] font-semibold text-slate-400">Demo Profile:</span>
            <div className="inline-flex p-0.5 bg-slate-900/80 border border-indigo-500/30 rounded-xl">
              <button
                type="button"
                onClick={() => selectDemoStudent('VU26ECE014')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedStudentId === 'VU26ECE014'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ECE · Aarav Sharma
              </button>
              <button
                type="button"
                onClick={() => selectDemoStudent('VU26ECS021')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedStudentId === 'VU26ECS021'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ECS · Ananya Verma
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsAiOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all"
          >
            <Bot className="w-4 h-4" />
            <span>Ask NexaONE AI</span>
          </button>
          <button
            onClick={() => navigate('/student/documents')}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Smart ID & Vault</span>
          </button>
        </div>
      </div>

      {/* Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Attendance */}
        <div
          onClick={() => navigate('/student/attendance')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Overall Attendance
            </span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {student.overallAttendance}%
            </span>
            <span
              className={`text-xs font-bold ${
                isAttendanceHealthy
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {isAttendanceHealthy ? 'Good Standing' : 'Warning (<75%)'}
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{student.presentClasses} / {student.totalClasses} classes</span>
            <span className="group-hover:text-indigo-500 font-medium inline-flex items-center gap-1 transition-colors">
              Details <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Stat 2: Pending Assignments */}
        <div
          onClick={() => navigate('/student/assignments')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-amber-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pending Tasks
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {pendingAssignments.length}
            </span>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Due Soon
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="truncate max-w-[170px]">
              Next: {pendingAssignments[0]?.title || 'All caught up!'}
            </span>
            <span className="group-hover:text-amber-500 font-medium inline-flex items-center gap-1 transition-colors">
              Submit <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Stat 3: Upcoming Events */}
        <div
          onClick={() => navigate('/student/events')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-sky-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Campus Events
            </span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {upcomingEvents.length + 1}
            </span>
            <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
              Active This Month
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>TechNova 2026 flagship</span>
            <span className="group-hover:text-sky-500 font-medium inline-flex items-center gap-1 transition-colors">
              Explore <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* Stat 4: Library Resources */}
        <div
          onClick={() => navigate('/student/library')}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-emerald-500/40 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Library Vault
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              128
            </span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              Available Resources
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Floyd, Grewal, Beiser & more</span>
            <span className="group-hover:text-emerald-500 font-medium inline-flex items-center gap-1 transition-colors">
              Browse <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Attendance Circular Card + Pending Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Card with Circular Gauge */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Attendance Standing
              </h2>
              <span className="text-[11px] text-slate-500">Min. Req: 75%</span>
            </div>

            {/* Circular Progress Gauge */}
            <div className="flex flex-col items-center justify-center my-4">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-100 dark:text-slate-800"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 40}
                    strokeDashoffset={
                      2 * Math.PI * 40 * (1 - student.overallAttendance / 100)
                    }
                    strokeLinecap="round"
                    className={
                      isAttendanceHealthy
                        ? 'text-indigo-600 dark:text-indigo-500 transition-all duration-1000'
                        : 'text-amber-500 transition-all duration-1000'
                    }
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums">
                    {student.overallAttendance}%
                  </span>
                  <span className="text-[10px] font-semibold text-slate-400">
                    {student.presentClasses} of {student.totalClasses} Present
                  </span>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
                {isAttendanceHealthy ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Good Standing
                  </span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" /> Attendance Below 75% Target
                  </span>
                )}
              </div>
            </div>

            {/* Subject Snapshot */}
            <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Subject Health
              </div>
              {subjectAttendance.slice(0, 3).map((sub) => (
                <div key={sub.subjectCode} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 truncate max-w-[170px]">
                    {sub.subjectName}
                  </span>
                  <span
                    className={`font-bold tabular-nums ${
                      sub.percentage >= 75
                        ? 'text-slate-900 dark:text-white'
                        : 'text-amber-500'
                    }`}
                  >
                    {sub.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('/student/attendance')}
            className="mt-5 w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Attendance Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Upcoming Assignments Section */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Upcoming Course Assignments
                </h2>
                <p className="text-xs text-slate-500">
                  {pendingAssignments.length} pending tasks requiring submission
                </p>
              </div>

              <button
                onClick={() => navigate('/student/assignments')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>View all</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-3">
              {assignments.map((asg) => {
                const isDueSoon = asg.status === 'pending';
                const daysRemaining =
                  asg.id === 'asg-001' ? 'Due in 3 days' : asg.id === 'asg-002' ? 'Due in 5 days' : 'Due in 7 days';

                return (
                  <div
                    key={asg.id}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                          {asg.subjectName}
                        </span>
                        <span className="text-slate-400 text-xs">·</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {asg.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {asg.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span>Faculty: {asg.facultyName}</span>
                        <span>·</span>
                        <span>Max: {asg.maxMarks} Marks</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {asg.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md flex items-center gap-1 whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            {daysRemaining}
                          </span>
                          <button
                            onClick={() => navigate('/student/assignments')}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all whitespace-nowrap"
                          >
                            Submit
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Submitted
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions Bar */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
              Quick Shortcuts
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                onClick={() => navigate('/student/library')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  E-Library
                </span>
              </button>
              <button
                onClick={() => navigate('/student/documents')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Documents
                </span>
              </button>
              <button
                onClick={() => navigate('/student/map')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Campus Map
                </span>
              </button>
              <button
                onClick={() => setIsAiOpen(true)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-left transition-colors flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-indigo-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                  Ask AI
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Events & Academic Calendar Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upcoming Events Carousel/Cards */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Campus Highlights & Registrations
              </h2>
              <p className="text-xs text-slate-500">Live fests, workshops and hackathons</p>
            </div>
            <button
              onClick={() => navigate('/student/events')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="flex flex-col sm:flex-row gap-4 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 bg-slate-50/40 dark:bg-slate-800/30 transition-all"
              >
                <img
                  src={evt.bannerUrl}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-36 h-24 object-cover rounded-lg shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {evt.category}
                      </span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {evt.date}
                      </span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-0.5 line-clamp-1">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                      {evt.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      <span className="truncate max-w-[160px]">{evt.venue}</span>
                    </span>

                    {evt.isRegistered ? (
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Registered ✓
                      </span>
                    ) : (
                      <button
                        onClick={() => registerForEvent(evt.id)}
                        className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition-all"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Calendar Snapshot */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Academic Schedule
                </h2>
                <p className="text-xs text-slate-500">October 2026 Key Dates</p>
              </div>
              <button
                onClick={() => navigate('/student/calendar')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Full Calendar
              </button>
            </div>

            <div className="space-y-2.5">
              {calendarEvents.slice(0, 4).map((cal) => {
                const categoryColors: Record<string, string> = {
                  Exams: 'border-rose-500/30 bg-rose-500/5 text-rose-600 dark:text-rose-400',
                  Festivals: 'border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400',
                  Workshops: 'border-sky-500/30 bg-sky-500/5 text-sky-600 dark:text-sky-400',
                  Holidays: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
                  Events: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400',
                };

                return (
                  <div
                    key={cal.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 flex items-start gap-3"
                  >
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">
                        {new Date(cal.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                        {new Date(cal.date).getDate()}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${
                            categoryColors[cal.category] || 'text-slate-500'
                          }`}
                        >
                          {cal.category}
                        </span>
                        {cal.isImportant && (
                          <span className="text-[9px] font-semibold text-rose-500">
                            Critical
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white mt-1 truncate">
                        {cal.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate">
                        {cal.location || cal.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => navigate('/student/calendar')}
            className="mt-4 w-full py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Sync with Google Calendar</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
