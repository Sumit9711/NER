import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, Tooltip, useMap } from 'react-leaflet';
import L from 'leaflet';
import {
  Map as MapIcon,
  Filter,
  Layers,
  Truck,
  AlertTriangle,
  RotateCcw,
  Compass,
  ArrowRight,
  ShieldAlert,
  Clock,
  ExternalLink,
  Package,
  Activity,
  Maximize2,
  Minimize2,
  X,
  Radio,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { RiskBadge } from '../components/common/RiskBadge';
import { StatusBadge } from '../components/common/StatusBadge';

// Helper component to center map smoothly when an object is selected
function MapRecenter({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords[0] && coords[1]) {
      map.setView(coords, 9, { animate: true });
    }
  }, [coords, map]);
  return null;
}

// Custom high-contrast SVG divIcons
const createVehicleMarkerIcon = (vehicle, isSelected) => {
  const isMoving = vehicle.status === 'MOVING';
  const bgColor = isSelected ? '#1d4ed8' : (isMoving ? '#2563eb' : '#475569');
  const dotColor = isMoving ? '#4ade80' : '#f59e0b';
  const ring = isSelected ? 'ring-4 ring-yellow-400' : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div class="${ring}" style="background:${bgColor};color:#ffffff;border:2px solid #ffffff;border-radius:6px;padding:3px 7px;box-shadow:0 4px 10px rgba(0,0,0,0.6);display:flex;align-items:center;gap:4px;font-family:ui-monospace, monospace;font-weight:900;font-size:11px;white-space:nowrap;">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${dotColor};"></span>
          <span>${vehicle.id}</span>
        </div>
        <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid ${bgColor};"></div>
      </div>
    `,
    iconSize: [70, 32],
    iconAnchor: [35, 32]
  });
};

const createIncidentMarkerIcon = (incident, isSelected) => {
  const ring = isSelected ? 'ring-4 ring-yellow-400' : '';
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div class="${ring}" style="background:#dc2626;color:#ffffff;border:2px solid #fef2f2;border-radius:6px;padding:3px 7px;box-shadow:0 4px 10px rgba(220,38,38,0.7);display:flex;align-items:center;gap:4px;font-family:sans-serif;font-weight:900;font-size:11px;white-space:nowrap;">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#ffffff;"></span>
          <span>${incident.id}</span>
        </div>
        <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid #dc2626;"></div>
      </div>
    `,
    iconSize: [70, 32],
    iconAnchor: [35, 32]
  });
};

const createRoadblockMarkerIcon = (blk, isSelected) => {
  const border = isSelected ? 'border-yellow-400 ring-2 ring-yellow-400' : 'border-red-400';
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="${border}" style="background:#7f1d1d;color:#fee2e2;border-width:2px;border-style:solid;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,0.6);font-weight:900;font-size:14px;cursor:pointer;">
        &times;
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14]
  });
};

export const LiveMap = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const telemetry = dashboardService.getMapTelemetry();
  const districts = dashboardService.getDistricts();
  const commodities = dashboardService.getCommodities();

  // Filter States
  const [filterDistrict, setFilterDistrict] = useState('All Districts');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterRiskLevel, setFilterRiskLevel] = useState('ALL');
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [filterCommodity, setFilterCommodity] = useState('All Commodities');

  // Layer Visibility
  const [layerVehicles, setLayerVehicles] = useState(true);
  const [layerRoutes, setLayerRoutes] = useState(true);
  const [layerIncidents, setLayerIncidents] = useState(true);
  const [layerRiskZones, setLayerRiskZones] = useState(true);
  const [layerBlockedRoads, setLayerBlockedRoads] = useState(true);
  const [layerRecommended, setLayerRecommended] = useState(true);

  // Selected object state: { type: 'vehicle'|'incident'|'route'|'block', data: {...} }
  const [selectedObject, setSelectedObject] = useState(null);
  const [recenterCoords, setRecenterCoords] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Check URL query param for auto-selection (e.g. from Vehicles table)
  useEffect(() => {
    const urlVehicleId = searchParams.get('vehicleId');
    if (urlVehicleId) {
      const found = telemetry.vehicles.find(
        (v) => v.id.toLowerCase() === urlVehicleId.toLowerCase()
      );
      if (found) {
        setSelectedObject({ type: 'vehicle', data: found });
        setRecenterCoords(found.coords);
      }
    } else if (!selectedObject && telemetry.vehicles.length > 0) {
      // Default select the first priority vehicle
      setSelectedObject({ type: 'vehicle', data: telemetry.vehicles[0] });
    }
  }, [searchParams]);

  // Filtered vehicles
  const filteredVehicles = telemetry.vehicles.filter((v) => {
    if (filterDistrict !== 'All Districts' && v.district !== filterDistrict) return false;
    if (filterStatus !== 'ALL' && v.status !== filterStatus) return false;
    if (filterRiskLevel !== 'ALL' && v.routeRisk !== filterRiskLevel) return false;
    if (filterCommodity !== 'All Commodities' && v.commodityCategory !== filterCommodity) return false;
    return true;
  });

  // Filtered incidents
  const filteredIncidents = telemetry.incidents.filter((inc) => {
    if (filterDistrict !== 'All Districts' && inc.district !== filterDistrict) return false;
    if (filterSeverity !== 'ALL' && inc.severity !== filterSeverity) return false;
    return true;
  });

  // Reset filters
  const handleResetFilters = () => {
    setFilterDistrict('All Districts');
    setFilterStatus('ALL');
    setFilterRiskLevel('ALL');
    setFilterSeverity('ALL');
    setFilterCommodity('All Commodities');
  };

  const handleSelectObject = (type, data) => {
    setSelectedObject({ type, data });
    if (data.coords && Array.isArray(data.coords) && typeof data.coords[0] === 'number') {
      setRecenterCoords(data.coords);
    } else if (data.coords && Array.isArray(data.coords[0])) {
      setRecenterCoords(data.coords[0]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Briefing & Layer Controls Bar */}
      <div className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-4 shadow-md flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-900 border border-blue-500 text-blue-300">
            <MapIcon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-none">
                GIS Live Logistics & Corridor Telemetry
              </h1>
              <span className="bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded uppercase hidden sm:inline-block">
                LIVE SAT-LINK
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold mt-1">
              Real-time multi-layer terrain intelligence for North Eastern Region lifelines
            </p>
          </div>
        </div>

        {/* Mobile Filter Toggle & Quick Layer Switches */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="md:hidden px-3 py-2 rounded-lg bg-blue-700 text-white font-bold flex items-center gap-1.5"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-lg border border-slate-700">
            <span className="text-slate-400 text-[11px] px-2 font-black uppercase">Layers:</span>
            <button
              onClick={() => setLayerVehicles(!layerVehicles)}
              className={`px-2 py-1 rounded text-[11px] transition-all ${layerVehicles ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
            >
              Vehicles ({filteredVehicles.length})
            </button>
            <button
              onClick={() => setLayerIncidents(!layerIncidents)}
              className={`px-2 py-1 rounded text-[11px] transition-all ${layerIncidents ? 'bg-red-600 text-white' : 'text-slate-400'}`}
            >
              Incidents ({filteredIncidents.length})
            </button>
            <button
              onClick={() => setLayerBlockedRoads(!layerBlockedRoads)}
              className={`px-2 py-1 rounded text-[11px] transition-all ${layerBlockedRoads ? 'bg-amber-600 text-white' : 'text-slate-400'}`}
            >
              Roadblocks
            </button>
            <button
              onClick={() => setLayerRecommended(!layerRecommended)}
              className={`px-2 py-1 rounded text-[11px] transition-all ${layerRecommended ? 'bg-cyan-600 text-white' : 'text-slate-400'}`}
            >
              Detours
            </button>
          </div>
        </div>
      </div>

      {/* 3-Pane Responsive Layout: Left Filters, Center Map, Right Inspector */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
        {/* ========================================================= */}
        {/* LEFT PANEL: FILTERS (Col span 3 on desktop)               */}
        {/* ========================================================= */}
        <div
          className={`${
            mobileFiltersOpen ? 'block' : 'hidden'
          } md:block md:col-span-3 bg-slate-800/95 border-2 border-slate-700 rounded-xl p-4 shadow-lg space-y-4`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-400" />
              GIS Telemetry Filters
            </span>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
              title="Reset all filters to default"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* 1. District */}
          <div>
            <label htmlFor="filter-district" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
              District / State Corridor
            </label>
            <select
              id="filter-district"
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 text-white text-xs font-bold rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* 2. Vehicle Status */}
          <div>
            <label htmlFor="filter-status" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
              Vehicle Status
            </label>
            <select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 text-white text-xs font-bold rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="ALL">All Statuses (Active Fleet)</option>
              <option value="MOVING">Moving (Live Speed &gt; 0)</option>
              <option value="STATIONARY">Stationary / Holding (Speed 0)</option>
              <option value="DELAYED">Delayed / Holding</option>
              <option value="REROUTING">Rerouting Detour</option>
            </select>
          </div>

          {/* 3. Route Risk Level */}
          <div>
            <label htmlFor="filter-risk" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
              Route Risk Level
            </label>
            <select
              id="filter-risk"
              value={filterRiskLevel}
              onChange={(e) => setFilterRiskLevel(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 text-white text-xs font-bold rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical Hazard</option>
              <option value="HIGH">High Risk</option>
              <option value="MODERATE">Moderate / Caution</option>
              <option value="LOW">Low / Normal</option>
            </select>
          </div>

          {/* 4. Incident Severity */}
          <div>
            <label htmlFor="filter-severity" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
              Incident Severity
            </label>
            <select
              id="filter-severity"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 text-white text-xs font-bold rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="ALL">All Incidents</option>
              <option value="CRITICAL">Critical (Road Blocked)</option>
              <option value="HIGH">High (Single Lane Delay)</option>
              <option value="MODERATE">Moderate (Caution Runoff)</option>
            </select>
          </div>

          {/* 5. Commodity Category */}
          <div>
            <label htmlFor="filter-commodity" className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1">
              Relief Commodity
            </label>
            <select
              id="filter-commodity"
              value={filterCommodity}
              onChange={(e) => setFilterCommodity(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 text-white text-xs font-bold rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
            >
              {commodities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Filter Status Summary */}
          <div className="pt-2 border-t border-slate-700 text-xs text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span>Matching Vehicles:</span>
              <strong className="text-white">{filteredVehicles.length} of {telemetry.vehicles.length}</strong>
            </div>
            <div className="flex justify-between">
              <span>Matching Incidents:</span>
              <strong className="text-white">{filteredIncidents.length} of {telemetry.incidents.length}</strong>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER PANEL: LARGE REACT LEAFLET MAP (Col span 6 desktop)*/}
        {/* ========================================================= */}
        <div className="md:col-span-6 bg-slate-800/95 border-2 border-slate-700 rounded-xl overflow-hidden shadow-xl flex flex-col relative">
          <div className="h-[620px] w-full relative">
            <MapContainer
              center={telemetry.center}
              zoom={telemetry.zoom}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {recenterCoords && <MapRecenter coords={recenterCoords} />}

              {/* 1. Regular Routes Polylines */}
              {layerRoutes &&
                telemetry.routes.map((route) => (
                  <Polyline
                    key={route.id}
                    positions={route.coords}
                    pathOptions={{
                      color: route.color,
                      weight: route.status === 'BLOCKED' ? 5 : 4,
                      dashArray: route.dashArray,
                      opacity: 0.85
                    }}
                    eventHandlers={{
                      click: () => handleSelectObject('route', route)
                    }}
                  >
                    <Tooltip sticky>
                      <div className="text-xs font-bold text-slate-900">
                        {route.name} &bull; {route.status}
                      </div>
                    </Tooltip>
                  </Polyline>
                ))}

              {/* 2. Recommended Detour Routes (Cyan / Purple Dashed) */}
              {layerRecommended &&
                telemetry.recommendedRoutes.map((rec) => (
                  <Polyline
                    key={rec.id}
                    positions={rec.coords}
                    pathOptions={{
                      color: rec.color,
                      weight: 5,
                      dashArray: rec.dashArray,
                      opacity: 0.95
                    }}
                    eventHandlers={{
                      click: () => handleSelectObject('recommended', rec)
                    }}
                  >
                    <Tooltip sticky>
                      <div className="text-xs font-bold text-cyan-900">
                        Detour: {rec.name} (+{rec.delayAdded})
                      </div>
                    </Tooltip>
                  </Polyline>
                ))}

              {/* 3. Blocked Road Segments */}
              {layerBlockedRoads &&
                telemetry.blockedRoads.map((blk) => (
                  <React.Fragment key={blk.id}>
                    <Polyline
                      positions={blk.coords}
                      pathOptions={{
                        color: '#dc2626',
                        weight: 8,
                        dashArray: '6, 6',
                        opacity: 0.95
                      }}
                      eventHandlers={{
                        click: () => handleSelectObject('block', blk)
                      }}
                    />
                    <Marker
                      position={blk.coords[1]}
                      icon={createRoadblockMarkerIcon(blk, selectedObject?.data?.id === blk.id)}
                      eventHandlers={{
                        click: () => handleSelectObject('block', blk)
                      }}
                    />
                  </React.Fragment>
                ))}

              {/* 4. Risk Zones */}
              {layerRiskZones &&
                telemetry.riskZones.map((zone) => (
                  <Circle
                    key={zone.id}
                    center={zone.center}
                    radius={zone.radius}
                    pathOptions={{
                      color: zone.color,
                      fillColor: zone.fillColor,
                      fillOpacity: 0.22,
                      weight: 2
                    }}
                    eventHandlers={{
                      click: () => handleSelectObject('riskZone', zone)
                    }}
                  />
                ))}

              {/* 5. Live Vehicles */}
              {layerVehicles &&
                filteredVehicles.map((vehicle) => (
                  <Marker
                    key={vehicle.id}
                    position={vehicle.coords}
                    icon={createVehicleMarkerIcon(vehicle, selectedObject?.data?.id === vehicle.id)}
                    eventHandlers={{
                      click: () => handleSelectObject('vehicle', vehicle)
                    }}
                  />
                ))}

              {/* 6. Active Incidents */}
              {layerIncidents &&
                filteredIncidents.map((inc) => (
                  <Marker
                    key={inc.id}
                    position={inc.coords}
                    icon={createIncidentMarkerIcon(inc, selectedObject?.data?.id === inc.id)}
                    eventHandlers={{
                      click: () => handleSelectObject('incident', inc)
                    }}
                  />
                ))}
            </MapContainer>

            {/* Clear, Readable Map Legend Overlay */}
            <div className="absolute bottom-3 left-3 z-[1000] bg-slate-900/95 border-2 border-slate-700 rounded-xl p-3 shadow-2xl backdrop-blur-xs max-w-sm text-xs">
              <div className="flex items-center justify-between pb-1.5 border-b border-slate-700 mb-2">
                <span className="font-black text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-blue-400" />
                  GIS Layer Legend
                </span>
                <span className="text-[10px] text-slate-400 font-bold">Click map items to inspect</span>
              </div>

              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border border-white shrink-0"></div>
                  <span className="text-[11px] font-bold">Vehicle (Moving)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-500 border border-white shrink-0"></div>
                  <span className="text-[11px] font-bold">Vehicle (Stationary)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-red-600 text-white font-black text-[9px] flex items-center justify-center shrink-0">!</div>
                  <span className="text-[11px] font-bold">Active Incident</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-red-600 border-dashed border-t-2 border-red-300 shrink-0"></div>
                  <span className="text-[11px] font-bold">Blocked Road</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-emerald-500 rounded shrink-0"></div>
                  <span className="text-[11px] font-bold">Operational Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-1 bg-cyan-400 border-dashed border-t-2 border-cyan-200 shrink-0"></div>
                  <span className="text-[11px] font-bold">Recommended Detour</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: SELECTED OBJECT DETAILS (Col span 3 desktop) */}
        {/* ========================================================= */}
        <div className="md:col-span-3 bg-slate-800/95 border-2 border-slate-700 rounded-xl p-4 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-blue-400" />
              Object Telemetry Inspector
            </span>
            {selectedObject && (
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-slate-900 text-blue-300 border border-slate-700">
                {selectedObject.type}
              </span>
            )}
          </div>

          {/* If Vehicle Selected */}
          {selectedObject?.type === 'vehicle' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-blue-300">
                    {selectedObject.data.id}
                  </span>
                  <StatusBadge status={selectedObject.data.status} size="normal" />
                </div>
                <p className="font-bold text-white text-sm">{selectedObject.data.name}</p>
                <p className="text-slate-300 font-medium">Org: <strong>{selectedObject.data.organization}</strong></p>
                <p className="text-slate-300 font-medium">Escort: <strong>{selectedObject.data.driver}</strong></p>
              </div>

              {/* Telemetry Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-slate-900 rounded border border-slate-700">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Live Speed</span>
                  <span className="text-base font-black text-white">{selectedObject.data.speed}</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded border border-slate-700">
                  <span className="text-slate-400 font-bold uppercase text-[10px] block">Est. Arrival</span>
                  <span className="text-base font-black text-white">{selectedObject.data.eta}</span>
                </div>
              </div>

              {/* Commodity & Route */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1.5">
                <p className="text-slate-300">
                  <strong className="text-white">Payload:</strong> {selectedObject.data.commodity} ({selectedObject.data.weight})
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Transit:</strong> {selectedObject.data.origin} &rarr; {selectedObject.data.destination}
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Current Point:</strong> {selectedObject.data.currentLocation}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span>Corridor Risk:</span>
                  <RiskBadge level={selectedObject.data.routeRisk} size="normal" />
                </div>
              </div>

              {/* Anomaly if flagged */}
              {selectedObject.data.anomaly?.detected && (
                <div className="p-3 bg-red-950/80 border-2 border-red-600 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-red-200 font-black uppercase">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>{selectedObject.data.anomaly.title}</span>
                  </div>
                  <p className="text-slate-200">{selectedObject.data.anomaly.reason}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigate(`/vehicles/${selectedObject.data.id}`)}
                  className="w-full min-h-[42px] px-3 py-2 bg-blue-700 hover:bg-blue-600 border border-blue-500 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Full Vehicle Dossier</span>
                </button>
              </div>
            </div>
          )}

          {/* If Incident Selected */}
          {selectedObject?.type === 'incident' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-black text-red-400">
                    {selectedObject.data.id}
                  </span>
                  <RiskBadge level={selectedObject.data.severity} size="normal" />
                </div>
                <p className="font-black text-white text-sm">{selectedObject.data.title}</p>
                <p className="text-slate-300">Corridor: <strong className="text-blue-300">{selectedObject.data.corridor}</strong></p>
                <p className="text-slate-300">State: <strong>{selectedObject.data.state}</strong></p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-2">
                <p className="text-slate-200 leading-relaxed font-medium">{selectedObject.data.impact}</p>
                <div className="pt-2 border-t border-slate-800 text-emerald-400 font-bold">
                  Clearance ETA: {selectedObject.data.clearanceETA}
                </div>
                {selectedObject.data.recommendedDetour && (
                  <div className="text-blue-300 font-bold pt-1">
                    Detour: {selectedObject.data.recommendedDetour}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('/route-recommendations')}
                className="w-full min-h-[42px] px-3 py-2 bg-red-700 hover:bg-red-600 border border-red-500 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
              >
                <Radio className="w-4 h-4" />
                <span>Trigger Reroute Advisory</span>
              </button>
            </div>
          )}

          {/* If Blocked Road Selected */}
          {selectedObject?.type === 'block' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1.5">
                <span className="font-mono text-xs font-black text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-700">
                  ROAD CLOSURE
                </span>
                <p className="font-black text-white text-sm mt-1">{selectedObject.data.title}</p>
                <p className="text-slate-300">Corridor: <strong className="text-blue-300">{selectedObject.data.corridor}</strong></p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-200 leading-relaxed">{selectedObject.data.reason}</p>
              </div>

              <button
                onClick={() => navigate('/route-recommendations')}
                className="w-full min-h-[42px] px-3 py-2 bg-cyan-700 hover:bg-cyan-600 border border-cyan-500 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
              >
                <ArrowRight className="w-4 h-4" />
                <span>View Alternate Detour Corridor</span>
              </button>
            </div>
          )}

          {/* If Recommended Detour Selected */}
          {selectedObject?.type === 'recommended' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1.5">
                <span className="font-mono text-xs font-black text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-700">
                  AI DETOUR RECOMMENDATION
                </span>
                <p className="font-black text-white text-sm mt-1">{selectedObject.data.name}</p>
                <p className="text-slate-300">Bypassing: <strong className="text-amber-300">{selectedObject.data.forCorridor}</strong></p>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 space-y-1.5">
                <div className="flex justify-between">
                  <span>Detour Distance:</span>
                  <strong className="text-white">{selectedObject.data.distanceKm} km</strong>
                </div>
                <div className="flex justify-between">
                  <span>Additional Travel Time:</span>
                  <strong className="text-amber-400">{selectedObject.data.delayAdded}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Axle Weight Limit:</span>
                  <strong className="text-white">{selectedObject.data.maxLoadLimit}</strong>
                </div>
              </div>
            </div>
          )}

          {/* If nothing selected or fallback quick list */}
          {!selectedObject && (
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-700 text-center space-y-2">
              <p className="text-slate-400 font-semibold text-xs">
                Select any vehicle, incident, or highway segment on the map to inspect live telemetry.
              </p>
              <p className="text-slate-500 text-[11px]">Or choose a quick convoy below:</p>
              <div className="space-y-1 pt-2">
                {telemetry.vehicles.slice(0, 3).map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleSelectObject('vehicle', v)}
                    className="w-full text-left p-2 rounded bg-slate-800 hover:bg-slate-750 text-xs font-bold text-white flex items-center justify-between"
                  >
                    <span>{v.id}</span>
                    <span className="text-[10px] text-blue-300">{v.destination}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
