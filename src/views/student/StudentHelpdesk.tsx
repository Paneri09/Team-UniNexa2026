import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupportTicket } from '../../types';
import {
  LifeBuoy,
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Ticket,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const StudentHelpdesk: React.FC = () => {
  const { tickets, createSupportTicket, student } = useApp();

  const [category, setCategory] = useState<SupportTicket['category']>('IT Support');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<SupportTicket['priority']>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    setIsSubmitting(true);
    createSupportTicket({
      category,
      subject,
      description,
      priority,
    });

    setSubject('');
    setDescription('');
    setIsSubmitting(false);
  };

  const filteredTickets = tickets.filter((t) =>
    filterStatus === 'all' ? true : t.status.toLowerCase() === filterStatus.toLowerCase()
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Digital Campus Helpdesk & Support
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Raise requests for IT networking, academics, fee reconciliation, hostels or library assistance
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900">
            SLA: 24 Hours Resolution
          </span>
        </div>
      </div>

      {/* Main Grid: Create Ticket Form + Tickets History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Create Ticket Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Submit Support Ticket
              </h2>
              <p className="text-xs text-slate-400">Directly routed to campus administration</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Issue Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as SupportTicket['category'])}
                className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500 cursor-pointer"
              >
                <option value="IT Support">IT Support & Campus Wi-Fi</option>
                <option value="Academic">Academic & Examination</option>
                <option value="Fees">Fees & MPOnline Payments</option>
                <option value="Hostel">Hostel & Mess Facilities</option>
                <option value="Library">Library & Digital Subscriptions</option>
                <option value="Other">Other University Grievances</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Ticket Subject / Summary
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Wi-Fi connectivity issue in Block B 2nd floor"
                className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Detailed Description & Location
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide specific details, room numbers, device MAC addresses, or error codes..."
                className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 p-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Urgency Priority
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(['low', 'medium', 'high', 'urgent'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPriority(p)}
                    className={`py-1.5 text-xs font-semibold rounded-lg uppercase tracking-wider transition-all ${
                      priority === p
                        ? p === 'urgent'
                          ? 'bg-rose-600 text-white'
                          : 'bg-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Create Ticket</span>
            </button>
          </form>
        </div>

        {/* Right: Previous Tickets & Status Tracker */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              My Support Tickets ({filteredTickets.length})
            </h3>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterStatus === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus('in progress')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterStatus === 'in progress'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setFilterStatus('resolved')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterStatus === 'resolved'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredTickets.map((tkt) => {
              const isResolved = tkt.status === 'Resolved';

              return (
                <div
                  key={tkt.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                        {tkt.ticketNumber}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {tkt.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                          isResolved
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {isResolved ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Resolved</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3.5 h-3.5" />
                            <span>In Progress</span>
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {tkt.subject}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      {tkt.description}
                    </p>
                  </div>

                  {tkt.response && (
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border-l-2 border-indigo-500 text-xs space-y-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Official Administrator Response:
                      </span>
                      <p className="text-slate-600 dark:text-slate-300">
                        {tkt.response}
                      </p>
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Filed: {tkt.createdAt}</span>
                    <span className="capitalize">Priority: {tkt.priority}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
