import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  Thermometer,
  Package,
  CheckCircle2,
  Info,
  Filter,
  CheckCheck,
  Clock,
  Flame,
  Search,
  X,
  Eye,
  EyeOff,
  ChevronRight,
  ShieldAlert,
  Smartphone,
  MessageSquare,
  MessageCircle,
} from 'lucide-react';
import { SystemAlert, Language, HarvestBatch } from '../../types';
import { translations } from '../../i18n/translations';

interface AlertsScreenProps {
  alerts: SystemAlert[];
  lang: Language;
  searchQuery?: string;
  onToggleRead?: (id: string) => void;
  onMarkAllRead?: () => void;
  onSelectBatchDetails?: (batchId: string) => void;
}

export const AlertsScreen: React.FC<AlertsScreenProps> = ({
  alerts,
  lang,
  searchQuery = '',
  onToggleRead,
  onMarkAllRead,
  onSelectBatchDetails,
}) => {
  const t = translations[lang];

  // Local Channel Preferences State
  const [smsAlerts, setSmsAlerts] = useState<boolean>(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState<boolean>(true);

  // Placeholder function for real notification service integration
  const updateAlertChannelPreference = (channel: 'sms' | 'whatsapp', enabled: boolean) => {
    if (channel === 'sms') {
      setSmsAlerts(enabled);
    } else if (channel === 'whatsapp') {
      setWhatsappAlerts(enabled);
    }
    // TODO: Integrate with backend notification API (e.g., Twilio or WhatsApp Business Cloud API)
  };

  // Local Filter States
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'spoilage' | 'breach' | 'pickup' | 'confirmation'>('all');
  const [localSearch, setLocalSearch] = useState<string>('');

  const effectiveSearch = localSearch || searchQuery;

  // Filter Logic
  const filteredAlerts = alerts.filter((alert) => {
    // Read status filter
    if (statusFilter === 'unread' && alert.read) return false;
    if (statusFilter === 'read' && !alert.read) return false;

    // Severity filter
    if (severityFilter !== 'all' && alert.severity !== severityFilter) return false;

    // Type filter
    if (typeFilter !== 'all') {
      const derivedType = alert.type || (
        alert.title.toLowerCase().includes('spoilage') || alert.message.toLowerCase().includes('spoilage') || alert.message.toLowerCase().includes('softening') ? 'spoilage' :
        alert.title.toLowerCase().includes('temp') || alert.title.toLowerCase().includes('breach') || alert.message.toLowerCase().includes('temp') ? 'breach' :
        alert.title.toLowerCase().includes('pickup') || alert.title.toLowerCase().includes('dispatch') ? 'pickup' :
        alert.title.toLowerCase().includes('confirm') || alert.title.toLowerCase().includes('booking') ? 'confirmation' : 'info'
      );
      if (derivedType !== typeFilter) return false;
    }

    // Search query filter
    if (effectiveSearch.trim()) {
      const q = effectiveSearch.toLowerCase();
      const matchesTitle = alert.title.toLowerCase().includes(q);
      const matchesMessage = alert.message.toLowerCase().includes(q);
      const matchesRef = alert.zoneOrBatchId?.toLowerCase().includes(q);
      if (!matchesTitle && !matchesMessage && !matchesRef) return false;
    }

    return true;
  });

  // Summary Metrics
  const totalCount = alerts.length;
  const unreadCount = alerts.filter((a) => !a.read).length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;

  // Helper function to return icon for type
  const getAlertIcon = (alert: SystemAlert) => {
    const alertType = alert.type || (
      alert.title.toLowerCase().includes('spoilage') ? 'spoilage' :
      alert.title.toLowerCase().includes('temp') || alert.title.toLowerCase().includes('breach') ? 'breach' :
      alert.title.toLowerCase().includes('pickup') ? 'pickup' :
      alert.title.toLowerCase().includes('confirm') ? 'confirmation' : 'info'
    );

    switch (alertType) {
      case 'spoilage':
        return <AlertTriangle size={20} className="text-rose-600" />;
      case 'breach':
        return <Thermometer size={20} className="text-amber-600" />;
      case 'pickup':
        return <Package size={20} className="text-blue-600" />;
      case 'confirmation':
        return <CheckCircle2 size={20} className="text-emerald-600" />;
      default:
        return <Info size={20} className="text-[#0C3830]" />;
    }
  };

  // Helper function for severity card border & background
  const getSeverityStyle = (severity: SystemAlert['severity'], read?: boolean) => {
    switch (severity) {
      case 'critical':
        return {
          cardBg: read ? 'bg-rose-50/40 border-rose-200/70' : 'bg-rose-50/90 border-rose-300 shadow-xs',
          iconBg: 'bg-rose-100 text-rose-800',
          badgeBg: 'bg-[#E15554] text-white',
          badgeText: lang === 'hi' ? 'गंभीर' : lang === 'mr' ? 'गंभीर' : 'Critical Risk',
        };
      case 'warning':
        return {
          cardBg: read ? 'bg-amber-50/40 border-amber-200/70' : 'bg-amber-50/90 border-amber-300 shadow-xs',
          iconBg: 'bg-amber-100 text-amber-800',
          badgeBg: 'bg-[#5C736A] text-white',
          badgeText: lang === 'hi' ? 'चेतावनी' : lang === 'mr' ? 'इशारा' : 'Warning',
        };
      case 'info':
      default:
        return {
          cardBg: read ? 'bg-emerald-50/30 border-emerald-200/60' : 'bg-emerald-50/80 border-emerald-300 shadow-xs',
          iconBg: 'bg-emerald-100 text-emerald-800',
          badgeBg: 'bg-[#0C3830] text-white',
          badgeText: lang === 'hi' ? 'सूचना' : lang === 'mr' ? 'माहिती' : 'Info & Confirmation',
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Title Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E9E2] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-[#0C3830] text-[#DCEBBA] rounded-2xl shadow-md">
            <Bell size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A2D27] tracking-tight">
                {t.nav.alerts || 'Alerts & Notifications'}
              </h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse">
                  {unreadCount} new
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-[#5C736A] font-medium mt-1">
              Real-time cold-chain telemetry, spoilage risks, pickup reminders, and storage updates
            </p>
          </div>
        </div>

        {/* Header Actions */}
        {unreadCount > 0 && onMarkAllRead && (
          <button
            onClick={onMarkAllRead}
            className="self-start sm:self-auto px-4 py-2.5 rounded-full bg-[#DCEBBA] text-[#0C3830] font-extrabold text-xs flex items-center gap-2 hover:bg-[#c8e094] transition-all shadow-xs"
          >
            <CheckCheck size={16} />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Alert Delivery Preferences Section */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#E2E9E2] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#F4F6F4] text-[#0C3830] rounded-2xl border border-[#E2E9E2]">
              <Smartphone size={20} />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#1A2D27] tracking-tight">
                Alert Delivery Channels
              </h2>
              <p className="text-xs text-[#5C736A] font-medium">
                Receive instant spoilage risk &amp; pickup warnings on your mobile device
              </p>
            </div>
          </div>

          {/* Channel Switches */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            {/* SMS Toggle */}
            <div className="flex items-center justify-between gap-3 bg-[#F4F6F4] border border-[#E2E9E2] px-4 py-2.5 rounded-2xl flex-1 sm:flex-initial">
              <div className="flex items-center gap-2">
                <MessageSquare size={16} className={smsAlerts ? 'text-[#0C3830]' : 'text-gray-400'} />
                <div>
                  <span className="text-xs font-extrabold text-[#1A2D27] block leading-none">SMS Alerts</span>
                  <span className={`text-[10px] font-bold ${smsAlerts ? 'text-emerald-700' : 'text-gray-400'}`}>
                    {smsAlerts ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={smsAlerts}
                onClick={() => updateAlertChannelPreference('sms', !smsAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0C3830] focus:ring-offset-2 ${
                  smsAlerts ? 'bg-[#0C3830]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    smsAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* WhatsApp Toggle */}
            <div className="flex items-center justify-between gap-3 bg-[#F4F6F4] border border-[#E2E9E2] px-4 py-2.5 rounded-2xl flex-1 sm:flex-initial">
              <div className="flex items-center gap-2">
                <MessageCircle size={16} className={whatsappAlerts ? 'text-emerald-600' : 'text-gray-400'} />
                <div>
                  <span className="text-xs font-extrabold text-[#1A2D27] block leading-none">WhatsApp Alerts</span>
                  <span className={`text-[10px] font-bold ${whatsappAlerts ? 'text-emerald-700' : 'text-gray-400'}`}>
                    {whatsappAlerts ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={whatsappAlerts}
                onClick={() => updateAlertChannelPreference('whatsapp', !whatsappAlerts)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#0C3830] focus:ring-offset-2 ${
                  whatsappAlerts ? 'bg-[#0C3830]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    whatsappAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-[#E2E9E2] p-4 rounded-2xl shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">Total Feed</span>
          <span className="text-2xl font-black text-[#1A2D27] font-mono mt-1 block">{totalCount}</span>
        </div>

        <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase text-rose-800 tracking-wider block">Critical Risk</span>
            {criticalCount > 0 && <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />}
          </div>
          <span className="text-2xl font-black text-rose-950 font-mono mt-1 block">{criticalCount}</span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-amber-800 tracking-wider block">Warnings</span>
          <span className="text-2xl font-black text-amber-950 font-mono mt-1 block">{warningCount}</span>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider block">Unread Alerts</span>
          <span className="text-2xl font-black text-[#0C3830] font-mono mt-1 block">{unreadCount}</span>
        </div>
      </div>

      {/* Filter Toolbar Container */}
      <div className="bg-white border border-[#E2E9E2] p-5 rounded-3xl shadow-2xs space-y-4">
        {/* Search Input inside filter bar */}
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search alerts by produce, batch, zone, or keyword..."
            className="w-full pl-10 pr-9 py-2 bg-[#F4F6F4] border border-[#E2E9E2] rounded-full text-xs font-medium text-[#1A2D27] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0C3830] transition-all"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Clean, Streamlined Single-Row Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
          {/* Main Quick Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {(
              [
                { id: 'all', label: 'All Alerts' },
                { id: 'unread', label: `Unread (${unreadCount})` },
                { id: 'read', label: 'Read' },
              ] as const
            ).map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
                  statusFilter === f.id
                    ? 'bg-[#0C3830] text-white shadow-xs'
                    : 'bg-[#F4F6F4] text-[#1A2D27] hover:bg-gray-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Compact Dropdown Filters */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Severity Dropdown */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs font-extrabold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical Risk</option>
              <option value="warning">Warning</option>
              <option value="info">Info</option>
            </select>

            {/* Category Dropdown */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-3 py-1.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs font-extrabold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
            >
              <option value="all">All Categories</option>
              <option value="spoilage">Spoilage Risk</option>
              <option value="breach">Temp Breach</option>
              <option value="pickup">Pickup Reminder</option>
              <option value="confirmation">Storage Confirmation</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chronological Feed of Alert Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold text-[#1A2D27] uppercase tracking-wider">
            Alert Feed ({filteredAlerts.length})
          </h2>
          <span className="text-xs text-[#5C736A] font-semibold">Chronological order</span>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className="bg-white border border-[#E2E9E2] p-12 rounded-3xl text-center space-y-3">
            <div className="w-12 h-12 bg-[#F4F6F4] rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Bell size={24} />
            </div>
            <h3 className="font-extrabold text-base text-[#1A2D27]">No Alerts Match Your Filter</h3>
            <p className="text-xs text-[#5C736A] max-w-sm mx-auto">
              Try adjusting your search keywords, severity selection, or status filters above.
            </p>
            <button
              onClick={() => {
                setStatusFilter('all');
                setSeverityFilter('all');
                setTypeFilter('all');
                setLocalSearch('');
              }}
              className="mt-2 px-4 py-2 bg-[#0C3830] text-white rounded-full text-xs font-extrabold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const style = getSeverityStyle(alert.severity, alert.read);
            const alertIcon = getAlertIcon(alert);

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-3xl border transition-all duration-200 relative ${style.cardBg}`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left Icon & Main Content */}
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className={`p-3 rounded-2xl shrink-0 ${style.iconBg}`}>
                      {alertIcon}
                    </div>

                    <div className="space-y-1.5 flex-1">
                      {/* Top Badges & Title */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${style.badgeBg}`}>
                          {style.badgeText}
                        </span>

                        {alert.zoneOrBatchId && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold font-mono bg-white border border-[#E2E9E2] text-[#1A2D27]">
                            {alert.zoneOrBatchId}
                          </span>
                        )}

                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-rose-500" title="Unread" />
                        )}
                      </div>

                      <h3 className="font-extrabold text-sm sm:text-base text-[#1A2D27] leading-tight">
                        {alert.title}
                      </h3>

                      {/* Message */}
                      <p className="text-xs sm:text-sm font-medium text-[#2A2A2A] leading-relaxed">
                        {alert.message}
                      </p>

                      {/* Footer Info & Actions */}
                      <div className="flex items-center justify-between pt-2 flex-wrap gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-[#5C736A] font-semibold text-[11px]">
                          <Clock size={13} />
                          <span>{alert.timestamp}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {onToggleRead && (
                            <button
                              onClick={() => onToggleRead(alert.id)}
                              className="text-[11px] font-extrabold text-[#0C3830] hover:underline flex items-center gap-1 bg-white/80 px-2.5 py-1 rounded-full border border-[#E2E9E2]"
                            >
                              {alert.read ? (
                                <>
                                  <EyeOff size={12} />
                                  <span>Mark Unread</span>
                                </>
                              ) : (
                                <>
                                  <Eye size={12} />
                                  <span>Mark Read</span>
                                </>
                              )}
                            </button>
                          )}

                          {alert.zoneOrBatchId?.startsWith('#BATCH') && onSelectBatchDetails && (
                            <button
                              onClick={() => onSelectBatchDetails(alert.zoneOrBatchId!)}
                              className="text-[11px] font-extrabold text-[#0C3830] hover:underline flex items-center gap-1 bg-[#DCEBBA] px-2.5 py-1 rounded-full"
                            >
                              <span>View Batch</span>
                              <ChevronRight size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
