import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CommunityThread } from '../../types';
import { 
  MessageSquare, Plus, ThumbsUp, ShieldCheck, Search, Filter, 
  Sparkles, User, CheckCircle2, ChevronRight, X, Send, Tag, 
  BookOpen, AlertCircle, Bookmark, Flag
} from 'lucide-react';

export const CommunityForumView: React.FC = () => {
  const { 
    threads, addThread, addReply, upvoteThread, 
    toggleBookmarkThread, bookmarkedThreadIds, reportItem, 
    currentUser, showToast 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  // New Question Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityThread['category']>('Branch vs College');
  const [newTags, setNewTags] = useState('JoSAA 2026, IIT vs BITS');

  // Report Modal State
  const [reportingItem, setReportingItem] = useState<{ itemType: 'thread' | 'reply'; itemId: string; title: string } | null>(null);
  const [reportReason, setReportReason] = useState('Commercial agent soliciting seats or unverified claims.');

  // Reply Input State
  const [replyText, setReplyText] = useState('');

  const CATEGORIES: { id: string; label: string }[] = [
    { id: 'All', label: 'All Discussions' },
    { id: 'Saved', label: '★ Bookmarked' },
    { id: 'JoSAA & CSAB', label: 'JoSAA & CSAB Choice-Filling' },
    { id: 'Branch vs College', label: 'Branch vs College Dilemmas' },
    { id: 'State Counselling', label: 'State CETs (MHT-CET, WBJEE, KCET)' },
    { id: 'Placement & Internships', label: 'Placements & Career ROI' },
    { id: 'Hostel & Life', label: 'Hostel, Mess & Campus Life' }
  ];

  const filteredThreads = threads.filter((t) => {
    if (selectedCategory === 'Saved') {
      if (!bookmarkedThreadIds.includes(t.id)) return false;
    } else if (selectedCategory !== 'All' && t.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesTitle = t.title.toLowerCase().includes(q);
      const matchesContent = t.content.toLowerCase().includes(q);
      const matchesTags = t.tags.some(tag => tag.toLowerCase().includes(q));
      if (!matchesTitle && !matchesContent && !matchesTags) return false;
    }
    return true;
  });

  const activeThread = threads.find(t => t.id === activeThreadId);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Please provide both question title and details', 'warning');
      return;
    }

    const tagsArray = newTags.split(',').map(tag => tag.trim()).filter(Boolean);
    addThread({
      title: newTitle,
      content: newContent,
      category: newCategory,
      tags: tagsArray.length > 0 ? tagsArray : ['Engineering 2026']
    });

    setNewTitle('');
    setNewContent('');
    setIsModalOpen(false);
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim() || !activeThreadId) return;

    addReply(activeThreadId, replyText);
    setReplyText('');
  };

  const handleConfirmReport = () => {
    if (!reportingItem) return;
    reportItem(reportingItem.itemType, reportingItem.itemId, reportingItem.title, reportReason);
    setReportingItem(null);
  };

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold mb-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>PEER STUDENT COMMUNITY & DISCUSSIONS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-[#111827]">
              Student Discussion Forum
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
              Ask doubts on choice filling, compare college options, and exchange real counselling experiences with fellow aspirants and verified enrolled mentors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2.5 px-5 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black flex items-center gap-2 shadow-xs transition-all active:scale-98"
            >
              <Plus className="w-4 h-4 text-[#DDF587]" />
              <span>Ask a Question</span>
            </button>
          </div>
        </div>

        {/* Demo Ecosystem Notice */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="font-semibold text-amber-950">Illustrative Community Discussions:</strong> Seeded discussions below are tagged with "Demo Discussion" for transparent evaluation. You can ask genuine questions, post replies as student or mentor personas, upvote, bookmark, and report suspicious posts to test the moderation lifecycle.
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, branch, or tag..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#172F91]/20 font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#111827] text-white shadow-2xs'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {filteredThreads.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-serif text-xl font-semibold text-[#111827]">
                No Discussions Found
              </h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {selectedCategory === 'Saved' 
                  ? 'You have not bookmarked any discussions yet. Click the bookmark icon on any discussion card to save it.'
                  : 'Be the first to post a question in this category and get guidance from verified college students.'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-[#111827] text-white text-xs font-semibold"
              >
                Start a Discussion
              </button>
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isSelected = activeThreadId === thread.id;
              const isBookmarked = bookmarkedThreadIds.includes(thread.id);

              return (
                <div
                  key={thread.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#DEE5FC] text-[#172F91]">
                          {thread.category}
                        </span>

                        {thread.isDemo !== false && (
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold">
                            Demo Discussion
                          </span>
                        )}

                        <span className="text-slate-400">•</span>
                        <span className="font-semibold text-slate-800">{thread.authorName}</span>
                        {thread.authorBadge && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono">
                            {thread.authorBadge}
                          </span>
                        )}
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-400 text-[11px]">{thread.createdAt}</span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#111827] leading-snug">
                        {thread.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {thread.content}
                      </p>
                    </div>

                    {/* Actions: Bookmark, Upvote, Report */}
                    <div className="shrink-0 flex items-center gap-2 self-start sm:self-auto">
                      <button
                        onClick={() => toggleBookmarkThread(thread.id)}
                        className={`p-2 rounded-xl border text-xs transition-colors ${
                          isBookmarked 
                            ? 'bg-[#DEE5FC] border-[#172F91] text-[#172F91]' 
                            : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700'
                        }`}
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark discussion'}
                      >
                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#172F91]' : ''}`} />
                      </button>

                      <button
                        onClick={() => upvoteThread(thread.id)}
                        className="px-3.5 py-2 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5 text-[#172F91]" />
                        <span>{thread.upvotes}</span>
                      </button>

                      <button
                        onClick={() => setReportingItem({ itemType: 'thread', itemId: thread.id, title: thread.title })}
                        className="p-2 rounded-xl bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 border border-slate-200 transition-colors"
                        title="Flag for administrator moderation"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100">
                    {thread.tags.map((tag) => (
                      <span key={tag} className="text-[11px] px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-600 font-medium flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5 text-slate-400" />
                        <span>{tag}</span>
                      </span>
                    ))}

                    <div className="ml-auto">
                      <button
                        onClick={() => setActiveThreadId(isSelected ? null : thread.id)}
                        className="text-xs font-bold text-[#172F91] hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{thread.repliesCount} {thread.repliesCount === 1 ? 'Reply' : 'Replies'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Expanded Replies Section */}
                  {isSelected && (
                    <div className="pt-4 border-t border-slate-200 space-y-4">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Peer Responses & Mentor Insights ({thread.replies.length})
                      </div>

                      <div className="space-y-3">
                        {thread.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                              reply.isVerifiedMentor
                                ? 'bg-blue-50/60 border-blue-200'
                                : 'bg-slate-50 border-slate-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-slate-900">{reply.authorName}</span>
                                {reply.isVerifiedMentor && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#DDF587] text-emerald-950 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3 text-emerald-800" />
                                    <span>Verified Mentor ({reply.authorCollege || 'Campus'})</span>
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-400">{reply.createdAt}</span>
                            </div>

                            <p className="text-slate-700 leading-relaxed font-sans">
                              {reply.content}
                            </p>

                            <div className="flex items-center justify-between pt-1">
                              <span className="text-[10px] text-slate-400 font-medium">
                                ↑ {reply.upvotes} found this helpful
                              </span>

                              <button
                                onClick={() => setReportingItem({ itemType: 'reply', itemId: reply.id, title: `Reply on: ${thread.title}` })}
                                className="text-[10px] text-slate-400 hover:text-red-600 flex items-center gap-1"
                                title="Report response"
                              >
                                <Flag className="w-2.5 h-2.5" />
                                <span>Report</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reply Input Form */}
                      <form onSubmit={handlePostReply} className="pt-2 flex items-center gap-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a constructive answer or share your counselling perspective..."
                          className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#172F91]/20 font-medium text-[#111827]"
                        />
                        <button
                          type="submit"
                          disabled={!replyText.trim()}
                          className="px-5 py-2.5 rounded-2xl bg-[#111827] text-white hover:bg-black text-xs font-semibold flex items-center gap-1.5 transition-all disabled:opacity-50"
                        >
                          <Send className="w-3.5 h-3.5 text-[#DDF587]" />
                          <span>Post Reply</span>
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* MODAL: ASK NEW QUESTION */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-serif text-xl font-semibold text-[#111827]">
                  Ask the Student Community
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreatePost} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                    Counselling Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                  >
                    <option value="Branch vs College">Branch vs College Dilemmas</option>
                    <option value="JoSAA & CSAB">JoSAA & CSAB Choice-Filling</option>
                    <option value="State Counselling">State CETs (MHT-CET, WBJEE, KCET, UPTAC)</option>
                    <option value="Placement & Internships">Placements & Career Opportunities</option>
                    <option value="Hostel & Life">Hostel, Mess & Student Life</option>
                    <option value="General Doubts">General Admission Doubts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                    Question Headline
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. NIT Trichy ECE vs IIT Jammu CSE for tech placements?"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                    Context & Details
                  </label>
                  <textarea
                    rows={4}
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Provide your exam rank, home state, interest in core vs coding, and financial considerations..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    placeholder="e.g. JoSAA 2026, NIT Trichy, CSE"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827] focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="py-2.5 px-4 rounded-xl text-xs text-[#64748B] hover:text-[#111827]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2.5 px-6 rounded-xl font-semibold bg-[#111827] text-white hover:bg-black transition-all shadow-2xs"
                  >
                    Publish Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: REPORT ITEM */}
        {reportingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-xl space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-serif text-lg font-semibold text-[#111827]">
                  Report Inappropriate Content
                </h3>
                <button
                  onClick={() => setReportingItem(null)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[#64748B]">
                Flagging: <strong className="text-[#111827]">{reportingItem.title}</strong>
              </p>

              <div>
                <label className="block text-[10px] uppercase font-bold text-[#64748B] mb-1">
                  Reason for Reporting
                </label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#111827]"
                >
                  <option value="Commercial agent soliciting seats or unverified claims.">Commercial agent / Management quota solicitation</option>
                  <option value="False cutoff information or fake allotment claims.">False cutoff claims or fabricated allotment stats</option>
                  <option value="Harassment, abusive language or defamation.">Harassment or abusive language</option>
                  <option value="Spam or off-topic advertising.">Spam / Duplicate / Self-promotion</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportingItem(null)}
                  className="py-2 px-4 rounded-xl text-xs text-[#64748B]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReport}
                  className="py-2 px-4 rounded-xl font-semibold bg-red-600 text-white hover:bg-red-700"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
