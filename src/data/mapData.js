// Geospatial and Telemetry Map Data for North Eastern Region (NER)

export const MAP_CENTER = [25.8, 92.8]; // Central NER focus
export const MAP_DEFAULT_ZOOM = 7;

export const NER_DISTRICTS = [
  'All Districts',
  'Kamrup Metro (Guwahati)',
  'Kohima (Nagaland)',
  'East Khasi Hills (Shillong)',
  'Imphal West (Manipur)',
  'Aizawl (Mizoram)',
  'Dima Hasao (Haflong)',
  'East Sikkim (Gangtok)',
  'Papum Pare (Itanagar)',
  'West Tripura (Agartala)',
  'Cachar (Silchar)'
];

export const COMMODITY_CATEGORIES = [
  'All Commodities',
  'Emergency Medical & Vaccines',
  'Cryogenic Liquid Oxygen',
  'Food Grains & Rations (FCI)',
  'Disaster Shelter & Relief Kits',
  'Petroleum, Oil & Power (POL)',
  'Bailey Bridge Pre-Fab Steel'
];

export const HUB_CITIES = [
  { id: 'HUB-GHY', name: 'Guwahati', state: 'Assam', district: 'Kamrup Metro (Guwahati)', coords: [26.1445, 91.7362], role: 'Central Supply Depot' },
  { id: 'HUB-SHL', name: 'Shillong', state: 'Meghalaya', district: 'East Khasi Hills (Shillong)', coords: [25.5788, 91.8933], role: 'Regional Command Center' },
  { id: 'HUB-IMP', name: 'Imphal', state: 'Manipur', district: 'Imphal West (Manipur)', coords: [24.8170, 93.9368], role: 'State Distribution Base' },
  { id: 'HUB-AIZ', name: 'Aizawl', state: 'Mizoram', district: 'Aizawl (Mizoram)', coords: [23.7271, 92.7176], role: 'State Relief Depot' },
  { id: 'HUB-AGT', name: 'Agartala', state: 'Tripura', district: 'West Tripura (Agartala)', coords: [23.8315, 91.2868], role: 'Logistics Port Terminal' },
  { id: 'HUB-KOH', name: 'Kohima', state: 'Nagaland', district: 'Kohima (Nagaland)', coords: [25.6751, 94.1086], role: 'Emergency Field Base' },
  { id: 'HUB-GTK', name: 'Gangtok', state: 'Sikkim', district: 'East Sikkim (Gangtok)', coords: [27.3389, 88.6065], role: 'High-Altitude Relief Hub' },
  { id: 'HUB-ITA', name: 'Itanagar', state: 'Arunachal Pradesh', district: 'Papum Pare (Itanagar)', coords: [27.0844, 93.6053], role: 'Frontier Supply Center' },
  { id: 'HUB-DMP', name: 'Dimapur', state: 'Nagaland', district: 'Kohima (Nagaland)', coords: [25.9090, 93.7266], role: 'Railhead Transshipment Base' },
  { id: 'HUB-SLC', name: 'Silchar', state: 'Assam', district: 'Cachar (Silchar)', coords: [24.8333, 92.7789], role: 'Barak Valley Arterial Hub' }
];

export const MAP_VEHICLES = [
  {
    id: 'MED-07',
    name: 'Medical Logistics Convoy 07',
    driver: 'Havildar P. Angami',
    organization: 'NDRF 1st Battalion (Guwahati)',
    commodity: 'Emergency Medical Kits & Insulin',
    commodityCategory: 'Emergency Medical & Vaccines',
    weight: '14 MT',
    origin: 'Guwahati Depot (Assam)',
    destination: 'Kohima Base Hospital (Nagaland)',
    district: 'Kohima (Nagaland)',
    currentLocation: 'Medziphema Bypass Mile 8',
    coords: [25.7200, 94.0100],
    speedKmH: 38,
    speed: '38 km/h',
    status: 'MOVING',
    eta: 'Today 17:45 IST',
    delay: '+35 min',
    routeRisk: 'CRITICAL',
    corridor: 'NH-29',
    lastUpdated: '1 min ago',
    progressPct: 68,
    progress: 68,
    vehiclesCount: 3,
    alert: 'Executing Medziphema Bypass diversion around Chumukedima landslide',
    anomaly: {
      detected: true,
      title: 'Unexpected prolonged stop',
      duration: '48 mins duration',
      severity: 'CRITICAL',
      location: 'Medziphema Bypass Mile 8.4',
      reason: 'Zero velocity registered outside designated staging point. Fuel or gradient slippage suspected.',
      governanceNotice: 'Decision Support Only: Automated dispatch prohibited under Protocol NEC-2026. Radio confirmation required before deploying field escorts.'
    },
    trajectory: [
      [26.1445, 91.7362], // Guwahati
      [26.0910, 91.8750], // Jorabat
      [26.3452, 92.6840], // Nagaon
      [25.9090, 93.7266], // Dimapur
      [25.8600, 93.7500],
      [25.7200, 94.0100], // Current (Medziphema bypass)
      [25.6751, 94.1086]  // Kohima
    ],
    timeline: [
      { time: '06:30 IST', title: 'Started Journey', description: 'Depot departure cleared at Guwahati Medical Supply Hub', type: 'start' },
      { time: '11:15 IST', title: 'Entered High-Risk Corridor', description: 'Crossed Dimapur gate into NH-29 Naga Hills sector', type: 'risk' },
      { time: '13:40 IST', title: 'Speed Reduced', description: 'Decelerated to 18 km/h due to muddy hairpin curves and rain', type: 'speed' },
      { time: '14:05 IST', title: 'Risk Updated', description: 'Corridor elevated to CRITICAL after Chumukedima rockslide', type: 'alert' },
      { time: '14:20 IST', title: 'Reroute Engaged', description: 'Detour active via Medziphema-Niuland loop', type: 'reroute' }
    ]
  },
  {
    id: 'FOOD-12',
    name: 'FCI Essential Grain Fleet 12',
    driver: 'Rajen Das (Govt Pilot 02)',
    organization: 'Food Corporation of India (FCI Logistics)',
    commodity: 'Fortified Rice & Baby Formula',
    commodityCategory: 'Food Grains & Rations (FCI)',
    weight: '45 MT',
    origin: 'Lumding Railhead (Assam)',
    destination: 'Silchar Central Godown (Assam)',
    district: 'Dima Hasao (Haflong)',
    currentLocation: 'Haflong Hill Section Mile 22',
    coords: [25.5200, 93.1100],
    speedKmH: 28,
    speed: '28 km/h',
    status: 'MOVING',
    eta: 'Today 18:30 IST',
    delay: '+90 min',
    routeRisk: 'HIGH',
    corridor: 'NH-27',
    lastUpdated: '2 mins ago',
    progressPct: 54,
    progress: 54,
    vehiclesCount: 6,
    alert: 'Cautious hill descent in Dima Hasao rain sector',
    anomaly: {
      detected: false
    },
    trajectory: [
      [25.7500, 93.1700], // Lumding
      [25.5200, 93.1100], // Current
      [25.1700, 93.0200], // Haflong
      [24.8333, 92.7789]  // Silchar
    ],
    timeline: [
      { time: '08:00 IST', title: 'Started Journey', description: 'Loaded from FCI Lumding Silo Rake', type: 'start' },
      { time: '10:45 IST', title: 'Entered High-Risk Corridor', description: 'Entered Jatinga hill section under rain advisory', type: 'risk' },
      { time: '12:20 IST', title: 'Speed Reduced', description: 'Speed capped at 25 km/h for heavy multi-axle freight', type: 'speed' },
      { time: '13:00 IST', title: 'Risk Updated', description: 'Mudslide caution elevated by Dima Hasao Disaster Cell', type: 'alert' }
    ]
  },
  {
    id: 'RELIEF-21',
    name: 'Disaster Shelter Convoy 21',
    driver: 'Capt. S. Bhatia (BRO)',
    organization: 'Border Roads Organisation (Project Sewak)',
    commodity: 'Water Purifiers, Tarpaulins & Tents',
    commodityCategory: 'Disaster Shelter & Relief Kits',
    weight: '32 MT',
    origin: 'Jorhat SDRF Base (Assam)',
    destination: 'Chumukedima Disaster Sector (Nagaland)',
    district: 'Kohima (Nagaland)',
    currentLocation: 'Dimapur Staging Post',
    coords: [25.8800, 93.7400],
    speedKmH: 0,
    speed: '0 km/h (Holding)',
    status: 'STATIONARY',
    eta: 'Holding for Clearance',
    delay: '+120 min',
    routeRisk: 'CRITICAL',
    corridor: 'NH-29',
    lastUpdated: 'Just now',
    progressPct: 35,
    progress: 35,
    vehiclesCount: 4,
    alert: 'Holding at Dimapur Staging Post pending dozer debris clearance',
    anomaly: {
      detected: true,
      title: 'Unexpected prolonged stop',
      duration: '115 mins holding',
      severity: 'CRITICAL',
      location: 'Dimapur Staging Post Gate 2',
      reason: 'Holding pattern exceeded 90 min threshold due to NH-29 chokepoint.',
      governanceNotice: 'Decision Support Only: Automated release prohibited. Awaiting Project Sewak Officer clearance.'
    },
    trajectory: [
      [26.7500, 94.2200], // Jorabat/Jorhat
      [25.8800, 93.7400], // Dimapur (Current)
      [25.8112, 93.7842]  // Chumukedima
    ],
    timeline: [
      { time: '07:30 IST', title: 'Started Journey', description: 'Dispatched from Jorhat Disaster Relief Reserve', type: 'start' },
      { time: '11:00 IST', title: 'Entered High-Risk Corridor', description: 'Reached Dimapur border corridor', type: 'risk' },
      { time: '11:45 IST', title: 'Speed Reduced', description: 'Halted completely by highway traffic control', type: 'speed' },
      { time: '12:00 IST', title: 'Risk Updated', description: 'NH-29 declared BLOCKED by Nagaland Police', type: 'alert' }
    ]
  },
  {
    id: 'MED-14',
    name: 'Cryogenic Oxygen Carrier 14',
    driver: 'N. Tomba Singh',
    organization: 'Assam & Manipur Health Logistics Cell',
    commodity: 'Liquid Medical Oxygen (Cryogenic)',
    commodityCategory: 'Cryogenic Liquid Oxygen',
    weight: '22 MT',
    origin: 'Bongaigaon Plant (Assam)',
    destination: 'Imphal RIMS Hospital (Manipur)',
    district: 'Imphal West (Manipur)',
    currentLocation: 'Maram Pass (Manipur Border)',
    coords: [25.1500, 93.9800],
    speedKmH: 34,
    speed: '34 km/h',
    status: 'MOVING',
    eta: 'Today 20:15 IST',
    delay: '+40 min',
    routeRisk: 'HIGH',
    corridor: 'NH-29 South',
    lastUpdated: '3 mins ago',
    progressPct: 72,
    progress: 72,
    vehiclesCount: 2,
    alert: 'State armed police pilot escort accompanying vehicle',
    anomaly: {
      detected: false
    },
    trajectory: [
      [26.5000, 90.5500], // Bongaigaon
      [26.1445, 91.7362], // Guwahati
      [25.6751, 94.1086], // Kohima
      [25.1500, 93.9800], // Maram Pass (Current)
      [24.8170, 93.9368]  // Imphal
    ],
    timeline: [
      { time: '05:00 IST', title: 'Started Journey', description: 'Cryogenic pressure sealed at Bongaigaon refinery', type: 'start' },
      { time: '13:30 IST', title: 'Entered High-Risk Corridor', description: 'Crossed Mao gate into Manipur mountain sector', type: 'risk' },
      { time: '14:45 IST', title: 'Speed Reduced', description: 'Descending winding slopes at 30 km/h with armed pilot escort', type: 'speed' },
      { time: '15:10 IST', title: 'Risk Updated', description: 'Manipur Highway Police reporting clear transit window', type: 'alert' }
    ]
  },
  {
    id: 'SUPPLY-08',
    name: 'Energy & Fuel Fleet 08',
    driver: 'E. Khongwir',
    organization: 'Indian Oil Corporation Ltd (IOCL)',
    commodity: 'High-Octane Fuel & Mobile DG Sets',
    commodityCategory: 'Petroleum, Oil & Power (POL)',
    weight: '60 MT',
    origin: 'Guwahati Oil Terminal (Assam)',
    destination: 'Shillong Electric Reserve (Meghalaya)',
    district: 'East Khasi Hills (Shillong)',
    currentLocation: 'Barapani Lake Bridge',
    coords: [25.7500, 91.8800],
    speedKmH: 45,
    speed: '45 km/h',
    status: 'MOVING',
    eta: 'Today 15:30 IST',
    delay: 'On Schedule',
    routeRisk: 'MODERATE',
    corridor: 'NH-6',
    lastUpdated: 'Just now',
    progressPct: 88,
    progress: 88,
    vehiclesCount: 5,
    alert: 'Clear passage along Jorabat-Barapani 4-lane stretch',
    anomaly: {
      detected: false
    },
    trajectory: [
      [26.1445, 91.7362], // Guwahati
      [26.0910, 91.8750], // Jorabat
      [25.7500, 91.8800], // Barapani (Current)
      [25.5788, 91.8933]  // Shillong
    ],
    timeline: [
      { time: '11:00 IST', title: 'Started Journey', description: 'Dispatched from IOCL Betkuchi terminal', type: 'start' },
      { time: '12:15 IST', title: 'Entered High-Risk Corridor', description: 'Commenced Meghalaya plateau ascent', type: 'risk' },
      { time: '13:00 IST', title: 'Speed Reduced', description: 'Minor speed reduction through Jorabat ghat sections', type: 'speed' },
      { time: '13:45 IST', title: 'Risk Updated', description: 'Meghalaya PWD green corridor active', type: 'alert' }
    ]
  },
  {
    id: 'BRIDGE-03',
    name: 'Bailey Bridge Heavy Transport 03',
    driver: 'Subedar M. Thapa (BRO)',
    organization: 'Border Roads Organisation (Project Swastik)',
    commodity: 'Bailey Bridge Replacement Pre-Fab Steel',
    commodityCategory: 'Bailey Bridge Pre-Fab Steel',
    weight: '50 MT',
    origin: 'Siliguri Depot (West Bengal)',
    destination: 'Mangan Hill Hub (Sikkim)',
    district: 'East Sikkim (Gangtok)',
    currentLocation: 'Sevoke Railway Overbridge',
    coords: [26.8850, 88.4730],
    speedKmH: 0,
    speed: '0 km/h (Holding)',
    status: 'DELAYED',
    eta: 'Tomorrow 09:00 IST',
    delay: '+160 min',
    routeRisk: 'CRITICAL',
    corridor: 'NH-10',
    lastUpdated: '4 mins ago',
    progressPct: 24,
    progress: 24,
    vehiclesCount: 2,
    alert: 'Holding due to Teesta river road subsidence at 29th Mile',
    anomaly: {
      detected: true,
      title: 'Unexpected prolonged stop',
      duration: '85 mins stopped',
      severity: 'CRITICAL',
      location: 'Sevoke Railway Overbridge Staging',
      reason: 'Multi-axle vehicle prohibited from entering inundated Teesta section.',
      governanceNotice: 'Decision Support Only: Awaiting BRO clearance report for alternate Lava-Algarah pass.'
    },
    trajectory: [
      [26.7271, 88.3953], // Siliguri
      [26.8850, 88.4730], // Sevoke (Current)
      [27.3389, 88.6065]  // Gangtok / Mangan
    ],
    timeline: [
      { time: '09:00 IST', title: 'Started Journey', description: 'Departed Siliguri Army base', type: 'start' },
      { time: '10:15 IST', title: 'Entered High-Risk Corridor', description: 'Entered Teesta Gorge foothills', type: 'risk' },
      { time: '11:00 IST', title: 'Speed Reduced', description: 'Stopped at Sevoke gate by Sikkim Police', type: 'speed' },
      { time: '11:15 IST', title: 'Risk Updated', description: 'Teesta flash surge elevated to CRITICAL', type: 'alert' }
    ]
  }
];

export const MAP_INCIDENTS = [
  {
    id: 'INC-101',
    title: 'Chumukedima Major Rockslide',
    corridor: 'NH-29',
    coords: [25.8112, 93.7842],
    severity: 'CRITICAL',
    type: 'Landslide / Rockfall',
    impact: 'Dual lanes blocked completely. Over 450 m³ debris. BRO Sewak excavators active.',
    clearanceETA: 'Today 18:30 IST',
    state: 'Nagaland',
    district: 'Kohima (Nagaland)',
    recommendedDetour: 'Medziphema Bypass -> Niuland -> Kohima East'
  },
  {
    id: 'INC-102',
    title: 'Teesta River Surge & 29th Mile Sinking',
    corridor: 'NH-10',
    coords: [27.0543, 88.4611],
    severity: 'CRITICAL',
    type: 'Flash Flood & Road Collapse',
    impact: 'Water submergence 0.8m over roadway. Multi-axle freight barred.',
    clearanceETA: 'Under Assessment',
    state: 'Sikkim / WB Border',
    district: 'East Sikkim (Gangtok)',
    recommendedDetour: 'Lava - Algarah - Reshi Alternate Route'
  },
  {
    id: 'INC-103',
    title: 'Jatinga Mudslide Debris',
    corridor: 'NH-27',
    coords: [25.1245, 92.9912],
    severity: 'HIGH',
    type: 'Mudslide',
    impact: 'Single lane alternating traffic. 90-minute holding delays.',
    clearanceETA: 'Today 16:00 IST',
    state: 'Assam',
    district: 'Dima Hasao (Haflong)',
    recommendedDetour: 'Regulated convoy batches with pilot escort'
  },
  {
    id: 'INC-104',
    title: 'Sonapur Tunnel Silt Runoff',
    corridor: 'NH-6',
    coords: [25.1012, 92.3521],
    severity: 'MODERATE',
    type: 'Mud Accumulation',
    impact: 'Low visibility and slick pavement. Convoys restricted to 20 km/h.',
    clearanceETA: 'Continual Clearance',
    state: 'Meghalaya',
    district: 'East Khasi Hills (Shillong)',
    recommendedDetour: 'Maintain low gear through tunnel pass'
  }
];

export const MAP_RISK_ZONES = [
  {
    id: 'ZONE-01',
    name: 'Patkai & Naga Hills High-Risk Belt',
    center: [25.75, 93.95],
    radius: 38000,
    hazardLevel: 'CRITICAL',
    color: '#ef4444',
    fillColor: '#b91c1c',
    rainfall: '98 mm/hr',
    district: 'Kohima (Nagaland)',
    description: 'Active mudslide zone with multiple hill collapses along NH-29'
  },
  {
    id: 'ZONE-02',
    name: 'Teesta River Basin & Gorge Section',
    center: [27.08, 88.48],
    radius: 28000,
    hazardLevel: 'CRITICAL',
    color: '#ef4444',
    fillColor: '#b91c1c',
    rainfall: '85 mm/hr',
    district: 'East Sikkim (Gangtok)',
    description: 'River bank erosion and flash flood alert along NH-10'
  },
  {
    id: 'ZONE-03',
    name: 'Dima Hasao Hill Slopes',
    center: [25.15, 93.05],
    radius: 32000,
    hazardLevel: 'HIGH',
    color: '#f97316',
    fillColor: '#c2410c',
    rainfall: '74 mm/hr',
    district: 'Dima Hasao (Haflong)',
    description: 'Soil saturation exceeding 82% threshold in Jatinga valley'
  },
  {
    id: 'ZONE-04',
    name: 'Cherrapunji - Mawsynram Heavy Rain Front',
    center: [25.35, 91.75],
    radius: 26000,
    hazardLevel: 'MODERATE',
    color: '#eab308',
    fillColor: '#a16207',
    rainfall: '112 mm/hr',
    district: 'East Khasi Hills (Shillong)',
    description: 'Intense precipitation causing hill fog and localized ponding'
  }
];

export const MAP_ROUTES = [
  {
    id: 'ROUTE-NH29',
    code: 'NH-29',
    name: 'NH-29 Lifeline (Dimapur - Kohima - Imphal)',
    status: 'BLOCKED',
    riskLevel: 'CRITICAL',
    coords: [
      [25.9090, 93.7266],
      [25.8600, 93.7500],
      [25.8112, 93.7842],
      [25.7500, 93.8800],
      [25.6751, 94.1086],
      [25.4020, 94.0500],
      [24.8170, 93.9368]
    ],
    color: '#ef4444',
    dashArray: '8, 8'
  },
  {
    id: 'ROUTE-NH27',
    code: 'NH-27',
    name: 'NH-27 Arterial (Guwahati - Haflong - Silchar)',
    status: 'DELAYED',
    riskLevel: 'HIGH',
    coords: [
      [26.1445, 91.7362],
      [26.3452, 92.6840],
      [25.7500, 93.1700],
      [25.1700, 93.0200],
      [24.8333, 92.7789]
    ],
    color: '#f59e0b',
    dashArray: '4, 4'
  },
  {
    id: 'ROUTE-NH6',
    code: 'NH-6',
    name: 'NH-6 Trunk (Guwahati - Shillong - Silchar)',
    status: 'OPERATIONAL',
    riskLevel: 'MODERATE',
    coords: [
      [26.1445, 91.7362],
      [26.0910, 91.8750],
      [25.5788, 91.8933],
      [25.4500, 92.2000],
      [25.0100, 92.4200],
      [24.8333, 92.7789]
    ],
    color: '#10b981',
    dashArray: null
  },
  {
    id: 'ROUTE-NH10',
    code: 'NH-10',
    name: 'NH-10 (Siliguri - Teesta - Gangtok)',
    status: 'BLOCKED',
    riskLevel: 'CRITICAL',
    coords: [
      [26.7271, 88.3953],
      [26.8850, 88.4730],
      [27.0543, 88.4611],
      [27.1770, 88.5300],
      [27.3389, 88.6065]
    ],
    color: '#ef4444',
    dashArray: '8, 8'
  },
  {
    id: 'ROUTE-NH13',
    code: 'NH-13',
    name: 'NH-13 Trans-Arunachal Axis',
    status: 'OPERATIONAL',
    riskLevel: 'LOW',
    coords: [
      [26.1445, 91.7362],
      [26.6528, 92.7926],
      [27.0800, 93.8100],
      [27.0844, 93.6053]
    ],
    color: '#10b981',
    dashArray: null
  },
  {
    id: 'ROUTE-NH306',
    code: 'NH-306',
    name: 'NH-306 (Silchar - Aizawl Lifeline)',
    status: 'OPERATIONAL',
    riskLevel: 'MODERATE',
    coords: [
      [24.8333, 92.7789],
      [24.5100, 92.7600],
      [24.2200, 92.6800],
      [23.7271, 92.7176]
    ],
    color: '#10b981',
    dashArray: null
  }
];

export const RECOMMENDED_ROUTES = [
  {
    id: 'REC-01',
    name: 'Medziphema - Niuland - Kohima East Bypass',
    forCorridor: 'NH-29',
    riskLevel: 'MODERATE',
    status: 'RECOMMENDED',
    color: '#06b6d4', // Cyan
    dashArray: '6, 6',
    distanceKm: 48,
    delayAdded: '+35 min',
    maxLoadLimit: '24 MT',
    coords: [
      [25.8600, 93.7500],
      [25.8800, 93.8200],
      [25.8400, 93.9200],
      [25.7200, 94.0200],
      [25.6751, 94.1086]
    ]
  },
  {
    id: 'REC-02',
    name: 'Lava - Algarah - Reshi Alternate Pass',
    forCorridor: 'NH-10',
    riskLevel: 'HIGH',
    status: 'RECOMMENDED',
    color: '#a855f7', // Purple
    dashArray: '6, 6',
    distanceKm: 76,
    delayAdded: '+80 min',
    maxLoadLimit: '18 MT',
    coords: [
      [26.8850, 88.4730],
      [27.0800, 88.6500],
      [27.1200, 88.6000],
      [27.2000, 88.5500],
      [27.3389, 88.6065]
    ]
  }
];

export const BLOCKED_ROAD_SEGMENTS = [
  {
    id: 'BLK-01',
    title: 'NH-29 Chumukedima Blockade',
    corridor: 'NH-29',
    state: 'Nagaland',
    coords: [
      [25.8600, 93.7500],
      [25.8112, 93.7842],
      [25.7500, 93.8800]
    ],
    reason: 'Massive rockslide across dual carriageway at Mile 14'
  },
  {
    id: 'BLK-02',
    title: 'NH-10 29th Mile Teesta Sinking Segment',
    corridor: 'NH-10',
    state: 'Sikkim Border',
    coords: [
      [26.9800, 88.4600],
      [27.0543, 88.4611],
      [27.1100, 88.4900]
    ],
    reason: 'River erosion and flash flood road subsidence'
  }
];
