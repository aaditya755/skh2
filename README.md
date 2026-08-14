# AgriCool 🌱❄️

### AI-Powered Cold-Chain Intelligence Platform

> **From harvest to market, keeping every degree and every decision under control.**

AgriCool is a cold-chain intelligence platform designed to reduce agricultural post-harvest losses by connecting **farmers, cold-storage facilities, refrigerated logistics providers, and government authorities** through a unified digital platform.

The prototype combines storage discovery and management, crop-batch tracking, simulated IoT telemetry, spoilage-risk detection, shared cold-chain logistics, fleet monitoring, AI-assisted crop preservation, and district-level cold-chain analytics.

---

## 🚨 Problem

Agricultural produce can lose significant value after harvest because of:

- Limited visibility into available cold-storage capacity
- Difficulty finding suitable storage at the right time
- Manual coordination through calls, WhatsApp, and spreadsheets
- Temperature and humidity risks during storage and transportation
- Inefficient refrigerated transportation
- Small farmers being unable to fill entire refrigerated vehicles
- Poor visibility into crop condition while in transit
- Lack of centralized cold-chain data for authorities

AgriCool aims to move the workflow from **reactive loss management to proactive cold-chain intervention**.

---

## 💡 Solution

AgriCool connects the cold-chain journey into one workflow:

```text
Harvest
   ↓
Register Crop Batch
   ↓
Find / Reserve Cold Storage
   ↓
Monitor Storage Conditions
   ↓
Detect Spoilage Risk
   ↓
Create / Join Shared Refrigerated Load
   ↓
Track Shipment
   ↓
Monitor Temperature
   ↓
Detect Temperature Breach
   ↓
AI Preservation Recommendation
   ↓
Delivery
   ↓
District-Level Analytics
```

Instead of treating storage, transportation, monitoring, and analytics as separate systems, AgriCool creates a connected cold-chain ecosystem.

---

# ✨ Key Features

## 👨‍🌾 Farmer Portal

Farmers can:

- Register harvest batches
- Track crop batches
- View storage and shipment status
- Receive spoilage-risk alerts
- Discover cold-storage options
- Explore shared refrigerated transportation
- Access crop-preservation recommendations
- Review batch history and outcomes

---

## 🏭 Storage Owner Portal

Storage operators can:

- View incoming farmer storage requests
- Review commodity, quantity, duration, and target zone
- Accept or reject storage requests
- Create and manage storage zones
- Monitor storage capacity
- Track stored crop batches
- Monitor environmental telemetry
- View operational alerts

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

# 📡 IoT Cold-Chain Monitoring

The prototype demonstrates an IoT monitoring pipeline using a **simulated ESP32 sensor node in Wokwi**.

The telemetry layer demonstrates monitoring of:

- 🌡️ Temperature
- 💧 Humidity
- 🧪 Ethylene / gas levels
- ⚖️ Cargo mass
- 🔌 Sensor status

Example dashboard readings include temperature and humidity values and their safe/warning/critical states.

### Important prototype note

The current demo uses **simulation**, not deployed physical sensors.

Wokwi/ESP32 simulation is used to demonstrate how sensor telemetry can flow into the AgriCool dashboard. The architecture can later be connected to physical ESP32 sensor nodes and real cold-storage infrastructure.

---

# 🚨 Spoilage-Risk Detection

AgriCool demonstrates proactive spoilage-risk alerts.

For example:

> **SPOILAGE RISK ALERT — TOMATOES**

> Move to cold storage within 4 hours to avoid heat softening and mold formation.

The system presents:

- Crop
- Batch ID
- Risk level
- Recommended action
- Time-sensitive intervention

The goal is to identify risk **before significant crop loss occurs**.

---

# 🧪 Ethylene Compatibility

AgriCool includes crop compatibility guidance based on ethylene behavior.

The interface distinguishes between:

### High Ethylene Producers

- Tomatoes
- Mangoes
- Apples
- Bananas
- Pears
- Papayas

### Ethylene-Sensitive Produce

- Onions
- Potatoes
- Leafy greens
- Spinach
- Carrots
- Watermelon
- Grapes
- Cucumbers

This helps users understand which crops should be segregated to reduce premature ripening and quality loss.

---

# 🚚 Shared Cold-Chain Logistics

Small farmers may not have enough produce to fill an entire refrigerated vehicle.

AgriCool introduces **Shared Cold-Chain Logistics**, allowing compatible partial loads travelling along similar routes to be pooled.

Example scenario:

```text
Nashik → Mumbai APMC
```

Prototype scenario:

```text
Individual transport: ₹8,400
Shared transport:     ₹3,200
```

The displayed saving is a **prototype scenario/estimate**, not a guaranteed real-world price.

The concept is similar to an **"Airbnb for cold-chain capacity"**: make unused refrigerated capacity available to farmers who need it.

---

# 🗺️ Shipment & Route Monitoring

AgriCool provides visibility into crop movement.

Shipment information can include:

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

Example:

### Mango Shipment

```text
Quantity:       600 kg
Route:          Ratnagiri → Navi Mumbai
Temperature:    22.4°C
Target:         12.5°C
Status:         TEMP BREACH
```

A healthy shipment can also be shown as successfully delivered.

Example:

### Onion Shipment

```text
Quantity:       3,000 kg
Temperature:    1.8°C
Target:         2.0°C
Status:         Delivered
```

This demonstrates the difference between an in-range shipment and a cold-chain temperature failure.

---

# 🚨 Alerts & Notifications

The platform surfaces important operational events such as:

- Critical spoilage risk
- Temperature breaches
- Storage booking confirmations
- Shipment issues
- Storage availability
- Recommendations
- Cold-chain advisories

This converts raw operational information into events that users can act on.

---

# 🧾 Batch History & Traceability

AgriCool maintains a batch-oriented view of the cold-chain journey.

Users can review:

- Archived batches
- Completed shipments
- Revenue
- Quality outcomes
- Spoilage information
- Batch status history
- Reports / CSV export

This creates a foundation for future traceability and analytics.

---

# 🧠 AI Crop Preservation Advisor

The **AI Crop Preservation Advisor** is the main decision-support component of the prototype.

Users can provide:

- Crop
- Ambient temperature
- Humidity
- Transit time

Example:

```text
Crop:                Tomatoes
Ambient Temperature: 32°C
Humidity:            65%
Transit Time:        6 hours
```

The advisor produces a shelf-life/spoilage-risk recommendation.

Example:

```text
Risk: High
Recommendation:
Move tomatoes to cold storage within 4 hours.
```

When environmental inputs change, the prototype can produce a different risk level/recommendation.

### AI implementation note

The current prototype demonstrates the **decision-support workflow**. It should not be presented as a fully trained predictive ML model unless a trained model is actually connected behind the feature.

A production version could incorporate historical:

- Temperature
- Humidity
- Transit duration
- Crop type
- Storage conditions
- Spoilage outcomes
- Market arrival quality

to train and continuously improve predictive models.

---

# 🏛️ Government / District Governance

AgriCool also provides a district-level cold-chain governance view.

The dashboard can present:

- Regional cold-storage capacity
- Capacity utilization
- Registered facilities
- Food-loss indicators
- Subsidy information
- Perishable corridors
- Facility audits
- Compliance information
- District reports
- Cold-chain advisories

Example prototype KPIs include:

```text
Regional Cold Capacity     41.1K MT
Food Loss Prevented        ₹14.45 Cr
Registered Facilities      51 Units
PMKSY Subsidy Pool         ₹4.20 Cr
```

These figures are **prototype/demo data** unless connected to verified government datasets.

---

# 🚛 Refrigerated Fleet Management

The fleet-management module provides visibility into refrigerated transportation assets.

It can display:

- Total fleet
- Fleet payload
- Vehicles currently on route
- Vehicles available at depot
- Vehicles in maintenance
- Reefer telemetry
- Current shipments
- Temperature breaches
- Route status
- Driver/dispatch information

Example prototype dashboard:

```text
Total Fleet:              6 Units
Fleet Payload:            24.8 MT
Active on Route:          3
Available at Depot:       2
In Maintenance:           1
Average Reefer Telemetry: 8.5°C
```

---

# 🌐 Multi-Portal Architecture

AgriCool is designed around multiple user roles:

```text
                 ┌───────────────────┐
                 │     AgriCool      │
                 │ Cold-Chain Layer  │
                 └─────────┬─────────┘
                           │
       ┌───────────────────┼───────────────────┐
       │                   │                   │
       ▼                   ▼                   ▼
   Farmer Portal     Storage Portal      Logistics/Fleet
       │                   │                   │
       └───────────────────┼───────────────────┘
                           │
                           ▼
                  Government / District
                     Governance
```

---

# 🔄 End-to-End Example

A typical AgriCool workflow can look like this:

### 1. Harvest

A farmer harvests tomatoes and registers the batch.

### 2. Risk Assessment

AgriCool evaluates the crop/environmental conditions and identifies potential spoilage risk.

### 3. Storage Discovery

The farmer can find suitable cold-storage options and review capacity, distance, and price information.

### 4. Reservation

The farmer sends a storage request.

### 5. Storage Management

The facility operator reviews and accepts the request.

### 6. Monitoring

The crop enters a monitored cold-storage environment.

### 7. Risk Detection

Telemetry or simulated telemetry can trigger a temperature/spoilage warning.

### 8. Shared Transport

The farmer can create or join a shared refrigerated load.

### 9. Shipment

The crop moves toward its destination while shipment information and temperature are monitored.

### 10. Alert

If the temperature crosses its target range, AgriCool highlights the shipment as a temperature breach.

### 11. AI Recommendation

The preservation advisor provides a recommended action based on crop and environmental conditions.

### 12. Delivery

The batch reaches its destination and becomes part of the historical record.

### 13. Governance

Aggregated information can support district-level cold-chain planning and infrastructure decisions.

---

# 🎯 Core Innovation

AgriCool is **not simply a cold-storage booking application**.

Its core concept is the combination of:

```text
AI / Decision Support
        +
IoT Telemetry
        +
Cold Storage
        +
Spoilage Risk Detection
        +
Shared Refrigerated Logistics
        +
Shipment Monitoring
        +
Fleet Management
        +
Government Analytics
```

This creates a connected digital layer across the agricultural cold chain.

---

# 🛠️ Technology / Prototype Components

The prototype demonstrates a combination of:

- Web-based dashboards
- Role-based portal experiences
- Simulated ESP32 telemetry
- Wokwi IoT simulation
- Environmental monitoring
- Rule/decision-based risk detection
- Crop preservation decision support
- Logistics and fleet interfaces
- Data visualization
- Government analytics
- CSV/report workflows

> Add or modify the exact frontend/backend framework and database here if they are part of the final repository implementation.

---

# 📊 Expected Impact

AgriCool is designed to contribute toward:

### Reduced Post-Harvest Loss

Earlier detection of environmental and spoilage risks.

### Better Cold-Storage Utilization

Improved visibility into available capacity and storage zones.

### Lower Transportation Cost

Shared refrigerated loads can reduce unused vehicle capacity and improve accessibility for smaller farmers.

### Better Cold-Chain Visibility

Farmers and operators can track crop batches and shipment conditions.

### Faster Decision-Making

Operational data is converted into alerts and recommendations.

### Better Government Planning

District-level analytics can help authorities identify infrastructure gaps and utilization patterns.

---

# 🚀 Future Roadmap

The prototype can be extended with:

- Physical ESP32 sensor deployment
- Real-time cloud IoT ingestion
- ML-based shelf-life prediction
- Historical spoilage prediction
- Power-failure prediction
- Dynamic market-price recommendations
- Emergency rerouting
- Multi-objective route optimization
- Digital twins for cold-storage facilities
- Carbon-saving calculations
- Automated alerts through SMS/WhatsApp
- Regional language support
- Integration with government/agricultural datasets
- Blockchain or tamper-evident batch traceability where justified

These are future capabilities and are separate from the functionality demonstrated in the current prototype.

---

# 🔐 Prototype & Data Disclaimer

AgriCool is currently a prototype/demo.

Some values, telemetry readings, transportation prices, government KPIs, and operational events shown in the interface are simulated or demonstration data.

The current IoT demonstration uses **Wokwi/ESP32 simulation** rather than a deployed physical sensor network.

Production deployment would require:

- Real sensor hardware
- Secure device authentication
- Cloud infrastructure
- Verified agricultural datasets
- Validated spoilage models
- Real logistics integrations
- Government/data-provider integrations
- Security and privacy controls
- Field validation with farmers and storage operators

---

# 🏆 Hackathon Positioning

AgriCool is designed around a simple idea:

> **Don't wait for agricultural produce to spoil. Detect the risk, find the right storage, move it intelligently, and monitor the cold chain until it reaches the market.**

The platform connects the people, infrastructure, data, and decisions required to make that possible.

---

## 📌 Tagline

> **AgriCool — From harvest to market, keeping every degree and every decision under control.**

---

## 👥 Project

**AgriCool — Cold-Chain Intelligence Platform**

Built as an agricultural technology prototype focused on reducing post-harvest losses and improving India's cold-chain efficiency.
