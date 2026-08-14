export type Role = 'farmer' | 'storage' | 'government' | null;
export type Language = 'en' | 'hi' | 'mr';

export type BatchStage = 0 | 1 | 2 | 3 | 4; // 0: Harvested, 1: In Transit, 2: Stored, 3: Dispatched, 4: Sold

export interface StageCheckpoint {
  stage: BatchStage;
  stageName: string;
  timestamp: string;
  location: string;
  recordedTempC: number;
  targetTempC: number;
  humidityPct: number;
  carrierOrFacility: string;
  complianceStatus: 'compliant' | 'warning' | 'breached';
  notes?: string;
}

export interface QualityGradingResult {
  grade: 'Grade A' | 'Grade B' | 'Grade C';
  gradeTitle: string; // e.g. "Grade A - Export / Premium"
  confidencePct: number;
  defectRatioPct: number;
  colorUniformityPct: number;
  firmnessScore: number; // 0 to 10
  ripenessStage: string; // e.g. "Optimal Harvest Ripeness (85%)"
  shelfLifeAmbientDays: number;
  shelfLifeColdStorageDays: number;
  priceMultiplier: number; // e.g. 1.25 for +25%
  keyFindings: string[];
  imageUrl?: string;
}

export interface HarvestBatch {
  id: string;
  commodity: string;
  cropIcon: string; // Emoji or Lucide icon name
  imageUrl?: string;
  quantityKg: number;
  harvestDate: string;
  gpsLocation: string;
  storageLocationName?: string;
  stage: BatchStage;
  stageTimestamps: {
    harvested: string;
    inTransit?: string;
    stored?: string;
    dispatched?: string;
    sold?: string;
  };
  journeyLogs?: StageCheckpoint[];
  qualityGrade?: 'Grade A' | 'Grade B' | 'Grade C';
  gradingResult?: QualityGradingResult;
  spoilageAlert: {
    urgency: 'critical' | 'warning' | 'good';
    plainTextEn: string;
    plainTextHi: string;
    plainTextMr: string;
    hoursRemaining?: number;
  };
  expiresAtTimestamp?: number; // Target timestamp for countdown
  recommendedTemp: string;
  humidityTarget: string;
  isEthyleneProducer?: boolean;
  outcome?: 'sold' | 'spoiled' | 'dispatched';
  spoiledPct?: number;
  incomeAmount?: number;
}

export interface StorageUnit {
  id: string;
  name: string;
  distanceKm: number;
  availableCapacityPct: number;
  totalCapacityTons: number;
  usedCapacityTons: number;
  pricePerDayKg: number;
  tempRange: string;
  zones: string[];
  address: string;
  rating: number;
  image?: string;
  contactNumber: string;
}

export interface StorageZone {
  id: string;
  name: string;
  tempRange: string;
  currentTemp: number;
  targetTemp: number;
  humidityPct: number;
  totalCapacityKg: number;
  usedCapacityKg: number;
  pricePerZoneKg: number;
  status: 'optimal' | 'warning' | 'breach';
  assignedCrops: string[];
  segregationAlerts?: string[];
}

export interface InventoryItem {
  id: string;
  batchId: string;
  commodity: string;
  farmerName: string;
  quantityKg: number;
  entryDate: string;
  expectedExitDate: string;
  zoneId: string;
  zoneName: string;
  status: 'Stored' | 'Expiring Soon' | 'Ready for Pickup' | 'Temperature Breach';
  storageFeeAccrued: number;
  qualityGrade?: 'Grade A' | 'Grade B' | 'Grade C';
  hoursRemaining?: number;
}

export interface StorageRequest {
  id: string;
  farmerName: string;
  farmerPhone: string;
  commodity: string;
  quantityKg: number;
  startDate: string;
  durationDays: number;
  requestedZone: string;
  estimatedCost: number;
  status: 'pending' | 'accepted' | 'rejected';
  requestTimestamp: string;
}

export interface SystemAlert {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  zoneOrBatchId?: string;
  read?: boolean;
  type?: 'spoilage' | 'pickup' | 'confirmation' | 'breach' | 'info';
}

export interface RouteOption {
  id: string;
  label: string; // e.g. "Fastest", "Most Fuel-Efficient", "Avoids Highway Tolls"
  distanceKm: number;
  estimatedDurationMin: number;
  estimatedFuelCost: number;
  estimatedTollCost: number;
  riskLevel: 'low' | 'medium' | 'high';
  waypoints: string[];
}

export interface Shipment {
  id: string;
  batchId: string;
  commodity: string;
  quantityKg: number;
  originName: string;
  destinationName: string;
  vehicleType: 'Refrigerated Truck' | 'Insulated Van' | 'Open Truck';
  driverName: string;
  driverPhone: string;
  departureTimestamp: string;
  estimatedArrivalTimestamp: string;
  currentProgressPct: number; // 0-100
  currentTempC: number;
  targetTempC: number;
  status: 'preparing' | 'in_transit' | 'delivered' | 'delayed' | 'temp_breach';
  routeOptionId?: string;
}

export interface CropPreset {
  name: string;
  icon: string;
  imageUrl?: string;
  idealTemp: string;
  idealHumidity: string;
  maxShelfLifeDays: number;
  category: 'Fruit' | 'Vegetable' | 'Grain' | 'Tuber';
  isEthyleneProducer?: boolean;
  ethyleneSensitive?: boolean;
}

export interface Vehicle {
  id: string;
  registrationNumber: string;
  model: string;
  type: 'Refrigerated Truck' | 'Insulated Van' | 'Small Reefer Tempo' | 'Heavy Cold-Carrier';
  capacityKg: number;
  driverName: string;
  driverPhone: string;
  currentLocation: string; // e.g. "Kopargaon Depot", "NH60 near Sinnar", "Ahmednagar Cold Storage", "En route to Nashik APMC"
  status: 'available' | 'on_route' | 'maintenance';
  currentTempC?: number;
  targetTempC?: number;
  assignedBatchId?: string;
  destination?: string;
  eta?: string;
  fuelPct?: number;
}

export interface DistrictMetric {
  district: string;
  totalCapacityMT: number;
  occupiedMT: number;
  occupancyPct: number;
  facilitiesCount: number;
  spoilagePreventedPct: number;
  lossPreventedValueLakhs: number;
  activeBreaches: number;
}

export interface GovernmentFacilityAudit {
  id: string;
  facilityName: string;
  district: string;
  licenseNumber: string;
  fssaiNumber: string;
  totalCapacityTons: number;
  utilizedCapacityTons: number;
  complianceScorePct: number;
  lastInspectionDate: string;
  sensorReliabilityPct: number;
  subsidyStatus: 'Disbursed' | 'Under Review' | 'Eligible';
  status: 'Compliant' | 'Inspection Required' | 'Warning';
}
