import React, { useState } from 'react';
import { X, Layers, Thermometer, Droplets, CheckCircle2, ShieldAlert } from 'lucide-react';
import { StorageZone } from '../../types';
import { checkZoneSegregation } from '../../utils/segregationRules';

interface AddZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddZone: (zone: StorageZone) => void;
}

export const AddZoneModal: React.FC<AddZoneModalProps> = ({ isOpen, onClose, onAddZone }) => {
  const [name, setName] = useState('');
  const [tempRange, setTempRange] = useState('2°C – 6°C');
  const [targetTemp, setTargetTemp] = useState<number>(4.0);
  const [humidityPct, setHumidityPct] = useState<number>(85);
  const [totalCapacityKg, setTotalCapacityKg] = useState<number>(30000);
  const [pricePerZoneKg, setPricePerZoneKg] = useState<number>(0.8);
  const [cropsStr, setCropsStr] = useState('Apples, Bananas');

  if (!isOpen) return null;

  const currentCropsList = cropsStr.split(',').map((s) => s.trim()).filter(Boolean);
  const segregationWarnings = checkZoneSegregation(currentCropsList);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newZone: StorageZone = {
      id: `ZONE-${String.fromCharCode(65 + Math.floor(Math.random() * 6))}${Math.floor(1 + Math.random() * 9)}`,
      name: name || 'New Chamber Zone',
      tempRange,
      currentTemp: targetTemp + (Math.random() * 0.4 - 0.2),
      targetTemp,
      humidityPct,
      totalCapacityKg,
      usedCapacityKg: 0,
      pricePerZoneKg,
      status: segregationWarnings.length > 0 ? 'warning' : 'optimal',
      assignedCrops: currentCropsList,
      segregationAlerts: segregationWarnings.map((w) => w.description),
    };

    onAddZone(newZone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF5] border border-gray-200 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="bg-[#364C84] text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#95B1EE] text-[#1E293B] rounded-xl font-bold">
              <Layers size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Add Cold Storage Zone</h3>
              <p className="text-xs text-white/80">Configure temperature ranges & capacity limits</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[80vh]">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Zone Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Zone E5 (High Moisture Fruit Room)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Temp Range</label>
              <input
                type="text"
                required
                value={tempRange}
                onChange={(e) => setTempRange(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Temp (°C)</label>
              <input
                type="number"
                step="0.1"
                required
                value={targetTemp}
                onChange={(e) => setTargetTemp(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Capacity (kg)</label>
              <input
                type="number"
                required
                min={1000}
                value={totalCapacityKg}
                onChange={(e) => setTotalCapacityKg(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Rate (₹/kg/day)</label>
              <input
                type="number"
                step="0.05"
                required
                value={pricePerZoneKg}
                onChange={(e) => setPricePerZoneKg(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Target Crops (comma separated)</label>
            <input
              type="text"
              value={cropsStr}
              onChange={(e) => setCropsStr(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
            />
          </div>

          {/* Live Batch Segregation Alert */}
          {segregationWarnings.length > 0 && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 font-extrabold text-amber-900">
                <ShieldAlert size={16} className="text-amber-600" />
                <span>Ethylene / Odor Incompatibility Warning</span>
              </div>
              {segregationWarnings.map((warn, i) => (
                <p key={i} className="text-amber-950 font-medium leading-tight">
                  • {warn.description}
                </p>
              ))}
            </div>
          )}

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#364C84] text-white rounded-xl text-sm font-bold hover:bg-[#283863] flex items-center justify-center gap-2 shadow-md"
            >
              <CheckCircle2 size={18} />
              Create Zone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
