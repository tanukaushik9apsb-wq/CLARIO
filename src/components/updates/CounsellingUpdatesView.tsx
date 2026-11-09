import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, Bookmark, ShieldCheck, ExternalLink, Calendar, 
  Clock, AlertTriangle, CheckCircle2, Settings, Filter
} from 'lucide-react';

export const CounsellingUpdatesView: React.FC = () => {
  const { updates, savedUpdateIds, toggleSaveUpdateReminder, showToast } = useApp();

  const [selectedAuthority, setSelectedAuthority] = useState<string>('All');
  const [selectedImportance, setSelectedImportance] = useState<string>('All');
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);

  // Notification Preferences State
  const [channelInApp, setChannelInApp] = useState(true);
  const [channelEmail, setChannelEmail] = useState(false);
  const [channelWhatsApp, setChannelWhatsApp] = useState(false);
  const [timing24h, setTiming24h] = useState(true);
  const [timing2h, setTiming2h] = useState(true);

  const filteredUpdates = updates.filter((u) => {
    if (selectedAuthority !== 'All' && u.authority !== selectedAuthority) {
      return false;
    }
    if (selectedImportance !== 'All' && u.importance !== selectedImportance) {
      return false;
    }
    return true;
  });

  const savePreferences = () => {
    setPreferencesModalOpen(false);
    showToast('Notification preferences updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#101A3A] text-[#F8F8FC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#FFF2D8]/15">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8CB7FF] font-semibold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#27866B]" />
              <span>Direct Authority Dispatches</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#FFF2D8]">
              Counselling Updates & Alerts
            </h1>
            <p className="text-xs sm:text-sm text-[#A8B3D4] mt-2 max-w-2xl leading-relaxed">
              Real-time, audited announcements from JoSAA, CSAB, JAC Delhi, NEET UG, and State Admission Directorates. 
              Never miss a mandatory registration cutoff or mock allocation release.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPreferencesModalOpen(true)}
              className="py-2.5 px-4 rounded-xl text-xs font-medium border border-[#FFF2D8]/20 bg-[#142147] hover:bg-[#172F91]/50 text-[#FFF2D8] flex items-center gap-2 transition-all"
            >
              <Settings className="w-4 h-4 text-[#8CB7FF]" />
              <span>Notification Settings</span>
            </button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-[#142147] border border-[#FFF2D8]/15 mb-8 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-[#A8B3D4]">
              <Filter className="w-3.5 h-3.5" />
              <span>Authority:</span>
            </div>
            {['All', 'JoSAA', 'CSAB', 'JAC Delhi', 'NEET UG', 'KEA KCET'].map((auth) => (
              <button
                key={auth}
                onClick={() => setSelectedAuthority(auth)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedAuthority === auth
                    ? 'bg-[#FFF2D8] text-[#101A3A]'
                    : 'bg-[#101A3A] text-[#A8B3D4] hover:text-[#FFF2D8]'
                }`}
              >
                {auth}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#A8B3D4]">Priority:</span>
            <select
              value={selectedImportance}
              onChange={(e) => setSelectedImportance(e.target.value)}
              className="bg-[#101A3A] border border-[#FFF2D8]/20 rounded-lg px-2.5 py-1.5 text-xs text-[#FFF2D8] focus:outline-none"
            >
              <option value="All">All Priorities</option>
              <option value="Critical">Critical Only</option>
              <option value="Important">Important</option>
              <option value="Informational">Informational</option>
            </select>
          </div>
        </div>

        {/* Updates Feed */}
        <div className="space-y-4">
          {filteredUpdates.map((update) => {
            const isReminderSet = savedUpdateIds.includes(update.id);

            return (
              <div
                key={update.id}
                className="p-6 rounded-2xl bg-[#142147] border border-[#FFF2D8]/15 hover:border-[#FFF2D8]/40 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#172F91] text-[#FFF2D8] border border-[#8CB7FF]/30">
                        {update.authority}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${
                        update.importance === 'Critical'
                          ? 'bg-red-950/60 text-red-300 border-red-500/50'
                          : update.importance === 'Important'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-500/50'
                          : 'bg-[#101A3A] text-[#8CB7FF] border-[#8CB7FF]/20'
                      }`}>
                        {update.importance}
                      </span>
                      <span className="text-[10px] text-[#27866B] flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Officially Verified</span>
                      </span>
                    </div>

                    <div className="text-[11px] text-[#A8B3D4]">
                      Published: {update.publishDate} • Verified: {update.lastVerified}
                    </div>
                  </div>

                  {/* Headline */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FFF2D8] font-normal leading-snug mb-3">
                    {update.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#F8F8FC]/90 leading-relaxed mb-4">
                    {update.summary}
                  </p>
                </div>

                {/* Footer: Source Link & Save Reminder */}
                <div className="pt-4 border-t border-[#FFF2D8]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <a
                      href={update.officialSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8CB7FF] hover:text-[#FFF2D8] flex items-center gap-1 font-medium underline underline-offset-4"
                    >
                      <span>Read Original Gazette Notice on {update.authority}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => toggleSaveUpdateReminder(update.id)}
                      className={`w-full sm:w-auto py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        isReminderSet
                          ? 'bg-[#27866B] text-white'
                          : 'bg-[#101A3A] border border-[#FFF2D8]/20 text-[#FFF2D8] hover:bg-[#172F91]/50'
                      }`}
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>{isReminderSet ? 'Reminder Active' : 'Save Reminder'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification Preferences Modal */}
        {preferencesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="max-w-md w-full bg-[#101A3A] border border-[#FFF2D8]/25 rounded-2xl p-6 shadow-2xl space-y-5 text-xs">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#FFF2D8]/15">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#8CB7FF]" />
                  <h3 className="font-serif text-xl text-[#FFF2D8] font-normal">
                    Notification Preferences
                  </h3>
                </div>
                <button
                  onClick={() => setPreferencesModalOpen(false)}
                  className="text-[#A8B3D4] hover:text-[#FFF2D8]"
                >
                  ✕
                </button>
              </div>

              {/* Channels */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A8B3D4] font-semibold mb-2">
                  Delivery Channels
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#142147] border border-[#FFF2D8]/10 cursor-pointer">
                    <span className="text-[#FFF2D8]">In-App Dashboard Alerts</span>
                    <input
                      type="checkbox"
                      checked={channelInApp}
                      onChange={(e) => setChannelInApp(e.target.checked)}
                      className="accent-[#FFF2D8] w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#142147] border border-[#FFF2D8]/10 cursor-pointer">
                    <div>
                      <span className="text-[#FFF2D8]">Email Notifications</span>
                      <span className="text-[10px] text-[#A8B3D4] block">Requires SMTP integration</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={channelEmail}
                      onChange={(e) => setChannelEmail(e.target.checked)}
                      className="accent-[#FFF2D8] w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#142147] border border-[#FFF2D8]/10 cursor-pointer">
                    <div>
                      <span className="text-[#FFF2D8]">WhatsApp / SMS Alerts</span>
                      <span className="text-[10px] text-[#A8B3D4] block">Requires Twilio integration</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={channelWhatsApp}
                      onChange={(e) => setChannelWhatsApp(e.target.checked)}
                      className="accent-[#FFF2D8] w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              {/* Timing */}
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#A8B3D4] font-semibold mb-2">
                  Reminder Advance Warning
                </label>
                <div className="space-y-2">
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#142147] border border-[#FFF2D8]/10 cursor-pointer">
                    <span className="text-[#FFF2D8]">24 Hours before deadline</span>
                    <input
                      type="checkbox"
                      checked={timing24h}
                      onChange={(e) => setTiming24h(e.target.checked)}
                      className="accent-[#FFF2D8] w-4 h-4"
                    />
                  </label>
                  <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#142147] border border-[#FFF2D8]/10 cursor-pointer">
                    <span className="text-[#FFF2D8]">2 Hours final countdown</span>
                    <input
                      type="checkbox"
                      checked={timing2h}
                      onChange={(e) => setTiming2h(e.target.checked)}
                      className="accent-[#FFF2D8] w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-[#FFF2D8]/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPreferencesModalOpen(false)}
                  className="py-2 px-4 rounded-xl text-xs text-[#A8B3D4] hover:text-[#FFF2D8]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={savePreferences}
                  className="py-2.5 px-6 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#FFF2D8] text-[#101A3A] hover:bg-white"
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
