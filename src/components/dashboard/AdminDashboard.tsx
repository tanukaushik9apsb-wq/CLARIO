import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminDataManagement } from '../admin/AdminDataManagement';
import { 
  Shield, CheckCircle2, XCircle, Users, Bell, 
  FileText, Plus, AlertTriangle, TrendingUp, Search, Eye, 
  AlertCircle, Check, X, ShieldAlert, Flag, ExternalLink, Trash2, Database,
  History, Globe, Layers, Upload
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { 
    colleges,
    pendingMentors, verifyMentor, 
    updates, addCounsellingUpdate, updateCounsellingUpdate, deleteCounsellingUpdate,
    authorities, auditLogs,
    reviews, moderationReports, resolveModerationReport,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'data-management' | 'verification' | 'moderation' | 'updates' | 'reviews'>('data-management');

  // Inspection Modal for Mentor Credentials
  const [inspectingMentor, setInspectingMentor] = useState<any | null>(null);
  const [adminNote, setAdminNote] = useState('Identity verified with official student smart ID and dean signature.');

  // Form for publishing new official notice
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeAuthority, setNewNoticeAuthority] = useState<'JoSAA' | 'CSAB' | 'JAC Delhi' | 'NEET UG' | 'State CET Cell' | 'UPTAC' | 'KEA KCET'>('JoSAA');
  const [newNoticeImportance, setNewNoticeImportance] = useState<'Critical' | 'Important' | 'Informational'>('Critical');
  const [newNoticeSummary, setNewNoticeSummary] = useState('');
  const [newNoticeUrl, setNewNoticeUrl] = useState('https://josaa.nic.in');
  const [isDemoNotice, setIsDemoNotice] = useState(false);

  const pendingModerations = moderationReports.filter(r => r.status === 'pending');

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim() || !newNoticeSummary.trim()) {
      showToast('Title and summary are mandatory', 'warning');
      return;
    }

    addCounsellingUpdate({
      authority: newNoticeAuthority as any,
      title: newNoticeTitle,
      category: 'Schedule',
      publishDate: 'Just now • Verified',
      lastVerified: 'Just now',
      importance: newNoticeImportance,
      officialSourceUrl: newNoticeUrl,
      verified: !isDemoNotice,
      isIllustrativeDemo: isDemoNotice,
      summary: newNoticeSummary
    });

    setNewNoticeTitle('');
    setNewNoticeSummary('');
  };

  const handleApproveMentor = (mentorId: string) => {
    verifyMentor(mentorId, true, adminNote);
    setInspectingMentor(null);
  };

  const handleRejectMentor = (mentorId: string) => {
    verifyMentor(mentorId, false, adminNote || 'ID document unreadable or expired.');
    setInspectingMentor(null);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#DDF587] text-emerald-950 flex items-center justify-center shrink-0">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl text-[#111827] font-semibold">
                  Clario Governance & Audit Console
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#111827] text-white">
                  Superadmin Role
                </span>
              </div>
              <div className="text-xs text-[#64748B] mt-1 font-mono">
                System Status: Operational • Supabase Realtime Enabled • Audit Trail Active
              </div>
            </div>
          </div>
        </div>

        {/* Global Platform Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Colleges Indexed</div>
            <div className="font-serif text-2xl font-bold text-[#111827] mt-1">{colleges.length}</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">Live in Supabase DB</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Authorities Registered</div>
            <div className="font-serif text-2xl font-bold text-[#172F91] mt-1">{authorities.length}</div>
            <div className="text-[10px] text-slate-500 font-medium mt-1">JoSAA, CSAB, CET Cells</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Audit Trail Events</div>
            <div className="font-serif text-2xl font-bold text-slate-800 mt-1">{auditLogs.length}</div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-1">Immutable Admin Log</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Pending Mentor Audits</div>
            <div className="font-serif text-2xl font-bold text-amber-600 mt-1">{pendingMentors.length}</div>
            <div className="text-[10px] text-amber-700 font-medium mt-1">Awaiting ID Card Review</div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
            <div className="text-[10px] text-[#64748B] uppercase font-bold">Flagged Moderation</div>
            <div className="font-serif text-2xl font-bold text-red-600 mt-1">{pendingModerations.length}</div>
            <div className="text-[10px] text-[#64748B] mt-1">Community posts & reviews</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 text-xs font-semibold gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('data-management')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'data-management' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Database className="w-4 h-4 text-[#172F91]" />
            <span>Data Management Module</span>
          </button>

          <button
            onClick={() => setActiveTab('updates')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'updates' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Bell className="w-4 h-4 text-[#172F91]" />
            <span>Advisory Notices & Gazettes ({updates.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'verification' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Users className="w-4 h-4 text-[#172F91]" />
            <span>Mentor Verification Queue ({pendingMentors.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('moderation')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'moderation' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Flag className="w-4 h-4 text-[#172F91]" />
            <span>Moderation Queue ({pendingModerations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-5 border-b-2 flex items-center gap-2 transition-colors shrink-0 ${
              activeTab === 'reviews' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <FileText className="w-4 h-4 text-[#172F91]" />
            <span>All Reviews ({reviews.length})</span>
          </button>
        </div>

        {/* 0. DEDICATED DATA MANAGEMENT MODULE */}
        {activeTab === 'data-management' && (
          <AdminDataManagement />
        )}

        {/* 1. MENTOR VERIFICATION TAB */}
        {activeTab === 'verification' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-serif text-xl text-[#111827] font-semibold">
                  Pending Mentor Identity & Campus Affiliation Queue
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Inspect candidate student ID cards and grade sheets uploaded to Supabase Storage before issuing the Verified Campus badge.
                </p>
              </div>
            </div>

            {pendingMentors.length === 0 ? (
              <div className="text-center py-12 text-xs text-[#64748B]">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                All submitted mentor profiles have been verified. Zero pending backlog!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingMentors.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={m.avatar}
                        alt={m.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-lg text-[#111827] font-semibold">{m.name}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-900">
                            Audit Pending
                          </span>
                        </div>
                        <div className="text-xs text-[#172F91] font-semibold">
                          {m.collegeName} • {m.branch} ({m.academicYear})
                        </div>
                        <div className="text-[11px] text-[#64748B]">
                          Entrance Claim: <strong>{m.examName} ({m.entranceRank})</strong>
                        </div>
                        <p className="text-[11px] text-[#475569] italic">"{m.bio}"</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                      <button
                        onClick={() => {
                          setInspectingMentor(m);
                          setAdminNote('Verified with Official Student Smart ID Card.');
                        }}
                        className="py-2 px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#111827] font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#172F91]" />
                        <span>Inspect ID Card</span>
                      </button>

                      <button
                        onClick={() => verifyMentor(m.id, false, 'Credentials incomplete or not matching institutional enrollment roster.')}
                        className="py-2 px-3 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-semibold"
                      >
                        Reject
                      </button>

                      <button
                        onClick={() => verifyMentor(m.id, true, 'Verified via student smart ID & JoSAA record.')}
                        className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Badge</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Document Inspection Modal */}
            {inspectingMentor && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
                <div className="bg-white rounded-3xl p-6 max-w-xl w-full border border-slate-200 shadow-xl space-y-4 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-[#111827]">
                        Audit Student Credentials: {inspectingMentor.name}
                      </h3>
                      <p className="text-[11px] text-[#64748B]">
                        {inspectingMentor.collegeName} • {inspectingMentor.branch}
                      </p>
                    </div>
                    <button
                      onClick={() => setInspectingMentor(null)}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* ID Image Preview */}
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                    <img
                      src={inspectingMentor.idCardUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80'}
                      alt="Student ID Card"
                      className="w-full h-64 object-cover rounded-xl border border-slate-200"
                    />
                    <div className="text-[10px] text-[#64748B] mt-2 font-mono">
                      File Path: Supabase Storage / mentor-verification-docs / {inspectingMentor.id}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                      Audit Notes / Decision Rationale
                    </label>
                    <input
                      type="text"
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => handleRejectMentor(inspectingMentor.id)}
                      className="py-2 px-4 rounded-xl border border-red-200 text-red-700 bg-red-50 hover:bg-red-100 font-semibold"
                    >
                      Decline Verification
                    </button>
                    <button
                      onClick={() => handleApproveMentor(inspectingMentor.id)}
                      className="py-2 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Approve & Publish to Marketplace</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. MODERATION QUEUE TAB */}
        {activeTab === 'moderation' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-serif text-xl text-[#111827] font-semibold">
                  Community Discussions & Review Moderation Queue
                </h3>
                <p className="text-[#64748B] mt-0.5">
                  Review reported discussions, suspicious review claims, or prohibited agent seat-selling solicitations.
                </p>
              </div>
            </div>

            {pendingModerations.length === 0 ? (
              <div className="text-center py-12 text-[#64748B]">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
                Moderation inbox clear. No pending flagged posts or reports!
              </div>
            ) : (
              <div className="space-y-3">
                {pendingModerations.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-red-100 text-red-900">
                          {rep.itemType} Report
                        </span>
                        <span className="font-semibold text-sm text-[#111827]">{rep.itemTitle}</span>
                      </div>
                      <div className="text-red-700 font-medium">
                        Reason: "{rep.reason}"
                      </div>
                      <div className="text-[11px] text-[#64748B]">
                        Reported by: <strong>{rep.reportedBy}</strong> • {rep.reportedAt}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => resolveModerationReport(rep.id, 'dismiss', 'Dismissed as benign by administrator.')}
                        className="py-2 px-3.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 font-semibold text-[#64748B]"
                      >
                        Dismiss Flag
                      </button>
                      <button
                        onClick={() => resolveModerationReport(rep.id, 'remove', 'Violates Clario community standards.')}
                        className="py-2 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove Item</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. BROADCAST OFFICIAL NOTICE TAB */}
        {activeTab === 'updates' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-xl text-[#111827] font-semibold">
                Broadcast Verified Counselling Update
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Official notices published here appear immediately in student dashboard tickers and counselling notification feeds.
              </p>
            </div>

            <form onSubmit={handlePublishNotice} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                    Authority
                  </label>
                  <select
                    value={newNoticeAuthority}
                    onChange={(e) => setNewNoticeAuthority(e.target.value as any)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                  >
                    <option value="JoSAA">JoSAA</option>
                    <option value="CSAB">CSAB</option>
                    <option value="JAC Delhi">JAC Delhi</option>
                    <option value="State CET Cell">State CET Cell (MHT-CET)</option>
                    <option value="UPTAC">UPTAC</option>
                    <option value="KEA KCET">KEA KCET</option>
                    <option value="NEET UG">NEET UG</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                    Urgency Tier
                  </label>
                  <select
                    value={newNoticeImportance}
                    onChange={(e) => setNewNoticeImportance(e.target.value as any)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                  >
                    <option value="Critical">Critical (Red Flag)</option>
                    <option value="Important">Important (Orange Flag)</option>
                    <option value="Informational">Informational (Blue Flag)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                    Official Source URL
                  </label>
                  <input
                    type="url"
                    value={newNoticeUrl}
                    onChange={(e) => setNewNoticeUrl(e.target.value)}
                    className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                  Notice Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. JoSAA Round 2 Seat Allocation Published - Verification Active"
                  value={newNoticeTitle}
                  onChange={(e) => setNewNoticeTitle(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-[#64748B] mb-1 font-semibold uppercase text-[10px]">
                  Official Summary & Directives for Aspirants
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail step-by-step reporting instructions, fees, and cutoff deadlines..."
                  value={newNoticeSummary}
                  onChange={(e) => setNewNoticeSummary(e.target.value)}
                  className="w-full bg-[#F8F9FA] border border-slate-300 rounded-xl p-3 text-xs text-[#111827] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="demoNoticeCheck"
                  checked={isDemoNotice}
                  onChange={(e) => setIsDemoNotice(e.target.checked)}
                  className="accent-[#172F91]"
                />
                <label htmlFor="demoNoticeCheck" className="text-xs text-[#64748B] cursor-pointer">
                  Tag as <em>Illustrative Demo Notice</em> (transparent evaluation mode)
                </label>
              </div>

              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-[#111827] hover:bg-black text-white font-semibold uppercase tracking-wider text-xs flex items-center gap-2 shadow-xs transition-all"
              >
                <Plus className="w-4 h-4 text-[#DDF587]" />
                <span>Publish Notice to Portal</span>
              </button>
            </form>

            {/* List of Published Notices */}
            <div className="pt-6 border-t border-slate-200 space-y-3">
              <h4 className="font-serif text-lg font-bold text-[#111827]">
                Active Published Notices ({updates.length})
              </h4>

              <div className="space-y-3">
                {updates.map((upd) => (
                  <div key={upd.id} className="p-4 rounded-2xl bg-[#F8F9FA] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DEE5FC] text-[#172F91]">
                          {upd.authority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          upd.importance === 'Critical' ? 'bg-red-100 text-red-800' : upd.importance === 'Important' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {upd.importance}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          upd.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {upd.verified ? '✓ Official Verified' : '✦ Demo Notice'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {upd.publishDate}
                        </span>
                      </div>

                      <div className="font-serif text-base font-bold text-[#111827]">
                        {upd.title}
                      </div>

                      <p className="text-slate-600 text-xs line-clamp-2 max-w-3xl">
                        {upd.summary}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={upd.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-1.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1"
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <button
                        onClick={() => updateCounsellingUpdate(upd.id, { verified: !upd.verified, isIllustrativeDemo: upd.verified })}
                        className="py-1.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                      >
                        {upd.verified ? 'Mark Demo' : 'Mark Verified'}
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm('Delete this notice?')) {
                            deleteCounsellingUpdate(upd.id);
                          }
                        }}
                        className="p-2 rounded-xl border border-red-200 hover:bg-red-50 text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. REVIEWS ARCHIVE TAB */}
        {activeTab === 'reviews' && (
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 text-xs">
            <h3 className="font-serif text-xl text-[#111827] font-semibold pb-3 border-b border-slate-100">
              Campus Review Repository ({reviews.length})
            </h3>
            <div className="space-y-3">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#111827]">{r.collegeName}</span>
                    <span className="text-amber-500 font-bold">{((r.ratings.teaching + r.ratings.placements + r.ratings.campus) / 3).toFixed(1)} ★</span>
                  </div>
                  <div className="text-[11px] text-[#64748B]">{r.studentName} ({r.branch}, {r.graduationYear})</div>
                  <p className="text-[#475569]">{r.pros}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
