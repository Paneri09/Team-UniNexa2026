import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarEvent } from '../../types';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  ExternalLink,
  MapPin,
  Clock,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

export const StudentCalendar: React.FC = () => {
  const { calendarEvents, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(9); // 9 = October 2026

  const categories = ['All', 'Classes', 'Exams', 'Holidays', 'Workshops', 'Festivals', 'Events'];

  const categoryStyles: Record<string, { bg: string; text: string; border: string; badge: string }> = {
    Exams: {
      bg: 'bg-rose-500/10',
      text: 'text-rose-600 dark:text-rose-400',
      border: 'border-rose-500/30',
      badge: 'bg-rose-500 text-white',
    },
    Holidays: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-600 dark:text-emerald-400',
      border: 'border-emerald-500/30',
      badge: 'bg-emerald-500 text-white',
    },
    Workshops: {
      bg: 'bg-sky-500/10',
      text: 'text-sky-600 dark:text-sky-400',
      border: 'border-sky-500/30',
      badge: 'bg-sky-500 text-white',
    },
    Festivals: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-500/30',
      badge: 'bg-purple-500 text-white',
    },
    Events: {
      bg: 'bg-indigo-500/10',
      text: 'text-indigo-600 dark:text-indigo-400',
      border: 'border-indigo-500/30',
      badge: 'bg-indigo-500 text-white',
    },
    Classes: {
      bg: 'bg-slate-500/10',
      text: 'text-slate-600 dark:text-slate-400',
      border: 'border-slate-500/30',
      badge: 'bg-slate-500 text-white',
    },
  };

  const filteredEvents = calendarEvents.filter((e) =>
    selectedCategory === 'All' ? true : e.category === selectedCategory
  );

  const handleSyncGoogleCalendar = () => {
    showToast(
      'Calendar Sync Ready',
      'NexaONE Google Calendar sync feed is active and synchronized.',
      'info'
    );
  };

  // Generate October 2026 grid (October 1, 2026 starts on Thursday)
  // Days in month: 31
  const daysInMonth = 31;
  const startDayOffset = 4; // 0 = Sun, 1 = Mon, ..., 4 = Thu
  const calendarCells = [];

  for (let i = 0; i < startDayOffset; i++) {
    calendarCells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push(d);
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Academic Calendar 2026-27
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Official semester schedules, mid-term examinations, fests and university holidays
          </p>
        </div>

        <button
          onClick={handleSyncGoogleCalendar}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Sync with Google Calendar</span>
        </button>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Calendar View: Month Grid + Upcoming Key Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Month Calendar Grid */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-indigo-500" />
              <span>October 2026</span>
            </h2>
            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={() => showToast('Displaying October 2026', undefined, 'info')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => showToast('Displaying October 2026', undefined, 'info')}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {calendarCells.map((day, idx) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="h-20 sm:h-24 rounded-xl bg-slate-50/40 dark:bg-slate-800/20 border border-transparent"
                  />
                );
              }

              const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
              const dayEvents = calendarEvents.filter((e) => e.date === dateStr);
              const isToday = day === 29; // Local simulated date

              return (
                <div
                  key={day}
                  className={`h-20 sm:h-24 p-1.5 rounded-xl border flex flex-col justify-between transition-all ${
                    isToday
                      ? 'border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/30 ring-1 ring-indigo-500'
                      : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/30 dark:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold tabular-nums w-5 h-5 flex items-center justify-center rounded-full ${
                        isToday
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    )}
                  </div>

                  <div className="space-y-1 overflow-hidden">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        title={ev.title}
                        className={`text-[9px] font-semibold px-1 py-0.5 rounded truncate ${
                          categoryStyles[ev.category]?.bg || 'bg-slate-100'
                        } ${categoryStyles[ev.category]?.text || 'text-slate-700'}`}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[9px] text-slate-400 block font-medium">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Key Event Details List */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              Events in This Period ({filteredEvents.length})
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Category: <strong className="text-indigo-600 dark:text-indigo-400">{selectedCategory}</strong>
            </p>

            <div className="space-y-3">
              {filteredEvents.map((evt) => {
                const style = categoryStyles[evt.category] || categoryStyles.Events;

                return (
                  <div
                    key={evt.id}
                    className={`p-3.5 rounded-xl border ${style.border} ${style.bg} space-y-1.5`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${style.text}`}>
                        {evt.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {evt.date}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {evt.description}
                    </p>

                    {evt.location && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        <span>{evt.location}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 flex items-center justify-between">
            <span>Academic Office Notice</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              Updated by Registrar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
