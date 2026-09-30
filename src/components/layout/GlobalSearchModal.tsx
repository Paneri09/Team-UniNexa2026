import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  BookOpen,
  FileText,
  MapPin,
  Calendar,
  Sparkles,
  ArrowRight,
  X,
  GraduationCap,
} from 'lucide-react';
import { CAMPUS_BUILDINGS } from '../../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    role,
    courses,
    assignments,
    libraryItems,
    documents,
    events,
    navigate,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredCourses = q
    ? courses.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q) ||
          c.faculty.toLowerCase().includes(q)
      )
    : [];

  const filteredAssignments = q
    ? assignments.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subjectName.toLowerCase().includes(q)
      )
    : [];

  const filteredLibrary = q
    ? libraryItems.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.author.toLowerCase().includes(q) ||
          l.subject.toLowerCase().includes(q)
      )
    : [];

  const filteredEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q)
      )
    : [];

  const filteredLocations = q
    ? CAMPUS_BUILDINGS.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.department.toLowerCase().includes(q) ||
          b.shortCode.toLowerCase().includes(q)
      )
    : [];

  const filteredDocs =
    role === 'student' && q
      ? documents.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.documentNumber.toLowerCase().includes(q)
        )
      : [];

  const totalResults =
    filteredCourses.length +
    filteredAssignments.length +
    filteredLibrary.length +
    filteredEvents.length +
    filteredLocations.length +
    filteredDocs.length;

  const handleSelect = (route: string) => {
    navigate(route);
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses, library books, assignments, campus buildings, events..."
            className="w-full bg-transparent text-sm md:text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] font-medium text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded">
            ESC to close
          </span>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!query ? (
            <div className="text-center py-10 space-y-3">
              <Sparkles className="w-8 h-8 text-indigo-500 mx-auto opacity-70" />
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Type anything to search across the entire NexaONE campus
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {['Digital Electronics', 'Thomas Floyd', 'TechNova', 'Library', 'Hostel', 'Exam Schedule'].map(
                  (term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      {term}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                No campus records matched "{query}"
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for a subject code, faculty name, or building
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Courses */}
              {filteredCourses.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                    Courses & Subjects
                  </h4>
                  <div className="space-y-1">
                    {filteredCourses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() =>
                          handleSelect(
                            role === 'student'
                              ? '/student/courses'
                              : '/faculty/assignments'
                          )
                        }
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {c.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {c.code} · {c.faculty} · {c.room}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Assignments */}
              {filteredAssignments.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-amber-500" />
                    Assignments
                  </h4>
                  <div className="space-y-1">
                    {filteredAssignments.map((a) => (
                      <button
                        key={a.id}
                        onClick={() =>
                          handleSelect(
                            role === 'student'
                              ? '/student/assignments'
                              : '/faculty/assignments'
                          )
                        }
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {a.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {a.subjectName} · Due {a.dueDate} · {a.status.toUpperCase()}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Library */}
              {filteredLibrary.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                    E-Library Books & Notes
                  </h4>
                  <div className="space-y-1">
                    {filteredLibrary.map((item) => (
                      <button
                        key={item.id}
                        onClick={() =>
                          handleSelect(
                            role === 'student'
                              ? '/student/library'
                              : '/faculty/library'
                          )
                        }
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            By {item.author} · {item.materialType} · {item.subject}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Campus Locations */}
              {filteredLocations.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    Campus Locations & Facilities
                  </h4>
                  <div className="space-y-1">
                    {filteredLocations.map((loc) => (
                      <button
                        key={loc.id}
                        onClick={() =>
                          handleSelect(
                            role === 'student'
                              ? '/student/map'
                              : '/faculty/calendar'
                          )
                        }
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {loc.name} ({loc.shortCode})
                          </p>
                          <p className="text-xs text-slate-500">
                            {loc.department} · {loc.workingHours}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Events */}
              {filteredEvents.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-purple-500" />
                    Campus Events
                  </h4>
                  <div className="space-y-1">
                    {filteredEvents.map((evt) => (
                      <button
                        key={evt.id}
                        onClick={() =>
                          handleSelect(
                            role === 'student'
                              ? '/student/events'
                              : '/faculty/events'
                          )
                        }
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {evt.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {evt.date} · {evt.venue} · {evt.category}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Documents */}
              {filteredDocs.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-2 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-500" />
                    Document Vault
                  </h4>
                  <div className="space-y-1">
                    {filteredDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => handleSelect('/student/documents')}
                        className="w-full text-left flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                            {doc.title}
                          </p>
                          <p className="text-xs text-slate-500">
                            {doc.documentNumber} · Issued {doc.issueDate}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
