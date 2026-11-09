import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mentor } from '../../types';
import { 
  Search, Filter, ShieldCheck, Star, Clock, Calendar, 
  MessageSquare, Video, CheckCircle2, ChevronRight, UserCheck, Languages, AlertCircle
} from 'lucide-react';

export const MentorMarketplace: React.FC = () => {
  const { mentors, selectedMentor, setSelectedMentor, setCurrentView } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollegeFilter, setSelectedCollegeFilter] = useState('All');
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('All');
  const [selectedYearFilter, setSelectedYearFilter] = useState('All');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState('All');
  const [selectedTopicFilter, setSelectedTopicFilter] = useState('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState(500);

  const filteredMentors = mentors.filter((m) => {
    if (selectedCollegeFilter !== 'All' && m.collegeId !== selectedCollegeFilter) {
      return false;
    }
    if (selectedBranchFilter !== 'All' && !m.branch.toLowerCase().includes(selectedBranchFilter.toLowerCase())) {
      return false;
    }
    if (selectedYearFilter !== 'All' && !m.academicYear.toLowerCase().includes(selectedYearFilter.toLowerCase())) {
      return false;
    }
    if (selectedLanguageFilter !== 'All' && !m.languages.includes(selectedLanguageFilter)) {
      return false;
    }
    if (selectedTopicFilter !== 'All' && !m.topics.some(t => t.toLowerCase().includes(selectedTopicFilter.toLowerCase()))) {
      return false;
    }
    if (m.priceINR > maxPriceFilter) {
      return false;
    }
    if (
      searchTerm &&
      !m.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !m.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !m.branch.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Marketplace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-5 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VERIFIED CAMPUS STUDENT MENTORSHIP</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#111827]">
              Student Mentorship Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
              Book affordable 1-on-1 video guidance sessions with verified enrolled students from IITs, NITs, BITS, and state universities. 
              Get unvarnished facts on branch tradeoffs, JoSAA choice locking, and campus reality.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="py-2.5 px-5 rounded-2xl text-xs font-semibold bg-[#111827] text-white hover:bg-black shadow-xs transition-all"
            >
              My Bookings
            </button>
          </div>
        </div>

        {/* Synthetic Demo Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-amber-950">Demonstration Mentorship Ecosystem:</strong> The mentor profiles, student ranks, and consultation feedback below are illustrative simulated personas created for application evaluation. Mentors must never be treated as official college spokespersons. In production, real enrolled students submit university ID cards and semester marksheets to private Supabase Storage before admin verification.
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 mb-8 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            
            {/* Search */}
            <div className="relative">
              <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1 font-bold">
                Search Mentor
              </label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Aarav, COEP, DTU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#111827] placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Target College Filter */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1 font-bold">
                Institution
              </label>
              <select
                value={selectedCollegeFilter}
                onChange={(e) => setSelectedCollegeFilter(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">All Institutions</option>
                {Array.from(new Set(mentors.map(m => m.collegeId))).map((cId) => {
                  const m = mentors.find(item => item.collegeId === cId);
                  return <option key={cId} value={cId}>{m?.collegeName || cId}</option>;
                })}
              </select>
            </div>

            {/* Branch Filter */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1 font-bold">
                Branch / Discipline
              </label>
              <select
                value={selectedBranchFilter}
                onChange={(e) => setSelectedBranchFilter(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">All Branches</option>
                <option value="Computer">Computer / CSE</option>
                <option value="Software">Software Engineering</option>
                <option value="Information">Information Technology</option>
                <option value="Electronics">ECE / ENTC</option>
                <option value="Mathematics">Math & Computing</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1 font-bold">
                Study Year
              </label>
              <select
                value={selectedYearFilter}
                onChange={(e) => setSelectedYearFilter(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">Any Academic Year</option>
                <option value="2nd Year">2nd Year (Sophomore)</option>
                <option value="3rd Year">3rd Year (Junior)</option>
                <option value="Final Year">Final Year (Senior)</option>
                <option value="4th Year">4th Year (Senior)</option>
              </select>
            </div>

            {/* Discussion Topic */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1 font-bold">
                Expertise Area
              </label>
              <select
                value={selectedTopicFilter}
                onChange={(e) => setSelectedTopicFilter(e.target.value)}
                className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">All Topics</option>
                <option value="Choice">JoSAA Choice Filling Strategy</option>
                <option value="Branch">Branch vs College Tradeoffs</option>
                <option value="First Year">1st Year Prep & Survival</option>
                <option value="Hostel">Hostel & Campus Culture</option>
                <option value="CAP">MHT-CET CAP Rounds</option>
                <option value="KEA">KEA KCET Option Entry</option>
                <option value="JAC">JAC Delhi Spot Rounds</option>
              </select>
            </div>

            {/* Price Slider */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#64748B] mb-1 font-bold flex justify-between">
                <span>Max Fee</span>
                <span className="text-[#111827] font-bold">₹{maxPriceFilter}</span>
              </label>
              <input
                type="range"
                min="200"
                max="500"
                step="25"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#172F91] mt-2 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Mentor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <div
              key={mentor.id}
              className="rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
            >
              <div className="p-6">
                
                {/* Header: Photo & Verification */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img
                      src={mentor.avatar}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 group-hover:scale-105 transition-transform"
                    />
                    {mentor.verifiedCollegeAffiliation && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center shadow-xs" title="Simulated Campus ID Verification">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="font-serif text-lg text-[#111827] font-semibold truncate group-hover:text-[#172F91] transition-colors">
                        {mentor.name}
                      </h3>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold tracking-tight">
                        Demo Profile
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-[#172F91] mt-0.5">
                      {mentor.collegeName}
                    </div>

                    <div className="text-[11px] text-[#64748B] truncate mt-0.5">
                      {mentor.branch} • {mentor.academicYear}
                    </div>

                    {/* Entrance Credential Badge */}
                    <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-semibold bg-[#DEE5FC] text-[#172F91]">
                      <span>{mentor.examName}:</span>
                      <strong className="text-emerald-800">{mentor.entranceRank}</strong>
                    </div>
                  </div>
                </div>

                {/* Rating & Reviews Bar */}
                <div className="flex items-center justify-between py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs mb-4">
                  <div className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[#111827]">{mentor.rating}</span>
                    <span className="text-[#64748B] font-normal">({mentor.reviewsCount} reviews)</span>
                  </div>

                  <div className="text-[11px] text-[#64748B] flex items-center gap-1">
                    <Languages className="w-3.5 h-3.5 text-[#172F91]" />
                    <span>{mentor.languages.join(', ')}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-[#475569] leading-relaxed line-clamp-2 mb-4">
                  "{mentor.bio}"
                </p>

                {/* Expertise Badges */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] uppercase tracking-wider text-[#64748B] font-bold">
                    Topics Advised:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {mentor.topics.slice(0, 2).map((topic, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-[#DEE5FC]/50 text-[#172F91] border border-blue-200">
                        {topic}
                      </span>
                    ))}
                    {mentor.topics.length > 2 && (
                      <span className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-100 text-[#64748B]">
                        +{mentor.topics.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Available Slot Preview */}
                <div className="text-[11px] text-emerald-700 flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Next available: {mentor.availableSlots[0]?.date || 'This weekend'}</span>
                </div>
              </div>

              {/* Card Footer: Price & Book CTA */}
              <div className="p-5 pt-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#64748B] uppercase font-semibold">Session Price</div>
                  <div className="font-serif text-xl font-bold text-[#111827]">
                    ₹{mentor.priceINR}
                    <span className="text-xs font-sans text-[#64748B] font-normal"> / {mentor.sessionDurationMins} mins</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMentor(mentor)}
                  className="py-2.5 px-5 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black shadow-xs transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>Request Session</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Guarantee & Refund Policy Box */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#DDF587] text-emerald-950 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#111827] font-semibold">
                Clario 100% Student Protection Policy
              </h4>
              <p className="text-xs text-[#475569] mt-1 max-w-2xl leading-relaxed">
                Every mentor identity is verified using private university credentials, smart cards, and academic standing stored securely in Supabase Storage with strict RLS. 
                If a mentor fails to join or provide honest counselling guidance, your fee is 100% refunded immediately.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <span className="text-xs text-[#172F91] font-semibold hover:underline cursor-pointer">
              Mentorship Code of Ethics
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
