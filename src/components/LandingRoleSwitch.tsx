import React, { useState } from 'react';
import { Warehouse, Package, Landmark, ChevronRight, HelpCircle, Bot } from 'lucide-react';
import { Role } from '../types';
import { AgriCoolAiChatbotModal } from './AgriCoolAiChatbotModal';

interface LandingRoleSwitchProps {
  onSelectRole: (role: Role) => void;
}

export const LandingRoleSwitch: React.FC<LandingRoleSwitchProps> = ({ onSelectRole }) => {
  const [isFaqOpen, setIsFaqOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex flex-col justify-between p-6 sm:p-12 font-sans relative overflow-hidden">
      {/* Decorative background blur shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#BBD38B]/20 rounded-full filter blur-3xl -z-0"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#95B1EE]/20 rounded-full filter blur-3xl -z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#EFD17F]/20 rounded-full filter blur-3xl -z-0"></div>

      {/* Brand Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="bg-[#0C3830] text-[#DCEBBA] p-3 rounded-2xl shadow-md">
            <Warehouse size={28} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#1A2D27] tracking-tight">AgriCool</h1>
            <p className="text-xs text-[#5C736A] font-semibold">Cold-Chain Intelligence Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* FAQ & AI Assistant Icon Button in Header */}
          <button
            onClick={() => setIsFaqOpen(true)}
            className="px-3.5 py-2 rounded-full bg-white border border-[#E2E9E2] text-[#0C3830] text-xs font-extrabold flex items-center gap-2 hover:bg-[#F4F6F4] transition-all shadow-xs cursor-pointer group"
          >
            <HelpCircle size={16} className="text-[#0C3830] group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">FAQ & AI Assistant</span>
          </button>

          <span className="text-xs font-extrabold uppercase tracking-widest px-3 py-1 bg-[#DCEBBA] text-[#0C3830] rounded-full">
            AI-Powered
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto w-full my-auto py-8 space-y-10 z-10">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A2D27] tracking-tight leading-tight">
            Select Your Portal
          </h2>
          <p className="text-sm text-[#5C736A] font-medium">
            Choose your role to access cold-chain monitoring, harvest registration, storage management, or district oversight.
          </p>
        </div>

        {/* Three Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Farmer Portal Card */}
          <button
            onClick={() => onSelectRole('farmer')}
            className="bg-[#F4F6F4] border-2 border-[#E2E9E2] hover:border-[#0C3830] p-6 sm:p-7 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] shadow-xs hover:shadow-xl flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              <div className="flex justify-between items-start">
                <div className="bg-[#0C3830] text-[#DCEBBA] p-3.5 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                  <Package size={28} />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0C3830] bg-[#DCEBBA] px-3 py-1 rounded-full">
                  Farmers
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-[#1A2D27] group-hover:text-[#0C3830] transition-colors">
                  Farmer Portal
                </h3>
                <p className="text-xs text-[#5C736A] leading-relaxed">
                  Register harvests, track cold chain transit, receive spoilage alerts, and book nearby cold storage.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between font-extrabold text-sm text-[#0C3830] border-t border-gray-200/60">
              <span>Continue as Farmer</span>
              <div className="p-2 bg-[#0C3830] text-[#DCEBBA] rounded-xl group-hover:translate-x-1 transition-transform">
                <ChevronRight size={16} />
              </div>
            </div>
          </button>

          {/* Storage Operator Portal Card */}
          <button
            onClick={() => onSelectRole('storage')}
            className="bg-white border-2 border-[#E2E9E2] hover:border-[#364C84] p-6 sm:p-7 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] shadow-xs hover:shadow-xl flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              <div className="flex justify-between items-start">
                <div className="bg-[#364C84] text-[#95B1EE] p-3.5 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                  <Warehouse size={28} />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#364C84] bg-[#95B1EE]/20 px-3 py-1 rounded-full">
                  Storage Owners
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-[#1A2D27] group-hover:text-[#364C84] transition-colors">
                  Storage Owner Portal
                </h3>
                <p className="text-xs text-[#5C736A] leading-relaxed">
                  Monitor temperature zones, view IoT sensor telemetry, track reefer fleet, and manage farmer bookings.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between font-extrabold text-sm text-[#364C84] border-t border-gray-200/60">
              <span>Continue as Storage Owner</span>
              <div className="p-2 bg-[#364C84] text-[#95B1EE] rounded-xl group-hover:translate-x-1 transition-transform">
                <ChevronRight size={16} />
              </div>
            </div>
          </button>

          {/* Government & Regulator Portal Card - Updated to Warm Gold/Wheat Theme #EFD17F & #3A2E1F */}
          <button
            onClick={() => onSelectRole('government')}
            className="bg-white border-2 border-[#EADDC0] hover:border-[#EFD17F] p-6 sm:p-7 rounded-3xl text-left transition-all duration-300 hover:scale-[1.02] shadow-xs hover:shadow-xl flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              <div className="flex justify-between items-start">
                <div className="bg-[#3A2E1F] text-[#EFD17F] p-3.5 rounded-2xl shadow-md group-hover:scale-110 transition-transform">
                  <Landmark size={28} />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#3A2E1F] bg-[#EFD17F] px-3 py-1 rounded-full">
                  Govt & Regulators
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xl font-extrabold text-[#1A2D27] group-hover:text-[#3A2E1F] transition-colors">
                  Government & Policy
                </h3>
                <p className="text-xs text-[#5C736A] leading-relaxed">
                  District cold capacity tracking, food loss prevention audits, subsidy disbursals, and compliance oversight.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-4 flex items-center justify-between font-extrabold text-sm text-[#3A2E1F] border-t border-[#EADDC0]">
              <span>Continue as Govt Official</span>
              <div className="p-2 bg-[#3A2E1F] text-[#EFD17F] rounded-xl group-hover:translate-x-1 transition-transform">
                <ChevronRight size={16} />
              </div>
            </div>
          </button>
        </div>
      </main>

      {/* Floating FAQ & AI Chatbot Badge Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsFaqOpen(true)}
          className="bg-[#0C3830] text-[#DCEBBA] px-5 py-3.5 rounded-full font-extrabold text-xs sm:text-sm flex items-center gap-2.5 shadow-2xl hover:scale-105 transition-all cursor-pointer border border-[#DCEBBA]/30 group"
        >
          <Bot size={20} className="text-[#DCEBBA] group-hover:animate-bounce" />
          <span>Need Help? Ask AI Chatbot</span>
        </button>
      </div>

      {/* FAQ & Chatbot Modal */}
      <AgriCoolAiChatbotModal
        isOpen={isFaqOpen}
        onClose={() => setIsFaqOpen(false)}
        lang="en"
      />
    </div>
  );
};
