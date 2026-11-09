import React, { useState } from 'react';
import { useApp, AppView } from '../../context/AppContext';
import { 
  Compass, Users, Bell, Calendar, BookOpen, 
  Menu, X, Sparkles, User, Shield, GraduationCap, ChevronRight, LogOut, LogIn, Bookmark
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentView, setCurrentView, 
    userRole, isAuthenticated, currentUser, logout,
    choiceList, updates 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (view: AppView) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pendingUpdatesCount = updates.filter(u => u.importance === 'Critical').length;

  return (
    <>
      {/* Light Bento Editorial Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 text-[#111827] transition-all duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo - Dark Serif Wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => handleNav('landing')} 
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-[#172F91] flex items-center justify-center text-white shadow-xs">
                <Compass className="w-5 h-5 text-[#DDF587]" />
              </div>
              <div>
                <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-wide text-[#111827] group-hover:text-[#172F91] transition-colors leading-none block">
                  Clario<span className="text-[#172F91]">.</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-[#64748B] block mt-0.5">
                  India Admissions & Mentorship
                </span>
              </div>
            </button>
          </div>

          {/* Center Navigation Links - Uppercase with letter spacing */}
          <nav className="hidden lg:flex items-center gap-6">
            {/* Find Best-Fit Colleges (Predictor Engine) */}
            <button
              onClick={() => handleNav('landing')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-[#172F91] ${
                currentView === 'landing' ? 'text-[#172F91] border-b-2 border-[#172F91] pb-1' : 'text-[#64748B]'
              }`}
            >
              College Predictor
            </button>

            {/* Build Shortlist / Explore */}
            <button
              onClick={() => handleNav('explore')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-[#172F91] ${
                currentView === 'explore' ? 'text-[#172F91] border-b-2 border-[#172F91] pb-1' : 'text-[#64748B]'
              }`}
            >
              Colleges & Cutoffs
            </button>

            {/* Updates & Deadlines Tab */}
            <button
              onClick={() => handleNav('updates-deadlines')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-[#172F91] flex items-center gap-1.5 ${
                currentView === 'updates-deadlines' || currentView === 'updates' || currentView === 'calendar' ? 'text-[#172F91] border-b-2 border-[#172F91] pb-1' : 'text-[#64748B]'
              }`}
            >
              Updates & Deadlines
              {pendingUpdatesCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              )}
            </button>

            <button
              onClick={() => handleNav('mentors')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-[#172F91] ${
                currentView === 'mentors' ? 'text-[#172F91] border-b-2 border-[#172F91] pb-1' : 'text-[#64748B]'
              }`}
            >
              1-on-1 Mentors
            </button>

            {/* Student Community Forum (Abstract Feature) */}
            <button
              onClick={() => handleNav('community')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-[#172F91] ${
                currentView === 'community' ? 'text-[#172F91] border-b-2 border-[#172F91] pb-1' : 'text-[#64748B]'
              }`}
            >
              Community
            </button>

            <button
              onClick={() => handleNav('reviews')}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors hover:text-[#172F91] ${
                currentView === 'reviews' ? 'text-[#172F91] border-b-2 border-[#172F91] pb-1' : 'text-[#64748B]'
              }`}
            >
              Reviews
            </button>
          </nav>

          {/* Right Navigation & Authentication Actions */}
          <div className="flex items-center gap-3">
            
            {/* Shortlist Quick Access Badge (Replaced duplicate "Build Shortlist" CTA) */}
            <button
              onClick={() => handleNav('choice-workspace')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-semibold border transition-all ${
                currentView === 'choice-workspace'
                  ? 'bg-[#111827] text-white border-transparent'
                  : 'bg-white hover:bg-slate-50 text-[#111827] border-slate-300 shadow-2xs'
              }`}
              title="Open Choice List Workspace"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#172F91]" />
              <span className="hidden sm:inline">Shortlist</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#DEE5FC] text-[#172F91] font-bold text-[10px]">
                {choiceList.length}
              </span>
            </button>

            {/* If Authenticated: Show User Avatar Pill & Dashboard Shortcut */}
            {isAuthenticated && currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav(userRole === 'student' ? 'dashboard' : userRole === 'mentor' ? 'mentor-dashboard' : 'admin-dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-[#111827] border border-slate-200 transition-all shadow-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-[#111827] text-white font-bold text-[10px] flex items-center justify-center">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline">{currentUser.name.split(' ')[0]}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#172F91] bg-[#DEE5FC] px-1.5 py-0.5 rounded-full font-bold">
                    {userRole}
                  </span>
                </button>

                <button
                  onClick={logout}
                  className="p-2 rounded-full text-[#64748B] hover:text-red-600 hover:bg-slate-100 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* If Not Authenticated: Show Login / Signup Button */
              <button
                onClick={() => handleNav('auth')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider text-[#111827] hover:bg-slate-100 border border-slate-300 transition-all"
              >
                <LogIn className="w-3.5 h-3.5 text-[#172F91]" />
                <span className="hidden sm:inline">Log In / Sign Up</span>
                <span className="sm:hidden">Log In</span>
              </button>
            )}

            {/* Circular Hamburger Menu Icon for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-2xl border border-slate-200 flex items-center justify-center text-[#111827] hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Slide-out Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed right-0 top-0 bottom-0 w-5/6 max-w-sm bg-white border-l border-slate-200 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                <span className="font-serif text-2xl font-bold text-[#111827]">
                  Clario<span className="text-[#172F91]">.</span>
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-2xl border border-slate-200 flex items-center justify-center text-[#111827]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Status in Mobile Drawer */}
              {isAuthenticated && currentUser ? (
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-[#111827]">{currentUser.name}</div>
                    <div className="text-[10px] text-[#172F91] uppercase tracking-wider font-semibold">{userRole} Account</div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-600 hover:text-red-700 font-semibold"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNav('auth')}
                  className="mt-4 w-full py-2.5 px-4 rounded-2xl bg-[#111827] text-xs font-bold uppercase tracking-wider text-white text-center"
                >
                  Sign In / Register
                </button>
              )}

              <div className="mt-6 space-y-2">
                {/* 1. Best-Fit Recommendation Generator */}
                <button
                  onClick={() => handleNav('landing')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#111827] hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Find Best-Fit Colleges</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DDF587] text-emerald-950 font-bold">AI Matcher</span>
                </button>

                {/* 2. Build Shortlist (College Discovery) */}
                <button
                  onClick={() => handleNav('explore')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#111827] hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Build Shortlist</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DEE5FC] text-[#172F91] font-bold">Search & Cutoffs</span>
                </button>

                {/* 3. Shortlist Workspace */}
                <button
                  onClick={() => handleNav('choice-workspace')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#111827] hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Saved Shortlist</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#111827] text-white font-bold">
                    {choiceList.length}
                  </span>
                </button>

                {/* 4. Updates & Deadlines */}
                <button
                  onClick={() => handleNav('updates-deadlines')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#111827] hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Updates & Deadlines</span>
                  {pendingUpdatesCount > 0 && (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                      {pendingUpdatesCount} Urgent
                    </span>
                  )}
                </button>

                {/* 5. Mentors */}
                <button
                  onClick={() => handleNav('mentors')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#111827] hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Find a Mentor</span>
                  <span className="text-[11px] text-emerald-800 font-bold bg-[#DDF587] px-2 py-0.5 rounded-full">1-on-1 Slots</span>
                </button>

                {/* 6. Community Forum */}
                <button
                  onClick={() => handleNav('community')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#111827] hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Student Community</span>
                  <span className="text-[11px] text-[#172F91] font-bold bg-[#DEE5FC] px-2 py-0.5 rounded-full">Forum</span>
                </button>

                {/* 7. Campus Reviews */}
                <button
                  onClick={() => handleNav('reviews')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#111827] hover:bg-slate-100 flex items-center justify-between"
                >
                  <span>Campus Reviews</span>
                  <ChevronRight className="w-4 h-4 text-[#64748B]" />
                </button>

                {isAuthenticated && (
                  <button
                    onClick={() => handleNav(userRole === 'student' ? 'dashboard' : userRole === 'mentor' ? 'mentor-dashboard' : 'admin-dashboard')}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm uppercase tracking-wider font-semibold text-[#172F91] hover:bg-[#DEE5FC] flex items-center justify-between"
                  >
                    <span>My Dashboard</span>
                    <ChevronRight className="w-4 h-4 text-[#172F91]" />
                  </button>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <p className="text-[10px] text-center text-[#64748B]">
                Clario Platform • Grounded in Official Counselling Data
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
