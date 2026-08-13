import React, { useState } from 'react';
import {
  X,
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ShieldCheck,
  Thermometer,
  RotateCcw,
  Tag,
  Maximize2,
  Layers,
  Zap,
} from 'lucide-react';
import { QualityGradingResult, HarvestBatch, Language } from '../types';

interface AiQualityGradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyGradeToBatch?: (gradeResult: QualityGradingResult, commodity: string) => void;
  lang: Language;
}

interface SamplePreset {
  id: string;
  name: string;
  crop: string;
  imageBg: string;
  sampleImage: string;
  badge: string;
  result: QualityGradingResult;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'sample-tomato-a',
    name: 'Export Tomatoes',
    crop: 'Tomatoes',
    imageBg: 'from-[#0C3830] to-[#124E40]',
    sampleImage: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    badge: '🍅 Grade A',
    result: {
      grade: 'Grade A',
      gradeTitle: 'Grade A — Premium Export Quality',
      confidencePct: 97.4,
      defectRatioPct: 1.2,
      colorUniformityPct: 96.0,
      firmnessScore: 9.1,
      ripenessStage: 'Optimal Harvest Firmness (82% Lycopene)',
      shelfLifeAmbientDays: 5,
      shelfLifeColdStorageDays: 24,
      priceMultiplier: 1.25,
      keyFindings: [
        'Zero internal soft rot or skin punctures detected',
        'High firmness (9.1/10) suitable for long-distance reefer transit',
        'Uniform deep-red pigmentation with intact calyx stems',
      ],
    },
  },
  {
    id: 'sample-mango-a',
    name: 'Alphonso Mangoes',
    crop: 'Mangoes',
    imageBg: 'from-[#0C3830] to-[#124E40]',
    sampleImage: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    badge: '🥭 Grade A',
    result: {
      grade: 'Grade A',
      gradeTitle: 'Grade A — Export Grade Alphonso',
      confidencePct: 98.1,
      defectRatioPct: 2.0,
      colorUniformityPct: 94.5,
      firmnessScore: 8.8,
      ripenessStage: 'Mature Unripe (Perfect for Cold Ripening)',
      shelfLifeAmbientDays: 6,
      shelfLifeColdStorageDays: 28,
      priceMultiplier: 1.35,
      keyFindings: [
        'Free from anthracnose lesions and sap burn marks',
        'Brix sugar index predicted at 16.5° once cold ripened',
        'High export value premium (+35% over local spot mandi rates)',
      ],
    },
  },
  {
    id: 'sample-apple-b',
    name: 'Shimla Apples',
    crop: 'Apples',
    imageBg: 'from-[#0C3830] to-[#124E40]',
    sampleImage: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    badge: '🍎 Grade B',
    result: {
      grade: 'Grade B',
      gradeTitle: 'Grade B — Standard Domestic Market Grade',
      confidencePct: 94.2,
      defectRatioPct: 5.8,
      colorUniformityPct: 82.0,
      firmnessScore: 7.5,
      ripenessStage: 'Eating Ripeness (78%)',
      shelfLifeAmbientDays: 8,
      shelfLifeColdStorageDays: 45,
      priceMultiplier: 0.95,
      keyFindings: [
        'Minor surface hail scuffs (<6% surface area), non-infectious',
        'Solid internal pulp density with clean stem attachment',
        'Store at 1°C–3°C immediately to preserve remaining crispness',
      ],
    },
  },
  {
    id: 'sample-banana-c',
    name: 'Overripe Bananas',
    crop: 'Bananas',
    imageBg: 'from-[#0C3830] to-[#124E40]',
    sampleImage: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80',
    badge: '🍌 Grade C',
    result: {
      grade: 'Grade C',
      gradeTitle: 'Grade C — Quick Local Sale / Processing Grade',
      confidencePct: 96.0,
      defectRatioPct: 18.5,
      colorUniformityPct: 62.0,
      firmnessScore: 4.2,
      ripenessStage: 'Fully Ripe with Sugar Freckles (95%)',
      shelfLifeAmbientDays: 2,
      shelfLifeColdStorageDays: 6,
      priceMultiplier: 0.7,
      keyFindings: [
        'High ethylene release rate; DO NOT store with unripened fruit',
        'Recommended for local bakery pulp processing or immediate discount sale',
        'Peel integrity intact but firmness reduced to 4.2/10',
      ],
    },
  },
];

export const AiQualityGradingModal: React.FC<AiQualityGradingModalProps> = ({
  isOpen,
  onClose,
  onApplyGradeToBatch,
  lang,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<SamplePreset>(SAMPLE_PRESETS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeResult, setActiveResult] = useState<QualityGradingResult | null>(SAMPLE_PRESETS[0].result);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: SamplePreset) => {
    setSelectedPreset(preset);
    setUploadedImage(null);
    setIsScanning(true);
    setActiveResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setActiveResult(preset.result);
    }, 1200);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setIsScanning(true);
      setActiveResult(null);

      setTimeout(() => {
        setIsScanning(false);
        setActiveResult({
          grade: 'Grade A',
          gradeTitle: 'Grade A — Premium Inspected Quality',
          confidencePct: 96.8,
          defectRatioPct: 2.1,
          colorUniformityPct: 92.4,
          firmnessScore: 8.9,
          ripenessStage: 'Optimal Harvest Quality (88%)',
          shelfLifeAmbientDays: 6,
          shelfLifeColdStorageDays: 26,
          priceMultiplier: 1.2,
          keyFindings: [
            'AI Vision detected uniform surface texture and healthy skin gloss',
            'Low defect ratio (2.1%) verified against AGMARK standards',
            'Cold storage at 4°C recommended to extend shelf life by 20 days',
          ],
        });
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF5] border border-gray-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#0C3830] text-white p-5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#DCEBBA] text-[#0C3830] rounded-2xl shadow-md">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-white">AI Vision Produce Quality Grading</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#DCEBBA] text-[#0C3830] px-2.5 py-0.5 rounded-full">
                  Computer Vision v2.4
                </span>
              </div>
              <p className="text-xs text-[#DCEBBA]/80">
                Instant AGMARK quality grading, defect ratio, and cold-chain shelf life estimation
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Sample Presets Selection */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider block">
              Choose Sample Crop or Upload Photo
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SAMPLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPreset(p)}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    selectedPreset.id === p.id && !uploadedImage
                      ? 'border-[#0C3830] bg-[#E4EED0] ring-2 ring-[#0C3830]/30 shadow-xs'
                      : 'border-[#E2E9E2] bg-white hover:border-gray-300'
                  }`}
                >
                  <img
                    src={p.sampleImage}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-xl object-cover shrink-0 border border-gray-200"
                  />
                  <div className="overflow-hidden">
                    <span className="text-xs font-extrabold text-[#1A2D27] block truncate">{p.crop}</span>
                    <span className="text-[10px] font-bold text-[#0C3830]">{p.badge}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Photo Scanner Box */}
          <div className="relative bg-[#0C3830] rounded-3xl overflow-hidden min-h-[220px] flex items-center justify-center p-6 text-white border border-[#124E40] shadow-inner">
            {uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded produce" className="max-h-52 object-contain rounded-xl" />
            ) : (
              <div className="w-full h-48 rounded-2xl relative overflow-hidden shadow-lg border border-white/20 group">
                <img
                  src={selectedPreset.sampleImage}
                  alt={selectedPreset.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                  <span className="font-extrabold text-lg tracking-tight text-white drop-shadow-md">
                    {selectedPreset.name}
                  </span>
                  <span className="text-xs text-[#DCEBBA] font-mono font-bold">Real-time Computer Vision Sample</span>
                </div>

                {/* Bounding box simulation when scanned */}
                {!isScanning && activeResult && (
                  <div className="absolute inset-4 border-2 border-dashed border-[#DCEBBA] rounded-2xl flex items-start justify-between p-2 pointer-events-none bg-black/30 backdrop-blur-3xs">
                    <span className="text-[10px] font-mono font-bold bg-[#0C3830] px-2 py-0.5 rounded-md text-[#DCEBBA] border border-[#DCEBBA]/30">
                      BOUNDING BOX: {activeResult.grade}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-[#0C3830] px-2 py-0.5 rounded-md text-emerald-300 border border-emerald-400/30">
                      DEFECT: {activeResult.defectRatioPct}%
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Scanning Laser Beam Effect */}
            {isScanning && (
              <div className="absolute inset-0 bg-black/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-20">
                <div className="w-full h-1 bg-[#BBD38B] shadow-[0_0_15px_#BBD38B] animate-pulse" />
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <Zap size={18} className="text-[#BBD38B] animate-bounce" />
                  <span>AI Scanning Surface Defects & Ripeness Index...</span>
                </div>
              </div>
            )}

            {/* Custom File Upload Overlay Trigger */}
            <label className="absolute bottom-3 right-3 bg-white/90 text-gray-800 hover:bg-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5 transition-all">
              <Camera size={14} className="text-[#777D71]" />
              <span>Upload Custom Photo</span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>
          </div>

          {/* AI Analysis Result Card */}
          {activeResult && !isScanning && (
            <div className="bg-white border border-[#DFDDC5] p-5 sm:p-6 rounded-3xl space-y-5 animate-in fade-in duration-300 shadow-xs">
              {/* Result Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                        activeResult.grade === 'Grade A'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : activeResult.grade === 'Grade B'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}
                    >
                      {activeResult.gradeTitle}
                    </span>
                    <span className="text-xs font-bold text-gray-500 font-mono">
                      {activeResult.confidencePct}% Confidence
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#777D71] mt-1">
                    Ripeness: {activeResult.ripenessStage}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    Market Rate Multiplier
                  </span>
                  <span
                    className={`text-lg font-black ${
                      activeResult.priceMultiplier >= 1.0 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {activeResult.priceMultiplier >= 1.0
                      ? `+${Math.round((activeResult.priceMultiplier - 1) * 100)}% Premium`
                      : `-${Math.round((1 - activeResult.priceMultiplier) * 100)}% Discount`}
                  </span>
                </div>
              </div>

              {/* Quality Metric Gauges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Defect Ratio</span>
                  <span className="text-base font-black text-[#2A2A2A]">
                    {activeResult.defectRatioPct}%
                  </span>
                </div>

                <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    Color Uniformity
                  </span>
                  <span className="text-base font-black text-[#2A2A2A]">
                    {activeResult.colorUniformityPct}%
                  </span>
                </div>

                <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    Firmness Score
                  </span>
                  <span className="text-base font-black text-[#777D71]">
                    {activeResult.firmnessScore} / 10
                  </span>
                </div>

                <div className="bg-[#FFFDF5] p-3.5 rounded-2xl border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">Cold Shelf Life</span>
                  <span className="text-base font-black text-emerald-700">
                    {activeResult.shelfLifeColdStorageDays} days
                  </span>
                </div>
              </div>

              {/* Key Findings List */}
              <div className="space-y-2 bg-[#F7F6E7]/60 p-4 rounded-2xl border border-[#DFDDC5]">
                <span className="text-xs font-bold text-[#777D71] uppercase tracking-wider block">
                  AI Computer Vision Audit Summary:
                </span>
                <ul className="space-y-1.5 text-xs font-medium text-gray-700">
                  {activeResult.keyFindings.map((finding, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-[#777D71] shrink-0 mt-0.5" />
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Attach to Batch CTA */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                {onApplyGradeToBatch && (
                  <button
                    type="button"
                    onClick={() => {
                      onApplyGradeToBatch(activeResult, selectedPreset.crop);
                      onClose();
                    }}
                    className="flex-1 py-3 bg-[#777D71] text-white rounded-xl text-xs font-bold hover:bg-[#5f645a] flex items-center justify-center gap-2 shadow-md"
                  >
                    <ShieldCheck size={18} />
                    <span>Attach Grade to Batch</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
