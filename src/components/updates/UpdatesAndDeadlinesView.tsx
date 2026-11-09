import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, Calendar as CalendarIcon, Clock, ShieldCheck, 
  ExternalLink, CheckCircle2, AlertTriangle, Filter, Settings, 
  CheckSquare, Square, ChevronLeft, ChevronRight, Bookmark, Sparkles, MapPin
} from 'lucide-react';

export const UpdatesAndDeadlinesView: React.FC = () => {
  const { 
    updates, savedUpdateIds, toggleSaveUpdateReminder, 
    checklistTasks, toggleChecklistTask, deadlines, showToast 
  } = useApp();

  const [selectedAuthority, setSelectedAuthority] = useState<string>('All');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  const [bookmarkFilterOnly, setBookmarkFilterOnly] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(18);
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);

  // Notification Preferences State
  const [channelInApp, setChannelInApp] = useState(true);
  const [channelEmail, setChannelEmail] = useState(false);

  // October 2026 Calendar Grid (Starts on Thursday Oct 1)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 4; // Thursday offset

  const getDeadlinesForDay = (day: number) => {
    const dayStr = `2026-10-${day < 10 ? '0' + day : day}`;
    return deadlines.filter(d => d.date === dayStr);
  };

  const selectedDayDeadlines = selectedDay ? getDeadlinesForDay(selectedDay) : [];

  const filteredUpdates = updates.filter((u) => {
    if (bookmarkFilterOnly && !savedUpdateIds.includes(u.id)) {
      return false;
    }
    if (selectedAuthority !== 'All' && !u.authority.includes(selectedAuthority)) {
      return false;
    }
    if (selectedImportance !== 'All' && u.importance !== selectedImportance) {
      return false;
    }
    return true;
  });

  const completedCount = checklistTasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / checklistTasks.length) * 100);

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-5 border-b border-slate-300">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#172F91] font-bold mb-1.5">
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Consolidated Admission Intelligence</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-[#111827]">
              Updates & Deadlines
            </h1>
            <p className="text-xs sm:text-sm text-[#475569] mt-1 max-w-2xl leading-relaxed">
              Official gazette announcements on the left and an interactive compact calendar with marked admission cutoffs on the right.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreferencesModalOpen(true)}
              className="py-2.5 px-4 rounded-2xl text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-[#1E293B] flex items-center gap-2 shadow-xs transition-all"
            >
              <Settings className="w-4 h-4 text-[#172F91]" />
              <span>Notification Settings</span>
            </button>
          </div>
        </div>

        {/* 2-Column Main Layout: Updates on Left, Reduced Calendar on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: UPDATES & NOTIFICATIONS FEED (7 Cols)           */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Filter Bar */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-[#172F91]" />
                  <span className="font-serif text-lg font-semibold text-[#111827]">
                    Official Circulars & Dispatches
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setBookmarkFilterOnly(!bookmarkFilterOnly)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      bookmarkFilterOnly
                        ? 'bg-[#172F91] text-white border-[#172F91]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Saved ({savedUpdateIds.length})</span>
                  </button>

                  <select
                    value={selectedAuthority}
                    onChange={(e) => setSelectedAuthority(e.target.value)}
                    className="bg-[#F8F9FA] border border-slate-300 rounded-xl px-3 py-1.5 text-xs text-[#111827] focus:outline-none"
                  >
                    <option value="All">All Authorities</option>
                    <option value="JoSAA">JoSAA 2026</option>
                    <option value="CSAB">CSAB Special</option>
                    <option value="JAC Delhi">JAC Delhi</option>
                    <option value="State CET Cell">MHT-CET (Maharashtra)</option>
                    <option value="KEA">KEA KCET (Karnataka)</option>
                    <option value="UPTAC">UPTAC (Uttar Pradesh)</option>
                    <option value="WBJEE">WBJEEB (West Bengal)</option>
                  </select>

                  <select
                    value={selectedImportance}
                    onChange={(e) => setSelectedImportance(e.target.value)}
                    className="bg-[#F8F9FA] border border-slate-300 rounded-xl px-2.5 py-1.5 text-xs text-[#111827] focus:outline-none"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Critical">Critical</option>
                    <option value="Important">Important</option>
                    <option value="Informational">Informational</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Updates Cards Stream */}
            <div className="space-y-4">
              {filteredUpdates.map((update) => {
                const isSaved = savedUpdateIds.includes(update.id);
                return (
                  <div
                    key={update.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all shadow-xs"
                  >
                    {/* Badge Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#172F91] text-white">
                          {update.authority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          update.importance === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {update.importance}
                        </span>

                        {update.isIllustrativeDemo ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-900 border border-purple-200 flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-purple-700" />
                            <span>Illustrative Demonstration</span>
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-950 border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                            <span>Official Gazette Verified</span>
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] text-slate-500 font-mono">
                        {update.publishDate}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif text-xl font-semibold text-[#111827] leading-snug mb-2">
                      {update.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                      {update.summary}
                    </p>

                    {/* Actions */}
                    <div className="pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <a
                        href={update.officialSourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#172F91] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>View Gazette Circular on {update.authority}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => toggleSaveUpdateReminder(update.id)}
                        className={`py-1.5 px-4 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all ${
                          isSaved
                            ? 'bg-[#27866B] text-white'
                            : 'bg-[#F8F9FA] border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Bell className="w-3.5 h-3.5" />
                        <span>{isSaved ? 'Reminder Set' : 'Save Reminder'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actionable Checklist (Under Updates on Left) */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-200/80">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#111827]">
                    Counselling Action Tasks ({completedCount}/{checklistTasks.length})
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click items as you prepare documents & submit fees.
                  </p>
                </div>
                <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#172F91] rounded-full" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="space-y-2.5">
                {checklistTasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => toggleChecklistTask(task.id)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                      task.completed 
                        ? 'bg-slate-50 border-slate-200 text-slate-400' 
                        : 'bg-[#F8F9FA] border-slate-200/80 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {task.completed ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className={`text-xs font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {task.title}
                        </div>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                          <span>{task.authority} • {task.category}</span>
                          <span className="font-semibold text-amber-700">{task.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: REDUCED-SIZE COMPACT CALENDAR (5 Cols)        */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Reduced Compact Calendar Bento Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-slate-200/80">
              
              {/* Calendar Month Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#172F91]" />
                  <h3 className="font-serif text-lg font-semibold text-[#111827]">
                    October 2026
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold uppercase">
                  <span>Marked Dates</span>
                </div>
              </div>

              {/* Compact Weekdays */}
              <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Compact Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 text-xs">
                {/* Thursday offset */}
                {Array.from({ length: startDayOffset }).map((_, i) => (
                  <div key={`offset-${i}`} className="h-10 rounded-xl bg-slate-50"></div>
                ))}

                {daysInMonth.map((day) => {
                  const dayDeadlines = getDeadlinesForDay(day);
                  const hasMarkedDates = dayDeadlines.length > 0;
                  const isToday = day === 14;
                  const isSelected = selectedDay === day;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={`h-10 sm:h-11 rounded-xl p-1 flex flex-col items-center justify-between transition-all relative ${
                        isSelected
                          ? 'bg-[#172F91] text-white shadow-xs font-bold ring-2 ring-[#172F91]/20'
                          : isToday
                          ? 'bg-blue-50 text-[#172F91] font-bold border border-blue-200'
                          : hasMarkedDates
                          ? 'bg-[#DEE5FC] text-[#172F91] font-bold hover:bg-indigo-100'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-[11px] leading-none">{day}</span>

                      {/* Small Indicator Badge / Dot */}
                      {hasMarkedDates && (
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? 'bg-[#DDF587]' : 'bg-red-500'
                        }`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Selected Day Details Box */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-2">
                  <span>Selected Date: <strong>Oct {selectedDay}, 2026</strong></span>
                  <span className="text-[10px] text-slate-500">
                    {selectedDayDeadlines.length} Event{selectedDayDeadlines.length !== 1 ? 's' : ''}
                  </span>
                </div>

                {selectedDayDeadlines.length > 0 ? (
                  <div className="space-y-2">
                    {selectedDayDeadlines.map((dl) => (
                      <div
                        key={dl.id}
                        className={`p-3 rounded-2xl border text-xs ${
                          dl.priority === 'High'
                            ? 'bg-red-50 border-red-200 text-red-900'
                            : 'bg-[#DEE5FC] border-indigo-200 text-[#172F91]'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold">
                          <span>{dl.authority}</span>
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/70">
                            {dl.type}
                          </span>
                        </div>
                        <div className="font-semibold mt-1">{dl.title}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 text-center">
                    No critical cutoffs scheduled for this date.
                  </div>
                )}
              </div>

              {/* All Important Marked Dates List for Fast Reference */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                  All Marked Key Dates
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 text-[11px]">
                  {deadlines.map((dl) => (
                    <button
                      key={dl.id}
                      type="button"
                      onClick={() => setSelectedDay(parseInt(dl.date.split('-')[2]))}
                      className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="font-bold text-[#172F91]">{dl.date.slice(5)}: </span>
                        <span className="text-slate-800 font-medium">{dl.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">{dl.authority}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Next Milestone Peach Bento Card (Under Calendar on Right) */}
            <div className="bg-[#FCD7B6] rounded-3xl p-6 shadow-xs border border-orange-200/60 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-950">
                    Highest Priority Deadline
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#111827] leading-tight mt-1">
                  JoSAA Choice Locking
                </h3>
                <p className="text-xs text-orange-950 mt-1">
                  Strict locking at <strong>5:00 PM IST on Oct 18</strong>. Unlocked choices automatically lock.
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-orange-300/60 flex items-center justify-between text-xs">
                <span className="font-bold text-orange-950">4 Days Left</span>
                <a
                  href="https://josaa.nic.in"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#111827] underline flex items-center gap-1"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Notification Settings Modal */}
        {preferencesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 shadow-2xl text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-serif text-xl font-semibold text-[#111827]">
                  Alert & Reminder Settings
                </h3>
                <button onClick={() => setPreferencesModalOpen(false)} className="text-slate-400 hover:text-slate-800">
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <span className="font-medium text-slate-800">In-App Dashboard Alerts</span>
                  <input
                    type="checkbox"
                    checked={channelInApp}
                    onChange={(e) => setChannelInApp(e.target.checked)}
                    className="accent-[#172F91] w-4 h-4"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <div>
                    <span className="font-medium text-slate-800">Email Summaries</span>
                    <span className="text-[10px] text-slate-500 block">Sent 24 hours prior to deadline</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={channelEmail}
                    onChange={(e) => setChannelEmail(e.target.checked)}
                    className="accent-[#172F91] w-4 h-4"
                  />
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setPreferencesModalOpen(false)}
                  className="py-2 px-4 rounded-xl border border-slate-300 text-slate-700"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setPreferencesModalOpen(false);
                    showToast('Notification preferences saved!', 'success');
                  }}
                  className="py-2 px-5 rounded-xl bg-[#111827] text-white font-semibold"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
