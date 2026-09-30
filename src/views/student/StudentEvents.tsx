import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CampusEvent } from '../../types';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  User,
  CheckCircle2,
  Award,
  Users,
  X,
  Download,
  Share2,
} from 'lucide-react';

export const StudentEvents: React.FC = () => {
  const { events, registerForEvent, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'calendar'>('upcoming');
  const [viewingCertificate, setViewingCertificate] = useState<CampusEvent | null>(null);

  const upcomingEvents = events.filter((e) => !e.isCompleted);
  const completedEvents = events.filter((e) => e.isCompleted);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Campus Events & Tech Fests
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            RSVP for upcoming conferences, hackathons, guest lectures, and claim digital certificates
          </p>
        </div>

        {/* 3 Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'upcoming'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Upcoming ({upcomingEvents.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'completed'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Completed ({completedEvents.length})
          </button>
          <button
            onClick={() => navigate('/student/calendar')}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg transition-all"
          >
            Academic Calendar →
          </button>
        </div>
      </div>

      {/* Tab 1: Upcoming Events */}
      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-xs hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between transition-all group"
            >
              <div>
                {/* Event Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-800">
                  <img
                    src={evt.bannerUrl}
                    alt={evt.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white uppercase tracking-wider">
                    {evt.category}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-slate-950/80 text-[11px] font-semibold text-white">
                    {evt.registeredCount} / {evt.capacity} Seats
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {evt.date} · {evt.time}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 leading-snug line-clamp-1">
                      {evt.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{evt.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Host: {evt.organizer}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="p-5 pt-0">
                {evt.isRegistered ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs font-bold flex items-center justify-center gap-2 cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Registered ✓</span>
                  </button>
                ) : (
                  <button
                    onClick={() => registerForEvent(evt.id)}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Register / RSVP</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Completed Events & Certificates */}
      {activeTab === 'completed' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {completedEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                      Concluded
                    </span>
                    <span className="text-xs text-slate-400">{evt.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {evt.description}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Venue: {evt.venue}</span>
                    <span className="text-emerald-500 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Attended
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400">
                    Verified Participation
                  </span>

                  <button
                    onClick={() => setViewingCertificate(evt)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    <span>View Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {viewingCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6">
            <button
              onClick={() => setViewingCertificate(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Canvas Frame */}
            <div className="border-4 border-double border-indigo-500/40 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-50 to-indigo-50/20 dark:from-slate-900 dark:to-indigo-950/30 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-xl flex items-center justify-center mx-auto shadow-md">
                N
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-widest text-indigo-600 dark:text-indigo-400 uppercase font-bold">
                  NexaONE University · Certificate of Achievement
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white mt-1">
                  This certifies that
                </h2>
              </div>

              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 underline decoration-indigo-300 dark:decoration-indigo-700 underline-offset-8">
                Aarav Sharma
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                has successfully participated and showcased exemplary performance in{' '}
                <strong className="text-slate-900 dark:text-white">{viewingCertificate.title}</strong>,
                organized under the auspices of the Department of Electronics & Communication Engineering.
              </p>

              <div className="pt-6 flex items-center justify-between text-left border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
                <div>
                  <span className="block font-bold text-slate-800 dark:text-slate-200">
                    Dr. Priya Mehta
                  </span>
                  <span>Convener & HOD</span>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-slate-800 dark:text-slate-200">
                    CERT-MP-2026-0914
                  </span>
                  <span>Issued on {viewingCertificate.date}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setViewingCertificate(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Certificate downloaded in high resolution PDF format.');
                  setViewingCertificate(null);
                }}
                className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
