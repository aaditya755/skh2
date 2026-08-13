import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, RefreshCw, AlertTriangle, ShieldCheck, TrendingUp, TrendingDown, Zap } from 'lucide-react';
import { StorageZone } from '../../types';

interface LiveSensorsCardProps {
  zones: StorageZone[];
  onSimulateFluctuation: () => void;
}

export const LiveSensorsCard: React.FC<LiveSensorsCardProps> = ({ zones, onSimulateFluctuation }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onSimulateFluctuation();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="bg-white border border border-gray-200/80 rounded-3xl p-6 shadow-xs space-y-4">
      <div className="flex justify-between items-center border-b border-gray-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#95B1EE]/20 text-[#364C84] rounded-2xl">
            <Zap size={22} />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#2A2A2A]">Live Telemetry & IoT Sensor Feed</h3>
            <p className="text-xs text-gray-500">Auto-refreshing IoT temperature & humidity telemetry</p>
          </div>
        </div>

        <button
          onClick={handleRefresh}
          className="p-2 text-[#364C84] hover:bg-blue-50 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold border border-[#95B1EE]/30"
          title="Simulate IoT sensor update"
        >
          <RefreshCw size={14} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Simulate Telemetry</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {zones.map((zone) => {
          const isBreach = zone.status === 'breach';
          const isWarning = zone.status === 'warning';

          return (
            <div
              key={zone.id}
              className={`p-5 rounded-2xl border transition-all relative overflow-hidden group ${
                isBreach
                  ? 'bg-red-50/60 border-red-200'
                  : isWarning
                  ? 'bg-amber-50/60 border-amber-200'
                  : 'bg-[#FFFDF5] border-gray-200/80 hover:border-[#364C84]'
              }`}
            >
              {/* Top header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#364C84] text-white">
                    {zone.id}
                  </span>
                  <h4 className="font-bold text-sm text-[#2A2A2A] mt-1.5 line-clamp-1">{zone.name}</h4>
                </div>

                {/* Live pulse dot */}
                <div className="flex items-center gap-1">
                  <span
                    className={`w-2.5 h-2.5 rounded-full animate-pulse-subtle ${
                      isBreach ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                  />
                </div>
              </div>

              {/* Temperature & Humidity Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-white/80 p-3 rounded-xl border border-gray-100 flex items-center gap-2">
                  <div className="p-2 bg-blue-50 text-[#364C84] rounded-lg">
                    <Thermometer size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Temp</span>
                    <span className="text-base font-black text-[#2A2A2A]">{zone.currentTemp}°C</span>
                  </div>
                </div>

                <div className="bg-white/80 p-3 rounded-xl border border-gray-100 flex items-center gap-2">
                  <div className="p-2 bg-cyan-50 text-cyan-700 rounded-lg">
                    <Droplets size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase block">Humidity</span>
                    <span className="text-base font-black text-[#2A2A2A]">{zone.humidityPct}%</span>
                  </div>
                </div>
              </div>

              {/* Target range metadata */}
              <div className="mt-3 flex justify-between items-center text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                <span>Target: {zone.tempRange}</span>
                <span className="font-semibold text-[#364C84]">
                  {Math.round((zone.usedCapacityKg / zone.totalCapacityKg) * 100)}% Full
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
