import React, { useState } from 'react';
import {
  X,
  Navigation,
  CheckCircle2,
  Clock,
  Fuel,
  CreditCard,
  ShieldCheck,
  AlertTriangle,
  Flame,
  ArrowRight,
  Truck,
  MapPin,
} from 'lucide-react';
import { Shipment, RouteOption, Role, Language } from '../../types';
import { getRouteOptionsForShipment } from '../../data/mockData';

interface RouteOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipment: Shipment | null;
  onSelectRoute: (shipmentId: string, routeOptionId: string) => void;
  role?: Role;
  lang?: Language;
}

export const RouteOptimizerModal: React.FC<RouteOptimizerModalProps> = ({
  isOpen,
  onClose,
  shipment,
  onSelectRoute,
  role = 'farmer',
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  if (!isOpen || !shipment) return null;

  const routeOptions = getRouteOptionsForShipment(shipment);
  const activeRouteId = selectedRouteId || shipment.routeOptionId || routeOptions[0]?.id;

  const isFarmer = role === 'farmer';
  const primaryBg = isFarmer ? 'bg-[#0C3830]' : 'bg-[#364C84]';
  const primaryHover = isFarmer ? 'hover:bg-[#082822]' : 'hover:bg-[#283b6b]';
  const headerGradient = isFarmer
    ? 'from-[#0C3830] to-[#164e43]'
    : 'from-[#364C84] to-[#123E5E]';

  const handleApplyRoute = (routeId: string) => {
    setSelectedRouteId(routeId);
    onSelectRoute(shipment.id, routeId);
    onClose();
  };

  const getRiskBadge = (risk: RouteOption['riskLevel']) => {
    switch (risk) {
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#DCEBBA] text-[#0C3830]">
            <ShieldCheck size={13} />
            <span>Low Spoilage Risk</span>
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
            <AlertTriangle size={13} />
            <span>Moderate Spoilage Risk</span>
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-[#E15554] text-white">
            <Flame size={13} />
            <span>High Spoilage Risk</span>
          </span>
        );
    }
  };

  return (
    <div
      id="route-optimizer-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden flex flex-col my-auto max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className={`p-6 sm:p-7 bg-gradient-to-r ${headerGradient} text-white flex items-center justify-between`}>
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <Navigation className="text-white" size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white">
                  Route Intelligence
                </span>
                <span className="text-xs text-white/80 font-mono">{shipment.id}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                Cold-Chain Route Optimizer
              </h2>
            </div>
          </div>
          <button
            id="close-route-optimizer-modal-btn"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Shipment Overview Bar */}
        <div className="bg-[#FFFDF5] border-b border-[#E2E9E2] px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-[#1A2D27]">
              <Truck size={15} className="text-[#5C736A]" />
              <span>{shipment.commodity}</span>
              <span className="text-[#5C736A]">({shipment.quantityKg.toLocaleString()} kg)</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-gray-100 font-semibold text-[#2A2A2A]">
              {shipment.vehicleType}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#5C736A] font-medium">
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-[#0C3830]" />
              <span className="font-semibold text-[#2A2A2A]">{shipment.originName.split(',')[0]}</span>
            </div>
            <ArrowRight size={13} />
            <div className="flex items-center gap-1">
              <MapPin size={13} className="text-[#0C3830]" />
              <span className="font-semibold text-[#2A2A2A]">{shipment.destinationName.split('(')[0]}</span>
            </div>
          </div>
        </div>

        {/* Modal Body: Route Options Grid */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 flex-1 bg-[#FFFDF5]">
          <div>
            <h3 className="text-base font-extrabold text-[#1A2D27]">
              Available Transit Corridors
            </h3>
            <p className="text-xs text-[#5C736A] font-medium mt-0.5">
              Select the optimal route based on speed, spoilage vulnerability, toll charges, and road conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {routeOptions.map((opt, index) => {
              const isSelected = activeRouteId === opt.id;
              const isCurrentShipmentRoute = shipment.routeOptionId === opt.id;

              return (
                <div
                  key={opt.id}
                  id={`route-option-card-${opt.id}`}
                  onClick={() => setSelectedRouteId(opt.id)}
                  className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between relative shadow-xs ${
                    isSelected
                      ? isFarmer
                        ? 'border-[#0C3830] bg-[#DCEBBA]/25 ring-2 ring-[#0C3830]/20'
                        : 'border-[#364C84] bg-[#95B1EE]/20 ring-2 ring-[#364C84]/20'
                      : 'border-gray-200/90 bg-white hover:border-gray-300'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-[#2A2A2A] font-extrabold text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    {isCurrentShipmentRoute ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#0C3830] text-white">
                        Active Route
                      </span>
                    ) : isSelected ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#BBD38B] text-[#0C3830]">
                        Selected
                      </span>
                    ) : null}
                  </div>

                  {/* Title & Risk */}
                  <div className="space-y-2 mb-4">
                    <h4 className="font-extrabold text-sm sm:text-base text-[#1A2D27] leading-snug">
                      {opt.label}
                    </h4>
                    <div>{getRiskBadge(opt.riskLevel)}</div>
                  </div>

                  {/* Metrics List */}
                  <div className="space-y-2 py-3 border-y border-gray-100 text-xs">
                    <div className="flex items-center justify-between text-[#5C736A]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Navigation size={13} />
                        Distance
                      </span>
                      <span className="font-bold text-[#2A2A2A]">{opt.distanceKm} km</span>
                    </div>

                    <div className="flex items-center justify-between text-[#5C736A]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Clock size={13} />
                        Est. Duration
                      </span>
                      <span className="font-bold text-[#2A2A2A]">{opt.estimatedDurationMin} mins</span>
                    </div>

                    <div className="flex items-center justify-between text-[#5C736A]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Fuel size={13} />
                        Fuel Cost
                      </span>
                      <span className="font-bold text-[#2A2A2A]">₹{opt.estimatedFuelCost.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-[#5C736A]">
                      <span className="flex items-center gap-1.5 font-medium">
                        <CreditCard size={13} />
                        Tolls
                      </span>
                      <span className="font-bold text-[#2A2A2A]">
                        {opt.estimatedTollCost > 0 ? `₹${opt.estimatedTollCost}` : 'Free (₹0)'}
                      </span>
                    </div>
                  </div>

                  {/* Waypoints timeline */}
                  <div className="mt-3 mb-5 space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase text-[#5C736A] tracking-wider block">
                      Waypoints
                    </span>
                    <div className="space-y-1">
                      {opt.waypoints.map((wp, wIdx) => (
                        <div key={wIdx} className="flex items-center gap-1.5 text-[11px] text-[#2A2A2A]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5C736A]" />
                          <span className="truncate">{wp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    id={`select-route-btn-${opt.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyRoute(opt.id);
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                      isSelected
                        ? `${primaryBg} text-white ${primaryHover}`
                        : 'bg-white border border-gray-300 text-[#2A2A2A] hover:bg-gray-50'
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    <span>{isSelected ? 'Select This Route' : 'Choose Route'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-white border-t border-gray-200/80 px-6 py-4 flex items-center justify-between">
          <div className="text-xs text-[#5C736A] font-medium hidden sm:block">
            Routes calibrated with real-time temperature telemetry and perishability curves.
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-gray-300 text-[#2A2A2A] hover:bg-gray-50 font-bold text-xs transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
