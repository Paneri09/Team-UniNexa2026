import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  MapPin,
  Sparkles,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  Settings,
  ShieldCheck,
  Check,
  GraduationCap,
  Briefcase,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    student,
    faculty,
    theme,
    toggleTheme,
    setIsSearchOpen,
    setIsAiOpen,
    navigate,
    logout,
    notifications,
    markNotificationAsRead,
    clearAllNotifications,
    login,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const currentUser = role === 'student' ? student : faculty;
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 lg:px-6 flex items-center justify-between transition-colors">
      {/* Zone 1: Wordmark & Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(role === 'student' ? '/student-dashboard' : '/faculty-dashboard')}
          className="flex items-center gap-2.5 group text-left"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-md shadow-indigo-500/20 text-white font-bold tracking-wider text-base transition-transform group-hover:scale-105">
            N
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              Nexa<span className="text-indigo-600 dark:text-indigo-400">ONE</span>
            </span>
            <span className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400 leading-tight">
              Smart Campus Platform
            </span>
          </div>
        </button>

        {/* Role Pill Badge */}
        <div className="hidden sm:flex items-center ml-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border border-indigo-500/20 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">
          {role === 'student' ? (
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3" /> STUDENT PORTAL
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Briefcase className="w-3 h-3" /> FACULTY DESK
            </span>
          )}
        </div>
      </div>

      {/* Zone 2: Global Search & Shortcuts */}
      <div className="flex-1 max-w-md mx-4 hidden md:flex items-center gap-2">
        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 rounded-xl border border-transparent dark:border-slate-700/50 transition-all cursor-pointer group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            <span>Search courses, library, campus locations...</span>
          </span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
            ⌘K
          </kbd>
        </button>

        <button
          onClick={() => navigate(role === 'student' ? '/student/map' : '/faculty/map')}
          title="Vikram University Campus Map"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
        >
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span className="hidden xl:inline">Campus Map</span>
        </button>

        <button
          onClick={() => setIsAiOpen(true)}
          title="NexaONE AI Assistant"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-xl shadow-sm shadow-indigo-600/20 transition-all whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden xl:inline">AI Assistant</span>
        </button>
      </div>

      {/* Zone 3: Actions, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Mobile Search Button */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
        >
          {theme === 'dark' ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 px-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                    Campus Notifications
                  </h4>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={clearAllNotifications}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto space-y-1.5">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      markNotificationAsRead(item.id);
                      if (item.actionRoute) {
                        navigate(item.actionRoute);
                        setIsNotifOpen(false);
                      }
                    }}
                    className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                      item.read
                        ? 'hover:bg-slate-50 dark:hover:bg-slate-800/50 opacity-75'
                        : 'bg-indigo-50/50 dark:bg-indigo-950/20 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border-l-2 border-indigo-500'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 shrink-0 tabular-nums">
                        {item.timestamp}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700"
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                {currentUser.identifier}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-2">
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {currentUser.name}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                  {currentUser.email}
                </p>
                <div className="mt-2 flex items-center justify-between text-[10px] font-medium pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-slate-500">Active Role:</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 uppercase">
                    {role}
                  </span>
                </div>
              </div>

              {/* Role Toggle Switch for Hackathon Judges */}
              <div className="px-2 py-1.5 mb-2 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1.5">
                  Demo RBAC Role Switcher
                </span>
                <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-200/70 dark:bg-slate-800 rounded-lg">
                  <button
                    onClick={() => {
                      login('student');
                      setIsProfileOpen(false);
                    }}
                    className={`py-1 text-xs font-semibold rounded-md transition-all ${
                      role === 'student'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => {
                      login('faculty');
                      setIsProfileOpen(false);
                    }}
                    className={`py-1 text-xs font-semibold rounded-md transition-all ${
                      role === 'faculty'
                        ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Faculty
                  </button>
                </div>

                {/* If Student role active, allow switching between ECE & ECS Demo Students */}
                {role === 'student' && (
                  <div className="mt-2 pt-2 border-t border-indigo-200/50 dark:border-indigo-900/50">
                    <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block mb-1.5">
                      Demo Student Profile:
                    </span>
                    <div className="grid grid-cols-2 gap-1 p-0.5 bg-slate-200/70 dark:bg-slate-800 rounded-lg">
                      <button
                        onClick={() => {
                          const { selectDemoStudent } = useApp();
                          // Handled via context
                        }}
                        className="hidden"
                      />
                      <button
                        onClick={() => {
                          login('student', 'VU26ECE014');
                          setIsProfileOpen(false);
                        }}
                        className={`py-1 text-[11px] font-semibold rounded-md transition-all ${
                          currentUser.identifier === 'VU26ECE014'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        ECE · Aarav
                      </button>
                      <button
                        onClick={() => {
                          login('student', 'VU26ECS021');
                          setIsProfileOpen(false);
                        }}
                        className={`py-1 text-[11px] font-semibold rounded-md transition-all ${
                          currentUser.identifier === 'VU26ECS021'
                            ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                        }`}
                      >
                        ECS · Ananya
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-0.5 text-xs text-slate-700 dark:text-slate-200">
                <button
                  onClick={() => {
                    navigate(role === 'student' ? '/student/profile' : '/faculty/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile & ID</span>
                </button>

                <button
                  onClick={() => {
                    navigate(role === 'student' ? '/student/settings' : '/faculty/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Preferences</span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  onClick={() => {
                    logout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
