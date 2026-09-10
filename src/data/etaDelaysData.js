// ETA & Delay Telemetry Dataset for NER Fleet Convoys

export const ETA_SUMMARY_METRICS = {
  averageDelayMinutes: 42,
  averageDelayDisplay: '+42 min',
  activeConvoysCount: 42,
  delayedConvoysCount: 6,
  onTimePercentage: 68,
  criticalDelayCount: 4,
  telemetryUptime: '98.4%',
  modelVersion: 'v2.8-StochasticETANet',
  lastSync: '10:45 AM IST'
};

export const ETA_VEHICLES_DATA = [
  {
    id: 'MED-07',
    vehicleName: 'Medical Convoy 07 (NDRF Escort)',
    driver: 'Havildar P. Angami',
    organization: 'NDRF 1st Battalion',
    commodity: 'Emergency Medical Kits & Insulin',
    origin: 'Guwahati Depot (Assam)',
    destination: 'Kohima Base Hospital (Nagaland)',
    corridor: 'NH-29',
    currentLocation: 'Medziphema Bypass Mile 8',
    speedKmH: 38,
    status: 'DELAYED',
    // Exact specifications requested by user
    normalEta: '14:05',
    predictedEta: '14:33',
    expectedDelay: '+28 min',
    expectedDelayMinutes: 28,
    severity: 'HIGH',
    reasons: [
      'Heavy rainfall',
      'Road congestion',
      'High-risk segment'
    ],
    dataQuality: '94% (High Confidence - 48 Active Sensors)',
    dataQualityLevel: 'HIGH',
    sensorStreams: 48,
    confidencePct: 94,
    notes: 'Continuous precipitation slowing mountain gradient traversal; executing bypass around Chumukedima landslide.'
  },
  {
    id: 'FOOD-12',
    vehicleName: 'FCI Essential Grain Fleet 12',
    driver: 'Rajen Das (Govt Pilot 02)',
    organization: 'Food Corporation of India (FCI)',
    commodity: 'Fortified Rice & Baby Formula',
    origin: 'Lumding Railhead (Assam)',
    destination: 'Silchar Central Godown (Assam)',
    corridor: 'NH-27',
    currentLocation: 'Haflong Hill Section Mile 22',
    speedKmH: 28,
    status: 'DELAYED',
    normalEta: '16:15',
    predictedEta: '17:45',
    expectedDelay: '+90 min',
    expectedDelayMinutes: 90,
    severity: 'CRITICAL',
    reasons: [
      'Single-lane alternating convoy hold',
      'Jatinga clay slurry',
      'Mudslide debris'
    ],
    dataQuality: '92% (High Confidence - GPS + Haflong sensor array)',
    dataQualityLevel: 'HIGH',
    sensorStreams: 36,
    confidencePct: 92,
    notes: 'Haflong ghat road restricted to single-lane convoy batches due to saturated hill slope.'
  },
  {
    id: 'RELIEF-21',
    vehicleName: 'Disaster Relief Convoy 21',
    driver: 'Subedar T. Lepcha',
    organization: 'Sikkim State Disaster Management Authority',
    commodity: 'Water Purification Units & Tarpaulins',
    origin: 'Siliguri Staging Area (West Bengal)',
    destination: 'Gangtok Disaster Staging Camp',
    corridor: 'NH-10',
    currentLocation: 'Sevoke Coronation Bridge Link',
    speedKmH: 22,
    status: 'CRITICAL_DELAY',
    normalEta: '18:30',
    predictedEta: '21:10',
    expectedDelay: '+2h 40m',
    expectedDelayMinutes: 160,
    severity: 'CRITICAL',
    reasons: [
      'Teesta river surge waterlogging',
      'Active detour via Damdim-Lava',
      'Weight limit restriction'
    ],
    dataQuality: '89% (Moderate Confidence - Border telemetry)',
    dataQualityLevel: 'MODERATE',
    sensorStreams: 28,
    confidencePct: 89,
    notes: 'NH-10 closed at 29th Mile; convoy rerouted via elevated mountain ridge pass.'
  },
  {
    id: 'MED-14',
    vehicleName: 'Vaccine Cold-Chain Carrier 14',
    driver: 'Lalthan Mawia',
    organization: 'Directorate of Health Services Mizoram',
    commodity: 'Critical Blood Plasma & Antivenom',
    origin: 'Silchar Civil Hospital (Assam)',
    destination: 'Aizawl Civil Hospital (Mizoram)',
    corridor: 'NH-306',
    currentLocation: 'Kolasib North Ridge Mile 12',
    speedKmH: 42,
    status: 'DELAYED',
    normalEta: '15:50',
    predictedEta: '16:25',
    expectedDelay: '+35 min',
    expectedDelayMinutes: 35,
    severity: 'MEDIUM',
    reasons: [
      'Dense ridge fog / poor visibility',
      'Wet asphalt',
      'Hairpin descent deceleration'
    ],
    dataQuality: '95% (High Confidence - 4G OBD Telematics)',
    dataQualityLevel: 'HIGH',
    sensorStreams: 52,
    confidencePct: 95,
    notes: 'Refrigeration unit operating nominal; driver maintaining safe speeds through foggy mountain bends.'
  },
  {
    id: 'SUPPLY-08',
    vehicleName: 'Civil Supplies Bulk Carrier 08',
    driver: 'N. Ningombam',
    organization: 'Consumer Affairs & Public Distribution (Manipur)',
    commodity: 'Kerosene & LPG Cylinders',
    origin: 'Silchar Bottling Plant (Assam)',
    destination: 'Imphal POL Depot (Manipur)',
    corridor: 'NH-37',
    currentLocation: 'Jiribam Border Gate Checkpost',
    speedKmH: 30,
    status: 'DELAYED',
    normalEta: '19:20',
    predictedEta: '20:30',
    expectedDelay: '+1h 10m',
    expectedDelayMinutes: 70,
    severity: 'HIGH',
    reasons: [
      'Heavy rainfall',
      'Jiribam border weighbridge queue',
      'Saturated river embankment'
    ],
    dataQuality: '91% (High Confidence - Manipur Disaster Cell)',
    dataQualityLevel: 'HIGH',
    sensorStreams: 34,
    confidencePct: 91,
    notes: 'Weight verification and security clearance queue at interstate border checkpost.'
  },
  {
    id: 'AMB-03',
    vehicleName: 'Advanced Life Support Ambulance 03',
    driver: 'B. Sonowal',
    organization: 'Assam Emergency Medical Services',
    commodity: 'Emergency Critical Care Transfer',
    origin: 'Tezpur Medical College',
    destination: 'Guwahati Neurological Institute',
    corridor: 'NH-27',
    currentLocation: 'Koliabhumur Bridge West End',
    speedKmH: 68,
    status: 'ON_SCHEDULE',
    normalEta: '13:40',
    predictedEta: '13:48',
    expectedDelay: '+8 min',
    expectedDelayMinutes: 8,
    severity: 'LOW',
    reasons: [
      'Minor rain shower',
      'Brahmaputra bridge crosswinds'
    ],
    dataQuality: '98% (High Confidence - Direct GPRS Nav)',
    dataQualityLevel: 'HIGH',
    sensorStreams: 60,
    confidencePct: 98,
    notes: 'Green corridor protocol active; toll gates automatically cleared.'
  }
];

export const GOVERNANCE_NOTICE = {
  label: 'AI / DECISION SUPPORT',
  statement: 'Do not claim unsupported model accuracy.',
  detailedDisclaimer: 'Predictive ETAs and corridor delays are dynamic stochastic estimates derived from real-time vehicle GPS telemetry, mountain gradient slowdown curves, and IMD precipitation radar. Weather conditions in high-altitude NER terrain change rapidly; human operators must verify clearance with local traffic escorts before dispatching critical convoys.'
};
