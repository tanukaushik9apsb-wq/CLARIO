import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, Compass, Calendar, Bell, Users, Bookmark, 
  Settings, CheckSquare, Clock, Video, ArrowRight, ShieldCheck, 
  Trash2, ExternalLink, Sparkles, AlertCircle, Star, MessageSquare, CheckCircle2
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { 
    colleges,
    currentUser,
    exam, studentRank, category, homeState,
    choiceList, savedCollegeIds, toggleSaveCollege,
    bookings, setActiveCallBooking, cancelBooking, submitSessionFeedback,
    updates, checklistTasks, toggleChecklistTask,
    threads, bookmarkedThreadIds, toggleBookmarkThread,
    setCurrentView, setSelectedCollege, showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'choices' | 'updates' | 'deadlines' | 'bookings' | 'saved' | 'bookmarks' | 'profile'
  >('overview');

  // Feedback Modal State
  const [feedbackBookingId, setFeedbackBookingId] = useState<string | null>(null);
  const [ratingVal, setRatingVal] = useState<number>(5);
  const [commentVal, setCommentVal] = useState<string>('Very practical and candid advice regarding branch vs college choices.');

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const savedColleges = colleges.filter(c => savedCollegeIds.includes(c.id));
  const pendingTasks = checklistTasks.filter(t => !t.completed);
  const criticalNotices = updates.filter(u => u.importance === 'Critical');
  const bookmarkedThreads = threads.filter(t => bookmarkedThreadIds.includes(t.id));

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackBookingId) return;
    submitSessionFeedback(feedbackBookingId, ratingVal, commentVal);
    setFeedbackBookingId(null);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Profile Banner */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#DEE5FC] text-[#172F91] font-serif text-2xl font-bold flex items-center justify-center shrink-0 shadow-xs">
              {(currentUser?.name || 'A').charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-semibold">
                  Welcome back, {currentUser?.name?.split(' ')[0] || 'Aarush'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DDF587] text-emerald-950">
                  JoSAA & State 2026 Cycle
                </span>
              </div>
              <div className="text-xs text-[#64748B] mt-1 flex flex-wrap items-center gap-3 font-mono">
                <span>Exam: <strong className="text-[#111827]">{exam}</strong></span>
                <span>• AIR CRL: <strong className="text-[#172F91] font-bold">{studentRank.toLocaleString()}</strong></span>
                <span>• Category: <strong className="text-[#111827]">{category}</strong></span>
                <span>• Domicile: <strong className="text-[#111827]">{currentUser?.homeState || homeState}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('mentors')}
              className="py-2.5 px-5 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black shadow-xs transition-all"
            >
              Browse Mentors
            </button>
          </div>
        </div>

        {/* Dashboard Layout: Sidebar + Main Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-3 space-y-1 text-xs shadow-xs">
              
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'overview' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className={`w-4 h-4 ${activeTab === 'overview' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Overview</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('choices')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'choices' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Compass className={`w-4 h-4 ${activeTab === 'choices' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Choice List</span>
                </div>
                <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${activeTab === 'choices' ? 'bg-[#DEE5FC] text-[#172F91]' : 'bg-slate-100 text-[#111827]'}`}>
                  {choiceList.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'bookings' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className={`w-4 h-4 ${activeTab === 'bookings' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Mentor Sessions</span>
                </div>
                {bookings.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {bookings.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('bookmarks')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'bookmarks' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className={`w-4 h-4 ${activeTab === 'bookmarks' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Saved Discussions</span>
                </div>
                <span className="text-[10px] text-[#64748B]">
                  {bookmarkedThreads.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('updates')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'updates' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bell className={`w-4 h-4 ${activeTab === 'updates' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Official Updates</span>
                </div>
                {criticalNotices.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold">
                    {criticalNotices.length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('deadlines')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'deadlines' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className={`w-4 h-4 ${activeTab === 'deadlines' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Pending Tasks</span>
                </div>
                <span className="text-[10px] text-[#64748B]">
                  {pendingTasks.length} left
                </span>
              </button>

              <button
                onClick={() => setActiveTab('saved')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'saved' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bookmark className={`w-4 h-4 ${activeTab === 'saved' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Saved Shortlist</span>
                </div>
                <span className="text-[10px] text-[#64748B]">
                  {savedColleges.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-3.5 py-2.5 rounded-2xl font-semibold flex items-center justify-between transition-colors ${
                  activeTab === 'profile' ? 'bg-[#111827] text-white' : 'text-[#64748B] hover:bg-slate-100 hover:text-[#111827]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className={`w-4 h-4 ${activeTab === 'profile' ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                  <span>Rank & Domicile</span>
                </div>
              </button>

            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* 1. OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Critical Updates Banner */}
                {criticalNotices.length > 0 && (
                  <div className="p-5 rounded-3xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-red-900 shadow-xs">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Immediate Action Required:</strong>
                      {criticalNotices[0].title}. Please verify document annexures and choices before the deadline.
                    </div>
                  </div>
                )}

                {/* Upcoming Mentor Session Widget */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#172F91] uppercase tracking-wider">
                      <Video className="w-4 h-4" />
                      <span>1-on-1 Mentorship Sessions</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('bookings')}
                      className="text-xs text-[#172F91] hover:underline font-semibold"
                    >
                      View All ({bookings.length})
                    </button>
                  </div>

                  {bookings.length > 0 ? (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={bookings[0].mentorAvatar}
                          alt={bookings[0].mentorName}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-200"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-serif text-lg text-[#111827] font-semibold">
                              {bookings[0].mentorName}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              bookings[0].status === 'confirmed' ? 'bg-[#DDF587] text-emerald-950' :
                              bookings[0].status === 'pending' ? 'bg-amber-100 text-amber-900' :
                              bookings[0].status === 'completed' ? 'bg-blue-100 text-blue-900' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {bookings[0].status}
                            </span>
                          </div>
                          <div className="text-xs text-[#172F91] font-semibold mt-0.5">
                            {bookings[0].topic}
                          </div>
                          <div className="text-[11px] text-[#64748B] mt-1 font-mono">
                            Slot: {bookings[0].date} • {bookings[0].time}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {bookings[0].status === 'confirmed' && (
                          <button
                            onClick={() => setActiveCallBooking(bookings[0])}
                            className="py-2.5 px-5 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black flex items-center justify-center gap-2 shadow-xs transition-all"
                          >
                            <Video className="w-4 h-4 text-[#DDF587]" />
                            <span>Enter Call Room</span>
                          </button>
                        )}
                        {bookings[0].status === 'completed' && !bookings[0].rating && (
                          <button
                            onClick={() => setFeedbackBookingId(bookings[0].id)}
                            className="py-2.5 px-4 rounded-2xl text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600 transition-all flex items-center gap-1.5"
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span>Rate Session</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-xs text-[#64748B]">
                      No upcoming sessions scheduled. Connect with an IITian or NITian mentor to review your choices.
                    </div>
                  )}
                </div>

                {/* Choice List Preview (Top 3) */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <h3 className="font-serif text-xl text-[#111827] font-semibold">
                      Configured Choice Preferences ({choiceList.length})
                    </h3>
                    <button
                      onClick={() => setCurrentView('choice-workspace')}
                      className="text-xs text-[#172F91] hover:underline font-semibold flex items-center gap-1"
                    >
                      <span>Full Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {choiceList.slice(0, 3).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-[#DEE5FC] text-[#172F91] font-serif font-bold text-sm flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-semibold text-[#111827]">{item.collegeName}</div>
                            <div className="text-[11px] text-[#172F91] font-semibold">{item.branchCode} — {item.branchName}</div>
                          </div>
                        </div>

                        <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase ${
                          item.categoryTag === 'Ambitious' ? 'bg-[#FCD7B6] text-amber-950' : item.categoryTag === 'Match' ? 'bg-[#DDF587] text-emerald-950' : 'bg-[#DEE5FC] text-blue-950'
                        }`}>
                          {item.categoryTag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* 2. CHOICES TAB */}
            {activeTab === 'choices' && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-serif text-xl text-[#111827] font-semibold">
                    Saved Choice Preference List
                  </h3>
                  <button
                    onClick={() => setCurrentView('choice-workspace')}
                    className="py-2 px-4 rounded-2xl text-xs font-semibold bg-[#111827] text-white hover:bg-black transition-all shadow-xs"
                  >
                    Open Workspace
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {choiceList.map((item, idx) => (
                    <div key={idx} className="py-3.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#DEE5FC] text-[#172F91] font-serif font-bold text-sm flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-[#111827]">{item.collegeName}</div>
                          <div className="text-[#172F91] font-medium">{item.branchName}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-emerald-700 font-bold">₹{item.medianSalaryLPA} LPA</div>
                        <div className="text-[10px] text-[#64748B]">Closing: #{item.closingRank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. BOOKINGS TAB (Full Track & Feedback Lifecycle) */}
            {activeTab === 'bookings' && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="font-serif text-xl text-[#111827] font-semibold">
                      My Mentorship Consultations ({bookings.length})
                    </h3>
                    <p className="text-xs text-[#64748B] mt-0.5">
                      Track session request approval, join meeting rooms, and submit feedback on completed calls.
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentView('mentors')}
                    className="py-2 px-4 rounded-xl text-xs font-semibold bg-[#111827] text-white hover:bg-black transition-all"
                  >
                    Book New Session
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base text-[#111827] font-semibold">{b.mentorName}</span>
                          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#DEE5FC] text-[#172F91] font-bold">
                            {b.mentorCollege}
                          </span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                            b.status === 'confirmed' ? 'bg-[#DDF587] text-emerald-950' :
                            b.status === 'pending' ? 'bg-amber-100 text-amber-900' :
                            b.status === 'completed' ? 'bg-blue-100 text-blue-900' :
                            b.status === 'rejected' ? 'bg-red-100 text-red-900' :
                            'bg-slate-200 text-slate-800'
                          }`}>
                            {b.status === 'pending' ? 'Awaiting Mentor Confirmation' : b.status}
                          </span>
                        </div>

                        <div className="text-[#475569]">
                          Topic: <strong className="text-[#111827]">{b.topic}</strong>
                        </div>
                        <div className="text-[11px] text-[#172F91] font-semibold font-mono">
                          Slot: {b.date} • {b.time} • Fee: ₹{b.priceINR}
                        </div>

                        {b.rejectionReason && (
                          <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-xl mt-1">
                            Decline reason: "{b.rejectionReason}" (Fee authorization released)
                          </div>
                        )}

                        {b.rating && (
                          <div className="text-[11px] text-amber-600 mt-1 font-semibold flex items-center gap-1">
                            <span>Your Review: {'★'.repeat(b.rating)}</span>
                            {b.feedbackComment && <span className="text-[#64748B] italic">"{b.feedbackComment}"</span>}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {b.status === 'confirmed' && (
                          <>
                            <button
                              onClick={() => cancelBooking(b.id)}
                              className="py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => setActiveCallBooking(b)}
                              className="py-2 px-4 rounded-xl bg-[#111827] text-white font-semibold hover:bg-black shadow-xs transition-all flex items-center gap-1.5"
                            >
                              <Video className="w-3.5 h-3.5 text-[#DDF587]" />
                              <span>Join Call</span>
                            </button>
                          </>
                        )}

                        {b.status === 'completed' && !b.rating && (
                          <button
                            onClick={() => {
                              setFeedbackBookingId(b.id);
                              setRatingVal(5);
                              setCommentVal('');
                            }}
                            className="py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center gap-1.5"
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span>Submit Feedback</span>
                          </button>
                        )}

                        {b.status === 'pending' && (
                          <span className="text-[11px] text-amber-700 font-medium italic">
                            Mentor review in progress
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FEEDBACK MODAL */}
            {feedbackBookingId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4 text-xs">
                  <h3 className="font-serif text-lg font-semibold text-[#111827]">
                    Submit Mentorship Rating & Review
                  </h3>
                  <p className="text-[#64748B]">
                    How helpful was the student mentor with your college and branch doubts?
                  </p>

                  {/* Star Rating Picker */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                      Rating (1 to 5 Stars)
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingVal(star)}
                          className={`text-2xl transition-transform hover:scale-110 ${
                            star <= ratingVal ? 'text-amber-500' : 'text-slate-300'
                          }`}
                        >
                          ★
                        </button>
                      ))}
                      <span className="font-bold text-sm text-[#111827] ml-2">{ratingVal} / 5</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                      Your Comments
                    </label>
                    <textarea
                      rows={3}
                      value={commentVal}
                      onChange={(e) => setCommentVal(e.target.value)}
                      placeholder="Share details on how the mentor helped with JoSAA choices or campus realities..."
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setFeedbackBookingId(null)}
                      className="py-2 px-4 rounded-xl text-xs text-[#64748B]"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleFeedbackSubmit}
                      className="py-2 px-5 rounded-xl font-semibold bg-[#111827] text-white hover:bg-black shadow-2xs"
                    >
                      Publish Feedback
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. SAVED DISCUSSIONS TAB */}
            {activeTab === 'bookmarks' && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-serif text-xl text-[#111827] font-semibold">
                    Saved Community Discussions ({bookmarkedThreads.length})
                  </h3>
                  <button
                    onClick={() => setCurrentView('community')}
                    className="text-xs text-[#172F91] hover:underline font-semibold"
                  >
                    Open Community Forum
                  </button>
                </div>

                {bookmarkedThreads.length === 0 ? (
                  <div className="text-center py-10 text-[#64748B]">
                    No discussions bookmarked yet. Click the bookmark icon on any community question to save it here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookmarkedThreads.map((t) => (
                      <div
                        key={t.id}
                        className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <span className="text-[10px] uppercase font-bold text-[#172F91]">
                            {t.category}
                          </span>
                          <h4 className="font-serif text-base font-semibold text-[#111827] hover:text-[#172F91] cursor-pointer" onClick={() => setCurrentView('community')}>
                            {t.title}
                          </h4>
                          <p className="text-[#64748B] line-clamp-2">{t.content}</p>
                          <div className="text-[11px] text-[#64748B]">
                            {t.upvotes} upvotes • {t.repliesCount} replies • Asked by {t.authorName}
                          </div>
                        </div>

                        <button
                          onClick={() => toggleBookmarkThread(t.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors shrink-0"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. SAVED COLLEGES TAB */}
            {activeTab === 'saved' && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="font-serif text-xl text-[#111827] font-semibold pb-3 border-b border-slate-100">
                  Bookmarked Institutions ({savedColleges.length})
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {savedColleges.map((col) => (
                    <div key={col.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-serif text-base text-[#111827] font-semibold">{col.name}</h4>
                        <div className="text-[11px] text-[#64748B]">{col.location}</div>
                        <div className="text-[11px] text-emerald-700 font-semibold mt-1">NIRF #{col.nirfRank} • Median ₹{col.placements.medianSalaryLPA} LPA</div>
                      </div>

                      <button
                        onClick={() => toggleSaveCollege(col.id)}
                        className="text-slate-400 hover:text-red-600 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PROFILE & DOMICILE TAB */}
            {activeTab === 'profile' && (
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
                <h3 className="font-serif text-xl text-[#111827] font-semibold pb-3 border-b border-slate-100">
                  Candidate Credentials & Eligibility Parameters
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[#64748B] uppercase text-[10px] block font-bold">Full Name</span>
                    <span className="font-semibold text-sm text-[#111827]">{currentUser?.name || 'Aarush Sharma'}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] uppercase text-[10px] block font-bold">Email</span>
                    <span className="font-semibold text-sm text-[#111827]">{currentUser?.email || 'aarush.sharma2026@gmail.com'}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] uppercase text-[10px] block font-bold">Counselling Exam</span>
                    <span className="font-semibold text-sm text-[#111827]">{exam}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] uppercase text-[10px] block font-bold">All India Rank (CRL)</span>
                    <span className="font-semibold text-sm text-[#172F91]">{studentRank.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] uppercase text-[10px] block font-bold">Category Quota</span>
                    <span className="font-semibold text-sm text-[#111827]">{category}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] uppercase text-[10px] block font-bold">State of Eligibility (Class 12)</span>
                    <span className="font-semibold text-sm text-[#111827]">{homeState}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => {
                      showToast('Candidate profile preferences updated!', 'success');
                    }}
                    className="py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black transition-all shadow-xs"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
