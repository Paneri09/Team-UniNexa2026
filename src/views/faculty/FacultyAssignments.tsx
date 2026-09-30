import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Assignment } from '../../types';
import {
  FileCheck2,
  PlusCircle,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  Paperclip,
  X,
  Check,
  Send,
  Filter,
} from 'lucide-react';

export const FacultyAssignments: React.FC = () => {
  const { assignments, createAssignment, faculty } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'published' | 'draft' | 'expired'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [branch, setBranch] = useState('B.Tech ECE');
  const [semester, setSemester] = useState('1st Semester');
  const [subjectName, setSubjectName] = useState('Digital Electronics');
  const [subjectCode, setSubjectCode] = useState('ECE106');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('2026-10-10');
  const [maxMarks, setMaxMarks] = useState(25);
  const [attachmentName, setAttachmentName] = useState('Assignment_Problem_Sheet.pdf');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createAssignment({
      title,
      subjectCode,
      subjectName,
      facultyName: faculty.name,
      branch,
      semester,
      description,
      dueDate,
      maxMarks: Number(maxMarks),
      attachmentName,
    });

    setIsModalOpen(false);
    setTitle('');
    setDescription('');
  };

  const filteredAssignments = assignments.filter((a) => {
    if (activeFilter === 'published') return a.status === 'pending';
    if (activeFilter === 'expired') return a.dueDate < '2026-09-29';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Faculty Assignment CMS
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Create, publish and evaluate coursework for enrolled cohorts
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20 transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Create Assignment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start w-fit">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeFilter === 'all'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          All ({assignments.length})
        </button>
        <button
          onClick={() => setActiveFilter('published')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeFilter === 'published'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Active / Published ({assignments.filter((a) => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveFilter('expired')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeFilter === 'expired'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          Past Deadlines
        </button>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((asg) => (
          <div
            key={asg.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  {asg.subjectCode} · {asg.subjectName}
                </span>
                <span className="text-slate-400 text-xs">|</span>
                <span className="text-xs text-slate-500">
                  Cohort: {asg.branch} ({asg.semester})
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {asg.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                {asg.description}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                <span>Due Date: <strong className="text-slate-700 dark:text-slate-300">{asg.dueDate}</strong></span>
                <span>·</span>
                <span>Max Marks: {asg.maxMarks}</span>
                {asg.attachmentName && (
                  <>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-indigo-500">
                      <Paperclip className="w-3 h-3" /> {asg.attachmentName}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center shrink-0">
              <div className="text-right">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block">
                  {asg.status === 'submitted' ? '1 Submission' : '0 Submissions'}
                </span>
                <span className="text-[10px] text-slate-400">
                  Visible on student portal
                </span>
              </div>

              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                Published ✓
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Assignment Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Publish New Coursework Assignment
                </h3>
                <p className="text-xs text-slate-400">
                  Immediately syncs to enrolled student dashboards
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Logic Gates Assignment"
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Branch
                  </label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="B.Tech ECE">B.Tech ECE</option>
                    <option value="B.Tech CSE">B.Tech CSE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="3rd Semester">3rd Semester</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject
                  </label>
                  <select
                    value={subjectName}
                    onChange={(e) => {
                      setSubjectName(e.target.value);
                      setSubjectCode(e.target.value.includes('Math') ? 'MATH101' : 'ECE106');
                    }}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Digital Electronics">Digital Electronics (ECE106)</option>
                    <option value="Engineering Mathematics">Engineering Math (MATH101)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Submission Due Date
                  </label>
                  <input
                    type="date"
                    required
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Problem Description & Instructions
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Design and simulate universal NAND/NOR logic gates implementation for full-adder..."
                  className="w-full text-xs p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Assignment</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
