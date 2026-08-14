import React, { useState } from 'react';
import {
  Truck,
  Thermometer,
  MapPin,
  Clock,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Sparkles,
  Search,
  Filter,
  Flame,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';
import { Shipment, Role, Language } from '../../types';
import { RouteOptimizerModal } from './RouteOptimizerModal';
import { translations } from '../../i18n/translations';

interface LogisticsTrackingScreenProps {
  shipments: Shipment[];
  role: Role;
  lang: Language;
  onUpdateRouteOption: (shipmentId: string, routeOptionId: string) => void;
  searchQuery?: string;
}

export const LogisticsTrackingScreen: React.FC<LogisticsTrackingScreenProps> = ({
  shipments,
  role,
  lang,
  onUpdateRouteOption,
  searchQuery = '',
}) => {
  const t = translations[lang];
  const isFarmer = role === 'farmer';

  const [expandedShipmentId, setExpandedShipmentId] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'in_transit' | 'delayed' | 'temp_breach' | 'delivered'>('all');
  const [activeOptimizerShipment, setActiveOptimizerShipment] = useState<Shipment | null>(null);

  // Role Color Palette tokens
  const primaryBg = isFarmer ? 'bg-[#0C3830]' : 'bg-[#364C84]';
  const primaryHover = isFarmer ? 'hover:bg-[#082822]' : 'hover:bg-[#283b6b]';
  const primaryText = isFarmer ? 'text-[#0C3830]' : 'text-[#364C84]';
  const accentLightBg = isFarmer ? 'bg-[#DCEBBA]' : 'bg-[#95B1EE]/30';
  const accentBorder = isFarmer ? 'border-[#E2E9E2]' : 'border-[#95B1EE]/40';

  const toggleExpand = (id: string) => {
    setExpandedShipmentId((prev) => (prev === id ? null : id));
  };

  // Filter shipments by search query and active status filter
  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      !searchQuery ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.originName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destinationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.batchId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedFilter === 'all' || s.status === selectedFilter;

    return matchesSearch && matchesStatus;
  });

  // Overview stats
  const totalActive = shipments.filter((s) => s.status === 'in_transit' || s.status === 'delayed' || s.status === 'temp_breach').length;
  const totalVolumeKg = shipments.reduce((sum, s) => sum + s.quantityKg, 0);
  const breachesCount = shipments.filter((s) => s.status === 'temp_breach').length;
  const deliveredCount = shipments.filter((s) => s.status === 'delivered').length;

  const getStatusBadge = (status: Shipment['status']) => {
    switch (status) {
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#0C3830] text-white">
            <span className="w-2 h-2 rounded-full bg-[#BBD38B] animate-ping" />
            <span>In Transit</span>
          </span>
        );
      case 'delayed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-white">
            <Clock size={12} />
            <span>Delayed</span>
          </span>
        );
      case 'temp_breach':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#E15554] text-white animate-pulse">
            <Flame size={12} />
            <span>Temp Breach</span>
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#BBD38B] text-[#0C3830]">
            <CheckCircle2 size={12} />
            <span>Delivered</span>
          </span>
        );
      case 'preparing':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gray-100 text-[#2A2A2A]">
            <span>Preparing</span>
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Operations Header */}
      <div className={`bg-white p-6 sm:p-8 rounded-3xl border ${accentBorder} shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6`}>
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${accentLightBg} ${primaryText}`}>
              Cold-Chain Logistics & Telemetry
            </span>
            <span className="text-xs text-[#5C736A] font-semibold">Live GPS & Reefer Tracking</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A2D27] tracking-tight">
            {isFarmer ? 'Produce Transit & Route Fleet' : 'Facility Ingress & Egress Logistics'}
          </h1>
          <p className="text-xs sm:text-sm text-[#5C736A] font-medium mt-1">
            {isFarmer
              ? 'Real-time multi-sensor monitoring for farm-to-storage & market dispatch shipments'
              : 'Monitor temperature-controlled vehicle arrivals, chamber transfers, and dispatches'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 bg-[#FFFDF5] rounded-2xl border border-[#E2E9E2] text-center min-w-[110px]">
            <span className="text-[10px] font-extrabold text-[#5C736A] uppercase tracking-wider block">
              Active Fleet
            </span>
            <span className="text-xl font-black text-[#1A2D27]">{totalActive} Vehicles</span>
          </div>
          <div className="px-4 py-3 bg-[#FFFDF5] rounded-2xl border border-[#E2E9E2] text-center min-w-[110px]">
            <span className="text-[10px] font-extrabold text-[#5C736A] uppercase tracking-wider block">
              In-Transit Mass
            </span>
            <span className="text-xl font-black text-[#1A2D27]">{(totalVolumeKg / 1000).toFixed(1)} MT</span>
          </div>
        </div>
      </div>

      {/* Operational Key Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 rounded-3xl border border-[#E2E9E2] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5C736A] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active In-Transit</span>
            <Truck size={16} className={primaryText} />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1A2D27]">{totalActive}</div>
          <span className="text-[11px] text-[#5C736A] font-medium mt-1">Live tracking active</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E9E2] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5C736A] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Completed Trips</span>
            <CheckCircle2 size={16} className="text-[#0C3830]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1A2D27]">{deliveredCount}</div>
          <span className="text-[11px] text-[#5C736A] font-medium mt-1">Successfully stored/sold</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E9E2] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5C736A] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Temp Breaches</span>
            <Flame size={16} className="text-[#E15554]" />
          </div>
          <div className={`text-2xl sm:text-3xl font-black ${breachesCount > 0 ? 'text-[#E15554]' : 'text-[#1A2D27]'}`}>
            {breachesCount}
          </div>
          <span className="text-[11px] text-[#5C736A] font-medium mt-1">
            {breachesCount > 0 ? 'Requires immediate action' : '100% compliant fleet'}
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E2E9E2] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#5C736A] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Reefer Temp</span>
            <Thermometer size={16} className="text-[#5C736A]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1A2D27]">
            {shipments.length > 0
              ? `${(shipments.reduce((acc, s) => acc + s.currentTempC, 0) / shipments.length).toFixed(1)}°C`
              : '--'}
          </div>
          <span className="text-[11px] text-[#5C736A] font-medium mt-1">Target range: 0–12°C</span>
        </div>
      </div>

      {/* Filter Tabs & Search Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: `All Shipments (${shipments.length})` },
              { id: 'in_transit', label: 'In Transit' },
              { id: 'delayed', label: 'Delayed' },
              { id: 'temp_breach', label: 'Temp Breach' },
              { id: 'delivered', label: 'Delivered' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              id={`filter-shipment-${tab.id}`}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedFilter === tab.id
                  ? `${primaryBg} text-white shadow-xs`
                  : 'bg-white text-[#5C736A] hover:text-[#1A2D27] border border-[#E2E9E2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {searchQuery && (
          <span className="text-xs text-[#5C736A] font-semibold">
            Filtered by: &ldquo;{searchQuery}&rdquo; ({filteredShipments.length} found)
          </span>
        )}
      </div>

      {/* Shipment Cards List */}
      <div className="space-y-4">
        {filteredShipments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E2E9E2] shadow-2xs space-y-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-[#5C736A]">
              <Truck size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#1A2D27]">No Shipments Found</h3>
            <p className="text-xs text-[#5C736A] max-w-sm mx-auto">
              No cold-chain shipments match your current filter or search criteria.
            </p>
          </div>
        ) : (
          filteredShipments.map((shipment) => {
            const isExpanded = expandedShipmentId === shipment.id;
            const tempDiff = Math.abs(shipment.currentTempC - shipment.targetTempC);
            const isTempBreached = shipment.status === 'temp_breach' || tempDiff > 3.0;

            return (
              <div
                key={shipment.id}
                id={`shipment-card-${shipment.id}`}
                className={`bg-white rounded-3xl border transition-all duration-200 overflow-hidden shadow-xs hover:border-gray-300 ${
                  isTempBreached ? 'border-red-300 ring-1 ring-red-200' : 'border-[#E2E9E2]'
                }`}
              >
                {/* Main Card Row */}
                <div
                  onClick={() => toggleExpand(shipment.id)}
                  className="p-5 sm:p-6 cursor-pointer hover:bg-gray-50/50 transition-colors space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Commodity & Identification */}
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isTempBreached ? 'bg-rose-100 text-rose-700' : `${accentLightBg} ${primaryText}`
                      }`}>
                        <Truck size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-[#5C736A]">{shipment.id}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs font-semibold text-[#5C736A]">{shipment.batchId}</span>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gray-100 text-[#2A2A2A]">
                            {shipment.vehicleType}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-black text-[#1A2D27] mt-0.5">
                          {shipment.commodity} • {shipment.quantityKg.toLocaleString()} kg
                        </h3>
                      </div>
                    </div>

                    {/* Right side: Status Badge, Temperature, Expand Indicator */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6">
                      {/* Live Temp Badge */}
                      <div
                        className={`px-3.5 py-1.5 rounded-2xl border text-xs flex items-center gap-2 ${
                          isTempBreached
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        }`}
                      >
                        <Thermometer size={15} className={isTempBreached ? 'text-rose-600' : 'text-emerald-700'} />
                        <div>
                          <span className="font-extrabold text-sm block leading-none">
                            {shipment.currentTempC.toFixed(1)}°C
                          </span>
                          <span className="text-[10px] text-[#5C736A] font-semibold">
                            Target: {shipment.targetTempC.toFixed(1)}°C
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div>{getStatusBadge(shipment.status)}</div>

                      {/* Expand Chevron */}
                      <button
                        id={`toggle-expand-${shipment.id}`}
                        type="button"
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#2A2A2A] transition-transform"
                        aria-label="Expand details"
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Route & Progress Bar */}
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#5C736A] font-medium gap-1">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-[#0C3830] shrink-0" />
                        <span className="font-bold text-[#1A2D27]">{shipment.originName}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-[#5C736A]">
                        <ArrowRight size={13} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 size={13} className="text-[#0C3830] shrink-0" />
                        <span className="font-bold text-[#1A2D27]">{shipment.destinationName}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative pt-1">
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            isTempBreached
                              ? 'bg-rose-500'
                              : shipment.status === 'delivered'
                              ? 'bg-[#BBD38B]'
                              : isFarmer
                              ? 'bg-[#0C3830]'
                              : 'bg-[#364C84]'
                          }`}
                          style={{ width: `${shipment.currentProgressPct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-semibold text-[#5C736A] mt-1">
                        <span>Departed: {shipment.departureTimestamp}</span>
                        <span className="font-bold text-[#1A2D27]">
                          {shipment.currentProgressPct}% Completed
                        </span>
                        <span>ETA: {shipment.estimatedArrivalTimestamp}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="bg-[#FFFDF5] border-t border-[#E2E9E2] p-5 sm:p-7 space-y-6 animate-in fade-in duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Driver & Vehicle Information */}
                      <div className="bg-white p-4 rounded-2xl border border-[#E2E9E2] shadow-2xs space-y-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5C736A] block">
                          Assigned Driver & Transport
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm text-[#1A2D27]">
                            {shipment.driverName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-sm text-[#1A2D27]">{shipment.driverName}</h4>
                            <p className="text-xs text-[#5C736A] font-medium">{shipment.vehicleType}</p>
                          </div>
                        </div>
                        <a
                          href={`tel:${shipment.driverPhone}`}
                          className="inline-flex items-center gap-2 text-xs font-bold text-[#0C3830] bg-[#DCEBBA]/40 hover:bg-[#DCEBBA] px-3.5 py-2 rounded-xl transition-all w-full justify-center"
                        >
                          <Phone size={13} />
                          <span>Call Driver ({shipment.driverPhone})</span>
                        </a>
                      </div>

                      {/* Cold-Chain Compliance Telemetry */}
                      <div className="bg-white p-4 rounded-2xl border border-[#E2E9E2] shadow-2xs space-y-3">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5C736A] block">
                          Reefer Telemetry & Health
                        </span>
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between text-[#5C736A]">
                            <span>Current Sensor Temp:</span>
                            <span className="font-bold text-[#1A2D27]">{shipment.currentTempC.toFixed(1)}°C</span>
                          </div>
                          <div className="flex justify-between text-[#5C736A]">
                            <span>Recommended Target:</span>
                            <span className="font-bold text-[#1A2D27]">{shipment.targetTempC.toFixed(1)}°C</span>
                          </div>
                          <div className="flex justify-between text-[#5C736A]">
                            <span>Chamber Compliance:</span>
                            <span className={`font-bold ${isTempBreached ? 'text-rose-600' : 'text-emerald-700'}`}>
                              {isTempBreached ? 'Breach Detected' : 'Optimal Compliance'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Route Selection & Optimization Action */}
                      <div className="bg-white p-4 rounded-2xl border border-[#E2E9E2] shadow-2xs space-y-3 flex flex-col justify-between">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5C736A] block">
                            Active Corridor
                          </span>
                          <div className="flex items-center gap-2 mt-1">
                            <Navigation size={14} className={primaryText} />
                            <span className="font-extrabold text-xs text-[#1A2D27]">
                              {shipment.routeOptionId || 'Default Transit Corridor'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#5C736A] mt-1">
                            Optimize for road surface quality and cold-corridor efficiency.
                          </p>
                        </div>

                        <button
                          id={`view-route-options-btn-${shipment.id}`}
                          type="button"
                          onClick={() => setActiveOptimizerShipment(shipment)}
                          className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-2 text-white ${primaryBg} ${primaryHover} transition-all shadow-xs`}
                        >
                          <Sparkles size={14} />
                          <span>View Route Options</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Route Optimizer Modal */}
      <RouteOptimizerModal
        isOpen={!!activeOptimizerShipment}
        onClose={() => setActiveOptimizerShipment(null)}
        shipment={activeOptimizerShipment}
        onSelectRoute={onUpdateRouteOption}
        role={role}
        lang={lang}
      />
    </div>
  );
};
