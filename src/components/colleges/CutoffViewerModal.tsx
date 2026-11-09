import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Filter, ShieldCheck, ExternalLink, Calendar, 
  Award, AlertCircle, Plus, CheckCircle2, Bookmark, Info, HelpCircle
} from 'lucide-react';

export const CutoffViewerModal: React.FC = () => {
  const { 
    selectedCutoffCollege, 
    setSelectedCutoffCollege, 
    cutoffModalBranch,
    setCutoffModalBranch,
    addToChoiceList, 
    choiceList, 
    showToast 
  } = useApp();

  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedRound, setSelectedRound] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedQuota, setSelectedQuota] = useState<string>('All');
  const [selectedBranch, setSelectedBranch] = useState<string>(cutoffModalBranch || 'All');

  // Sync if cutoffModalBranch prop changed
  React.useEffect(() => {
    if (cutoffModalBranch) {
      setSelectedBranch(cutoffModalBranch);
    }
  }, [cutoffModalBranch]);

  if (!selectedCutoffCollege) return null;

  const college = selectedCutoffCollege;

  // Extract unique filter options from actual data
  const years = Array.from(new Set(college.cutoffs.map(c => c.year.toString()))).sort().reverse();
  const rounds = Array.from(new Set(college.cutoffs.map(c => c.round.toString()))).sort((a, b) => Number(a) - Number(b));
  const categories = Array.from(new Set(college.cutoffs.map(c => c.category)));
  const quotas = Array.from(new Set(college.cutoffs.map(c => c.quota)));

  const filteredCutoffs = college.cutoffs.filter((c) => {
    if (selectedYear !== 'All' && c.year.toString() !== selectedYear) return false;
    if (selectedRound !== 'All' && c.round.toString() !== selectedRound) return false;
    if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
    if (selectedQuota !== 'All' && c.quota !== selectedQuota) return false;
    if (selectedBranch !== 'All' && c.branchCode !== selectedBranch) return false;
    return true;
  });

  const handleClose = () => {
    setSelectedCutoffCollege(null);
    setCutoffModalBranch(undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        
        {/* Header Bar */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#DEE5FC] text-[#172F91]">
                Official Cutoff Archive
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#DDF587] text-emerald-950">
                {college.counsellingAuthority} Verified
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-200/80 text-slate-800">
                NIRF #{college.nirfRank} • {college.categoryType}
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#111827] font-semibold">
              {college.name}
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Historical opening and closing rank records across official counselling iterations.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white border border-slate-300 flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 transition-all shrink-0"
            aria-label="Close cutoff viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Controls Strip */}
        <div className="p-4 sm:p-5 bg-white border-b border-slate-200 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {/* Branch Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Branch / Program
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
            >
              <option value="All">All Branches ({college.courses.length})</option>
              {college.courses.map((course) => (
                <option key={course.branchCode} value={course.branchCode}>
                  {course.branchCode} - {course.branchName}
                </option>
              ))}
            </select>
          </div>

          {/* Admission Year Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Admission Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
            >
              <option value="All">All Years</option>
              {years.map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>

          {/* Counselling Round Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Counselling Round
            </label>
            <select
              value={selectedRound}
              onChange={(e) => setSelectedRound(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
            >
              <option value="All">All Rounds</option>
              {rounds.map((rnd) => (
                <option key={rnd} value={rnd}>
                  Round {rnd}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Quota Filter */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Quota / Seat Pool
            </label>
            <select
              value={selectedQuota}
              onChange={(e) => setSelectedQuota(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-[#111827] focus:outline-none"
            >
              <option value="All">All Quotas</option>
              {quotas.map((q) => (
                <option key={q} value={q}>
                  {q === 'AI' ? 'AI (All India)' : q === 'HS' ? 'HS (Home State)' : 'OS (Other State)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Cutoff Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          
          {filteredCutoffs.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 border border-slate-200">
              <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="font-semibold text-slate-800 text-sm">Data unavailable for this combination</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                No official cutoff records match the selected Year ({selectedYear}), Round ({selectedRound}), Category ({selectedCategory}), and Quota ({selectedQuota}).
              </p>
              <button
                onClick={() => {
                  setSelectedYear('All');
                  setSelectedRound('All');
                  setSelectedCategory('All');
                  setSelectedQuota('All');
                  setSelectedBranch('All');
                }}
                className="mt-3 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs text-[#111827] font-semibold hover:bg-slate-50"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100/90 text-[#111827] uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Branch / Degree</th>
                    <th className="p-3.5">Exam</th>
                    <th className="p-3.5">Year</th>
                    <th className="p-3.5">Round</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Quota</th>
                    <th className="p-3.5">Seat Pool</th>
                    <th className="p-3.5 text-right">Opening Rank</th>
                    <th className="p-3.5 text-right font-bold text-[#172F91]">Closing Rank</th>
                    <th className="p-3.5 text-center">Shortlist</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredCutoffs.map((entry, idx) => {
                    const course = college.courses.find(c => c.branchCode === entry.branchCode);
                    const inShortlist = choiceList.some(
                      c => c.collegeId === college.id && c.branchCode === entry.branchCode
                    );

                    return (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3.5">
                          <div className="font-semibold text-[#111827]">
                            {course?.branchName || entry.branchCode}
                          </div>
                          <div className="text-[11px] text-[#64748B]">
                            {course?.degree || 'B.Tech'} • Code: {entry.branchCode}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] font-semibold text-slate-800">
                            {entry.exam || college.acceptedExams?.[0] || 'Entrance Exam'}
                          </span>
                        </td>
                        <td className="p-3.5 font-medium text-slate-800">
                          {entry.year}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-semibold">
                            Round {entry.round}
                          </span>
                        </td>
                        <td className="p-3.5 font-medium text-slate-800">
                          {entry.category}
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            entry.quota === 'AI' 
                              ? 'bg-[#DEE5FC] text-[#172F91]' 
                              : entry.quota === 'HS' 
                              ? 'bg-[#FCD7B6] text-amber-950' 
                              : 'bg-emerald-100 text-emerald-950'
                          }`}>
                            {entry.quota === 'AI' ? 'All India' : entry.quota === 'HS' ? 'Home State' : 'Other State'}
                          </span>
                        </td>
                        <td className="p-3.5 text-[11px] text-slate-600">
                          {entry.seatPool || 'Gender-Neutral'}
                        </td>
                        <td className="p-3.5 text-right font-mono font-medium text-slate-700">
                          {entry.cutoffScore ? `${entry.openingRank} pts` : `AIR ${entry.openingRank}`}
                        </td>
                        <td className="p-3.5 text-right font-mono font-bold text-[#172F91]">
                          {entry.cutoffScore ? `${entry.closingRank} pts` : `AIR ${entry.closingRank}`}
                        </td>
                        <td className="p-3.5 text-center">
                          <button
                            onClick={() => addToChoiceList(college, entry.branchCode)}
                            className={`p-1.5 rounded-xl transition-all ${
                              inShortlist
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-[#111827] text-white hover:bg-black'
                            }`}
                            title={inShortlist ? 'Already in shortlist' : 'Add to choice shortlist'}
                          >
                            {inShortlist ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : (
                              <Plus className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Official Verification & Citation Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-600">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">Source: </span>
                <span>{college.cutoffs[0]?.source || `${college.counsellingAuthority} Official Gazetted Archive`}</span>
                <span className="text-slate-400 ml-2">• Last verified: {college.cutoffs[0]?.lastUpdated || 'August 2025'}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 italic">
              Historical cutoffs are benchmarks, not guarantees of admission.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Showing <strong>{filteredCutoffs.length}</strong> official cutoff record{filteredCutoffs.length !== 1 ? 's' : ''}
          </div>
          <button
            onClick={handleClose}
            className="px-5 py-2.5 rounded-2xl bg-[#111827] text-white hover:bg-black font-semibold text-xs transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
