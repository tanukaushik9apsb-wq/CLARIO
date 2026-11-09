import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, Calendar, DollarSign, Clock, Users, 
  ShieldCheck, CheckCircle2, XCircle, Plus, Star, AlertCircle, 
  MessageSquare, Upload, Trash2, Edit3, Save, FileText, Check, X, Video
} from 'lucide-react';

export const MentorDashboard: React.FC = () => {
  const { 
    mentors, bookings, acceptBooking, rejectBooking, 
    updateMentorProfile, addMentorSlot, deleteMentorSlot, 
    submitMentorCredentials, currentUser, setActiveCallBooking, showToast 
  } = useApp();

  // Find current mentor profile or default to first mentor (Aarav Sharma)
  const currentMentor = mentors.find(m => 
    m.id === currentUser?.id || 
    (currentUser?.name && m.name.toLowerCase().includes(currentUser.name.toLowerCase()))
  ) || mentors[0];

  const [activeTab, setActiveTab] = useState<'requests' | 'slots' | 'credentials' | 'profile'>('requests');
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  // Slot Form
  const [newSlotDate, setNewSlotDate] = useState('Friday, 6:00 PM');
  const [newSlotTime, setNewSlotTime] = useState('06:00 PM - 06:30 PM');

  // Profile Edit State
  const [editBio, setEditBio] = useState(currentMentor.bio);
  const [editPrice, setEditPrice] = useState(currentMentor.priceINR);
  const [editTopics, setEditTopics] = useState(currentMentor.topics.join(', '));
  const [editLanguages, setEditLanguages] = useState(currentMentor.languages.join(', '));
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Rejection modal
  const [rejectingBookingId, setRejectingBookingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('Conflict with departmental lab schedule.');

  // File Upload State
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<string | null>(currentMentor.idCardUrl || null);

  // Filter bookings relevant to this mentor
  const mentorBookings = bookings.filter(b => b.mentorId === currentMentor.id || b.mentorName === currentMentor.name);
  const pendingRequests = mentorBookings.filter(b => b.status === 'pending');
  const confirmedSessions = mentorBookings.filter(b => b.status === 'confirmed');

  const filteredRequests = mentorBookings.filter(b => {
    if (requestFilter === 'pending') return b.status === 'pending';
    if (requestFilter === 'confirmed') return b.status === 'confirmed';
    if (requestFilter === 'completed') return b.status === 'completed';
    return true;
  });

  const totalEarnings = mentorBookings
    .filter(b => b.status === 'completed' || b.status === 'confirmed')
    .reduce((sum, b) => sum + b.priceINR, 14200);

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotDate.trim() || !newSlotTime.trim()) {
      showToast('Date and time window are required', 'warning');
      return;
    }
    addMentorSlot(currentMentor.id, newSlotDate, newSlotTime);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    const topicsArr = editTopics.split(',').map(t => t.trim()).filter(Boolean);
    const langsArr = editLanguages.split(',').map(l => l.trim()).filter(Boolean);

    updateMentorProfile(currentMentor.id, {
      bio: editBio,
      priceINR: Number(editPrice),
      topics: topicsArr.length > 0 ? topicsArr : currentMentor.topics,
      languages: langsArr.length > 0 ? langsArr : currentMentor.languages
    });

    setIsSavingProfile(false);
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Document size exceeds 10MB limit', 'warning');
      return;
    }

    setIsUploadingDoc(true);
    const res = await submitMentorCredentials(currentMentor.id, file);
    setIsUploadingDoc(false);

    if (res.success && res.url) {
      setUploadedPreview(res.url);
    }
  };

  const handleConfirmRejection = () => {
    if (!rejectingBookingId) return;
    rejectBooking(rejectingBookingId, rejectionReason);
    setRejectingBookingId(null);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header Card */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={currentMentor.avatar}
              alt={currentMentor.name}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-semibold">
                  {currentMentor.name}
                </h1>
                
                {/* Verification Status Pill */}
                {currentMentor.verificationStatus === 'approved' || currentMentor.verifiedCollegeAffiliation ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DDF587] text-emerald-950 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Affiliation</span>
                  </span>
                ) : currentMentor.verificationStatus === 'pending' ? (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Audit Pending</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800 flex items-center gap-1">
                    <span>Credentials Required</span>
                  </span>
                )}

                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DEE5FC] text-[#172F91]">
                  Mentor Portal
                </span>
              </div>
              <div className="text-xs text-[#64748B] mt-1 font-mono">
                {currentMentor.collegeName} • {currentMentor.branch} ({currentMentor.academicYear})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast(`UPI settlement of ₹${totalEarnings.toLocaleString()} processed to registered bank account.`, 'success')}
              className="py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black shadow-xs transition-all active:scale-98"
            >
              Request Payout (₹{totalEarnings.toLocaleString()})
            </button>
          </div>
        </div>

        {/* Demo Ecosystem Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-amber-950">Mentor Sandbox Mode:</strong> You are managing the mentor console for <strong>{currentMentor.name}</strong>. In production, credentials submitted are saved to Supabase Storage with strict row-level security and audited by administrators before session publishing.
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Total Earnings</div>
            <div className="font-serif text-2xl font-bold text-[#111827] mt-1">₹{totalEarnings.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">Direct UPI transfer enabled</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Pending Booking Requests</div>
            <div className="font-serif text-2xl font-bold text-amber-600 mt-1">{pendingRequests.length}</div>
            <div className="text-[10px] text-[#64748B] mt-1">Awaiting your confirmation</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Confirmed Sessions</div>
            <div className="font-serif text-2xl font-bold text-[#172F91] mt-1">{confirmedSessions.length}</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">Ready for 1-on-1 calls</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Student Rating</div>
            <div className="font-serif text-2xl font-bold text-amber-500 mt-1">{currentMentor.rating} ★</div>
            <div className="text-[10px] text-[#64748B] mt-1">From {currentMentor.reviewsCount} candidate reviews</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-300 text-xs font-semibold gap-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'requests' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Users className="w-4 h-4 text-[#172F91]" />
            <span>Session Requests ({mentorBookings.length})</span>
            {pendingRequests.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingRequests.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('slots')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'slots' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Calendar className="w-4 h-4 text-[#172F91]" />
            <span>Manage Availability ({currentMentor.availableSlots.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('credentials')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'credentials' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#172F91]" />
            <span>Student Verification Credentials</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'profile' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Edit3 className="w-4 h-4 text-[#172F91]" />
            <span>Edit Profile & Fees</span>
          </button>
        </div>

        {/* 1. SESSION REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            
            {/* Filter pills */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRequestFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  requestFilter === 'all' ? 'bg-[#111827] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                All Requests ({mentorBookings.length})
              </button>
              <button
                onClick={() => setRequestFilter('pending')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  requestFilter === 'pending' ? 'bg-[#111827] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                Pending Approval ({pendingRequests.length})
              </button>
              <button
                onClick={() => setRequestFilter('confirmed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  requestFilter === 'confirmed' ? 'bg-[#111827] text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                Confirmed ({confirmedSessions.length})
              </button>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white border border-slate-200/80 text-center text-xs text-[#64748B]">
                No session requests matching this filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRequests.map((b) => (
                  <div
                    key={b.id}
                    className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-base font-semibold text-[#111827]">
                          {b.studentName || 'Aspirant Candidate'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-900' :
                          b.status === 'pending' ? 'bg-amber-100 text-amber-900' :
                          b.status === 'rejected' ? 'bg-red-100 text-red-900' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="text-[#64748B]">
                        Focus: <strong className="text-[#111827]">{b.topic}</strong>
                      </div>

                      <div className="text-[11px] text-[#172F91] flex items-center gap-2 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{b.date} • {b.time}</span>
                        <span>• Fee: ₹{b.priceINR}</span>
                      </div>

                      {b.rejectionReason && (
                        <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded-xl mt-1">
                          Declined reason: "{b.rejectionReason}"
                        </div>
                      )}

                      {b.rating && (
                        <div className="text-[11px] text-amber-600 mt-1 flex items-center gap-1 font-semibold">
                          <span>Rating received: {'★'.repeat(b.rating)}</span>
                          {b.feedbackComment && <span className="text-[#64748B] italic">"{b.feedbackComment}"</span>}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      {b.status === 'pending' && (
                        <>
                          <button
                            onClick={() => acceptBooking(b.id)}
                            className="py-2 px-4 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-2xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Accept Request</span>
                          </button>
                          <button
                            onClick={() => setRejectingBookingId(b.id)}
                            className="py-2 px-3.5 rounded-xl text-xs font-semibold border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 transition-all flex items-center gap-1.5"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                        </>
                      )}

                      {b.status === 'confirmed' && (
                        <button
                          onClick={() => setActiveCallBooking(b)}
                          className="py-2 px-4 rounded-xl text-xs font-semibold bg-[#111827] text-white hover:bg-black transition-all flex items-center gap-1.5"
                        >
                          <Video className="w-3.5 h-3.5 text-[#DDF587]" />
                          <span>Enter Video Room</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Rejection Modal */}
            {rejectingBookingId && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4 text-xs">
                  <h3 className="font-serif text-lg font-semibold text-[#111827]">
                    Decline Mentorship Request
                  </h3>
                  <p className="text-[#64748B]">
                    Please provide a polite reason for the candidate. Their slot reservation will be cancelled and any authorization refunded.
                  </p>
                  <textarea
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none"
                    placeholder="e.g. Unforeseen academic clash with semester exams."
                  />
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setRejectingBookingId(null)}
                      className="py-2 px-4 rounded-xl text-xs text-[#64748B] hover:text-[#111827]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmRejection}
                      className="py-2 px-4 rounded-xl text-xs font-semibold bg-red-600 text-white hover:bg-red-700"
                    >
                      Confirm Decline
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. MANAGE SLOTS TAB */}
        {activeTab === 'slots' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Add Slot Form (1 col) */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#111827]">
                Publish New Slot
              </h3>
              <p className="text-xs text-[#64748B]">
                Specify time windows outside your lectures and practical lab hours.
              </p>

              <form onSubmit={handleAddSlot} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                    Day / Date
                  </label>
                  <input
                    type="text"
                    value={newSlotDate}
                    onChange={(e) => setNewSlotDate(e.target.value)}
                    placeholder="e.g. Friday, 6:00 PM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                    Time Window (30 Mins)
                  </label>
                  <input
                    type="text"
                    value={newSlotTime}
                    onChange={(e) => setNewSlotTime(e.target.value)}
                    placeholder="e.g. 06:00 PM - 06:30 PM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-semibold text-xs bg-[#111827] text-white hover:bg-black transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5 text-[#DDF587]" />
                  <span>Add Consultation Slot</span>
                </button>
              </form>
            </div>

            {/* Current Slots List (2 cols) */}
            <div className="lg:col-span-2 p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
              <h3 className="font-serif text-xl font-semibold text-[#111827]">
                Active Availability Windows
              </h3>

              {currentMentor.availableSlots.length === 0 ? (
                <div className="text-center py-10 text-xs text-[#64748B]">
                  No consultation slots configured yet. Use the form to publish your first slot.
                </div>
              ) : (
                <div className="space-y-2.5">
                  {currentMentor.availableSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[#172F91]" />
                        <div>
                          <div className="font-semibold text-[#111827]">{slot.date}</div>
                          <div className="text-[11px] text-[#64748B]">{slot.time}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase ${
                          slot.isBooked ? 'bg-[#FCD7B6] text-amber-950' : 'bg-[#DDF587] text-emerald-950'
                        }`}>
                          {slot.isBooked ? 'Booked' : 'Available'}
                        </span>

                        {!slot.isBooked && (
                          <button
                            onClick={() => deleteMentorSlot(currentMentor.id, slot.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                            title="Remove Slot"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}

        {/* 3. STUDENT VERIFICATION CREDENTIALS TAB (Supabase Storage) */}
        {activeTab === 'credentials' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Document Upload Box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-serif text-xl font-semibold text-[#111827]">
                  Submit Student Identity Document
                </h3>
                <span className="text-[10px] uppercase font-bold text-[#172F91]">
                  Supabase Private Storage
                </span>
              </div>

              <p className="text-[#64748B] leading-relaxed">
                To maintain authentic student guidance, mentors must upload their current college identity card or semester grade card. 
                Documents are stored in a restricted Supabase Storage bucket accessible exclusively to you and administrators.
              </p>

              {/* Status Alert */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                currentMentor.verificationStatus === 'approved' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
                currentMentor.verificationStatus === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-900' :
                'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                {currentMentor.verificationStatus === 'approved' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold">
                    {currentMentor.verificationStatus === 'approved' ? 'Affiliation Verified' :
                     currentMentor.verificationStatus === 'pending' ? 'Admin Audit in Progress' :
                     'Verification Document Required'}
                  </div>
                  <div className="text-[11px] mt-0.5">
                    {currentMentor.adminNotes || 'Your official student credentials establish credibility with engineering aspirants.'}
                  </div>
                </div>
              </div>

              {/* File Upload Control */}
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:border-[#172F91] transition-colors">
                <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <div className="font-semibold text-[#111827]">Upload Student Smart Card / Marksheet</div>
                <div className="text-[11px] text-[#64748B] mt-1">PNG, JPG, or PDF up to 10MB</div>

                <label className="mt-4 inline-block py-2 px-5 rounded-xl bg-[#111827] text-white font-semibold text-xs cursor-pointer hover:bg-black transition-all">
                  <span>{isUploadingDoc ? 'Uploading to Supabase...' : 'Select File'}</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleDocumentUpload}
                    disabled={isUploadingDoc}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Document Preview Box */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
              <h3 className="font-serif text-xl font-semibold text-[#111827] pb-3 border-b border-slate-100">
                Uploaded Credential Preview
              </h3>

              {uploadedPreview ? (
                <div className="space-y-3">
                  <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 p-2">
                    <img
                      src={uploadedPreview}
                      alt="Student ID Card Preview"
                      className="w-full h-56 object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                    <span>Institution: <strong className="text-[#111827]">{currentMentor.collegeName}</strong></span>
                    <span>Entrance: <strong className="text-[#172F91]">{currentMentor.entranceRank}</strong></span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-[#64748B]">
                  No document uploaded yet. Upload your card to request mentor badge verification.
                </div>
              )}
            </div>

          </div>
        )}

        {/* 4. PROFILE & PRICING TAB */}
        {activeTab === 'profile' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs max-w-3xl space-y-4 text-xs">
            <h3 className="font-serif text-xl font-semibold text-[#111827] pb-3 border-b border-slate-100">
              Edit Mentor Profile & Pricing
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                  Bio / Counselling Statement
                </label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                  Consultation Fee (INR per 30 mins)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="149"
                    max="999"
                    step="50"
                    value={editPrice}
                    onChange={(e) => setEditPrice(Number(e.target.value))}
                    className="w-36 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-[#111827]"
                  />
                  <span className="text-[#64748B] text-[11px]">Recommended student-friendly range: ₹200 – ₹400</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                  Counselling Topics (Comma separated)
                </label>
                <input
                  type="text"
                  value={editTopics}
                  onChange={(e) => setEditTopics(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                  Languages Spoken (Comma separated)
                </label>
                <input
                  type="text"
                  value={editLanguages}
                  onChange={(e) => setEditLanguages(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827]"
                />
              </div>

              <button
                type="submit"
                disabled={isSavingProfile}
                className="py-2.5 px-6 rounded-xl font-semibold text-xs bg-[#111827] text-white hover:bg-black transition-all flex items-center gap-2 shadow-2xs"
              >
                <Save className="w-3.5 h-3.5 text-[#DDF587]" />
                <span>Save Profile Preferences</span>
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
