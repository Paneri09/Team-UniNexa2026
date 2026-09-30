import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Assignment } from '../../types';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Calendar,
  User,
  Paperclip,
  Check,
  X,
  FileCheck,
} from 'lucide-react';

export const StudentAssignments: React.FC = () => {
  const { assignments, submitAssignment } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted'>('all');
  const [selectedForSubmission, setSelectedForSubmission] = useState<Assignment | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [simulatedFile, setSimulatedFile] = useState<string>('logic_gates_circuit_diagram.pdf');

  const filtered = assignments.filter((a) => {
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'submitted') return a.status === 'submitted' || a.status === 'graded';
    return true;
  });

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForSubmission) return;
    submitAssignment(selectedForSubmission.id, submissionNotes);
    setSelectedForSubmission(null);
    setSubmissionNotes('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Assignments & Submissions
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Submit coursework, track evaluations and monitor impending deadlines
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All ({assignments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'pending'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pending ({assignments.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              filter === 'submitted'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Submitted ({assignments.filter((a) => a.status !== 'pending').length})
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              No tasks in this category
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              You are completely caught up on all academic submissions!
            </p>
          </div>
        ) : (
          filtered.map((asg) => {
            const isPending = asg.status === 'pending';
            const daysLeft =
              asg.id === 'asg-001'
                ? 3
                : asg.id === 'asg-002'
                ? 5
                : asg.id === 'asg-003'
                ? 7
                : 10;
            const isDueSoon = isPending && daysLeft <= 7;

            return (
              <div
                key={asg.id}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      {asg.subjectCode} · {asg.subjectName}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3" /> {asg.facultyName}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {asg.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
                    {asg.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Assigned: {asg.assignedDate}
                    </span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Max Marks: {asg.maxMarks}
                    </span>
                    {asg.attachmentName && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-medium">
                          <Paperclip className="w-3 h-3" /> {asg.attachmentName}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center gap-3 shrink-0 self-stretch sm:self-auto justify-between border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400">Due:</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {asg.dueDate}
                      </span>
                    </div>

                    {isDueSoon && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded mt-1">
                        <Clock className="w-3 h-3" />
                        Due in {daysLeft} days
                      </span>
                    )}

                    {!isPending && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded mt-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Submitted on {asg.submissionDate || 'Record'}
                      </span>
                    )}
                  </div>

                  {isPending ? (
                    <button
                      onClick={() => setSelectedForSubmission(asg)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Submit Solution</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-xl text-xs font-medium cursor-default flex items-center gap-1"
                    >
                      <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Completed</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Submission Modal Dialog */}
      {selectedForSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {selectedForSubmission.subjectCode} · {selectedForSubmission.subjectName}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  Submit Assignment: {selectedForSubmission.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedForSubmission(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSubmit} className="space-y-4">
              {/* File Attachment Simulation */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Upload Solution File (.pdf, .docx, .zip)
                </label>
                <div className="border-2 border-dashed border-indigo-500/40 bg-indigo-50/20 dark:bg-indigo-950/20 rounded-xl p-4 text-center cursor-pointer hover:bg-indigo-50/40 transition-colors">
                  <Upload className="w-6 h-6 text-indigo-500 mx-auto mb-1.5" />
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {simulatedFile}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Click to browse or drag and drop your report
                  </p>
                </div>
              </div>

              {/* Submission Notes */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Submission Comments / Git Repository Link
                </label>
                <textarea
                  rows={3}
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  placeholder="e.g. Completed with Logisim simulation screenshots and truth table verification..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedForSubmission(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Confirm & Upload</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
