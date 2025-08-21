import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { useAuth } from './hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';

// Components
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import WhyChooseUs from './components/WhyChooseUs';
import AboutSection from './components/AboutSection';
import AcademicsSection from './components/AcademicsSection';
import TeachersSection from './components/TeachersSection';
import GallerySection from './components/GallerySection';
import NoticesSection from './components/NoticesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import NotificationPanel from './components/NotificationPanel';

// Admin credentials (hardcoded for simple login)
const ADMIN_EMAIL = 'mubc1969@saif.com';
const ADMIN_PASSWORD = 'mubcsaif@143';

const AppContent: React.FC = () => {
  const { user, loading: authLoading, authError } = useAuth();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleAdminLogin = (email: string, password: string): boolean => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAdminLoggedIn(true);
      setShowAdminPanel(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setShowAdminPanel(false);
  };

  const handleShowAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const handleShowNotifications = () => {
    setShowNotifications(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Firebase Configuration Required
            </h1>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {authError}
            </p>
            <div className="text-left bg-slate-100 dark:bg-slate-700 rounded-md p-4 mb-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">
                To fix this, please:
              </h3>
              <ol className="list-decimal list-inside text-sm text-slate-600 dark:text-slate-300 space-y-1">
                <li>Go to <a href="https://console.firebase.google.com/" target="_blank" className="text-blue-600 hover:underline">Firebase Console</a></li>
                <li>Select your project: {import.meta.env.VITE_FIREBASE_PROJECT_ID}</li>
                <li>Navigate to Authentication → Sign-in method</li>
                <li>Enable "Anonymous" authentication</li>
                <li>Navigate to Firestore Database</li>
                <li>Create database in test mode or set up proper security rules</li>
                <li>Refresh this page</li>
              </ol>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showAdminPanel) {
    return (
      <AdminPanel 
        onClose={() => setShowAdminPanel(false)}
        onLogout={handleAdminLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Header
        isAdminLoggedIn={isAdminLoggedIn}
        onShowAdminLogin={handleShowAdminLogin}
        onAdminLogout={handleAdminLogout}
        onShowNotifications={handleShowNotifications}
      />

      <main>
        <HeroSlideshow />
        <WhyChooseUs />
        <AboutSection />
        <AcademicsSection />
        <TeachersSection />
        <GallerySection />
        <NoticesSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Modals */}
      <AdminLoginModal
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />

      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      <Toaster />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
