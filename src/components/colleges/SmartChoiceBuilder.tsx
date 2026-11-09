import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { College, ExamType, CategoryType, BranchCourse } from '../../types';
import { 
  Filter, Search, SlidersHorizontal, Sparkles, CheckCircle2, 
  AlertCircle, Bookmark, ArrowRight, ShieldCheck, DollarSign, MapPin, 
  Building2, Eye, Plus, Check, Scale, TableProperties, GraduationCap
} from 'lucide-react';

export const SmartChoiceBuilder: React.FC = () => {
  const { 
    colleges,
    isLoadingColleges,
    choiceList, 
    addToChoiceList,
    removeCollegeFromShortlist,
    comparisonCollegeIds,
    addToComparison,
    removeFromComparison,
    setSelectedCollege, 
    setSelectedCutoffCollege,
    setCutoffModalBranch,
    setCurrentView,
    showToast
  } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategoryType, setSelectedCategoryType] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'nirf' | 'placements' | 'fees' | 'name'>('nirf');

  const STATES = [
    'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 
    'West Bengal', 'Uttar Pradesh', 'Telangana', 'Rajasthan', 'Odisha'
  ];

  const EXAMS: ExamType[] = [
    'JEE Main', 'JEE Advanced', 'BITSAT', 'MHT-CET', 'WBJEE', 'KCET', 'COMEDK', 'UPTAC', 'TNEA', 'JAC Delhi', 'NEET UG'
  ];

  const BRANCH_OPTIONS = [
    { code: 'CSE', label: 'Computer Science (CSE)' },
    { code: 'AI', label: 'Artificial Intelligence & Data (AI)' },
    { code: 'ECE', label: 'Electronics & Communication (ECE)' },
    { code: 'EE', label: 'Electrical Engineering (EE)' },
    { code: 'ME', label: 'Mechanical Engineering (ME)' },
    { code: 'IT', label: 'Information Technology (IT)' },
    { code: 'MBBS', label: 'MBBS (Medicine)' },
  ];

  // Comprehensive multi-field filtering
  const filteredColleges = useMemo(() => {
    return colleges.filter((college) => {
      // 1. Text Search across College Name, Short Name, University, Location, State, and Course Names
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(query);
        const matchesShortName = college.shortName.toLowerCase().includes(query);
        const matchesUniversity = college.university?.toLowerCase().includes(query) || false;
        const matchesLocation = college.location.toLowerCase().includes(query);
        const matchesState = college.state.toLowerCase().includes(query);
        const matchesCourse = college.courses.some(
          c => c.branchName.toLowerCase().includes(query) || c.branchCode.toLowerCase().includes(query)
        );
        const matchesExam = college.acceptedExams?.some(e => e.toLowerCase().includes(query)) || false;

        if (!matchesName && !matchesShortName && !matchesUniversity && !matchesLocation && !matchesState && !matchesCourse && !matchesExam) {
          return false;
        }
      }

      // 2. Exam filter
      if (selectedExam !== 'All') {
        const accepts = college.acceptedExams?.includes(selectedExam as ExamType);
        if (!accepts) return false;
      }

      // 3. State filter
      if (selectedState !== 'All' && college.state !== selectedState) {
        return false;
      }

      // 4. Category Type filter (IIT, NIT, etc.)
      if (selectedCategoryType !== 'All' && college.categoryType !== selectedCategoryType) {
        return false;
      }

      // 5. Branch filter
      if (selectedBranch !== 'All') {
        const hasBranch = college.courses.some(c => c.branchCode === selectedBranch);
        if (!hasBranch) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'nirf') return a.nirfRank - b.nirfRank;
      if (sortBy === 'placements') return b.placements.medianSalaryLPA - a.placements.medianSalaryLPA;
      if (sortBy === 'fees') return a.courses[0].annualTuitionINR - b.courses[0].annualTuitionINR;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [colleges, searchQuery, selectedExam, selectedState, selectedCategoryType, selectedBranch, sortBy]);

  const handleOpenCutoff = (college: College, branchCode?: string) => {
    setCutoffModalBranch(branchCode);
    setSelectedCutoffCollege(college);
  };

  const isCollegeShortlisted = (collegeId: string) => {
    return choiceList.some(c => c.collegeId === collegeId);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Page Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold mb-2">
              <GraduationCap className="w-4 h-4" />
              <span>COLLEGE DISCOVERY & SHORTLISTING</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111827]">
              Build Shortlist
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1.5 max-w-2xl leading-relaxed">
              Search top universities, inspect official multi-year cutoff matrices, and add verified options directly to your choice list.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('choice-workspace')}
              className="py-2.5 px-4 rounded-2xl text-xs font-semibold bg-[#111827] text-white hover:bg-black flex items-center gap-2 transition-all shadow-xs"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#DDF587]" />
              <span>Saved Shortlist ({choiceList.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Search & Filters Bento Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by college name, university, degree, branch, state, or exam (e.g., 'IIT Bombay', 'Computer Science', 'BITS', 'Delhi')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm text-[#111827] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#172F91]/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-semibold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Pills / Dropdowns Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs pt-1">
            {/* Exam Filter */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Entrance Exam
              </label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">All Exams</option>
                {EXAMS.map((ex) => (
                  <option key={ex} value={ex}>
                    {ex}
                  </option>
                ))}
              </select>
            </div>

            {/* Institution Category Filter */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Institution Type
              </label>
              <select
                value={selectedCategoryType}
                onChange={(e) => setSelectedCategoryType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">All Types</option>
                <option value="IIT">IITs</option>
                <option value="NIT">NITs</option>
                <option value="IIIT">IIITs</option>
                <option value="BITS">BITS Campuses</option>
                <option value="State Government">State Government Universities</option>
                <option value="Premier Medical">Medical (AIIMS)</option>
              </select>
            </div>

            {/* Branch Filter */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Branch / Specialization
              </label>
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">All Branches</option>
                {BRANCH_OPTIONS.map((b) => (
                  <option key={b.code} value={b.code}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                State / Region
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="All">All States</option>
                {STATES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
              >
                <option value="nirf">NIRF Ranking (Top First)</option>
                <option value="placements">Median Placement CTC</option>
                <option value="fees">Annual Tuition Fee (Low to High)</option>
                <option value="name">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips & Results Count */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div>
              Found <strong>{filteredColleges.length}</strong> matching institution{filteredColleges.length !== 1 ? 's' : ''}
            </div>

            {(searchQuery || selectedExam !== 'All' || selectedState !== 'All' || selectedCategoryType !== 'All' || selectedBranch !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedExam('All');
                  setSelectedState('All');
                  setSelectedCategoryType('All');
                  setSelectedBranch('All');
                }}
                className="text-[11px] font-semibold text-[#172F91] hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Grid */}
        {filteredColleges.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs">
            <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-semibold text-[#111827]">No colleges matched your search</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Try adjusting your search keywords, broadening your state or exam filters, or clearing branch requirements.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => {
              const shortlisted = isCollegeShortlisted(college.id);
              const isCompared = comparisonCollegeIds.includes(college.id);
              const primaryCourse = college.courses[0];
              const closingCutoff = college.cutoffs[0];

              return (
                <div
                  key={college.id}
                  className="rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md group"
                >
                  <div>
                    {/* College Banner Photo */}
                    <div className="relative h-44 overflow-hidden bg-slate-900">
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/90 text-[#111827] shadow-xs">
                          NIRF #{college.nirfRank}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#DEE5FC] text-[#172F91]">
                          {college.categoryType}
                        </span>
                      </div>

                      {/* Counselling Authority Badge */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#DDF587] text-emerald-950">
                        {college.counsellingAuthority}
                      </div>

                      {/* Bottom Info inside Image */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="text-xs font-serif font-medium truncate">
                          {college.shortName}
                        </div>
                        <div className="text-[11px] text-slate-200 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#DDF587]" />
                          <span>{college.location}, {college.state}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 space-y-4">
                      
                      {/* Full College Name & Affiliation */}
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-[#111827] line-clamp-1 group-hover:text-[#172F91] transition-colors">
                          {college.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {college.university || `${college.categoryType} Autonomous`}
                        </p>
                      </div>

                      {/* Accepted Exams Pill Cloud */}
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Accepted Entrance Exams
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {college.acceptedExams?.map((examName) => (
                            <span
                              key={examName}
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-[#111827] border border-slate-200"
                            >
                              {examName}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Key Metrics Grid */}
                      <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-medium">Median Package</div>
                          <div className="font-bold text-[#111827] mt-0.5">₹{college.placements.medianSalaryLPA} LPA</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase font-medium">Annual Tuition</div>
                          <div className="font-bold text-[#111827] mt-0.5">
                            ₹{(primaryCourse.annualTuitionINR / 100000).toFixed(2)} Lakh
                          </div>
                        </div>
                      </div>

                      {/* Cutoff Preview Snippet */}
                      <div className="text-[11px] text-slate-600 bg-[#DEE5FC]/30 border border-[#DEE5FC] p-2.5 rounded-xl flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-[#172F91]">Cutoff Benchmark: </span>
                          <span>{closingCutoff?.branchCode} Round {closingCutoff?.round}</span>
                        </div>
                        <span className="font-mono font-bold text-[#111827]">
                          {closingCutoff?.cutoffScore ? `${closingCutoff.closingRank} pts` : `AIR ${closingCutoff?.closingRank}`}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex flex-col gap-2.5">
                    
                    {/* Primary Cutoff & Details Buttons */}
                    <div className="flex items-center gap-2 pt-3">
                      {/* View Cutoff Button (Prominently styled per Requirement 3) */}
                      <button
                        onClick={() => handleOpenCutoff(college)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#DEE5FC] hover:bg-[#C5D3FA] text-[#172F91] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                        title="Inspect official multi-year cutoff opening and closing ranks"
                      >
                        <TableProperties className="w-3.5 h-3.5" />
                        <span>View Cutoff</span>
                      </button>

                      {/* View Details Button */}
                      <button
                        onClick={() => setSelectedCollege(college)}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#111827] font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                        title="View comprehensive campus facilities and placements"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>
                    </div>

                    {/* Shortlist & Compare Row */}
                    <div className="flex items-center gap-2">
                      {/* Shortlist Toggle Button */}
                      <button
                        onClick={() => {
                          if (shortlisted) {
                            removeCollegeFromShortlist(college.id);
                          } else {
                            addToChoiceList(college, primaryCourse.branchCode);
                          }
                        }}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          shortlisted
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                            : 'bg-[#111827] text-white hover:bg-black'
                        }`}
                      >
                        {shortlisted ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Shortlisted</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Shortlist</span>
                          </>
                        )}
                      </button>

                      {/* Compare Toggle Button */}
                      <button
                        onClick={() => {
                          if (isCompared) {
                            removeFromComparison(college.id);
                          } else {
                            addToComparison(college.id);
                          }
                        }}
                        className={`p-2 rounded-xl border text-xs transition-colors ${
                          isCompared
                            ? 'bg-indigo-50 border-indigo-300 text-[#172F91]'
                            : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                        }`}
                        title={isCompared ? 'Remove from comparison' : 'Add to side-by-side comparison'}
                      >
                        <Scale className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
