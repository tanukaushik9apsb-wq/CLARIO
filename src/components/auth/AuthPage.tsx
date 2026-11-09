import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { 
  User, GraduationCap, Shield, Lock, Mail, ArrowRight, 
  CheckCircle2, Sparkles, BookOpen, Key, Building2, Award, Compass, AlertCircle
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, signUp, resetPassword, setCurrentView } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [examOrCollege, setExamOrCollege] = useState('JEE Main');
  const [rankOrRoll, setRankOrRoll] = useState('');
  const [homeState, setHomeState] = useState('Maharashtra');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (mode === 'signin') {
        const res = await login(selectedRole, {
          name: name || (selectedRole === 'student' ? 'Aarush Sharma' : selectedRole === 'mentor' ? 'Aarav Sharma' : 'Administrator'),
          email: email || `${selectedRole}@clario.in`,
          role: selectedRole,
          collegeOrExam: examOrCollege,
          rank: rankOrRoll,
          homeState
        }, password);

        if (!res.success && res.error) {
          setErrorMessage(res.error);
        }
      } else if (mode === 'signup') {
        const res = await signUp(email, password, {
          name: name || 'New User',
          role: selectedRole,
          homeState
        });

        if (!res.success && res.error) {
          setErrorMessage(res.error);
        }
      } else if (mode === 'forgot') {
        if (!email.trim()) {
          setErrorMessage('Please enter your registered email address.');
          setIsLoading(false);
          return;
        }
        await resetPassword(email);
        setMode('signin');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = async (role: UserRole) => {
    setIsLoading(true);
    setErrorMessage(null);
    if (role === 'student') {
      await login('student', {
        name: 'Aarush Sharma',
        email: 'aarush.sharma2026@gmail.com',
        role: 'student',
        rank: 'CRL 3,850',
        collegeOrExam: 'JEE Main 2026',
        homeState: 'Maharashtra'
      });
    } else if (role === 'mentor') {
      await login('mentor', {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@iitb.ac.in',
        role: 'mentor',
        rank: 'AIR 42 (JEE Adv)',
        collegeOrExam: 'IIT Bombay (CSE)',
        homeState: 'Maharashtra'
      });
    } else if (role === 'admin') {
      await login('admin', {
        name: 'Central Counselling Board Officer',
        email: 'superadmin@clario.gov.in',
        role: 'admin',
        collegeOrExam: 'Central Counselling Board'
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Top Branding */}
        <div className="text-center mb-8">
          <button
            onClick={() => setCurrentView('landing')}
            className="inline-flex items-center gap-2.5 focus:outline-none group mb-2"
          >
            <div className="w-9 h-9 rounded-xl bg-[#172F91] flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-[#DDF587]" />
            </div>
            <span className="font-serif text-3xl sm:text-4xl font-semibold tracking-tight text-[#172F91]">
              Clario<span className="text-[#8CB7FF]">.</span>
            </span>
          </button>
          <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#111827] mt-1">
            Access Your Indian Counselling & Mentorship Hub
          </h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Select your persona to sign in or create your verified credentials
          </p>
        </div>

        {/* Bento Grid Auth Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Role Selection Bento Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200/80">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-3">
                Step 1: Choose Your Persona
              </span>

              <div className="space-y-3">
                
                {/* Student Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('student')}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    selectedRole === 'student'
                      ? 'bg-[#172F91] text-white border-[#172F91] shadow-md ring-2 ring-[#172F91]/20'
                      : 'bg-[#F8F9FA] text-[#1E293B] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedRole === 'student' ? 'bg-white/15 text-white' : 'bg-blue-50 text-[#172F91]'
                  }`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif text-base font-semibold leading-tight">
                      Aspirant / Student
                    </div>
                    <div className={`text-[11px] mt-1 leading-snug ${
                      selectedRole === 'student' ? 'text-white/80' : 'text-[#64748B]'
                    }`}>
                      Build choice shortlists, predict cutoffs, track JoSAA deadlines & book 1-on-1 sessions.
                    </div>
                  </div>
                </button>

                {/* Mentor Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('mentor')}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    selectedRole === 'mentor'
                      ? 'bg-[#172F91] text-white border-[#172F91] shadow-md ring-2 ring-[#172F91]/20'
                      : 'bg-[#F8F9FA] text-[#1E293B] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedRole === 'mentor' ? 'bg-white/15 text-white' : 'bg-emerald-50 text-[#27866B]'
                  }`}>
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif text-base font-semibold leading-tight">
                      Verified Student Mentor
                    </div>
                    <div className={`text-[11px] mt-1 leading-snug ${
                      selectedRole === 'mentor' ? 'text-white/80' : 'text-[#64748B]'
                    }`}>
                      Enrolled at IIT, NIT, BITS, or Top State Colleges. Offer 1-on-1 guidance & manage consultation slots.
                    </div>
                  </div>
                </button>

                {/* Admin Card */}
                <button
                  type="button"
                  onClick={() => setSelectedRole('admin')}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                    selectedRole === 'admin'
                      ? 'bg-[#172F91] text-white border-[#172F91] shadow-md ring-2 ring-[#172F91]/20'
                      : 'bg-[#F8F9FA] text-[#1E293B] border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    selectedRole === 'admin' ? 'bg-white/15 text-white' : 'bg-slate-100 text-[#111827]'
                  }`}>
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-serif text-base font-semibold leading-tight">
                      Counselling Administrator
                    </div>
                    <div className={`text-[11px] mt-1 leading-snug ${
                      selectedRole === 'admin' ? 'text-white/80' : 'text-[#64748B]'
                    }`}>
                      Publish gazetted notices, verify mentor credentials & review campus feedback.
                    </div>
                  </div>
                </button>

              </div>
            </div>

            {/* Instant 1-Click Persona Demos */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-200/80">
              <div className="flex items-center gap-2 mb-2 text-[#172F91] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Evaluator Demo Presets</span>
              </div>
              <p className="text-[11px] text-[#64748B] mb-3 leading-relaxed">
                Experience Clario with zero typing by selecting any pre-configured Indian persona:
              </p>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemo('student')}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-[#172F91] border border-blue-200 shadow-sm flex items-center justify-between transition-all"
                >
                  <span>Aspirant Demo (Aarush • CRL 3,850)</span>
                  <span className="text-[11px] font-mono">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('mentor')}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-emerald-800 border border-emerald-200 shadow-sm flex items-center justify-between transition-all"
                >
                  <span>Mentor Demo (Aarav • IIT Bombay)</span>
                  <span className="text-[11px] font-mono">→</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  className="w-full py-2.5 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-[#111827] border border-slate-300 shadow-sm flex items-center justify-between transition-all"
                >
                  <span>Superadmin Console Demo</span>
                  <span className="text-[11px] font-mono">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Sign In / Sign Up Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-8 shadow-sm border border-slate-200/80">
              
              {/* Tab Switcher: Sign In vs Sign Up vs Forgot */}
              <div className="flex items-center p-1 rounded-2xl bg-[#E5E7EB] mb-6">
                <button
                  type="button"
                  onClick={() => { setMode('signin'); setErrorMessage(null); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    mode === 'signin' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#64748B] hover:text-[#111827]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('signup'); setErrorMessage(null); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    mode === 'signup' ? 'bg-white text-[#111827] shadow-sm' : 'text-[#64748B] hover:text-[#111827]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error Notice */}
              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                {mode === 'signup' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                      Full Legal Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={selectedRole === 'student' ? 'e.g. Aarush Sharma' : selectedRole === 'mentor' ? 'e.g. Aarav Sharma' : 'e.g. Admin Officer'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#172F91]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                    Official Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder={
                        selectedRole === 'student' 
                          ? 'student@gmail.com' 
                          : selectedRole === 'mentor' 
                          ? 'rollnumber@iitb.ac.in (Institute email)' 
                          : 'admin@clario.gov.in'
                      }
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#172F91]"
                    />
                  </div>
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-[#475569] uppercase tracking-wider">
                        Password
                      </label>
                      {mode === 'signin' && (
                        <button
                          type="button"
                          onClick={() => setMode('forgot')}
                          className="text-[11px] text-[#172F91] hover:underline"
                        >
                          Forgot Password?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#172F91]"
                      />
                    </div>
                  </div>
                )}

                {/* Conditional Fields based on Role */}
                {selectedRole === 'student' && mode === 'signup' && (
                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-semibold text-[#475569] uppercase tracking-wider mb-1">
                        Primary Exam
                      </label>
                      <select
                        value={examOrCollege}
                        onChange={(e) => setExamOrCollege(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#111827]"
                      >
                        <option value="JEE Main">JEE Main</option>
                        <option value="JEE Advanced">JEE Advanced</option>
                        <option value="BITSAT">BITSAT</option>
                        <option value="MHT-CET">MHT-CET</option>
                        <option value="WBJEE">WBJEE</option>
                        <option value="KCET">KCET</option>
                        <option value="UPTAC">UPTAC</option>
                        <option value="TNEA">TNEA</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-[#475569] uppercase tracking-wider mb-1">
                        Home State Domicile
                      </label>
                      <select
                        value={homeState}
                        onChange={(e) => setHomeState(e.target.value)}
                        className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#111827]"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Telangana">Telangana</option>
                      </select>
                    </div>
                  </div>
                )}

                {selectedRole === 'mentor' && mode === 'signup' && (
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569] uppercase tracking-wider mb-1.5">
                      Enrolled Institute & Branch
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. IIT Bombay - Computer Science"
                      value={examOrCollege}
                      onChange={(e) => setExamOrCollege(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none"
                    />
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase bg-[#172F91] text-white hover:bg-[#122470] flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>{isLoading ? 'Authenticating with Supabase...' : mode === 'signin' ? `Sign In as ${selectedRole.toUpperCase()}` : mode === 'signup' ? 'Create Verified Profile' : 'Send Password Reset Email'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {mode === 'forgot' && (
                  <div className="text-center pt-2">
                    <button
                      type="button"
                      onClick={() => setMode('signin')}
                      className="text-xs text-[#172F91] hover:underline"
                    >
                      ← Back to Sign In
                    </button>
                  </div>
                )}
              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
