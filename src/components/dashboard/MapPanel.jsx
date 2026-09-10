import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import {
  Map as MapIcon,
  Layers,
  Radio,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Compass,
  AlertTriangle,
  Truck,
  Shield,
  Navigation
} from 'lucide-react';
import {
  MAP_CENTER,
  MAP_DEFAULT_ZOOM,
  HUB_CITIES,
  MAP_VEHICLES,
  MAP_INCIDENTS,
  MAP_RISK_ZONES,
  MAP_ROUTES,
  BLOCKED_ROAD_SEGMENTS
} from '../../data/mapData';
import { RiskBadge } from '../common/RiskBadge';
import { StatusBadge } from '../common/StatusBadge';

// Helper to create custom high-contrast SVG divIcons for Leaflet
const createVehicleMarkerIcon = (vehicle) => {
  const isMoving = vehicle.status === 'MOVING';
  const bgColor = isMoving ? '#2563eb' : '#475569';
  const dotColor = isMoving ? '#4ade80' : '#f59e0b';
  const animationClass = isMoving ? 'animate-pulse' : '';

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:${bgColor};color:#ffffff;border:2px solid #ffffff;border-radius:6px;padding:3px 6px;box-shadow:0 3px 8px rgba(0,0,0,0.6);display:flex;align-items:center;gap:4px;font-family:ui-monospace, monospace;font-weight:900;font-size:11px;white-space:nowrap;">
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

const createIncidentMarkerIcon = (incident) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:#dc2626;color:#ffffff;border:2px solid #fef2f2;border-radius:6px;padding:3px 6px;box-shadow:0 4px 10px rgba(220,38,38,0.7);display:flex;align-items:center;gap:4px;font-family:sans-serif;font-weight:900;font-size:11px;white-space:nowrap;">
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

const createRoadblockMarkerIcon = (blk) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="background:#7f1d1d;color:#fee2e2;border:2px solid #ef4444;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 8px rgba(0,0,0,0.6);font-weight:900;font-size:12px;cursor:pointer;">
        &times;
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
};

const createHubCityMarkerIcon = (hub) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="background:#0f172a;color:#93c5fd;border:1.5px solid #3b82f6;border-radius:4px;padding:2px 5px;box-shadow:0 2px 5px rgba(0,0,0,0.5);font-size:10px;font-weight:800;white-space:nowrap;">
        &bull; ${hub.name}
      </div>
    `,
    iconSize: [60, 22],
    iconAnchor: [30, 11]
  });
};

export const MapPanel = () => {
  // Layer toggles
  const [showVehicles, setShowVehicles] = useState(true);
  const [showIncidents, setShowIncidents] = useState(true);
  const [showRiskZones, setShowRiskZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [showHubs, setShowHubs] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`bg-slate-800/95 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 ${
        isExpanded ? 'fixed inset-4 z-50 h-auto' : 'relative w-full'
      }`}
    >
      {/* Header Bar */}
      <div className="p-4 bg-slate-850 border-b-2 border-slate-700 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-900/80 border border-blue-500 text-blue-300">
            <MapIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
                Live GIS Mountain Corridor Telemetry
              </h2>
              <span className="bg-emerald-950 border border-emerald-500 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest hidden sm:inline-block">
                LIVE GPS
              </span>
            </div>
            <p className="text-xs text-slate-300 font-semibold">
              OpenStreetMap Telemetry &bull; 8 NER States &bull; Chokepoints, Convoys & Weather Risk Belts
            </p>
          </div>
        </div>

        {/* Controls and Layer Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
          {/* Layer toggles */}
          <button
            onClick={() => setShowVehicles(!showVehicles)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              showVehicles
                ? 'bg-blue-950 border-blue-500 text-blue-200'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}
            title="Toggle Vehicles Layer"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Vehicles ({MAP_VEHICLES.length})</span>
          </button>

          <button
            onClick={() => setShowIncidents(!showIncidents)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              showIncidents
                ? 'bg-red-950 border-red-500 text-red-200'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}
            title="Toggle Incidents Layer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Incidents ({MAP_INCIDENTS.length})</span>
          </button>

          <button
            onClick={() => setShowRiskZones(!showRiskZones)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              showRiskZones
                ? 'bg-amber-950 border-amber-500 text-amber-200'
                : 'bg-slate-900 border-slate-700 text-slate-500'
            }`}
            title="Toggle Risk Zones Layer"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Risk Belts ({MAP_RISK_ZONES.length})</span>
          </button>

          {/* Fullscreen Expand / Collapse */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-750 border border-slate-600 text-slate-300 hover:text-white transition-colors"
            title={isExpanded ? 'Minimize Map' : 'Expand Fullscreen Map'}
            aria-label="Toggle Fullscreen Map View"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className={`relative w-full ${isExpanded ? 'flex-1 min-h-[500px]' : 'h-[500px] sm:h-[540px]'}`}>
        <MapContainer
          center={MAP_CENTER}
          zoom={MAP_DEFAULT_ZOOM}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
        >
          {/* OpenStreetMap TileLayer with high contrast settings */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 1. Strategic Routes Polylines */}
          {showRoutes &&
            MAP_ROUTES.map((route) => (
              <Polyline
                key={route.id}
                positions={route.coords}
                pathOptions={{
                  color: route.color,
                  weight: route.status === 'BLOCKED' ? 5 : 4,
                  dashArray: route.dashArray,
                  opacity: 0.85
                }}
              >
                <Tooltip sticky>
                  <div className="text-xs font-black">
                    <p className="text-slate-900">{route.name}</p>
                    <p className={route.status === 'BLOCKED' ? 'text-red-700' : 'text-emerald-700'}>
                      Status: {route.status}
                    </p>
                  </div>
                </Tooltip>
              </Polyline>
            ))}

          {/* 2. Blocked Road Segments (Thick Red Dashed) */}
          {showRoutes &&
            BLOCKED_ROAD_SEGMENTS.map((blk) => (
              <React.Fragment key={blk.id}>
                <Polyline
                  positions={blk.coords}
                  pathOptions={{
                    color: '#dc2626',
                    weight: 7,
                    dashArray: '6, 6',
                    opacity: 0.95
                  }}
                />
                <Marker
                  position={blk.coords[1]}
                  icon={createRoadblockMarkerIcon(blk)}
                >
                  <Popup>
                    <div className="text-xs p-1 text-slate-900">
                      <p className="font-black text-red-700">{blk.title}</p>
                      <p className="text-[11px] font-semibold mt-1">{blk.reason}</p>
                    </div>
                  </Popup>
                </Marker>
              </React.Fragment>
            ))}

          {/* 3. Risk Zones (Circles) */}
          {showRiskZones &&
            MAP_RISK_ZONES.map((zone) => (
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
              >
                <Popup>
                  <div className="text-xs p-1 text-slate-900 space-y-1">
                    <p className="font-black text-sm">{zone.name}</p>
                    <p className="font-bold text-red-700">Hazard Level: {zone.hazardLevel}</p>
                    <p className="text-slate-700">Precipitation: <strong>{zone.rainfall}</strong></p>
                    <p className="text-slate-600">{zone.description}</p>
                  </div>
                </Popup>
              </Circle>
            ))}

          {/* 4. Hub Cities */}
          {showHubs &&
            HUB_CITIES.map((hub) => (
              <Marker
                key={hub.id}
                position={hub.coords}
                icon={createHubCityMarkerIcon(hub)}
              >
                <Popup>
                  <div className="text-xs p-1 text-slate-900">
                    <p className="font-black text-sm text-blue-900">{hub.name}</p>
                    <p className="font-bold text-slate-700">{hub.state}</p>
                    <p className="text-slate-600 text-[11px] mt-1">{hub.role}</p>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* 5. Live Vehicles */}
          {showVehicles &&
            MAP_VEHICLES.map((vehicle) => (
              <Marker
                key={vehicle.id}
                position={vehicle.coords}
                icon={createVehicleMarkerIcon(vehicle)}
              >
                <Popup>
                  <div className="text-xs p-1.5 text-slate-900 space-y-1.5 min-w-[220px]">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="font-black text-sm text-blue-900">{vehicle.id}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-black text-white ${
                        vehicle.status === 'MOVING' ? 'bg-blue-600' : 'bg-slate-600'
                      }`}>
                        {vehicle.status} ({vehicle.speedKmH} km/h)
                      </span>
                    </div>
                    <p className="font-bold text-slate-800">{vehicle.name}</p>
                    <p className="text-slate-700"><strong>Cargo:</strong> {vehicle.cargo}</p>
                    <p className="text-slate-700"><strong>Destination:</strong> {vehicle.destination}</p>
                    <p className="text-slate-700"><strong>Escort:</strong> {vehicle.driver}</p>
                    <div className="pt-1 text-[11px] text-amber-800 font-bold bg-amber-50 p-1.5 rounded border border-amber-200">
                      {vehicle.alert}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* 6. Active Incidents */}
          {showIncidents &&
            MAP_INCIDENTS.map((inc) => (
              <Marker
                key={inc.id}
                position={inc.coords}
                icon={createIncidentMarkerIcon(inc)}
              >
                <Popup>
                  <div className="text-xs p-1.5 text-slate-900 space-y-1.5 min-w-[240px]">
                    <div className="flex items-center justify-between border-b pb-1">
                      <span className="font-black text-sm text-red-700">{inc.id}</span>
                      <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-black">
                        {inc.severity}
                      </span>
                    </div>
                    <p className="font-black text-slate-900">{inc.title}</p>
                    <p className="text-slate-700"><strong>Type:</strong> {inc.type}</p>
                    <p className="text-slate-700"><strong>Location:</strong> {inc.state} &bull; {inc.corridor}</p>
                    <p className="text-slate-600 leading-snug">{inc.impact}</p>
                    <p className="text-emerald-800 font-bold"><strong>Clearance ETA:</strong> {inc.clearanceETA}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        {/* Clear Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/95 border-2 border-slate-700 rounded-xl p-3 sm:p-4 shadow-2xl backdrop-blur-xs max-w-xs sm:max-w-md text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700 mb-2">
            <span className="font-black text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-400" />
              GIS Tactical Legend
            </span>
            <span className="text-[10px] text-slate-400 font-bold">WGS 84 Projection</span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-slate-200">
            {/* Legend Item 1 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500 border border-white shrink-0"></div>
              <span className="font-bold text-[11px]">Vehicle (Moving)</span>
            </div>

            {/* Legend Item 2 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-500 border border-white shrink-0"></div>
              <span className="font-bold text-[11px]">Vehicle (Stationary)</span>
            </div>

            {/* Legend Item 3 */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-md bg-red-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
                !
              </div>
              <span className="font-bold text-[11px]">Active Incident</span>
            </div>

            {/* Legend Item 4 */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-1 bg-red-500 border-dashed border-t-2 border-red-300 shrink-0"></div>
              <span className="font-bold text-[11px]">Blocked Road</span>
            </div>

            {/* Legend Item 5 */}
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-1 bg-emerald-500 rounded shrink-0"></div>
              <span className="font-bold text-[11px]">Operational Route</span>
            </div>

            {/* Legend Item 6 */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-900/60 border border-red-500 shrink-0"></div>
              <span className="font-bold text-[11px]">Landslide Risk Zone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
