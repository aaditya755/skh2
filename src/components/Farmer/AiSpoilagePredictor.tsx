import React, { useState } from 'react';
import {
  Sparkles,
  Thermometer,
  Droplets,
  Clock,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Layers,
  Bot,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
} from 'lucide-react';
import { CROP_PRESETS } from '../../data/mockData';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';

interface AiSpoilagePredictorProps {
  lang: Language;
}

export const AiSpoilagePredictor: React.FC<AiSpoilagePredictorProps> = ({ lang }) => {
  const t = translations[lang];

  const isHi = lang === 'hi';
  const isMr = lang === 'mr';

  // Active Tool Tab State: 'predictor' | 'ethylene' | 'chatbot'
  const [activeTool, setActiveTool] = useState<'predictor' | 'ethylene' | 'chatbot'>('predictor');

  // Tool 1 State: Predictor
  const [crop, setCrop] = useState(CROP_PRESETS[0]);
  const [ambientTemp, setAmbientTemp] = useState<number>(32);
  const [ambientHumidity, setAmbientHumidity] = useState<number>(65);
  const [transitHours, setTransitHours] = useState<number>(6);
  const [prediction, setPrediction] = useState<{
    riskLevel: 'low' | 'medium' | 'high';
    shelfLifeHours: number;
    adviceEn: string;
    adviceHi: string;
    adviceMr: string;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Tool 2 State: Ethylene Compatibility Checker
  const [cropA, setCropA] = useState(CROP_PRESETS[0]); // Tomatoes
  const [cropB, setCropB] = useState(CROP_PRESETS[1]); // Grapes

  // Tool 3 State: Embedded Chatbot
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: isHi
        ? 'नमस्ते! मैं आपका एआई फसल सलाहकार हूँ। आप मुझसे फसल कटाई, शेल्फ-लाइफ, शीतगृह तापमान या इथिलीन गैस अलगाव के बारे में कोई भी प्रश्न पूछ सकते हैं।'
        : isMr
        ? 'नमस्कार! मी तुमचा एआय पीक सल्लागार आहे. पीक काढणी, साठवण कालावधी, शीतगृह तापमान किंवा इथिलिन गॅस अलगीकरणाविषयी मला कोणताही प्रश्न विचारा.'
        : 'Hello! Ask me any questions regarding crop preservation, cold storage temperature, or ethylene segregation.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const calculateRisk = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const idealTempNum = parseInt(crop.idealTemp);
      const tempDelta = Math.max(0, ambientTemp - idealTempNum);

      let riskLevel: 'low' | 'medium' | 'high' = 'low';
      let factor = 1;

      if (tempDelta > 15 || transitHours > 10) {
        riskLevel = 'high';
        factor = 0.25;
      } else if (tempDelta > 7 || transitHours > 5) {
        riskLevel = 'medium';
        factor = 0.55;
      }

      const totalHours = Math.round(crop.maxShelfLifeDays * 24 * factor);

      let adviceEn = '';
      let adviceHi = '';
      let adviceMr = '';

      if (riskLevel === 'high') {
        adviceEn = `High ambient temperature (${ambientTemp}°C) accelerates spoilage! Move ${crop.name} to cold storage within ${Math.min(4, Math.round(totalHours * 0.2))} hours to preserve texture and market value.`;
        adviceHi = `परिवेश का उच्च तापमान (${ambientTemp}°C) फसल को तेजी से खराब कर सकता है! ${crop.name} की ताज़गी और बाजार मूल्य बनाए रखने के लिए इसे ${Math.min(4, Math.round(totalHours * 0.2))} घंटे के भीतर कोल्ड स्टोरेज में सुरक्षित करें।`;
        adviceMr = `परिसरातील जास्त तापमानामुळे (${ambientTemp}°C) शेतमाल लवकर मऊ पडून खराब होऊ शकतो. ${crop.name} चा दर्जा व बाजारभाव टिकवण्यासाठी पुढील ${Math.min(4, Math.round(totalHours * 0.2))} तासांच्या आत शीतगृहात हलवा.`;
      } else if (riskLevel === 'medium') {
        adviceEn = `Moderate risk. Produce can remain at current condition for ~${Math.round(totalHours / 24)} days, but precooling within 12 hours is recommended for long storage.`;
        adviceHi = `मध्यम जोखिम। मौजूदा परिस्थितियों में फसल ~${Math.round(totalHours / 24)} दिन तक ठीक रह सकती है, परंतु लंबी शेल्फ-लाइफ के लिए 12 घंटे के भीतर प्री-कूलिंग और स्टोरेज कराने की सलाह दी जाती है।`;
        adviceMr = `मध्यम धोका. चालू वातावरणात पीक ~${Math.round(totalHours / 24)} दिवस टिकू शकते, परंतु दीर्घकाळ सुरक्षिततेसाठी 12 तासांच्या आत प्री-कूलिंग व साठवणूक करणे फायदेशीर ठरेल.`;
      } else {
        adviceEn = `Optimal condition! Current environment is close to target. Estimated safe window: ${Math.round(totalHours / 24)} days.`;
        adviceHi = `उत्तम एवं अनुकूल स्थिति! परिवेशीय तापमान फसल के अनुकूल है। सुरक्षित शेल्फ-लाइफ विंडो: ${Math.round(totalHours / 24)} दिन।`;
        adviceMr = `उत्कृष्ट व अनुकूल स्थिती! सध्याचे तापमान पिकासाठी योग्य आहे. सुरक्षित साठवणूक कालावधी: ${Math.round(totalHours / 24)} दिवस.`;
      }

      setPrediction({
        riskLevel,
        shelfLifeHours: totalHours,
        adviceEn,
        adviceHi,
        adviceMr,
      });
      setIsCalculating(false);
    }, 400);
  };

  const getAdvice = () => {
    if (!prediction) return '';
    if (isHi) return prediction.adviceHi;
    if (isMr) return prediction.adviceMr;
    return prediction.adviceEn;
  };

  const handleSendChat = (q?: string) => {
    const text = q || chatInput;
    if (!text.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user' as const, text }];
    setChatMessages(newMsgs);
    if (!q) setChatInput('');

    setTimeout(() => {
      let resp = '';
      const queryLower = text.toLowerCase();
      if (queryLower.includes('tomato') || queryLower.includes('apple') || queryLower.includes('इथिलीन')) {
        resp = isHi
          ? 'टमाटर और सेब दोनों उच्च इथिलीन गैस उत्सर्जक हैं। इन्हें एक ही कोल्ड स्टोरेज चेंबर में न रखें, अन्यथा फसल समय से पहले पककर सड़ सकती है।'
          : isMr
          ? 'टोमॅटो आणि सफरचंद दोन्हीही भरपूर इथिलिन वायू सोडतात. त्यांना एकाच शीतगृह चेंबरमध्ये एकत्र ठेवू नका, अन्यथा फळे मुदतीपूर्वी पिकून खराब होतील.'
          : 'Tomatoes and Apples both emit ethylene gas. Keep them separated in distinct storage zones.';
      } else if (queryLower.includes('grape') || queryLower.includes('द्राक्ष') || queryLower.includes('अंगूर')) {
        resp = isHi
          ? 'अंगूर के लिए आदर्श तापमान 0°C से 1°C और आर्द्रता 90–95% बनाए रखें। इस तापमान पर अंगूर 45 दिनों तक सुरक्षित व ताज़ा रहते हैं।'
          : isMr
          ? 'द्राक्षांसाठी आदर्श तापमान 0°C ते 1°C आणि दमटपणा 90–95% ठेवावा. या तापमानात द्राक्षे 45 दिवसांपर्यंत पूर्णपणे ताजी राहतात.'
          : 'Keep Grapes at 0–1°C with 90–95% Humidity to preserve stems for up to 45 days.';
      } else {
        resp = isHi
          ? 'कटाई के 4 घंटे के भीतर प्री-कूलिंग करने से फसल की शेल्फ-लाइफ 3 गुना तक बढ़ जाती है और वजन में नमी की कमी नहीं होती।'
          : isMr
          ? 'काढणीनंतर 4 तासांच्या आत प्री-कूलिंग केल्यास शेतमालाची टिकवण क्षमता 3 पट वाढते आणि मालाचे वजन टिकून राहते.'
          : 'Precooling crops within 4 hours of harvest triples safe storage shelf-life.';
      }
      setChatMessages((prev) => [...prev, { sender: 'ai', text: resp }]);
    }, 500);
  };

  // Ethylene Check Calculation
  const isCropAProducer = cropA.isEthyleneProducer;
  const isCropBSensitive = cropB.ethyleneSensitive;
  const isCompatible = !(isCropAProducer && isCropBSensitive) && !(cropB.isEthyleneProducer && cropA.ethyleneSensitive);

  return (
    <div className="bg-white border border-[#E2E9E2] rounded-3xl p-6 shadow-2xs space-y-6">
      {/* Header & Feature Selector Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E9E2] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#0C3830] text-[#DCEBBA] rounded-2xl shadow-xs">
            <Sparkles size={22} />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#1A2D27]">
              {isHi ? 'एआई फसल सुरक्षा केंद्र' : isMr ? 'एआय पीक संरक्षण केंद्र' : 'AI Crop Preservation Advisor'}
            </h3>
            <p className="text-xs text-[#5C736A] font-medium">
              {isHi ? 'स्मार्ट शेल्फ-लाइफ, इथिलीन अनुकूलता और एआई चैट सहायता' : isMr ? 'स्मार्ट साठवण काळ, इथिलिन सुसंगतता आणि एआय चॅट' : 'Smart shelf-life predictor, gas segregation checker & AI chatbot assistant'}
            </p>
          </div>
        </div>

        {/* 3 AI Feature Toggles */}
        <div className="flex items-center gap-1.5 bg-[#F4F6F4] p-1.5 rounded-2xl border border-[#E2E9E2] self-start md:self-auto">
          <button
            onClick={() => setActiveTool('predictor')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTool === 'predictor'
                ? 'bg-[#0C3830] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isHi ? '1. शेल्फ-लाइफ कैलकुलेटर' : isMr ? '1. साठवण काळ मोजणी' : '1. Shelf Life Predictor'}
          </button>

          <button
            onClick={() => setActiveTool('ethylene')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeTool === 'ethylene'
                ? 'bg-[#0C3830] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {isHi ? '2. इथिलीन गैस जांच' : isMr ? '2. इथिलिन गॅस तपासणी' : '2. Ethylene Compatibility'}
          </button>

          <button
            onClick={() => setActiveTool('chatbot')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1 ${
              activeTool === 'chatbot'
                ? 'bg-[#0C3830] text-white shadow-2xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Bot size={14} />
            <span>{isHi ? '3. एआई चैटबॉट' : isMr ? '3. एआय चॅटबॉट' : '3. AI Assistant'}</span>
          </button>
        </div>
      </div>

      {/* Feature 1: Shelf Life Predictor */}
      {activeTool === 'predictor' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Crop dropdown */}
            <div>
              <label className="block text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1">
                {isHi ? 'फसल चुनें' : isMr ? 'पीक निवडा' : 'Produce Crop'}
              </label>
              <select
                value={crop.name}
                onChange={(e) => {
                  const found = CROP_PRESETS.find((c) => c.name === e.target.value);
                  if (found) setCrop(found);
                }}
                className="w-full p-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
              >
                {CROP_PRESETS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ambient Temp slider */}
            <div>
              <div className="flex justify-between text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1">
                <span>{isHi ? 'आस-पास का तापमान' : isMr ? 'हवामान तापमान' : 'Ambient Temp'}</span>
                <span className="text-[#0C3830] font-mono">{ambientTemp}°C</span>
              </div>
              <input
                type="range"
                min={15}
                max={45}
                value={ambientTemp}
                onChange={(e) => setAmbientTemp(Number(e.target.value))}
                className="w-full accent-[#0C3830]"
              />
            </div>

            {/* Ambient Humidity */}
            <div>
              <div className="flex justify-between text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1">
                <span>{isHi ? 'नमी (आर्द्रता)' : isMr ? 'दमटपणा' : 'Humidity'}</span>
                <span className="text-[#0C3830] font-mono">{ambientHumidity}%</span>
              </div>
              <input
                type="range"
                min={30}
                max={98}
                value={ambientHumidity}
                onChange={(e) => setAmbientHumidity(Number(e.target.value))}
                className="w-full accent-[#0C3830]"
              />
            </div>

            {/* Transit hours */}
            <div>
              <div className="flex justify-between text-xs font-extrabold text-[#1A2D27] uppercase tracking-wider mb-1">
                <span>{isHi ? 'परिवहन समय' : isMr ? 'वाहतूक वेळ' : 'Transit Time'}</span>
                <span className="text-[#0C3830] font-mono">{transitHours} hrs</span>
              </div>
              <input
                type="range"
                min={1}
                max={24}
                value={transitHours}
                onChange={(e) => setTransitHours(Number(e.target.value))}
                className="w-full accent-[#0C3830]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={calculateRisk}
              disabled={isCalculating}
              className="bg-[#0C3830] text-white px-6 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 hover:bg-[#082822] transition-all shadow-xs cursor-pointer"
            >
              {isCalculating ? (
                <>
                  <RefreshCw size={16} className="animate-spin text-[#DCEBBA]" />
                  <span>Calculating...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} className="text-[#DCEBBA]" />
                  <span>{t.predictShelfLifeBtn}</span>
                </>
              )}
            </button>
          </div>

          {/* Output card */}
          {prediction && (
            <div
              className={`p-5 rounded-2xl border transition-all animate-in fade-in duration-300 ${
                prediction.riskLevel === 'high'
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : prediction.riskLevel === 'medium'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {prediction.riskLevel === 'high' ? (
                  <AlertTriangle size={24} className="text-rose-600 shrink-0 mt-0.5" />
                ) : prediction.riskLevel === 'medium' ? (
                  <AlertTriangle size={24} className="text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck size={24} className="text-emerald-600 shrink-0 mt-0.5" />
                )}

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm">
                      {prediction.riskLevel === 'high'
                        ? 'High Spoilage Risk'
                        : prediction.riskLevel === 'medium'
                        ? 'Moderate Risk Alert'
                        : 'Safe Window'}
                    </span>
                    <span className="px-2.5 py-0.5 bg-white/90 rounded-full text-[11px] font-mono font-extrabold shadow-2xs">
                      Safe period: {Math.round(prediction.shelfLifeHours / 24)} days ({prediction.shelfLifeHours} hrs)
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold leading-relaxed">{getAdvice()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feature 2: Ethylene Gas Compatibility Checker */}
      {activeTool === 'ethylene' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <p className="text-xs text-[#5C736A] font-semibold">
            {isHi
              ? 'दो फसलों का चयन करें और जांचें कि क्या वे एक ही कोल्ड रूम ज़ोन में सुरक्षित रखी जा सकती हैं:'
              : isMr
              ? 'दोन पिके निवडा आणि ती एकाच कोल्ड रूममध्ये सुरक्षित ठेवता येतील का ते तपासा:'
              : 'Select two produce items to verify if they can share the same cold storage zone safely:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl space-y-2">
              <label className="block text-xs font-extrabold text-[#1A2D27] uppercase">Produce A</label>
              <select
                value={cropA.name}
                onChange={(e) => {
                  const found = CROP_PRESETS.find((c) => c.name === e.target.value);
                  if (found) setCropA(found);
                }}
                className="w-full p-2.5 bg-white border border-[#E2E9E2] rounded-xl text-xs font-bold text-[#1A2D27]"
              >
                {CROP_PRESETS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-[#5C736A] font-medium block">
                Ethylene Producer: {cropA.isEthyleneProducer ? 'YES (High)' : 'No'}
              </span>
            </div>

            <div className="p-4 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl space-y-2">
              <label className="block text-xs font-extrabold text-[#1A2D27] uppercase">Produce B</label>
              <select
                value={cropB.name}
                onChange={(e) => {
                  const found = CROP_PRESETS.find((c) => c.name === e.target.value);
                  if (found) setCropB(found);
                }}
                className="w-full p-2.5 bg-white border border-[#E2E9E2] rounded-xl text-xs font-bold text-[#1A2D27]"
              >
                {CROP_PRESETS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-[#5C736A] font-medium block">
                Ethylene Sensitive: {cropB.ethyleneSensitive ? 'YES (High Sensitive)' : 'No'}
              </span>
            </div>
          </div>

          {/* Compatibility Verdict Box */}
          <div
            className={`p-5 rounded-2xl border transition-all ${
              isCompatible
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCompatible ? (
                <CheckCircle2 size={24} className="text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertOctagon size={24} className="text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <h4 className="font-extrabold text-sm">
                  {isCompatible
                    ? isHi
                      ? '✓ संगत: एक साथ रख सकते हैं'
                      : isMr
                      ? '✓ सुसंगत: एकत्र ठेवू शकता'
                      : '✓ Compatible: Can be stored together'
                    : isHi
                    ? '⚠️ असंगत: अलग रखें!'
                    : isMr
                    ? '⚠️ असुसंगत: वेगळे ठेवा!'
                    : '⚠️ Incompatible: Segregation Required!'}
                </h4>
                <p className="text-xs font-semibold mt-1 leading-relaxed">
                  {isCompatible
                    ? isHi
                      ? `${cropA.name} और ${cropB.name} के बीच इथिलीन गैस का कोई टकराव नहीं है। इन्हें एक ही कोल्ड स्टोरेज ज़ोन में सुरक्षित रूप से रखा जा सकता है।`
                      : isMr
                      ? `${cropA.name} आणि ${cropB.name} मध्ये इथिलिन वायूचा कोणताही विपरित परिणाम होत नाही. यांना एकाच शीतगृह विभागात सुरक्षित साठवता येईल.`
                      : `${cropA.name} and ${cropB.name} do not clash in ethylene gas emissions. Safe to share Cold Storage Zone.`
                    : isHi
                    ? `चेतावनी: ${cropA.name} अधिक मात्रा में इथिलीन गैस उत्सर्जित करता है, जिससे ${cropB.name} समय से पहले पककर सड़ सकता है। इन्हें अलग-अलग चेंबर में रखें।`
                    : isMr
                    ? `इशारा: ${cropA.name} मधून जास्त प्रमाणात इथिलिन वायू उत्सर्जित होतो, ज्यामुळे ${cropB.name} मुदतीपूर्वी पिकून मऊ पडू शकते. यांना वेगवेगळ्या चेंबरमध्ये ठेवा.`
                    : `${cropA.name} releases high ethylene gas which accelerates ripening/softening in ${cropB.name}. Store in separate cold chambers.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feature 3: Embedded Chatbot Assistant */}
      {activeTool === 'chatbot' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div className="bg-[#F4F6F4] p-4 rounded-2xl border border-[#E2E9E2] max-h-56 overflow-y-auto space-y-3">
            {chatMessages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2 text-xs font-medium ${
                  m.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    m.sender === 'user'
                      ? 'bg-[#0C3830] text-white rounded-br-none'
                      : 'bg-white border border-[#E2E9E2] text-[#1A2D27] rounded-bl-none shadow-2xs'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder={
                isHi
                  ? 'फसल सुरक्षा के बारे में पूछें...'
                  : isMr
                  ? 'पीक संरक्षणाबद्दल विचारू शकता...'
                  : 'Ask AI assistant...'
              }
              className="flex-1 px-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs font-semibold text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
            />
            <button
              onClick={() => handleSendChat()}
              className="p-2.5 bg-[#0C3830] text-white rounded-2xl hover:bg-[#082822] cursor-pointer"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
