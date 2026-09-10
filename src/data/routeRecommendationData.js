// Route Recommendation Datasets and Conceptual OSRM Weighting Model

export const ROUTE_COMPARISON_DATA = {
  id: 'REC-NH6-SILCHAR',
  corridorCode: 'NH-6',
  corridorName: 'Guwahati - Shillong - Silchar Arterial Lifeline',
  origin: {
    name: 'Guwahati Logistics Hub (Khanapara Depot)',
    coords: [26.1445, 91.7362]
  },
  destination: {
    name: 'Silchar Central Warehouse (Cachar)',
    coords: [24.8333, 92.7789]
  },

  // 1. ORIGINAL ROUTE (Exact User Specifications)
  originalRoute: {
    name: 'Standard NH-6 Mainline via Mile 28',
    distanceKm: 312,
    distanceDisplay: '312 km',
    travelTimeDisplay: '6h 20m',
    travelTimeMinutes: 380,
    riskScore: 86,
    riskMax: 100,
    riskSeverity: 'CRITICAL',
    expectedDelay: '+2h 10m',
    expectedDelayMinutes: 130,
    status: 'DISRUPTED',
    statusBadge: 'BLOCKED / HIGH RISK',
    hazardDetail: 'Active Landslide & Mud Slurry at Mile 28 (East Khasi Hills)',
    color: '#ef4444',
    dashArray: '8, 8',
    coords: [
      [26.1445, 91.7362], // Guwahati Khanapara
      [26.0910, 91.8750], // Jorabat junction
      [25.8500, 91.8800], // Nongpoh
      [25.6120, 91.9210], // Mile 28 Landslide sector
      [25.5788, 91.8933], // Shillong
      [25.4500, 92.2000], // Jowai
      [25.1800, 92.3500], // Lad Rymbai
      [24.9800, 92.5500], // Khliehriat
      [24.8333, 92.7789]  // Silchar
    ],
    bottlenecks: [
      { name: 'Mile 28 Active Landslide', coords: [25.6120, 91.9210], delay: '+110 min', type: 'blockage' },
      { name: 'Khliehriat Coal Carrier Tailback', coords: [24.9800, 92.5500], delay: '+20 min', type: 'congestion' }
    ]
  },

  // 2. RECOMMENDED ROUTE (Exact User Specifications)
  recommendedRoute: {
    name: 'Mawryngkneng - Umsning Reinforced Bypass',
    distanceKm: 329,
    distanceDisplay: '329 km',
    travelTimeDisplay: '6h 45m',
    travelTimeMinutes: 405,
    riskScore: 34,
    riskMax: 100,
    riskSeverity: 'MEDIUM',
    expectedDelay: '+25m',
    expectedDelayMinutes: 25,
    status: 'OPERATIONAL',
    statusBadge: 'RECOMMENDED / SAFER',
    hazardDetail: 'Reinforced culverts, stable hillside gradients, pilot escort cleared',
    color: '#10b981',
    dashArray: null,
    coords: [
      [26.1445, 91.7362], // Guwahati Khanapara
      [26.0910, 91.8750], // Jorabat
      [25.9200, 92.0500], // Umsning Outer Bypass
      [25.7500, 92.1500], // Bhoirymbong Link
      [25.5600, 92.1200], // Mawryngkneng Junction
      [25.4500, 92.2000], // Jowai Outer Ring
      [25.1800, 92.3500], // Lad Rymbai
      [24.9800, 92.5500], // Khliehriat Bypass
      [24.8333, 92.7789]  // Silchar
    ],
    clearances: [
      { name: 'Bhoirymbong Heavy Axle Checkpoint', coords: [25.7500, 92.1500], status: 'Cleared 24 MT' },
      { name: 'Mawryngkneng Escort Post', coords: [25.5600, 92.1200], status: 'Escort Pilot Active' }
    ]
  },

  // Highlight Banner & User-specified Explanation
  badge: 'SAFER ALTERNATIVE',
  explanation: 'The recommended route is 17 km longer but significantly reduces disruption risk.',
  detailedSummary: 'By routing through the Mawryngkneng-Umsning reinforced bypass, convoys bypass the 45m mud slurry at Mile 28. Net transit delay is reduced from +2h 10m to only +25m, slashing risk from 86/100 (Critical) to 34/100 (Medium).',

  // 3. NON-LLM ROUTING ARCHITECTURE (Exact Conceptual Logic)
  architecture: {
    title: 'Deterministic Non-LLM Routing Architecture',
    statement: 'The route engine is NOT an LLM. Routing decisions are deterministic mathematical shortest-path evaluations computed over OpenStreetMap road networks, weighting physical graph edges by live environmental vulnerability factors.',
    formula: 'edge_cost = travel_time × (1 + risk_penalty)',
    formulaExplanation: 'Where travel_time is the baseline free-flow kinematic traverse time computed via OSRM, and risk_penalty is a dynamic normalized coefficient (0.0 to 3.0) aggregated from rainfall intensity, slope shear stress, and verified incident blockages.',
    components: [
      {
        layer: 'ROUTING ENGINE',
        sub: 'OSRM / OpenStreetMap',
        description: 'Computes physical graph topologies, distance matrices, speed limits, and turn restrictions using Contraction Hierarchies.'
      },
      {
        operator: '+'
      },
      {
        layer: 'RISK INTELLIGENCE',
        sub: 'Risk-adjusted route cost',
        description: 'Applies dynamic real-time penalty multipliers based on IMD precipitation radar, Doppler rainfall, and verified landslide reports.'
      }
    ],
    parameters: [
      { name: 'travel_time (Baseline)', value: '6h 45m (405 mins)', source: 'OSRM Contraction Hierarchy' },
      { name: 'risk_penalty (Mawryngkneng Bypass)', value: '0.34 (Low Multiplier)', source: 'Risk Intelligence Engine' },
      { name: 'risk_penalty (NH-6 Mile 28)', value: '2.86 (Extreme Penalty)', source: 'Incident INC-1042 Verified Landslide' },
      { name: 'Effective Edge Cost Ratio', value: '1 : 3.4 in favor of bypass', source: 'Dijkstra Objective Function' }
    ]
  }
};

// Alternative corridor comparisons available for selection in the command center
export const ADDITIONAL_ROUTE_ALTERNATIVES = [
  {
    id: 'REC-NH29-KOHIMA',
    corridorCode: 'NH-29',
    corridorName: 'Dimapur - Kohima Lifeline',
    explanation: 'Niuland-Zhadima bypass is 22 km longer but circumvents the Chumukedima rockslide gorge.',
    originalDistance: '74 km',
    originalTime: '2h 15m',
    originalRisk: 94,
    originalDelay: '+4h 40m',
    recommendedDistance: '96 km',
    recommendedTime: '3h 10m',
    recommendedRisk: 28,
    recommendedDelay: '+30m'
  },
  {
    id: 'REC-NH10-GANGTOK',
    corridorCode: 'NH-10',
    corridorName: 'Siliguri - Teesta - Gangtok Lifeline',
    explanation: 'Lava-Damdim alternative is 31 km longer but avoids Teesta riverbank scour and washouts.',
    originalDistance: '114 km',
    originalTime: '3h 40m',
    originalRisk: 88,
    originalDelay: '+2h 40m',
    recommendedDistance: '145 km',
    recommendedTime: '4h 30m',
    recommendedRisk: 38,
    recommendedDelay: '+45m'
  }
];
