import React, { useState } from 'react';
import { Search, Bell, Menu, X, Globe, LogOut, Sparkles } from 'lucide-react';
import { Role, Language, SystemAlert } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  role: Role;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  toggleSidebar: () => void;
  alerts: SystemAlert[];
  onOpenProfileModal?: () => void;
  onOpenChatbotModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  role,
  lang,
  onLanguageChange,
  searchQuery,
  onSearchChange,
  toggleSidebar,
  alerts,
  onOpenProfileModal,
  onOpenChatbotModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const t = translations[lang];
  const isFarmer = role === 'farmer';
  const isGovernment = role === 'government';

  let welcomeTitle = t.welcomeStorage;
  let welcomeSubtitle = t.storageSubtitle;
  if (isFarmer) {
    welcomeTitle = t.welcomeFarmer;
    welcomeSubtitle = t.farmerSubtitle;
  } else if (isGovernment) {
    welcomeTitle = 'Hey Dr. Anand,';
    welcomeSubtitle = 'District Agri Office & Cold-Chain Governance Hub';
  }

  return (
    <header className="sticky top-0 z-30 bg-[#F4F6F4]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 border-b border-[#E2E9E2] flex items-center justify-between shadow-2xs transition-colors duration-300">
      {/* Left section: Hamburger & Greeting */}
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2.5 rounded-2xl bg-white border border-[#E2E9E2] text-[#1A2D27] hover:bg-gray-50 transition-colors shadow-2xs"
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div className="hidden sm:block">
          <h2 className="text-base sm:text-lg font-extrabold text-[#1A2D27] leading-tight tracking-tight">
            {welcomeTitle}
          </h2>
          <p className="text-xs text-[#5C736A] font-semibold">
            {welcomeSubtitle}
          </p>
        </div>
      </div>

      {/* Middle section: Search Icon Only (expands on click) */}
      <div className="flex-1 flex justify-center mx-2 sm:mx-6">
        {!isSearchExpanded && !searchQuery ? (
          <button
            onClick={() => setIsSearchExpanded(true)}
            className="p-2.5 rounded-full bg-white border border-[#E2E9E2] text-[#1A2D27] hover:bg-gray-50 transition-all shadow-2xs"
            title="Search"
          >
            <Search size={18} />
          </button>
        ) : (
          <div className="relative flex items-center w-full max-w-xs sm:max-w-sm">
            <Search size={18} className="absolute left-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t.actions.searchPlaceholder}
              className="w-full pl-10 pr-9 py-2 bg-white border border-[#E2E9E2] rounded-full text-xs sm:text-sm font-medium text-[#1A2D27] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0C3830] transition-all shadow-2xs"
            />
            <button
              onClick={() => {
                onSearchChange('');
                setIsSearchExpanded(false);
              }}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Right section: Chatbot, Language, Notifications, User Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* AI Assistant Chatbot Button */}
        {onOpenChatbotModal && (
          <button
            onClick={onOpenChatbotModal}
            className="p-2.5 bg-white border border-[#E2E9E2] rounded-full text-[#0C3830] hover:bg-[#F4F6F4] transition-all shadow-2xs flex items-center justify-center cursor-pointer group"
            title="Ask AI Assistant"
          >
            <Sparkles size={18} className="text-[#0C3830] group-hover:rotate-12 transition-transform" />
          </button>
        )}


        {/* Single Icon Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="p-2.5 bg-white border border-[#E2E9E2] rounded-full text-[#1A2D27] hover:bg-gray-50 transition-all shadow-2xs flex items-center justify-center relative"
            title="Change Language"
          >
            <Globe size={18} />
            <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-[#0C3830] text-[#DCEBBA] text-[9px] font-black uppercase rounded-full border border-white">
              {lang}
            </span>
          </button>

          {/* Compact Language Dropdown Popover */}
          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-[#E2E9E2] rounded-2xl shadow-xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
              {(
                [
                  { code: 'en', label: 'English' },
                  { code: 'hi', label: 'हिंदी' },
                  { code: 'mr', label: 'मराठी' },
                ] as const
              ).map((l) => (
                <button
                  key={l.code}
                  onClick={() => {
                    onLanguageChange(l.code);
                    setShowLangMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                    lang === l.code
                      ? 'bg-[#0C3830] text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 bg-white border border-[#E2E9E2] rounded-full text-[#1A2D27] hover:bg-gray-50 transition-all shadow-2xs"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {alerts.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-[#E2E9E2] rounded-3xl shadow-2xl z-50 p-5 space-y-3 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <h4 className="font-extrabold text-sm text-[#1A2D27]">System Alerts ({alerts.length})</h4>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {alerts.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-6">No active notifications</p>
                ) : (
                  alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                        alert.severity === 'critical'
                          ? 'bg-rose-50/80 border-rose-200 text-rose-950'
                          : alert.severity === 'warning'
                          ? 'bg-amber-50/80 border-amber-200 text-amber-950'
                          : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                      }`}
                    >
                      <div className="flex justify-between font-extrabold">
                        <span>{alert.title}</span>
                        <span className="text-[10px] opacity-70 font-normal">{alert.timestamp}</span>
                      </div>
                      <p className="font-medium leading-relaxed">{alert.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

