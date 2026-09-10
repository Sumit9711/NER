// Authentication & RBAC Authorization Service for NER Platform
import { SYSTEM_ROLES, checkRoutePermission } from '../data/usersRolesData';

const AUTH_STORAGE_KEY = 'ner_command_center_session';

export const DEMO_ROLES = [
  {
    id: 'coordinator',
    roleId: 'coordinator',
    name: 'Lt. Gen. Rajeshwar Singh (Retd.)',
    role: 'Government Logistics Coordinator',
    agency: 'Ministry of Development of North Eastern Region (MDoNER)',
    district: 'Kamrup Metro (Guwahati)',
    badge: 'LOGISTICS COORDINATOR',
    badgeColor: 'bg-red-700 text-white border border-red-500',
    avatarInitials: 'RS'
  },
  {
    id: 'districtAuthority',
    roleId: 'districtAuthority',
    name: 'Dr. L. Sangma, IAS',
    role: 'District Authority',
    agency: 'District Disaster Management Authority (DDMA)',
    district: 'East Khasi Hills (Shillong)',
    badge: 'DISTRICT AUTHORITY',
    badgeColor: 'bg-blue-700 text-white border border-blue-500',
    avatarInitials: 'LS'
  },
  {
    id: 'fieldOfficer',
    roleId: 'fieldOfficer',
    name: 'P. K. Sangma (Asst. Engineer)',
    role: 'Field Officer',
    agency: 'Meghalaya PWD & Mobile Highway Escort',
    district: 'Ri-Bhoi (Nongpoh)',
    badge: 'FIELD OFFICER',
    badgeColor: 'bg-emerald-700 text-white border border-emerald-500',
    avatarInitials: 'PS'
  },
  {
    id: 'emergencyResponse',
    roleId: 'emergencyResponse',
    name: 'Col. Vikramjit Roy',
    role: 'Emergency Response Team',
    agency: 'NDRF 1st & 12th Battalions (NER Command)',
    district: 'Cachar (Silchar)',
    badge: 'NDRF COMMANDER',
    badgeColor: 'bg-amber-700 text-white border border-amber-500',
    avatarInitials: 'VR'
  },
  {
    id: 'driver',
    roleId: 'driver',
    name: 'Havildar P. Angami',
    role: 'Transport Operator / Driver',
    agency: 'Critical Medical Supply Convoy MED-07',
    district: 'Kohima (Nagaland)',
    badge: 'CONVOY PILOT',
    badgeColor: 'bg-cyan-700 text-white border border-cyan-500',
    avatarInitials: 'PA'
  },
  {
    id: 'sysAdmin',
    roleId: 'sysAdmin',
    name: 'Ananya Sharma (NIC Lead)',
    role: 'System Administrator',
    agency: 'National Informatics Centre (NIC Security Cell)',
    district: 'Central Command HQ',
    badge: 'SYSTEM ADMIN',
    badgeColor: 'bg-purple-700 text-white border border-purple-500',
    avatarInitials: 'AS'
  }
];

export const authService = {
  getCurrentUser() {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure roleId exists
        if (!parsed.roleId) {
          const match = DEMO_ROLES.find(r => r.id === parsed.id || r.role === parsed.role);
          parsed.roleId = match ? match.roleId : 'coordinator';
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to read auth session:', e);
    }
    // Default to Government Logistics Coordinator
    return DEMO_ROLES[0];
  },

  login(credentials) {
    const { roleId = 'coordinator', customEmail = '' } = credentials || {};
    const selectedRole = DEMO_ROLES.find(r => r.id === roleId || r.roleId === roleId) || DEMO_ROLES[0];
    
    const userSession = {
      ...selectedRole,
      email: customEmail || `${selectedRole.id}@doner.gov.in`,
      loginTime: new Date().toISOString(),
      sessionId: `SEC-NER-${Math.floor(100000 + Math.random() * 900000)}`
    };

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userSession));
    } catch (e) {
      console.warn('Failed to persist auth session:', e);
    }
    return userSession;
  },

  logout() {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear auth session:', e);
    }
  },

  canAccess(user, routePath) {
    if (!user) return true;
    return checkRoutePermission(user.roleId || user.role, routePath);
  }
};
