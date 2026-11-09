import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { College } from '../../types';
import { 
  X, ExternalLink, ShieldCheck, MapPin, Building2, Calendar, 
  Award, TrendingUp, DollarSign, Home, BookOpen, Star, Plus, CheckCircle2
} from 'lucide-react';

export const CollegeDetailModal: React.FC = () => {
  const { selectedCollege, setSelectedCollege, addToChoiceList, choiceList, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'cutoffs' | 'placements' | 'fees' | 'reviews'>('overview');

  if (!selectedCollege) return null;

  const college = selectedCollege;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
        
        {/* Modal Header with Hero Image Banner */}
        <div className="relative h-48 sm:h-56 shrink-0 overflow-hidden bg-slate-900">
          <img 
            src={college.heroImage || college.image} 
            alt={college.name}
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          {/* Close button */}
          <button
            onClick={() => setSelectedCollege(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-900/70 border border-white/20 flex items-center justify-center text-white hover:bg-black transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* College Title Info */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#DEE5FC] text-[#172F91]">
                NIRF #{college.nirfRank} {college.categoryType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#DDF587] text-emerald-950">
                {college.counsellingAuthority} Counselling
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white backdrop-blur-xs">
                Est. {college.established} • {college.campusSizeAcres} Acres
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight">
              {college.name}
            </h2>
            <div className="text-xs text-slate-200 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-[#8CB7FF]" />
              <span>{college.location}, {college.state}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 border-b border-slate-200 bg-slate-50 overflow-x-auto text-xs shrink-0">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'overview' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Overview & Facilities
          </button>
          <button
            onClick={() => setActiveTab('cutoffs')}
            className={`py-3 px-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'cutoffs' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Cutoffs Matrix
          </button>
          <button
            onClick={() => setActiveTab('placements')}
            className={`py-3 px-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'placements' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Placements & Careers
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`py-3 px-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'fees' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Fees & Living Costs
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-3 font-semibold transition-colors border-b-2 whitespace-nowrap ${
              activeTab === 'reviews' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            Student Ratings ({college.reviewsSummary.count})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 text-xs text-[#475569] space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-lg text-[#111827] font-semibold mb-2">Institutional Profile</h4>
                <p className="leading-relaxed text-[#1F2937] text-sm">
                  {college.overview}
                </p>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#111827] font-semibold mb-3">Eligibility Guidelines</h4>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-[#111827] flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{college.eligibilityCriteria}</span>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#111827] font-semibold mb-3">Campus Infrastructure</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-[#64748B] uppercase">Hostel Accommodation</div>
                    <div className="font-semibold text-[#111827] mt-1">
                      {college.facilities.hostelAvailable ? 'Guaranteed 1st Year Hostels' : 'Off-campus accommodation'}
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-[#64748B] uppercase">Campus Connectivity</div>
                    <div className="font-semibold text-[#111827] mt-1">High-Speed Wi-Fi & LAN</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="text-[10px] text-[#64748B] uppercase">Sports & Recreation</div>
                    <div className="font-semibold text-[#111827] mt-1">Olympic Pool, Gym & Courts</div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 sm:col-span-3">
                    <div className="text-[10px] text-[#64748B] uppercase">Library & Digital Resources</div>
                    <div className="font-semibold text-[#111827] mt-1">{college.facilities.libraryVolumes}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#111827] font-semibold mb-3">Available Programs & Degrees</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {college.courses.map((course) => {
                    const inChoice = choiceList.some(c => c.collegeId === college.id && c.branchCode === course.branchCode);
                    return (
                      <div key={course.branchCode} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-[#111827]">{course.branchName}</div>
                          <div className="text-[11px] text-[#172F91] font-semibold">{course.degree} • {course.durationYears} Years</div>
                        </div>
                        <button
                          onClick={() => addToChoiceList(college, course.branchCode)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                            inChoice 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-[#111827] text-white hover:bg-black'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{inChoice ? 'Added' : 'Add Choice'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CUTOFFS */}
          {activeTab === 'cutoffs' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#DEE5FC]/40 border border-[#DEE5FC] text-xs text-[#1E293B]">
                Cutoff ranks represent historical closing ranks across official counselling rounds. Round 6 is typically the final JoSAA allocation round before CSAB special rounds.
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-[#111827] uppercase tracking-wider text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Branch</th>
                      <th className="p-3">Round</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Quota</th>
                      <th className="p-3">Opening</th>
                      <th className="p-3">Closing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {college.cutoffs.map((co, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-3 font-semibold text-[#111827]">{co.branchCode}</td>
                        <td className="p-3 text-[#475569]">Round {co.round}</td>
                        <td className="p-3 text-[#475569]">{co.category}</td>
                        <td className="p-3 font-mono text-[#475569]">{co.quota}</td>
                        <td className="p-3 font-mono text-[#475569]">#{co.openingRank}</td>
                        <td className="p-3 font-mono font-bold text-[#172F91]">#{co.closingRank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PLACEMENTS */}
          {activeTab === 'placements' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-[#64748B] uppercase">Median CTC</div>
                  <div className="font-serif text-2xl font-bold text-emerald-700 mt-1">₹{college.placements.medianSalaryLPA} LPA</div>
                  <div className="text-[10px] text-[#64748B]">50th Percentile</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-[#64748B] uppercase">Average CTC</div>
                  <div className="font-serif text-2xl font-bold text-[#111827] mt-1">₹{college.placements.avgSalaryLPA} LPA</div>
                  <div className="text-[10px] text-[#64748B]">Mean Package</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-[#64748B] uppercase">Highest Package</div>
                  <div className="font-serif text-2xl font-bold text-[#172F91] mt-1">₹{college.placements.highestSalaryLPA} LPA</div>
                  <div className="text-[10px] text-[#64748B]">Domestic / Global</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-[#64748B] uppercase">Placement Rate</div>
                  <div className="font-serif text-2xl font-bold text-[#111827] mt-1">{college.placements.placementRatePercent}%</div>
                  <div className="text-[10px] text-[#64748B]">Registered Candidates</div>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg text-[#111827] font-semibold mb-3">Key Recruiting Partners</h4>
                <div className="flex flex-wrap gap-2">
                  {college.placements.topRecruiters.map((recruiter) => (
                    <span key={recruiter} className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-[#111827]">
                      {recruiter}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-[#64748B]">
                Source Document: <strong className="text-[#111827]">{college.placements.sourceDocument}</strong>. Verified by Clario Data Auditing Council.
              </div>
            </div>
          )}

          {/* TAB 4: FEES */}
          {activeTab === 'fees' && (
            <div className="space-y-4">
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-[#111827] uppercase tracking-wider text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Program</th>
                      <th className="p-3">Annual Tuition</th>
                      <th className="p-3">Annual Hostel & Mess</th>
                      <th className="p-3">One-Time Security</th>
                      <th className="p-3">Est. 4-Year Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {college.courses.map((c) => {
                      const total4Yr = (c.annualTuitionINR + c.hostelFeeAnnualINR) * c.durationYears + c.oneTimeAdmissionFeeINR;
                      return (
                        <tr key={c.branchCode} className="hover:bg-slate-50">
                          <td className="p-3 font-semibold text-[#111827]">{c.branchName}</td>
                          <td className="p-3 font-mono text-[#475569]">₹{c.annualTuitionINR.toLocaleString()}</td>
                          <td className="p-3 font-mono text-[#475569]">₹{c.hostelFeeAnnualINR.toLocaleString()}</td>
                          <td className="p-3 font-mono text-[#475569]">₹{c.oneTimeAdmissionFeeINR.toLocaleString()}</td>
                          <td className="p-3 font-mono font-bold text-emerald-700">₹{(total4Yr / 100000).toFixed(2)} Lakh</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-[#64748B] italic">
                * Note: Central government institutions (IITs, NITs) provide 100% tuition remission for SC/ST/PwD candidates and students whose family income is below ₹1 Lakh per annum, plus 2/3rd fee remission for families between ₹1L - ₹5L.
              </p>
            </div>
          )}

          {/* TAB 5: REVIEWS BREAKDOWN */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <div className="font-serif text-3xl font-bold text-[#111827]">{college.reviewsSummary.overallRating} / 5.0</div>
                  <div className="text-xs text-[#64748B]">Based on {college.reviewsSummary.count} verified student surveys</div>
                </div>
                <div className="flex text-amber-500 text-lg">
                  {'★'.repeat(5)}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {Object.entries(college.reviewsSummary.breakdown).map(([metric, score]) => (
                  <div key={metric} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <span className="capitalize text-[#111827] font-medium">{metric} Quality</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#172F91] rounded-full"
                          style={{ width: `${(score / 5) * 100}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-[#111827]">{score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <a
            href={college.officialWebsite}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#172F91] font-semibold hover:underline flex items-center gap-1.5"
          >
            <span>Visit Official College Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedCollege(null)}
              className="py-2.5 px-5 rounded-2xl text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-white transition-all shadow-xs"
            >
              Close
            </button>
            <button
              onClick={() => {
                addToChoiceList(college, college.courses[0].branchCode);
                setSelectedCollege(null);
              }}
              className="py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black transition-all shadow-xs"
            >
              Add {college.courses[0].branchCode} to Choices
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
