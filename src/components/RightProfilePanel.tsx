import React from 'react';
import { User, Clock, MapPin, Thermometer, ShieldCheck, Sun, Sparkles, Droplets } from 'lucide-react';
import { Role } from '../types';

interface RightProfilePanelProps {
  role: Role;
}

export const RightProfilePanel: React.FC<RightProfilePanelProps> = ({ role }) => {
  const isFarmer = role === 'farmer';

  return (
    <div className="w-full lg:w-80 shrink-0 space-y-4">
      {/* Dark Forest Green Primary Panel */}
      <div className="bg-[#0C3830] text-white p-6 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#DCEBBA]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Working / Operational Shift Card */}
        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#DCEBBA] block opacity-80">
            Optimal Operational Hours
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-white/70 block uppercase font-medium">Shift Start</span>
              <span className="text-xs font-mono font-bold text-white">06:00 AM</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
              <span className="text-[10px] text-white/70 block uppercase font-medium">Shift End</span>
              <span className="text-xs font-mono font-bold text-white">06:00 PM</span>
            </div>
          </div>
        </div>

        {/* Location Section - Styled like Sukabumi City in Image */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-extrabold text-white flex items-center gap-1.5">
                <MapPin size={16} className="text-[#DCEBBA]" />
                <span>Nashik Valley</span>
              </h4>
              <p className="text-[11px] text-white/70">Maharashtra, India • GMT+5:30</p>
            </div>
            <span className="px-2.5 py-1 bg-[#DCEBBA] text-[#0C3830] font-mono font-extrabold text-[11px] rounded-lg">
              28°C ☀️
            </span>
          </div>

          {/* Real Agricultural & Cold Storage Scenic Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] mt-3 border border-white/15 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"
              alt="Farm Fields"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-3 flex flex-col justify-end">
              <span className="text-[10px] font-extrabold uppercase text-[#DCEBBA] tracking-wider">
                Harvest Field Sector #4
              </span>
              <p className="text-xs font-bold text-white">Optimal Harvest Humidity: 72%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Cold Chain Live Micro Telemetry Card */}
      <div className="bg-white border border-[#E2E9E2] p-5 rounded-3xl space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase text-gray-500 tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-emerald-600" />
            <span>AI Eco-Storage Efficiency</span>
          </span>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            94.2%
          </span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>Grid Power Backup:</span>
            <span className="font-bold text-[#1A2D27]">Solar + Thermal</span>
          </div>
          <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#0C3830] h-full w-[94%]" />
          </div>
        </div>
      </div>
    </div>
  );
};
