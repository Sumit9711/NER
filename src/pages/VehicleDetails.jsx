import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Truck,
  ArrowLeft,
  ShieldAlert,
  ShieldCheck,
  AlertOctagon,
  Clock,
  MapPin,
  Building2,
  Navigation,
  Compass,
  Radio,
  CheckCircle2,
  AlertTriangle,
  Send,
  Eye
} from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { StatusBadge } from '../components/common/StatusBadge';
import { RiskBadge } from '../components/common/RiskBadge';

const createVehicleIcon = (vehicle) => {
  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="background:#2563eb;color:#ffffff;border:2px solid #ffffff;border-radius:6px;padding:4px 8px;box-shadow:0 4px 10px rgba(0,0,0,0.7);display:flex;align-items:center;gap:5px;font-family:ui-monospace, monospace;font-weight:900;font-size:12px;white-space:nowrap;">
          <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#4ade80;"></span>
          <span>${vehicle.id}</span>
        </div>
        <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:7px solid #2563eb;"></div>
      </div>
    `,
    iconSize: [80, 36],
    iconAnchor: [40, 36]
  });
};

export const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const vehicle = dashboardService.getVehicleById(id);

  const [radioContacted, setRadioContacted] = useState(false);
  const [anomalyAcknowledged, setAnomalyAcknowledged] = useState(false);

  const handleRadioPilot = () => {
    setRadioContacted(true);
    setTimeout(() => setRadioContacted(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb and Header */}
      <div className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg flex items-center justify-between flex-wrap gap-4">
        <div>
          <button
            onClick={() => navigate('/vehicles')}
            className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Vehicles</span>
          </button>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="p-2.5 rounded-lg bg-blue-900 border border-blue-500 text-blue-300">
              <Truck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                  {vehicle.id}
                </h1>
                <span className="text-base font-bold text-slate-300">
                  {vehicle.name}
                </span>
                <StatusBadge status={vehicle.status} size="normal" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                Operated by: <strong className="text-white">{vehicle.organization}</strong> &bull; Lead Escort: <strong className="text-white">{vehicle.driver}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigate(`/live-map?vehicleId=${vehicle.id}`)}
            className="min-h-[44px] px-4 py-2 bg-slate-900 hover:bg-slate-750 border-2 border-slate-600 rounded-lg text-xs sm:text-sm font-bold text-white flex items-center gap-2 transition-all shadow"
          >
            <Navigation className="w-4 h-4 text-blue-400" />
            <span>Track on Live GIS Map</span>
          </button>
        </div>
      </div>

      {/* Anomaly Detection Section (if anomaly present or demo flag) */}
      {vehicle.anomaly?.detected && (
        <section
          aria-label="Anomaly Alert"
          className="bg-red-950/80 border-2 border-red-600 rounded-xl p-5 shadow-xl space-y-3"
        >
          <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-red-800/80">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-red-600 text-white animate-pulse">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <span className="text-base font-black text-red-100 uppercase tracking-wider">
                ANOMALY DETECTED &bull; {vehicle.anomaly.title}
              </span>
            </div>
            <span className="bg-red-900 border border-red-500 text-red-100 text-xs font-black px-2.5 py-1 rounded uppercase">
              {vehicle.anomaly.duration}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5 text-slate-200">
              <p>
                <strong>Identified Location:</strong> {vehicle.anomaly.location}
              </p>
              <p className="leading-relaxed">
                <strong>Diagnostic Finding:</strong> {vehicle.anomaly.reason}
              </p>
            </div>

            {/* MANDATORY SAFETY GOVERNANCE NOTICE */}
            <div className="p-3 bg-slate-950/90 border border-red-700/80 rounded-lg text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Command Safety Directive:</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {vehicle.anomaly.governanceNotice ||
                  'Anomaly detection only flags potential issues for human review. It must not automatically execute emergency actions without commander signoff.'}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 flex-wrap">
            <button
              onClick={handleRadioPilot}
              className="min-h-[42px] px-4 py-2 bg-red-800 hover:bg-red-700 border border-red-500 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow"
            >
              <Radio className="w-4 h-4" />
              <span>{radioContacted ? 'Radio Call Sent to Pilot Escort' : 'Radio Pilot Escort Directly'}</span>
            </button>

            <button
              onClick={() => setAnomalyAcknowledged(true)}
              className="min-h-[42px] px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-all"
            >
              {anomalyAcknowledged ? 'Marked Acknowledged' : 'Acknowledge Observation'}
            </button>
          </div>
        </section>
      )}

      {/* Core Telemetry Specification Grid */}
      <section
        aria-label="Core Vehicle Telemetry"
        className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-6 shadow-lg space-y-4"
      >
        <h2 className="text-base font-black text-white uppercase tracking-wider pb-3 border-b border-slate-700">
          Core Mission Telemetry & Consignment Specifications
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-xs">
          {/* 1. Vehicle ID */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Vehicle ID</span>
            <span className="text-base font-mono font-black text-blue-300">{vehicle.id}</span>
          </div>

          {/* 2. Driver */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Lead Escort / Driver</span>
            <span className="text-sm font-bold text-white">{vehicle.driver}</span>
          </div>

          {/* 3. Organization */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Command Agency</span>
            <span className="text-sm font-bold text-white">{vehicle.organization}</span>
          </div>

          {/* 4. Commodity */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Commodity Payload</span>
            <span className="text-sm font-bold text-white">{vehicle.commodity} ({vehicle.weight})</span>
          </div>

          {/* 5. Origin */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Staging Origin</span>
            <span className="text-sm font-bold text-white">{vehicle.origin}</span>
          </div>

          {/* 6. Destination */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Mission Destination</span>
            <span className="text-sm font-bold text-white">{vehicle.destination}</span>
          </div>

          {/* 7. Current Location */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Current Location</span>
            <span className="text-sm font-bold text-blue-300">{vehicle.currentLocation}</span>
          </div>

          {/* 8. Speed */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Telemetry Speed</span>
            <span className="text-sm font-black text-white">{vehicle.speed}</span>
          </div>

          {/* 9. ETA */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Estimated Arrival</span>
            <span className="text-sm font-bold text-white">{vehicle.eta}</span>
          </div>

          {/* 10. Expected Delay */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Expected Delay</span>
            <span className={`text-sm font-black ${vehicle.delay.includes('+') ? 'text-amber-400' : 'text-emerald-400'}`}>
              {vehicle.delay}
            </span>
          </div>

          {/* 11. Route Risk */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Route Risk</span>
            <RiskBadge level={vehicle.routeRisk} size="normal" />
          </div>

          {/* 12. Last GPS Update */}
          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700">
            <span className="text-slate-400 font-bold uppercase text-[10px] block">Last GPS Satellite Ping</span>
            <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {vehicle.lastUpdated}
            </span>
          </div>
        </div>
      </section>

      {/* 2-Column Section: Vehicle Map & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ========================================================= */}
        {/* VEHICLE INTERACTIVE MAP                                   */}
        {/* ========================================================= */}
        <section
          aria-label="Vehicle Trajectory Map"
          className="bg-slate-800/95 border-2 border-slate-700 rounded-xl overflow-hidden shadow-lg flex flex-col"
        >
          <div className="p-4 bg-slate-850 border-b-2 border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Transit Trajectory & Terrain Map
              </h2>
            </div>
            <span className="text-xs text-blue-300 font-bold">
              Lat: {vehicle.coords[0]}° N &bull; Long: {vehicle.coords[1]}° E
            </span>
          </div>

          <div className="h-[420px] w-full relative">
            <MapContainer
              center={vehicle.coords}
              zoom={8}
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%', backgroundColor: '#0f172a' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* Trajectory Polyline */}
              {vehicle.trajectory && (
                <Polyline
                  positions={vehicle.trajectory}
                  pathOptions={{ color: '#3b82f6', weight: 5, opacity: 0.85 }}
                />
              )}

              {/* Current Position Marker */}
              <Marker position={vehicle.coords} icon={createVehicleIcon(vehicle)}>
                <Popup>
                  <div className="text-xs p-1 text-slate-900">
                    <p className="font-black text-blue-900">{vehicle.id}</p>
                    <p className="font-bold">{vehicle.currentLocation}</p>
                    <p>Speed: {vehicle.speed}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MISSION TIMELINE                                          */}
        {/* ========================================================= */}
        <section
          aria-label="Mission Timeline"
          className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <h2 className="text-base font-black text-white uppercase tracking-wider">
                Chronological Mission Timeline
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-bold">
              {vehicle.timeline?.length || 0} Milestones Logged
            </span>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-700">
            {vehicle.timeline?.map((step, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className={`absolute -left-[27px] top-0.5 w-4 h-4 rounded-full border-2 border-slate-900 ${
                  step.type === 'alert' || step.type === 'reroute'
                    ? 'bg-red-500 ring-2 ring-red-400/50'
                    : step.type === 'risk'
                    ? 'bg-amber-500'
                    : step.type === 'speed'
                    ? 'bg-cyan-500'
                    : 'bg-emerald-500'
                }`} />

                <div className="bg-slate-900/90 border border-slate-700/80 rounded-lg p-3.5 space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-sm font-black text-white">
                      {step.title}
                    </span>
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {step.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
