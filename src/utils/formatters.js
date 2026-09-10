// Utility formatters for NER Emergency Logistics

export const formatDistance = (km) => {
  if (km === undefined || km === null) return '0 km';
  return `${Number(km).toLocaleString('en-IN')} km`;
};

export const formatWeight = (tonnes) => {
  if (tonnes === undefined || tonnes === null) return '0 MT';
  return `${Number(tonnes).toLocaleString('en-IN')} MT`;
};

export const formatIndianDate = (dateString) => {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export const formatIndianTime = (dateString) => {
  if (!dateString) return '--';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export const formatDurationHours = (hours) => {
  if (hours === undefined || hours === null) return '0h';
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
};
