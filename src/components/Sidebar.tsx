import React from 'react';
import {
  LayoutDashboard,
  Package,
  MapPin,
  PlusCircle,
  Sparkles,
  Warehouse,
  Thermometer,
  Layers,
  Inbox,
  Database,
  X,
  Bell,
  FileText,
  Truck,
  LogOut,
  Building2,
  TrendingUp,
  Award,
  ShieldCheck,
  Landmark,
} from 'lucide-react';
import { Role, Language } from '../types';
import { translations } from '../i18n/translations';

interface SidebarProps {
  role: Role;
  lang: Language;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  onLogout: () => void;
  onOpenProfileModal?: () => void;
  pendingRequestsCount?: number;
  criticalAlertsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  role,
  lang,
  activeTab,
  onTabChange,
  isOpen,
  onToggle,
  onLogout,
  onOpenProfileModal,
  pendingRequestsCount = 0,
  criticalAlertsCount = 0,
}) => {
  const t = translations[lang];
  const isFarmer = role === 'farmer';
  const isGovernment = role === 'government';
  const isStorage = role === 'storage';

  // Role-specific theme colors
  let sidebarBg = 'bg-[#123E5E]';
  let accentBg = 'bg-[#95B1EE]';
  let accentText = 'text-[#123E5E]';
  let iconAccent = 'text-[#95B1EE]';
  let brandSub = 'Storage Ops';
  let userInitials = 'SB';
  let userName = 'Sahil Bhonsle';
  let userRoleLabel = 'Cold Storage Owner';

  if (isFarmer) {
    sidebarBg = 'bg-[#0C3830]';
    accentBg = 'bg-[#DCEBBA]';
    accentText = 'text-[#0C3830]';
    iconAccent = 'text-[#DCEBBA]';
    brandSub = 'Farmer Portal';
    userInitials = 'RK';
    userName = 'Rajesh Kadam';
    userRoleLabel = 'Edit Profile & Mobile #';
  } else if (isGovernment) {
    sidebarBg = 'bg-[#3A2E1F]';
    accentBg = 'bg-[#EFD17F]';
    accentText = 'text-[#3A2E1F]';
    iconAccent = 'text-[#EFD17F]';
    brandSub = 'Regulator Portal';
    userInitials = 'AK';
    userName = 'Dr. Anand Kulkarni';
    userRoleLabel = 'District Agri Officer';
  }

  interface NavItem {
    id: string;
    label: string;
    icon: any;
    badge?: number;
  }

  const farmerNavItems: NavItem[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'batches', label: t.nav.batches, icon: Package },
    { id: 'register', label: t.nav.registerHarvest, icon: PlusCircle },
    { id: 'storage', label: t.nav.findStorage, icon: MapPin },
    { id: 'logistics', label: t.nav.logistics, icon: Truck },
    { id: 'alerts', label: t.nav.alerts, icon: Bell, badge: criticalAlertsCount },
    { id: 'history', label: t.nav.history, icon: FileText },
    { id: 'ai-advisor', label: t.nav.aiAdvisor, icon: Sparkles },
  ];

  const storageNavItems: NavItem[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'sensors', label: t.nav.analytics, icon: Thermometer },
    { id: 'zones', label: t.nav.zoneManagement, icon: Layers },
    { id: 'logistics', label: t.nav.logistics, icon: Truck },
    { id: 'requests', label: t.nav.requests, icon: Inbox, badge: pendingRequestsCount },
    { id: 'alerts', label: t.nav.alerts, icon: Bell, badge: criticalAlertsCount },
    { id: 'inventory', label: t.nav.inventory, icon: Database },
  ];

  const governmentNavItems: NavItem[] = [
    { id: 'dashboard', label: 'District Overview', icon: LayoutDashboard },
    { id: 'facilities', label: 'Storage Grid & Audits', icon: Building2 },
    { id: 'logistics', label: 'Regional Transit Fleet', icon: Truck },
    { id: 'alerts', label: 'Compliance & Breaches', icon: Bell, badge: criticalAlertsCount },
    { id: 'subsidies', label: 'PMKSY & Subsidies', icon: Award },
    { id: 'mandi', label: 'Mandi Price Index', icon: TrendingUp },
  ];

  let navItems = storageNavItems;
  if (isFarmer) {
    navItems = farmerNavItems;
  } else if (isGovernment) {
    navItems = governmentNavItems;
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 ${sidebarBg} text-white transition-all duration-300 flex flex-col shadow-2xl ${
          isOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className={`w-11 h-11 rounded-2xl ${accentBg} ${accentText} flex items-center justify-center font-black text-xl shadow-md shrink-0`}>
              {isGovernment ? <Landmark size={22} /> : <Warehouse size={22} />}
            </div>
            {isOpen && (
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight leading-none text-white">
                  AgriCool
                </span>
                <span className={`text-[10px] font-extrabold uppercase tracking-widest mt-1 ${iconAccent}`}>
                  {brandSub}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggle}
            className="text-white/70 hover:text-white p-1.5 rounded-xl lg:hidden"
            title="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation items list */}
        <div className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => {
                  onTabChange(item.id);
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-3.5 rounded-2xl font-bold text-sm transition-all relative group ${
                  isActive
                    ? `${accentBg} ${accentText} shadow-md`
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                title={item.label}
              >
                <Icon
                  size={20}
                  className={`shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? accentText : iconAccent
                  }`}
                />

                {isOpen && <span className="truncate">{item.label}</span>}

                {/* Badge count if present */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`ml-auto px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                      isActive ? 'bg-black/40 text-white' : `${accentBg} ${accentText}`
                    } ${isOpen ? '' : 'absolute top-1 right-1'}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer: Profile Info & Log Out */}
        <div className="p-4 border-t border-white/10 bg-black/20 space-y-3.5">
          {/* User Profile Info */}
          <button
            onClick={isFarmer ? onOpenProfileModal : undefined}
            disabled={!isFarmer}
            className={`w-full flex items-center gap-3 p-2 rounded-2xl transition-colors text-left ${
              isFarmer ? 'hover:bg-white/10 cursor-pointer group' : 'cursor-default'
            }`}
            title={isFarmer ? 'Click to edit profile & WhatsApp alert settings' : undefined}
          >
            <div className={`w-10 h-10 rounded-full ${accentBg} ${accentText} flex items-center justify-center font-black text-xs shadow-md shrink-0 border border-white/20 group-hover:scale-105 transition-transform`}>
              {userInitials}
            </div>
            {isOpen && (
              <div className="overflow-hidden flex-1">
                <p className="text-xs font-extrabold text-white truncate leading-tight group-hover:opacity-90 transition-opacity">
                  {userName}
                </p>
                <p className={`text-[10px] ${iconAccent} font-semibold truncate mt-0.5`}>
                  {userRoleLabel}
                </p>
              </div>
            )}
          </button>

          {/* Log Out Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-rose-500/20 hover:text-rose-200 text-white font-bold text-xs transition-all border border-white/15 shadow-xs cursor-pointer"
            title="Log Out to Portal Switcher"
          >
            <LogOut size={16} className={iconAccent} />
            {isOpen && <span>Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
