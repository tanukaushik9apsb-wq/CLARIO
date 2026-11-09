import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mentor, BookingRecord } from '../../types';
import { 
  X, CheckCircle2, ShieldCheck, Calendar, Clock, 
  CreditCard, Sparkles, Video, ArrowRight, Download, Star, AlertCircle
} from 'lucide-react';

export const BookingModal: React.FC = () => {
  const { selectedMentor, setSelectedMentor, createBooking, setActiveCallBooking, showToast } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('');
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('student@okaxis');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  if (!selectedMentor) return null;

  const mentor = selectedMentor;

  // Initialize defaults
  if (!selectedTopic && mentor.topics.length > 0) {
    setSelectedTopic(mentor.topics[0]);
  }
  if (!selectedSlotId && mentor.availableSlots.length > 0) {
    setSelectedSlotId(mentor.availableSlots[0].id);
  }

  const selectedSlot = mentor.availableSlots.find(s => s.id === selectedSlotId) || mentor.availableSlots[0];
  const finalPrice = Math.max(0, mentor.priceINR - promoDiscount);

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'FUTURE50' || promoCode.toUpperCase() === 'CLARIO') {
      setPromoDiscount(50);
      showToast('Promo code applied: ₹50 discount!', 'success');
    } else {
      showToast('Invalid promo code. Try "CLARIO" or "FUTURE50"', 'warning');
    }
  };

  const handlePayAndConfirm = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const booking = createBooking(mentor.id, selectedSlot.id, selectedTopic);
      setConfirmedBooking(booking);
      setStep(5); // Confirmation screen
    }, 1500);
  };

  const downloadCalendarInvite = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Clario Counselling//Mentorship Session//EN
BEGIN:VEVENT
SUMMARY:Clario Mentorship: ${mentor.name} (${mentor.collegeName})
DESCRIPTION:Discussion Topic: ${selectedTopic}\\nMeet Link: ${confirmedBooking?.meetLink}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `clario-session-${confirmedBooking?.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Calendar invite downloaded (.ics)', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden flex flex-col shadow-2xl text-[#111827]">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={mentor.avatar} 
              alt={mentor.name} 
              className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-200"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-lg text-[#111827] font-semibold">{mentor.name}</h3>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#DEE5FC] text-[#172F91] font-bold">
                  Verified {mentor.collegeName}
                </span>
              </div>
              <div className="text-xs text-[#64748B]">
                AIR {mentor.entranceRank} • {mentor.branch}
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedMentor(null);
            }}
            className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator (Steps 1 to 4) */}
        {step < 5 && (
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#111827] font-semibold' : 'text-[#94A3B8]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-[#172F91] text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
              <span>Topic</span>
            </div>
            <div className="w-6 h-[1px] bg-slate-200"></div>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#111827] font-semibold' : 'text-[#94A3B8]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#172F91] text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
              <span>Slot</span>
            </div>
            <div className="w-6 h-[1px] bg-slate-200"></div>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#111827] font-semibold' : 'text-[#94A3B8]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#172F91] text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
              <span>Review</span>
            </div>
            <div className="w-6 h-[1px] bg-slate-200"></div>
            <div className={`flex items-center gap-1.5 ${step >= 4 ? 'text-[#111827] font-semibold' : 'text-[#94A3B8]'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-[#172F91] text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
              <span>Payment</span>
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh] text-xs text-[#475569]">
          
          {/* STEP 1: CHOOSE TOPIC */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg text-[#111827] font-semibold">
                What would you like to discuss with {mentor.name}?
              </h4>
              <p className="text-xs text-[#64748B]">
                Selecting a focused topic helps the mentor prepare customized cutoff benchmarks and branch notes ahead of the call.
              </p>

              <div className="space-y-2.5 mt-3">
                {mentor.topics.map((t, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedTopic === t 
                        ? 'bg-[#DEE5FC]/40 border-[#172F91] text-[#111827]' 
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="bookingTopic"
                      checked={selectedTopic === t}
                      onChange={() => setSelectedTopic(t)}
                      className="accent-[#172F91]"
                    />
                    <span className="font-medium text-xs text-[#111827]">{t}</span>
                  </label>
                ))}
              </div>

              {/* Mentor Bio Snippet */}
              <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[10px] text-[#64748B] uppercase font-bold mb-1">Mentor Background:</div>
                <p className="italic text-xs text-[#1E293B]">"{mentor.bio}"</p>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SLOT */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg text-[#111827] font-semibold">
                Select an Available Consultation Slot
              </h4>
              <p className="text-xs text-[#64748B]">
                Sessions are 30 minutes in length conducted via Clario High-Definition Video or Google Meet.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {mentor.availableSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={slot.isBooked}
                    onClick={() => setSelectedSlotId(slot.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      slot.isBooked
                        ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200'
                        : selectedSlotId === slot.id
                        ? 'bg-[#111827] border-black text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-[#111827]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 font-semibold text-xs">
                      <Calendar className={`w-3.5 h-3.5 ${selectedSlotId === slot.id ? 'text-[#DDF587]' : 'text-[#172F91]'}`} />
                      <span>{slot.date}</span>
                    </div>
                    <div className={`text-[11px] mt-1 flex items-center gap-1.5 ${selectedSlotId === slot.id ? 'text-slate-300' : 'text-[#64748B]'}`}>
                      <Clock className="w-3 h-3" />
                      <span>{slot.time}</span>
                    </div>
                    {slot.isBooked && (
                      <span className="text-[9px] uppercase font-bold text-red-600 mt-2 block">
                        Already Reserved
                      </span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-[#DEE5FC]/40 border border-[#DEE5FC] flex items-center gap-2 text-[11px] text-[#1E293B]">
                <ShieldCheck className="w-4 h-4 text-[#172F91] shrink-0" />
                <span>Automated calendar reminders will be sent 30 mins prior to call.</span>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW DETAILS */}
          {step === 3 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg text-[#111827] font-semibold">
                Review Session Summary
              </h4>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-[#64748B]">Mentor:</span>
                  <span className="font-semibold text-[#111827]">{mentor.name} ({mentor.collegeName})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-[#64748B]">Topic:</span>
                  <span className="font-medium text-[#111827] text-right max-w-xs">{selectedTopic}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-[#64748B]">Date & Time:</span>
                  <span className="font-semibold text-[#172F91]">{selectedSlot?.date} ({selectedSlot?.time})</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-slate-200">
                  <span className="text-[#64748B]">Duration:</span>
                  <span className="text-[#111827]">30 Minutes Private 1-on-1 Video Call</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[#64748B]">Standard Fee:</span>
                  <span className="font-mono text-sm text-[#111827]">₹{mentor.priceINR}</span>
                </div>
                {promoDiscount > 0 && (
                  <div className="flex justify-between items-center text-emerald-700 font-semibold">
                    <span>Discount (Promo FUTURE50):</span>
                    <span className="font-mono">-₹{promoDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm font-bold text-[#111827]">
                  <span>Total Payable:</span>
                  <span className="font-serif text-lg text-emerald-700">₹{finalPrice}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code (e.g. FUTURE50)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-[#111827] uppercase placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="py-2 px-4 rounded-xl text-xs font-semibold bg-[#111827] text-white hover:bg-black transition-all"
                >
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SIMULATED PAYMENT GATEWAY */}
          {step === 4 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg text-[#111827] font-semibold">
                Complete Secure Payment
              </h4>

              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-2.5 rounded-2xl border text-center font-semibold text-xs transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-[#111827] border-black text-white'
                      : 'bg-slate-50 border-slate-200 text-[#64748B] hover:text-[#111827]'
                  }`}
                >
                  UPI (GPay / PhonePe)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-2xl border text-center font-semibold text-xs transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#111827] border-black text-white'
                      : 'bg-slate-50 border-slate-200 text-[#64748B] hover:text-[#111827]'
                  }`}
                >
                  Debit / Credit Card
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-2.5 rounded-2xl border text-center font-semibold text-xs transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-[#111827] border-black text-white'
                      : 'bg-slate-50 border-slate-200 text-[#64748B] hover:text-[#111827]'
                  }`}
                >
                  NetBanking
                </button>
              </div>

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="text-[11px] text-[#64748B]">Enter your Virtual Payment Address (UPI ID):</div>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-[#111827] focus:outline-none"
                  />
                  <div className="flex items-center gap-2 text-[10px] text-emerald-700 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Instant demo verification enabled • 100% money-back guarantee</span>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8921"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-[#111827]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" defaultValue="08/28" className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-[#111827]" />
                    <input type="password" defaultValue="892" className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-[#111827]" />
                  </div>
                </div>
              )}

              {paymentMethod === 'netbanking' && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="text-xs text-[#64748B] mb-2">Select Primary Bank:</div>
                  <select className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-[#111827]">
                    <option>State Bank of India (SBI)</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                  </select>
                </div>
              )}

              <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between">
                <span className="text-[#64748B]">Amount to Authorize:</span>
                <span className="font-serif text-lg font-bold text-emerald-700">₹{finalPrice}</span>
              </div>
            </div>
          )}

          {/* STEP 5: BOOKING CONFIRMATION & ACCESS LINK */}
          {step === 5 && confirmedBooking && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-[#DDF587] text-emerald-950 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-emerald-800 font-bold">
                  SESSION REQUEST SUBMITTED • AWAITING MENTOR CONFIRMATION
                </span>
                <h3 className="font-serif text-2xl text-[#111827] font-semibold mt-1">
                  Your Consultation Request is Placed!
                </h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Booking ID: <strong className="font-mono text-[#111827]">{confirmedBooking.id}</strong> • Status: <strong className="text-amber-700">Pending Approval</strong>
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Mentor:</span>
                  <span className="font-semibold text-[#111827]">{mentor.name} ({mentor.collegeName})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Requested Slot:</span>
                  <span className="font-semibold text-[#172F91]">{confirmedBooking.date} • {confirmedBooking.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Discussion Focus:</span>
                  <span className="text-[#111827] text-right font-medium">{confirmedBooking.topic}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-[#64748B]">Meeting Room:</span>
                  <span className="text-[#172F91] font-mono text-[11px] truncate">{confirmedBooking.meetLink}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 text-left max-w-md mx-auto">
                <strong>Next Step:</strong> {mentor.name} will review this session request in their mentor console. Once approved, the meeting room unlocks and a calendar invite is issued.
              </div>

              {/* Action Buttons: Join Call & Download Calendar */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    setActiveCallBooking(confirmedBooking);
                    setSelectedMentor(null);
                  }}
                  className="w-full sm:w-auto py-3 px-6 rounded-2xl font-semibold text-xs uppercase tracking-wider bg-[#111827] text-white hover:bg-black flex items-center justify-center gap-2 shadow-xs transition-all"
                >
                  <Video className="w-4 h-4 text-[#DDF587]" />
                  <span>Preview Meeting Room</span>
                </button>

                <button
                  onClick={downloadCalendarInvite}
                  className="w-full sm:w-auto py-3 px-5 rounded-2xl font-semibold text-xs border border-slate-300 bg-white hover:bg-slate-50 text-[#111827] flex items-center justify-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .ics Invite</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="py-2 px-4 rounded-xl text-xs font-semibold text-[#64748B] hover:text-[#111827]"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 4 && (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className="py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-[#111827] text-white hover:bg-black transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {step === 4 && (
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handlePayAndConfirm}
                className="py-2.5 px-6 rounded-2xl text-xs font-semibold uppercase tracking-wider bg-emerald-700 text-white hover:bg-emerald-800 transition-all flex items-center gap-2 shadow-xs disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{finalPrice} & Confirm</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#DDF587]" />
                  </>
                )}
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
