# SIH-NER — Protect the Mission

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-GIS-199900?style=for-the-badge&logo=leaflet&logoColor=white)](https://leafletjs.com/)
[![Smart India Hackathon](https://img.shields.io/badge/SIH_2026-PS26002-FF9933?style=for-the-badge)](https://sih.gov.in/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**North Eastern Region Logistics & Accessibility Intelligence Command Center**  
*AI-Based Emergency Logistics Resilience & Accessibility Platform for the North Eastern Region*

**SIH-NER** is an AI-assisted emergency logistics intelligence platform designed to help authorities plan, monitor, and protect critical supply missions during floods, heavy rainfall, road blockages, river-level changes, and other disruptions across the North Eastern Region (NER).

Instead of only showing where a disruption has occurred, SIH-NER answers:

> **"What happens if this road fails?"**

It identifies affected missions, facilities, settlements, estimated delays, alternative routes, and recommended actions so that logistics coordinators can make faster and more informed decisions.

---

## 1. Project Information

* **Project Title:** SIH-NER — AI-Based Emergency Logistics Resilience & Accessibility Platform
* **PS ID:** PS26002
* **PS Title:** AI-Based Smart Logistics and Accessibility Intelligence Platform for North Eastern Region (NER)
* **Category:** Software
* **Theme:** Smart Automation
* **Tagline:** **Protect the Mission.**
* **Repository:** [https://github.com/Sumit9711/NER](https://github.com/Sumit9711/NER)

---

## 2. Problem Statement

The North Eastern Region is highly vulnerable to floods, heavy rainfall, river-level changes, landslides, embankment failures, and road disruptions.

During such events, emergency logistics coordinators need to quickly determine:

* Which roads and corridors are currently at risk?
* Which critical missions are affected?
* Which hospitals, health centres, villages, and supply destinations may become inaccessible?
* How much additional travel time could a disruption cause?
* Which alternative routes are available?
* What happens if a critical road completely fails?
* What action should be taken before the disruption affects the mission?

Existing systems often provide individual data points such as weather, flood information, maps, or incident reports. The challenge is converting these fragmented signals into **mission-level operational decisions**.

---

## 3. Proposed Solution

**SIH-NER** integrates geospatial data, weather and flood information, road-network data, field reports, mission information, and vehicle telemetry into a unified emergency logistics command platform.

The system follows:

$$\textbf{DETECT} \longrightarrow \textbf{UNDERSTAND} \longrightarrow \textbf{PREDICT} \longrightarrow \textbf{SIMULATE} \longrightarrow \textbf{DECIDE} \longrightarrow \textbf{ACT} \longrightarrow \textbf{VERIFY}$$

### Core Workflow

1. **Detect** disruptions using weather, river, flood, road, and field information.
2. **Understand** why a route or area is becoming risky.
3. **Predict** potential road/accessibility disruptions when sufficient historical data is available.
4. **Simulate** road failures and calculate their consequences.
5. **Decide** the safest or most resilient routing strategy.
6. **Act** through mission reassignment, route changes, field intervention, or alerts.
7. **Verify** the situation through updated observations and field reports.

### Signature Capability — Impact Simulation

A logistics coordinator can select a road segment and simulate:

> **"What happens if this road fails?"**

SIH-NER temporarily removes the road from the routing network and calculates:

* Affected active missions
* Affected hospitals and health centres
* Affected settlements
* Disconnected destinations
* Alternative routes
* Additional travel time
* Accessibility changes
* Recommended intervention

This makes SIH-NER a **logistics resilience platform**, rather than simply a navigation or map application.

---

## 4. Key Features

### Emergency Command Center
* Interactive Assam / NER map with multi-layer overlays (satellite, terrain, tactical)
* Active mission overview and cargo tracking
* Critical disruption alerts and hazard ticker
* Real-time risk summary across all 8 NER states
* Data-source health telemetry
* Mission and road status feeds
* Incident timeline and operational log

### Mission Management
* Create and manage emergency relief missions
* Origin and destination tracking with waypoint progress
* Commodity and priority classification (medical, fuel, rations)
* Vehicle assignment and convoy groupings
* Dynamic route and ETA monitoring
* Real-time mission risk assessment

### Risk Intelligence
* Rainfall-based precipitation hazard index
* River-level and flood extent information
* Road vulnerability and slope stability analysis
* Verified field incident reports
* Historical incident patterns and recurring slide areas
* Explainable risk evidence

Every risk result answers:

$$\textbf{WHAT} \longrightarrow \textbf{WHY} \longrightarrow \textbf{IMPACT} \longrightarrow \textbf{ACTION}$$

### Impact Simulator
* Select any road segment or corridor section
* Simulate complete or partial road failure
* Recalculate affected network nodes dynamically
* Identify affected missions, health facilities, and isolated settlements
* Compute alternative routes and bypass corridors
* Compare before/after accessibility scores
* Estimate additional travel time and convoy delay

### Intelligent Routing
Routes can be evaluated using multiple operational parameters:
* Travel time and gradient profiles
* Road accessibility and weight limits
* Disruption probability and weather risk
* Mission priority classification

**Supported Routing Modes:**
* `FASTEST` — Minimizes travel time under current conditions
* `SAFEST` — Avoids flood-prone and high landslide risk corridors
* `BALANCED` — Balances mission deadline with route vulnerability

### Offline Field Reporting
Field officers operating in zero-connectivity terrain can submit:
* Incident type (landslide, waterlogging, bridge damage)
* Description and on-site observations
* Severity rating
* GPS coordinates
* Timestamp
* Field photographs
* Voice notes

Reports are stored locally in the browser (`localStorage` / IndexedDB) and automatically synchronized when connectivity returns.

### Data Source Health
The system monitors and exposes telemetry for every ingestion feed:
* Source status (`LIVE` | `STALE` | `UNAVAILABLE` | `PREDICTED` | `SIMULATED`)
* Last successful fetch timestamp
* Last attempt and latency
* Record count and ingested geometry
* Source provider metadata

### Explainable AI
AI-generated risk assessments and route recommendations are accompanied by:
* Contributing evidence metrics
* Confidence score
* Timestamp and source metadata
* Model version and scoring methodology
* Plain-language explanation

The system does not hide uncertainty behind an opaque single score.

---

## 5. Technology Stack

| Layer | Technologies | Purpose |
|:---|:---|:---|
| **Frontend UI** | React 19, TypeScript/JavaScript, Vite 8, Tailwind CSS 4 | Fast responsive operational dashboard, tactical dark mode |
| **GIS & Mapping** | Leaflet 1.9, React-Leaflet 5.0, MapLibre GL compatible | Interactive mapping, road polylines, hazard geofencing |
| **Data Visualization** | Recharts 3.10 | Mission throughput, cargo tonnage, delay curves |
| **State & Offline** | IndexedDB, `localStorage`, Service Workers | Offline-first field reporting and mission caching |
| **Backend (Target API)** | Python, FastAPI, REST APIs, JWT, RBAC | High-performance mission planning and simulation engine |
| **Database & GIS DB** | PostgreSQL, PostGIS | Spatial indexes, routing network topologies, mission storage |
| **AI / Machine Learning** | Python, Pandas, GeoPandas, NumPy, Scikit-learn, LightGBM | Evidence-based risk scoring, historical hazard prediction |
| **Routing Engine** | OpenStreetMap, OSRM / GraphHopper | Multi-modal network routing, dynamic edge removal |
| **Key Integrations** | IMD, CWC, Bhuvan/ISRO/NDEM, ASDMA, OpenStreetMap | Multi-source meteorological and hydro-spatial feeds |

---

## 6. Architecture

```text
                    ┌─────────────────────────┐
                    │   Government / Field    │
                    │        Users            │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   SIH-NER Web / PWA     │
                    │ React + TypeScript       │
                    │ MapLibre + Offline PWA   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       FastAPI Backend   │
                    │ Auth + RBAC + REST API  │
                    └────────────┬────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
          ▼                      ▼                      ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│ Data Providers  │    │ Logistics Engine │    │ Risk / AI       │
│                 │    │                  │    │ Engine          │
│ IMD             │    │ Mission Manager  │    │ Risk Assessment │
│ CWC             │    │ Routing          │    │ Prediction      │
│ Bhuvan / NDEM   │    │ Impact Simulator │    │ Explainability  │
│ ASDMA           │    │ ETA              │    │                 │
│ OSM             │    │ Accessibility    │    │                 │
│ GPS / Telemetry │    │                  │    │                 │
└────────┬────────┘    └────────┬─────────┘    └────────┬────────┘
         │                      │                       │
         └──────────────────────┼───────────────────────┘
                                ▼
                    ┌─────────────────────────┐
                    │ PostgreSQL + PostGIS    │
                    │                         │
                    │ Missions                │
                    │ Roads                   │
                    │ Incidents               │
                    │ Field Reports           │
                    │ Weather / River Data    │
                    │ Flood Extents           │
                    │ Risk Predictions        │
                    │ Vehicles                 │
                    └─────────────────────────┘
```

### Decision Pipeline

```text
Weather / River / Flood / Roads / Field Reports
                       │
                       ▼
                    Ingestion
                       │
                       ▼
                Data Normalization
                       │
                       ▼
             Spatial + Temporal Join
                       │
                       ▼
                Risk Assessment
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
    Current Risk              ML Prediction
                                  │
                                  ▼
                         Impact Simulation
                                  │
                                  ▼
                         Route Alternatives
                                  │
                                  ▼
                       Mission-Level Decision
                                  │
                                  ▼
                         Alert / Action
                                  │
                                  ▼
                              Verify
```

---

## 7. Repository Structure

```text
ner-logistics-command-center / SIH-NER/
│
├── README.md                       # Comprehensive Platform Documentation
├── LICENSE                         # Open-source MIT License
├── package.json                    # Frontend dependencies & scripts
├── vite.config.js                  # Vite bundler configuration
│
├── public/                         # Public GIS assets, marker icons
│
├── src/                            # Command Center Frontend Application
│   ├── assets/                     # Emblems, brand marks, and styles
│   │
│   ├── components/                 # Reusable UI components & modules
│   │   ├── alerts/                 # Critical emergency cards & urgency filters
│   │   ├── analytics/              # Recharts visual components & throughput graphs
│   │   ├── common/                 # Global Header, Sidebar, AlertTicker, GlobalSearch
│   │   ├── dashboard/              # Metric KPI cards, Active Convoy tables
│   │   ├── deliveries/             # Manifests & consignment tracking
│   │   ├── eta/                    # Corridor delay breakdown tables
│   │   ├── risk/                   # Risk matrix heatmaps & weather dials
│   │   └── routes/                 # What-if Impact Simulation & route panels
│   │
│   ├── data/                       # Domain data, corridors & mock telemetry
│   │   ├── mockDashboardData.js    # Operational KPIs, alerts, vehicle statuses
│   │   ├── mapData.js              # Geographic coordinates, hubs, and routes
│   │   ├── nerCorridors.js         # Master registry of the 8 NER strategic corridors
│   │   ├── incidentData.js         # Road blocks, mudslides, and flood events
│   │   ├── riskData.js             # Terrain stability and flood risk metrics
│   │   ├── usersRolesData.js       # RBAC policies, permission lists, and demo users
│   │   └── translations/           # Regional i18n dictionaries (English, Hindi)
│   │
│   ├── hooks/                      # Custom hooks (useAuth, useLanguage)
│   ├── layouts/                    # MainLayout (with tactical chrome) & AuthLayout
│   ├── pages/                      # Operational command center screens
│   │   ├── Dashboard.jsx           # Central Operations Overview
│   │   ├── LiveMap.jsx             # Full-Screen Tactical GIS Command Map
│   │   ├── Vehicles.jsx            # Fleet & Convoy Telemetry
│   │   ├── VehicleDetails.jsx      # Individual Convoy Telemetry & Manifest
│   │   ├── Incidents.jsx           # Hazard Tracker & Crisis Log
│   │   ├── IncidentDetails.jsx     # Incident Deep-Dive & Agency Dispatch
│   │   ├── RiskIntelligence.jsx    # Predictive Terrain Hazard Assessment
│   │   ├── RouteRecommendations.jsx# AI Alternative Route & Impact Simulator
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
└── submission/
    └── presentation.md             # Final SIH Presentation Link
```

### What Goes Where?

| Item | Location |
|:---|:---|
| Frontend Source Code | `src/` |
| GIS Map & Tactical Telemetry | `src/pages/LiveMap.jsx`, `src/data/mapData.js` |
| Impact Simulator & Routing | `src/pages/RouteRecommendations.jsx`, `src/components/routes/` |
| Risk Intelligence Engine | `src/pages/RiskIntelligence.jsx`, `src/components/risk/` |
| Strategic Corridors Registry | `src/data/nerCorridors.js` |
| Offline Field Reporting | `src/pages/FieldReports.jsx` |
| Role-Based Access Control | `src/services/authService.js`, `src/data/usersRolesData.js` |
| Final Presentation | `submission/presentation.md` |

---

## 8. Final Presentation

The final SIH presentation is stored in [`submission/presentation.md`](./submission/presentation.md):

* **Direct Viewer Link:** [Open Final Presentation (Google Slides)](https://docs.google.com/presentation/d/1rRVEb_hT2DvjaEEfc5wGSnqgNLwjI2rB/edit?usp=sharing&ouid=110493815875369462344&rtpof=true&sd=true)

The presentation covers:
1. Problem statement and NER logistics context
2. SIH-NER solution & "Protect the Mission" methodology
3. Technical architecture and decision pipeline
4. Feasibility and regional implementation plan
5. Impact on disaster relief and supply chain resilience
6. Research, datasets, and operational references

---

## 9. Demo Video

A comprehensive demonstration of the working system workflow:

```text
Login (Role Selection)
  ↓
Command Center Overview
  ↓
Create / Select Emergency Mission
  ↓
View Current Route & Risk
  ↓
Select Critical Road
  ↓
"What happens if this road fails?"
  ↓
Run Impact Simulation
  ↓
Affected Missions / Facilities / Settlements
  ↓
Alternative Route Recalculation
  ↓
Recommended Action Broadcast
  ↓
Field Report / Verification
```

* **Video Link:** `[Add YouTube / Google Drive demo link here]`

---

## 10. Screenshots / Prototype

Recommended prototype screenshots covering operational views:
* **Command Center:** Central overview with live KPIs, active convoys, and chokepoints
* **Mission Planner:** Consignment manifests, cargo priority, and destination tracking
* **Impact Simulator:** "What happens if this road fails?" scenario testing and detour analysis
* **Risk Intelligence:** Multi-source rainfall, river-level, and slope vulnerability matrix
* **Live Vehicle Tracking:** Real-time GIS breadcrumbs for emergency relief convoys
* **Offline Field Reporting:** Local report caching and automatic synchronization
* **Data Source Health:** Latency, status, and freshness telemetry of data feeds

> *Screenshots represent the implemented command center prototype. Simulated demonstration data is explicitly labeled.*

---

## 11. Installation

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **npm:** v9.0.0 or higher

Check your installed versions:
```bash
node --version
npm --version
```

### Clone the Repository
```bash
git clone https://github.com/Sumit9711/NER.git
cd ner-logistics-command-center
```

### Install Dependencies
```bash
npm install
```

---

## 12. Run

### Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to the address shown in your terminal:
```text
http://localhost:5173
```

### Production Build
```bash
npm run build
```

### Linting
```bash
npm run lint
```

*(For backend and Docker deployment environments, refer to the planned service configurations in `docs/deployment.md`.)*

---

## 13. Future Scope

* **Advanced Flood Prediction:** Integrate deep historical inundation data with high-resolution digital elevation models (DEM) to forecast washouts hours in advance.
* **Machine-Learning Disruption Prediction:** Train and validate spatial-temporal models to estimate link failure probability within 6-hour and 24-hour lookaheads.
* **NavIC (IRNSS) Telemetry:** Direct hardware integration with indigenous NavIC satellite positioning modules on relief convoys.
* **Satellite Synthetic Aperture Radar (SAR):** Automated ingestion of Sentinel-1 / RISAT SAR data to detect surface water through thick monsoon cloud cover.
* **Multi-Objective Route Resilience:** Route optimization balancing travel time, terrain gradient, bridge load capacity, and slide probability.
* **Automated Bilingual SMS / IVR:** Instant push alerts to convoy drivers and village heads approaching sudden road cuts.
* **Pan-NER Expansion:** Scale full corridor coverage across all 8 North Eastern States.

---

## 14. Data Integrity & Demo Policy

SIH-NER is designed around the principle:

> **Operational decisions should be based on traceable evidence.**

Therefore:
* The frontend is never treated as the source of truth.
* Numerical values originate from verified datasets, geospatial models, or user inputs.
* External data sources and APIs are not fabricated.
* Simulated events and demo datasets are explicitly marked:
  ```text
  DEMO MODE — SIMULATED EVENTS
  ```
* If an external integration is awaiting live API keys:
  ```text
  Data unavailable — Awaiting source connection
  ```
* AI predictions expose their contributing evidence, confidence level, and source timestamps.

---

## 15. Security

The platform implements and adheres to civil defense security standards:
* JWT-based secure session tokens
* Role-Based Access Control (RBAC) with 6 distinct operational personas
* Server-side permission guards
* Input sanitization and payload validation
* Audit logging of all command decisions, bypass activations, and role transitions
* Strict secret isolation (credentials never committed to version control)

**Supported Access Personas:**
```text
ADMIN                  — System Administrator & Access Governance
LOGISTICS_COORDINATOR  — Regional Command & Route Authorization
FIELD_OFFICER          — Ground Inspection & Offline Reporting
```

---

## 16. Core Mission

SIH-NER is built around one governing principle:

> **Don't just detect disruption. Protect the mission.**

When a road becomes risky, the important question is not only:

**"What happened to the road?"**

It is:

**"Which critical mission will be affected, what happens if the road fails, and what should we do now?"**

SIH-NER connects real-world disruption intelligence with mission-level decisions to ensure uninterrupted emergency supply lines across the North Eastern Region.

---

<div align="center">

**SIH-NER — Protect the Mission**  
*Built for the safety, resilience, and connectivity of the North Eastern Region of India.*

</div>
