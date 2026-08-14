import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User, HelpCircle, MessageCircle, RefreshCw, Thermometer, Droplets, ShieldCheck, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
}

interface AgriCoolAiChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AgriCoolAiChatbotModal: React.FC<AgriCoolAiChatbotModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isHi = lang === 'hi';
  const isMr = lang === 'mr';

  const initialGreeting: ChatMessage = {
    id: 'msg-1',
    sender: 'ai',
    text: isHi
      ? 'नमस्ते! मैं आपका एग्रीकूल एआई कोल्ड-चेन सलाहकार हूँ। आप मुझसे फसल कटाई उपरांत प्रबंधन, कोल्ड स्टोरेज तापमान, इथिलीन गैस अलगाव या सुरक्षित परिवहन के बारे में कुछ भी पूछ सकते हैं।'
      : isMr
      ? 'नमस्कार! मी तुमचा अ‍ॅग्रीकूल एआय कोल्ड-चेन सल्लागार आहे. आपण मला काढणीपश्चात व्यवस्थापन, शीतगृह तापमान, इथिलिन गॅस अलगीकरण किंवा सुरक्षित वाहतुकीविषयी काहीही विचारू शकता.'
      : 'Hello! I am your AgriCool AI Cold-Chain Assistant. Ask me anything about harvest preservation, target storage temperatures, ethylene segregation, or transport guidelines.',
    timestamp: 'Just now',
    suggestions: isHi
      ? [
          'क्या टमाटर और सेब को साथ रख सकते हैं?',
          'अंगूर के लिए आदर्श तापमान क्या है?',
          'प्याज में अंकुरण और सड़न कैसे रोकें?',
          'नजदीकी कोल्ड स्टोरेज कैसे बुक करें?',
        ]
      : isMr
      ? [
          'टोमॅटो आणि सफरचंद एकत्र साठवता येईल का?',
          'द्राक्षांसाठी योग्य तापमान व आर्द्रता कोणती?',
          'कांद्याची साठवणूक व टिकवण क्षमता कशी वाढवावी?',
          'जवळचे कोल्ड स्टोरेज कसे बुक करावे?',
        ]
      : [
          'Can I store Tomatoes and Apples together?',
          'What is the ideal temp for Grapes?',
          'How to prevent onion rot in storage?',
          'How to book a cold room slot?',
        ],
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (userQuery?: string) => {
    const textToSend = userQuery || inputText;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userQuery) setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const queryLower = textToSend.toLowerCase();
      let aiResponseText = '';

      if (queryLower.includes('tomato') || queryLower.includes('apple') || queryLower.includes('टोमॅटो') || queryLower.includes('टमाटर') || queryLower.includes('इथिलीन')) {
        aiResponseText = isHi
          ? '⚠️ नहीं! टमाटर और सेब दोनों अधिक मात्रा में इथिलीन गैस छोड़ते हैं। इन्हें एक ही कोल्ड चेंबर में साथ रखने से दोनों फसलें जल्दी नरम हो जाती हैं और सड़ने लगती हैं। कृपया इन्हें अलग-अलग स्टोरेज ज़ोन में रखें।'
          : isMr
          ? '⚠️ नाही! टोमॅटो आणि सफरचंद दोन्हीही भरपूर प्रमाणात इथिलिन वायू उत्सर्जित करतात. त्यांना एकाच कोल्ड झोनमध्ये एकत्र ठेवल्यास दोन्ही पिके लवकर मऊ पडून खराब होतात. त्यांना स्वतंत्र चेंबरमध्ये साठवा.'
          : '⚠️ Warning: Tomatoes and Apples are both high Ethylene producers! Storing them together accelerates softening and pulp degradation. Keep them segregated in separate zones.';
      } else if (queryLower.includes('grape') || queryLower.includes('अंगूर') || queryLower.includes('द्राक्ष')) {
        aiResponseText = isHi
          ? '🍇 अंगूर के लिए आदर्श तापमान 0°C से 1°C और सापेक्ष आर्द्रता 90–95% बनाए रखें। तुड़ाई के 4-6 घंटे में प्री-कूलिंग करने से अंगूर 45 दिनों तक पूरी तरह ताज़ा और डंडी हरी रहती है।'
          : isMr
          ? '🍇 द्राक्षांसाठी आदर्श तापमान 0°C ते 1°C आणि सापेक्ष आर्द्रता 90–95% ठेवणे आवश्यक आहे. काढणीनंतर 4-6 तासांत प्री-कूलिंग केल्यास द्राक्षे 45 दिवसांपर्यंत ताजी आणि देठ हिरवे राहतात.'
          : '🍇 For Grapes, maintain a strict temperature of 0°C to 1°C with 90–95% Relative Humidity. Precooling within 6 hours of harvest extends shelf life up to 45 days.';
      } else if (queryLower.includes('onion') || queryLower.includes('प्याज') || queryLower.includes('कांदा')) {
        aiResponseText = isHi
          ? '🧅 प्याज को सूखे और हवादार वातावरण (तापमान 0°C – 2°C, आर्द्रता 65–70%) में रखें। अधिक नमी होने पर प्याज में अंकुरण (sprouting) और फफूंद लगने का खतरा रहता है।'
          : isMr
          ? '🧅 कांद्यासाठी कोरडी व थंड हवा (तापमान 0°C ते 2°C, दमटपणा 65–70%) आवश्यक आहे. हवेत जास्त ओलसरपणा असल्यास कांद्याला कोंब फुटतात आणि बुरशी लागण्याचा धोका असतो.'
          : '🧅 Onions require dry cold conditions (0–2°C with low humidity 65–70%). High humidity induces sprouting and neck rot.';
      } else if (queryLower.includes('book') || queryLower.includes('बुकिंग') || queryLower.includes('कोल्ड स्टोरेज')) {
        aiResponseText = isHi
          ? '🏭 आप "कोल्ड स्टोरेज खोजें" टैब पर जाकर अपने नज़दीकी प्रमाणित कोल्ड स्टोरेज चुन सकते हैं और सीधे प्रति किग्रा दर पर अपनी फसल हेतु स्थान बुक कर सकते हैं।'
          : isMr
          ? '🏭 आपण "कोल्ड स्टोरेज शोधा" पर्यायावर जाऊन आपल्या जवळचे प्रमाणित शीतगृह निवडू शकता आणि थेट प्रति किलो भाड्याने जागा बुक करू शकता.'
          : '🏭 Navigate to the "Find Cold Storage" tab on your dashboard, select a verified facility near your village, and click "Book Storage" to reserve your slot.';
      } else {
        aiResponseText = isHi
          ? `एग्रीकूल एआई कोल्ड-चेन सुरक्षा सुझाव: तुड़ाई के 4 घंटे के भीतर फसल की प्री-कूलिंग करें। ताज़गी और वजन बनाए रखने के लिए उपयुक्त तापमान और इथिलीन पृथक्करण नियमों का पालन करें।`
          : isMr
          ? `अ‍ॅग्रीकूल एआय कोल्ड-चेन सुरक्षा सल्ला: काढणीनंतर 4 तासांच्या आत शेतमालाचे प्री-कूलिंग करा. ताजेपणा व वजन टिकवण्यासाठी योग्य तापमान आणि इथिलिन अलगीकरण नियमांचे पालन करा.`
          : `AgriCool AI Cold-Chain Recommendation: Ensure produce is precooled within 4 hours of harvest. Follow strict temperature controls and separate ethylene producers to prevent spoilage.`;
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white border border-[#E2E9E2] rounded-3xl max-w-xl w-full h-[85vh] sm:h-[650px] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Chat Header */}
        <div className="bg-[#0C3830] text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#DCEBBA] text-[#0C3830] shadow-md">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <span>AgriCool AI Assistant</span>
                <span className="text-[10px] bg-[#DCEBBA] text-[#0C3830] font-mono px-2 py-0.5 rounded-full uppercase font-black">
                  24x7 Live
                </span>
              </h3>
              <p className="text-xs text-[#DCEBBA] font-medium">
                {isHi ? 'कोल्ड चेन और फसल सुरक्षा के उत्तर तुरंत पाएं' : isMr ? 'शीतगृह आणि पीक संरक्षणाचे उत्तरे त्वरित मिळवा' : 'Instant AI advice on crop preservation & cold storage'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 p-4 sm:p-5 space-y-4 overflow-y-auto bg-[#F4F6F4]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[80%]">
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#0C3830] text-[#DCEBBA] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#0C3830] text-white rounded-br-none'
                      : 'bg-white border border-[#E2E9E2] text-[#1A2D27] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`text-[9px] block text-right mt-1 font-mono ${
                      msg.sender === 'user' ? 'text-[#DCEBBA]' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#DCEBBA] text-[#0C3830] flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    <User size={16} />
                  </div>
                )}
              </div>

              {/* Suggestions chips if available */}
              {msg.suggestions && msg.suggestions.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 pl-10 max-w-[95%]">
                  {msg.suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(sug)}
                      className="px-3 py-1.5 rounded-full bg-white border border-[#E2E9E2] text-[#0C3830] text-[11px] font-extrabold hover:bg-[#DCEBBA] transition-colors shadow-2xs flex items-center gap-1 text-left cursor-pointer"
                    >
                      <span>{sug}</span>
                      <ArrowRight size={12} className="shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs font-bold text-[#0C3830]">
              <div className="w-8 h-8 rounded-full bg-[#0C3830] text-[#DCEBBA] flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-[#E2E9E2] px-4 py-2.5 rounded-2xl shadow-2xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#0C3830] rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-[#0C3830] rounded-full animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 bg-[#0C3830] rounded-full animate-bounce delay-200" />
                <span className="text-[11px] text-[#5C736A] ml-1">Analyzing cold-chain data...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E2E9E2] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isHi
                  ? 'फसल, तापमान या इथिलीन गैस के बारे में पूछें...'
                  : isMr
                  ? 'पीक, तापमान किंवा इथिलिन गॅसबद्दल विचारू शकता...'
                  : 'Ask about crop shelf life, temp, ethylene...'
              }
              className="flex-1 px-4 py-2.5 bg-[#F4F6F4] border border-[#E2E9E2] rounded-2xl text-xs sm:text-sm font-medium text-[#1A2D27] focus:outline-none focus:ring-2 focus:ring-[#0C3830]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-2xl bg-[#0C3830] text-white hover:bg-[#082822] disabled:opacity-40 transition-all shadow-xs cursor-pointer shrink-0"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
