import React, { useState } from 'react';
import { GraduationCap, Menu, X, Globe, Sun, Moon, Bell, ShieldQuestion } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useNotifications } from '../hooks/useFirestore';

interface HeaderProps {
  isAdminLoggedIn: boolean;
  onShowAdminLogin: () => void;
  onAdminLogout: () => void;
  onShowNotifications: () => void;
}

const Header: React.FC<HeaderProps> = ({
  isAdminLoggedIn,
  onShowAdminLogin,
  onAdminLogout,
  onShowNotifications
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { data: notifications } = useNotifications();

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and School Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
              <GraduationCap className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">
                {t.schoolName}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {t.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleScrollTo('home')}
              className="text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleScrollTo('about')}
              className="text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              {t.nav.aboutUs}
            </button>
            <button
              onClick={() => handleScrollTo('academics')}
              className="text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              {t.nav.academics}
            </button>
            <button
              onClick={() => handleScrollTo('teachers')}
              className="text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              {t.nav.teachers}
            </button>
            <button
              onClick={() => handleScrollTo('notices')}
              className="text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              {t.nav.notices}
            </button>
            <button
              onClick={() => handleScrollTo('contact')}
              className="text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
            >
              {t.nav.contactUs}
            </button>
          </nav>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
                className="flex items-center space-x-1 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Globe size={16} />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Notifications */}
            <button
              onClick={onShowNotifications}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications.length > 9 ? '9+' : notifications.length}
                </span>
              )}
            </button>

            {/* Admin Login/Logout */}
            {isAdminLoggedIn ? (
              <button
                onClick={onAdminLogout}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <ShieldQuestion size={16} />
                <span className="text-sm font-medium">{t.nav.logout}</span>
              </button>
            ) : (
              <button
                onClick={onShowAdminLogin}
                className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <ShieldQuestion size={16} />
                <span className="text-sm font-medium">{t.nav.admin}</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-800 border-t dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <nav className="space-y-4">
              <button
                onClick={() => handleScrollTo('home')}
                className="block w-full text-left text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                onClick={() => handleScrollTo('about')}
                className="block w-full text-left text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {t.nav.aboutUs}
              </button>
              <button
                onClick={() => handleScrollTo('academics')}
                className="block w-full text-left text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {t.nav.academics}
              </button>
              <button
                onClick={() => handleScrollTo('teachers')}
                className="block w-full text-left text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {t.nav.teachers}
              </button>
              <button
                onClick={() => handleScrollTo('notices')}
                className="block w-full text-left text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {t.nav.notices}
              </button>
              <button
                onClick={() => handleScrollTo('contact')}
                className="block w-full text-left text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              >
                {t.nav.contactUs}
              </button>
              
              {isAdminLoggedIn ? (
                <button
                  onClick={onAdminLogout}
                  className="w-full text-left px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <ShieldQuestion className="inline mr-2" size={16} />
                  {t.nav.logout}
                </button>
              ) : (
                <button
                  onClick={() => {
                    onShowAdminLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <ShieldQuestion className="inline mr-2" size={16} />
                  {t.nav.admin}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
