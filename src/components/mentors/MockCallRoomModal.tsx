import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookingRecord } from '../../types';
import { 
  X, Mic, MicOff, Video, VideoOff, PhoneOff, Send, 
  MessageSquare, Edit3, ShieldCheck, Star, Sparkles, CheckCircle2
} from 'lucide-react';

export const MockCallRoomModal: React.FC = () => {
  const { activeCallBooking, setActiveCallBooking, showToast } = useApp();

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');
  
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([
    {
      sender: 'Mentor',
      text: 'Hi! Welcome to our session. I have your rank and preliminary branch choices on my screen. How can I help you today?',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [studentNotes, setStudentNotes] = useState(
    '1. IIT Bombay CSE vs IIT Delhi MnC\n2. Dual degree CGPA requirements at BITS\n3. Verify OBC-NCL certificate crucial date'
  );
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedbackComment, setFeedbackComment] = useState('');

  if (!activeCallBooking) return null;

  const booking = activeCallBooking;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { sender: 'You', text: inputText, time: 'Just now' };
    setChatMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulated mentor reply after 1.2s
    setTimeout(() => {
      const mentorReplies = [
        "That's a very common doubt! Looking at your rank, I'd strongly recommend keeping that as your #2 choice.",
        "Yes, in JoSAA Round 1, seat acceptance fee is ₹35,000 and is fully adjustable against institute fees.",
        "Branch change rules were discontinued at several IITs, so prioritize the branch you genuinely love over just college brand."
      ];
      const randomReply = mentorReplies[Math.floor(Math.random() * mentorReplies.length)];
      setChatMessages(prev => [...prev, { sender: booking.mentorName, text: randomReply, time: 'Just now' }]);
    }, 1200);
  };

  const handleEndCall = () => {
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    setShowFeedbackModal(false);
    setActiveCallBooking(null);
    showToast('Thank you! Session feedback recorded and mentor credited.', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl h-[88vh] bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl text-[#111827]">
        
        {/* Call Top Bar */}
        <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-serif text-sm font-semibold text-[#111827]">
              Clario Live Consultation Room
            </span>
            <span className="hidden sm:inline-block text-[#64748B]">
              • Session ID: <strong className="font-mono text-[#111827]">{booking.id}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#DEE5FC] text-[#172F91] text-[11px] font-bold">
              Encrypted 1-on-1 Stream
            </span>
          </div>
        </div>

        {/* Video Stage and Side Panel */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Main Video Stage (Left) */}
          <div className="flex-1 bg-slate-950 p-4 flex flex-col justify-between relative overflow-hidden">
            
            {/* Mentor Primary Video Stream (Simulated) */}
            <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
              <img
                src={booking.mentorAvatar}
                alt={booking.mentorName}
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Mentor Identity Badge on stream */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <div>
                  <div className="font-serif text-sm text-white font-medium leading-none">
                    {booking.mentorName}
                  </div>
                  <div className="text-[10px] text-[#8CB7FF] mt-0.5">
                    {booking.mentorCollege} Mentor
                  </div>
                </div>
              </div>

              {/* Student Picture-in-Picture Stream */}
              <div className="absolute top-4 right-4 w-36 h-28 sm:w-44 sm:h-32 rounded-xl overflow-hidden border-2 border-white/30 bg-slate-800 shadow-xl flex items-center justify-center">
                {camOn ? (
                  <img
                    src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80"
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-[10px] text-slate-300">Camera Off</div>
                )}
                <div className="absolute bottom-1.5 left-2 text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded">
                  You {micOn ? '🎤' : '🔇'}
                </div>
              </div>

              {/* Audio Waveform Simulator */}
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-white/10">
                <span className="text-[10px] text-white mr-1">Voice:</span>
                <span className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce"></span>
                <span className="w-1 h-5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>

            {/* Video Call Controls Bar */}
            <div className="pt-3 flex items-center justify-center gap-3">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  micOn 
                    ? 'bg-slate-800 border border-white/20 text-white hover:bg-slate-700' 
                    : 'bg-red-600 text-white'
                }`}
                title={micOn ? 'Mute Mic' : 'Unmute Mic'}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setCamOn(!camOn)}
                className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
                  camOn 
                    ? 'bg-slate-800 border border-white/20 text-white hover:bg-slate-700' 
                    : 'bg-red-600 text-white'
                }`}
                title={camOn ? 'Stop Camera' : 'Start Camera'}
              >
                {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="px-6 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
              >
                <PhoneOff className="w-4 h-4" />
                <span>Leave Call</span>
              </button>
            </div>

          </div>

          {/* Right Side Panel: Chat & Notes Notepad */}
          <div className="w-full lg:w-80 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 flex flex-col">
            
            {/* Panel Tabs */}
            <div className="flex border-b border-slate-200 text-xs">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-3 text-center font-semibold flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'chat' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>In-Call Chat</span>
              </button>
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-3 text-center font-semibold flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'notes' ? 'border-[#172F91] text-[#172F91]' : 'border-transparent text-[#64748B]'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Shared Notes</span>
              </button>
            </div>

            {/* Tab: Chat */}
            {activeTab === 'chat' && (
              <div className="flex-1 flex flex-col justify-between p-4 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-2xl max-w-[85%] ${
                        msg.sender === 'You'
                          ? 'ml-auto bg-[#111827] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-[#111827] shadow-xs'
                      }`}
                    >
                      <div className={`text-[10px] mb-0.5 font-bold ${msg.sender === 'You' ? 'text-slate-300' : 'text-[#172F91]'}`}>
                        {msg.sender}
                      </div>
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="mt-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type question to mentor..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-xl bg-[#111827] text-white flex items-center justify-center hover:bg-black shrink-0 transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* Tab: Notes Notepad */}
            {activeTab === 'notes' && (
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="flex-1">
                  <div className="text-[11px] text-[#64748B] mb-2 font-semibold">
                    Jot down actionable points during your call:
                  </div>
                  <textarea
                    value={studentNotes}
                    onChange={(e) => setStudentNotes(e.target.value)}
                    rows={12}
                    className="w-full h-64 bg-white border border-slate-200 rounded-2xl p-3 text-xs font-mono text-[#111827] focus:outline-none resize-none leading-relaxed shadow-xs"
                  />
                </div>
                <div className="text-[10px] text-emerald-700 mt-2 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Notes automatically synced to your Student Dashboard</span>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Feedback / Post-Session Review Modal */}
        {showFeedbackModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#DEE5FC] text-[#172F91] flex items-center justify-center mx-auto">
                <Star className="w-6 h-6 fill-current" />
              </div>

              <div>
                <h3 className="font-serif text-xl text-[#111827] font-semibold">
                  How was your session with {booking.mentorName}?
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Your rating keeps the mentor community verified, transparent, and trustworthy.
                </p>
              </div>

              {/* Star Rating Picker */}
              <div className="flex justify-center gap-2 text-2xl cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`transition-transform hover:scale-110 ${star <= rating ? 'text-amber-500' : 'text-slate-300'}`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Share brief feedback on the session advice..."
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                rows={3}
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl p-3 text-xs text-[#111827] focus:outline-none"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setActiveCallBooking(null);
                  }}
                  className="py-2 px-4 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#111827]"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={submitFeedback}
                  className="py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black transition-all shadow-xs"
                >
                  Submit & Complete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
