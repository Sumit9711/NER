import React, { useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, ShieldAlert, ShieldCheck, Layers, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { ROUTE_COMPARISON_DATA } from '../../data/routeRecommendationData';

// Custom SVG divIcons
const createEndpointIcon = (label, color = '#2563eb') => {
  return L.divIcon({
    className: 'custom-leaflet-endpoint',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:${color};color:#ffffff;border:2px solid #ffffff;border-radius:6px;padding:3px 8px;box-shadow:0 3px 8px rgba(0,0,0,0.6);font-family:sans-serif;font-weight:900;font-size:11px;white-space:nowrap;">
          ${label}
        </div>
        <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:6px solid ${color};"></div>
      </div>
    `,
    iconSize: [80, 32],
    iconAnchor: [40, 32]
  });
};

const createHazardIcon = (label) => {
  return L.divIcon({
    className: 'custom-leaflet-hazard',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:#dc2626;color:#ffffff;border:2px solid #ffffff;border-radius:6px;padding:3px 6px;box-shadow:0 0 10px rgba(220,38,38,0.8);font-family:sans-serif;font-weight:900;font-size:10px;white-space:nowrap;display:flex;align-items:center;gap:3px;" class="animate-pulse">
          <span>⚠️</span>
          <span>${label}</span>
        </div>
        <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #dc2626;"></div>
      </div>
    `,
    iconSize: [110, 30],
    iconAnchor: [55, 30]
  });
};

const createClearanceIcon = (label) => {
  return L.divIcon({
    className: 'custom-leaflet-clearance',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:#059669;color:#ffffff;border:2px solid #ffffff;border-radius:6px;padding:3px 6px;box-shadow:0 0 8px rgba(16,185,129,0.7);font-family:sans-serif;font-weight:900;font-size:10px;white-space:nowrap;display:flex;align-items:center;gap:3px;">
          <span>🛡️</span>
          <span>${label}</span>
        </div>
        <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid #059669;"></div>
      </div>
    `,
    iconSize: [120, 30],
    iconAnchor: [60, 30]
  });
};

export const RouteComparisonMap = ({ data = ROUTE_COMPARISON_DATA }) => {
  const [showOriginal, setShowOriginal] = useState(true);
  const [showRecommended, setShowRecommended] = useState(true);

  // Map center roughly between Guwahati and Silchar
  const mapCenter = [25.5500, 92.2500];

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden shadow-xl flex flex-col">
      {/* Map Control Bar */}
      <div className="bg-slate-800/90 border-b border-slate-700 p-3.5 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-black text-white uppercase tracking-wider">
            GIS Dual-Route Comparison Viewer (OSRM Multi-Criteria Layer)
          </span>
        </div>

        {/* Visibility Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 border transition-all ${
              showOriginal
                ? 'bg-red-950/80 border-red-500 text-red-200'
                : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60'
            }`}
          >
            {showOriginal ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Original (312 km)</span>
          </button>

          <button
            onClick={() => setShowRecommended(!showRecommended)}
            className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 border transition-all ${
              showRecommended
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-1 ring-emerald-500/50'
                : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60'
            }`}
          >
            {showRecommended ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>Safer Alternative (329 km)</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="relative h-[480px] w-full">
        <MapContainer
          center={mapCenter}
          zoom={8}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 1. ORIGINAL ROUTE: Red Dashed Line */}
          {showOriginal && (
            <>
              <Polyline
                positions={data.originalRoute.coords}
                pathOptions={{
                  color: data.originalRoute.color,
                  weight: 4,
                  opacity: 0.85,
                  dashArray: data.originalRoute.dashArray
                }}
              >
                <Tooltip sticky>
                  <div className="text-xs font-sans">
                    <strong className="text-red-600 block">ORIGINAL ROUTE (NH-6 Mainline)</strong>
                    <span>Distance: 312 km &bull; Time: 6h 20m</span>
                    <br />
                    <strong className="text-red-700">Risk: 86/100 (CRITICAL) &bull; Delay: +2h 10m</strong>
                  </div>
                </Tooltip>
              </Polyline>

              {/* Hazard Marker at Mile 28 */}
              {data.originalRoute.bottlenecks.map((b, idx) => (
                <Marker
                  key={idx}
                  position={b.coords}
                  icon={createHazardIcon(b.name)}
                >
                  <Popup>
                    <div className="p-1 text-xs">
                      <strong className="text-red-600 font-bold block">{b.name}</strong>
                      <span className="text-slate-700 font-medium">Expected Delay: {b.delay}</span>
                      <p className="text-slate-600 mt-1">45m of carriageway covered by mud slurry and active rockfall.</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          )}

          {/* 2. RECOMMENDED ROUTE (SAFER ALTERNATIVE): Glowing Emerald Line */}
          {showRecommended && (
            <>
              {/* Outer Glow Line to make the safer route visually obvious */}
              <Polyline
                positions={data.recommendedRoute.coords}
                pathOptions={{
                  color: '#059669',
                  weight: 10,
                  opacity: 0.35,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              />

              {/* Core Solid Bright Polyline */}
              <Polyline
                positions={data.recommendedRoute.coords}
                pathOptions={{
                  color: data.recommendedRoute.color,
                  weight: 6,
                  opacity: 0.95,
                  lineCap: 'round',
                  lineJoin: 'round'
                }}
              >
                <Tooltip sticky>
                  <div className="text-xs font-sans">
                    <strong className="text-emerald-700 block font-bold">
                      ⭐ RECOMMENDED SAFER ROUTE
                    </strong>
                    <span>Distance: 329 km &bull; Time: 6h 45m</span>
                    <br />
                    <strong className="text-emerald-800">
                      Risk: 34/100 (MEDIUM) &bull; Delay: +25m
                    </strong>
                    <p className="text-slate-600 text-[11px] mt-0.5">
                      "17 km longer but significantly reduces disruption risk."
                    </p>
                  </div>
                </Tooltip>
              </Polyline>

              {/* Clearance Checkpoints on Recommended Bypass */}
              {data.recommendedRoute.clearances.map((c, idx) => (
                <Marker
                  key={idx}
                  position={c.coords}
                  icon={createClearanceIcon(c.name)}
                >
                  <Popup>
                    <div className="p-1 text-xs">
                      <strong className="text-emerald-700 font-bold block">{c.name}</strong>
                      <span className="text-slate-700">{c.status}</span>
                      <p className="text-slate-600 mt-1">Reinforced all-weather corridor; hill gradient under 8%.</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          )}

          {/* Origin Marker */}
          <Marker
            position={data.origin.coords}
            icon={createEndpointIcon('ORIGIN: Guwahati', '#1d4ed8')}
          >
            <Popup>
              <div className="text-xs font-sans p-1">
                <strong>{data.origin.name}</strong>
                <p className="text-slate-600">Primary multimodal freight staging hub.</p>
              </div>
            </Popup>
          </Marker>

          {/* Destination Marker */}
          <Marker
            position={data.destination.coords}
            icon={createEndpointIcon('DEST: Silchar', '#0f766e')}
          >
            <Popup>
              <div className="text-xs font-sans p-1">
                <strong>{data.destination.name}</strong>
                <p className="text-slate-600">Barak Valley primary relief stockpile depot.</p>
              </div>
            </Popup>
          </Marker>
        </MapContainer>

        {/* High-Contrast Floating Legend Making Safer Route Visually Obvious */}
        <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/95 border-2 border-slate-750 p-3.5 rounded-xl shadow-2xl backdrop-blur-md max-w-xs text-xs space-y-2">
          <div className="font-black text-white uppercase tracking-wider text-[11px] border-b border-slate-800 pb-1 flex items-center justify-between">
            <span>Route Visual Legend</span>
            <span className="text-slate-400 font-mono text-[10px]">OSRM GIS</span>
          </div>

          {/* Safer Route Indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-3 rounded bg-emerald-500 border border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <div>
              <span className="font-black text-emerald-400 block">
                Recommended Safer Route
              </span>
              <span className="text-[10px] text-slate-300">
                329 km &bull; Risk 34/100 (Solid thick glow)
              </span>
            </div>
          </div>

          {/* Original Route Indicator */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-1 border-t-2 border-dashed border-red-500" />
            <div>
              <span className="font-bold text-red-400 block">
                Original Route (High Risk)
              </span>
              <span className="text-[10px] text-slate-300">
                312 km &bull; Risk 86/100 (Dashed red)
              </span>
            </div>
          </div>

          {/* Hazard / Blockage */}
          <div className="flex items-center gap-2.5 pt-1 border-t border-slate-800">
            <span className="text-xs">⚠️</span>
            <span className="text-[11px] text-red-300 font-semibold">
              Mile 28 Active Landslide Blockage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
