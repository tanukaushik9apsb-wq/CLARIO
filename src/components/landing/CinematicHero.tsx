import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ChevronLeft, ChevronRight, Sparkles, ArrowRight, ArrowUpRight, 
  ShieldCheck, CheckCircle2, Bell, Calendar, UserCheck, Check, Clock
} from 'lucide-react';

interface CampusSlide {
  id: string;
  name: string;
  location: string;
  image: string;
  badge: string;
}

const CAMPUS_SLIDES: CampusSlide[] = [
  {
    id: 'iitb',
    name: 'IIT Bombay',
    location: 'Powai, Mumbai',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
    badge: 'JoSAA • NIRF #1 Tech'
  },
  {
    id: 'iitd',
    name: 'IIT Delhi',
    location: 'Hauz Khas, New Delhi',
    image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80',
    badge: 'JoSAA • NIRF #2 Tech'
  },
  {
    id: 'bits',
    name: 'BITS Pilani',
    location: 'Pilani, Rajasthan',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80',
    badge: 'BITSAT • Premier Tech'
  },
  {
    id: 'aiims',
    name: 'AIIMS New Delhi',
    location: 'Ansari Nagar, New Delhi',
    image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=1200&q=80',
    badge: 'NEET UG • NIRF #1 Medical'
  }
];

export const CinematicHero: React.FC = () => {
  const { setCurrentView } = useApp();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [alertsEnabled, setAlertsEnabled] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % CAMPUS_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentSlide = CAMPUS_SLIDES[currentSlideIndex];

  return (
    <section className="bg-[#E5E7EB] text-[#111827] pt-6 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        
        {/* TOP ROW OF BENTO GRID (Hero statement card + Match Score + Shortlist & Toggle) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Card 1: Master Hero Banner (Spans 6 cols on lg) */}
          <div className="lg:col-span-6 rounded-3xl bg-[#D6D9E0] p-7 sm:p-9 border border-slate-300/70 shadow-xs flex flex-col justify-between relative overflow-hidden group">
            {/* Top pill tags */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
              <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
                <span className="w-2 h-2 rounded-full bg-[#172F91] animate-pulse"></span>
                <span>Admissions 2026 • Verified Network</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full border border-slate-400/60 bg-white/60 text-[#111827]">
                  JoSAA & CSAB
                </span>
                <span className="text-[11px] font-semibold px-3 py-1 rounded-full border border-slate-400/60 bg-white/60 text-[#111827]">
                  NEET & BITS
                </span>
              </div>
            </div>

            {/* Master Headline */}
            <div className="relative z-10 my-4">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#111827] leading-[1.08] tracking-tight">
                Choose Wisely,<br />
                <span className="font-sans font-bold text-slate-800">dream fearlessly.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#475569] mt-4 max-w-lg leading-relaxed">
                College counselling, verified student insights, and critical deadline tracking — engineered for zero regrets.
              </p>
            </div>

            {/* Action buttons */}
            <div className="pt-6 relative z-10 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setCurrentView('explore');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#111827] text-white hover:bg-black font-semibold text-xs tracking-wider uppercase shadow-sm transition-all duration-200 active:scale-95"
              >
                <span>BUILD MY COLLEGE LIST</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setCurrentView('mentors');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-slate-300 text-[#111827] hover:bg-slate-50 font-semibold text-xs tracking-wider uppercase transition-all duration-200"
              >
                <span>EXPLORE MENTORS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Card 2: Match Score Gauge (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 rounded-3xl bg-white p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-[#111827]">Match score</div>
              <div className="text-xs text-[#64748B] mt-0.5">IIT Bombay • Computer Science</div>
            </div>

            {/* Semi-circle Gauge */}
            <div className="flex flex-col items-center justify-center my-4 relative">
              <svg className="w-44 h-24 overflow-visible" viewBox="0 0 160 85">
                <path
                  d="M 15 80 A 65 65 0 0 1 145 80"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                <path
                  d="M 15 80 A 65 65 0 0 1 145 80"
                  fill="none"
                  stroke="#DDF587"
                  strokeWidth="12"
                  strokeDasharray="204"
                  strokeDashoffset="24"
                  strokeLinecap="round"
                />
              </svg>
              <div className="text-4xl font-serif font-bold text-[#111827] -mt-10">92</div>
              <div className="text-[11px] font-semibold text-emerald-800 bg-[#DDF587] px-2.5 py-0.5 rounded-full mt-2">
                High Match Potential
              </div>
            </div>

            <div className="text-[11px] text-[#64748B] text-center border-t border-slate-100 pt-3">
              Historical closing rank: <strong>AIR 67</strong> • 2025 Round 6
            </div>
          </div>

          {/* Card 3: Shortlist Stack + Lime Toggle (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            {/* Top mini-card: Shortlist Stack */}
            <div className="rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs">
              <div className="text-xs font-bold text-[#111827] mb-3">Choice Shortlist</div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#DEE5FC] text-[#172F91] font-bold text-xs flex items-center justify-center border-2 border-white">
                    IIT
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FCD7B6] text-amber-950 font-bold text-xs flex items-center justify-center border-2 border-white">
                    NIT
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#DDF587] text-emerald-950 font-bold text-xs flex items-center justify-center border-2 border-white">
                    BITS
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border-2 border-white">
                    AIIMS
                  </div>
                </div>
                <div className="text-2xl font-serif font-bold text-[#111827] ml-2">
                  +38
                </div>
              </div>
              <div className="text-[11px] text-[#64748B] mt-2">
                12 Ambitious • 18 Match • 8 Safe
              </div>
            </div>

            {/* Bottom mini-card: Lime Toggle for Instant Alerts */}
            <div className="rounded-3xl bg-[#DDF587] p-6 border border-lime-300 shadow-xs flex-1 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-emerald-950">
                    Live Deadline Alerts
                  </div>
                  <div className="text-[11px] text-emerald-900 mt-0.5">
                    SMS & WhatsApp verification
                  </div>
                </div>

                <button 
                  onClick={() => setAlertsEnabled(!alertsEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 ${
                    alertsEnabled ? 'bg-[#111827]' : 'bg-slate-300'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                    alertsEnabled ? 'right-0.5' : 'left-0.5'
                  }`} />
                </button>
              </div>

              <div className="text-[10px] text-emerald-950/80 mt-3 font-medium">
                Next notice: JoSAA Round 1 Seat Allocation (Oct 18)
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW OF BENTO GRID (Pipeline + Monthly + Campus Photo + Today Schedule) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Card 4: Choice Strategy Pipeline (Spans 6 cols on lg) */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-bold text-[#111827]">Choice Strategy Pipeline</div>
                <div className="text-xs text-[#64748B]">184 Target Colleges</div>
              </div>

              {/* Multi-segment Progress Bar */}
              <div className="flex h-7 rounded-xl overflow-hidden gap-1.5 p-1 bg-slate-100">
                <div className="h-full rounded-lg bg-[#DEE5FC] flex items-center justify-center text-[10px] font-bold text-[#172F91]" style={{ width: '45%' }}>
                  45%
                </div>
                <div className="h-full rounded-lg bg-[#DDF587] flex items-center justify-center text-[10px] font-bold text-emerald-950" style={{ width: '25%' }}>
                  25%
                </div>
                <div className="h-full rounded-lg bg-[#FCD7B6] flex items-center justify-center text-[10px] font-bold text-amber-950" style={{ width: '18%' }}>
                  18%
                </div>
                <div className="h-full rounded-lg bg-[#111827] flex items-center justify-center text-[10px] font-bold text-white" style={{ width: '12%' }}>
                  12%
                </div>
              </div>

              {/* Stats below */}
              <div className="grid grid-cols-4 gap-2 mt-5 text-center sm:text-left">
                <div>
                  <div className="text-xl font-bold text-[#111827]">45%</div>
                  <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#DEE5FC] inline-block"></span>
                    <span>Match</span>
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#111827]">25%</div>
                  <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#DDF587] inline-block"></span>
                    <span>Ambitious</span>
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#111827]">18%</div>
                  <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#FCD7B6] inline-block"></span>
                    <span>Safe</span>
                  </div>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#111827]">12%</div>
                  <div className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#111827] inline-block"></span>
                    <span>Locked</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Exam Coverage Tag Cloud */}
            <div className="pt-6 border-t border-slate-100 mt-6">
              <div className="text-xs font-bold text-[#111827] mb-2.5">Portals & Examinations Covered</div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#111827] text-white font-medium">JEE Advanced</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[#111827] font-medium">• JoSAA</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[#111827] font-medium">• CSAB</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[#111827] font-medium">• NEET UG</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[#111827] font-medium">• BITSAT</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[#111827] font-medium">• JAC Delhi</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-[#111827] font-medium">+14 State Boards</span>
              </div>
            </div>
          </div>

          {/* Card 5: Monthly Guidance Impact & Campus Frame (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 rounded-3xl bg-white p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="text-sm font-bold text-[#111827]">Active Mentored Students</div>
              <div className="text-xs text-[#64748B] mt-0.5">Joined in last 8 months</div>

              <div className="mt-4">
                <div className="font-serif text-5xl font-bold text-[#111827]">54<span className="text-xl font-sans text-[#64748B] font-normal">k+</span></div>
                <div className="text-xs font-semibold text-emerald-700 flex items-center gap-1 mt-1">
                  <span>↑ 99.4% seat lock accuracy</span>
                </div>
              </div>
            </div>

            {/* Featured Campus Slider Frame */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 relative h-36 group">
              <img
                src={currentSlide.image}
                alt={currentSlide.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-2.5 left-3 right-3 text-white">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#DDF587]">{currentSlide.badge}</div>
                <div className="text-xs font-serif font-medium truncate">{currentSlide.name}</div>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                {CAMPUS_SLIDES.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      i === currentSlideIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 6: Live Counselling Schedule / Timeline (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 rounded-3xl bg-white p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-[#111827]">Today</span>
                <span className="text-xs text-[#64748B]">Oct 18, 2026</span>
              </div>

              <div className="space-y-2.5 text-xs">
                {/* 09:30 */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-[#64748B] w-10 font-mono">09:30</span>
                  <div className="flex-1 p-2.5 rounded-xl bg-slate-100 text-[#111827]">
                    <div className="font-semibold text-[11px]">Shortlist Review</div>
                    <div className="text-[10px] text-[#64748B]">Ambitious vs Match</div>
                  </div>
                </div>

                {/* 11:45 */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-[#64748B] w-10 font-mono">11:45</span>
                  <div className="flex-1 p-2.5 rounded-xl bg-[#DEE5FC] text-[#172F91]">
                    <div className="font-semibold text-[11px]">JoSAA Mock Round 1</div>
                    <div className="text-[10px] text-[#172F91]/80">Allocation published</div>
                  </div>
                </div>

                {/* 13:15 */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-[#64748B] w-10 font-mono">13:15</span>
                  <div className="flex-1 p-2.5 rounded-xl bg-[#DDF587] text-emerald-950">
                    <div className="font-semibold text-[11px]">Mentor Call: Alex R.</div>
                    <div className="text-[10px] text-emerald-900/80">IIT Bombay CSE senior</div>
                  </div>
                </div>

                {/* 15:45 */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-[#64748B] w-10 font-mono">15:45</span>
                  <div className="flex-1 p-2.5 rounded-xl bg-[#FCD7B6] text-amber-950">
                    <div className="font-semibold text-[11px]">Document Annexure</div>
                    <div className="text-[10px] text-amber-900/80">Medical & Category</div>
                  </div>
                </div>

                {/* 17:00 */}
                <div className="flex items-center gap-2.5">
                  <span className="text-[11px] text-[#64748B] w-10 font-mono font-bold text-red-600">17:00</span>
                  <div className="flex-1 p-2.5 rounded-xl bg-[#111827] text-white">
                    <div className="font-semibold text-[11px]">Choice Locking Deadline</div>
                    <div className="text-[10px] text-slate-300">Irreversible lock cutoff</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentView('updates-deadlines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-4 w-full py-2.5 rounded-2xl border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-[#111827] text-center transition-colors"
            >
              Open Full Deadlines Calendar →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
