import React from 'react';
import {
  X,
  Package,
  MapPin,
  Calendar,
  Thermometer,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Warehouse,
  ChevronRight,
  ShieldCheck,
  Building2,
  Truck,
  ShieldAlert,
} from 'lucide-react';
import { HarvestBatch, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { ShelfLifeCountdown } from '../ShelfLifeCountdown';
import { checkZoneSegregation } from '../../utils/segregationRules';

interface BatchDetailsModalProps {
  batch: HarvestBatch | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const BatchDetailsModal: React.FC<BatchDetailsModalProps> = ({
  batch,
  isOpen,
  onClose,
  lang,
}) => {
  const t = translations[lang];

  if (!isOpen || !batch) return null;

  const getAlertText = () => {
    if (lang === 'hi') return batch.spoilageAlert.plainTextHi;
    if (lang === 'mr') return batch.spoilageAlert.plainTextMr;
    return batch.spoilageAlert.plainTextEn;
  };

  const segregationWarnings = checkZoneSegregation([batch.commodity]);

  // Default mock journey logs if not attached to batch
  const defaultJourneyLogs = [
    {
      stage: 0 as const,
      stageName: 'Harvest Field Departure',
      timestamp: batch.stageTimestamps.harvested || 'Today 06:30 AM',
      location: batch.gpsLocation,
      recordedTempC: 27.8,
      targetTempC: 22.0,
      humidityPct: 68,
      carrierOrFacility: 'Farm Gate Collection Point',
      complianceStatus: 'compliant' as const,
      notes: 'Harvested in early morning hours to minimize field heat absorption.',
    },
    {
      stage: 1 as const,
      stageName: 'Reefer Transit Line',
      timestamp: batch.stageTimestamps.inTransit || 'Today 09:15 AM',
      location: 'NH-60 Highway Reefer Transit',
      recordedTempC: 12.4,
      targetTempC: 10.0,
      humidityPct: 75,
      carrierOrFacility: 'Nashik Agri-Express Reefer Truck #MH-15-7822',
      complianceStatus: 'compliant' as const,
      notes: 'Insulated refrigerated transit maintained continuous cooling.',
    },
    {
      stage: 2 as const,
      stageName: 'Cold Chamber Storage',
      timestamp: batch.stageTimestamps.stored || 'Pending Deposit',
      location: batch.storageLocationName || 'Sahyadri Cold Storage #2',
      recordedTempC: 3.8,
      targetTempC: 4.0,
      humidityPct: 88,
      carrierOrFacility: 'Zone A2 High-Humidity Chamber',
      complianceStatus: 'compliant' as const,
      notes: 'Optimal humidity level maintained to prevent produce shrinkage.',
    },
    {
      stage: 3 as const,
      stageName: 'Market Dispatch',
      timestamp: batch.stageTimestamps.dispatched || 'Pending Dispatch',
      location: 'Vashi Wholesale Terminal Bay 4',
      recordedTempC: 6.5,
      targetTempC: 6.0,
      humidityPct: 80,
      carrierOrFacility: 'Cold Chain Express Logistics',
      complianceStatus: 'compliant' as const,
      notes: 'Dispatch bay precooled prior to truck loading.',
    },
  ];

  const journeyLogs = batch.journeyLogs || defaultJourneyLogs;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF5] border border-gray-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0C3830] text-white p-6 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3.5">
            {batch.imageUrl ? (
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#DCEBBA]/30 shadow-md">
                <img
                  src={batch.imageUrl}
                  alt={batch.commodity}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/60 backdrop-blur-xs text-xs px-1.5 py-0.5 rounded-md text-white">
                  {batch.cropIcon}
                </span>
              </div>
            ) : (
              <span className="text-3xl p-2.5 bg-[#DCEBBA] rounded-2xl text-[#0C3830] shadow-md">
                {batch.cropIcon}
              </span>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white tracking-tight">{batch.commodity}</h3>
                <span className="text-xs font-mono font-bold text-[#DCEBBA] bg-white/10 px-2.5 py-0.5 rounded-md">
                  {batch.id}
                </span>
                {batch.qualityGrade && (
                  <span className="text-xs font-extrabold bg-[#DCEBBA] text-[#0C3830] px-2.5 py-0.5 rounded-full">
                    {batch.qualityGrade}
                  </span>
                )}
              </div>
              <p className="text-xs text-[#DCEBBA]/80 mt-0.5 font-medium">Harvested: {batch.harvestDate}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Live Shelf-Life Countdown Banner */}
          <ShelfLifeCountdown
            hoursRemaining={batch.spoilageAlert.hoursRemaining || 18}
            expiresAtTimestamp={batch.expiresAtTimestamp}
            showDetailed
          />

          {/* Spoilage Risk Alert Banner */}
          <div
            className={`p-4 rounded-2xl border flex items-start gap-3 ${
              batch.spoilageAlert.urgency === 'critical'
                ? 'bg-red-50 border-red-200 text-red-950'
                : 'bg-green-50 border-green-200 text-green-950'
            }`}
          >
            <AlertTriangle
              size={22}
              className={batch.spoilageAlert.urgency === 'critical' ? 'text-red-600' : 'text-green-600'}
            />
            <div className="space-y-1 text-xs sm:text-sm">
              <span className="font-extrabold uppercase tracking-wider block">
                {t.farmerAlertsTitle}
              </span>
              <p className="font-semibold leading-relaxed">"{getAlertText()}"</p>
            </div>
          </div>

          {/* Ethylene / Segregation Notice if applicable */}
          {segregationWarnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-amber-950">
              <ShieldAlert size={22} className="text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-extrabold uppercase tracking-wider block text-amber-800">
                  Ethylene & Compatibility Alert
                </span>
                <p className="font-medium text-amber-900 leading-relaxed">
                  {batch.commodity} is categorized in cold storage guidelines. Ensure separate ventilation from ethylene-sensitive crops to avoid rotting.
                </p>
              </div>
            </div>
          )}

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Quantity</span>
              <span className="text-base font-extrabold text-[#2A2A2A]">{batch.quantityKg} kg</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Target Temp</span>
              <span className="text-base font-extrabold text-[#777D71]">{batch.recommendedTemp}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">Target Humidity</span>
              <span className="text-base font-extrabold text-[#777D71]">{batch.humidityTarget}</span>
            </div>

            <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80">
              <span className="text-[10px] font-bold uppercase text-gray-400 block">AI Quality Grade</span>
              <span className="text-base font-extrabold text-emerald-700">
                {batch.qualityGrade || 'Grade A'}
              </span>
            </div>
          </div>

          {/* Detailed Cold Chain Journey & Temperature Log */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div>
                <h4 className="font-bold text-sm text-[#2A2A2A] flex items-center gap-2">
                  <Truck size={18} className="text-[#777D71]" />
                  <span>Cold Chain Journey & Temperature Audit</span>
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                  Per-stage IoT temperature & humidity compliance record
                </p>
              </div>
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-extrabold flex items-center gap-1">
                <ShieldCheck size={12} /> Verified Audit
              </span>
            </div>

            <div className="relative border-l-2 border-[#BBD38B] ml-3 pl-5 space-y-6">
              {journeyLogs.map((log, index) => (
                <div key={index} className="relative group">
                  {/* Stage Dot Icon */}
                  <div className="absolute -left-[27px] top-0.5 w-4 h-4 rounded-full bg-[#BBD38B] border-2 border-white shadow-xs" />

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-extrabold text-xs text-[#2A2A2A]">
                        {index + 1}. {log.stageName}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                        {log.timestamp}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="flex items-center gap-1 text-[#777D71] font-bold">
                        <Thermometer size={14} /> Recorded: {log.recordedTempC}°C
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 font-medium">
                        <Droplets size={14} /> Humidity: {log.humidityPct}%
                      </span>
                      <span className="text-gray-400 font-mono text-[11px]">
                        • {log.carrierOrFacility}
                      </span>
                    </div>

                    {log.notes && (
                      <p className="text-[11px] text-gray-600 bg-[#F7F6E7] p-2.5 rounded-xl border border-[#DFDDC5]">
                        "{log.notes}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-[#777D71] text-white rounded-xl text-xs font-bold hover:bg-[#5C736A] transition-all"
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

