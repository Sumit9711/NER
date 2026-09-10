// Audit Log Dataset for NER Platform (SHA-256 Ledger Backed)

export const AUDIT_MODULES = [
  'All Modules',
  'Incidents',
  'Route Recommendations',
  'Risk Intelligence',
  'Alerts',
  'Deliveries',
  'Field Reports',
  'Authentication'
];

export const AUDIT_STATUSES = [
  'All Statuses',
  'VERIFIED',
  'APPROVED',
  'SUBMITTED',
  'DISPATCHED',
  'ACKNOWLEDGED',
  'GENERATED'
];

export const AUDIT_LOGS_DATA = [
  // 1. Exact Specified Example 1
  {
    id: 'AUD-9042',
    user: 'P. K. Sangma (Field Officer)',
    userRole: 'Field Officer',
    action: 'Field Officer submitted incident INC-1042',
    module: 'Incidents',
    timestamp: 'Today 10:42:15 IST',
    status: 'SUBMITTED',
    detail: 'Logged 45m dual-lane road blockage at NH-6 Mile 28 with GPS coordinates (25.6120° N, 91.9210° E) and photo evidence.',
    ipAddress: '10.14.22.84 (Mobile PWD Net)',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  // 2. Exact Specified Example 2
  {
    id: 'AUD-9043',
    user: 'Dr. Sunita Barua (Coordinator)',
    userRole: 'Government Logistics Coordinator',
    action: 'Coordinator verified incident INC-1042',
    module: 'Incidents',
    timestamp: 'Today 10:43:30 IST',
    status: 'VERIFIED',
    detail: 'Elevated status from Reported to Verified following Meghalaya PWD Mobile Patrol radio confirmation.',
    ipAddress: '10.12.100.12 (Shillong Central Node)',
    hash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
  },
  // 3. Exact Specified Example 3
  {
    id: 'AUD-9044',
    user: 'NER-GeoDisrupt AI Engine (v3.4)',
    userRole: 'AI / Automated System',
    action: 'Risk engine generated prediction',
    module: 'Risk Intelligence',
    timestamp: 'Today 10:44:02 IST',
    status: 'GENERATED',
    detail: 'Multi-factor hybrid model generated 86/100 Disruption Risk for NH-6 and estimated 4.5h clearance duration.',
    ipAddress: '10.8.0.5 (Autonomous ML Cluster)',
    hash: 'f24c6539c30e129ac716147b2354725f76f839e51599290e9d425d0ad987d6b3'
  },
  // 4. Exact Specified Example 4
  {
    id: 'AUD-9045',
    user: 'Lt. Gen. Rajeshwar Singh (Coordinator)',
    userRole: 'Government Logistics Coordinator',
    action: 'Coordinator approved alternate route',
    module: 'Route Recommendations',
    timestamp: 'Today 10:44:45 IST',
    status: 'APPROVED',
    detail: 'Rerouted convoys MED-07 and SUPPLY-08 via Mawryngkneng-Umsning Bypass (329 km); held multi-axle tankers at Barapani.',
    ipAddress: '10.12.100.10 (Executive Console)',
    hash: 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  },
  // 5. Exact Specified Example 5
  {
    id: 'AUD-9046',
    user: 'NER-EscalateNet Rules Engine',
    userRole: 'AI / Automated System',
    action: 'Critical alert sent',
    module: 'Alerts',
    timestamp: 'Today 10:45:01 IST',
    status: 'DISPATCHED',
    detail: 'Dispatched deterministic critical hazard alert ALT-1042 across In-App, Push, and SMS gateways.',
    ipAddress: '10.8.0.9 (Alert Multi-Cast Bus)',
    hash: 'cb8379ac2098aa165029e3938a51da0bcecfc008fd6795f401178647f96c5b34'
  },
  // 6. Exact Specified Example 6
  {
    id: 'AUD-9047',
    user: 'Havildar P. Angami (Driver)',
    userRole: 'Transport Operator / Driver',
    action: 'Driver acknowledged alert',
    module: 'Alerts',
    timestamp: 'Today 10:45:40 IST',
    status: 'ACKNOWLEDGED',
    detail: 'Convoy MED-07 pilot acknowledged detour order via onboard mobile tablet; altered trajectory towards bypass route.',
    ipAddress: '10.24.180.44 (4G GPRS In-Cab OBD)',
    hash: '38274577f884177d4669894cf6ba76f827e8a93aa462fb52ce79eb53e7f4c514'
  },
  // Additional realistic audit records
  {
    id: 'AUD-9048',
    user: 'Dr. L. Sangma (District Authority)',
    userRole: 'District Authority',
    action: 'Approved emergency relief manifest DEL-8905',
    module: 'Deliveries',
    timestamp: 'Today 09:30:12 IST',
    status: 'APPROVED',
    detail: 'Granted toll clearance and heavy axle weight waiver for pre-stressed bridge girders.',
    ipAddress: '10.16.50.2 (East Khasi Hills EOC)',
    hash: '7d1a54127b222502f5b79b5fb0803061152a44f92b37e23c65dd00417e42f32f'
  },
  {
    id: 'AUD-9049',
    user: 'SYSTEM NIC 2FA GATEWAY',
    userRole: 'System Administrator',
    action: 'Cryptographic token authentication verified',
    module: 'Authentication',
    timestamp: 'Today 08:00:00 IST',
    status: 'VERIFIED',
    detail: '2FA biometric hardware token handshake completed for 42 authorized command operators.',
    ipAddress: '10.1.1.1 (National Informatics Centre)',
    hash: '8f434346648f6b96df89dda901c5176b10e6d059612d556b925b65104be66a01'
  }
];
