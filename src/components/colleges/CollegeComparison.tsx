import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { College } from '../../types';
import { 
  X, Plus, Scale, Sliders, CheckCircle2, AlertCircle, 
  MapPin, DollarSign, Award, Home, Star, ArrowRight, ShieldCheck
} from 'lucide-react';

export const CollegeComparison: React.FC = () => {
  const { 
    colleges,
    comparisonCollegeIds, 
    removeFromComparison, 
    addToComparison, 
    clearComparison,
    setCurrentView,
    setSelectedCollege
  } = useApp();

  // Personal Importance weight sliders (1 to 5)
  const [weights, setWeights] = useState({
    placements: 4,
    cost: 3,
    campusLife: 4,
    hostel: 3,
  });

  const comparedColleges = colleges.filter(c => comparisonCollegeIds.includes(c.id));

  // Available colleges to add to comparison
  const availableToAdd = colleges.filter(c => !comparisonCollegeIds.includes(c.id));

  // Compute a weighted fit score for each college based on student's personal weights
  const calculateFitScore = (college: College) => {
    // placements score (0-100)
    const placementNorm = Math.min(100, (college.placements.medianSalaryLPA / 35) * 100);
    
    // cost score (cheaper = higher score)
    const costNorm = Math.max(0, 100 - (college.courses[0].annualTuitionINR / 600000) * 100);
    
    // campus score
    const campusNorm = (college.reviewsSummary.breakdown.campus / 5) * 100;
    
    // hostel score
    const hostelNorm = (college.reviewsSummary.breakdown.hostel / 5) * 100;

    const totalWeight = weights.placements + weights.cost + weights.campusLife + weights.hostel;
    const score = (
      placementNorm * weights.placements +
      costNorm * weights.cost +
      campusNorm * weights.campusLife +
      hostelNorm * weights.hostel
    ) / totalWeight;

    return Math.round(score);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold mb-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span>Multi-Dimensional Matrix</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111827]">
              Side-by-Side College Comparison
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
              Compare 2 to 4 target institutions objectively across costs, cutoffs, median placements, and verified student ratings.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {comparedColleges.length > 0 && (
              <button
                onClick={clearComparison}
                className="py-2 px-3 text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Clear All ({comparedColleges.length})
              </button>
            )}
            <button
              onClick={() => setCurrentView('explore')}
              className="py-2.5 px-5 rounded-2xl text-xs font-semibold bg-[#111827] text-white hover:bg-black shadow-xs transition-all"
            >
              Back to Shortlist
            </button>
          </div>
        </div>

        {/* Personal Importance Weightage Sliders */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 mb-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#172F91]" />
              <h3 className="font-serif text-lg text-[#111827] font-semibold">
                Your Personal Priorities & Weightage
              </h3>
            </div>
            <span className="text-xs text-[#64748B]">
              Adjust sliders to tailor the Fit Score calculation to your lifestyle & budget
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            {/* Priority 1 */}
            <div>
              <div className="flex justify-between text-[#475569] mb-1.5">
                <span>Placement Packages</span>
                <strong className="text-[#111827] font-bold">{weights.placements}/5</strong>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={weights.placements}
                onChange={(e) => setWeights({ ...weights, placements: Number(e.target.value) })}
                className="w-full accent-[#172F91]"
              />
            </div>

            {/* Priority 2 */}
            <div>
              <div className="flex justify-between text-[#475569] mb-1.5">
                <span>Affordable Tuition & Living</span>
                <strong className="text-[#111827] font-bold">{weights.cost}/5</strong>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={weights.cost}
                onChange={(e) => setWeights({ ...weights, cost: Number(e.target.value) })}
                className="w-full accent-[#172F91]"
              />
            </div>

            {/* Priority 3 */}
            <div>
              <div className="flex justify-between text-[#475569] mb-1.5">
                <span>Campus Culture & Clubs</span>
                <strong className="text-[#111827] font-bold">{weights.campusLife}/5</strong>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={weights.campusLife}
                onChange={(e) => setWeights({ ...weights, campusLife: Number(e.target.value) })}
                className="w-full accent-[#172F91]"
              />
            </div>

            {/* Priority 4 */}
            <div>
              <div className="flex justify-between text-[#475569] mb-1.5">
                <span>Hostel Quality & Mess</span>
                <strong className="text-[#111827] font-bold">{weights.hostel}/5</strong>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={weights.hostel}
                onChange={(e) => setWeights({ ...weights, hostel: Number(e.target.value) })}
                className="w-full accent-[#172F91]"
              />
            </div>
          </div>
        </div>

        {/* Comparison Matrix Table */}
        {comparedColleges.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
            <h3 className="font-serif text-2xl text-[#111827] font-semibold mb-2">
              No Colleges Selected for Comparison
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] mb-6">
              Select 2 to 4 colleges from the Explore Shortlist to compare them side-by-side.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {colleges.slice(0, 3).map((col: College) => (
                <button
                  key={col.id}
                  onClick={() => addToComparison(col.id)}
                  className="px-4 py-2 rounded-2xl text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-300 text-[#111827] shadow-xs"
                >
                  + Add {col.shortName}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80">
                  <th className="p-4 sm:p-5 w-48 font-serif text-sm text-[#172F91] uppercase tracking-wider font-semibold">
                    Comparison Metrics
                  </th>
                  {comparedColleges.map((col) => (
                    <th key={col.id} className="p-4 sm:p-5 min-w-[240px] max-w-[280px] align-top">
                      <div className="relative">
                        <button
                          onClick={() => removeFromComparison(col.id)}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-500 flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Remove from comparison"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <img
                          src={col.image}
                          alt={col.name}
                          className="w-full h-28 object-cover rounded-2xl mb-3 border border-slate-200"
                        />

                        <div className="text-[10px] text-[#172F91] uppercase tracking-wider font-bold">
                          NIRF #{col.nirfRank} • {col.categoryType}
                        </div>
                        <h4 className="font-serif text-base text-[#111827] font-semibold leading-snug mt-0.5">
                          {col.shortName}
                        </h4>
                        <div className="text-[11px] text-[#64748B]">{col.location}</div>

                        {/* Calculated Personalized Fit Score */}
                        <div className="mt-3 p-2.5 rounded-2xl bg-[#DEE5FC]/40 border border-[#DEE5FC] flex items-center justify-between">
                          <span className="text-[10px] text-[#172F91] font-semibold uppercase">Personal Fit Score</span>
                          <span className="font-serif text-base font-bold text-[#172F91]">
                            {calculateFitScore(col)}%
                          </span>
                        </div>
                      </div>
                    </th>
                  ))}

                  {/* Add College Slot if < 4 */}
                  {comparedColleges.length < 4 && (
                    <th className="p-4 min-w-[200px] text-center border-l border-slate-200 align-middle">
                      <div className="text-[11px] text-[#64748B] mb-3">Compare another college:</div>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            addToComparison(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                      >
                        <option value="">+ Select College</option>
                        {availableToAdd.map((col) => (
                          <option key={col.id} value={col.id}>{col.shortName}</option>
                        ))}
                      </select>
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs">
                {/* Row: Authority & Counselling */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 font-semibold text-[#111827] bg-slate-50/40">
                    Counselling Authority
                  </td>
                  {comparedColleges.map((col) => (
                    <td key={col.id} className="p-4 font-medium text-[#111827]">
                      {col.counsellingAuthority}
                    </td>
                  ))}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>

                {/* Row: Tuition Fee */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 font-semibold text-[#111827] bg-slate-50/40">
                    Annual Tuition
                  </td>
                  {comparedColleges.map((col) => (
                    <td key={col.id} className="p-4 font-mono font-semibold text-[#111827]">
                      ₹{(col.courses[0].annualTuitionINR / 100000).toFixed(2)} Lakh / yr
                    </td>
                  ))}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>

                {/* Row: Estimated 4-Year Cost */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 font-semibold text-[#111827] bg-slate-50/40">
                    Estimated 4-Yr Total (Fee + Hostel)
                  </td>
                  {comparedColleges.map((col) => {
                    const c = col.courses[0];
                    const est = (c.annualTuitionINR + c.hostelFeeAnnualINR) * 4 + c.oneTimeAdmissionFeeINR;
                    return (
                      <td key={col.id} className="p-4 font-mono font-bold text-[#172F91]">
                        ₹{(est / 100000).toFixed(2)} Lakh
                      </td>
                    );
                  })}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>

                {/* Row: Median Salary */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 font-semibold text-[#111827] bg-slate-50/40">
                    Median CTC (50th %ile)
                  </td>
                  {comparedColleges.map((col) => (
                    <td key={col.id} className="p-4 font-mono font-bold text-emerald-700">
                      ₹{col.placements.medianSalaryLPA} LPA
                      <span className="block text-[10px] text-[#64748B] font-normal font-sans">
                        Avg: ₹{col.placements.avgSalaryLPA} LPA ({col.placements.placementRatePercent}% placed)
                      </span>
                    </td>
                  ))}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>

                {/* Row: Historical Cutoff CSE */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 font-semibold text-[#111827] bg-slate-50/40">
                    Previous Round 6 Cutoff (CSE)
                  </td>
                  {comparedColleges.map((col) => {
                    const co = col.cutoffs.find(c => c.branchCode === 'CSE');
                    return (
                      <td key={col.id} className="p-4 font-mono font-semibold text-[#111827]">
                        {co ? `#${co.closingRank.toLocaleString()}` : 'N/A or Score-based'}
                      </td>
                    );
                  })}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>

                {/* Row: Hostel Quality */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 font-semibold text-[#111827] bg-slate-50/40">
                    Hostel & Mess Rating
                  </td>
                  {comparedColleges.map((col) => (
                    <td key={col.id} className="p-4">
                      <div className="flex items-center gap-1.5 text-[#111827]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-semibold">{col.reviewsSummary.breakdown.hostel} / 5.0</span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">
                        Fee: ₹{(col.courses[0].hostelFeeAnnualINR / 1000).toFixed(0)}k / yr
                      </span>
                    </td>
                  ))}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>

                {/* Row: Campus Life & Clubs */}
                <tr className="hover:bg-slate-50/60">
                  <td className="p-4 font-semibold text-[#111827] bg-slate-50/40">
                    Campus Life & Clubs
                  </td>
                  {comparedColleges.map((col) => (
                    <td key={col.id} className="p-4">
                      <div className="flex items-center gap-1.5 text-[#111827]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span className="font-semibold">{col.reviewsSummary.breakdown.clubs} / 5.0</span>
                      </div>
                      <span className="text-[10px] text-[#64748B]">{col.campusSizeAcres} Acres</span>
                    </td>
                  ))}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>

                {/* Row: Actions */}
                <tr className="bg-slate-50/80">
                  <td className="p-4 font-semibold text-[#111827]">
                    Actions
                  </td>
                  {comparedColleges.map((col) => (
                    <td key={col.id} className="p-4">
                      <button
                        onClick={() => setSelectedCollege(col)}
                        className="w-full py-2 px-3 rounded-xl text-xs font-semibold bg-[#111827] text-white hover:bg-black transition-all shadow-xs"
                      >
                        Inspect Details
                      </button>
                    </td>
                  ))}
                  {comparedColleges.length < 4 && <td></td>}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
