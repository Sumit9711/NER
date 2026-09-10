// Analytics & Logistics Intelligence Datasets for NER Logistics Platform
// All datasets have explicit units, visible ranges, and zero decorative padding

// 1. Delivery Delays across Corridors (Unit: Minutes)
export const DELIVERY_DELAYS_DATA = [
  { corridor: 'NH-6', avgDelayMinutes: 110, maxDelayMinutes: 190, delayedVehicles: 12, name: 'Jorabat - Shillong - Silchar' },
  { corridor: 'NH-29', avgDelayMinutes: 145, maxDelayMinutes: 280, delayedVehicles: 8, name: 'Dimapur - Kohima - Imphal' },
  { corridor: 'NH-10', avgDelayMinutes: 125, maxDelayMinutes: 210, delayedVehicles: 6, name: 'Siliguri - Teesta - Gangtok' },
  { corridor: 'NH-37', avgDelayMinutes: 45, maxDelayMinutes: 90, delayedVehicles: 14, name: 'Guwahati - Jorhat - Dibrugarh' },
  { corridor: 'NH-27', avgDelayMinutes: 75, maxDelayMinutes: 140, delayedVehicles: 9, name: 'Lumding - Haflong - Silchar' },
  { corridor: 'NH-306', avgDelayMinutes: 55, maxDelayMinutes: 85, delayedVehicles: 5, name: 'Silchar - Kolasib - Aizawl' },
  { corridor: 'NH-13', avgDelayMinutes: 15, maxDelayMinutes: 30, delayedVehicles: 2, name: 'Trans-Arunachal Highway' }
];

// 2. Incident Frequency by Hazard Type (Unit: Number of verified incidents logged)
export const INCIDENT_FREQUENCY_DATA = [
  { month: 'May', landslides: 14, flashFloods: 4, mudslides: 8, rockfalls: 6, total: 32 },
  { month: 'Jun', landslides: 28, flashFloods: 16, mudslides: 19, rockfalls: 12, total: 75 },
  { month: 'Jul', landslides: 42, flashFloods: 24, mudslides: 31, rockfalls: 18, total: 115 },
  { month: 'Aug', landslides: 38, flashFloods: 21, mudslides: 26, rockfalls: 15, total: 100 },
  { month: 'Sep (Current)', landslides: 34, flashFloods: 18, mudslides: 22, rockfalls: 14, total: 88 },
  { month: 'Oct (Proj)', landslides: 18, flashFloods: 8, mudslides: 11, rockfalls: 9, total: 46 }
];

// 3. 7-Day Regional Risk Trend vs Rainfall Saturation (Units: Risk Index 0-100, Rainfall in mm)
export const RISK_TREND_DATA = [
  { day: '04 Sep', regionalRiskScore: 48, rainfallMm: 34, criticalSectors: 2 },
  { day: '05 Sep', regionalRiskScore: 54, rainfallMm: 52, criticalSectors: 3 },
  { day: '06 Sep', regionalRiskScore: 61, rainfallMm: 78, criticalSectors: 4 },
  { day: '07 Sep', regionalRiskScore: 72, rainfallMm: 124, criticalSectors: 6 },
  { day: '08 Sep', regionalRiskScore: 68, rainfallMm: 96, criticalSectors: 5 },
  { day: '09 Sep', regionalRiskScore: 65, rainfallMm: 82, criticalSectors: 5 },
  { day: '10 Sep (Today)', regionalRiskScore: 64, rainfallMm: 76, criticalSectors: 4 }
];

// 4. Vehicle Activity across 24h Time of Day (Unit: Convoy Count)
export const VEHICLE_ACTIVITY_DATA = [
  { timeHour: '00:00', moving: 6, stagingHold: 28, delayed: 8 },
  { timeHour: '03:00', moving: 8, stagingHold: 26, delayed: 8 },
  { timeHour: '06:00', moving: 24, stagingHold: 12, delayed: 6 },
  { timeHour: '09:00', moving: 32, stagingHold: 4, delayed: 6 },
  { timeHour: '12:00', moving: 28, stagingHold: 6, delayed: 8 },
  { timeHour: '15:00', moving: 26, stagingHold: 8, delayed: 8 },
  { timeHour: '18:00', moving: 18, stagingHold: 16, delayed: 8 },
  { timeHour: '21:00', moving: 10, stagingHold: 24, delayed: 8 }
];

// 5. Route Accessibility Percentage by NER State (Unit: % Open & Operable)
export const ROUTE_ACCESSIBILITY_DATA = [
  { state: 'Assam', accessiblePct: 94, blockedKm: 42, totalKm: 3940 },
  { state: 'Tripura', accessiblePct: 88, blockedKm: 65, totalKm: 1240 },
  { state: 'Arunachal', accessiblePct: 82, blockedKm: 180, totalKm: 2860 },
  { state: 'Mizoram', accessiblePct: 74, blockedKm: 210, totalKm: 1480 },
  { state: 'Manipur', accessiblePct: 70, blockedKm: 245, totalKm: 1750 },
  { state: 'Meghalaya', accessiblePct: 68, blockedKm: 280, totalKm: 1620 },
  { state: 'Nagaland', accessiblePct: 62, blockedKm: 320, totalKm: 1540 },
  { state: 'Sikkim', accessiblePct: 54, blockedKm: 310, totalKm: 980 }
];

// 6. Alert Response Time (MTTR) by District Disaster Cell (Unit: Minutes to Acknowledge)
export const ALERT_RESPONSE_TIME_DATA = [
  { district: 'East Khasi Hills (Shillong)', mttrMinutes: 3.2, alertsReceived: 42, targetMinutes: 5 },
  { district: 'Kamrup Metro (Guwahati)', mttrMinutes: 2.4, alertsReceived: 68, targetMinutes: 5 },
  { district: 'Kohima (Nagaland)', mttrMinutes: 6.8, alertsReceived: 28, targetMinutes: 5 },
  { district: 'Cachar (Silchar)', mttrMinutes: 4.5, alertsReceived: 36, targetMinutes: 5 },
  { district: 'Kalimpong (Sikkim Axis)', mttrMinutes: 5.6, alertsReceived: 24, targetMinutes: 5 },
  { district: 'Aizawl (Mizoram)', mttrMinutes: 4.1, alertsReceived: 22, targetMinutes: 5 },
  { district: 'Imphal West (Manipur)', mttrMinutes: 7.2, alertsReceived: 31, targetMinutes: 5 }
];

// 7. Successful Deliveries Over Past 6 Weeks (Unit: Metric Tonnes (MT))
export const SUCCESSFUL_DELIVERIES_DATA = [
  { week: 'Wk 32 (Aug 1)', onTimeMT: 1420, delayedMT: 280, totalMT: 1700 },
  { week: 'Wk 33 (Aug 8)', onTimeMT: 1510, delayedMT: 340, totalMT: 1850 },
  { week: 'Wk 34 (Aug 15)', onTimeMT: 1380, delayedMT: 460, totalMT: 1840 },
  { week: 'Wk 35 (Aug 22)', onTimeMT: 1640, delayedMT: 390, totalMT: 2030 },
  { week: 'Wk 36 (Aug 29)', onTimeMT: 1720, delayedMT: 320, totalMT: 2040 },
  { week: 'Wk 37 (Current)', onTimeMT: 1840, delayedMT: 300, totalMT: 2140 }
];
