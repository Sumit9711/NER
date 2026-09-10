// Risk Intelligence and Disruption Modeling Datasets for NER

export const RISK_LEVEL_TIERS = [
  { range: '0–25', label: 'LOW', color: 'emerald', bg: 'bg-emerald-950', text: 'text-emerald-300', border: 'border-emerald-500' },
  { range: '26–50', label: 'MEDIUM', color: 'yellow', bg: 'bg-yellow-950', text: 'text-yellow-300', border: 'border-yellow-500' },
  { range: '51–75', label: 'HIGH', color: 'amber', bg: 'bg-amber-950', text: 'text-amber-300', border: 'border-amber-500' },
  { range: '76–100', label: 'CRITICAL', color: 'red', bg: 'bg-red-950', text: 'text-red-300', border: 'border-red-500' }
];

export const getRiskTier = (score) => {
  const num = Number(score) || 0;
  if (num <= 25) return RISK_LEVEL_TIERS[0];
  if (num <= 50) return RISK_LEVEL_TIERS[1];
  if (num <= 75) return RISK_LEVEL_TIERS[2];
  return RISK_LEVEL_TIERS[3];
};

export const REGIONAL_RISK_OVERVIEW = {
  overallScore: 64,
  maxScore: 100,
  severity: 'HIGH',
  subtitle: 'Monsoon Saturation & Hillside Instability Index',
  summary: 'Regional disruption risk is elevated across 6 out of 8 North Eastern states due to continuous monsoon rainfall exceeding seasonal averages.',
  distribution: [
    { name: 'Critical (76–100)', count: 4, percentage: 18, fill: '#ef4444', tier: 'CRITICAL' },
    { name: 'High (51–75)', count: 9, percentage: 42, fill: '#f59e0b', tier: 'HIGH' },
    { name: 'Medium (26–50)', count: 6, percentage: 28, fill: '#eab308', tier: 'MEDIUM' },
    { name: 'Low (0–25)', count: 3, percentage: 12, fill: '#10b981', tier: 'LOW' }
  ],
  monitoredCorridorsCount: 22,
  activeAlertSectors: 7
};

export const TOP_RISK_CORRIDORS = [
  {
    id: 'CORR-NH6',
    code: 'NH-6',
    name: 'Jorabat - Shillong - Jowai Trunk',
    states: 'Meghalaya, Assam',
    score: 91,
    severity: 'CRITICAL',
    trend: '+8% vs yesterday',
    primaryHazard: 'Torrential rainfall & saturated cut-slope failure',
    delayImpact: '+110 min delay',
    activeConvoys: 28,
    rainfall: '112 mm/hr',
    roadCondition: 'Poor (Mud slurry spanning 45m)',
    recentIncident: 'Active Landslide at Mile 28',
    terrainSlope: 'High (42° slope angle)',
    trafficSignal: 'Abnormal (Congested tailback)'
  },
  {
    id: 'CORR-NH29',
    code: 'NH-29',
    name: 'Dimapur - Kohima - Imphal Lifeline',
    states: 'Nagaland, Manipur',
    score: 94,
    severity: 'CRITICAL',
    trend: '+12% vs yesterday',
    primaryHazard: 'Major rockfall blockage at Chumukedima Mile 14',
    delayImpact: '+280 min delay',
    activeConvoys: 14,
    rainfall: '98 mm/hr',
    roadCondition: 'Poor (Both lanes buried)',
    recentIncident: 'Severe Rockslide',
    terrainSlope: 'High (46° canyon gorge)',
    trafficSignal: 'Abnormal (Traffic halted)'
  },
  {
    id: 'CORR-NH10',
    code: 'NH-10',
    name: 'Sevoke - Teesta - Gangtok Axis',
    states: 'Sikkim, WB Border',
    score: 88,
    severity: 'CRITICAL',
    trend: '+5% vs yesterday',
    primaryHazard: 'Teesta River surge & road subsidence',
    delayImpact: '+160 min delay',
    activeConvoys: 9,
    rainfall: '85 mm/hr',
    roadCondition: 'Poor (0.8m standing river water)',
    recentIncident: 'Flash Flood & Scour',
    terrainSlope: 'High (River cliff edge)',
    trafficSignal: 'Abnormal (Heavy vehicles barred)'
  },
  {
    id: 'CORR-NH37',
    code: 'NH-37',
    name: 'Guwahati - Nagaon - Jorhat - Dibrugarh',
    states: 'Assam Valley',
    score: 78,
    severity: 'HIGH',
    trend: '+4% vs yesterday',
    primaryHazard: 'Brahmaputra tributary backflow waterlogging',
    delayImpact: '+45 min delay',
    activeConvoys: 38,
    rainfall: '58 mm/hr',
    roadCondition: 'Fair to Poor (Shoulder erosion)',
    recentIncident: 'Waterlogging & Culvert Silt',
    terrainSlope: 'Medium (River plain gradient)',
    trafficSignal: 'Abnormal (Slow crawling traffic)'
  },
  {
    id: 'CORR-NH27',
    code: 'NH-27',
    name: 'Lumding - Haflong - Silchar Corridor',
    states: 'Assam Hill Section',
    score: 63,
    severity: 'HIGH',
    trend: '-2% vs yesterday',
    primaryHazard: 'Jatinga valley clay slurry on descending hairpin curves',
    delayImpact: '+90 min delay',
    activeConvoys: 22,
    rainfall: '74 mm/hr',
    roadCondition: 'Poor (Single lane alternating)',
    recentIncident: 'Mudslide Debris',
    terrainSlope: 'High (38° mountain pass)',
    trafficSignal: 'Abnormal (Batch convoy holding)'
  },
  {
    id: 'CORR-NH306',
    code: 'NH-306',
    name: 'Silchar - Kolasib - Aizawl Lifeline',
    states: 'Assam, Mizoram',
    score: 58,
    severity: 'HIGH',
    trend: 'Stable',
    primaryHazard: 'Border checkpost weight queue & wet asphalt',
    delayImpact: '+75 min delay',
    activeConvoys: 16,
    rainfall: '35 mm/hr',
    roadCondition: 'Fair (Slick asphalt)',
    recentIncident: 'Minor Abutment Scour (Reinforced)',
    terrainSlope: 'High (Ridge climbing road)',
    trafficSignal: 'Normal / Slow'
  },
  {
    id: 'CORR-NH13',
    code: 'NH-13',
    name: 'Trans-Arunachal Highway (Bhalukpong - Tawang)',
    states: 'Arunachal Pradesh',
    score: 24,
    severity: 'LOW',
    trend: 'Clear',
    primaryHazard: 'Nominal mountain passage via Sela Tunnel',
    delayImpact: 'On Schedule (+15m)',
    activeConvoys: 11,
    rainfall: '22 mm/hr',
    roadCondition: 'Good (Engineered pavement)',
    recentIncident: 'Routine Sensor Sync',
    terrainSlope: 'High (High-altitude pass)',
    trafficSignal: 'Normal (Clear transit)'
  }
];

export const DETAILED_RISK_CARD_DATA = {
  corridorCode: 'NH-6',
  corridorName: 'Jorabat - Shillong - Jowai Arterial Lifeline',
  locationDetail: 'East Khasi Hills & Ri-Bhoi border sector (Mile 24 to Mile 36)',
  riskScore: 86,
  maxScore: 100,
  severity: 'CRITICAL',
  severityLabel: 'CRITICAL DISRUPTION RISK',

  // 5 Explicit Contributing Factors requested by user
  contributingFactors: {
    rainfall: { level: 'High', detail: '112 mm/hr measured at Cherrapunji Doppler station', status: 'CRITICAL' },
    roadCondition: { level: 'Poor', detail: '45m length covered by wet mud and rock slurry', status: 'CRITICAL' },
    recentIncident: { level: 'Landslide', detail: 'Active slope cleavage at Mile 28 verified by PWD', status: 'CRITICAL' },
    terrainSlope: { level: 'High', detail: '42° steep cut-slope with unstable fractured shale', status: 'HIGH' },
    trafficSignal: { level: 'Abnormal', detail: 'Zero velocity registered across 18 freight units', status: 'CRITICAL' }
  },

  // Prediction Metadata
  predictionTime: 'Today 10:45 AM IST',
  modelVersion: 'v3.4-NER-TerrainNet (Multi-Modal Hybrid)',
  dataQuality: '94% (High Confidence - 48 Active Sensor Streams)',

  // Mandatory AI Label & Disclaimer
  aiBadge: 'AI / DECISION SUPPORT',
  mandatoryDisclaimer: 'AI-generated decision support. Verify before taking operational action.',
  precisionStatement: 'Do not claim unsupported accuracy. This hybrid score synthesizes empirical field sensor readings with geological vulnerability weights.',

  // Hybrid Risk Score Component Breakdown (Summing to 86/100)
  hybridWeights: [
    { factor: 'Rainfall Saturation', weight: 22, max: 25, observed: '112 mm/hr (Heavy cloudburst)' },
    { factor: 'Road Condition', weight: 18, max: 20, observed: 'Tarmac buried under 45m mud' },
    { factor: 'Incident Severity', weight: 19, max: 20, observed: 'Active Verified Landslide' },
    { factor: 'Terrain & Slope Shear', weight: 14, max: 15, observed: '42° slope with water fissures' },
    { factor: 'Traffic Flow & Delay', weight: 8, max: 10, observed: '18 vehicles stranded tailback' },
    { factor: 'Vehicle Anomaly Factor', weight: 3, max: 5, observed: 'Prolonged stop logged on MED-07' },
    { factor: 'Historical Disruption Freq', weight: 2, max: 5, observed: '4 monsoon slides in past 2 years' }
  ],

  // Clear Distinction: Observed Data vs Prediction
  observedData: [
    { label: 'Rainfall Telemetry', value: '112 mm/hr recorded by IMD Cherrapunji radar' },
    { label: 'Pavement State', value: '45m length of dual carriageway covered by mud and rock slurry' },
    { label: 'Active Incident', value: 'Verified Landslide at Mile 28 reported by Field Officer Sangma (10:42 AM)' },
    { label: 'Terrain Geometry', value: '42° inclination with active hydrostatic fissure discharge' },
    { label: 'Traffic Ground Reality', value: '18 freight trucks and medical escort halted with zero forward movement' }
  ],

  modelPredictions: [
    { label: 'Disruption Risk Index', value: '86 / 100 (Critical Route Disruption Risk)' },
    { label: 'Estimated Clearance Duration', value: '4.5 hours with 2 hydraulic excavators and 4 dumpers' },
    { label: 'Secondary Collapse Probability', value: '74% likelihood of recurrence under continuous precipitation > 30 mm/hr' },
    { label: 'Recommended Alternate Detour', value: 'Divert light relief convoys via Mawryngkneng-Umsning bypass; hold multi-axle trailers at Barapani Staging Depot' },
    { label: 'Detour Confidence', value: '92% algorithmic confidence' }
  ]
};
