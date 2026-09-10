SIH-NER — North Eastern Region Logistics & Accessibility Intelligence Command Center

A disaster logistics and terrain-risk intelligence platform for resilient emergency supply movement across India's North Eastern Region.








Overview

The SIH-NER Logistics Command Center is an operational dashboard designed to support disaster-response logistics across the eight states of India's North Eastern Region (NER):

Assam · Arunachal Pradesh · Meghalaya · Manipur · Mizoram · Nagaland · Tripura · Sikkim

The platform brings together GIS mapping, convoy telemetry, incident management, risk intelligence, route recommendations, ETA analytics, offline field reporting, and role-based access control into a single command interface.

The goal is simple:

Help decision-makers understand what is happening, identify vulnerable corridors, reroute critical supplies, and coordinate field response when normal connectivity and transportation networks are disrupted.

Problem

The North Eastern Region presents a particularly challenging environment for disaster logistics:

Flash floods and monsoon events can disrupt highways and river-basin transport.

Landslides and difficult terrain can isolate mountain corridors and districts.

Strategic road dependencies create bottlenecks for fuel, food, medicines, and other essential supplies.

Intermittent connectivity makes conventional always-online tracking unreliable in remote areas.

Multiple agencies may need to coordinate road clearance, rescue operations, convoy movement, and emergency supplies simultaneously.

A resilient logistics system therefore needs more than a map. It needs a shared operational picture and a coordinated response workflow.

Core Capabilities

1. 🗺️ Live GIS Command Map

A tactical geospatial interface for monitoring roads, hazards, facilities, and convoy activity.

Capabilities include:

Leaflet-based interactive mapping

Satellite, terrain, and operational map views

Convoy and vehicle visualization

Hazard and chokepoint markers

Route polylines and operational overlays

State-level filtering across the NER

2. 🚚 Convoy & Supply Chain Monitoring

Track critical relief movement across vulnerable corridors.

The interface provides visibility into:

Active relief convoys

Fuel and essential-supply movement

Medical logistics

Vehicle status

Checkpoints and route progress

Delivery manifests

Operational delays

Example vehicle states include:

MOVING → IDLING → HALTED → REROUTED

3. 🛣️ Strategic Corridor Monitoring

The system models important transportation lifelines serving the region, including:

Corridor

Strategic Role

NH-29

Dimapur–Kohima–Imphal lifeline

NH-27

Lumding–Haflong–Silchar hill section

NH-10

Sevoke–Teesta–Gangtok axis

NH-13

Trans-Arunachal connectivity

NH-6

Meghalaya–Silchar trunk route

NH-306

Silchar–Vairengte–Aizawl supply line

NH-208

Tripura multi-modal corridor

These corridors can be viewed alongside incidents, vehicle activity, risk indicators, and delivery information.

4. 🧠 Risk Intelligence & Route Recommendations

The platform combines operational and environmental factors to support route decisions.

The risk model considers factors such as:

Rainfall intensity

Terrain and elevation

Historical landslide vulnerability

Road clearance status

Bridge constraints

Corridor disruption

Current operational conditions

When a corridor becomes unavailable or high-risk, the system can surface alternative route recommendations and bypass options.

Important: The current implementation is a command-center prototype. Route and risk outputs should be treated as decision-support information rather than autonomous safety-critical navigation.

5. ⚠️ Incident Management

Incidents follow a structured operational lifecycle:

REPORTED
   ↓
VERIFIED
   ↓
CLEARING IN PROGRESS
   ↓
PILOT ESCORT
   ↓
RESOLVED

The workflow supports:

Road hazard reporting

Incident verification

Clearance tracking

Response-unit coordination

Convoy diversion

Impact-radius assessment

Incident history

6. ⏱️ ETA & Delay Analytics

The dashboard provides operational visibility into delays caused by:

Monsoon conditions

Road restrictions

Checkpoint queues

Single-lane traffic

Hill-road bottlenecks

Corridor disruptions

Historical patterns can be used to identify recurring delay-prone areas.

7. 📱 Offline-First Field Reporting

Remote field teams may operate in areas with unreliable cellular connectivity.

The field-reporting workflow is designed around an offline-first model:

Create an incident while offline.

Store the report locally.

Continue operating without connectivity.

Synchronize when connectivity returns.

The prototype uses browser-side persistence mechanisms such as localStorage / IndexedDB-style queuing.

8. 🔐 Role-Based Access Control

The interface supports six operational personas:

Role

Primary Responsibility

Government Logistics Coordinator

Regional command and rerouting

District Authority

District-level incident and resource management

Field Officer

Field reporting and road-clearance validation

NDRF Commander

Rescue logistics and emergency mobilization

Convoy Pilot / Driver

Route and convoy operations

System Administrator

Access control and audit management

Role-aware navigation and permissions allow the same platform to present different operational views.

9. 🛡️ Audit & Accountability

Critical operational actions can be recorded for traceability, including:

Command decisions

Incident-state changes

Convoy reroutes

Role and permission activity

Administrative actions

This creates an operational history that can support accountability and post-incident review.

10. 🌐 Multilingual Tactical Interface

The platform includes:

English

हिन्दी

Additional interface features include:

Ctrl + K / / command palette

Global search

IST command clock

Connectivity / system heartbeat indicators

High-density operational dashboard layout

System Architecture

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

Technology Stack

Layer

Technology

Purpose

Frontend

React 19.2

Component-based operational interface

Build Tool

Vite 8.2

Development server and production bundling

Styling

Tailwind CSS 4.3

Dashboard styling and responsive UI

GIS

Leaflet 1.9 + React-Leaflet 5

Interactive geospatial visualization

Charts

Recharts 3.10

Analytics and operational visualizations

Routing

React Router DOM 7.18

Application routing and route guards

Icons

Lucide React

Consistent interface iconography

Linting

Oxlint

JavaScript/TypeScript code quality

Project Structure

ner-logistics-command-center/
│
├── public/                         # Static assets
│
├── src/
│   ├── assets/                     # Brand and visual assets
│   │
│   ├── components/                 # Reusable UI components
│   │   ├── alerts/
│   │   ├── analytics/
│   │   ├── common/
│   │   ├── dashboard/
│   │   ├── deliveries/
│   │   ├── eta/
│   │   ├── risk/
│   │   └── routes/
│   │
│   ├── data/                       # Domain and prototype datasets
│   │   ├── mockDashboardData.js
│   │   ├── mapData.js
│   │   ├── nerCorridors.js
│   │   ├── incidentData.js
│   │   ├── riskData.js
│   │   ├── usersRolesData.js
│   │   └── translations/
│   │
│   ├── hooks/                      # Custom React hooks
│   ├── layouts/                    # Application layouts
│   │
│   ├── pages/                      # Operational screens
│   │   ├── Dashboard.jsx
│   │   ├── LiveMap.jsx
│   │   ├── Vehicles.jsx
│   │   ├── VehicleDetails.jsx
│   │   ├── Incidents.jsx
│   │   ├── IncidentDetails.jsx
│   │   ├── RiskIntelligence.jsx
│   │   ├── RouteRecommendations.jsx
│   │   ├── ETADelays.jsx
│   │   ├── Alerts.jsx
│   │   ├── Deliveries.jsx
│   │   ├── FieldReports.jsx
│   │   ├── Analytics.jsx
│   │   ├── UsersRoles.jsx
│   │   ├── AuditLogs.jsx
│   │   └── Login.jsx
│   │
│   ├── services/                   # Application services
│   ├── utils/                      # Shared utility functions
│   ├── App.jsx                     # Application routes/providers
│   └── main.jsx                    # Application entry point
│
├── package.json
├── vite.config.js
└── README.md

Getting Started

Prerequisites

Node.js 18+

npm 9+

Check your versions:

node --version
npm --version

Installation

Clone the repository:

git clone https://github.com/Sumit9711/NER.git
cd NER

Install dependencies:

npm install

Start the development server:

npm run dev

Open the local URL shown in your terminal, typically:

http://localhost:5173

Production Build

Create a production build:

npm run build

Run the linter:

npm run lint

Demo & Role Switching

The prototype includes a role-based login/demo flow.

From the login interface, switch between:

Coordinator

District Authority

Field Officer

NDRF Commander

Convoy Pilot / Driver

System Administrator

Each persona exposes a different operational perspective and permission scope.

Regional Operations

The command interface supports filtering across all eight NER states:

State

Operational Focus

Assam

Gateway and regional logistics

Arunachal Pradesh

Mountain and frontier connectivity

Meghalaya

Hill corridors and supply movement

Manipur

NH-29 / Imphal connectivity

Mizoram

NH-306 supply corridor

Nagaland

Dimapur–Kohima chokepoints

Tripura

Agartala and multimodal connectivity

Sikkim

Teesta–Gangtok corridor

Roadmap

The following capabilities are planned for future iterations:

NavIC / IRNSS integration for Indian satellite navigation

LoRaWAN / VHF mesh fallback for communication during cellular outages

Drone / LiDAR terrain feeds for slope and terrain monitoring

Automated bilingual SMS / IVR alerts for affected drivers and field teams

Real-time external data integrations

Production-grade authentication and authorization

Persistent backend services and operational databases

Advanced predictive risk and route models

Project Status

Current stage: Prototype / SIH demonstration platform

The repository currently focuses on demonstrating the operational workflow, user experience, GIS visualization, role-based views, risk intelligence concepts, and disaster-logistics coordination model.

Some live integrations, predictive models, external data feeds, and production infrastructure are roadmap items rather than assumptions about the current prototype.

Smart India Hackathon Context

Project: SIH-NER — North Eastern Region Logistics & Accessibility Intelligence Command Center

Category: Disaster Management & Logistics Accessibility Intelligence

Target Geography: North Eastern Region, India

Nodal Ministry / Council: Ministry of Development of North Eastern Region (MDoNER) / North Eastern Council (NEC)

Repository: https://github.com/Sumit9711/NER

License

This project is licensed under the MIT License. See LICENSE for details.

<div align="center">

Built for resilient logistics, faster response, and better connectivity across the North Eastern Region of India.

</div>
