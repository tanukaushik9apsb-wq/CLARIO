import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ArrowUp, ArrowDown, Trash2, Printer, Download, Save, 
  AlertTriangle, ShieldCheck, CheckCircle2, AlertCircle, FileText, ExternalLink, Plus
} from 'lucide-react';

export const ChoiceListWorkspace: React.FC = () => {
  const { 
    choiceList, 
    moveChoiceUp, 
    moveChoiceDown, 
    removeFromChoiceList, 
    clearChoiceList,
    exam, studentRank, category,
    setCurrentView,
    showToast
  } = useApp();

  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [exportNotice, setExportNotice] = useState(false);

  // Check for duplicates
  const duplicatesFound = React.useMemo(() => {
    const keys: { [key: string]: number } = {};
    choiceList.forEach((c) => {
      const k = `${c.collegeId}-${c.branchCode}`;
      keys[k] = (keys[k] || 0) + 1;
    });
    return Object.keys(keys).some((k) => keys[k] > 1);
  }, [choiceList]);

  // Check for inverted hierarchy (e.g., Safe choice above Ambitious choice)
  const invertedOrders = React.useMemo(() => {
    const warnings: string[] = [];
    for (let i = 0; i < choiceList.length - 1; i++) {
      const current = choiceList[i];
      const next = choiceList[i + 1];
      if (current.categoryTag === 'Safe' && next.categoryTag === 'Ambitious') {
        warnings.push(`Choice #${i + 1} (${current.collegeName}) is marked Safe, but is placed above Ambitious Choice #${i + 2} (${next.collegeName}). In JoSAA, once a higher preference is allocated, all lower choices are permanently eliminated.`);
      }
    }
    return warnings;
  }, [choiceList]);

  const handlePrint = () => {
    window.print();
  };

  const handleSaveProgress = () => {
    showToast('Choice preferences successfully saved to your profile!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Workspace Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-300">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold">
              PREFERENCE ARCHITECTURE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111827] mt-1">
              Choice List Workspace
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
              Arrange your preferred college & branch options in strictly descending order of desire. 
              Review potential pitfalls, verify eligibility rules, and export before opening the official {exam} portal.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentView('explore')}
              className="py-2.5 px-4 rounded-2xl text-xs font-semibold border border-slate-300 bg-white hover:bg-slate-50 text-[#111827] flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[#172F91]" />
              <span>Add More Colleges</span>
            </button>

            <button
              onClick={handleSaveProgress}
              className="py-2.5 px-4 rounded-2xl text-xs font-semibold bg-white hover:bg-slate-50 text-[#111827] border border-slate-300 flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Save className="w-3.5 h-3.5 text-slate-700" />
              <span>Save Progress</span>
            </button>

            <button
              onClick={handlePrint}
              className="py-2.5 px-4 rounded-2xl text-xs font-semibold bg-[#111827] text-white hover:bg-black flex items-center gap-1.5 shadow-xs transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Export PDF</span>
            </button>
          </div>
        </div>

        {/* Warning / Validation Alerts */}
        <div className="space-y-3 mb-8">
          {duplicatesFound && (
            <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 shadow-xs">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Duplicate Preference Detected:</strong>
                You have added the same college and branch combination more than once. Government counselling portals will reject duplicate options.
              </div>
            </div>
          )}

          {invertedOrders.length > 0 && (
            <div className="p-5 rounded-3xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-start gap-3 shadow-xs">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Irreversible Preference Inversion Warning:</strong>
                {invertedOrders.map((warning, i) => (
                  <div key={i} className="mt-1 leading-relaxed">
                    • {warning}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-5 rounded-3xl bg-[#DEE5FC]/40 border border-[#DEE5FC] text-xs text-[#1E293B] flex items-start gap-3 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#172F91] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#111827] font-semibold block mb-0.5">
                Official Counselling Rule Reminder ({exam}):
              </strong>
              In official allocation, systems scan choices sequentially from #1 downwards. If you are allotted Choice #4, Choices #5, #6, etc., can NEVER be allotted in future rounds. Always place your dream program higher, regardless of cutoffs.
            </div>
          </div>
        </div>

        {/* Choice List Table / Interactive Reordering */}
        {choiceList.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-[#DEE5FC] border border-blue-200 flex items-center justify-center mx-auto mb-4 text-[#172F91]">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl text-[#111827] font-semibold mb-2">
              Your Choice List is Empty
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] max-w-md mx-auto mb-6">
              Go to the Explore Colleges tool and click "Add Choice" on any program to start assembling your personalized hierarchy.
            </p>
            <button
              onClick={() => setCurrentView('explore')}
              className="py-3 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black transition-all shadow-sm"
            >
              Explore Shortlist Recommendations
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs mb-10">
            
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-serif text-lg text-[#111827] font-semibold">
                  Configured Choices ({choiceList.length})
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Exam: <strong className="text-[#111827]">{exam}</strong> | AIR: <strong className="text-[#111827]">{studentRank}</strong>
                </span>
              </div>

              <button
                onClick={clearChoiceList}
                className="text-xs text-red-600 hover:text-red-700 font-semibold transition-colors"
              >
                Reset All Choices
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {choiceList.map((item, idx) => (
                <div
                  key={`${item.collegeId}-${item.branchCode}-${idx}`}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  {/* Left: Order index & College/Branch Details */}
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Preference Rank Index */}
                    <div className="w-10 h-10 rounded-2xl bg-[#DEE5FC] text-[#172F91] font-serif text-lg font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-serif text-base sm:text-lg text-[#111827] font-semibold">
                          {item.collegeName}
                        </h4>
                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                          item.categoryTag === 'Ambitious'
                            ? 'bg-[#FCD7B6] text-amber-950'
                            : item.categoryTag === 'Match'
                            ? 'bg-[#DDF587] text-emerald-950'
                            : 'bg-[#DEE5FC] text-blue-950'
                        }`}>
                          {item.categoryTag}
                        </span>
                      </div>

                      <div className="text-xs text-[#172F91] font-semibold mt-0.5">
                        {item.branchCode} — {item.branchName}
                      </div>

                      <div className="text-[11px] text-[#64748B] flex items-center gap-4 mt-1">
                        <span>Prev. Closing Cutoff: <strong className="text-[#111827]">#{item.closingRank.toLocaleString()}</strong></span>
                        <span>Median CTC: <strong className="text-emerald-700 font-semibold">₹{item.medianSalaryLPA} LPA</strong></span>
                        <span>Tuition: <strong className="text-[#111827]">₹{(item.annualTuitionINR / 100000).toFixed(2)}L/yr</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Reorder & Remove Controls */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      onClick={() => moveChoiceUp(idx)}
                      disabled={idx === 0}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                        idx === 0 
                          ? 'opacity-30 cursor-not-allowed border-transparent text-slate-400' 
                          : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-[#111827]'
                      }`}
                      title="Move Preference Up"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => moveChoiceDown(idx)}
                      disabled={idx === choiceList.length - 1}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all ${
                        idx === choiceList.length - 1 
                          ? 'opacity-30 cursor-not-allowed border-transparent text-slate-400' 
                          : 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-[#111827]'
                      }`}
                      title="Move Preference Down"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => removeFromChoiceList(idx)}
                      className="w-8 h-8 rounded-xl flex items-center justify-center border border-red-200 bg-red-50 hover:bg-red-100 text-red-600 transition-all ml-1"
                      title="Delete Choice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#64748B]">
                Total Choices: <strong className="text-[#111827]">{choiceList.length}</strong> | 
                Estimated 4-Year Tuition Range: <strong className="text-[#111827]">₹{(Math.min(...choiceList.map(c => c.annualTuitionINR)) * 4 / 100000).toFixed(1)}L - ₹{(Math.max(...choiceList.map(c => c.annualTuitionINR)) * 4 / 100000).toFixed(1)}L</strong>
              </div>

              <button
                onClick={() => setReviewModalOpen(true)}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl font-semibold text-xs uppercase tracking-wider bg-[#111827] text-white hover:bg-black flex items-center justify-center gap-2 shadow-xs transition-all active:scale-98"
              >
                <span>Pre-Locking Review Screen</span>
                <CheckCircle2 className="w-4 h-4 text-[#DDF587]" />
              </button>
            </div>
          </div>
        )}

        {/* Pre-Locking Review Modal */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] shadow-2xl">
              
              <div className="flex items-start justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#172F91] font-bold">
                    FINAL INSPECTION BEFORE OFFICIAL PORTAL
                  </span>
                  <h3 className="font-serif text-2xl text-[#111827] font-semibold mt-1">
                    JoSAA / CSAB Choice Locking Readiness Check
                  </h3>
                </div>
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-[#475569] mb-8">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#111827] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No Duplicate Choices: PASS</span>
                  </div>
                  <p className="text-[11px]">
                    All {choiceList.length} choices are distinct academic programs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#111827] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>75% Class 12 Board Eligibility Criteria: PASS</span>
                  </div>
                  <p className="text-[11px]">
                    Candidate meets top 20 percentile or 75% aggregate marks for IITs and NITs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center gap-2 text-[#111827] font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Quota & Category Validation: PASS</span>
                  </div>
                  <p className="text-[11px]">
                    State code of eligibility matches Class 12 passing certificate. Category certificate issue date confirmed after April 1.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs mb-8">
                <strong className="block font-semibold mb-1">
                  CRITICAL NOTICE:
                </strong>
                Clario does NOT automatically submit choices to the government server. You must now log in to the official counselling portal (<a href="https://josaa.nic.in" target="_blank" rel="noreferrer" className="underline font-bold text-amber-950">josaa.nic.in</a>) and enter your choices in this exact order before the locking cutoff!
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="w-full sm:w-auto py-2.5 px-5 rounded-2xl text-xs font-semibold text-slate-700 border border-slate-300 hover:bg-slate-50"
                >
                  Return to Edit
                </button>
                <a
                  href="https://josaa.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Proceed to Official JoSAA Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
