import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  AlertOctagon,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  Radio,
  Cpu,
  Eye,
  Camera,
  MapPin,
  Clock,
  User,
  Truck,
  Send,
  Navigation,
  Sparkles,
  Layers,
  FileCheck
} from 'lucide-react';
import { incidentService } from '../services/incidentService';
import { RiskBadge } from '../components/common/RiskBadge';
import { StatusBadge } from '../components/common/StatusBadge';

export const IncidentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const incident = incidentService.getIncidentById(id);

  // Operational feedback states
  const [currentStatus, setCurrentStatus] = useState(incident.status);
  const [roadBlockedFlag, setRoadBlockedFlag] = useState(incident.riskImpact.toLowerCase().includes('block'));
  const [actionNotice, setActionNotice] = useState('');

  const triggerNotice = (msg) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 3500);
  };

  const handleVerify = () => {
    incidentService.updateIncidentStatus(incident.id, 'Verified');
    setCurrentStatus('Verified');
    triggerNotice('Incident report officially VERIFIED by Command Center.');
  };

  const handleReject = () => {
    incidentService.updateIncidentStatus(incident.id, 'Rejected');
    setCurrentStatus('Rejected');
    triggerNotice('Incident report marked REJECTED as unsubstantiated.');
  };

  const handleMarkRoadBlocked = () => {
    incidentService.markRoadBlocked(incident.id);
    setRoadBlockedFlag(true);
    triggerNotice('HIGHWAY SECTOR OFFICIALLY MARKED BLOCKED in Central GIS Telemetry.');
  };

  const handleFindSaferRoute = () => {
    navigate('/route-recommendations');
  };

  const handleNotifyAuthorities = () => {
    triggerNotice('Emergency Alert Broadcast dispatched to NDRF Battalions & State Disaster Cells.');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Breadcrumbs */}
      <div className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg flex items-center justify-between flex-wrap gap-4">
        <div>
          <button
            onClick={() => navigate('/incidents')}
            className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1.5 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Incidents</span>
          </button>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="p-2.5 rounded-lg bg-red-950 border border-red-600 text-red-400">
              <AlertOctagon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-mono">
                  {incident.id}
                </h1>
                <span className="text-xl font-bold text-white">
                  {incident.type}
                </span>
                <RiskBadge level={incident.severity} size="large" />
                <span className="px-3 py-1 rounded-md text-xs font-black uppercase bg-slate-900 border border-slate-600 text-slate-200">
                  {currentStatus}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                {incident.location} &bull; Reported by: <strong className="text-white">{incident.reportedBy}</strong> ({incident.reportedAt})
              </p>
            </div>
          </div>
        </div>

        {/* Status Confirmation Notice Banner */}
        {actionNotice && (
          <div className="w-full p-3 bg-emerald-950 border-2 border-emerald-500 rounded-lg text-emerald-200 text-xs font-black flex items-center gap-2 shadow animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionNotice}</span>
          </div>
        )}
      </div>

      {/* Primary Telemetry & Route Risk Meter */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score Meter */}
        <div className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                Current Route Disruption Risk
              </span>
              <RiskBadge level={incident.routeRiskLevel} size="normal" />
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black text-red-400 tracking-tight">
                {incident.currentRouteRiskScore}
              </span>
              <span className="text-xs font-bold text-slate-400 uppercase">
                Hazard Severity Index
              </span>
            </div>

            <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
              Terrain risk model combines real-time precipitation gauges, slope shear angle, and ground sensor vibration telemetry.
            </p>
          </div>

          {/* Contributing Factors Tags */}
          <div className="mt-4 pt-3 border-t border-slate-700 space-y-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block">
              Contributing Factors:
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {incident.contributingFactors.map((factor, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-700 text-slate-200 text-xs font-bold rounded"
                >
                  &bull; {factor}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Affected Roads & Vehicles */}
        <div className="lg:col-span-2 bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-4">
          <h2 className="text-base font-black text-white uppercase tracking-wider pb-2 border-b border-slate-700">
            Affected Infrastructure & Monitored Convoys
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700 space-y-1.5">
              <span className="text-slate-400 font-bold uppercase text-[10px] block">
                Affected Road Corridor
              </span>
              <p className="text-sm font-black text-blue-300">
                {incident.affectedRoad}
              </p>
              <div className="pt-1 text-slate-300">
                <span>GPS Telemetry: <strong>{incident.gpsText}</strong></span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700 space-y-1.5">
              <span className="text-slate-400 font-bold uppercase text-[10px] block">
                Affected In-Transit Convoys ({incident.affectedVehicles.length})
              </span>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                {incident.affectedVehicles.map((vId) => (
                  <button
                    key={vId}
                    onClick={() => navigate(`/vehicles/${vId}`)}
                    className="px-2.5 py-1 bg-blue-950 hover:bg-blue-900 border border-blue-600 rounded text-blue-200 font-mono font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{vId}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-amber-300 mt-1">
                Convoys in proximate sector. Detour advisory required.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1">
            <span className="text-slate-400 uppercase font-black text-[10px] block">
              Incident Narrative Overview:
            </span>
            <p className="text-slate-200 font-medium leading-relaxed">
              {incident.description}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VERY IMPORTANT SECTION: SEPARATING OBSERVED DATA FROM AI / MODEL PREDICTION */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ------------------------------------------------------------- */}
        {/* PANEL 1: OBSERVED DATA (Ground Truth Evidence)               */}
        {/* ------------------------------------------------------------- */}
        <section
          aria-label="Observed Ground Truth Data"
          className="bg-slate-800/95 border-2 border-emerald-600/80 rounded-xl p-5 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-700 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-950 border border-emerald-500 text-emerald-300">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider block">
                  AUTHORITATIVE GROUND TRUTH
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  OBSERVED DATA
                </h3>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-600 text-emerald-200 text-xs font-bold">
              VERIFIED FIELD EVIDENCE
            </span>
          </div>

          {/* Observed Data Details */}
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700 space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 block">
                Field Officer Report & Log Timestamp
              </span>
              <p className="text-sm font-black text-white">
                {incident.observedData.eyewitnessReport}
              </p>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Logged by: {incident.observedData.reporterRole} at {incident.observedData.timestamp}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700">
                <span className="text-[10px] font-black uppercase text-slate-400 block">
                  Physical Debris Measurement
                </span>
                <p className="font-bold text-white mt-1">
                  {incident.observedData.physicalDebrisDimension}
                </p>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700">
                <span className="text-[10px] font-black uppercase text-slate-400 block">
                  Hydrological Slope Seepage
                </span>
                <p className="font-bold text-white mt-1">
                  {incident.observedData.waterSeepage}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700">
              <span className="text-[10px] font-black uppercase text-slate-400 block">
                Eyewitness Traffic & Backlog Status
              </span>
              <p className="font-bold text-white mt-1">
                {incident.observedData.vehicleBacklog} &bull; {incident.observedData.groundCasualties}
              </p>
            </div>

            {/* Field Photo Card */}
            <div className="p-3.5 bg-slate-900/90 rounded-lg border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-1.5 text-white">
                  <Camera className="w-4 h-4 text-emerald-400" />
                  Field Photo Evidence Capture
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  GPS: {incident.gpsText}
                </span>
              </div>

              <div className="h-44 bg-slate-950 rounded-lg border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
                <div className="p-3 rounded-full bg-slate-800 text-slate-400 mb-2">
                  <Camera className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-200">
                  {incident.photoCaption}
                </p>
                <div className="absolute bottom-2 right-2 text-[10px] font-mono bg-black/80 px-2 py-0.5 rounded text-emerald-400 border border-slate-700">
                  WATERMARK &bull; NIC-VERIFIED &bull; {incident.reportedAt}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* PANEL 2: AI / MODEL PREDICTION (Predictive Intelligence)      */}
        {/* ------------------------------------------------------------- */}
        <section
          aria-label="AI and Model Prediction Intelligence"
          className="bg-slate-800/95 border-2 border-purple-600/80 rounded-xl p-5 shadow-xl space-y-4"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-700 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-purple-950 border border-purple-500 text-purple-300">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider block">
                  MACHINE INFERENCE RADAR
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  AI / MODEL PREDICTION
                </h3>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded bg-purple-950 border border-purple-600 text-purple-200 text-xs font-bold">
              {incident.modelPredictions.confidenceScore}
            </span>
          </div>

          {/* AI Model Details */}
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700 space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 block">
                Predictive Risk Engine Assessment
              </span>
              <p className="text-sm font-black text-purple-300">
                {incident.modelPredictions.riskCategory} ({incident.modelPredictions.disruptionRiskScore})
              </p>
              <p className="text-slate-400 text-[11px]">
                Engine: {incident.modelPredictions.engineName}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700">
                <span className="text-[10px] font-black uppercase text-slate-400 block">
                  Estimated Clearance Window
                </span>
                <p className="font-bold text-white mt-1">
                  {incident.modelPredictions.clearanceDurationEstimate}
                </p>
              </div>

              <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700">
                <span className="text-[10px] font-black uppercase text-slate-400 block">
                  Secondary Slide Probability
                </span>
                <p className="font-bold text-red-400 mt-1">
                  {incident.modelPredictions.secondarySlideProbability}
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-lg border border-slate-700">
              <span className="text-[10px] font-black uppercase text-slate-400 block">
                Soil Moisture & Precipitation Saturation
              </span>
              <p className="font-bold text-white mt-1">
                {incident.modelPredictions.rainfallSaturationIndex}
              </p>
            </div>

            {/* AI Detour Advice */}
            <div className="p-3.5 bg-cyan-950/70 border-2 border-cyan-600 rounded-lg space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI Dynamic Alternate Route Guidance
              </span>
              <p className="text-white font-bold leading-relaxed">
                {incident.modelPredictions.alternateDetourRecommendation}
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Command Action Buttons Deck */}
      <section
        aria-label="Command Action Controls"
        className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-xl space-y-3"
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-700">
          <h2 className="text-base font-black text-white uppercase tracking-wider">
            Operational Authority Controls
          </h2>
          <span className="text-xs text-slate-400 font-bold">
            Authenticated as Command Director
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Button 1: Verify Incident */}
          <button
            onClick={handleVerify}
            className="min-h-[46px] px-3 py-2.5 bg-emerald-700 hover:bg-emerald-600 border-2 border-emerald-500 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Verify Incident</span>
          </button>

          {/* Button 2: Reject Report */}
          <button
            onClick={handleReject}
            className="min-h-[46px] px-3 py-2.5 bg-slate-800 hover:bg-red-950 border-2 border-slate-600 hover:border-red-600 rounded-lg text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <XCircle className="w-4 h-4 text-red-400" />
            <span>Reject Report</span>
          </button>

          {/* Button 3: Mark Road Blocked */}
          <button
            onClick={handleMarkRoadBlocked}
            className={`min-h-[46px] px-3 py-2.5 border-2 rounded-lg font-black text-xs flex items-center justify-center gap-2 transition-all ${
              roadBlockedFlag
                ? 'bg-red-900 border-red-500 text-white animate-pulse'
                : 'bg-red-800 hover:bg-red-700 border-red-500 text-white shadow'
            }`}
          >
            <AlertOctagon className="w-4 h-4" />
            <span>{roadBlockedFlag ? 'Road Marked Blocked' : 'Mark Road Blocked'}</span>
          </button>

          {/* Button 4: Find Safer Route */}
          <button
            onClick={handleFindSaferRoute}
            className="min-h-[46px] px-3 py-2.5 bg-cyan-700 hover:bg-cyan-600 border-2 border-cyan-500 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
          >
            <Navigation className="w-4 h-4" />
            <span>Find Safer Route</span>
          </button>

          {/* Button 5: Notify Authorities */}
          <button
            onClick={handleNotifyAuthorities}
            className="min-h-[46px] px-3 py-2.5 bg-blue-700 hover:bg-blue-600 border-2 border-blue-500 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow"
          >
            <Radio className="w-4 h-4 text-blue-200" />
            <span>Notify Authorities</span>
          </button>
        </div>
      </section>
    </div>
  );
};
