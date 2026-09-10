# SIH-NER — North Eastern Region Logistics & Accessibility Intelligence Command Center

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Smart India Hackathon](https://img.shields.io/badge/SIH-Disaster_Logistics_Command-FF9933?style=for-the-badge)](https://sih.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

> **A disaster logistics and terrain-risk intelligence platform for resilient emergency supply movement across India's North Eastern Region.**

---

## 📌 Overview

The **SIH-NER Logistics Command Center** is an operational dashboard designed to support disaster-response logistics across the eight states of India's North Eastern Region (NER):

**Assam · Arunachal Pradesh · Meghalaya · Manipur · Mizoram · Nagaland · Tripura · Sikkim**

The platform brings together GIS mapping, convoy telemetry, incident management, risk intelligence, route recommendations, ETA analytics, offline field reporting, and role-based access control into a single unified command interface.

> **The Goal:**  
> Help decision-makers understand what is happening in real time, identify vulnerable corridors, reroute critical supplies, and coordinate field response when normal connectivity and transportation networks are disrupted.

---

## ⚠️ The Problem

The North Eastern Region presents a particularly challenging environment for disaster logistics:

- **Flash Floods & Monsoons:** Annual deluges disrupt highways and river-basin transport across major river systems.
- **Landslides & Sinking Terrain:** Sinking zones and unstable slopes isolate mountain corridors and cut off districts for days.
- **Strategic Road Dependencies:** Single highway dependencies create severe bottlenecks for fuel, food rations, pharmaceuticals, and relief equipment.
- **Intermittent Connectivity:** Rugged terrain leads to frequent cellular blackouts, making conventional always-online tracking unreliable in remote areas.
- **Multi-Agency Coordination:** Multiple response agencies (BRO, NDRF, SDMA, PWD, Transport Operators) need to coordinate road clearance, rescue ops, convoy movements, and relief supplies simultaneously.

> *A resilient logistics system therefore needs more than a map. It needs a shared operational picture and a coordinated response workflow.*

---

## 🚀 Core Capabilities

### 1. 🗺️ Live GIS Command Map
A tactical geospatial interface for monitoring roads, hazards, facilities, and convoy activity.
- Leaflet-based interactive mapping engine
- Satellite, terrain, and operational dark-mode map views
- Convoy and individual vehicle visualization
- Live hazard and chokepoint pins
- Route polylines and operational layer toggles
- State-level sector filtering across all 8 NER states

---

### 2. 🚚 Convoy & Supply Chain Monitoring
Track critical relief movement across vulnerable corridors with granular convoy telemetry:
- Active relief convoys and transport units
- Fuel (LPG/petrol) and essential supply movement
- Medical logistics and priority cargo tracking
- Real-time vehicle status indicators
- Checkpoint verification and route progress
- Consignment delivery manifests and tonnage metrics
- Operational delay metrics

**Vehicle Operational States:**
$$\text{MOVING} \longrightarrow \text{IDLING} \longrightarrow \text{HALTED} \longrightarrow \text{REROUTED}$$

---

### 3. 🛣️ Strategic Corridor Monitoring
The system models and monitors vital transportation lifelines serving the region:

| Corridor | Strategic Role | Key Focus & Terrain Challenges |
|:---|:---|:---|
| **NH-29** | Dimapur–Kohima–Imphal Lifeline | Vital conduit for Nagaland & Manipur; high landslide vulnerability |
| **NH-27** | Lumding–Haflong–Silchar Hill Section | Mountain section connecting Dima Hasao & Barak Valley |
| **NH-10** | Sevoke–Teesta–Gangtok Axis | Sikkim's sole major highway; recurring Teesta river sinking zones |
| **NH-13** | Trans-Arunachal Connectivity | High-altitude strategic border corridor connecting western Arunachal |
| **NH-6** | Meghalaya–Silchar Trunk Route | Vital freight trunk through East Jaintia Hills to South Assam |
| **NH-306** | Silchar–Vairengte–Aizawl Supply Line | Mizoram's primary artery for essential food, fuel, and supplies |
| **NH-208** | Tripura Multi-Modal Corridor | Key arterial transit linking Agartala to southern ports |

*These corridors can be tracked alongside active incidents, vehicle convoys, risk indices, and live delivery manifests.*

---

### 4. 🧠 Risk Intelligence & Route Recommendations
The platform combines operational and environmental factors to support real-time routing decisions:
- Rainfall intensity and precipitation alerts
- Terrain elevation and slope gradient profiles
- Historical landslide vulnerability indices
- Real-time road clearance status
- Bridge weight constraints and structural safety limits
- Active corridor disruption and chokepoint alerts
- Prevailing operational and weather conditions

When a corridor becomes unavailable or high-risk, the system surfaces alternative route recommendations and bypass options (such as bypass routes avoiding major slide zones).

> [!NOTE]
> **Decision-Support Notice:** The current implementation is a command-center prototype. Route and risk outputs are designed to serve as decision-support intelligence for coordinators rather than autonomous safety-critical navigation.

---

### 5. ⚠️ Incident Management
Incidents follow a structured operational lifecycle to ensure seamless inter-agency handoffs:

```
  ┌────────────┐
  │  REPORTED  │
  └─────┬──────┘
        ▼
  ┌────────────┐
  │  VERIFIED  │
  └─────┬──────┘
        ▼
  ┌────────────────────────┐
  │  CLEARING IN PROGRESS  │
  └─────┬──────────────────┘
        ▼
  ┌────────────────┐
  │  PILOT ESCORT  │
  └─────┬──────────┘
        ▼
  ┌────────────┐
  │  RESOLVED  │
  └────────────┘
```

**Key Workflow Capabilities:**
- Ground hazard reporting (mudslides, waterlogging, bridge washouts)
- Incident verification and severity classification
- Real-time clearance progress tracking with response teams (BRO, NDRF, PWD)
- Convoy diversion instructions
- Dynamic impact-radius assessments
- Historical incident logs and resolution audit trails

---

### 6. ⏱️ ETA & Delay Analytics
The dashboard provides operational visibility into delays caused by:
- Severe monsoon rainfall and water accumulation
- Road load and vehicle height restrictions
- Border weight checkpost and inspection queues
- Single-lane alternating traffic pilot escorts
- Steep hill-road bottlenecks and hairpin turns
- Debris clearance operations

*Historical delay patterns are utilized to identify recurring chokepoints and plan convoy departures proactively.*

---

### 7. 📱 Offline-First Field Reporting
Remote field teams and highway patrols frequently operate in deep mountain valleys with unreliable cellular reception:
- **Offline Incident Creation:** Field officers can log new hazard reports without an active network connection.
- **Local Browser Persistence:** Reports are safely cached on the device (`localStorage` / IndexedDB queuing).
- **Uninterrupted Operations:** Workflows remain fully accessible offline.
- **Automatic Background Sync:** As soon as connectivity or a satellite link is detected, reports automatically sync with Central Command.

---

### 8. 🔐 Role-Based Access Control (RBAC)
The interface supports six distinct operational personas tailored to civil defense and governance structures:

| Role | Agency / Affiliation | Primary Responsibility |
|:---|:---|:---|
| **Government Logistics Coordinator** | MDoNER / North Eastern Council (NEC) | Regional command overview, macro supply allocations, system-wide rerouting |
| **District Authority** | District Disaster Management Authority (DDMA) | District-level incident management, resource requisition, civil alerts |
| **Field Officer** | State PWD / Mobile Highway Escort | On-ground field reporting, road clearance validation, convoy check-ins |
| **NDRF Commander** | 1st & 12th NDRF Battalions | Search & rescue logistics, disaster sector mobilization, emergency corridors |
| **Convoy Pilot / Driver** | Critical Supply & Medical Transport | Route guidance, turn-by-turn waypoint updates, incident alerts, panic beacon |
| **System Administrator** | NIC Security Cell | Platform access governance, RBAC permissions, audit log scrutiny |

---

### 9. 🛡️ Audit & Accountability
Critical operational actions are recorded with timestamps and actor credentials for complete traceability:
- Emergency command decisions
- Incident state lifecycle transitions
- Convoy rerouting protocols and bypass authorizations
- Role switching and permission modifications
- Administrative modifications

*Ensures an immutable operational history to support post-incident analysis and administrative accountability.*

---

### 10. 🌐 Multilingual Tactical Interface
- **Bilingual Support:** Seamless toggling between **English** and **हिन्दी**
- **Command Palette:** Fast keyboard-driven command navigation (`Ctrl + K` or `/`)
- **Global Search:** Instantly locate convoys, incidents, supply warehouses, and corridor sectors
- **Live Clock & Uplink:** Real-time Indian Standard Time (IST) clock with satellite heartbeat telemetry
- **Tactical UX:** High-density dark mode engineered for continuous monitoring in control rooms

---

## 🏗️ System Architecture

```
                         ┌─────────────────────────────┐
                         │      SIH-NER COMMAND        │
                         │          CENTER             │
                         └──────────────┬──────────────┘
                                        │
                    ┌───────────────────┴───────────────────┐
                    │                                       │
                    ▼                                       ▼
          ┌──────────────────┐                    ┌──────────────────┐
          │ Operational UI   │                    │ Tactical GIS     │
          │                  │                    │                  │
          │ • Dashboard      │                    │ • Maps           │
          │ • Incidents      │                    │ • Convoys        │
          │ • Deliveries     │                    │ • Hazards        │
          │ • Field Reports  │                    │ • Route Layers   │
          └────────┬─────────┘                    └────────┬─────────┘
                   │                                       │
                   └───────────────────┬───────────────────┘
                                       │
             ┌─────────────────────────┼─────────────────────────┐
             │                         │                         │
             ▼                         ▼                         ▼
      ┌───────────────┐       ┌────────────────┐       ┌────────────────┐
      │ Authentication│       │ Risk & Route   │       │ Search &       │
      │ & RBAC        │       │ Intelligence   │       │ Operations     │
      │               │       │                │       │                │
      │ • Roles       │       │ • Risk scoring │       │ • Global search│
      │ • Guards      │       │ • Detours      │       │ • Command bar  │
      │ • Audit       │       │ • ETA analysis │       │ • Filters      │
      └───────────────┘       └────────────────┘       └────────────────┘
```

---

## 💻 Technology Stack

| Layer | Technology | Purpose |
|:---|:---|:---|
| **Frontend Framework** | **React 19.2** | Component-based operational interface with concurrent rendering |
| **Build Tool** | **Vite 8.2** | High-performance dev server and optimized production bundling |
| **Styling** | **Tailwind CSS 4.3** | High-density tactical dashboard styling and responsive layouts |
| **GIS & Mapping** | **Leaflet 1.9 + React-Leaflet 5.0** | Interactive geospatial visualization, custom markers, polylines |
| **Charts & Analytics** | **Recharts 3.10** | Throughput curves, delay trends, and operational data visualizations |
| **Routing** | **React Router DOM 7.18** | Client-side routing with role-based route access guards |
| **Iconography** | **Lucide React** | Consistent, lightweight tactical and logistics icons |
| **Code Quality** | **Oxlint** | High-speed Rust-powered JavaScript/React linting |

---

## 📂 Project Structure

```text
ner-logistics-command-center/
│
├── public/                         # Static assets and map markers
│
├── src/
│   ├── assets/                     # Brand emblems and visual graphics
│   │
│   ├── components/                 # Reusable tactical UI components
│   │   ├── alerts/                 # Critical emergency cards and triage filters
│   │   ├── analytics/              # Recharts throughput and performance views
│   │   ├── common/                 # Header, Sidebar, AlertTicker, GlobalSearch
│   │   ├── dashboard/              # Operational KPI tiles and convoy trackers
│   │   ├── deliveries/             # Supply manifest tables and tonnage counters
│   │   ├── eta/                    # Delay breakdown matrices
│   │   ├── risk/                   # Terrain risk cards and weather dials
│   │   └── routes/                 # Alternative route recommendation panels
│   │
│   ├── data/                       # Domain datasets and simulation registries
│   │   ├── mockDashboardData.js    # Operational KPIs, alerts, vehicle statuses
│   │   ├── mapData.js              # Geographic coordinates, hubs, and routes
│   │   ├── nerCorridors.js         # Master registry of the 8 NER strategic corridors
│   │   ├── incidentData.js         # Road blocks, mudslides, and flood events
│   │   ├── riskData.js             # Terrain stability and flood risk metrics
│   │   ├── usersRolesData.js       # RBAC policies, permission lists, and demo users
│   │   └── translations/           # Bilingual dictionaries (English, Hindi)
│   │
│   ├── hooks/                      # Custom React hooks (useAuth, useLanguage)
│   ├── layouts/                    # MainLayout (with tactical chrome) & AuthLayout
│   │
│   ├── pages/                      # Primary operational screens
│   │   ├── Dashboard.jsx           # Central Operations Overview
│   │   ├── LiveMap.jsx             # Full-Screen Tactical GIS Command Map
│   │   ├── Vehicles.jsx            # Fleet & Convoy Telemetry
│   │   ├── VehicleDetails.jsx      # Individual Convoy Telemetry & Manifest
│   │   ├── Incidents.jsx           # Hazard Tracker & Crisis Log
│   │   ├── IncidentDetails.jsx     # Incident Deep-Dive & Agency Dispatch
│   │   ├── RiskIntelligence.jsx    # Predictive Terrain Hazard Assessment
│   │   ├── RouteRecommendations.jsx# AI Alternative Route & Bypass Engine
│   │   ├── ETADelays.jsx           # Mountain Corridor Delay Projections
│   │   ├── Alerts.jsx              # Regional Emergency Broadcasts
│   │   ├── Deliveries.jsx          # Cargo Manifest & Supply Tonnage
│   │   ├── FieldReports.jsx        # Offline-First Incident Submission
│   │   ├── Analytics.jsx           # Throughput & Operational Metrics
│   │   ├── UsersRoles.jsx          # Civil Protection RBAC Administration
│   │   ├── AuditLogs.jsx           # Tamper-Evident Action Audit History
│   │   └── Login.jsx               # Multi-Role Secure Login Portal
│   │
│   ├── services/                   # Auth, storage, and state services
│   ├── utils/                      # IST Date/time and number formatters
│   ├── App.jsx                     # Application routes & context providers
│   └── main.jsx                    # Application entry point
│
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

Check your installed versions:
```bash
node --version
npm --version
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sumit9711/NER.git
   cd NER
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**  
   Open your browser and navigate to the address shown in your terminal (typically `http://localhost:5173`).

### Production Build & Linting

Create a production-optimized build:
```bash
npm run build
```

Run code quality linting:
```bash
npm run lint
```

---

## 🔑 Demo Access & Role Switching

The prototype includes a pre-configured, 1-click persona switching mechanism in the top navigation bar and `/login`:

- **Coordinator**: Full regional oversight across all 8 states and corridor reroutes.
- **District Authority**: District-level incident focus and local emergency resources.
- **Field Officer**: Priority access to offline-ready incident reporting.
- **NDRF Commander**: Emergency lane clearances and specialized rescue convoys.
- **Convoy Pilot / Driver**: Driver-focused route navigation and distress beacons.
- **System Administrator**: Full user administration, permissions, and audit logs.

*Each persona dynamically alters available navigation items and operational views.*

---

## 🗺️ Regional Operations (All 8 NER States)

The command interface allows filtering all operational views across the 8 North Eastern States:

| State | Operational Focus & Lifeline Conduits |
|:---|:---|
| **Assam** | Primary gateway hub, Brahmaputra river basin transport, NH-27 Barak section |
| **Arunachal Pradesh** | Mountain and frontier connectivity, NH-13 Trans-Arunachal corridor |
| **Meghalaya** | High-rainfall hill corridors, NH-6 mining and freight supply movement |
| **Manipur** | NH-29 Imphal lifeline connectivity, essential fuel and medical supply flows |
| **Mizoram** | NH-306 Silchar–Aizawl single-corridor supply dependency |
| **Nagaland** | Dimapur–Kohima chokepoints, Chumukedima landslide mitigation sector |
| **Tripura** | Agartala multimodal transport and international transit links |
| **Sikkim** | NH-10 Teesta River axis and Gangtok strategic supply route |

---

## 🔮 Strategic Roadmap

The following enhancements are planned for subsequent development phases:

- [ ] **NavIC / IRNSS Integration:** Native hardware support for Indian satellite navigation systems on relief convoys.
- [ ] **LoRaWAN / VHF Mesh Fallback:** Automatic mesh packet routing when cellular base stations are downed by floods.
- [ ] **Drone & LiDAR Feeds:** Real-time aerial photogrammetry for early detection of slope creep and impending slides.
- [ ] **Dynamic Bilingual SMS / IVR:** Automated voice and text alerts to convoy pilots entering suddenly blocked valleys.
- [ ] **External API Connectors:** Live ingestion of IMD weather radars and Central Water Commission (CWC) river gauges.
- [ ] **Persistent Backend DB:** Migration from client-side simulated state to PostgreSQL/PostGIS and distributed event streams.

---

## 📊 Project Status

> **Current Stage:** Prototype / SIH Demonstration Platform  
> The repository focuses on demonstrating the end-to-end operational workflow, GIS visualization, role-based governance, terrain risk intelligence, and coordinated disaster logistics model for the North Eastern Region. External API integrations, live telemetry hardware, and production-scale microservices represent planned roadmap items.

---

## 👥 Smart India Hackathon (SIH) Context

- **Project:** SIH-NER — North Eastern Region Logistics & Accessibility Intelligence Command Center
- **Category:** Disaster Management & Logistics Accessibility Intelligence
- **Target Geography:** North Eastern Region (NER), India
- **Nodal Ministry / Council:** Ministry of Development of North Eastern Region (MDoNER) / North Eastern Council (NEC)
- **Repository:** [https://github.com/Sumit9711/NER](https://github.com/Sumit9711/NER)

---

## 📄 License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

---

<div align="center">

**Built for resilient logistics, faster response, and uninterrupted connectivity across the North Eastern Region of India.**

</div>
