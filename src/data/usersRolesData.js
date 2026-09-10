// Users & Role-Based Access Control (RBAC) Datasets for NER Platform

export const SYSTEM_ROLES = [
  {
    id: 'coordinator',
    name: 'Government Logistics Coordinator',
    category: 'Executive Command',
    description: 'Central authority overseeing regional multi-modal supply corridors, approving emergency detours, and coordinating inter-state relief manifests.',
    badgeColor: 'bg-red-700 text-white border-red-500',
    allowedRoutes: [
      '/dashboard',
      '/live-map',
      '/vehicles',
      '/incidents',
      '/risk-intelligence',
      '/route-recommendations',
      '/eta-delays',
      '/alerts',
      '/deliveries',
      '/field-reports',
      '/analytics',
      '/users-roles',
      '/audit-logs'
    ]
  },
  {
    id: 'districtAuthority',
    name: 'District Authority',
    category: 'District Administration',
    description: 'District Magistrates and Disaster Management Officers managing district bypass routes, local staging depots, and relief distributions.',
    badgeColor: 'bg-blue-700 text-white border-blue-500',
    allowedRoutes: [
      '/dashboard',
      '/live-map',
      '/incidents',
      '/risk-intelligence',
      '/route-recommendations',
      '/alerts',
      '/deliveries',
      '/field-reports',
      '/analytics',
      '/audit-logs'
    ]
  },
  {
    id: 'fieldOfficer',
    name: 'Field Officer',
    category: 'Ground Verification',
    description: 'PWD Assistant Engineers, police escorts, and border checkpost officers reporting on-ground mudslides, verifying carriage width, and offline queuing.',
    badgeColor: 'bg-emerald-700 text-white border-emerald-500',
    allowedRoutes: [
      '/dashboard',
      '/incidents',
      '/field-reports',
      '/alerts',
      '/live-map'
    ]
  },
  {
    id: 'emergencyResponse',
    name: 'Emergency Response Team',
    category: 'Disaster Relief & NDRF',
    description: 'National Disaster Response Force (NDRF), SDRF, and medical emergency teams executing immediate triage, pilot escorts, and hazard broadcasts.',
    badgeColor: 'bg-amber-700 text-white border-amber-500',
    allowedRoutes: [
      '/dashboard',
      '/live-map',
      '/incidents',
      '/alerts',
      '/route-recommendations',
      '/vehicles',
      '/field-reports'
    ]
  },
  {
    id: 'driver',
    name: 'Transport Operator / Driver',
    category: 'Fleet Operations',
    description: 'Civil and military relief convoy drivers navigating hazardous mountain passes, receiving reroute turn-by-turn guidance, and acknowledging alerts.',
    badgeColor: 'bg-cyan-700 text-white border-cyan-500',
    allowedRoutes: [
      '/dashboard',
      '/live-map',
      '/vehicles',
      '/route-recommendations',
      '/eta-delays',
      '/alerts'
    ]
  },
  {
    id: 'sysAdmin',
    name: 'System Administrator',
    category: 'IT & Security Governance',
    description: 'Security officers managing NIC cryptographic tokens, SHA-256 ledger integrity, telemetry API endpoints, and user role provisioning.',
    badgeColor: 'bg-purple-700 text-white border-purple-500',
    allowedRoutes: [
      '/dashboard',
      '/live-map',
      '/vehicles',
      '/incidents',
      '/risk-intelligence',
      '/route-recommendations',
      '/eta-delays',
      '/alerts',
      '/deliveries',
      '/field-reports',
      '/analytics',
      '/users-roles',
      '/audit-logs'
    ]
  }
];

// User Table Data with exact user-specified columns: Name, Role, District, Status, Last Active, Actions
export const USERS_TABLE_DATA = [
  {
    id: 'USR-01',
    name: 'Lt. Gen. Rajeshwar Singh (Retd.)',
    email: 'r.singh@doner.gov.in',
    role: 'Government Logistics Coordinator',
    roleId: 'coordinator',
    district: 'Kamrup Metro (Guwahati)',
    state: 'Assam',
    status: 'ACTIVE',
    lastActive: '2 mins ago',
    avatarInitials: 'RS',
    tokenVerified: true
  },
  {
    id: 'USR-02',
    name: 'Dr. L. Sangma, IAS',
    email: 'dc.shillong@meg.gov.in',
    role: 'District Authority',
    roleId: 'districtAuthority',
    district: 'East Khasi Hills (Shillong)',
    state: 'Meghalaya',
    status: 'ACTIVE',
    lastActive: '10 mins ago',
    avatarInitials: 'LS',
    tokenVerified: true
  },
  {
    id: 'USR-03',
    name: 'P. K. Sangma (Asst. Engineer)',
    email: 'pk.sangma@pwd.meg.gov.in',
    role: 'Field Officer',
    roleId: 'fieldOfficer',
    district: 'Ri-Bhoi (Nongpoh)',
    state: 'Meghalaya',
    status: 'ON_DUTY',
    lastActive: '1 min ago',
    avatarInitials: 'PS',
    tokenVerified: true
  },
  {
    id: 'USR-04',
    name: 'Col. Vikramjit Roy',
    email: 'v.roy@ndrf.gov.in',
    role: 'Emergency Response Team',
    roleId: 'emergencyResponse',
    district: 'Cachar (Silchar)',
    state: 'Assam',
    status: 'ACTIVE',
    lastActive: '5 mins ago',
    avatarInitials: 'VR',
    tokenVerified: true
  },
  {
    id: 'USR-05',
    name: 'Havildar P. Angami',
    email: 'p.angami@convoy.gov.in',
    role: 'Transport Operator / Driver',
    roleId: 'driver',
    district: 'Kohima',
    state: 'Nagaland',
    status: 'IN_TRANSIT',
    lastActive: 'Just now (GPS active)',
    avatarInitials: 'PA',
    tokenVerified: true
  },
  {
    id: 'USR-06',
    name: 'Ananya Sharma (NIC Lead)',
    email: 'a.sharma@nic.in',
    role: 'System Administrator',
    roleId: 'sysAdmin',
    district: 'Central Command HQ',
    state: 'Regional',
    status: 'ACTIVE',
    lastActive: '8 mins ago',
    avatarInitials: 'AS',
    tokenVerified: true
  },
  {
    id: 'USR-07',
    name: 'Tage Duyu (Agri Escort)',
    email: 't.duyu@arunachal.gov.in',
    role: 'Field Officer',
    roleId: 'fieldOfficer',
    district: 'Lower Subansiri (Ziro)',
    state: 'Arunachal Pradesh',
    status: 'ON_DUTY',
    lastActive: '18 mins ago',
    avatarInitials: 'TD',
    tokenVerified: true
  },
  {
    id: 'USR-08',
    name: 'Rajen Das (FCI Pilot 02)',
    email: 'rajen.das@fci.gov.in',
    role: 'Transport Operator / Driver',
    roleId: 'driver',
    district: 'Dima Hasao (Haflong)',
    state: 'Assam',
    status: 'IN_TRANSIT',
    lastActive: '4 mins ago',
    avatarInitials: 'RD',
    tokenVerified: true
  }
];

export const checkRoutePermission = (userRole, routePath) => {
  if (!userRole) return true; // default allow if unspecified
  const roleObj = SYSTEM_ROLES.find(r => r.name === userRole || r.id === userRole);
  if (!roleObj) return true;
  return roleObj.allowedRoutes.includes(routePath);
};
