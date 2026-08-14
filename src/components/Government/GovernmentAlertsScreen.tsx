import React, { useState } from 'react';
import {
  Bell,
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Send,
  Sparkles,
  Search,
  Filter,
  ArrowUpRight,
  Landmark,
  Radio,
  FileText,
  Clock,
} from 'lucide-react';
import { SystemAlert } from '../../types';

interface GovernmentAlertsScreenProps {
  alerts: SystemAlert[];
  onBroadcastAdvisory?: (message: string, district: string) => void;
}

export const GovernmentAlertsScreen: React.FC<GovernmentAlertsScreenProps> = ({
  alerts,
  onBroadcastAdvisory,
}) => {
  const [severityFilter, setSeverityFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastTarget, setBroadcastTarget] = useState('All Perishable Clusters (Nashik, Junnar, Ahmednagar)');
  const [broadcastMsg, setBroadcastMsg] = useState(
    'ADVISORY: Junnar cold storage units at 88% capacity. Transport tomato harvest to Sahyadri Cold Hub Dindori to preserve shelf-life.'
  );
  const [broadcastSent, setBroadcastSent] = useState(false);

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
    const matchesSearch =
      !searchQuery ||
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const criticalCount = alerts.filter((a) => a.severity === 'critical').length;
  const warningCount = alerts.filter((a) => a.severity === 'warning').length;

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    onBroadcastAdvisory?.(broadcastMsg, broadcastTarget);
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastModalOpen(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#EFD17F] text-[#3A2E1F]">
              Emergency Protocol & Compliance
            </span>
            <span className="text-xs text-gray-500 font-semibold">District Agri Inspector Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A2A2A] tracking-tight">
            Government Compliance & Spoilage Alerts
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Real-time cold chain temperature breaches, district harvest saturation alarms, and official farmer advisories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setBroadcastModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-[#3A2E1F] hover:bg-[#2A2116] text-[#EFD17F] font-extrabold text-xs flex items-center gap-2 shadow-md transition-all group"
          >
            <Radio size={16} className="text-[#EFD17F] group-hover:scale-110 transition-transform" />
            <span>Broadcast Farmer Advisory</span>
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Critical Breaches</span>
            <AlertTriangle size={16} className="text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600">{criticalCount}</div>
          <span className="text-[11px] text-rose-700 font-semibold mt-1">Inspector Action Dispatched</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Capacity Warnings</span>
            <Bell size={16} className="text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-700">{warningCount}</div>
          <span className="text-[11px] text-amber-700 font-semibold mt-1">Nearing 85%+ saturation</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Advisories Issued (MTD)</span>
            <Radio size={16} className="text-[#3A2E1F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#3A2E1F]">18</div>
          <span className="text-[11px] text-gray-500 font-medium mt-1">Via SMS & AgriCool Push</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Resolution Time</span>
            <Clock size={16} className="text-[#3A2E1F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2A2A2A]">2.4 hrs</div>
          <span className="text-[11px] text-emerald-700 font-bold mt-1">98% compliance achieved</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: `All Alerts (${alerts.length})` },
              { id: 'critical', label: `Critical (${criticalCount})` },
              { id: 'warning', label: `Warnings (${warningCount})` },
              { id: 'info', label: 'Policy & Subsidies' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSeverityFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                severityFilter === filter.id
                  ? 'bg-[#3A2E1F] text-[#EFD17F] shadow-xs'
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-[#EADDC0]'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search district alerts & messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-[#EADDC0] text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EFD17F]"
          />
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EADDC0] shadow-xs space-y-3">
            <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">All District Operations Normal</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              No regulatory breaches or cold-storage capacity warnings match your search.
            </p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const isCritical = alert.severity === 'critical';
            const isWarning = alert.severity === 'warning';

            return (
              <div
                key={alert.id}
                className={`bg-white rounded-3xl p-5 sm:p-6 border transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 ${
                  isCritical
                    ? 'border-rose-200 bg-rose-50/20'
                    : isWarning
                    ? 'border-amber-200 bg-amber-50/20'
                    : 'border-[#EADDC0] bg-white'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl shrink-0 ${
                      isCritical
                        ? 'bg-rose-100 text-rose-700'
                        : isWarning
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-[#EFD17F]/30 text-[#3A2E1F]'
                    }`}
                  >
                    {isCritical ? (
                      <AlertTriangle size={24} />
                    ) : isWarning ? (
                      <Bell size={24} />
                    ) : (
                      <Landmark size={24} />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-gray-400">{alert.id}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800'
                            : isWarning
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-[#EFD17F] text-[#3A2E1F]'
                        }`}
                      >
                        {alert.severity.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-gray-400 font-medium">• {alert.timestamp}</span>
                    </div>

                    <h3 className="text-base font-extrabold text-[#2A2A2A]">{alert.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">{alert.message}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => {
                      setBroadcastMsg(`OFFICIAL NOTICE: Regarding ${alert.title} - Inspect cold storage temperatures immediately.`);
                      setBroadcastModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#3A2E1F] text-[#EFD17F] hover:bg-[#2A2116] font-bold text-xs shadow-2xs transition-all flex items-center gap-1.5"
                  >
                    <Radio size={13} />
                    <span>Issue Advisory</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Broadcast Advisory Modal */}
      {broadcastModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EADDC0] p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in duration-200">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-[#EFD17F] text-[#3A2E1F]">
                  State Agri Extension Service
                </span>
                <h3 className="text-xl font-black text-[#2A2A2A]">Broadcast Farmer Advisory</h3>
              </div>
              <button
                onClick={() => setBroadcastModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-xl"
              >
                ✕
              </button>
            </div>

            {broadcastSent ? (
              <div className="p-6 bg-emerald-50 rounded-2xl text-center space-y-2 border border-emerald-200">
                <CheckCircle2 size={32} className="text-emerald-700 mx-auto" />
                <h4 className="font-extrabold text-emerald-900 text-sm">Advisory Dispatched Successfully!</h4>
                <p className="text-xs text-emerald-700">
                  Broadcast transmitted to 1,420 registered farmers & 51 cold storage operators via SMS and WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendBroadcast} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Target Region / Perishable Corridor</label>
                  <input
                    type="text"
                    value={broadcastTarget}
                    onChange={(e) => setBroadcastTarget(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FFFDF5] rounded-2xl border border-[#EADDC0] text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFD17F]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700">Official Advisory Message (English, Hindi & Marathi)</label>
                  <textarea
                    rows={4}
                    value={broadcastMsg}
                    onChange={(e) => setBroadcastMsg(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FFFDF5] rounded-2xl border border-[#EADDC0] text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#EFD17F]"
                  />
                  <span className="text-[10px] text-gray-400">
                    Will be auto-translated to Marathi and Hindi on receipt.
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setBroadcastModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#3A2E1F] text-[#EFD17F] hover:bg-[#2A2116] text-xs font-extrabold flex items-center gap-2 shadow-md"
                  >
                    <Send size={14} />
                    <span>Send Regional Broadcast</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
