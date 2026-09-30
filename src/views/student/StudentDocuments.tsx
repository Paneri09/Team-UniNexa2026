import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentRecord } from '../../types';
import {
  ShieldCheck,
  Lock,
  Download,
  Eye,
  Search,
  Filter,
  QrCode,
  FileCheck,
  CreditCard,
  GraduationCap,
  Calendar,
  CheckCircle2,
  X,
  Printer,
  Sparkles,
  Wifi,
} from 'lucide-react';

export const StudentDocuments: React.FC = () => {
  const { student, documents, showToast } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | 'id_card' | 'academic' | 'fee'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingDoc, setViewingDoc] = useState<DocumentRecord | null>(null);

  const filteredDocs = documents.filter((doc) => {
    const matchesCat = activeCategory === 'all' || doc.category === activeCategory;
    const matchesQuery =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleDownload = (doc: DocumentRecord) => {
    showToast('Download Initiated', `Downloading ${doc.title} (${doc.fileSize}) with digital seal.`, 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/20 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>NexaONE Cryptographic Document Vault</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Secure Student Credentials & Records
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            "Your documents are securely organized in one place." Verified with MPOnline institutional PKI.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Tamper-Proof Ledger</span>
          </div>
        </div>
      </div>

      {/* Hero Section: Interactive Digital Smart Campus ID Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* The Digital ID Card Preview */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 border border-indigo-500/30 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden group">
          {/* Card background circuit pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* ID Card Top Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-sm">
                N
              </div>
              <div>
                <span className="text-sm font-black tracking-tight">NexaONE UNIVERSITY</span>
                <span className="block text-[9px] text-indigo-300 font-mono tracking-widest uppercase">
                  Digital Smart Pass
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded-full border border-white/15">
              <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>NFC ACTIVE</span>
            </div>
          </div>

          {/* ID Card Body */}
          <div className="flex gap-4 items-center my-5">
            <img
              src={student.avatar}
              alt={student.name}
              referrerPolicy="no-referrer"
              className="w-24 h-28 object-cover rounded-xl border-2 border-indigo-400/50 shadow-md"
            />
            <div className="space-y-1">
              <span className="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider block">
                Student Identity
              </span>
              <h3 className="text-lg font-bold leading-snug">{student.name}</h3>
              <p className="text-xs font-mono text-cyan-300 font-bold">{student.identifier}</p>
              <div className="text-[11px] text-slate-300 pt-1 space-y-0.5">
                <div>{student.branch} · {student.semester}</div>
                <div>Blood: O +ve · Valid: 2030</div>
              </div>
            </div>
          </div>

          {/* ID Card QR Code & Barcode */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            {/* Simulated Barcode */}
            <div className="space-y-1">
              <div className="h-7 w-36 bg-white/90 p-1 flex items-stretch gap-0.5 rounded">
                {[2, 1, 3, 1, 2, 1, 4, 1, 2, 3, 1, 2, 1, 3, 2].map((w, i) => (
                  <div
                    key={i}
                    className="bg-black"
                    style={{ width: `${w * 2}px` }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-slate-400 tracking-wider">
                NX-849102-ID
              </span>
            </div>

            {/* Simulated QR Code box */}
            <div className="w-14 h-14 bg-white p-1 rounded-lg flex items-center justify-center shadow-md">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-indigo-300">
            <span>Library RFID Linked</span>
            <button
              onClick={() => showToast('Smart ID Card Ready', 'NFC badge synced with campus turnstiles.', 'info')}
              className="hover:underline font-bold"
            >
              Test Tap Sim
            </button>
          </div>
        </div>

        {/* Right: Quick Verification & Security Trust Panel */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              Institutional Security Verification
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              All credentials stored inside your NexaONE Vault are hashed using SHA-256 and verified
              against the university registrar authority. Any degree transcript or mark sheet shared
              from this portal carries verifiable QR verification.
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-400 block uppercase">Semester SGPA</span>
                <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
                  {student.cgpa}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-400 block uppercase">Fee Status</span>
                <span className="text-lg font-black text-emerald-500">
                  Paid (₹0 Due)
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-[10px] text-slate-400 block uppercase">Active Passes</span>
                <span className="text-lg font-black text-slate-900 dark:text-white">
                  3 Active
                </span>
              </div>
            </div>
          </div>

          {/* Search & Category Filter Toolbar */}
          <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search marksheets, fee receipts, transcripts..."
                className="w-full bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 pl-9 pr-3 py-2 rounded-xl focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => setActiveCategory('all')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveCategory('academic')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === 'academic'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Academic
              </button>
              <button
                onClick={() => setActiveCategory('fee')}
                className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeCategory === 'fee'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Fees & Receipts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Document Records Cards */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">
          Archived Institutional Documents ({filteredDocs.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {doc.category === 'fee' ? 'Fee Record' : doc.category === 'academic' ? 'Academic Record' : 'Official Pass'}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {doc.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {doc.description}
                </p>

                <div className="pt-2 text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>Ref: {doc.documentNumber}</span>
                  <span>Issued: {doc.issueDate}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => setViewingDoc(doc)}
                  className="flex-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Inspect Document</span>
                </button>
                <button
                  onClick={() => handleDownload(doc)}
                  className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs transition-colors shrink-0"
                  title="Download File"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document View Modal Dialog */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {viewingDoc.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {viewingDoc.documentNumber}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {viewingDoc.description}
            </p>

            {/* Metadata Preview */}
            {viewingDoc.metadata && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Verified Data Fields
                </span>
                {Object.entries(viewingDoc.metadata).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{key}:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{val}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs text-slate-400">Digitally Sealed with 256-bit RSA</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(viewingDoc)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
