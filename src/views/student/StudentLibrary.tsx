import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LibraryItem } from '../../types';
import {
  BookOpen,
  Search,
  Download,
  Eye,
  FolderTree,
  ChevronRight,
  Filter,
  FileText,
  User,
  Layers,
  Sparkles,
  X,
  CheckCircle2,
} from 'lucide-react';

export const StudentLibrary: React.FC = () => {
  const { libraryItems, showToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [activeReadingItem, setActiveReadingItem] = useState<LibraryItem | null>(null);

  const subjects = ['all', ...Array.from(new Set(libraryItems.map((i) => i.subject)))];
  const authors = ['all', ...Array.from(new Set(libraryItems.map((i) => i.author)))];

  const filteredItems = libraryItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || item.subject === selectedSubject;
    const matchesAuthor = selectedAuthor === 'all' || item.author === selectedAuthor;
    return matchesSearch && matchesSubject && matchesAuthor;
  });

  const handleDownload = (item: LibraryItem) => {
    showToast(
      'Download Started',
      `Downloading "${item.title}" (${item.fileSize}) from NexaONE Repository.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Breadcrumb Hierarchy Visual */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          {/* Breadcrumb Hierarchy */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1 flex-wrap">
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">B.Tech ECE</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span>Semester 1</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-700 dark:text-slate-200 font-medium">
              {selectedSubject === 'all' ? 'All Subjects' : selectedSubject}
            </span>
            {selectedAuthor !== 'all' && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-indigo-500 font-medium">{selectedAuthor}</span>
              </>
            )}
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            NexaONE Central E-Library
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-900">
            Open Access · 128 Handbooks
          </span>
        </div>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col md:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by book title, author (Floyd, Grewal, Beiser), or subject..."
            className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 pl-10 pr-4 py-2.5 rounded-xl border border-transparent focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Subject Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full md:w-48 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white py-2.5 px-3 rounded-xl border border-transparent focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            <option value="all">All Subjects</option>
            {subjects.filter((s) => s !== 'all').map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          {/* Author Filter */}
          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="w-full md:w-44 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white py-2.5 px-3 rounded-xl border border-transparent focus:border-indigo-500 focus:outline-none cursor-pointer"
          >
            <option value="all">All Authors</option>
            {authors.filter((a) => a !== 'all').map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Library Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between transition-all group"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                  {item.materialType}
                </span>
                <span className="text-[11px] text-slate-400 tabular-nums">
                  {item.fileSize}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>By {item.author}</span>
                </p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>{item.subject}</span>
                <span>{item.pages} Pages · {item.downloads} Reads</span>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center gap-2">
              <button
                onClick={() => setActiveReadingItem(item)}
                className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-indigo-500" />
                <span>Open Reader</span>
              </button>

              <button
                onClick={() => handleDownload(item)}
                title="Download PDF"
                className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs transition-colors shrink-0"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Reader Modal Viewer */}
      {activeReadingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full h-[650px] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeReadingItem.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {activeReadingItem.author} · {activeReadingItem.edition || 'University Scheme'} · {activeReadingItem.pages} Pages
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(activeReadingItem)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Save PDF</span>
                </button>
                <button
                  onClick={() => setActiveReadingItem(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reader Simulation Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 bg-slate-50/30 dark:bg-slate-900/40">
              <div className="max-w-2xl mx-auto space-y-5 text-slate-800 dark:text-slate-200 text-xs sm:text-sm leading-relaxed">
                <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/40 dark:border-indigo-900/40">
                  <span className="text-[10px] font-bold uppercase text-indigo-600 dark:text-indigo-400 block mb-1">
                    NexaONE Institutional Digital Watermark
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Licensed to student Aarav Sharma (VU26ECE014) for exclusive non-commercial academic research at Smart University.
                  </p>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white pt-2 border-b border-slate-200 dark:border-slate-800 pb-2">
                  Chapter 1: Foundations & Analytical Framework
                </h2>

                <p>
                  In modern electronics and digital computer architectures, information is represented in binary notation comprising discreet voltage levels corresponding to logic high ('1') and logic low ('0'). Boolean algebra provides the mathematical framework to formulate, reduce, and synthesize such combinational switching networks.
                </p>

                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs space-y-1">
                  <div className="text-indigo-600 dark:text-indigo-400 font-bold">// Canonical De Morgan’s Theorems:</div>
                  <div>1. (A · B)' = A' + B'</div>
                  <div>2. (A + B)' = A' · B'</div>
                  <div className="text-slate-500 pt-1">// Universal Gate Equivalences: NAND and NOR synthesize all primitives.</div>
                </div>

                <p>
                  The implementation of logic functions using Karnaugh maps allows engineering students to visualize adjacent minterms in Gray code ordering, guaranteeing minimal silicon area and propagation delay across integrated circuits.
                </p>

                <p>
                  Review practice problems at the end of section 1.4 for the upcoming class tests conducted by Dr. Priya Mehta.
                </p>
              </div>
            </div>

            {/* Reader Footer Controls */}
            <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-center justify-between text-xs text-slate-500">
              <span>Reading Page 1 of {activeReadingItem.pages}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast('Previous Page', undefined, 'info')}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200"
                >
                  Previous
                </button>
                <button
                  onClick={() => showToast('Next Page', undefined, 'info')}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
