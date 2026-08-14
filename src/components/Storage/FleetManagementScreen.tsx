import React, { useState } from 'react';
import {
  Truck,
  MapPin,
  Thermometer,
  Phone,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Fuel,
  Navigation,
  Sparkles,
  Search,
  Filter,
  Plus,
} from 'lucide-react';
import { Vehicle, Role, Language } from '../../types';

interface FleetManagementScreenProps {
  vehicles: Vehicle[];
  role?: Role;
  lang?: Language;
  onOpenOptimizer?: (vehicleId: string) => void;
}

export const FleetManagementScreen: React.FC<FleetManagementScreenProps> = ({
  vehicles,
  role = 'storage',
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'on_route' | 'available' | 'maintenance'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isStorage = role === 'storage';
  const primaryBg = isStorage ? 'bg-[#364C84]' : 'bg-[#0C3830]';
  const primaryHover = isStorage ? 'hover:bg-[#283b6b]' : 'hover:bg-[#082822]';
  const primaryText = isStorage ? 'text-[#364C84]' : 'text-[#0C3830]';
  const accentLight = isStorage ? 'bg-[#95B1EE]/20 text-[#364C84]' : 'bg-[#DCEBBA] text-[#0C3830]';

  const filteredVehicles = vehicles.filter((v) => {
    const matchesFilter = selectedFilter === 'all' || v.status === selectedFilter;
    const matchesSearch =
      !searchQuery ||
      v.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.currentLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const countOnRoute = vehicles.filter((v) => v.status === 'on_route').length;
  const countAvailable = vehicles.filter((v) => v.status === 'available').length;
  const countMaintenance = vehicles.filter((v) => v.status === 'maintenance').length;
  const totalCapacityKg = vehicles.reduce((sum, v) => sum + v.capacityKg, 0);

  const getStatusBadge = (status: Vehicle['status']) => {
    switch (status) {
      case 'on_route':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-[#364C84] text-white">
            <span className="w-2 h-2 rounded-full bg-[#95B1EE] animate-ping" />
            <span>On Route</span>
          </span>
        );
      case 'available':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-200">
            <CheckCircle2 size={12} className="text-emerald-700" />
            <span>Available</span>
          </span>
        );
      case 'maintenance':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-200">
            <Wrench size={12} className="text-amber-700" />
            <span>Maintenance</span>
          </span>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Operations Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider ${accentLight}`}>
              Cold Fleet Operations
            </span>
            <span className="text-xs text-gray-500 font-semibold">Reefer Truck & Van Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A2A2A] tracking-tight">
            Refrigerated Fleet Management
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            Real-time GPS tracking, active payload temperatures, driver dispatch, and vehicle maintenance status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-3 bg-[#FFFDF5] rounded-2xl border border-gray-200 text-center min-w-[110px]">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
              Total Fleet
            </span>
            <span className="text-xl font-black text-[#2A2A2A]">{vehicles.length} Units</span>
          </div>
          <div className="px-4 py-3 bg-[#FFFDF5] rounded-2xl border border-gray-200 text-center min-w-[110px]">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">
              Fleet Payload
            </span>
            <span className="text-xl font-black text-[#364C84]">{(totalCapacityKg / 1000).toFixed(1)} MT</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active On Route</span>
            <Truck size={16} className={primaryText} />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2A2A2A]">{countOnRoute}</div>
          <span className="text-[11px] text-gray-500 font-medium mt-1">Live telematics active</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Available at Depot</span>
            <CheckCircle2 size={16} className="text-emerald-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-800">{countAvailable}</div>
          <span className="text-[11px] text-gray-500 font-medium mt-1">Ready for dispatch</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">In Maintenance</span>
            <Wrench size={16} className="text-amber-700" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-800">{countMaintenance}</div>
          <span className="text-[11px] text-gray-500 font-medium mt-1">Chamber servicing</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg Reefer Telemetry</span>
            <Thermometer size={16} className="text-[#364C84]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2A2A2A]">
            {vehicles.filter((v) => v.currentTempC !== undefined).length > 0
              ? `${(
                  vehicles.reduce((acc, v) => acc + (v.currentTempC || 0), 0) /
                  vehicles.filter((v) => v.currentTempC !== undefined).length
                ).toFixed(1)}°C`
              : '4.0°C'}
          </div>
          <span className="text-[11px] text-gray-500 font-medium mt-1">Across reefer units</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: `All Vehicles (${vehicles.length})` },
              { id: 'on_route', label: `On Route (${countOnRoute})` },
              { id: 'available', label: `Available (${countAvailable})` },
              { id: 'maintenance', label: `Maintenance (${countMaintenance})` },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              id={`filter-vehicle-${tab.id}`}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                selectedFilter === tab.id
                  ? `${primaryBg} text-white shadow-xs`
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-[240px]">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search vehicle #, driver, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-full border border-gray-200 text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#364C84]/20"
          />
        </div>
      </div>

      {/* Vehicle Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVehicles.length === 0 ? (
          <div className="col-span-full bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-xs space-y-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto flex items-center justify-center text-gray-500">
              <Truck size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-800">No Vehicles Found</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              No fleet vehicles matched your search or status filter.
            </p>
          </div>
        ) : (
          filteredVehicles.map((vehicle) => {
            const hasTempBreach =
              vehicle.currentTempC !== undefined &&
              vehicle.targetTempC !== undefined &&
              Math.abs(vehicle.currentTempC - vehicle.targetTempC) > 3.0;

            return (
              <div
                key={vehicle.id}
                id={`vehicle-card-${vehicle.id}`}
                className={`bg-white rounded-3xl border p-5 sm:p-6 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between gap-4 ${
                  hasTempBreach ? 'border-red-300 ring-1 ring-red-200' : 'border-gray-200/80'
                }`}
              >
                {/* Top: Registration Number & Status */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-gray-400">{vehicle.id}</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-gray-100 text-gray-700">
                          {vehicle.type}
                        </span>
                      </div>
                      <h3 className="text-base font-black text-[#2A2A2A]">{vehicle.registrationNumber}</h3>
                      <p className="text-xs text-gray-500 font-medium">{vehicle.model}</p>
                    </div>

                    <div>{getStatusBadge(vehicle.status)}</div>
                  </div>

                  {/* Driver & Current Location Info Block */}
                  <div className="p-3.5 bg-[#FFFDF5] rounded-2xl border border-gray-100 space-y-2">
                    {/* Driver details */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-700">
                          {vehicle.driverName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-gray-800 block leading-tight">{vehicle.driverName}</span>
                          <span className="text-[11px] text-gray-500 font-mono">{vehicle.driverPhone}</span>
                        </div>
                      </div>
                      <a
                        href={`tel:${vehicle.driverPhone}`}
                        className="p-2 rounded-xl bg-white border border-gray-200 text-[#364C84] hover:bg-blue-50 transition-colors"
                        title="Call Driver"
                      >
                        <Phone size={13} />
                      </a>
                    </div>

                    {/* Prominent Current Location Line with MapPin Icon */}
                    <div className="pt-1.5 border-t border-gray-200/60 flex items-center gap-1.5 text-xs">
                      <MapPin size={14} className="text-[#364C84] shrink-0" />
                      <span className="text-gray-500 font-medium">Location:</span>
                      <span className="font-bold text-[#2A2A2A] truncate" title={vehicle.currentLocation}>
                        {vehicle.currentLocation}
                      </span>
                    </div>
                  </div>

                  {/* Telemetry & Destination Info */}
                  <div className="space-y-2 text-xs">
                    {/* Payload Capacity & Fuel */}
                    <div className="flex items-center justify-between text-gray-500">
                      <span>Max Payload:</span>
                      <span className="font-bold text-gray-800">
                        {vehicle.capacityKg.toLocaleString()} kg ({(vehicle.capacityKg / 1000).toFixed(1)} MT)
                      </span>
                    </div>

                    {vehicle.fuelPct !== undefined && (
                      <div className="flex items-center justify-between text-gray-500">
                        <span className="flex items-center gap-1">
                          <Fuel size={12} />
                          Fuel / Charge:
                        </span>
                        <div className="flex items-center gap-1.5">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                vehicle.fuelPct < 25
                                  ? 'bg-red-500'
                                  : vehicle.fuelPct < 50
                                  ? 'bg-amber-500'
                                  : 'bg-emerald-500'
                              }`}
                              style={{ width: `${vehicle.fuelPct}%` }}
                            />
                          </div>
                          <span className="font-bold text-gray-800">{vehicle.fuelPct}%</span>
                        </div>
                      </div>
                    )}

                    {/* Temperature Indicator */}
                    {vehicle.currentTempC !== undefined && (
                      <div
                        className={`p-2.5 rounded-xl border flex items-center justify-between ${
                          hasTempBreach
                            ? 'bg-rose-50 border-rose-200 text-rose-800'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        }`}
                      >
                        <div className="flex items-center gap-1.5">
                          <Thermometer size={14} className={hasTempBreach ? 'text-rose-600' : 'text-emerald-700'} />
                          <span className="font-semibold text-[11px]">Reefer Chamber:</span>
                        </div>
                        <div className="font-bold text-xs">
                          <span>{vehicle.currentTempC.toFixed(1)}°C</span>
                          {vehicle.targetTempC !== undefined && (
                            <span className="text-gray-500 font-normal ml-1">(Target: {vehicle.targetTempC.toFixed(1)}°C)</span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Destination & ETA if on route */}
                    {vehicle.status === 'on_route' && vehicle.destination && (
                      <div className="p-2.5 bg-blue-50/50 rounded-xl border border-blue-100 text-[11px] space-y-1">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Navigation size={12} className="text-[#364C84]" />
                          <span>Bound For:</span>
                          <span className="font-bold text-[#2A2A2A] truncate">{vehicle.destination}</span>
                        </div>
                        {vehicle.eta && (
                          <div className="flex items-center gap-1 text-[#364C84] font-semibold">
                            <Clock size={12} />
                            <span>ETA: {vehicle.eta}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                    GPS Connected
                  </span>
                  <button
                    id={`vehicle-action-btn-${vehicle.id}`}
                    type="button"
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs text-white ${primaryBg} ${primaryHover} transition-all shadow-2xs`}
                  >
                    {vehicle.status === 'on_route' ? 'Track Route' : 'Dispatch Unit'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
