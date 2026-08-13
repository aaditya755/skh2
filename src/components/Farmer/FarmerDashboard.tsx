import React, { useState } from 'react';
import {
  Package,
  Plus,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Warehouse,
  Sparkles,
  Clock,
  Navigation,
  ShieldAlert,
  Info,
  ChevronRight,
  Camera,
} from 'lucide-react';
import { HarvestBatch, StorageUnit, Language, BatchStage, StorageRequest, SystemAlert } from '../../types';
import { translations } from '../../i18n/translations';
import { AiSpoilagePredictor } from './AiSpoilagePredictor';
import { ShelfLifeCountdown } from '../ShelfLifeCountdown';
import { BatchSegregationMatrix } from '../BatchSegregationMatrix';
import { AlertsScreen } from './AlertsScreen';
import { BatchHistoryScreen } from './BatchHistoryScreen';

interface FarmerDashboardProps {
  lang: Language;
  batches: HarvestBatch[];
  storageUnits: StorageUnit[];
  searchQuery: string;
  onOpenRegisterModal: () => void;
  onOpenBookingModal: (unit: StorageUnit) => void;
  onSelectBatchDetails: (batch: HarvestBatch) => void;
  onOpenQualityGradingModal: () => void;
  activeTab: string;
  alerts?: SystemAlert[];
  onToggleAlertRead?: (id: string) => void;
  onMarkAllAlertsRead?: () => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  lang,
  batches,
  storageUnits,
  searchQuery,
  onOpenRegisterModal,
  onOpenBookingModal,
  onSelectBatchDetails,
  onOpenQualityGradingModal,
  activeTab,
  alerts = [],
  onToggleAlertRead,
  onMarkAllAlertsRead,
}) => {
  const t = translations[lang];

  // Filter batches and storage units based on search query
  const filteredBatches = batches.filter(
    (b) =>
      b.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.gpsLocation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredStorage = storageUnits.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.zones.some((z) => z.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Identify highest urgency alert batch
  const urgentBatch = batches.find((b) => b.spoilageAlert.urgency === 'critical') || batches[0];

  const getAlertText = (b: HarvestBatch) => {
    if (lang === 'hi') return b.spoilageAlert.plainTextHi;
    if (lang === 'mr') return b.spoilageAlert.plainTextMr;
    return b.spoilageAlert.plainTextEn;
  };

  const getStageLabel = (stageIndex: BatchStage) => {
    const keys: (keyof typeof t.batchStages)[] = [
      'harvested',
      'inTransit',
      'stored',
      'dispatched',
      'sold',
    ];
    return t.batchStages[keys[stageIndex]];
  };

  if (activeTab === 'alerts') {
    return (
      <AlertsScreen
        alerts={alerts}
        lang={lang}
        searchQuery={searchQuery}
        onToggleRead={onToggleAlertRead}
        onMarkAllRead={onMarkAllAlertsRead}
        onSelectBatchDetails={(batchId) => {
          const b = batches.find((x) => x.id === batchId);
          if (b) onSelectBatchDetails(b);
        }}
      />
    );
  }

  if (activeTab === 'history') {
    return (
      <BatchHistoryScreen
        batches={batches}
        lang={lang}
        searchQuery={searchQuery}
        onSelectBatchDetails={onSelectBatchDetails}
      />
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Operations Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E9E2] shadow-2xs">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A2D27] tracking-tight">
            Harvest Cold-Chain Operations
          </h1>
          <p className="text-sm text-[#5C736A] font-medium mt-1">{t.farmerSubtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenQualityGradingModal}
            className="bg-[#DCEBBA] text-[#0C3830] px-5 py-3.5 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#c8e094] transition-all shadow-xs group"
          >
            <Camera size={18} className="group-hover:scale-110 transition-transform" />
            <span>AI Quality Vision</span>
          </button>

          <button
            onClick={onOpenRegisterModal}
            className="bg-[#0C3830] text-white px-6 py-3.5 rounded-full font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-[#082822] transition-all shadow-md group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform" />
            <span>{t.registerHarvest}</span>
          </button>
        </div>
      </div>

      {/* Metric Pill Summary Strip (exact ui.jpg design archetype) */}
      {(activeTab === 'dashboard' || activeTab === 'batches') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-[#1A2D27] flex items-center gap-2">
              <Sparkles size={18} className="text-emerald-700" />
              <span>Harvest Cold-Chain Telemetry Summary</span>
            </h3>
            <span className="text-xs font-semibold text-[#5C736A]">Updated 2 mins ago</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Row 1: Light Pistachio Card (#DCEBBA style) */}
            <div className="bg-[#E4EED0] border border-[#D1E0B3] p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
              <div className="flex items-center gap-4">
                <div className="bg-white px-3.5 py-2.5 rounded-2xl text-center shadow-xs">
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">Aug</span>
                  <span className="text-lg font-extrabold text-[#0C3830] font-mono leading-none">12</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold bg-[#0C3830] text-[#DCEBBA] px-2.5 py-0.5 rounded-full">
                      Batch #102 • Tomatoes
                    </span>
                    <span className="text-xs font-bold text-[#0C3830]">850 kg</span>
                  </div>
                  <p className="text-xs text-[#2F4F46] font-medium mt-1">In Transit to Narayangaon Cold Storage</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-gray-600 uppercase block font-sans font-bold">Optimal Temp</span>
                  <span className="font-extrabold text-[#0C3830]">10–12°C</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-600 uppercase block font-sans font-bold">Cold Window</span>
                  <span className="font-extrabold text-rose-700 bg-rose-100/80 px-2 py-0.5 rounded-md">4h remaining</span>
                </div>
              </div>
            </div>

            {/* Row 2: Medium Forest Green Card (#124E40 style) */}
            <div className="bg-[#124E40] text-white p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="bg-white/15 backdrop-blur-md px-3.5 py-2.5 rounded-2xl text-center border border-white/20">
                  <span className="text-[10px] font-bold text-[#DCEBBA] uppercase block">Aug</span>
                  <span className="text-lg font-extrabold text-white font-mono leading-none">10</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold bg-[#DCEBBA] text-[#0C3830] px-2.5 py-0.5 rounded-full">
                      Batch #105 • Grapes
                    </span>
                    <span className="text-xs font-bold text-white">1,500 kg</span>
                  </div>
                  <p className="text-xs text-white/80 font-medium mt-1">Stored in AgriSafe Hub Zone A (Controlled Atmos)</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-white/70 uppercase block font-sans font-bold">Humidity</span>
                  <span className="font-extrabold text-[#DCEBBA]">92% Stable</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/70 uppercase block font-sans font-bold">Shelf Life</span>
                  <span className="font-extrabold text-[#DCEBBA]">38 Days Remaining</span>
                </div>
              </div>
            </div>

            {/* Row 3: Dark Slate Forest Card (#0C3830 style) */}
            <div className="bg-[#0C3830] text-white p-4 sm:p-5 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-4">
                <div className="bg-white/10 backdrop-blur-md px-3.5 py-2.5 rounded-2xl text-center border border-white/10">
                  <span className="text-[10px] font-bold text-white/70 uppercase block">Aug</span>
                  <span className="text-lg font-extrabold text-white font-mono leading-none">08</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 rounded-full">
                      Batch #108 • Onions
                    </span>
                    <span className="text-xs font-bold text-white">3,000 kg</span>
                  </div>
                  <p className="text-xs text-white/70 font-medium mt-1">Dispatched to APMC Mumbai • Verified 100% Fresh</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-white/70 uppercase block font-sans font-bold">Market Price</span>
                  <span className="font-extrabold text-emerald-400">+18% Premium</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/70 uppercase block font-sans font-bold">Quality Grade</span>
                  <span className="font-extrabold text-white">Grade A+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 1. Spoilage Alert Banner (Most Prominent, Top) */}
      {(activeTab === 'dashboard' || activeTab === 'batches') && urgentBatch && (
        <div
          className={`p-5 sm:p-6 rounded-3xl border shadow-sm transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            urgentBatch.spoilageAlert.urgency === 'critical'
              ? 'bg-red-50 border-red-200 text-red-950'
              : urgentBatch.spoilageAlert.urgency === 'warning'
              ? 'bg-amber-50 border-amber-200 text-amber-950'
              : 'bg-green-50 border-green-200 text-green-950'
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`p-3 rounded-2xl shrink-0 ${
                urgentBatch.spoilageAlert.urgency === 'critical'
                  ? 'bg-[#E15554] text-white shadow-md'
                  : urgentBatch.spoilageAlert.urgency === 'warning'
                  ? 'bg-[#F5A623] text-white'
                  : 'bg-[#BBD38B] text-[#2A2A2A]'
              }`}
            >
              <AlertTriangle size={26} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/80">
                  {t.farmerAlertsTitle} — {urgentBatch.commodity} ({urgentBatch.id})
                </span>
                <ShelfLifeCountdown
                  hoursRemaining={urgentBatch.spoilageAlert.hoursRemaining || 14}
                  expiresAtTimestamp={urgentBatch.expiresAtTimestamp}
                />
              </div>
              <p className="text-sm sm:text-base font-bold leading-snug">
                "{getAlertText(urgentBatch)}"
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectBatchDetails(urgentBatch)}
            className="self-start md:self-center shrink-0 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-xs font-bold text-[#2A2A2A] hover:bg-gray-50 flex items-center gap-1.5 shadow-2xs"
          >
            <span>{t.viewDetails}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      )}

      {/* 2. Active Batch Progress Stepper Cards */}
      {(activeTab === 'dashboard' || activeTab === 'batches' || activeTab === 'register') && (
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#2A2A2A] flex items-center gap-2">
              <Package size={20} className="text-[#777D71]" />
              <span>{t.batchTrackingTitle}</span>
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              Showing {activeTab === 'dashboard' ? Math.min(1, filteredBatches.length) : filteredBatches.length} active batch supply chain
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {filteredBatches.length === 0 ? (
              <div className="bg-white/80 p-8 rounded-3xl border border-dashed border-gray-300 text-center space-y-3">
                <Package size={36} className="mx-auto text-gray-400" />
                <p className="text-sm font-semibold text-gray-600">No harvest batches found matching your search.</p>
                <button
                  onClick={onOpenRegisterModal}
                  className="px-4 py-2 bg-[#777D71] text-white rounded-xl text-xs font-bold"
                >
                  {t.registerHarvest}
                </button>
              </div>
            ) : (
              (activeTab === 'dashboard' ? filteredBatches.slice(0, 1) : filteredBatches).map((batch) => (
                <div
                  key={batch.id}
                  className="bg-white border border-[#EEEEEE] p-5 sm:p-6 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-5"
                >
                  {/* Card Header Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3.5">
                      {batch.imageUrl ? (
                        <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E2E9E2] shadow-xs">
                          <img
                            src={batch.imageUrl}
                            alt={batch.commodity}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-xs text-xs px-1.5 py-0.5 rounded-md shadow-2xs">
                            {batch.cropIcon}
                          </span>
                        </div>
                      ) : (
                        <div className="text-3xl p-3 bg-[#F4F6F4] rounded-2xl border border-[#E2E9E2]">
                          {batch.cropIcon}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-extrabold text-base sm:text-lg text-[#1A2D27]">
                            {batch.commodity}
                          </h3>
                          <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                            {batch.id}
                          </span>
                          {batch.qualityGrade && (
                            <span className="text-xs font-extrabold bg-[#DCEBBA] text-[#0C3830] px-2.5 py-0.5 rounded-full">
                              {batch.qualityGrade}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-2 mt-1">
                          <span className="font-bold text-[#1A2D27]">📦 {batch.quantityKg} kg</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 font-medium">
                            <MapPin size={12} className="text-[#0C3830]" /> {batch.gpsLocation}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <ShelfLifeCountdown
                        hoursRemaining={batch.spoilageAlert.hoursRemaining || 24}
                        expiresAtTimestamp={batch.expiresAtTimestamp}
                      />
                      <button
                        onClick={() => onSelectBatchDetails(batch)}
                        className="px-4 py-2 bg-[#0C3830] text-white rounded-full text-xs font-bold hover:bg-[#082822] transition-colors shadow-2xs"
                      >
                        {t.viewDetails}
                      </button>
                    </div>
                  </div>

                  {/* Horizontal Stepper Progress Bar */}
                  <div className="pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4">
                      Batch Supply Chain Progress
                    </p>

                    <div className="relative flex justify-between items-center">
                      {/* Connecting Line */}
                      <div className="absolute top-4 left-6 right-6 h-1 bg-gray-200 -translate-y-1/2 z-0">
                        <div
                          className="h-full bg-[#BBD38B] transition-all duration-500"
                          style={{ width: `${(batch.stage / 4) * 100}%` }}
                        />
                      </div>

                      {([0, 1, 2, 3, 4] as BatchStage[]).map((stg) => {
                        const isReached = stg <= batch.stage;
                        const isCurrent = stg === batch.stage;

                        let timestamp = '';
                        if (stg === 0) timestamp = batch.stageTimestamps.harvested;
                        if (stg === 1) timestamp = batch.stageTimestamps.inTransit || '';
                        if (stg === 2) timestamp = batch.stageTimestamps.stored || '';
                        if (stg === 3) timestamp = batch.stageTimestamps.dispatched || '';
                        if (stg === 4) timestamp = batch.stageTimestamps.sold || '';

                        return (
                          <div
                            key={stg}
                            className="relative z-10 flex flex-col items-center text-center bg-white px-1 sm:px-2"
                          >
                            <div
                              className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all border-2 ${
                                isReached
                                  ? 'bg-[#BBD38B] border-[#BBD38B] text-[#2A2A2A] shadow-xs'
                                  : 'bg-white border-gray-300 text-gray-300'
                              } ${isCurrent ? 'ring-4 ring-[#777D71]/20 scale-110' : ''}`}
                            >
                              {isReached ? <CheckCircle2 size={18} /> : stg + 1}
                            </div>

                            <span
                              className={`text-[11px] font-bold mt-2 uppercase tracking-tight ${
                                isReached ? 'text-[#2A2A2A]' : 'text-gray-300'
                              }`}
                            >
                              {getStageLabel(stg)}
                            </span>

                            {timestamp ? (
                              <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                                {timestamp}
                              </span>
                            ) : (
                              <span className="text-[10px] text-gray-300 italic mt-0.5">Pending</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      )}

      {/* 3. AI Spoilage Risk Advisor & Segregation Matrix Section */}
      {activeTab === 'ai-advisor' && (
        <div className="space-y-6">
          <AiSpoilagePredictor lang={lang} />
          <BatchSegregationMatrix />
        </div>
      )}

      {/* 4. Nearby Storage Discovery Section */}
      {activeTab === 'storage' && (
        <section className="space-y-4 pb-12">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-[#2A2A2A] flex items-center gap-2">
              <Warehouse size={20} className="text-[#777D71]" />
              <span>{t.nearbyStorageTitle}</span>
            </h2>
            <span className="text-xs font-semibold text-gray-500">
              Verified cold rooms within 15 km
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredStorage.map((unit) => (
              <div
                key={unit.id}
                className="bg-white border border-[#E2E9E2] rounded-3xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {unit.image && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                      <img
                        src={unit.image}
                        alt={unit.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-3 flex items-end justify-between">
                        <span className="px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#0C3830] rounded-full text-[11px] font-extrabold flex items-center gap-1 shadow-2xs">
                          <Navigation size={12} /> {unit.distanceKm} {t.distanceKm}
                        </span>
                        <span className="px-2.5 py-1 bg-[#DCEBBA] text-[#0C3830] rounded-full text-[11px] font-mono font-extrabold">
                          ★ {unit.rating}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="font-extrabold text-base text-[#1A2D27] group-hover:text-[#0C3830] transition-colors">
                      {unit.name}
                    </h3>
                    <p className="text-xs text-[#5C736A] mt-1 line-clamp-1">{unit.address}</p>

                    {/* Temp zones tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {unit.zones.map((zone) => (
                        <span
                          key={zone}
                          className="px-2.5 py-1 bg-[#F4F6F4] border border-[#E2E9E2] text-[#1A2D27] rounded-full text-[10px] font-bold"
                        >
                          {zone}
                        </span>
                      ))}
                    </div>

                    {/* Capacity Bar */}
                    <div className="mt-4 space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-[#5C736A]">{t.availableCapacity}</span>
                        <span className="text-[#0C3830] font-mono">{unit.availableCapacityPct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#0C3830] h-full transition-all duration-300"
                          style={{ width: `${unit.availableCapacityPct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="p-5 pt-0 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#5C736A] block">{t.perDayPrice}</span>
                    <span className="text-base font-extrabold text-[#1A2D27] font-mono">
                      ₹{unit.pricePerDayKg} <span className="text-xs font-normal text-gray-500 font-sans">/ kg</span>
                    </span>
                  </div>

                  <button
                    onClick={() => onOpenBookingModal(unit)}
                    className="bg-[#0C3830] text-white px-5 py-2.5 rounded-full text-xs font-extrabold hover:bg-[#082822] transition-all flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>{t.bookSlot}</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

