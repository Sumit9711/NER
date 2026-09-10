import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { 
  Radio, 
  RefreshCw, 
  Download, 
  MapPin, 
  ShieldAlert, 
  Clock, 
  Compass, 
  Share2,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { MetricCard } from '../components/common/MetricCard';
import { MapPanel } from '../components/dashboard/MapPanel';
import { CriticalAlertsSection } from '../components/dashboard/CriticalAlertsSection';
import { RecentIncidentsSection } from '../components/dashboard/RecentIncidentsSection';
import { HighRiskCorridorsSection } from '../components/dashboard/HighRiskCorridorsSection';
import { VehicleActivitySection } from '../components/dashboard/VehicleActivitySection';
import { WeatherConditionsSection } from '../components/dashboard/WeatherConditionsSection';
import { QuickActionDeck } from '../components/dashboard/QuickActionDeck';

export const Dashboard = () => {
  const { selectedSector } = useOutletContext();
  const navigate = useNavigate();

  // Retrieve mock data through service abstraction
  const kpis = dashboardService.getKPIs();
  const alerts = dashboardService.getCriticalAlerts();
  const incidents = dashboardService.getRecentIncidents();
  const corridors = dashboardService.getHighRiskCorridors();
  const vehicles = dashboardService.getVehicleActivity();
  const weather = dashboardService.getWeatherConditions();

  const handleAlertAction = (alertItem) => {
    navigate('/route-recommendations');
  };

  return (
    <div className="space-y-6">
      {/* 5-10 Second Instant Situation Briefing Bar */}
      <section
        aria-label="Current Situation Briefing"
        className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="flex items-center gap-1.5 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider animate-pulse">
              <Radio className="w-3.5 h-3.5" />
              <span>SITUATION BRIEFING: DEFCON-2</span>
            </span>
            <span className="text-xs font-bold text-slate-400">
              Updated Live &bull; Ground Satellite Sync
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight">
            What is happening right now in the North Eastern Region?
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed">
            <strong className="text-red-400 font-black">2 Critical Highway Closures:</strong> NH-29 Chumukedima (Mile 14 rockslide) and NH-10 (Teesta River flood surge).
            &bull; <strong className="text-blue-300 font-bold">42 Active Vehicles</strong> (5 currently moving, 6 deliveries delayed).
            &bull; <strong className="text-amber-300 font-bold">Average Delay: +42 min</strong> across hill transit passes.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => window.location.reload()}
            className="min-h-[44px] px-4 py-2 bg-slate-900 hover:bg-slate-750 border-2 border-slate-600 text-slate-200 hover:text-white rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow"
            title="Force refresh live telemetry"
          >
            <RefreshCw className="w-4 h-4 text-blue-400" />
            <span>Sync Live Feed</span>
          </button>

          <button
            onClick={() => alert('Exporting Government SitRep (Situation Report) PDF for NER State Administrations...')}
            className="min-h-[44px] px-4 py-2 bg-blue-700 hover:bg-blue-600 border-2 border-blue-500 text-white rounded-lg text-xs sm:text-sm font-black flex items-center gap-2 transition-all shadow-md"
            title="Download executive briefing"
          >
            <Download className="w-4 h-4" />
            <span>Export SitRep PDF</span>
          </button>
        </div>
      </section>

      {/* 6 Large, Highly Readable KPI Cards */}
      <section aria-label="Key Performance Indicators" className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
            Real-Time Logistics Metrics &bull; 6 Core Indicators
          </h2>
          <span className="text-xs font-bold text-slate-400">Target SLA: 95% Passability</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4">
          {kpis.map((kpi) => (
            <MetricCard
              key={kpi.id}
              title={kpi.title}
              value={kpi.value}
              subtext={kpi.subtext}
              badgeText={kpi.badgeText}
              badgeType={kpi.badgeType}
              trend={kpi.trend}
              iconName={kpi.iconName}
              accentColor={kpi.accentColor}
            />
          ))}
        </div>
      </section>

      {/* Tactical Emergency Actions Bar */}
      <section aria-label="Emergency Tactical Actions">
        <QuickActionDeck />
      </section>

      {/* Large React Leaflet + OpenStreetMap GIS Map Panel */}
      <section aria-label="GIS Telemetry Map">
        <MapPanel />
      </section>

      {/* 2-Column Responsive Grid for Tactical Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Critical Alerts & High-Risk Corridors */}
        <div className="space-y-6">
          <CriticalAlertsSection alerts={alerts} onAction={handleAlertAction} />
          <HighRiskCorridorsSection corridors={corridors} onSelectCorridor={() => navigate('/live-map')} />
        </div>

        {/* Right Column: Recent Incidents & Vehicle Activity */}
        <div className="space-y-6">
          <RecentIncidentsSection incidents={incidents} />
          <VehicleActivitySection vehicles={vehicles} />
        </div>
      </div>

      {/* Weather Conditions Across All 8 NER States */}
      <section aria-label="Weather Telemetry">
        <WeatherConditionsSection weather={weather} />
      </section>
    </div>
  );
};
