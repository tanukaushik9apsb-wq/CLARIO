import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { COLLEGES_DATA } from '../../data/mockData';
import { CollegeReview } from '../../types';
import { 
  Star, ThumbsUp, Flag, ShieldCheck, Plus, Search, 
  Filter, CheckCircle2, MessageSquare
} from 'lucide-react';

export const CollegeReviewsView: React.FC = () => {
  const { reviews, upvoteReview, addReview, showToast } = useApp();

  const [selectedCollegeId, setSelectedCollegeId] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  // New review form fields
  const [newCollegeId, setNewCollegeId] = useState('iit-bombay');
  const [newBranch, setNewBranch] = useState('Computer Science');
  const [newYear, setNewYear] = useState('Class of 2026');
  const [newStudentName, setNewStudentName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPros, setNewPros] = useState('');
  const [newCons, setNewCons] = useState('');
  const [newRatings, setNewRatings] = useState({
    teaching: 4.5,
    faculty: 4.2,
    attendance: 4.0,
    campus: 4.8,
    hostel: 3.8,
    clubs: 4.9,
    internships: 4.7,
    placements: 4.8,
    workload: 4.0
  });

  const filteredReviews = reviews.filter((r) => {
    if (selectedCollegeId !== 'All' && r.collegeId !== selectedCollegeId) {
      return false;
    }
    if (
      searchTerm &&
      !r.collegeName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !r.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !r.pros.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleReport = (reviewId: string) => {
    showToast('Review flagged for admin moderation. Thank you for keeping the community safe.', 'info');
  };

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newPros.trim()) {
      showToast('Please provide a title and pros summary', 'warning');
      return;
    }

    const college = COLLEGES_DATA.find(c => c.id === newCollegeId) || COLLEGES_DATA[0];

    addReview({
      collegeId: college.id,
      collegeName: college.shortName,
      branch: newBranch,
      graduationYear: newYear,
      studentName: newStudentName || 'Anonymous Verified Student',
      verifiedStudent: true,
      title: newTitle,
      ratings: newRatings,
      pros: newPros,
      cons: newCons
    });

    setReviewModalOpen(false);
    // Reset
    setNewTitle('');
    setNewPros('');
    setNewCons('');
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Ground Reality from Enrolled Students</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#111827]">
              Campus Reviews & Community Insights
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
              Unvarnished student feedback across 9 distinct categories: teaching rigor, attendance policy, mess quality, and placement prep. 
              No promotional claims or marketing fluff.
            </p>
          </div>

          <button
            onClick={() => setReviewModalOpen(true)}
            className="py-2.5 px-5 rounded-2xl text-xs font-semibold bg-[#111827] text-white hover:bg-black flex items-center gap-2 shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Student Review</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 mb-8 text-xs shadow-xs">
          <div className="relative flex-1 w-full sm:w-auto">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reviews by college, title, or pro/con..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs text-[#111827] placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-[#64748B] font-semibold">College:</span>
            <select
              value={selectedCollegeId}
              onChange={(e) => setSelectedCollegeId(e.target.value)}
              className="bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
            >
              <option value="All">All Colleges</option>
              {COLLEGES_DATA.map((c) => (
                <option key={c.id} value={c.id}>{c.shortName}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.map((rev) => {
            const avgRating = (
              Object.values(rev.ratings).reduce((a, b) => a + b, 0) /
              Object.values(rev.ratings).length
            ).toFixed(1);

            return (
              <div
                key={rev.id}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs"
              >
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DEE5FC] text-[#172F91]">
                        {rev.collegeName}
                      </span>
                      {rev.verifiedStudent && (
                        <span className="text-[10px] text-emerald-700 flex items-center gap-1 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Enrolled Student</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl text-[#111827] font-semibold mt-1">
                      "{rev.title}"
                    </h3>

                    <div className="text-xs text-[#64748B] mt-1">
                      By <strong className="text-[#111827]">{rev.studentName}</strong> • {rev.branch} ({rev.graduationYear}) • {rev.date}
                    </div>
                  </div>

                  {/* Rating Score */}
                  <div className="flex sm:flex-col items-center sm:items-end gap-1.5 shrink-0">
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{avgRating} / 5.0</span>
                    </div>
                    <span className="text-[10px] text-[#64748B]">Consolidated Score</span>
                  </div>
                </div>

                {/* 9-Metric Ratings Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 py-4 border-b border-slate-100 text-center text-[10px]">
                  {Object.entries(rev.ratings).map(([key, val]) => (
                    <div key={key} className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="text-[#64748B] uppercase capitalize truncate font-semibold">{key}</div>
                      <div className="font-mono font-bold text-[#111827] mt-0.5">{val}★</div>
                    </div>
                  ))}
                </div>

                {/* Pros and Cons */}
                <div className="py-4 space-y-3 text-xs leading-relaxed">
                  <div>
                    <span className="text-emerald-800 font-bold uppercase text-[10px] tracking-wider block mb-0.5">
                      ✓ The Highlights & Advantages:
                    </span>
                    <p className="text-[#1F2937]">{rev.pros}</p>
                  </div>

                  <div>
                    <span className="text-amber-800 font-bold uppercase text-[10px] tracking-wider block mb-0.5">
                      ✕ The Compromises & Reality:
                    </span>
                    <p className="text-[#4B5563]">{rev.cons}</p>
                  </div>
                </div>

                {/* Footer Actions: Helpful upvote & Report */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#64748B]">
                  <button
                    onClick={() => upvoteReview(rev.id)}
                    className="flex items-center gap-1.5 hover:text-[#111827] font-semibold transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({rev.helpfulVotes})</span>
                  </button>

                  <button
                    onClick={() => handleReport(rev.id)}
                    className="flex items-center gap-1 text-slate-400 hover:text-red-600 transition-colors"
                  >
                    <Flag className="w-3 h-3" />
                    <span>Report Review</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Write a Review */}
        {reviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
            <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto text-[#111827]">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#172F91] font-bold">
                    COMMUNITY CONTRIBUTION
                  </span>
                  <h3 className="font-serif text-2xl text-[#111827] font-semibold mt-0.5">
                    Share Your Campus Experience
                  </h3>
                </div>
                <button
                  onClick={() => setReviewModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateReview} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                      College / University
                    </label>
                    <select
                      value={newCollegeId}
                      onChange={(e) => setNewCollegeId(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                    >
                      {COLLEGES_DATA.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                      Branch & Degree
                    </label>
                    <input
                      type="text"
                      value={newBranch}
                      onChange={(e) => setNewBranch(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                      Your Name or Pseudonym
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Varun K. or Anonymous"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                      Batch / Graduation Year
                    </label>
                    <input
                      type="text"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                    Headline Summary of Your Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Unbeatable peer group, but hostel food takes getting used to"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-emerald-800 mb-1 font-semibold uppercase text-[10px]">
                    The Highlights & Pros (Academic, coding culture, fests, placements)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What did you genuinely appreciate about this college?"
                    value={newPros}
                    onChange={(e) => setNewPros(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl p-3 text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-amber-800 mb-1 font-semibold uppercase text-[10px]">
                    The Compromises & Cons (Attendance rules, workload, administration)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What should future candidates be mentally prepared for?"
                    value={newCons}
                    onChange={(e) => setNewCons(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl p-3 text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewModalOpen(false)}
                    className="py-2.5 px-5 rounded-2xl text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black shadow-xs transition-all"
                  >
                    Publish Verified Review
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
