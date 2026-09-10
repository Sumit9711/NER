// Mock command center dashboard datasets for NER Logistics Intelligence

export const DASHBOARD_KPIS = [
  {
    id: 'kpi-vehicles',
    title: 'Active Vehicles',
    value: '42',
    subtext: '5 currently moving',
    badgeText: '5 MOVING',
    badgeType: 'blue',
    trend: '+4 vs morning',
    iconName: 'Truck',
    accentColor: 'blue'
  },
  {
    id: 'kpi-incidents',
    title: 'Active Incidents',
    value: '12',
    subtext: '3 Critical',
    badgeText: '3 CRITICAL',
    badgeType: 'red',
    trend: '+1 new report',
    iconName: 'AlertOctagon',
    accentColor: 'red'
  },
  {
    id: 'kpi-risk-routes',
    title: 'High-Risk Routes',
    value: '7',
    subtext: '2 Critical',
    badgeText: '2 CRITICAL',
    badgeType: 'red',
    trend: 'NH-29 & NH-10',
    iconName: 'Route',
    accentColor: 'red'
  },
  {
    id: 'kpi-deliveries',
    title: 'Deliveries In Transit',
    value: '28',
    subtext: '6 Delayed',
    badgeText: '6 DELAYED',
    badgeType: 'amber',
    trend: '22 On Schedule',
    iconName: 'PackageCheck',
    accentColor: 'amber'
  },
  {
    id: 'kpi-alerts',
    title: 'Critical Alerts',
    value: '4',
    subtext: 'Requires Attention',
    badgeText: 'ATTENTION',
    badgeType: 'red',
    trend: 'Immediate Action',
    iconName: 'BellRing',
    accentColor: 'red'
  },
  {
    id: 'kpi-delays',
    title: 'Average Delay',
    value: '+42 min',
    subtext: 'Across NER hill corridors',
    badgeText: 'MONSOON IMPACT',
    badgeType: 'amber',
    trend: '+12m vs dry season',
    iconName: 'ClockAlert',
    accentColor: 'amber'
  }
];

import { MAP_VEHICLES } from './mapData';

export const VEHICLE_ACTIVITY = MAP_VEHICLES;
export const ACTIVE_CONVOYS = MAP_VEHICLES;


export const CRITICAL_ALERTS = [
  {
    id: 'ALT-401',
    title: 'Chumukedima Dual Lane Blockage on NH-29',
    severity: 'CRITICAL',
    category: 'LANDSLIDE',
    state: 'Nagaland',
    corridor: 'NH-29',
    timestamp: '12 mins ago',
    detail: 'Over 450 cubic meters of rock and clay slurry blocked both lanes at Mile 14. BRO Project Sewak heavy dozers active. 14 convoys halted.',
    description: 'Over 450 cubic meters of rock and clay slurry blocked both lanes at Mile 14. BRO Project Sewak heavy dozers active. 14 convoys halted.',
    action: 'Reroute active traffic via Medziphema-Niuland-Kohima bypass.',
    actionRequired: 'Reroute active traffic via Medziphema-Niuland-Kohima bypass.'
  },
  {
    id: 'ALT-402',
    title: 'Teesta River Flash Surge at 29th Mile',
    severity: 'CRITICAL',
    category: 'FLASH FLOOD',
    state: 'Sikkim',
    corridor: 'NH-10',
    timestamp: '25 mins ago',
    detail: 'River swelling submerged road surface by 0.8m. Pavement undermining detected. Heavy freight and multi-axle trailers barred.',
    description: 'River swelling submerged road surface by 0.8m. Pavement undermining detected. Heavy freight and multi-axle trailers barred.',
    action: 'Divert priority convoys via Lava-Algarah-Reshi pass.',
    actionRequired: 'Divert priority convoys via Lava-Algarah-Reshi pass.'
  },
  {
    id: 'ALT-403',
    title: 'Jatinga Mudslide Single-Lane Bottleneck',
    severity: 'HIGH',
    category: 'MUDSLIDE',
    state: 'Assam',
    corridor: 'NH-27',
    timestamp: '40 mins ago',
    detail: 'Continuous hillside slurry restricting transit to one-way alternating traffic. Current delay queuing exceeds 90 minutes.',
    description: 'Continuous hillside slurry restricting transit to one-way alternating traffic. Current delay queuing exceeds 90 minutes.',
    action: 'Pilot escort convoy batches of 10 vehicles at 20-minute intervals.',
    actionRequired: 'Pilot escort convoy batches of 10 vehicles at 20-minute intervals.'
  },
  {
    id: 'ALT-404',
    title: 'Severe Rainfall Saturation in Cherrapunji Belt',
    severity: 'HIGH',
    category: 'PRECIPITATION',
    state: 'Meghalaya',
    corridor: 'NH-6',
    timestamp: '1 hour ago',
    detail: 'Rainfall rate reaching 112 mm/hr. Dense hill fog causing near-zero visibility between Mawryngkneng and Jowai.',
    description: 'Rainfall rate reaching 112 mm/hr. Dense hill fog causing near-zero visibility between Mawryngkneng and Jowai.',
    action: 'Enforce maximum speed limit 30 km/h with hazard lights on.',
    actionRequired: 'Enforce maximum speed limit 30 km/h with hazard lights on.'
  }
];

// Alias for backwards compatibility with earlier shell pages
export const RECENT_EMERGENCY_ALERTS = CRITICAL_ALERTS;

export const RECENT_INCIDENTS = [
  {
    id: 'INC-881',
    title: 'Major Rockslide at Chumukedima Mile 14',
    corridor: 'NH-29',
    type: 'Rockfall / Landslide',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    reported: 'Today 10:14 IST',
    clearanceETA: 'Today 18:30 IST',
    state: 'Nagaland',
    progress: 60,
    equipment: '3 BRO Track Excavators + 4 Dumpers'
  },
  {
    id: 'INC-880',
    title: 'Teesta River Submergence & Shoulder Scour',
    corridor: 'NH-10',
    type: 'Flash Flood / Erosion',
    severity: 'CRITICAL',
    status: 'MONITORING',
    reported: 'Today 09:30 IST',
    clearanceETA: 'Awaiting River Receding',
    state: 'Sikkim / WB',
    progress: 25,
    equipment: 'SDRF River Patrol + PWD Inspection Unit'
  },
  {
    id: 'INC-879',
    title: 'Jatinga Valley Debris Spill',
    corridor: 'NH-27',
    type: 'Mudslide',
    severity: 'HIGH',
    status: 'CLEARING',
    reported: 'Today 08:45 IST',
    clearanceETA: 'Today 16:00 IST',
    state: 'Assam',
    progress: 75,
    equipment: 'NHAI Quick Response Dozers'
  },
  {
    id: 'INC-878',
    title: 'Sonapur Tunnel Runoff Silt',
    corridor: 'NH-6',
    type: 'Mud Accumulation',
    severity: 'MODERATE',
    status: 'PASSABLE',
    reported: 'Today 07:15 IST',
    clearanceETA: 'Cleared (Monitoring)',
    state: 'Meghalaya',
    progress: 95,
    equipment: 'Jaintia Hills Road Maintenance Squad'
  }
];

export const HIGH_RISK_CORRIDORS = [
  {
    id: 'CORR-01',
    code: 'NH-29',
    name: 'Dimapur - Kohima - Imphal Lifeline',
    states: 'Nagaland, Manipur',
    hazard: 'Critical Rockslide',
    status: 'BLOCKED',
    riskLevel: 'CRITICAL',
    delay: '+280 min',
    activeConvoys: 14,
    detour: 'Medziphema Bypass -> Niuland -> Kohima East'
  },
  {
    id: 'CORR-02',
    code: 'NH-10',
    name: 'Sevoke - Teesta - Gangtok Lifeline',
    states: 'Sikkim, WB',
    hazard: 'River Surge & Road Sinking',
    status: 'BLOCKED',
    riskLevel: 'CRITICAL',
    delay: '+160 min',
    activeConvoys: 9,
    detour: 'Lava - Algarah - Reshi Alternate'
  },
  {
    id: 'CORR-03',
    code: 'NH-27',
    name: 'Lumding - Haflong - Silchar Corridor',
    states: 'Assam',
    hazard: 'Hillside Mud Slurry',
    status: 'DELAYED',
    riskLevel: 'HIGH',
    delay: '+90 min',
    activeConvoys: 22,
    detour: 'Single-Lane Escort Batches'
  },
  {
    id: 'CORR-04',
    code: 'NH-6',
    name: 'Jorabat - Shillong - Jowai Trunk',
    states: 'Meghalaya, Assam',
    hazard: 'Heavy Rain Fog & Silt',
    status: 'OPERATIONAL',
    riskLevel: 'MODERATE',
    delay: '+20 min',
    activeConvoys: 28,
    detour: 'Primary Axis Clear'
  },
  {
    id: 'CORR-05',
    code: 'NH-306',
    name: 'Silchar - Vairengte - Aizawl',
    states: 'Assam, Mizoram',
    hazard: 'Border Weight Checkpoint Queue',
    status: 'DELAYED',
    riskLevel: 'MODERATE',
    delay: '+75 min',
    activeConvoys: 16,
    detour: 'Express Green Lane for Medicals'
  }
];

export const WEATHER_CONDITIONS = [
  {
    station: 'Guwahati / Brahmaputra Basin',
    state: 'Assam',
    region: 'Brahmaputra Valley (Assam)',
    temp: '28°C',
    condition: 'Thunderstorms & Heavy Rain',
    rainfallMm: '42 mm/hr',
    visibility: '3.2 km',
    wind: '18 km/h NE',
    risk: 'MODERATE',
    riskLevel: 'Medium',
    slopeStability: '84% (Stable)',
    vulnerableBridges: 2
  },
  {
    station: 'Kohima / Naga Hills',
    state: 'Nagaland',
    region: 'Patkai & Naga Hills (NL / MN)',
    temp: '19°C',
    condition: 'Torrential Downpour & Cloudburst',
    rainfallMm: '98 mm/hr',
    visibility: '450 m (Dense Fog)',
    wind: '24 km/h E',
    risk: 'CRITICAL',
    riskLevel: 'Critical',
    slopeStability: '46% (Hazardous)',
    vulnerableBridges: 6
  },
  {
    station: 'Teesta Gorge / Sevoke',
    state: 'Sikkim Border',
    region: 'Teesta Gorge Corridor (SK)',
    temp: '22°C',
    condition: 'Monsoon Deluge & River Spate',
    rainfallMm: '85 mm/hr',
    visibility: '800 m',
    wind: '22 km/h SE',
    risk: 'CRITICAL',
    riskLevel: 'High',
    slopeStability: '52% (Erosion Risk)',
    vulnerableBridges: 4
  },
  {
    station: 'Shillong / Cherrapunji',
    state: 'Meghalaya',
    region: 'Shillong Plateau (Meghalaya)',
    temp: '17°C',
    condition: 'Extreme Precipitation & Hill Fog',
    rainfallMm: '112 mm/hr',
    visibility: '300 m (Extreme Caution)',
    wind: '32 km/h S',
    risk: 'HIGH',
    riskLevel: 'High',
    slopeStability: '61% (Caution)',
    vulnerableBridges: 3
  },
  {
    station: 'Imphal Valley',
    state: 'Manipur',
    region: 'Manipur River Valley',
    temp: '24°C',
    condition: 'Intermittent Showers',
    rainfallMm: '28 mm/hr',
    visibility: '5.0 km',
    wind: '12 km/h NE',
    risk: 'MODERATE',
    riskLevel: 'Medium',
    slopeStability: '78% (Stable)',
    vulnerableBridges: 2
  },
  {
    station: 'Aizawl Ridge',
    state: 'Mizoram',
    region: 'Lushai Hills Axis',
    temp: '21°C',
    condition: 'Overcast & Moderate Drizzle',
    rainfallMm: '35 mm/hr',
    visibility: '2.8 km',
    wind: '14 km/h SE',
    risk: 'MODERATE',
    riskLevel: 'Medium',
    slopeStability: '74% (Caution)',
    vulnerableBridges: 3
  },
  {
    station: 'Itanagar / Kameng Foothills',
    state: 'Arunachal Pradesh',
    region: 'Kameng & Tawang Valleys (AR)',
    temp: '23°C',
    condition: 'Scattered Showers',
    rainfallMm: '22 mm/hr',
    visibility: '6.5 km',
    wind: '10 km/h N',
    risk: 'LOW',
    riskLevel: 'Low',
    slopeStability: '91% (Passable)',
    vulnerableBridges: 1
  },
  {
    station: 'Agartala Plains',
    state: 'Tripura',
    region: 'Tripura South Corridor',
    temp: '29°C',
    condition: 'Partly Cloudy & Humid',
    rainfallMm: '12 mm/hr',
    visibility: '8.0 km',
    wind: '8 km/h S',
    risk: 'LOW',
    riskLevel: 'Low',
    slopeStability: '95% (Stable)',
    vulnerableBridges: 1
  }
];

// Alias for backwards compatibility with earlier WeatherRiskPanel
export const TERRAIN_WEATHER_RADAR = WEATHER_CONDITIONS;
