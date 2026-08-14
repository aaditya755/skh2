import React, { useState } from 'react';
import { X, MapPin, Calendar, Scale, Compass, CheckCircle2, Sparkles, Navigation, Mic, PlusCircle, PenTool } from 'lucide-react';
import { HarvestBatch, Language } from '../../types';
import { CROP_PRESETS } from '../../data/mockData';
import { translations } from '../../i18n/translations';

interface RegisterBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBatch: (batch: HarvestBatch) => void;
  lang: Language;
}

export const RegisterBatchModal: React.FC<RegisterBatchModalProps> = ({
  isOpen,
  onClose,
  onAddBatch,
  lang,
}) => {
  const t = translations[lang];

  const [selectedCrop, setSelectedCrop] = useState<string>(CROP_PRESETS[0].name);
  const [isCustomCrop, setIsCustomCrop] = useState<boolean>(false);
  const [customCropName, setCustomCropName] = useState<string>('');
  const [customTemp, setCustomTemp] = useState<string>('8–12°C');
  const [customIcon, setCustomIcon] = useState<string>('🌿');

  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [harvestDate, setHarvestDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [gpsLocation, setGpsLocation] = useState<string>('Narayangaon, Pune (19.12° N, 73.98° E)');
  const [isLocating, setIsLocating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showVoiceConfirmed, setShowVoiceConfirmed] = useState(false);

  if (!isOpen) return null;

  const mockVoiceTranscription = () => {
    setIsListening(true);
    setShowVoiceConfirmed(false);

    setTimeout(() => {
      setSelectedCrop('Mangoes');
      setIsCustomCrop(false);
      setQuantityKg(750);
      setHarvestDate(new Date().toISOString().split('T')[0]);

      setIsListening(false);
      setShowVoiceConfirmed(true);

      setTimeout(() => {
        setShowVoiceConfirmed(false);
      }, 4000);
    }, 1800);
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setGpsLocation('Junnar Valley, Pune (19.18° N, 73.88° E)');
      setIsLocating(false);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let commodityName = selectedCrop;
    let icon = '🌾';
    let imageUrl = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80';
    let idealTemp = '10–12°C';
    let idealHumidity = '85–90%';
    let maxDays = 14;
    let isProducer = false;

    if (isCustomCrop && customCropName.trim()) {
      commodityName = customCropName.trim();
      icon = customIcon || '🌿';
      idealTemp = customTemp;
    } else {
      const cropObj = CROP_PRESETS.find((c) => c.name === selectedCrop) || CROP_PRESETS[0];
      commodityName = cropObj.name;
      icon = cropObj.icon;
      imageUrl = cropObj.imageUrl || imageUrl;
      idealTemp = cropObj.idealTemp;
      idealHumidity = cropObj.idealHumidity;
      maxDays = cropObj.maxShelfLifeDays;
      isProducer = !!cropObj.isEthyleneProducer;
    }

    const newBatch: HarvestBatch = {
      id: `#BATCH-${Math.floor(100 + Math.random() * 900)}`,
      commodity: commodityName,
      cropIcon: icon,
      imageUrl,
      quantityKg: Number(quantityKg),
      harvestDate,
      gpsLocation,
      stage: 0, // Harvested
      stageTimestamps: {
        harvested: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      spoilageAlert: {
        urgency: 'good',
        plainTextEn: `Freshly harvested ${commodityName}. Store at ${idealTemp} for optimal shelf life up to ${maxDays} days.`,
        plainTextHi: `ताज़ा काटी गई ${commodityName}। ${maxDays} दिनों तक सुरक्षित रखने के लिए ${idealTemp} पर स्टोर करें।`,
        plainTextMr: `ताजी कापलेली ${commodityName}. ${maxDays} दिवसांपर्यंत चांगल्या स्थितीसाठी ${idealTemp} वर साठवा.`,
        hoursRemaining: maxDays * 24,
      },
      recommendedTemp: idealTemp,
      humidityTarget: idealHumidity,
      isEthyleneProducer: isProducer,
    };

    onAddBatch(newBatch);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2E9E2] rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-[#0C3830] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#DCEBBA] text-[#0C3830] shadow-md">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white tracking-tight">{t.quickRegisterTitle}</h3>
              <p className="text-xs text-[#DCEBBA]/90 font-medium">Log produce details for AI cold-chain tracking</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Voice Input Confirmation Banner */}
          {isListening && (
            <div className="bg-[#0C3830] text-white px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-pulse">
              <Mic size={16} className="text-[#DCEBBA] animate-bounce shrink-0" />
              <span>Listening... Speak produce details (e.g., "750 kg Guava harvested today")</span>
            </div>
          )}

          {showVoiceConfirmed && (
            <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in duration-200">
              <CheckCircle2 size={16} className="text-emerald-700 shrink-0" />
              <span>Voice input recognized! Autofilled fields with 750 kg Mangoes. Review before submitting.</span>
            </div>
          )}

          {/* Crop Selector */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider">
                {t.cropCommodity}
              </label>

              {/* Voice Input Button */}
              <button
                type="button"
                onClick={mockVoiceTranscription}
                disabled={isListening}
                className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
                    : showVoiceConfirmed
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-[#DCEBBA] text-[#0C3830] hover:bg-[#BBD38B] border border-[#0C3830]/20 shadow-2xs'
                }`}
              >
                <Mic size={13} className={isListening ? 'animate-bounce text-rose-600' : 'text-[#0C3830]'} />
                <span>
                  {isListening
                    ? 'Listening...'
                    : showVoiceConfirmed
                    ? 'Autofilled from Voice!'
                    : 'Voice Input'}
                </span>
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {CROP_PRESETS.map((crop) => (
                <button
                  type="button"
                  key={crop.name}
                  onClick={() => {
                    setSelectedCrop(crop.name);
                    setIsCustomCrop(false);
                  }}
                  className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 relative overflow-hidden group cursor-pointer ${
                    !isCustomCrop && selectedCrop === crop.name
                      ? 'bg-white border-[#0C3830] ring-2 ring-[#0C3830] shadow-md'
                      : 'bg-white/80 border-[#E2E9E2] hover:bg-white'
                  }`}
                >
                  {crop.imageUrl ? (
                    <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src={crop.imageUrl}
                        alt={crop.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <span className="text-xl">{crop.icon}</span>
                  )}
                  <div className="text-center">
                    <span className="text-[11px] font-extrabold text-[#1A2D27] block truncate">{crop.name}</span>
                    <span className="text-[9px] text-[#5C736A] font-mono">{crop.idealTemp}</span>
                  </div>
                </button>
              ))}

              {/* Custom Crop Option Button */}
              <button
                type="button"
                onClick={() => {
                  setIsCustomCrop(true);
                  if (!customCropName) setCustomCropName('Guava (अमरूद / पेरू)');
                }}
                className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative cursor-pointer ${
                  isCustomCrop
                    ? 'bg-white border-[#0C3830] ring-2 ring-[#0C3830] shadow-md'
                    : 'bg-[#F4F6F4] border-dashed border-[#0C3830]/40 hover:bg-white'
                }`}
              >
                <div className="p-1.5 rounded-xl bg-[#0C3830] text-[#DCEBBA]">
                  <PlusCircle size={18} />
                </div>
                <span className="text-[11px] font-extrabold text-[#0C3830] block">Other Crop</span>
                <span className="text-[9px] text-gray-500">Custom Choice</span>
              </button>
            </div>

            {/* Custom Crop Text Input Field */}
            {isCustomCrop && (
              <div className="mt-3.5 p-3.5 bg-[#F4F6F4] border border-[#0C3830]/30 rounded-2xl space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#0C3830]">
                  <PenTool size={14} />
                  <span>Enter Custom Crop of Your Choice</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-[#5C736A] mb-1">
                      Crop Name (e.g. Guava, Spinach, Chili, Okra)
                    </label>
                    <input
                      type="text"
                      required={isCustomCrop}
                      value={customCropName}
                      onChange={(e) => setCustomCropName(e.target.value)}
                      placeholder="Enter produce name..."
                      className="w-full px-3 py-2 bg-white border border-[#E2E9E2] rounded-xl text-xs font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-extrabold uppercase text-[#5C736A] mb-1">
                      Ideal Target Storage Temp
                    </label>
                    <input
                      type="text"
                      value={customTemp}
                      onChange={(e) => setCustomTemp(e.target.value)}
                      placeholder="e.g. 8–12°C"
                      className="w-full px-3 py-2 bg-white border border-[#E2E9E2] rounded-xl text-xs font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quantity & Harvest Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1.5">
                {t.quantityKg}
              </label>
              <div className="relative">
                <Scale size={18} className="absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="number"
                  required
                  min={10}
                  max={50000}
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1.5">
                {t.harvestDate}
              </label>
              <div className="relative">
                <Calendar size={18} className="absolute left-3.5 top-3 text-gray-400" />
                <input
                  type="date"
                  required
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
                />
              </div>
            </div>
          </div>

          {/* GPS Location */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider">
                {t.gpsLocation}
              </label>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="text-[11px] font-bold text-[#0C3830] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Navigation size={12} className={isLocating ? 'animate-spin' : ''} />
                <span>{isLocating ? 'Detecting...' : t.autoDetectGps}</span>
              </button>
            </div>
            <div className="relative">
              <MapPin size={18} className="absolute left-3.5 top-3 text-gray-400" />
              <input
                type="text"
                required
                value={gpsLocation}
                onChange={(e) => setGpsLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 border border-[#E2E9E2] text-[#1A2D27] rounded-2xl font-extrabold text-xs sm:text-sm hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {t.actions.cancel}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-[#0C3830] text-white rounded-2xl font-extrabold text-xs sm:text-sm hover:bg-[#082822] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 size={16} className="text-[#DCEBBA]" />
              <span>{t.submitHarvest}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
