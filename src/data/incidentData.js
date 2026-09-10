// Comprehensive Incident and Field Reporting Datasets for NER Intelligence

export const INCIDENT_STATUSES = [
  'All Statuses',
  'Reported',
  'Under Review',
  'Verified',
  'Resolved',
  'Rejected'
];

export const INCIDENT_TYPES = [
  'All Types',
  'Landslide',
  'Mudslide',
  'Rockfall',
  'Flash Flood',
  'Road Collapse / Subsidence',
  'Bridge Scour / Damage',
  'Fallen Tree / Electric Line'
];

export const INCIDENT_RECORDS = [
  {
    id: 'INC-1042',
    type: 'Landslide',
    location: 'NH-6 near Shillong (Mile 28, East Khasi Hills)',
    district: 'East Khasi Hills (Shillong)',
    state: 'Meghalaya',
    severity: 'CRITICAL',
    reportedBy: 'Field Officer P. K. Sangma (PWD Mobile Escort)',
    reportedAt: '10:42 AM',
    reportedDate: '2026-09-10',
    status: 'Verified',
    riskImpact: 'High Disruption & Dual Lane Carriageway Blockade',
    affectedRoad: 'NH-6 (Jorabat - Shillong - Jowai Arterial Lifeline)',
    gpsCoordinates: [25.6120, 91.9210],
    gpsText: '25.6120° N, 91.9210° E',
    affectedVehicles: ['MED-07', 'SUPPLY-08', 'CNV-8415'],
    currentRouteRiskScore: '86 / 100',
    routeRiskLevel: 'CRITICAL',
    contributingFactors: [
      'Heavy rainfall (112 mm/hr)',
      'Recent landslide slope cleavage',
      'Road blockage spanning 45m',
      'High slope gradient (42°)'
    ],
    description: 'Heavy monsoon cloudburst triggered severe slope failure along cut-section. Saturated clay, boulders and slurry poured over the tarmac, completely cutting off both lanes between Mawryngkneng and Jowai.',
    photoUrl: '/assets/landslide_incident.png',
    photoCaption: 'NH-6 Mile 28 debris field captured by Field Officer Sangma',

    // STRICT SEPARATION: OBSERVED DATA vs AI MODEL PREDICTION
    observedData: {
      timestamp: '10:42 AM (10 Sep 2026)',
      reporterRole: 'Assistant Engineer & Mobile Highway Escort, Meghalaya PWD',
      physicalDebrisDimension: '45m length × 3.2m height across both carriage lanes',
      waterSeepage: 'Active high-velocity runoff emerging from fracture fissures',
      vehicleBacklog: '18 freight trucks and 2 emergency medical carriers halted',
      groundCasualties: 'Zero reported. Escort pilot halted traffic 100m upstream before main collapse.',
      eyewitnessReport: 'Field officer reported road blockage at 10:42 AM. Boulders continue to roll down the slope.'
    },

    modelPredictions: {
      engineName: 'NER-GeoDisrupt AI Neural Engine v3.4',
      disruptionRiskScore: '86 / 100',
      riskCategory: 'CRITICAL DISRUPTIVE HAZARD',
      confidenceScore: '94% Telemetry Confidence',
      clearanceDurationEstimate: '4.5 hours with 2 hydraulic excavators and 4 dumpers',
      secondarySlideProbability: '74% probability of secondary failure if rainfall exceeds 30 mm/hr',
      rainfallSaturationIndex: '92% soil liquid limit reached',
      alternateDetourRecommendation: 'Divert light convoys via Mawryngkneng-Umsning rural arterial; multi-axle tankers hold at Barapani Staging Depot.'
    }
  },
  {
    id: 'INC-1041',
    type: 'Rockfall',
    location: 'NH-29 Chumukedima Mile 14',
    district: 'Kohima (Nagaland)',
    state: 'Nagaland',
    severity: 'CRITICAL',
    reportedBy: 'Maj. S. R. Sangma (Project Sewak / BRO)',
    reportedAt: '09:15 AM',
    reportedDate: '2026-09-10',
    status: 'Reported',
    riskImpact: 'Complete Roadblock & Lifeline Severance',
    affectedRoad: 'NH-29 (Dimapur - Kohima - Imphal)',
    gpsCoordinates: [25.8112, 93.7842],
    gpsText: '25.8112° N, 93.7842° E',
    affectedVehicles: ['RELIEF-21', 'MED-14'],
    currentRouteRiskScore: '94 / 100',
    routeRiskLevel: 'CRITICAL',
    contributingFactors: [
      'Heavy rainfall',
      'Recent landslide',
      'Road blockage',
      'High slope'
    ],
    description: 'Massive granite fracture sheared down the canyon wall, burying the road under 450 m³ of rock debris.',
    photoUrl: '/assets/rockfall_incident.png',
    photoCaption: 'Chumukedima canyon rockfall zone',
    observedData: {
      timestamp: '09:15 AM (10 Sep 2026)',
      reporterRole: 'BRO Project Sewak Patrol',
      physicalDebrisDimension: 'Over 450 cubic meters of granite blocks up to 2m diameter',
      waterSeepage: 'Moderate mud slurry',
      vehicleBacklog: '34 multi-axle vehicles stranded',
      groundCasualties: 'None. Police gate active.',
      eyewitnessReport: 'Sound of rock cracking heard 5 minutes prior to main slide.'
    },
    modelPredictions: {
      engineName: 'NER-GeoDisrupt AI Neural Engine v3.4',
      disruptionRiskScore: '94 / 100',
      riskCategory: 'CRITICAL LIFELINE DISRUPTION',
      confidenceScore: '97%',
      clearanceDurationEstimate: '7 to 9 hours clearance required',
      secondarySlideProbability: '82% risk of rockfall recurrence',
      rainfallSaturationIndex: '88%',
      alternateDetourRecommendation: 'Reroute via Medziphema-Niuland-Kohima East bypass.'
    }
  },
  {
    id: 'INC-1040',
    type: 'Flash Flood',
    location: 'NH-10 Teesta 29th Mile',
    district: 'East Sikkim (Gangtok)',
    state: 'Sikkim',
    severity: 'CRITICAL',
    reportedBy: 'Inspector T. Lepcha (Sikkim Police Highway Patrol)',
    reportedAt: '08:30 AM',
    reportedDate: '2026-09-10',
    status: 'Under Review',
    riskImpact: 'Submergence & Tarmac Undermining',
    affectedRoad: 'NH-10 (Sevoke - Teesta Bazaar - Gangtok)',
    gpsCoordinates: [27.0543, 88.4611],
    gpsText: '27.0543° N, 88.4611° E',
    affectedVehicles: ['BRIDGE-03'],
    currentRouteRiskScore: '89 / 100',
    routeRiskLevel: 'CRITICAL',
    contributingFactors: [
      'Heavy rainfall',
      'Recent landslide',
      'Road blockage',
      'High slope'
    ],
    description: 'Teesta river surge overflowed embankment by 0.8m, scouring pavement subgrade.',
    photoUrl: '/assets/flood_incident.png',
    photoCaption: 'Teesta river overflowing 29th Mile tarmac',
    observedData: {
      timestamp: '08:30 AM (10 Sep 2026)',
      reporterRole: 'Sikkim Highway Police Patrol',
      physicalDebrisDimension: '0.8m standing water over 120m highway length',
      waterSeepage: 'Heavy river flood water',
      vehicleBacklog: 'Freight traffic halted at Sevoke checkgate',
      groundCasualties: 'None',
      eyewitnessReport: 'River rose 1.4m within 40 minutes.'
    },
    modelPredictions: {
      engineName: 'NER-GeoDisrupt AI Neural Engine v3.4',
      disruptionRiskScore: '89 / 100',
      riskCategory: 'HIGH HYDROLOGICAL RISK',
      confidenceScore: '91%',
      clearanceDurationEstimate: 'Awaiting river level receding (est. 6 hours)',
      secondarySlideProbability: '68% bank erosion probability',
      rainfallSaturationIndex: '96%',
      alternateDetourRecommendation: 'Lava-Algarah-Reshi pass cleared for vehicles under 18 MT.'
    }
  },
  {
    id: 'INC-1039',
    type: 'Mudslide',
    location: 'NH-27 Jatinga Hill Valley',
    district: 'Dima Hasao (Haflong)',
    state: 'Assam',
    severity: 'HIGH',
    reportedBy: 'Dy. Comm. Anupam Roy (Dima Hasao Disaster Cell)',
    reportedAt: '07:45 AM',
    reportedDate: '2026-09-10',
    status: 'Verified',
    riskImpact: 'Single-Lane Alternating Traffic Only',
    affectedRoad: 'NH-27 (Lumding - Haflong - Silchar)',
    gpsCoordinates: [25.1245, 92.9912],
    gpsText: '25.1245° N, 92.9912° E',
    affectedVehicles: ['FOOD-12'],
    currentRouteRiskScore: '72 / 100',
    routeRiskLevel: 'HIGH',
    contributingFactors: [
      'Heavy rainfall',
      'Recent landslide',
      'High slope'
    ],
    description: 'Mud slurry spill over downhill lane. One lane cleared for escorted convoy batches.',
    photoUrl: '/assets/mudslide_incident.png',
    photoCaption: 'Jatinga valley single-lane operation',
    observedData: {
      timestamp: '07:45 AM (10 Sep 2026)',
      reporterRole: 'District Disaster Management Authority',
      physicalDebrisDimension: 'Slurry spanning 30m of southbound lane',
      waterSeepage: 'Continuous mud runoff',
      vehicleBacklog: 'Slow-moving 10-car convoy batches',
      groundCasualties: 'None',
      eyewitnessReport: 'Single lane traffic moving at 15 km/h.'
    },
    modelPredictions: {
      engineName: 'NER-GeoDisrupt AI Neural Engine v3.4',
      disruptionRiskScore: '72 / 100',
      riskCategory: 'ELEVATED TRANSIT DELAY',
      confidenceScore: '89%',
      clearanceDurationEstimate: '2.5 hours remaining to clear second lane',
      secondarySlideProbability: '55%',
      rainfallSaturationIndex: '84%',
      alternateDetourRecommendation: 'Maintain alternating pilot escorts; no detour necessary.'
    }
  },
  {
    id: 'INC-1038',
    type: 'Bridge Scour / Damage',
    location: 'NH-306 Kolasib Approach Bridge',
    district: 'Aizawl (Mizoram)',
    state: 'Mizoram',
    severity: 'MODERATE',
    reportedBy: 'Er. C. Lalthanga (Mizoram PWD)',
    reportedAt: '06:15 AM',
    reportedDate: '2026-09-09',
    status: 'Resolved',
    riskImpact: 'Speed Restriction 20 km/h (Passable)',
    affectedRoad: 'NH-306 (Silchar - Kolasib - Aizawl)',
    gpsCoordinates: [24.2200, 92.6800],
    gpsText: '24.2200° N, 92.6800° E',
    affectedVehicles: [],
    currentRouteRiskScore: '38 / 100',
    routeRiskLevel: 'LOW',
    contributingFactors: [
      'Heavy rainfall'
    ],
    description: 'Minor abutment scour after flash flood. Grouting and gabion reinforcement completed.',
    photoUrl: '/assets/bridge_incident.png',
    photoCaption: 'Reinforced Kolasib bridge abutment',
    observedData: {
      timestamp: '06:15 AM (09 Sep 2026)',
      reporterRole: 'Senior Bridge Engineer, Mizoram PWD',
      physicalDebrisDimension: 'Gabion stone cage installed along pier base',
      waterSeepage: 'Normal stream flow',
      vehicleBacklog: 'Nil',
      groundCasualties: 'None',
      eyewitnessReport: 'Bridge certified safe for loads up to 40 MT.'
    },
    modelPredictions: {
      engineName: 'NER-GeoDisrupt AI Neural Engine v3.4',
      disruptionRiskScore: '38 / 100',
      riskCategory: 'RESOLVED - ROUTINE MONITORING',
      confidenceScore: '96%',
      clearanceDurationEstimate: 'Fully open',
      secondarySlideProbability: '12%',
      rainfallSaturationIndex: '62%',
      alternateDetourRecommendation: 'Corridor nominal.'
    }
  },
  {
    id: 'INC-1037',
    type: 'Road Collapse / Subsidence',
    location: 'NH-208 South Tripura Mile 54',
    district: 'West Tripura (Agartala)',
    state: 'Tripura',
    severity: 'LOW',
    reportedBy: 'Anonymous Citizen App Report',
    reportedAt: '05:20 AM',
    reportedDate: '2026-09-09',
    status: 'Rejected',
    riskImpact: 'False Alarm / Pothole Only',
    affectedRoad: 'NH-208 (Agartala - Sabroom)',
    gpsCoordinates: [23.8315, 91.2868],
    gpsText: '23.8315° N, 91.2868° E',
    affectedVehicles: [],
    currentRouteRiskScore: '18 / 100',
    routeRiskLevel: 'LOW',
    contributingFactors: [],
    description: 'Citizen reported alleged road collapse. Inspection confirmed minor surface pothole; carriageway structurally intact.',
    photoUrl: '/assets/pothole_incident.png',
    photoCaption: 'Surface inspection showing intact road foundation',
    observedData: {
      timestamp: '05:20 AM (09 Sep 2026)',
      reporterRole: 'Inspecting Sub-Inspector, Tripura Highway Patrol',
      physicalDebrisDimension: 'Pothole 0.5m diameter, 4cm depth',
      waterSeepage: 'None',
      vehicleBacklog: 'Nil',
      groundCasualties: 'None',
      eyewitnessReport: 'Ground inspection completed. Report rejected as false alarm.'
    },
    modelPredictions: {
      engineName: 'NER-GeoDisrupt AI Neural Engine v3.4',
      disruptionRiskScore: '18 / 100',
      riskCategory: 'NOMINAL / NEGLIGIBLE RISK',
      confidenceScore: '99%',
      clearanceDurationEstimate: 'No clearance required',
      secondarySlideProbability: '4%',
      rainfallSaturationIndex: '42%',
      alternateDetourRecommendation: 'Standard transit active.'
    }
  }
];
