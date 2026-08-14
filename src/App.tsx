import React, { useState } from 'react';
import { Role, Language, HarvestBatch, StorageUnit, StorageZone, InventoryItem, StorageRequest, SystemAlert } from './types';
import {
  INITIAL_BATCHES,
  INITIAL_STORAGE_UNITS,
  INITIAL_STORAGE_ZONES,
  INITIAL_INVENTORY,
  INITIAL_REQUESTS,
  INITIAL_SYSTEM_ALERTS,
} from './data/mockData';
import { LandingRoleSwitch } from './components/LandingRoleSwitch';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { FarmerDashboard } from './components/Farmer/FarmerDashboard';
import { RegisterBatchModal } from './components/Farmer/RegisterBatchModal';
import { StorageBookingModal } from './components/Farmer/StorageBookingModal';
import { BatchDetailsModal } from './components/Farmer/BatchDetailsModal';
import { AiQualityGradingModal } from './components/AiQualityGradingModal';
import { StorageOwnerDashboard } from './components/Storage/StorageOwnerDashboard';
import { AddZoneModal } from './components/Storage/AddZoneModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AgriCoolAiChatbotModal } from './components/AgriCoolAiChatbotModal';

export default function App() {
  const [role, setRole] = useState<Role>(null); // null shows landing screen
  const [lang, setLang] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  // Core Data State
  const [batches, setBatches] = useState<HarvestBatch[]>(INITIAL_BATCHES);
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>(INITIAL_STORAGE_UNITS);
  const [storageZones, setStorageZones] = useState<StorageZone[]>(INITIAL_STORAGE_ZONES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [requests, setRequests] = useState<StorageRequest[]>(INITIAL_REQUESTS);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_SYSTEM_ALERTS);

  // Modal Control States
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedStorageUnit, setSelectedStorageUnit] = useState<StorageUnit | null>(null);
  const [isBatchDetailsModalOpen, setIsBatchDetailsModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<HarvestBatch | null>(null);
  const [isAddZoneModalOpen, setIsAddZoneModalOpen] = useState(false);
  const [isQualityGradingModalOpen, setIsQualityGradingModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChatbotModalOpen, setIsChatbotModalOpen] = useState(false);

  // User Profile State
  const [userProfile, setUserProfile] = useState({
    name: 'Rajesh Kadam',
    phone: '+91 98230 41102',
    location: 'Narayangaon, Pune, Maharashtra',
    cropSpecialty: 'Tomatoes & Mangoes',
    whatsappAlerts: true,
    smsAlerts: true,
  });

  // Handler: Save AI Quality Grade Result to active batch
  const handleQualityGraded = (commodity: string, grade: string, shelfLifeDays: number) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.commodity.toLowerCase() === commodity.toLowerCase() || b.id === selectedBatch?.id) {
          return {
            ...b,
            qualityGrade: grade as any,
            expiresAtTimestamp: Date.now() + shelfLifeDays * 24 * 3600 * 1000,
          };
        }
        return b;
      })
    );
  };

  // Handler: Add new harvest batch
  const handleAddBatch = (newBatch: HarvestBatch) => {
    setBatches((prev) => [newBatch, ...prev]);
  };

  // Handler: Submit new farmer booking request
  const handleRequestSubmitted = (newReq: StorageRequest) => {
    setRequests((prev) => [newReq, ...prev]);
    setAlerts((prev) => [
      {
        id: `ALT-${Date.now()}`,
        title: 'New Booking Request',
        message: `${newReq.farmerName} requested storage for ${newReq.quantityKg}kg ${newReq.commodity}`,
        severity: 'info',
        timestamp: 'Just now',
      },
      ...prev,
    ]);
  };

  // Handler: Accept farmer booking request
  const handleAcceptRequest = (reqId: string) => {
    const req = requests.find((r) => r.id === reqId);
    if (!req) return;

    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'accepted' } : r))
    );

    const newInventoryItem: InventoryItem = {
      id: `INV-${Math.floor(900 + Math.random() * 100)}`,
      batchId: `#BATCH-${Math.floor(100 + Math.random() * 900)}`,
      commodity: req.commodity,
      farmerName: req.farmerName,
      quantityKg: req.quantityKg,
      entryDate: req.startDate,
      expectedExitDate: new Date(
        new Date(req.startDate).getTime() + req.durationDays * 86400000
      )
        .toISOString()
        .split('T')[0],
      zoneId: 'ZONE-B2',
      zoneName: req.requestedZone,
      status: 'Stored',
      storageFeeAccrued: Math.round(req.estimatedCost * 0.25),
    };

    setInventory((prev) => [newInventoryItem, ...prev]);
  };

  // Handler: Reject booking request
  const handleRejectRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'rejected' } : r))
    );
  };

  // Handlers for Alert Read States
  const handleToggleAlertRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, read: !a.read } : a))
    );
  };

  const handleMarkAllAlertsRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  // Handler: Add new storage zone
  const handleAddZone = (newZone: StorageZone) => {
    setStorageZones((prev) => [...prev, newZone]);
  };

  // Handler: Simulate IoT Telemetry Fluctuation
  const handleSimulateTelemetry = () => {
    setStorageZones((prev) =>
      prev.map((z) => {
        const deltaTemp = (Math.random() - 0.5) * 0.8;
        const newTemp = Number((z.currentTemp + deltaTemp).toFixed(1));
        const isBreached = newTemp > z.targetTemp + 1.5;

        return {
          ...z,
          currentTemp: newTemp,
          status: isBreached ? 'breach' : newTemp > z.targetTemp + 0.8 ? 'warning' : 'optimal',
        };
      })
    );
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (role === 'farmer') {
      if (tab === 'register') {
        setIsRegisterModalOpen(true);
      }
    }
  };

  // If no role selected, render landing page
  if (!role) {
    return <LandingRoleSwitch onSelectRole={(r) => setRole(r)} />;
  }

  const pendingRequestsCount = requests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex text-[#2A2A2A] font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        role={role}
        lang={lang}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={() => {
          setRole(null);
          setActiveTab('dashboard');
        }}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        pendingRequestsCount={pendingRequestsCount}
        criticalAlertsCount={alerts.filter((a) => !a.read).length}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Top Header */}
        <Header
          role={role}
          lang={lang}
          onLanguageChange={(l) => setLang(l)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          alerts={alerts}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onOpenChatbotModal={() => setIsChatbotModalOpen(true)}
        />

        {/* Dynamic View based on Role (Spans full width without cluttered right panel) */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <div className="w-full space-y-6">
            {role === 'farmer' ? (
              <FarmerDashboard
                lang={lang}
                batches={batches}
                storageUnits={storageUnits}
                searchQuery={searchQuery}
                onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
                onOpenBookingModal={(unit) => {
                  setSelectedStorageUnit(unit);
                  setIsBookingModalOpen(true);
                }}
                onSelectBatchDetails={(batch) => {
                  setSelectedBatch(batch);
                  setIsBatchDetailsModalOpen(true);
                }}
                onOpenQualityGradingModal={() => setIsQualityGradingModalOpen(true)}
                activeTab={activeTab}
                alerts={alerts}
                onToggleAlertRead={handleToggleAlertRead}
                onMarkAllAlertsRead={handleMarkAllAlertsRead}
              />
            ) : (
              <StorageOwnerDashboard
                zones={storageZones}
                inventory={inventory}
                requests={requests}
                alerts={alerts}
                searchQuery={searchQuery}
                onOpenAddZoneModal={() => setIsAddZoneModalOpen(true)}
                onAcceptRequest={handleAcceptRequest}
                onRejectRequest={handleRejectRequest}
                onSimulateTelemetry={handleSimulateTelemetry}
                activeTab={activeTab}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <RegisterBatchModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onAddBatch={handleAddBatch}
        lang={lang}
      />

      <StorageBookingModal
        unit={selectedStorageUnit}
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedStorageUnit(null);
        }}
        onRequestSubmitted={handleRequestSubmitted}
        lang={lang}
      />

      <BatchDetailsModal
        batch={selectedBatch}
        isOpen={isBatchDetailsModalOpen}
        onClose={() => {
          setIsBatchDetailsModalOpen(false);
          setSelectedBatch(null);
        }}
        lang={lang}
      />

      <AddZoneModal
        isOpen={isAddZoneModalOpen}
        onClose={() => setIsAddZoneModalOpen(false)}
        onAddZone={handleAddZone}
      />

      <AiQualityGradingModal
        isOpen={isQualityGradingModalOpen}
        onClose={() => setIsQualityGradingModalOpen(false)}
        onApplyGradeToBatch={(result, commodity) => handleQualityGraded(commodity, result.grade, result.shelfLifeColdStorageDays)}
        lang={lang}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        role={role}
        lang={lang}
        onLanguageChange={(l) => setLang(l)}
      />

      <AgriCoolAiChatbotModal
        isOpen={isChatbotModalOpen}
        onClose={() => setIsChatbotModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
