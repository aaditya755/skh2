import React, { useState } from 'react';
import { X, Warehouse, Calendar, Scale, Phone, CheckCircle2, MapPin } from 'lucide-react';
import { StorageUnit, StorageRequest, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface StorageBookingModalProps {
  unit: StorageUnit | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: (req: StorageRequest) => void;
  lang: Language;
}

export const StorageBookingModal: React.FC<StorageBookingModalProps> = ({
  unit,
  isOpen,
  onClose,
  onRequestSubmitted,
  lang,
}) => {
  const t = translations[lang];

  const [farmerName, setFarmerName] = useState('Rajesh Kadam');
  const [farmerPhone, setFarmerPhone] = useState('+91 98220 99887');
  const [commodity, setCommodity] = useState('Tomatoes');
  const [quantityKg, setQuantityKg] = useState<number>(1000);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [durationDays, setDurationDays] = useState<number>(7);
  const [selectedZone, setSelectedZone] = useState<string>(unit?.zones[0] || 'Vegetables');

  if (!isOpen || !unit) return null;

  const estimatedCost = Math.round(quantityKg * durationDays * unit.pricePerDayKg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRequest: StorageRequest = {
      id: `REQ-${Math.floor(400 + Math.random() * 500)}`,
      farmerName,
      farmerPhone,
      commodity,
      quantityKg,
      startDate,
      durationDays,
      requestedZone: selectedZone,
      estimatedCost,
      status: 'pending',
      requestTimestamp: 'Just now',
    };

    onRequestSubmitted(newRequest);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#F7F6E7] border border-[#DFDDC5] w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#777D71] text-white p-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#BBD38B] text-[#2A2A2A] rounded-xl font-bold">
              <Warehouse size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{unit.name}</h3>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <MapPin size={12} /> {unit.distanceKm} {t.distanceKm}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white">
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto max-h-[80vh]">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
              Selected Zone
            </label>
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
            >
              {unit.zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Commodity
              </label>
              <input
                type="text"
                required
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Quantity (kg)
              </label>
              <input
                type="number"
                required
                min={50}
                value={quantityKg}
                onChange={(e) => setQuantityKg(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Start Date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                Duration (Days)
              </label>
              <input
                type="number"
                required
                min={1}
                max={180}
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-gray-300 rounded-xl text-sm font-semibold text-[#2A2A2A]"
              />
            </div>
          </div>

          {/* Cost Estimate Summary Card */}
          <div className="bg-white p-4 rounded-2xl border border-[#DFDDC5] space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Rate</span>
              <span>₹{unit.pricePerDayKg} / kg / day</span>
            </div>
            <div className="flex justify-between items-center border-t border-gray-100 pt-2">
              <span className="text-xs font-bold text-gray-700">Estimated Cost</span>
              <span className="text-lg font-black text-[#777D71]">₹{estimatedCost.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-white"
            >
              {t.actions.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#777D71] text-white rounded-xl text-sm font-bold hover:bg-[#5f645a] flex items-center justify-center gap-2 shadow-md"
            >
              <CheckCircle2 size={18} />
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
