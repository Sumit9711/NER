// Incident & Offline Field Reporting Service
import { INCIDENT_RECORDS, INCIDENT_STATUSES, INCIDENT_TYPES } from '../data/incidentData';

const OFFLINE_STORAGE_KEY = 'ner_field_reports_offline_state';

const DEFAULT_OFFLINE_STATE = {
  networkState: 'Online', // 'Online' | 'Limited Connectivity' | 'Offline'
  pendingCount: 3,
  syncedCount: 18,
  lastSyncTime: '10:42 AM',
  pendingReports: [
    {
      id: 'DRAFT-NER-901',
      incidentType: 'Landslide',
      severity: 'HIGH',
      location: 'NH-6 Mawryngkneng Bypass Cut',
      gpsLocation: '25.5520° N, 92.0510° E',
      dateTime: 'Today 10:20 AM',
      description: 'Minor rock slippage near culvert #4. Single lane moving.',
      hasPhoto: true,
      syncStatus: 'PENDING_SYNC'
    },
    {
      id: 'DRAFT-NER-902',
      incidentType: 'Flash Flood',
      severity: 'CRITICAL',
      location: 'NH-10 Sevoke Overbridge Sinking',
      gpsLocation: '26.8850° N, 88.4730° E',
      dateTime: 'Today 10:35 AM',
      description: 'Water surge height 0.6m above bridge deck. Multi-axle holding.',
      hasPhoto: true,
      syncStatus: 'PENDING_SYNC'
    },
    {
      id: 'DRAFT-NER-903',
      incidentType: 'Mudslide',
      severity: 'MODERATE',
      location: 'NH-29 Chumukedima Mile 12',
      gpsLocation: '25.8200° N, 93.7700° E',
      dateTime: 'Today 10:40 AM',
      description: 'Slurry runoff over shoulder. Caution flag raised.',
      hasPhoto: false,
      syncStatus: 'PENDING_SYNC'
    }
  ],
  syncedReports: []
};

// In-memory incidents state allowing real-time verify/reject/block updates
let incidentsCache = [...INCIDENT_RECORDS];

export const incidentService = {
  getIncidents(filters = {}) {
    let result = [...incidentsCache];

    if (filters.severity && filters.severity !== 'ALL') {
      result = result.filter((inc) => inc.severity.toUpperCase() === filters.severity.toUpperCase());
    }

    if (filters.district && filters.district !== 'All Districts') {
      result = result.filter((inc) => inc.district === filters.district);
    }

    if (filters.incidentType && filters.incidentType !== 'All Types') {
      result = result.filter((inc) => inc.type.toLowerCase().includes(filters.incidentType.toLowerCase()));
    }

    if (filters.status && filters.status !== 'All Statuses') {
      result = result.filter((inc) => inc.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.date) {
      result = result.filter((inc) => inc.reportedDate === filters.date);
    }

    return result;
  },

  getIncidentById(id) {
    if (!id) return incidentsCache[0];
    const found = incidentsCache.find((inc) => inc.id.toLowerCase() === String(id).toLowerCase());
    return found || incidentsCache[0];
  },

  updateIncidentStatus(id, newStatus) {
    incidentsCache = incidentsCache.map((inc) => {
      if (inc.id.toLowerCase() === String(id).toLowerCase()) {
        return { ...inc, status: newStatus };
      }
      return inc;
    });
    return this.getIncidentById(id);
  },

  markRoadBlocked(id) {
    incidentsCache = incidentsCache.map((inc) => {
      if (inc.id.toLowerCase() === String(id).toLowerCase()) {
        return {
          ...inc,
          severity: 'CRITICAL',
          status: 'Verified',
          riskImpact: 'TOTAL ROADBLOCK & TRAFFIC HALT'
        };
      }
      return inc;
    });
    return this.getIncidentById(id);
  },

  // OFFLINE REPORTING STATE MANAGEMENT
  getOfflineState() {
    try {
      const stored = localStorage.getItem(OFFLINE_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to read offline state:', e);
    }
    return DEFAULT_OFFLINE_STATE;
  },

  setNetworkState(newState) {
    const current = this.getOfflineState();
    const updated = { ...current, networkState: newState };
    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  saveFieldReport(reportData, networkState) {
    const current = this.getOfflineState();
    const isOfflineOrLimited = networkState === 'Offline' || networkState === 'Limited Connectivity';

    const newReport = {
      id: `FLD-NER-${Math.floor(1000 + Math.random() * 9000)}`,
      ...reportData,
      dateTime: reportData.dateTime || new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      syncStatus: isOfflineOrLimited ? 'PENDING_SYNC' : 'SYNCED'
    };

    let updated;
    if (isOfflineOrLimited) {
      updated = {
        ...current,
        networkState,
        pendingCount: current.pendingCount + 1,
        pendingReports: [newReport, ...current.pendingReports]
      };
    } else {
      updated = {
        ...current,
        networkState: 'Online',
        syncedCount: current.syncedCount + 1,
        lastSyncTime: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        syncedReports: [newReport, ...current.syncedReports]
      };
    }

    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(updated));
    return { report: newReport, state: updated };
  },

  syncPendingReports() {
    const current = this.getOfflineState();
    const currentTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const updated = {
      ...current,
      networkState: 'Online',
      syncedCount: current.syncedCount + current.pendingCount,
      pendingCount: 0,
      lastSyncTime: currentTime,
      syncedReports: [...current.pendingReports, ...current.syncedReports],
      pendingReports: []
    };

    localStorage.setItem(OFFLINE_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  }
};
