import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { ToastContainer } from './components/common/ToastContainer';
import { CinematicHero } from './components/landing/CinematicHero';
import { BestFitCollegeGenerator } from './components/landing/BestFitCollegeGenerator';
import { LandingSections } from './components/landing/LandingSections';
import { SmartChoiceBuilder } from './components/colleges/SmartChoiceBuilder';
import { ChoiceListWorkspace } from './components/colleges/ChoiceListWorkspace';
import { CollegeComparison } from './components/colleges/CollegeComparison';
import { CollegeDetailModal } from './components/colleges/CollegeDetailModal';
import { CutoffViewerModal } from './components/colleges/CutoffViewerModal';
import { MentorMarketplace } from './components/mentors/MentorMarketplace';
import { BookingModal } from './components/mentors/BookingModal';
import { MockCallRoomModal } from './components/mentors/MockCallRoomModal';
import { UpdatesAndDeadlinesView } from './components/updates/UpdatesAndDeadlinesView';
import { CollegeReviewsView } from './components/reviews/CollegeReviewsView';
import { CommunityForumView } from './components/community/CommunityForumView';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { MentorDashboard } from './components/dashboard/MentorDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AuthPage } from './components/auth/AuthPage';

const AppContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#E5E7EB] text-[#111827] flex flex-col font-sans selection:bg-[#172F91] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <CinematicHero />
            <BestFitCollegeGenerator />
            <LandingSections />
          </>
        )}

        {currentView === 'explore' && <SmartChoiceBuilder />}
        {currentView === 'choice-workspace' && <ChoiceListWorkspace />}
        {currentView === 'compare' && <CollegeComparison />}
        {currentView === 'mentors' && <MentorMarketplace />}
        {currentView === 'community' && <CommunityForumView />}
        {(currentView === 'updates-deadlines' || currentView === 'updates' || currentView === 'calendar') && (
          <UpdatesAndDeadlinesView />
        )}
        {currentView === 'reviews' && <CollegeReviewsView />}
        {currentView === 'dashboard' && <StudentDashboard />}
        {currentView === 'mentor-dashboard' && <MentorDashboard />}
        {currentView === 'admin-dashboard' && <AdminDashboard />}
        {currentView === 'auth' && <AuthPage />}
      </main>

      {/* Interactive Global Modals */}
      <CollegeDetailModal />
      <CutoffViewerModal />
      <BookingModal />
      <MockCallRoomModal />

      {/* Floating Toasts */}
      <ToastContainer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
