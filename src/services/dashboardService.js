// Dashboard Data & Telemetry Service for NER Command Center
import {
  DASHBOARD_KPIS,
  VEHICLE_ACTIVITY,
  CRITICAL_ALERTS,
  RECENT_INCIDENTS,
  HIGH_RISK_CORRIDORS,
  WEATHER_CONDITIONS
} from '../data/mockDashboardData';

import {
  MAP_CENTER,
  MAP_DEFAULT_ZOOM,
  HUB_CITIES,
  MAP_VEHICLES,
  MAP_INCIDENTS,
  MAP_RISK_ZONES,
  MAP_ROUTES,
  BLOCKED_ROAD_SEGMENTS,
  RECOMMENDED_ROUTES,
  NER_DISTRICTS,
  COMMODITY_CATEGORIES
} from '../data/mapData';

export const dashboardService = {
  getKPIs() {
    return DASHBOARD_KPIS;
  },

  getMapTelemetry() {
    return {
      center: MAP_CENTER,
      zoom: MAP_DEFAULT_ZOOM,
      hubs: HUB_CITIES,
      vehicles: MAP_VEHICLES,
      incidents: MAP_INCIDENTS,
      riskZones: MAP_RISK_ZONES,
      routes: MAP_ROUTES,
      blockedRoads: BLOCKED_ROAD_SEGMENTS,
      recommendedRoutes: RECOMMENDED_ROUTES
    };
  },

  getVehicles() {
    return MAP_VEHICLES;
  },

  getVehicleById(id) {
    if (!id) return MAP_VEHICLES[0];
    const found = MAP_VEHICLES.find(
      (v) => v.id.toLowerCase() === String(id).toLowerCase()
    );
    return found || MAP_VEHICLES[0];
  },

  getDistricts() {
    return NER_DISTRICTS;
  },

  getCommodities() {
    return COMMODITY_CATEGORIES;
  },

  getRecommendedRoutes() {
    return RECOMMENDED_ROUTES;
  },

  getCriticalAlerts() {
    return CRITICAL_ALERTS;
  },

  getRecentIncidents() {
    return RECENT_INCIDENTS;
  },

  getHighRiskCorridors() {
    return HIGH_RISK_CORRIDORS;
  },

  getVehicleActivity() {
    return VEHICLE_ACTIVITY;
  },

  getWeatherConditions() {
    return WEATHER_CONDITIONS;
  }
};

