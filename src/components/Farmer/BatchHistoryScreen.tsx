import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  Filter,
  Package,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  IndianRupee,
  TrendingUp,
  Percent,
  X,
  Clock,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import { HarvestBatch, Language } from '../../types';
import { translations } from '../../i18n/translations';

interface BatchHistoryScreenProps {
  batches: HarvestBatch[];
  lang: Language;
  searchQuery?: string;
  onSelectBatchDetails: (batch: HarvestBatch) => void;
}

export const BatchHistoryScreen: React.FC<BatchHistoryScreenProps> = ({
  batches,
  lang,
  searchQuery = '',
  onSelectBatchDetails,
}) => {
  const t = translations[lang];

  // Local state for search & filtering
  const [localSearch, setLocalSearch] = useState<string>('');
  const [outcomeFilter, setOutcomeFilter] = useState<'all' | 'sold' | 'dispatched' | 'spoiled'>('all');
  const [commodityFilter, setCommodityFilter] = useState<string>('all');

  const effectiveSearch = localSearch || searchQuery;

  // Filter archived/completed batches: stage >= 3 (Dispatched, Sold) or outcome defined
  const historyBatches = batches.filter((b) => b.stage >= 3 || b.outcome !== undefined);

  // Apply search & filters
  const filteredBatches = historyBatches.filter((batch) => {
    // Outcome filter
    const derivedOutcome =
      batch.outcome ||
      (batch.stage === 4
        ? batch.spoilageAlert.urgency === 'critical'
          ? 'spoiled'
          : 'sold'
        : 'dispatched');

    if (outcomeFilter !== 'all' && derivedOutcome !== outcomeFilter) {
      return false;
    }

    // Commodity filter
    if (commodityFilter !== 'all' && batch.commodity.toLowerCase() !== commodityFilter.toLowerCase()) {
      return false;
    }

    // Search query filter
    if (effectiveSearch.trim()) {
      const q = effectiveSearch.toLowerCase();
      const matchesId = batch.id.toLowerCase().includes(q);
      const matchesCommodity = batch.commodity.toLowerCase().includes(q);
      const matchesGps = batch.gpsLocation.toLowerCase().includes(q);
      const matchesStorage = (batch.storageLocationName || '').toLowerCase().includes(q);
      if (!matchesId && !matchesCommodity && !matchesGps && !matchesStorage) {
        return false;
      }
    }

    return true;
  });

  // Calculate Metrics
  const totalCount = historyBatches.length;
  const totalIncome = historyBatches.reduce((acc, b) => acc + (b.incomeAmount || 0), 0);
  
  const totalSpoilage = historyBatches.reduce((acc, b) => acc + (b.spoiledPct || 0), 0);
  const avgSpoilage = totalCount > 0 ? (totalSpoilage / totalCount).toFixed(1) : '0.0';

  const gradeACount = historyBatches.filter((b) => b.qualityGrade === 'Grade A').length;
  const gradeAPct = totalCount > 0 ? Math.round((gradeACount / totalCount) * 100) : 0;

  // Unique commodities list for filter dropdown/pills
  const availableCommodities = Array.from(new Set(historyBatches.map((b) => b.commodity)));

  // Working CSV Export Handler
  const handleDownloadCSV = () => {
    if (filteredBatches.length === 0) return;

    const headers = [
      'Batch ID',
      'Commodity',
      'Quantity (kg)',
      'Harvest Date',
      'Completion Date',
      'Storage Facility / Location',
      'Quality Grade',
      'Outcome Status',
      'Income Earned (INR)',
      'Spoiled Loss (%)',
      'Spoilage / Status Notes',
    ];

    const rows = filteredBatches.map((b) => {
      const derivedOutcome =
        b.outcome ||
        (b.stage === 4 ? (b.spoilageAlert.urgency === 'critical' ? 'spoiled' : 'sold') : 'dispatched');

      const completionDate =
        b.stageTimestamps.sold ||
        b.stageTimestamps.dispatched ||
        b.stageTimestamps.stored ||
        b.harvestDate;

      const notes = (
        lang === 'hi'
          ? b.spoilageAlert.plainTextHi
          : lang === 'mr'
          ? b.spoilageAlert.plainTextMr
          : b.spoilageAlert.plainTextEn
      ).replace(/"/g, '""');

      return [
        `"${b.id}"`,
        `"${b.commodity}"`,
        b.quantityKg,
        `"${b.harvestDate}"`,
        `"${completionDate}"`,
        `"${(b.storageLocationName || b.gpsLocation).replace(/"/g, '""')}"`,
        `"${b.qualityGrade || 'Standard'}"`,
        `"${derivedOutcome.toUpperCase()}"`,
        b.incomeAmount || 0,
        b.spoiledPct !== undefined ? b.spoiledPct : 0,
        `"${notes}"`,
      ];
    });

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `AgriCool_Batch_History_Report_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper function for Outcome Badge styling
  const getOutcomeBadge = (batch: HarvestBatch) => {
    const outcome =
      batch.outcome ||
      (batch.stage === 4
        ? batch.spoilageAlert.urgency === 'critical'
          ? 'spoiled'
          : 'sold'
        : 'dispatched');

    switch (outcome) {
      case 'sold':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 size={13} className="text-emerald-700" />
            <span>Sold / Completed</span>
          </span>
        );
      case 'dispatched':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-300 flex items-center gap-1.5">
            <Clock size={13} className="text-blue-700" />
            <span>Dispatched</span>
          </span>
        );
      case 'spoiled':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-rose-100 text-rose-900 border border-rose-300 flex items-center gap-1.5">
            <AlertTriangle size={13} className="text-rose-700" />
            <span>Spoiled / Loss</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gray-100 text-gray-800 border border-gray-300">
            Archived
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E9E2] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-[#0C3830] text-[#DCEBBA] rounded-2xl shadow-md shrink-0">
            <FileText size={28} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A2D27] tracking-tight">
                {t.nav.history || 'Batch History & Reports'}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#DCEBBA] text-[#0C3830]">
                {historyBatches.length} Archived
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5C736A] font-medium mt-1">
              Historical ledger of completed shipments, market realizations, quality audits, and export logs
            </p>
          </div>
        </div>

        {/* Working CSV Export Button */}
        <button
          onClick={handleDownloadCSV}
          disabled={filteredBatches.length === 0}
          className="self-start sm:self-auto px-5 py-3 rounded-2xl bg-[#0C3830] text-white font-extrabold text-xs flex items-center gap-2.5 hover:bg-[#082822] active:scale-95 transition-all shadow-md disabled:opacity-50 shrink-0"
        >
          <Download size={18} className="text-[#DCEBBA]" />
          <span>Download CSV Report</span>
        </button>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white border border-[#E2E9E2] p-4 sm:p-5 rounded-2xl shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">
            Archived Batches
          </span>
          <span className="text-2xl font-black text-[#1A2D27] font-mono mt-1 block">
            {totalCount}
          </span>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 p-4 sm:p-5 rounded-2xl shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-emerald-800 tracking-wider block">
            Total Revenue Realized
          </span>
          <span className="text-2xl font-black text-[#0C3830] font-mono mt-1 block">
            ₹{totalIncome.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-rose-50/70 border border-rose-200 p-4 sm:p-5 rounded-2xl shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-rose-800 tracking-wider block">
            Avg Spoilage Loss
          </span>
          <span className="text-2xl font-black text-rose-950 font-mono mt-1 block">
            {avgSpoilage}%
          </span>
        </div>

        <div className="bg-white border border-[#E2E9E2] p-4 sm:p-5 rounded-2xl shadow-2xs">
          <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">
            Grade A Quality Share
          </span>
          <span className="text-2xl font-black text-[#1A2D27] font-mono mt-1 block">
            {gradeAPct}%
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white border border-[#E2E9E2] p-5 rounded-3xl shadow-2xs space-y-4">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search history by commodity, batch ID (#BATCH-108), storage facility, or location..."
            className="w-full pl-10 pr-9 py-2 bg-[#F4F6F4] border border-[#E2E9E2] rounded-full text-xs font-medium text-[#1A2D27] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0C3830] transition-all"
          />
          {localSearch && (
            <button
              onClick={() => setLocalSearch('')}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="space-y-3 pt-1 border-t border-gray-100">
          {/* Outcome Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-extrabold text-[#5C736A] uppercase tracking-wider min-w-[70px]">
              Outcome:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(
                [
                  { id: 'all', label: 'All Outcomes' },
                  { id: 'sold', label: 'Sold / Completed' },
                  { id: 'dispatched', label: 'Dispatched' },
                  { id: 'spoiled', label: 'Spoiled / Loss' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setOutcomeFilter(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                    outcomeFilter === f.id
                      ? 'bg-[#0C3830] text-white shadow-xs'
                      : 'bg-white border border-[#E2E9E2] text-[#2A2A2A] hover:bg-gray-50'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Commodity Filter */}
          {availableCommodities.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold text-[#5C736A] uppercase tracking-wider min-w-[70px]">
                Crop:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setCommodityFilter('all')}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                    commodityFilter === 'all'
                      ? 'bg-[#0C3830] text-white shadow-xs'
                      : 'bg-white border border-[#E2E9E2] text-[#2A2A2A] hover:bg-gray-50'
                  }`}
                >
                  All Crops
                </button>
                {availableCommodities.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setCommodityFilter(crop)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                      commodityFilter === crop
                        ? 'bg-[#0C3830] text-white shadow-xs'
                        : 'bg-white border border-[#E2E9E2] text-[#2A2A2A] hover:bg-gray-50'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Batch Cards Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-extrabold text-[#1A2D27] uppercase tracking-wider">
            Completed Batches Ledger ({filteredBatches.length})
          </h2>
          <span className="text-xs text-[#5C736A] font-semibold">
            Click any card to view cold-chain journey audit
          </span>
        </div>

        {filteredBatches.length === 0 ? (
          <div className="bg-white border border-[#E2E9E2] p-12 rounded-3xl text-center space-y-3">
            <div className="w-12 h-12 bg-[#F4F6F4] rounded-full flex items-center justify-center mx-auto text-gray-400">
              <Package size={24} />
            </div>
            <h3 className="font-extrabold text-base text-[#1A2D27]">No Batch History Records Match</h3>
            <p className="text-xs text-[#5C736A] max-w-sm mx-auto">
              Try resetting your outcome filters, commodity selection, or search query above.
            </p>
            <button
              onClick={() => {
                setOutcomeFilter('all');
                setCommodityFilter('all');
                setLocalSearch('');
              }}
              className="mt-2 px-4 py-2 bg-[#0C3830] text-white rounded-full text-xs font-extrabold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredBatches.map((batch) => {
            const completionDate =
              batch.stageTimestamps.sold ||
              batch.stageTimestamps.dispatched ||
              batch.stageTimestamps.stored ||
              batch.harvestDate;

            return (
              <div
                key={batch.id}
                className="bg-white border border-[#E2E9E2] p-5 sm:p-6 rounded-3xl shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Header: Commodity, Batch ID, Badges */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    {batch.imageUrl ? (
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E2E9E2] shadow-xs">
                        <img
                          src={batch.imageUrl}
                          alt={batch.commodity}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-xs text-xs px-1.5 py-0.5 rounded-md shadow-2xs">
                          {batch.cropIcon}
                        </span>
                      </div>
                    ) : (
                      <div className="text-3xl p-3 bg-[#F4F6F4] rounded-2xl border border-[#E2E9E2] shrink-0">
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

                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 flex-wrap">
                        <span className="font-bold text-[#1A2D27]">📦 {batch.quantityKg} kg</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium">
                          <Calendar size={12} className="text-[#0C3830]" /> Harvested {batch.harvestDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-medium text-gray-700">
                          <MapPin size={12} className="text-[#0C3830]" /> {batch.storageLocationName || batch.gpsLocation}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Outcome Badge */}
                  <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                    {getOutcomeBadge(batch)}
                  </div>
                </div>

                {/* Body Metrics Grid: Income, Spoilage Loss, Completion Date & Details Button */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F4F6F4]/60 p-4 rounded-2xl border border-[#E2E9E2]/80">
                  {/* Income Earned */}
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                      <TrendingUp size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block leading-none">
                        Revenue Earned
                      </span>
                      <span className="text-sm font-extrabold text-[#0C3830] font-mono mt-1 block">
                        {batch.incomeAmount ? `₹${batch.incomeAmount.toLocaleString('en-IN')}` : 'N/A'}
                      </span>
                    </div>
                  </div>

                  {/* Spoilage Loss */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      (batch.spoiledPct || 0) > 5 ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      <Percent size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block leading-none">
                        Spoilage / Crop Loss
                      </span>
                      <span className={`text-sm font-extrabold font-mono mt-1 block ${
                        (batch.spoiledPct || 0) > 5 ? 'text-rose-700' : 'text-[#1A2D27]'
                      }`}>
                        {batch.spoiledPct !== undefined ? `${batch.spoiledPct}% Loss` : '0.0% Loss'}
                      </span>
                    </div>
                  </div>

                  {/* Completion Date & View Audit Button */}
                  <div className="flex items-center justify-between gap-2 sm:col-span-1">
                    <div>
                      <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block leading-none">
                        Archived Date
                      </span>
                      <span className="text-xs font-bold text-[#1A2D27] font-mono mt-1 block">
                        {completionDate}
                      </span>
                    </div>

                    <button
                      onClick={() => onSelectBatchDetails(batch)}
                      className="px-3.5 py-2 bg-[#0C3830] text-white rounded-full text-xs font-bold hover:bg-[#082822] transition-all flex items-center gap-1 shadow-2xs shrink-0"
                    >
                      <span>Journey Log</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                {/* Status / Spoilage Notes */}
                <p className="text-xs text-[#5C736A] font-medium italic border-l-2 border-[#0C3830] pl-3 py-0.5">
                  "{lang === 'hi' ? batch.spoilageAlert.plainTextHi : lang === 'mr' ? batch.spoilageAlert.plainTextMr : batch.spoilageAlert.plainTextEn}"
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
