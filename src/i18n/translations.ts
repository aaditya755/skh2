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
    tagline: "एआई-संचालित शीतगृह एवं कोल्ड-चेन प्रबंधन मंच",
    roleFarmer: "किसान पोर्टल",
    roleStorage: "कोल्ड स्टोरेज संचालक",
    welcomeFarmer: "नमस्ते राजेश जी,",
    welcomeStorage: "नमस्ते साहिल जी,",
    farmerSubtitle: "अपनी ताज़ा फसल को ट्रैक करें, शेल्फ-लाइफ जानें और फसल को खराब होने से बचाएं",
    storageSubtitle: "वास्तविक समय कोल्ड रूम विश्लेषण, चेंबर क्षमता और सेन्सर लाइव डेटा",
    nav: {
      dashboard: "डैशबोर्ड",
      batches: "मेरी फसल खेप",
      findStorage: "कोल्ड स्टोरेज खोजें",
      registerHarvest: "फसल दर्ज करें",
      alerts: "सूचनाएं व चेतावनियां",
      history: "बैच इतिहास व रिपोर्ट",
      aiAdvisor: "एआई फसल सुरक्षा सलाहकार",
      inventory: "भंडारण इन्वेंटरी",
      zoneManagement: "स्टोरेज जोन व्यवस्थापन",
      requests: "किसान बुकिंग अनुरोध",
      analytics: "लाइव सेन्सर फीड",
      switchRole: "भूमिका बदलें",
    },
    farmerAlertsTitle: "फसल शेल्फ-लाइफ एवं सुरक्षा चेतावनी",
    batchTrackingTitle: "सक्रिय फसल खेप (Active Batches)",
    nearbyStorageTitle: "निकटतम प्रमाणित कोल्ड स्टोरेज",
    quickRegisterTitle: "नई फसल खेप पंजीकृत करें",
    cropCommodity: "फसल / कृषि उपज",
    quantityKg: "मात्रा (किलोग्राम)",
    harvestDate: "कटाई / तुड़ाई की तिथि",
    gpsLocation: "स्थान / गाँव (GPS)",
    autoDetectGps: "वर्तमान जीपीएस स्थान प्राप्त करें",
    submitHarvest: "खेप सुरक्षित दर्ज करें",
    viewDetails: "विस्तृत विवरण देखें",
    bookSlot: "कोल्ड स्टोरेज बुक करें",
    availableCapacity: "उपलब्ध खाली क्षमता",
    perDayPrice: "किराया प्रति किग्रा/दिन",
    distanceKm: "किमी की दूरी पर",
    batchStages: {
      harvested: "कटाई संपन्न",
      inTransit: "रास्ते में (परिवहन)",
      stored: "कोल्ड स्टोरेज में भंडारित",
      dispatched: "मंडी हेतु रवाना",
      sold: "सफलतापूर्वक बिक्री",
    },
    spoilageStatus: {
      good: "सुरक्षित एवं ताज़ा",
      warning: "शीघ्र ध्यान दें (मध्यम जोखिम)",
      critical: "गंभीर जोखिम (तत्काल कार्रवाई आवश्यक)",
    },
    actions: {
      cancel: "रद्द करें",
      save: "सहेजें",
      accept: "अनुरोध स्वीकार करें",
      reject: "अस्वीकार करें",
      close: "बंद करें",
      searchPlaceholder: "फसल, खेप संख्या या स्थान खोजें...",
      filterAll: "सभी श्रेणियां",
    },
    aiPredictorTitle: "एआई कोल्ड-चेन व शेल्फ-लाइफ सलाहकार",
    aiPredictorDesc: "तापमान, आर्द्रता और परिवहन समय के आधार पर फसल की शेल्फ-लाइफ एवं इथिलीन सुरक्षा का सटीक विश्लेषण प्राप्त करें।",
    predictShelfLifeBtn: "शेल्फ-लाइफ व जोखिम का विश्लेषण करें",
    storageOwnerStats: {
      occupancy: "कुल कोल्ड रूम क्षमता उपयोग",
      activeShipments: "सक्रिय भंडारित खेप",
      storedValue: "भंडारित फसल का अनुमानित मूल्य",
      pendingRequests: "लंबित किसान बुकिंग अनुरोध",
    },
  },
  mr: {
    appName: "अ‍ॅग्रीकूल",
    tagline: "एआय-संचलित शीतगृह व कोल्ड-चेन व्यवस्थापन प्रणाली",
    roleFarmer: "शेतकरी पोर्टल",
    roleStorage: "कोल्ड स्टोरेज व्यवस्थापक",
    welcomeFarmer: "नमस्कार राजेशजी,",
    welcomeStorage: "नमस्कार साहिलजी,",
    farmerSubtitle: "आपल्या पिकाची नोंद ठेवा, साठवण कालावधी जाणून घ्या आणि नासाडी टाळा",
    storageSubtitle: "रिअल-टाइम कोल्ड रूम विश्लेषण, चेंबर क्षमता आणि सेन्सर थेट माहिती",
    nav: {
      dashboard: "डॅशबोर्ड",
      batches: "माझ्या पीक बॅचेस",
      findStorage: "कोल्ड स्टोरेज शोधा",
      registerHarvest: "कापणी नोंदणी",
      alerts: "अलर्ट व सूचना",
      history: "बॅच इतिहास व अहवाल",
      aiAdvisor: "एआय पीक संरक्षण सल्लागार",
      inventory: "साठा नोंदवही",
      zoneManagement: "स्टोरेज झोन व्यवस्थापन",
      requests: "शेतकरी बुकिंग अर्ज",
      analytics: "थेट सेन्सर फीड",
      switchRole: "भूमिका बदला",
    },
    farmerAlertsTitle: "पीक साठवणूक व सुरक्षा अलर्ट",
    batchTrackingTitle: "सक्रिय पीक खेप (Active Batches)",
    nearbyStorageTitle: "जवळची प्रमाणित शीतगृहे (Cold Storage)",
    quickRegisterTitle: "नवीन पीक बॅच नोंदवा",
    cropCommodity: "पीक / शेतमाल",
    quantityKg: "प्रमाण (किलो)",
    harvestDate: "कापणी / तोडणीची तारीख",
    gpsLocation: "जीपीएस ठिकाण / गाव",
    autoDetectGps: "माझे चालू स्थान मिळवा",
    submitHarvest: "बॅच सुरक्षित नोंदवा",
    viewDetails: "सविस्तर माहिती पहा",
    bookSlot: "कोल्ड स्टोरेज जागा बुक करा",
    availableCapacity: "उपलब्ध रिक्त क्षमता",
    perDayPrice: "भाडे प्रति किलो/दिवस",
    distanceKm: "किमी अंतरावर",
    batchStages: {
      harvested: "तोडणी/कापणी झाली",
      inTransit: "वाहतुकीत (मार्गावर)",
      stored: "शीतगृहात सुरक्षित साठवले",
      dispatched: "बाजारासाठी पाठवले",
      sold: "यशस्वी विक्री",
    },
    spoilageStatus: {
      good: "उत्कृष्ट व ताजी स्थिती",
      warning: "लवकरच लक्ष द्या (मध्यम धोका)",
      critical: "गंभीर धोका (तातडीने शीतगृहात हलवा)",
    },
    actions: {
      cancel: "रद्द करा",
      save: "जतन करा",
      accept: "अर्ज मंजूर करा",
      reject: "नाकारा",
      close: "बंद करा",
      searchPlaceholder: "पीक, बॅच क्रमांक किंवा ठिकाण शोधा...",
      filterAll: "सर्व नोंदी",
    },
    aiPredictorTitle: "एआय कोल्ड-चेन व साठवण सल्लागार",
    aiPredictorDesc: "तापमान, दमटपणा आणि वाहतूक वेळेनुसार पिकाचा टिकवण काळ व इथिलिन सुसंगततेचे अचूक मार्गदर्शन मिळवा.",
    predictShelfLifeBtn: "साठवण कालावधी व धोका तपासा",
    storageOwnerStats: {
      occupancy: "एकूण शीतगृह क्षमता वापर",
      activeShipments: "सध्या साठवलेल्या बॅचेस",
      storedValue: "साठवलेल्या पिकांचे अंदाजित मूल्य",
      pendingRequests: "प्रलंबित शेतकरी बुकिंग अर्ज",
    },
  },
};
