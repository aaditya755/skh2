import { Language } from '../types';

export const translations: Record<Language, {
  appName: string;
  tagline: string;
  roleFarmer: string;
  roleStorage: string;
  welcomeFarmer: string;
  welcomeStorage: string;
  farmerSubtitle: string;
  storageSubtitle: string;
  nav: {
    dashboard: string;
    batches: string;
    findStorage: string;
    registerHarvest: string;
    alerts: string;
    history: string;
    aiAdvisor: string;
    inventory: string;
    zoneManagement: string;
    requests: string;
    analytics: string;
    switchRole: string;
  };
  farmerAlertsTitle: string;
  batchTrackingTitle: string;
  nearbyStorageTitle: string;
  quickRegisterTitle: string;
  cropCommodity: string;
  quantityKg: string;
  harvestDate: string;
  gpsLocation: string;
  autoDetectGps: string;
  submitHarvest: string;
  viewDetails: string;
  bookSlot: string;
  availableCapacity: string;
  perDayPrice: string;
  distanceKm: string;
  batchStages: {
    harvested: string;
    inTransit: string;
    stored: string;
    dispatched: string;
    sold: string;
  };
  spoilageStatus: {
    good: string;
    warning: string;
    critical: string;
  };
  actions: {
    cancel: string;
    save: string;
    accept: string;
    reject: string;
    close: string;
    searchPlaceholder: string;
    filterAll: string;
  };
  aiPredictorTitle: string;
  aiPredictorDesc: string;
  predictShelfLifeBtn: string;
  storageOwnerStats: {
    occupancy: string;
    activeShipments: string;
    storedValue: string;
    pendingRequests: string;
  };
}> = {
  en: {
    appName: "AgriCool",
    tagline: "AI-Powered Cold-Chain Intelligence Platform",
    roleFarmer: "Farmer Portal",
    roleStorage: "Storage Owner Portal",
    welcomeFarmer: "Hey Rajesh,",
    welcomeStorage: "Hey Sahil,",
    farmerSubtitle: "Let's track your harvest and prevent crop spoilage",
    storageSubtitle: "Real-time cold room analytics and sensor telemetry",
    nav: {
      dashboard: "Dashboard",
      batches: "My Batches",
      findStorage: "Find Cold Storage",
      registerHarvest: "Register Harvest",
      alerts: "Alerts & Notifications",
      history: "Batch History & Reports",
      aiAdvisor: "AI Spoilage Risk Advisor",
      inventory: "Inventory Records",
      zoneManagement: "Storage Zones",
      requests: "Farmer Bookings",
      analytics: "Live Sensor Feed",
      switchRole: "Switch Role",
    },
    farmerAlertsTitle: "Spoilage Risk Alert",
    batchTrackingTitle: "Active Crop Batches",
    nearbyStorageTitle: "Nearby Cold Storage Units",
    quickRegisterTitle: "Register Harvest Batch",
    cropCommodity: "Crop / Commodity",
    quantityKg: "Quantity (kg)",
    harvestDate: "Harvest Date",
    gpsLocation: "GPS Location / Village",
    autoDetectGps: "Detect My GPS Location",
    submitHarvest: "Register Batch",
    viewDetails: "View Details",
    bookSlot: "Book Storage",
    availableCapacity: "Available Capacity",
    perDayPrice: "Price per kg/day",
    distanceKm: "km away",
    batchStages: {
      harvested: "Harvested",
      inTransit: "In Transit",
      stored: "Stored",
      dispatched: "Dispatched",
      sold: "Sold",
    },
    spoilageStatus: {
      good: "Optimal Condition",
      warning: "Action Required Soon",
      critical: "Urgent Action Needed",
    },
    actions: {
      cancel: "Cancel",
      save: "Save",
      accept: "Accept Request",
      reject: "Reject",
      close: "Close",
      searchPlaceholder: "Search crops, batches, locations...",
      filterAll: "All Items",
    },
    aiPredictorTitle: "AI Cold Chain Advisor",
    aiPredictorDesc: "Select your produce to get instant plain-language shelf-life guidance based on ambient conditions.",
    predictShelfLifeBtn: "Calculate Shelf-Life Risk",
    storageOwnerStats: {
      occupancy: "Total Facility Capacity",
      activeShipments: "Active Shipments Stored",
      storedValue: "Est. Stored Value",
      pendingRequests: "Pending Requests",
    },
  },
  hi: {
    appName: "एग्रीकूल",
    tagline: "एआई-संचालित कोल्ड-चेन इंटेलिजेंस प्लेटफॉर्म",
    roleFarmer: "किसान पोर्टल",
    roleStorage: "कोल्ड स्टोरेज मालिक",
    welcomeFarmer: "नमस्ते राजेश जी,",
    welcomeStorage: "नमस्ते साहिल जी,",
    farmerSubtitle: "अपनी फसल को ट्रैक करें और खराब होने से बचाएं",
    storageSubtitle: "वास्तविक समय कोल्ड रूम विश्लेषण और सेंसर स्थिति",
    nav: {
      dashboard: "डैशबोर्ड",
      batches: "मेरी फसल बैच",
      findStorage: "कोल्ड स्टोरेज खोजें",
      registerHarvest: "फसल दर्ज करें",
      alerts: "अलर्ट और सूचनाएं",
      history: "बैच इतिहास और रिपोर्ट",
      aiAdvisor: "एआई खराब जोखिम सलाहकार",
      inventory: "भंडारण इन्वेंटरी",
      zoneManagement: "स्टोरेज जोन",
      requests: "किसान बुकिंग अनुरोध",
      analytics: "लाइव सेंसर फीड",
      switchRole: "रोल बदलें",
    },
    farmerAlertsTitle: "फसल खराब होने की चेतावनी",
    batchTrackingTitle: "सक्रिय फसल बैच",
    nearbyStorageTitle: "नज़दीकी कोल्ड स्टोरेज",
    quickRegisterTitle: "फसल की नई बैच दर्ज करें",
    cropCommodity: "फसल का प्रकार",
    quantityKg: "मात्रा (किलोग्राम)",
    harvestDate: "कटाई की तिथि",
    gpsLocation: "जीपीएस स्थान / गाँव",
    autoDetectGps: "मेरा जीपीएस स्थान ढूंढें",
    submitHarvest: "बैच दर्ज करें",
    viewDetails: "विवरण देखें",
    bookSlot: "स्टोरेज बुक करें",
    availableCapacity: "उपलब्ध क्षमता",
    perDayPrice: "दर प्रति किग्रा/दिन",
    distanceKm: "किमी दूर",
    batchStages: {
      harvested: "कटाई संपन्न",
      inTransit: "रास्ते में",
      stored: "स्टोर किया गया",
      dispatched: "रवाना किया",
      sold: "बिक गया",
    },
    spoilageStatus: {
      good: "सुरक्षित स्थिति",
      warning: "शीघ्र ध्यान दें",
      critical: "तत्काल कार्रवाई आवश्यक",
    },
    actions: {
      cancel: "रद्द करें",
      save: "सुरक्षित करें",
      accept: "स्वीकार करें",
      reject: "अस्वीकार करें",
      close: "बंद करें",
      searchPlaceholder: "फसल, बैच या स्थान खोजें...",
      filterAll: "सभी सामग्री",
    },
    aiPredictorTitle: "एआई कोल्ड चेन सलाहकार",
    aiPredictorDesc: "तापमान और आर्द्रता के आधार पर अपनी फसल के शेल्फ-लाइफ का अनुमान लगाएं।",
    predictShelfLifeBtn: "जोखिम का अनुमान लगाएं",
    storageOwnerStats: {
      occupancy: "कुल कोल्ड क्षमता",
      activeShipments: "सक्रिय भंडारित फसल",
      storedValue: "अनुमानित कुल मूल्य",
      pendingRequests: "लंबित बुकिंग अनुरोध",
    },
  },
  mr: {
    appName: "अ‍ॅग्रीकूल",
    tagline: "एआय-संचालित कोल्ड-चेन इंटेलिजन्स प्लॅटफॉर्म",
    roleFarmer: "शेतकरी पोर्टल",
    roleStorage: "कोल्ड स्टोरेज मालक",
    welcomeFarmer: "नमस्कार राजेश जी,",
    welcomeStorage: "नमस्कार साहिल जी,",
    farmerSubtitle: "तुमच्या पिकाची ट्रॅकिंग करा आणि नासाडी टाळा",
    storageSubtitle: "रिअल-टाइम कोल्ड रूम विश्‍लेषण आणि सेन्सर माहिती",
    nav: {
      dashboard: "डॅशबोर्ड",
      batches: "माझे पीक बॅच",
      findStorage: "कोल्ड स्टोरेज शोधा",
      registerHarvest: "कापणी नोंदणी",
      alerts: "अलर्ट आणि सूचना",
      history: "बॅच इतिहास आणि अहवाल",
      aiAdvisor: "एआय नासाडी धोका सल्लागार",
      inventory: "साठा नोंदवही",
      zoneManagement: "स्टोरेज झोन",
      requests: "शेतकरी बुकिंग अर्ज",
      analytics: "लाइव्ह सेन्सर फीड",
      switchRole: "भूमिका बदला",
    },
    farmerAlertsTitle: "पीक नासाडीचा इशारा",
    batchTrackingTitle: "सक्रिय पीक बॅचेस",
    nearbyStorageTitle: "जवळील कोल्ड स्टोरेज",
    quickRegisterTitle: "नवीन पीक बॅच नोंदवा",
    cropCommodity: "पिकाचा प्रकार",
    quantityKg: "प्रमाण (किलो)",
    harvestDate: "कापणीची तारीख",
    gpsLocation: "जीपीएस ठिकाण / गाव",
    autoDetectGps: "माझे जीपीएस स्थान शोधा",
    submitHarvest: "बॅच नोंदवा",
    viewDetails: "तपशील पहा",
    bookSlot: "स्टोरेज बुक करा",
    availableCapacity: "उपलब्ध क्षमता",
    perDayPrice: "दर प्रति किलो/दिवस",
    distanceKm: "किमी अंतरावर",
    batchStages: {
      harvested: "कापणी झाली",
      inTransit: "वाहतुकीत",
      stored: "साठवले",
      dispatched: "पाठवले",
      sold: "विक्री झाली",
    },
    spoilageStatus: {
      good: "उत्कृष्ट स्थिती",
      warning: "लवकरच लक्ष द्या",
      critical: "तातडीची कारवाई आवश्यक",
    },
    actions: {
      cancel: "रद्द करा",
      save: "जतन करा",
      accept: "स्वीकारा",
      reject: "नाकारा",
      close: "बंद करा",
      searchPlaceholder: "पीक, बॅच किंवा ठिकाण शोधा...",
      filterAll: "सर्व नोंदी",
    },
    aiPredictorTitle: "एआय कोल्ड चेन सल्लागार",
    aiPredictorDesc: "हवामानानुसार पिकाचा साठवण काळ आणि धोका तपासा.",
    predictShelfLifeBtn: "साठवण कालावधी तपासा",
    storageOwnerStats: {
      occupancy: "एकूण कोल्ड क्षमता",
      activeShipments: "साठवलेले पीक बॅच",
      storedValue: "अंदाजित एकूण मूल्य",
      pendingRequests: "प्रलंबित बुकिंग अर्ज",
    },
  },
};
