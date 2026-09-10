// Alert System & Deterministic Alert Engine Datasets for NER Logistics

export const ALERT_TABS = ['All', 'Critical', 'High', 'Medium', 'Low'];

export const ACTIVE_ALERTS_DATA = [
  {
    id: 'ALT-1042',
    severity: 'CRITICAL',
    title: 'Road blockage detected on NH-6',
    affectedVehicle: 'MED-07',
    corridor: 'NH-6 (Mile 28, East Khasi Hills)',
    potentialDelay: '+2h 10m',
    potentialDelayMinutes: 130,
    recommendedAction: 'Use alternate route',
    recommendedRoute: 'Mawryngkneng - Umsning Bypass (329 km)',
    incidentId: 'INC-1042',
    timestamp: 'Today 10:42 AM IST',
    status: 'ACTIVE',
    acknowledgedBy: null,
    acknowledgedAt: null,
    triggerSource: 'Automated Soil Shear & PWD Escort Verification',
    details: '45m length of NH-6 dual carriageway buried under saturated shale debris. Convoys halted upstream; diversion clearance established via Mawryngkneng bypass.'
  },
  {
    id: 'ALT-1041',
    severity: 'CRITICAL',
    title: 'Major rockfall blockage at Chumukedima gorge',
    affectedVehicle: 'CNV-8415',
    corridor: 'NH-29 (Dimapur - Kohima)',
    potentialDelay: '+4h 40m',
    potentialDelayMinutes: 280,
    recommendedAction: 'Divert via Niuland-Zhadima bypass',
    recommendedRoute: 'Niuland-Zhadima Loop (96 km)',
    incidentId: 'INC-1041',
    timestamp: 'Today 09:15 AM IST',
    status: 'ACTIVE',
    acknowledgedBy: null,
    acknowledgedAt: null,
    triggerSource: 'Seismic Strain Sensor & Kohima Police Checkpoint',
    details: 'Heavy boulder collapse burying both lanes at Mile 14. Heavy machinery deployed from Dimapur depot.'
  },
  {
    id: 'ALT-1039',
    severity: 'HIGH',
    title: 'Flash flood and culvert silt overflow on NH-37',
    affectedVehicle: 'FOOD-12',
    corridor: 'NH-37 (Kaziranga Bypass Sector)',
    potentialDelay: '+1h 15m',
    potentialDelayMinutes: 75,
    recommendedAction: 'Regulate speed to 20 km/h; convoy holding at Bokakhat',
    recommendedRoute: 'Bokakhat Northern Elevated Corridor',
    incidentId: 'INC-1039',
    timestamp: 'Today 08:30 AM IST',
    status: 'ACKNOWLEDGED',
    acknowledgedBy: 'Nagaon District Disaster Control (Officer Baruah)',
    acknowledgedAt: '08:42 AM IST',
    triggerSource: 'Brahmaputra River Radar & Ultrasonic Water Gauge',
    details: '0.4m standing water across carriageway shoulders. Heavy commercial vehicles permitted at slow crawl.'
  },
  {
    id: 'ALT-1038',
    severity: 'HIGH',
    title: 'Single-lane clay slurry hazard on NH-27',
    affectedVehicle: 'SUPPLY-08',
    corridor: 'NH-27 (Jatinga Valley Descent)',
    potentialDelay: '+1h 30m',
    potentialDelayMinutes: 90,
    recommendedAction: 'Batch convoy pilot escort alternating every 30m',
    recommendedRoute: 'Jatinga Reinforced Ghat Pavement',
    incidentId: 'INC-1038',
    timestamp: 'Today 07:45 AM IST',
    status: 'ACKNOWLEDGED',
    acknowledgedBy: 'Dima Hasao PWD Control (Eng. Hazarika)',
    acknowledgedAt: '08:05 AM IST',
    triggerSource: 'Haflong Hill Section CCTV & Pilot Escort 02',
    details: 'Descending hairpin curves experiencing wet clay slippage. 24 MT gross vehicle weight limit enforced.'
  },
  {
    id: 'ALT-1035',
    severity: 'MEDIUM',
    title: 'Dense mountain ridge fog and reduced visibility',
    affectedVehicle: 'MED-14',
    corridor: 'NH-306 (Kolasib North Ridge)',
    potentialDelay: '+35 min',
    potentialDelayMinutes: 35,
    recommendedAction: 'Maintain headlight escort; maximum speed 30 km/h',
    recommendedRoute: 'NH-306 Standard Ridgeline Road',
    incidentId: 'INC-1035',
    timestamp: 'Today 06:50 AM IST',
    status: 'ACKNOWLEDGED',
    acknowledgedBy: 'Mizoram Transport Commissionerate',
    acknowledgedAt: '07:10 AM IST',
    triggerSource: 'IMD Aizawl Visibility Sensor (50m range)',
    details: 'Thick valley inversion cloud layer reducing forward driver visibility. Pilot vehicle assigned.'
  },
  {
    id: 'ALT-1032',
    severity: 'LOW',
    title: 'Routine weighbridge verification queue',
    affectedVehicle: 'AMB-03',
    corridor: 'NH-27 (Jiribam Border Gate)',
    potentialDelay: '+15 min',
    potentialDelayMinutes: 15,
    recommendedAction: 'Priority lane cleared for essential convoy',
    recommendedRoute: 'NH-27 Inter-State Fast-Track Toll',
    incidentId: 'INC-1032',
    timestamp: 'Today 06:10 AM IST',
    status: 'RESOLVED',
    acknowledgedBy: 'Jiribam Checkpost Inspector (S. Sharma)',
    acknowledgedAt: '06:18 AM IST',
    triggerSource: 'RFID FASTag & Border Gate Telematics',
    details: 'Green corridor protocol engaged; ambulance unit cleared with zero queue delay.'
  }
];

// Deterministic Alert Engine Configuration & Rules
export const ALERT_ENGINE_CONFIG = {
  engineName: 'NER-EscalateNet Deterministic Rules Engine',
  version: 'v4.1-Deterministic',
  statement: 'Alert escalation uses deterministic rule triggers without stochastic hallucinations.',
  
  // Exact user requested primary rule
  primaryRule: {
    trigger: 'Risk Score > 80',
    action: 'Send Critical Alert',
    recipients: [
      'District Authority',
      'Driver',
      'Emergency Response Team'
    ],
    channels: [
      'In-App',
      'Push',
      'SMS'
    ],
    lifecycle: [
      { step: 'Alert Created', time: '10:42:01 IST', detail: 'Trigger condition matched: NH-6 composite risk score calculated at 86/100' },
      { step: 'Alert Sent', time: '10:42:04 IST', detail: 'Dispatched across In-App banner, Driver Android tablet push, and District Magistrate SMS gateway' },
      { step: 'Alert Acknowledged', time: '10:43:18 IST', detail: 'Acknowledged by East Khasi Hills EOC Duty Officer; reroute directive confirmed' }
    ]
  },

  // Deterministic Escalation Rules Table
  rulesTable: [
    {
      id: 'RULE-01',
      condition: 'Risk Score > 80',
      action: 'Send Critical Alert',
      recipients: 'District Authority, Driver, Emergency Response Team',
      channels: 'In-App, Push, SMS',
      severity: 'CRITICAL',
      escalationWindow: 'Immediate (0 min)'
    },
    {
      id: 'RULE-02',
      condition: 'Road Blockage / Verified Landslide',
      action: 'Lock Corridors & Trigger Detour Re-route',
      recipients: 'Command Center, District PWD, Convoys in 50km radius',
      channels: 'In-App, SMS, Radio',
      severity: 'CRITICAL',
      escalationWindow: 'Within 2 min'
    },
    {
      id: 'RULE-03',
      condition: 'Expected Delay > 60 min',
      action: 'Send High-Priority Staging Directive',
      recipients: 'Driver, Staging Area Officer, Central Dispatch',
      channels: 'In-App, Push',
      severity: 'HIGH',
      escalationWindow: 'Within 5 min'
    },
    {
      id: 'RULE-04',
      condition: 'Prolonged Unexpected Stop (> 30 min outside checkpost)',
      action: 'Request Pilot Safety Check & Fuel Confirmation',
      recipients: 'Driver, Nearest Police Outpost',
      channels: 'Push, SMS',
      severity: 'HIGH',
      escalationWindow: 'Within 10 min'
    },
    {
      id: 'RULE-05',
      condition: 'Precipitation > 50 mm/hr (Heavy Rain)',
      action: 'Issue Weather Hazard Advisory',
      recipients: 'All Convoys in Catchment Sector',
      channels: 'In-App Broadcast',
      severity: 'MEDIUM',
      escalationWindow: 'Within 15 min'
    }
  ]
};

// Alert History Table Data
export const ALERT_HISTORY_LOGS = [
  {
    alertId: 'ALT-1040',
    title: 'Rockfall Debris at Teesta Low Bridge',
    corridor: 'NH-10',
    severity: 'CRITICAL',
    trigger: 'Risk Score 88 > 80',
    channels: 'In-App, Push, SMS',
    created: '09 Sep 18:30 IST',
    sent: '09 Sep 18:31 IST',
    acknowledged: '09 Sep 18:34 IST',
    acknowledgedBy: 'Kalimpong Disaster Cell',
    actionTaken: 'Traffic halted; Bailey bridge inspection dispatched'
  },
  {
    alertId: 'ALT-1036',
    title: 'Mudslide Slurry at Barapani Lake Loop',
    corridor: 'NH-6',
    severity: 'HIGH',
    trigger: 'Rainfall > 70 mm/hr',
    channels: 'In-App, SMS',
    created: '09 Sep 14:15 IST',
    sent: '09 Sep 14:16 IST',
    acknowledged: '09 Sep 14:22 IST',
    acknowledgedBy: 'Ri-Bhoi Traffic Control',
    actionTaken: 'Single lane opened with bulldozer clearance'
  },
  {
    alertId: 'ALT-1034',
    title: 'Overweight Axle Warning at Silchar Border',
    corridor: 'NH-306',
    severity: 'MEDIUM',
    trigger: 'Axle Telemetry > 24 MT',
    channels: 'In-App',
    created: '09 Sep 11:40 IST',
    sent: '09 Sep 11:40 IST',
    acknowledged: '09 Sep 11:45 IST',
    acknowledgedBy: 'Vayunagar Border Weighbridge',
    actionTaken: 'Consignment split between two 12 MT vehicles'
  },
  {
    alertId: 'ALT-1031',
    title: 'Scheduled Night Travel Curfew Reminder',
    corridor: 'NH-29',
    severity: 'LOW',
    trigger: 'Time == 19:00 IST',
    channels: 'In-App, Push',
    created: '08 Sep 19:00 IST',
    sent: '08 Sep 19:00 IST',
    acknowledged: '08 Sep 19:05 IST',
    acknowledgedBy: 'Auto-Ack by Convoys 01-18',
    actionTaken: 'Convoys safely parked at Chumukedima Staging Depot'
  }
];
