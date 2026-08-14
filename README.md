# 🌱 AgriCool

## AI-Powered Cold-Chain Intelligence Platform

> **From harvest to market, keeping every degree and every decision under control.**

AgriCool is a cold-chain intelligence platform designed to reduce agricultural post-harvest losses by connecting **farmers, cold-storage operators, logistics providers, and government authorities** through one connected workflow.

The current prototype combines farmer and storage workflows, crop-batch management, cold-storage operations, simulated ESP32/Wokwi telemetry, spoilage-risk detection, crop segregation guidance, shared cold-chain logistics, shipment monitoring, fleet management, AI-assisted crop preservation, and district-level governance.

---

## 🎯 Problem

After harvest, agricultural produce can lose significant value because the cold chain is often fragmented.

Farmers may face:

- Difficulty finding suitable cold storage
- Limited visibility into available capacity
- Manual coordination through calls, messages, and spreadsheets
- Temperature and environmental risks during storage and transit
- Expensive refrigerated transportation
- Inefficient vehicle utilization
- Limited visibility while produce is in transit
- Lack of centralized data for cold-chain planning

### Our goal

Move the cold chain from:

**Fragmented + reactive**

to:

**Connected + visible + proactive**

---

# 💡 Solution

AgriCool connects the cold-chain journey:

```text
Harvest
   ↓
Register Crop Batch
   ↓
Discover / Reserve Storage
   ↓
Monitor Storage
   ↓
Detect Spoilage Risk
   ↓
Create / Join Shared Refrigerated Load
   ↓
Track Shipment
   ↓
Monitor Temperature
   ↓
Detect Cold-Chain Breach
   ↓
AI Preservation Decision Support
   ↓
Delivery & Batch History
   ↓
District-Level Analytics
```

AgriCool is not only a cold-storage booking system. It combines **storage, monitoring, risk detection, logistics, decision support, and governance analytics** into one platform.

---

# ✨ Current Prototype Features

## 👨‍🌾 Farmer Portal

Implemented under:

```text
src/components/Farmer/
```

The current prototype includes:

- Farmer dashboard
- Harvest/batch registration
- Batch details
- Batch history
- Storage booking workflow
- Alerts
- Spoilage-risk interface
- Shared logistics workflow

Important files include:

```text
FarmerDashboard.tsx
RegisterBatchModal.tsx
BatchDetailsModal.tsx
BatchHistoryScreen.tsx
StorageBookingModal.tsx
AlertsScreen.tsx
AiSpoilagePredictor.tsx
```

---

## 🏭 Storage Owner Portal

Implemented under:

```text
src/components/Storage/
```

Current functionality includes:

- Storage-owner dashboard
- Incoming farmer requests
- Storage zones
- Inventory
- Sensor monitoring interface
- Fleet management

Important files include:

```text
StorageOwnerDashboard.tsx
RequestCards.tsx
AddZoneModal.tsx
InventoryTable.tsx
LiveSensorsCard.tsx
FleetManagementScreen.tsx
```

Example storage request:

| Field | Example |
|---|---|
| Farmer | Ramesh Patil |
| Commodity | Tomatoes |
| Quantity | 1,200 kg |
| Duration | 7 days |
| Target Zone | Zone B2 |
| Estimated Revenue | ₹6,300 |

---

# 📡 IoT & ESP32 Monitoring

AgriCool includes an **ESP32-S3 firmware and Wokwi simulation** for demonstrating the cold-chain sensor workflow.

### Current sensor/actuator setup

```text
                 ESP32-S3
                    │
        ┌───────────┼───────────┐
        ↓           ↓           ↓
      DHT22      Gas Input    HX711
   Temp/Humidity  Simulator   Load Cell
        │           │           │
        └───────────┼───────────┘
                    │
             Decision / Alert
                    │
             ┌──────┴──────┐
             ↓             ↓
          Buzzer         Servo
       Emergency Alarm  Vent Control
```

### Demonstrated components

| Component | Purpose |
|---|---|
| ESP32-S3 | Main controller |
| DHT22 | Temperature and humidity |
| MQ135/potentiometer simulation | Gas/ethylene input simulation |
| HX711 + load cell | Cargo weight/load |
| Buzzer | Emergency alarm |
| Servo | Exhaust/vent actuation |
| Wi-Fi | Telemetry communication |
| HTTPClient | HTTP data transmission |

### IoT files

```text
iot/
├── firmware/
│   └── agricool_esp32.ino
├── wokwi/
│   └── diagram.json
└── README.md
```

### Current status

The sensors are currently demonstrated through **Wokwi simulation**.

The firmware reads sensor values, evaluates conditions, can trigger local actions such as the buzzer/servo, and demonstrates HTTP telemetry transmission.

The current firmware example uses an HTTP testing endpoint for demonstrating network transmission. It is **not yet the production AgriCool Flask backend**.

### Final-round IoT plan

```text
Physical ESP32
      ↓
Temperature / Humidity / Gas / Load Sensors
      ↓
Flask API
      ↓
AgriCool Backend
      ↓
Risk / Alert Engine
      ↓
React Dashboard
```

This will replace the simulated/test telemetry path with real sensor data.

---

# 🚨 Spoilage-Risk Detection

AgriCool focuses on identifying risk **before significant crop loss occurs**.

Example:

> **SPOILAGE RISK ALERT — TOMATOES**

> Move to cold storage within 4 hours to avoid heat softening and mold formation.

The workflow can communicate:

- Crop
- Batch ID
- Risk level
- Safe-window information
- Recommended action
- Intervention status

The objective is to move from:

**“The crop is already damaged.”**

to:

**“The risk was identified early enough to act.”**

---

# 🧪 Crop Segregation & Ethylene Compatibility

AgriCool includes:

```text
src/components/BatchSegregationMatrix.tsx
```

The platform demonstrates guidance around crop compatibility and ethylene behavior.

### High ethylene producers

- Tomatoes
- Mangoes
- Apples
- Bananas
- Pears
- Papayas

### Ethylene-sensitive produce

- Onions
- Potatoes
- Leafy greens
- Spinach
- Carrots
- Watermelon
- Grapes
- Cucumbers

The goal is to reduce premature ripening and quality degradation caused by unsuitable storage combinations.

---

# 🚚 Logistics

The logistics module is implemented under:

```text
src/components/Logistics/
```

Important components include:

```text
LogisticsTrackingScreen.tsx
RouteOptimizerModal.tsx
```

The prototype demonstrates:

- Shipment tracking
- Route information
- Route-optimization workflow
- Crop movement
- Transportation visibility

---

# 🤝 Shared Cold-Chain Logistics

Small farmers may not have enough produce to fill an entire refrigerated vehicle.

AgriCool introduces **Shared Cold-Chain Logistics**, allowing compatible partial loads travelling along similar routes to be pooled.

Example:

```text
Nashik → Mumbai APMC
```

Prototype scenario:

```text
Individual transport: ₹8,400
Shared transport:     ₹3,200
```

These values are **prototype scenario/estimate values**, not guaranteed market prices.

### Concept

```text
Farmer A ─┐
Farmer B ─┼──→ Shared Refrigerated Vehicle → Destination
Farmer C ─┘
```

---

# 🗺️ Shipment Monitoring

The platform provides shipment-level visibility.

Information can include:

- Shipment ID
- Batch ID
- Crop
- Quantity
- Origin
- Destination
- Vehicle
- Progress
- ETA
- Current temperature
- Target temperature
- Shipment status

### Example — Temperature Breach

```text
Crop:          Mangoes
Quantity:      600 kg
Route:         Ratnagiri → Navi Mumbai

Current Temp:  22.4°C
Target Temp:   12.5°C

Status:        TEMP BREACH
```

### Example — Successful Shipment

```text
Crop:          Onions
Quantity:      3,000 kg

Current Temp:  1.8°C
Target Temp:   2.0°C

Status:        Delivered
```

---

# 🚛 Fleet Management

Fleet management is represented by:

```text
src/components/Storage/FleetManagementScreen.tsx
```

The prototype demonstrates visibility into:

- Fleet size
- Payload
- Active vehicles
- Available vehicles
- Maintenance
- Reefer temperature
- Active transportation

Example prototype dashboard:

```text
Total Fleet:              6 Units
Fleet Payload:            24.8 MT
Active on Route:          3
Available at Depot:       2
In Maintenance:           1
Average Reefer Telemetry: 8.5°C
```

### Final-round extension

The fleet module can later integrate:

- Real GPS
- Vehicle telematics
- Live reefer telemetry
- Driver/dispatch systems
- Route updates

---

# 🧠 AI & Decision Support

AgriCool contains AI/decision-support interfaces including:

```text
src/components/AgriCoolAiChatbotModal.tsx
src/components/AiQualityGradingModal.tsx
src/components/Farmer/AiSpoilagePredictor.tsx
src/components/ShelfLifeCountdown.tsx
```

The intended workflow is:

```text
Crop
 +
Temperature
 +
Humidity
 +
Transit Time
        ↓
Risk / Preservation Assessment
        ↓
Recommended Action
```

### Current status

The current prototype demonstrates the **AI/decision-support interface and workflow**.

A production-grade predictive model would require validated historical cold-chain data.

### Final-round AI plan

- ML-based shelf-life prediction
- Spoilage prediction
- Risk scoring
- Crop-quality prediction
- Power-failure prediction
- Dynamic preservation recommendations
- Advanced AI assistant capabilities

These are planned extensions and are not claimed as fully deployed ML infrastructure in the current prototype.

---

# 🏛️ Government & District Governance

The government module is implemented under:

```text
src/components/Government/
```

Important components include:

```text
GovernmentDashboard.tsx
GovernmentAlertsScreen.tsx
```

The dashboard demonstrates:

- Regional cold-chain analytics
- Facility information
- Capacity/utilization monitoring
- Alerts
- District-level visibility
- Cold-chain advisories
- Audit/report workflows

Example prototype values:

```text
Regional Cold Capacity     41.1K MT
Food Loss Prevented        ₹14.45 Cr
Registered Facilities      51 Units
PMKSY Subsidy Pool         ₹4.20 Cr
```

**These are prototype/demo values unless connected to verified external datasets.**

---

# 🔔 Alerts & Notifications

Examples:

- 🚨 Spoilage-risk alerts
- 🌡️ Temperature breaches
- 📦 Storage booking confirmations
- 🚚 Shipment issues
- 🏭 Storage availability
- 🧠 AI recommendations
- 🏛️ Cold-chain advisories

---

# 📦 Batch Tracking & History

A typical batch lifecycle is:

```text
Harvest
  ↓
Registered
  ↓
Storage Requested
  ↓
Storage Confirmed
  ↓
In Storage
  ↓
Shipment Created
  ↓
In Transit
  ↓
Delivered
```

Historical information can include:

- Completed batches
- Shipment history
- Revenue
- Quality outcomes
- Spoilage information
- Batch status
- Reports / CSV export

---

# 🏗️ Architecture

The current product is a React/TypeScript application with role-specific components and supporting data.

```text
                         ┌─────────────────────────┐
                         │        AgriCool         │
                         │ Cold-Chain Intelligence │
                         └────────────┬────────────┘
                                      │
             ┌────────────────────────┼────────────────────────┐
             │                        │                        │
             ▼                        ▼                        ▼
       Farmer Portal          Storage Portal           Logistics/Fleet
             │                        │                        │
             └────────────────────────┼────────────────────────┘
                                      │
                         ┌────────────▼────────────┐
                         │ Monitoring & Intelligence│
                         │          Layer            │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
                 IoT Data        Risk / AI         Analytics
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      │
                                      ▼
                         Government / District
                              Governance
```

### Planned final-round backend architecture

```text
ESP32 / Wokwi
      ↓
HTTP Telemetry
      ↓
Python Flask API
      ↓
Service / Data Layer
      ├── Crop & Batch Data
      ├── Storage
      ├── IoT Telemetry
      ├── Risk Engine
      ├── Logistics
      └── AI Services
      ↓
React Frontend
```

The Flask backend and persistent production data layer are **planned final-round components**, not claimed as part of the current web application.

---

# 🧩 Functional Modules

```text
AgriCool
│
├── Farmer Portal
│   ├── Harvest Registration
│   ├── Batch Tracking
│   ├── Storage Discovery
│   ├── Storage Reservation
│   ├── Spoilage Alerts
│   └── Shared Logistics
│
├── Storage Portal
│   ├── Storage Requests
│   ├── Capacity Management
│   ├── Storage Zones
│   ├── Inventory
│   └── Sensor Monitoring
│
├── Logistics
│   ├── Shared Loads
│   ├── Shipment Tracking
│   ├── Route View
│   └── Fleet Management
│
├── Intelligence
│   ├── Spoilage Risk
│   ├── Crop Preservation
│   └── Crop Segregation
│
├── IoT
│   ├── ESP32-S3 Firmware
│   ├── Wokwi Simulation
│   ├── Sensor Telemetry
│   └── Actuation
│
└── Governance
    ├── District Analytics
    ├── Facility Monitoring
    ├── Audit / Reports
    └── Cold-Chain Advisories
```

This is the **functional/product architecture**, not a claim that every item is a separate physical repository folder.

---

# 📁 Repository Structure

Current web application:

```text
skh2/
│
├── .env.example
├── .gitignore
├── README.md
├── bun.lock
├── index.html
├── metadata.json
├── package.json
│
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── Farmer/
│   │   ├── Storage/
│   │   ├── Logistics/
│   │   ├── Government/
│   │   ├── AgriCoolAiChatbotModal.tsx
│   │   ├── AiQualityGradingModal.tsx
│   │   ├── BatchSegregationMatrix.tsx
│   │   ├── LandingRoleSwitch.tsx
│   │   ├── ShelfLifeCountdown.tsx
│   │   └── ...
│   └── data/
│       └── mockData.ts
│
├── iot/
│   ├── firmware/
│   │   └── agricool_esp32.ino
│   ├── wokwi/
│   │   └── diagram.json
│   └── README.md
│
├── screenshots/
│   └── ...
│
└── docs/
    └── ...
```

---

# 🔧 IoT Dependencies

The ESP32 firmware uses:

```text
DHT sensor library
ESP32Servo
HX711 Arduino Library
```

It also uses ESP32 networking libraries:

```cpp
WiFi.h
HTTPClient.h
```

Document exact library versions in `iot/README.md` when the firmware is committed.

---

# 🚀 Getting Started

## Prerequisites

For the web application:

- Node.js
- npm or Bun
- Git

For the IoT simulation:

- Wokwi
- ESP32/Arduino-compatible development environment

## Clone

```bash
git clone https://github.com/aaditya755/skh2.git
cd skh2
```

## Install

Using Bun:

```bash
bun install
```

Or npm:

```bash
npm install
```

## Environment

```bash
cp .env.example .env
```

Only add credentials required by the actual implementation.

**Never commit API keys, passwords, tokens, or private credentials.**

## Run

Use the development script defined in `package.json`, typically:

```bash
bun run dev
```

or:

```bash
npm run dev
```

---

# 📡 IoT Simulation

The Wokwi demonstration contains:

```text
ESP32-S3
├── DHT22
├── Gas/Potentiometer Input
├── HX711
├── Buzzer
└── Servo
```

The demonstrated workflow is:

```text
Sensor Reading
      ↓
Condition Evaluation
      ↓
Local Alert / Actuation
      ↓
HTTP Telemetry
```

The current firmware example uses an HTTP testing endpoint for network transmission. The production AgriCool Flask API is planned as the next backend integration.

---

# 🎥 Demo

The prototype demonstrates:

1. Portal selection
2. Storage operations
3. ESP32/Wokwi sensor simulation
4. Spoilage-risk detection
5. Crop segregation
6. Farmer batch management
7. Shared cold-chain logistics
8. Shipment monitoring
9. Fleet management
10. AI preservation decision support
11. Government/district governance

### Demo Video

Add the final public demo URL here:

```text
<YOUR_PUBLIC_DEMO_VIDEO_URL>
```

---

# 📸 Screenshots

Recommended screenshots:

```text
screenshots/
├── 01-landing.png
├── 02-farmer-dashboard.png
├── 03-storage-dashboard.png
├── 04-iot-monitoring.png
├── 05-spoilage-alert.png
├── 06-shared-logistics.png
├── 07-shipment-tracking.png
├── 08-ai-advisor.png
├── 09-fleet-management.png
└── 10-government-dashboard.png
```

---

# 📚 Documentation

Recommended:

```text
docs/
├── AgriCool-Architecture.pdf
└── ...
```

The architecture document should cover:

- Problem statement
- System architecture
- Functional modules
- IoT architecture
- Telemetry payload
- AI/decision layer
- Logistics workflow
- Government layer
- Future architecture

---

# 🔐 Security

Before production deployment, AgriCool will require:

- Secure authentication
- Role-based authorization
- Input validation
- Secure API communication
- IoT device authentication
- Secret management
- Audit logging
- Data privacy controls

Never commit:

```text
.env
API keys
Passwords
Private tokens
Database credentials
```

---

# ⚠️ Prototype Status

AgriCool is currently a **hackathon prototype**.

### Currently demonstrated

- Farmer workflows
- Storage-owner workflows
- Batch management
- Storage booking interface
- Sensor-monitoring interface
- ESP32-S3 Wokwi simulation
- Simulated telemetry
- Local alert/actuation workflow
- Spoilage-risk workflow
- Crop segregation
- Logistics tracking
- Route-optimization interface
- Fleet-management interface
- AI/decision-support interfaces
- Government dashboard

### Final-round development

- Physical ESP32 sensor deployment
- Real sensor telemetry
- Python Flask backend
- Persistent database
- Real telemetry ingestion
- Advanced ML models
- Real GPS/vehicle telematics
- Advanced route optimization
- Real-world agricultural/cold-storage data integration
- Field validation

This separation is intentional so judges can clearly distinguish current implementation from planned development.

---

# 🔮 Final-Round Roadmap

## Phase 1 — Real IoT

```text
Physical ESP32
      ↓
Temperature
Humidity
Gas / Ethylene
Load Cell
      ↓
Flask API
      ↓
AgriCool Monitoring
```

## Phase 2 — Backend

```text
React Frontend
      ↓
Python Flask API
      ↓
Service Layer
      ↓
Database
      ↓
AI / Risk / Logistics Services
```

## Phase 3 — Advanced AI

Use validated historical data for:

- Shelf-life prediction
- Spoilage prediction
- Risk scoring
- Crop quality prediction
- Power-failure prediction
- Dynamic recommendations

## Phase 4 — Smart Logistics

Extend route optimization using:

- Distance
- Cost
- Vehicle capacity
- Temperature requirements
- Delivery deadline
- Traffic/road conditions
- Compatible shared loads

## Phase 5 — Real-World Validation

Pilot with:

- Farmers
- Cold-storage operators
- Refrigerated logistics providers
- Agricultural authorities

---

# 📊 Expected Impact

### 📉 Lower Post-Harvest Loss

Identify environmental and spoilage risks earlier.

### 🏭 Better Storage Utilization

Make available cold-storage capacity more visible.

### 🚚 Transportation Efficiency

Enable compatible shared refrigerated loads.

### 🌡️ Cold-Chain Visibility

Monitor conditions across storage and transportation.

### 🧠 Better Decisions

Convert operational data into actionable recommendations.

### 🏛️ Better Governance

Provide regional visibility for infrastructure planning.

---

# 🏆 Core Innovation

AgriCool combines:

```text
AI / Decision Support
        +
IoT Telemetry
        +
Cold Storage
        +
Spoilage Risk Detection
        +
Shared Logistics
        +
Shipment Monitoring
        +
Fleet Management
        +
Government Analytics
```

into one connected cold-chain intelligence ecosystem.

> **Don't wait for agricultural produce to spoil. Detect the risk, find the right storage, move it intelligently, and monitor the cold chain until it reaches the market.**

---

# 📌 Hackathon Submission

**Project:** AgriCool  
**Repository:** https://github.com/aaditya755/skh2

### Submission Checklist

- [ ] Repository is public
- [ ] README is complete
- [ ] Project runs locally
- [ ] IoT firmware is included
- [ ] Wokwi `diagram.json` is included
- [ ] No secrets are committed
- [ ] Demo video link is added
- [ ] Screenshots are added
- [ ] Architecture documentation is added
- [ ] Final-round roadmap is documented
- [ ] GitHub repository link is added to the SKH submission

---

# 👥 Team

## AgriCool Team

```text
Abhijay Junnare
Parth Mahajan
Janhavi Borade
Aditya Inamke
```

---

## 🌱 AgriCool

> **From harvest to market, keeping every degree and every decision under control.**
