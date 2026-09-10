// High-contrast, accessible status color classes for Government Command Center

export const STATUS_TYPES = {
  OPERATIONAL: 'OPERATIONAL',
  HIGH_RISK: 'HIGH_RISK',
  BLOCKED: 'BLOCKED',
  DELAYED: 'DELAYED',
  IN_TRANSIT: 'IN_TRANSIT',
  DELIVERED: 'DELIVERED',
  RESOLVED: 'RESOLVED',
  CRITICAL: 'CRITICAL',
  ADVISORY: 'ADVISORY',
  ELEVATED: 'ELEVATED'
};

export const getStatusBadgeStyle = (status) => {
  const normalized = String(status).toUpperCase();
  switch (normalized) {
    case 'OPERATIONAL':
    case 'CLEAR':
    case 'DELIVERED':
    case 'NORMAL':
    case 'RESOLVED':
      return {
        bg: 'bg-emerald-950',
        text: 'text-emerald-300',
        border: 'border-emerald-600',
        dot: 'bg-emerald-400',
        label: status
      };

    case 'DELAYED':
    case 'ELEVATED':
    case 'CAUTION':
    case 'MONITORING':
    case 'ADVISORY':
      return {
        bg: 'bg-amber-950',
        text: 'text-amber-300',
        border: 'border-amber-600',
        dot: 'bg-amber-400',
        label: status
      };

    case 'BLOCKED':
    case 'CRITICAL':
    case 'HIGH_RISK':
    case 'HAZARD':
    case 'EMERGENCY':
      return {
        bg: 'bg-red-950',
        text: 'text-red-200',
        border: 'border-red-600',
        dot: 'bg-red-500',
        label: status
      };

    case 'IN_TRANSIT':
    case 'DISPATCHED':
    case 'ACTIVE':
    default:
      return {
        bg: 'bg-blue-950',
        text: 'text-blue-300',
        border: 'border-blue-600',
        dot: 'bg-blue-400',
        label: status
      };
  }
};

export const getHazardLevelClass = (level) => {
  switch (String(level).toLowerCase()) {
    case 'high':
    case 'critical':
    case 'severe':
      return 'bg-red-900/80 text-red-100 border-red-500 font-bold';
    case 'moderate':
    case 'medium':
      return 'bg-amber-900/80 text-amber-100 border-amber-500 font-bold';
    case 'low':
      return 'bg-emerald-900/80 text-emerald-100 border-emerald-500 font-semibold';
    default:
      return 'bg-slate-800 text-slate-200 border-slate-600';
  }
};
