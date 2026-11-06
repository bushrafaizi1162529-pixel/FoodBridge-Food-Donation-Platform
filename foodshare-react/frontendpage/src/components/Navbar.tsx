import React, { useState } from 'react';
import { useFoodBridge } from '../context/FoodBridgeContext';
import { TRANSLATIONS } from '../constants/translations';
import { Language } from '../types';
import { Sun, Moon, Bell, Menu, X, Landmark, User, ShieldAlert, Award, Globe, LogOut } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  showLoginModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, showLoginModal }) => {
  const { 
    language, 
    setLanguage, 
    theme, 
    setTheme, 
    currentUser, 
    setCurrentUser,
    notifications,
    addNotificationGlobal
  } = useFoodBridge();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Translations
  const t = TRANSLATIONS[language];

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    addNotificationGlobal('Logged Out', 'Successfully logged out from your secure session.', 'info');
  };

  const menuItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'listings', label: t.nav.listings },
    { id: 'impact', label: t.nav.impact },
    { id: 'leaderboard', label: t.nav.leaderboard },
    { id: 'faq', label: t.nav.faq },
    { id: 'contact', label: t.nav.contact },
  ];

  const getLanguageLabel = (l: Language) => {
    switch (l) {
      case 'en': return 'English';
      case 'te': return 'తెలుగు (Telugu)';
      case 'hi': return 'हिन्दी (Hindi)';
      case 'ta': return 'தமிழ் (Tamil)';
      case 'kn': return 'ಕನ್ನಡ (Kannada)';
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-orange-500/10 backdrop-blur-md bg-white/80 dark:bg-gray-950/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Brand */}
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
            className="flex items-center space-x-2 cursor-pointer group"
            id="nav-brand"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Landmark className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent font-sans">
                {t.brand}
              </span>
              <p className="text-[9px] text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase -mt-1 hidden sm:block">
                COMMUNITY DEFENSE
              </p>
            </div>
          </div>

          {/* Desktop Menu Tabs */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  activeTab === item.id
                    ? 'text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-950/30'
                    : 'text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Controls - Lang, Theme, Notif, User Portal */}
          <div className="flex items-center space-x-3">
            
            {/* Language Dropdown Selector */}
            <div className="relative">
              <button
                id="lang-selector-btn"
                onClick={() => { setLangDropdownOpen(!langDropdownOpen); setNotifDropdownOpen(false); }}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 flex items-center space-x-1 cursor-pointer"
                title="Select Language"
              >
                <Globe className="w-5 h-5 text-orange-500" />
                <span className="text-xs font-semibold uppercase hidden md:inline">
                  {language}
                </span>
              </button>

              {langDropdownOpen && (
                <div 
                  id="lang-dropdown"
                  className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden py-1 z-50 animate-fade-in"
                >
                  {(['en', 'te', 'hi', 'ta', 'kn'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                        language === lang 
                          ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/20 dark:text-orange-400' 
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span>{getLanguageLabel(lang)}</span>
                      {language === lang && <span className="w-2 h-2 rounded-full bg-orange-500" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              id="theme-toggler"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-700" />
              ) : (
                <Sun className="w-5 h-5 text-amber-400" />
              )}
            </button>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                id="notif-bell-btn"
                onClick={() => { setNotifDropdownOpen(!notifDropdownOpen); setLangDropdownOpen(false); }}
                className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer relative"
                title="Notifications panel"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-red-600 text-[9px] font-bold text-white flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifDropdownOpen && (
                <div 
                  id="notifications-panel-dropdown"
                  className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                      {t.notifications.title}
                    </span>
                    <span className="text-[10px] bg-orange-100 dark:bg-orange-950/40 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                      {unreadCount} UNREAD
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-800/40">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-gray-400">
                        No alerts logged.
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div 
                          key={notif.id}
                          className={`p-3 text-left transition-colors hover:bg-gray-55 ${notif.read ? 'opacity-85' : 'bg-orange-50/25 dark:bg-orange-950/5'}`}
                        >
                          <div className="flex items-start space-x-2">
                            <span className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${
                              notif.type === 'urgent' ? 'bg-red-500 animate-ping' :
                              notif.type === 'success' ? 'bg-green-500' :
                              notif.type === 'alert' ? 'bg-amber-500' : 'bg-blue-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                                {notif.title}
                              </p>
                              <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-3 leading-relaxed">
                                {notif.message}
                              </p>
                              <span className="text-[9px] text-gray-400 mt-1 block">
                                {notif.time}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Session Area */}
            {currentUser ? (
              <div className="flex items-center space-x-2">
                {/* Active Dashboard Button */}
                <button
                  id="navbar-dashboard-trigger"
                  onClick={() => setActiveTab('dashboard')}
                  className="hidden md:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-700 hover:to-amber-600 text-white font-medium text-xs leading-none shadow-sm shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-95 transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Portal</span>
                </button>

                {/* Micro User stats */}
                <div className="hidden sm:flex flex-col items-end text-right">
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 line-clamp-1 max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Award className="w-3 h-3" />
                    <span className="text-[10px] font-extrabold">{currentUser.points} pts</span>
                  </div>
                </div>

                {/* Mini Logout */}
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer"
                  title="Logout Session"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </div>
            ) : (
              <button
                id="login-trigger-btn"
                onClick={showLoginModal}
                className="px-4 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.nav.login}
              </button>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 lg:hidden hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden border-t border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-950 py-3 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold block cursor-pointer ${
                activeTab === item.id
                  ? 'text-orange-500 bg-orange-50 dark:bg-orange-950/30 font-bold'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          {!currentUser ? (
            <button
              onClick={() => { showLoginModal(); setMobileMenuOpen(false); }}
              className="w-full text-center py-2.5 mt-2 rounded-xl bg-orange-600 text-white font-semibold text-sm block"
            >
              Log In / Register
            </button>
          ) : (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-900 space-y-2">
              <button
                onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-500 text-white font-semibold text-sm block"
              >
                Go to Portal Console
              </button>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full text-center py-2.5 rounded-xl border border-red-200 dark:border-red-950/40 text-red-600 dark:text-red-400 font-semibold text-xs block hover:bg-red-50 dark:hover:bg-red-950/25"
              >
                Sign Out Account
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
