import React, { useState } from 'react';
import {
  Warehouse,
  Plus,
  AlertTriangle,
  TrendingUp,
  Package,
  Clock,
  CheckCircle2,
  Bell,
  Thermometer,
  Layers,
  Inbox,
  Database,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  DollarSign,
  Droplets,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StorageZone, InventoryItem, StorageRequest, SystemAlert } from '../../types';
import { LiveSensorsCard } from './LiveSensorsCard';
import { RequestCards } from './RequestCards';
import { InventoryTable } from './InventoryTable';
import { BatchSegregationMatrix } from '../BatchSegregationMatrix';

interface StorageOwnerDashboardProps {
  zones: StorageZone[];
  inventory: InventoryItem[];
  requests: StorageRequest[];
  alerts: SystemAlert[];
  searchQuery: string;
  onOpenAddZoneModal: () => void;
  onAcceptRequest: (id: string) => void;
  onRejectRequest: (id: string) => void;
  onSimulateTelemetry: () => void;
  activeTab: string;
}

export const StorageOwnerDashboard: React.FC<StorageOwnerDashboardProps> = ({
  zones,
  inventory,
  requests,
  alerts,
  searchQuery,
  onOpenAddZoneModal,
  onAcceptRequest,
  onRejectRequest,
  onSimulateTelemetry,
  activeTab,
}) => {
  // Occupancy data for overall facility donut chart
  const totalFacilityCapKg = zones.reduce((acc, z) => acc + z.totalCapacityKg, 0);
  const totalFacilityUsedKg = zones.reduce((acc, z) => acc + z.usedCapacityKg, 0);
  const totalUsedPct = Math.round((totalFacilityUsedKg / (totalFacilityCapKg || 1)) * 100);

  const totalRevenueAccrued = inventory.reduce((acc, item) => acc + item.storageFeeAccrued, 0);
  const pendingRequestsCount = requests.filter((r) => r.status === 'pending').length;

  const facilityDonutData = [
    { name: 'Used', value: totalFacilityUsedKg, color: '#364C84' },
    { name: 'Available', value: Math.max(0, totalFacilityCapKg - totalFacilityUsedKg), color: '#95B1EE' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/80 p-6 rounded-3xl border border-gray-200/80 shadow-xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A2A2A] tracking-tight">
            Hey Sahil,
          </h1>
          <p className="text-sm text-[#364C84] font-semibold mt-1">
            Storage Facility Operations & Real-Time Sensor Telemetry Dashboard
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onOpenAddZoneModal}
            className="bg-[#364C84] text-white px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#283863] transition-all shadow-md group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            <span>Add Zone</span>
          </button>
        </div>
      </div>

      {/* 1. Real-Time Occupancy Summary Row (Donut charts & Stat cards) */}
      {(activeTab === 'dashboard' || activeTab === 'zones') && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#2A2A2A] flex items-center gap-2">
              <Warehouse size={20} className="text-[#364C84]" />
              <span>Facility Occupancy & Storage Zone Management</span>
            </h2>
            <button
              onClick={onOpenAddZoneModal}
              className="bg-[#364C84] text-white px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-[#283863] transition-all shadow-2xs"
            >
              <Plus size={16} />
              <span>New Zone</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Donut Chart Summary Card */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex items-center gap-4">
              <div className="w-20 h-20 shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={facilityDonutData}
                      innerRadius={24}
                      outerRadius={36}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {facilityDonutData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xs text-[#364C84]">
                  {totalUsedPct}%
                </div>
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                  Facility Capacity
                </span>
                <h3 className="text-2xl font-black text-[#364C84]">{totalUsedPct}% Full</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">
                  {(totalFacilityUsedKg / 1000).toFixed(1)}t / {(totalFacilityCapKg / 1000).toFixed(1)}t
                </p>
              </div>
            </div>

            {/* Active Shipments Stat */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-[#364C84] rounded-2xl">
                <Package size={26} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                  Active Batches Stored
                </span>
                <h3 className="text-2xl font-black text-[#2A2A2A]">{inventory.length}</h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Across {zones.length} active chambers</p>
              </div>
            </div>

            {/* Storage Revenue MTD */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-700 rounded-2xl">
                <TrendingUp size={26} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                  Accrued Revenue
                </span>
                <h3 className="text-2xl font-black text-[#2A2A2A]">
                  ₹{totalRevenueAccrued.toLocaleString()}
                </h3>
                <p className="text-[11px] text-gray-500 mt-0.5">Month to date storage fees</p>
              </div>
            </div>

            {/* Pending Requests Stat */}
            <div className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-xs flex items-center gap-4">
              <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
                <Inbox size={26} />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider">
                  Pending Bookings
                </span>
                <h3 className="text-2xl font-black text-amber-800">{pendingRequestsCount}</h3>
                <p className="text-[11px] text-amber-600 font-semibold mt-0.5">Needs action</p>
              </div>
            </div>
          </div>

          {/* Storage Zones Detail Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {zones.map((z) => {
              const zoneUsedPct = Math.round((z.usedCapacityKg / z.totalCapacityKg) * 100);
              return (
                <div
                  key={z.id}
                  className="bg-white border border-gray-200/80 p-5 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold bg-blue-50 text-[#364C84] px-2 py-0.5 rounded-md">
                          {z.id}
                        </span>
                        <h4 className="font-extrabold text-base text-[#2A2A2A]">{z.name}</h4>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Recommended for: {(z.assignedCrops || z.recommendedFor || []).join(', ') || 'General Produce'}</p>
                    </div>

                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${
                        z.status === 'optimal'
                          ? 'bg-emerald-100 text-emerald-800'
                          : z.status === 'warning'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {z.currentTemp}°C / {z.targetTemp}°C
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-gray-500">Zone Occupancy</span>
                      <span className="text-[#364C84]">{zoneUsedPct}% ({z.usedCapacityKg} kg / {z.totalCapacityKg} kg)</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          zoneUsedPct > 85 ? 'bg-amber-500' : 'bg-[#364C84]'
                        }`}
                        style={{ width: `${Math.min(100, zoneUsedPct)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 2. Live Temp/Humidity Sensor Feed & Segregation Rules */}
      {activeTab === 'sensors' && (
        <div className="space-y-6">
          <LiveSensorsCard zones={zones} onSimulateFluctuation={onSimulateTelemetry} />
          <BatchSegregationMatrix />
        </div>
      )}

      {/* 3. Capacity & Breach Alerts Feed */}
      {activeTab === 'alerts' && alerts.length > 0 && (
        <section className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-bold text-base text-[#2A2A2A] flex items-center gap-2">
              <ShieldAlert size={20} className="text-[#E15554]" />
              <span>Capacity & Temperature Breach Feed</span>
            </h3>
            <span className="text-xs font-semibold text-gray-500">Real-time alerts log</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-2xl border space-y-2 flex flex-col justify-between ${
                  alert.severity === 'critical'
                    ? 'bg-red-50/80 border-red-200 text-red-950'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <AlertTriangle
                    size={20}
                    className={alert.severity === 'critical' ? 'text-red-600' : 'text-amber-600'}
                  />
                  <div>
                    <h4 className="font-bold text-xs">{alert.title}</h4>
                    <p className="text-xs mt-1 leading-relaxed opacity-90">{alert.message}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] opacity-70 font-mono pt-2 border-t border-black/5">
                  <span>{alert.zoneOrBatchId}</span>
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Accept / Reject Farmer Booking Requests */}
      {activeTab === 'requests' && (
        <RequestCards
          requests={requests}
          onAccept={onAcceptRequest}
          onReject={onRejectRequest}
        />
      )}

      {/* 5. Inventory Table */}
      {activeTab === 'inventory' && (
        <InventoryTable items={inventory} searchQuery={searchQuery} />
      )}
    </div>
  );
};
