import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  VIKRAM_CAMPUS_HERO,
  STUDENT_AVATAR,
  ANANYA_AVATAR,
  FACULTY_AVATAR,
} from '../data/mockData';
import { Role } from '../types';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  Building2,
  CalendarCheck,
  BookOpen,
  MapPin,
  CheckCircle2,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { login, selectedStudentId, selectDemoStudent } = useApp();
  const [selectedRole, setSelectedRole] = useState<Role>('student');
  const [activeDemoChoice, setActiveDemoChoice] = useState<'ECE' | 'ECS'>('ECE');
  const [identifier, setIdentifier] = useState('VU26ECE014');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleRoleToggle = (newRole: Role) => {
    setSelectedRole(newRole);
    if (newRole === 'student') {
      setIdentifier(activeDemoChoice === 'ECE' ? 'VU26ECE014' : 'VU26ECS021');
    } else {
      setIdentifier('FAC-ECE-021');
    }
  };

  const handleDemoStudentSelect = (type: 'ECE' | 'ECS') => {
    setActiveDemoChoice(type);
    setIdentifier(type === 'ECE' ? 'VU26ECE014' : 'VU26ECS021');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      if (selectedRole === 'student') {
        const studentId = activeDemoChoice === 'ECS' ? 'VU26ECS021' : 'VU26ECE014';
        login('student', studentId);
      } else {
        login('faculty');
      }
      setIsAuthenticating(false);
    }, 600);
  };

  const handleQuickDemo = (roleChoice: Role, studentIdChoice?: string) => {
    setIsAuthenticating(true);
    setTimeout(() => {
      if (roleChoice === 'student') {
        login('student', studentIdChoice || 'VU26ECE014');
      } else {
        login('faculty');
      }
      setIsAuthenticating(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Header */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-cyan-400 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/25">
            N
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight">
              Nexa<span className="text-indigo-400">ONE</span>
            </span>
            <span className="block text-[11px] text-slate-400 font-medium tracking-wide">
              Vikram University Digital Campus · Ujjain
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            MPOnline State Hackathon · Smart Campus
          </div>
        </div>
      </header>

      {/* Main Hero & Glass Login Grid */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Brand Story & Real Vikram University Campus Visual */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 backdrop-blur-md text-xs font-semibold text-indigo-300">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>NexaONE is built for Vikram University, Ujjain</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              One Campus.{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent">
                One Digital Experience.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              A unified digital campus platform connecting Vikram University students, faculty,
              biometric attendance, academic courses, E-Library, digital vault documents, and
              campus navigation into one seamless system.
            </p>
          </div>

          {/* Actual Vikram University Aerial Campus Visual Frame */}
          <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group bg-slate-900/60 max-w-2xl">
            <img
              src={VIKRAM_CAMPUS_HERO}
              alt="Vikram University, Ujjain Campus Aerial View"
              referrerPolicy="no-referrer"
              className="w-full h-56 sm:h-72 object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle gradient overlay to keep text readable without making image dark */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-xs font-bold text-white flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Vikram University, Ujjain</span>
            </div>

            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-white">Maharaja Vikramaditya Plaza & Administrative Campus</span>
              </div>
              <span className="text-slate-300 text-[11px] hidden sm:inline">Dewas Road, Ujjain (M.P.)</span>
            </div>
          </div>

          {/* Feature Highlights Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-xl pt-1 text-left">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <CalendarCheck className="w-5 h-5 text-indigo-400 mb-1.5" />
              <div className="text-xs font-semibold text-white">Live Attendance</div>
              <div className="text-[11px] text-slate-400">75% statutory tracking</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <BookOpen className="w-5 h-5 text-sky-400 mb-1.5" />
              <div className="text-xs font-semibold text-white">Curriculum Vault</div>
              <div className="text-[11px] text-slate-400">ECE & ECS taxonomies</div>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mb-1.5" />
              <div className="text-xs font-semibold text-white">MPOnline Vault</div>
              <div className="text-[11px] text-slate-400">Verified ID & fee records</div>
            </div>
          </div>
        </div>

        {/* Right Side: Modern Glassmorphism Login Card */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-950/80 rounded-2xl border border-white/10 mb-5">
              <button
                type="button"
                onClick={() => handleRoleToggle('student')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'student'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student Portal</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle('faculty')}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRole === 'faculty'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                <span>Faculty Desk</span>
              </button>
            </div>

            {/* If Student, Choose Demo Student Profile Toggle */}
            {selectedRole === 'student' && (
              <div className="mb-4 p-2 bg-slate-950/60 border border-white/10 rounded-xl">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5 px-1">
                  Choose Demo Student Cohort:
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDemoStudentSelect('ECE')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      activeDemoChoice === 'ECE'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>ECE · Aarav Sharma</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDemoStudentSelect('ECS')}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      activeDemoChoice === 'ECS'
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>ECS · Ananya Verma</span>
                  </button>
                </div>
              </div>
            )}

            {/* Login Header */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-white">
                {selectedRole === 'student'
                  ? `${activeDemoChoice} Student Sign In`
                  : 'Faculty Sign In'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedRole === 'student'
                  ? `Vikram University Roll: ${identifier}`
                  : 'Vikram University Faculty ID: FAC-ECE-021'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {selectedRole === 'student' ? 'Student University ID' : 'Faculty ID / Official Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/70 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-slate-800 border-slate-700 text-indigo-600 w-3.5 h-3.5"
                  />
                  <span>Remember session</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold rounded-xl text-xs tracking-wide shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isAuthenticating ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Verifying Credentials...</span>
                  </span>
                ) : (
                  <>
                    <span>Enter {selectedRole === 'student' ? `${activeDemoChoice} Student` : 'Faculty'} Portal</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* 1-Click Demo Profiles for Hackathon Judges */}
            <div className="mt-5 pt-4 border-t border-white/10 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Instant 1-Click Hackathon Demo Access
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {/* 1. ECE Student */}
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student', 'VU26ECE014')}
                  disabled={isAuthenticating}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
                >
                  <img
                    src={STUDENT_AVATAR}
                    alt="Aarav Sharma"
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-indigo-400/40 shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                      Aarav Sharma
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      B.Tech ECE (VU26ECE014)
                    </div>
                  </div>
                </button>

                {/* 2. ECS Student */}
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student', 'VU26ECS021')}
                  disabled={isAuthenticating}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
                >
                  <img
                    src={ANANYA_AVATAR}
                    alt="Ananya Verma"
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-cyan-400/40 shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      Ananya Verma
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      B.Tech ECS (VU26ECS021)
                    </div>
                  </div>
                </button>

                {/* 3. Faculty */}
                <button
                  type="button"
                  onClick={() => handleQuickDemo('faculty')}
                  disabled={isAuthenticating}
                  className="flex items-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all group"
                >
                  <img
                    src={FACULTY_AVATAR}
                    alt="Dr. Priya Mehta"
                    className="w-8 h-8 rounded-lg object-cover ring-1 ring-purple-400/40 shrink-0"
                  />
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                      Dr. Priya Mehta
                    </div>
                    <div className="text-[9px] text-slate-400 truncate">
                      Faculty / HOD
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
        <div>
          © 2026 NexaONE Platform · Vikram University, Ujjain · MPOnline State Hackathon
        </div>
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <span>Role-Based Access Control</span>
          <span>·</span>
          <span>Dewas Road Campus, Ujjain</span>
        </div>
      </footer>
    </div>
  );
};
