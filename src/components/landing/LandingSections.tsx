import React from 'react';
import { useApp } from '../../context/AppContext';
import { COLLEGES_DATA, MENTORS_DATA, COUNSELLING_UPDATES_DATA } from '../../data/mockData';
import { 
  ArrowRight, ShieldCheck, Clock, Award, Star, Compass, 
  Sparkles, CheckCircle2, AlertTriangle, ExternalLink, Users, Calendar
} from 'lucide-react';

export const LandingSections: React.FC = () => {
  const { setCurrentView, setSelectedCollege, setSelectedMentor } = useApp();

  const urgentNotice = COUNSELLING_UPDATES_DATA.find(u => u.importance === 'Critical') || COUNSELLING_UPDATES_DATA[0];

  return (
    <div className="bg-[#E5E7EB] text-[#111827] space-y-12 pb-16">
      
      {/* 1. Live Counselling Ticker Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold uppercase tracking-wider text-[10px] animate-pulse">
              LIVE NOTICE
            </span>
            <span className="text-[#111827] font-semibold">
              [{urgentNotice.authority}] {urgentNotice.title}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[#64748B] hidden md:inline">
              Choice Locking Deadline: <strong className="text-[#111827]">Oct 18, 5:00 PM</strong>
            </span>
            <button
              onClick={() => {
                setCurrentView('updates-deadlines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#172F91] hover:text-[#111827] font-bold underline underline-offset-4 flex items-center gap-1"
            >
              <span>View All 6 Notices & Deadlines</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. The Three Core Journeys (As specified in Master Prompt) */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#172F91] font-bold">
            THE CLARIO PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-[#111827] mt-2 mb-4">
            Everything a student needs to answer three crucial questions.
          </h2>
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            College counselling in India is fraught with anxious guesses, commercial agents, and missing deadlines. 
            We replaced the chaos with verified precision and current student wisdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Which colleges should I consider? */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DEE5FC] text-[#172F91] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-[#172F91] font-bold mb-2">
                QUESTION 01
              </div>
              <h3 className="font-serif text-2xl text-[#111827] font-semibold mb-3">
                “Which colleges should I consider?”
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                Generate an honest shortlist categorized into <strong>Ambitious</strong>, <strong>Match</strong>, and <strong>Safe</strong> alternatives based on historical cutoff closing ranks, fees, and genuine placement data.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView('explore');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#111827] group-hover:text-[#172F91] transition-colors"
            >
              <span>Build Shortlist & Choices</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 2: What do I need to do next, and by when? */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DDF587] text-emerald-950 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-emerald-800 font-bold mb-2">
                QUESTION 02
              </div>
              <h3 className="font-serif text-2xl text-[#111827] font-semibold mb-3">
                “What do I need to do next, and by when?”
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                Never lose a dream seat to an overlooked document date. Track registration cutoff windows, mock allocations, fee deadlines, and document annexures with automated reminders.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView('updates-deadlines');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#111827] group-hover:text-[#172F91] transition-colors"
            >
              <span>View Updates & Deadlines Calendar</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 3: Who can give me trustworthy insight? */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FCD7B6] text-amber-950 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-[11px] uppercase tracking-widest text-amber-900 font-bold mb-2">
                QUESTION 03
              </div>
              <h3 className="font-serif text-2xl text-[#111827] font-semibold mb-3">
                “Who can give me trustworthy insight?”
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                Book affordable 1-on-1 video sessions (starting at ₹249) with verified enrolled students from IITs, NITs, BITS, and AIIMS. No promotional sugarcoating, just real ground truth.
              </p>
            </div>

            <button
              onClick={() => {
                setCurrentView('mentors');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-[#111827] group-hover:text-[#172F91] transition-colors"
            >
              <span>Connect with Mentors</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* 3. Featured Colleges Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#172F91] font-bold">
              CAMPUS DIRECTORY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111827] font-semibold mt-1">
              Explore Premier Institutions
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('explore');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#172F91] hover:text-[#111827] border-b border-[#172F91] pb-0.5 w-fit"
          >
            <span>View All Colleges & Cutoffs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLLEGES_DATA.slice(0, 3).map((college) => (
            <div 
              key={college.id}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => {
                setSelectedCollege(college);
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={college.image}
                  alt={college.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 text-[#111827] border border-slate-200 shadow-xs">
                  NIRF #{college.nirfRank}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#DEE5FC] text-[#172F91] font-semibold">
                  {college.categoryType}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#111827] group-hover:text-[#172F91] font-semibold transition-colors mb-1">
                    {college.name}
                  </h3>
                  <p className="text-xs text-[#64748B] mb-4">
                    {college.location}
                  </p>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs mb-4">
                    <div>
                      <div className="text-[10px] text-[#64748B] uppercase font-medium">Median CTC</div>
                      <div className="font-bold text-[#111827]">₹{college.placements.medianSalaryLPA} LPA</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#64748B] uppercase font-medium">Annual Tuition</div>
                      <div className="font-bold text-[#111827]">₹{(college.courses[0].annualTuitionINR / 100000).toFixed(2)} Lakh</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{college.counsellingAuthority} Verified</span>
                  </span>
                  <span className="text-xs font-bold text-[#172F91] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Details ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Verified Mentors Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#172F91] font-bold">
              TRUSTED STUDENT VOICES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111827] font-semibold mt-1">
              Book a 1-on-1 Session with Enrolled Students
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-xl">
              100% verified campus affiliation. Talk to students who successfully cleared the exact same counselling rounds.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentView('mentors');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black transition-all shadow-xs"
          >
            <span>Browse All Mentors</span>
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MENTORS_DATA.slice(0, 3).map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-3xl p-6 bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-14 h-14 rounded-2xl object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-serif text-lg text-[#111827] font-semibold">
                        {mentor.name}
                      </h4>
                      <span title="Verified College Student">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </span>
                    </div>
                    <div className="text-xs text-[#172F91] font-semibold">
                      {mentor.collegeName}
                    </div>
                    <div className="text-[11px] text-[#64748B]">
                      {mentor.branch}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-2xl p-3 mb-4 text-xs border border-slate-100">
                  <div className="flex items-center justify-between text-[#64748B] mb-1">
                    <span>Rank:</span>
                    <strong className="text-[#111827]">{mentor.entranceRank}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#64748B]">
                    <span>Languages:</span>
                    <span className="text-[#111827] font-medium">{mentor.languages.join(', ')}</span>
                  </div>
                </div>

                <div className="text-xs text-[#475569] line-clamp-2 mb-4 italic">
                  "{mentor.bio}"
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#64748B] uppercase font-medium">Fee / 30m Session</div>
                  <div className="font-serif text-lg text-[#111827] font-bold">₹{mentor.priceINR}</div>
                </div>
                <button
                  onClick={() => {
                    setSelectedMentor(mentor);
                    setCurrentView('mentors');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black transition-all"
                >
                  Book Slot
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Editorial Quote Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#DEE5FC] p-8 sm:p-12 border border-[#C5D3FA] text-center">
          <span className="font-serif text-5xl text-[#172F91]/40 block mb-2">“</span>
          <blockquote className="font-serif text-2xl sm:text-3xl text-[#172F91] font-medium leading-snug mb-6 max-w-4xl mx-auto">
            A wrong choice order in JoSAA or CSAB is irreversible. Our mission is to make sure every aspiring engineer and doctor enters college knowing exactly what lies ahead.
          </blockquote>
          <div className="text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold">
            CLARIO ACADEMIC ADVISORY COUNCIL
          </div>
        </div>
      </section>

      {/* 6. Footer Bento Card */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            
            <div className="md:col-span-1">
              <span className="font-serif text-2xl font-bold text-[#111827] tracking-wide">
                Clario<span className="text-[#172F91]">.</span>
              </span>
              <p className="text-xs text-[#64748B] mt-3 leading-relaxed">
                Integrated Indian engineering college counselling, choice list optimization, and 1-on-1 verified student mentorship.
              </p>
              <div className="mt-4 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Grounded in Official Counselling Data</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#111827] mb-4">
                Counselling Portals
              </h4>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li><a href="https://josaa.nic.in" target="_blank" rel="noreferrer" className="hover:text-[#172F91] flex items-center gap-1">JoSAA 2026 Portal <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://csab.nic.in" target="_blank" rel="noreferrer" className="hover:text-[#172F91] flex items-center gap-1">CSAB Special Rounds <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://jacdelhi.admissions.nic.in" target="_blank" rel="noreferrer" className="hover:text-[#172F91] flex items-center gap-1">JAC Delhi (DTU/NSUT) <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://cetcell.mahacet.org" target="_blank" rel="noreferrer" className="hover:text-[#172F91] flex items-center gap-1">MHT-CET CAP Portal <ExternalLink className="w-3 h-3" /></a></li>
                <li><a href="https://cetonline.karnataka.gov.in/kea" target="_blank" rel="noreferrer" className="hover:text-[#172F91] flex items-center gap-1">KEA KCET Portal <ExternalLink className="w-3 h-3" /></a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#111827] mb-4">
                Platform Features
              </h4>
              <ul className="space-y-2 text-xs text-[#475569]">
                <li><button onClick={() => { setCurrentView('landing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#172F91]">College Predictor</button></li>
                <li><button onClick={() => { setCurrentView('explore'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#172F91]">Colleges & Cutoffs</button></li>
                <li><button onClick={() => { setCurrentView('choice-workspace'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#172F91]">Choice Order Workspace</button></li>
                <li><button onClick={() => { setCurrentView('mentors'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#172F91]">Verified Student Mentorship</button></li>
                <li><button onClick={() => { setCurrentView('community'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#172F91]">Student Discussion Community</button></li>
                <li><button onClick={() => { setCurrentView('updates-deadlines'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#172F91]">Updates & Deadlines Calendar</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-[#111827] mb-4">
                Official Disclaimer
              </h4>
              <p className="text-[11px] text-[#64748B] leading-relaxed">
                Clario provides counselling guidance based on official historical cutoffs and verified institutional disclosures. 
                Previous-year cutoffs do not guarantee admission. Clario is an independent mentorship platform and never submits or alters choices directly on official government servers.
              </p>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] gap-4">
            <div>
              © 2026 Clario Platform. All rights reserved. Built with editorial precision.
            </div>
            <div className="flex gap-6">
              <span className="hover:text-[#111827] cursor-pointer">Privacy Policy</span>
              <span className="hover:text-[#111827] cursor-pointer">Terms of Guidance</span>
              <span className="hover:text-[#111827] cursor-pointer">Mentor Code of Conduct</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
