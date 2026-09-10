import React, { useState, useEffect } from 'react';
import {
  FileText,
  Wifi,
  WifiOff,
  Radio,
  Camera,
  MapPin,
  Clock,
  Save,
  Send,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  ChevronDown
} from 'lucide-react';
import { incidentService } from '../services/incidentService';
import { INCIDENT_TYPES } from '../data/incidentData';

export const FieldReports = () => {
  // Offline State from service
  const [offlineState, setOfflineState] = useState(() => incidentService.getOfflineState());

  // Form Fields (Simple and Mobile-Friendly)
  const [incidentType, setIncidentType] = useState('Landslide');
  const [severity, setSeverity] = useState('CRITICAL');
  const [location, setLocation] = useState('NH-6 near Mawryngkneng (East Khasi Hills)');
  const [gpsLocation, setGpsLocation] = useState('25.5520° N, 92.0510° E');
  const [dateTime, setDateTime] = useState('10:42 AM, 10 Sep 2026');
  const [description, setDescription] = useState('Slope mudslide blocking northbound lane. Boulders and tree branches on tarmac.');
  const [capturedPhoto, setCapturedPhoto] = useState(true); // Demo captured photo flag
  const [photoPreview, setPhotoPreview] = useState('/assets/field_capture_sample.png');

  // Feedback notifications
  const [feedbackNotice, setFeedbackNotice] = useState('');

  // Switch network state
  const handleNetworkChange = (state) => {
    const updated = incidentService.setNetworkState(state);
    setOfflineState({ ...updated });
    if (state === 'Offline') {
      setFeedbackNotice('Switched to OFFLINE MODE. Reports will be stored locally.');
    } else if (state === 'Limited Connectivity') {
      setFeedbackNotice('Switched to LIMITED CONNECTIVITY (2G/Satellite fringe).');
    } else {
      setFeedbackNotice('ONLINE link restored.');
    }
    setTimeout(() => setFeedbackNotice(''), 3500);
  };

  // "Use Current Location" button
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsLocation(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
          setFeedbackNotice('GPS Coordinates captured via satellite receiver.');
        },
        () => {
          // Fallback realistic NER coordinate
          setGpsLocation('25.5788° N, 91.8933° E (Shillong Central)');
          setFeedbackNotice('GPS Coordinates locked: Shillong Central Sector.');
        }
      );
    } else {
      setGpsLocation('25.5788° N, 91.8933° E (Shillong Central)');
    }
    setTimeout(() => setFeedbackNotice(''), 3000);
  };

  // "Capture Photo" button
  const handleCapturePhoto = () => {
    setCapturedPhoto(true);
    setFeedbackNotice('High-resolution photo captured with NIC timestamp and GPS watermark.');
    setTimeout(() => setFeedbackNotice(''), 3000);
  };

  // "Save Report" (Local Draft)
  const handleSaveReport = () => {
    const reportData = {
      incidentType,
      severity,
      location,
      gpsLocation,
      dateTime,
      description,
      hasPhoto: capturedPhoto
    };
    incidentService.saveFieldReport(reportData, 'Offline');
    const updated = incidentService.getOfflineState();
    setOfflineState({ ...updated });
    setFeedbackNotice('Report saved as local draft on this device.');
    setTimeout(() => setFeedbackNotice(''), 3500);
  };

  // "Submit Report"
  const handleSubmitReport = (e) => {
    e.preventDefault();
    const reportData = {
      incidentType,
      severity,
      location,
      gpsLocation,
      dateTime,
      description,
      hasPhoto: capturedPhoto
    };

    const { report, state } = incidentService.saveFieldReport(reportData, offlineState.networkState);
    setOfflineState({ ...state });

    if (offlineState.networkState === 'Online') {
      setFeedbackNotice(`Report ${report.id} submitted and synchronized to Central Command successfully!`);
    } else {
      setFeedbackNotice(`Report ${report.id} stored in local device queue. Will sync automatically when connection returns.`);
    }

    setTimeout(() => setFeedbackNotice(''), 4000);
  };

  // "Sync Now" button
  const handleManualSync = () => {
    const updated = incidentService.syncPendingReports();
    setOfflineState({ ...updated });
    setFeedbackNotice('All pending ground reports synchronized successfully with Command Center.');
    setTimeout(() => setFeedbackNotice(''), 3500);
  };

  const isOffline = offlineState.networkState === 'Offline';
  const isLimited = offlineState.networkState === 'Limited Connectivity';

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 shadow-lg flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-900 border border-blue-500 text-blue-300">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Field Officer Ground Reporting Portal
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-300 mt-0.5">
              Rapid on-site incident reporting with offline local caching & satellite store-and-forward
            </p>
          </div>
        </div>

        {/* Network State Simulator Bar */}
        <div className="flex items-center gap-1 bg-slate-900 p-1.5 rounded-xl border border-slate-700">
          <span className="text-[11px] font-black uppercase text-slate-400 px-2">Mode:</span>
          {(['Online', 'Limited Connectivity', 'Offline']).map((mode) => (
            <button
              key={mode}
              onClick={() => handleNetworkChange(mode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${
                offlineState.networkState === mode
                  ? mode === 'Offline'
                    ? 'bg-red-700 text-white shadow'
                    : mode === 'Limited Connectivity'
                    ? 'bg-amber-700 text-white shadow'
                    : 'bg-emerald-700 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HIGHLY VISIBLE OFFLINE MODE BANNER (When Offline or Limited Connectivity) */}
      {/* ========================================================================= */}
      {(isOffline || isLimited) && (
        <div
          role="alert"
          className={`p-5 rounded-xl border-2 shadow-xl text-white space-y-2 transition-all ${
            isOffline
              ? 'bg-red-950 border-red-500 animate-pulse'
              : 'bg-amber-950 border-amber-500'
          }`}
        >
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${isOffline ? 'bg-red-600' : 'bg-amber-600'} text-white`}>
                <WifiOff className="w-6 h-6" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-black uppercase tracking-wider block">
                  {isOffline ? 'OFFLINE MODE' : 'LIMITED CONNECTIVITY'}
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-100">
                  Your report will be saved on this device and synchronized when connectivity returns.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-black">
              <span className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-white">
                Pending Sync: <strong className="text-amber-400">{offlineState.pendingCount}</strong>
              </span>
              <span className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-white">
                Synced: <strong className="text-emerald-400">{offlineState.syncedCount}</strong>
              </span>
              <span className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-lg text-slate-300 hidden sm:inline">
                Last Sync: <strong>{offlineState.lastSyncTime}</strong>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Online Telemetry Status Indicator (When Online) */}
      {!isOffline && !isLimited && (
        <div className="p-4 rounded-xl bg-emerald-950/60 border-2 border-emerald-600 flex items-center justify-between flex-wrap gap-2 text-xs text-white">
          <div className="flex items-center gap-2">
            <Wifi className="w-5 h-5 text-emerald-400" />
            <span className="font-black uppercase tracking-wider text-emerald-300">
              Online Command Uplink Active
            </span>
            <span className="text-slate-300 hidden sm:inline">&bull; Direct NIC satellite sync</span>
          </div>

          <div className="flex items-center gap-3 font-bold">
            <span>Pending Sync: <strong className="text-amber-300">{offlineState.pendingCount}</strong></span>
            <span>Synced: <strong className="text-emerald-300">{offlineState.syncedCount}</strong></span>
            <span>Last Sync: <strong>{offlineState.lastSyncTime}</strong></span>

            {offlineState.pendingCount > 0 && (
              <button
                onClick={handleManualSync}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 rounded-lg text-white font-black flex items-center gap-1 transition-all shadow"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Sync Now ({offlineState.pendingCount})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Transient Action Feedback Notice */}
      {feedbackNotice && (
        <div className="p-3 bg-blue-950 border-2 border-blue-500 rounded-lg text-blue-100 text-xs font-black flex items-center gap-2 shadow animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
          <span>{feedbackNotice}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SIMPLE, MOBILE-FRIENDLY FIELD REPORTING FORM                              */}
      {/* ========================================================================= */}
      <form
        onSubmit={handleSubmitReport}
        className="bg-slate-800/95 border-2 border-slate-700 rounded-xl p-5 sm:p-7 shadow-2xl space-y-5"
      >
        <div className="border-b border-slate-700 pb-3 flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-black text-white uppercase tracking-wider">
            Incident Hazard Submission
          </h2>
          <span className="text-xs text-slate-400 font-bold">Step 1 of 1</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Incident Type */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
              Incident Type *
            </label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full bg-slate-900 border-2 border-slate-600 rounded-lg px-3.5 py-3 text-sm font-bold text-white focus:border-blue-500 focus:outline-none"
              required
            >
              {INCIDENT_TYPES.filter(t => t !== 'All Types').map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* 2. Severity */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
              Severity Level *
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className={`w-full border-2 rounded-lg px-3.5 py-3 text-sm font-black focus:outline-none ${
                severity === 'CRITICAL'
                  ? 'bg-red-950 border-red-600 text-red-200'
                  : severity === 'HIGH'
                  ? 'bg-amber-950 border-amber-600 text-amber-200'
                  : 'bg-slate-900 border-slate-600 text-white'
              }`}
              required
            >
              <option value="CRITICAL">CRITICAL (Total Road Closure)</option>
              <option value="HIGH">HIGH (Single Lane Alternating)</option>
              <option value="MODERATE">MODERATE (Slow Traffic Caution)</option>
              <option value="LOW">LOW (Passable with Care)</option>
            </select>
          </div>
        </div>

        {/* 3. Location Description */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
            Location Landmark & Highway Axis *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <MapPin className="w-4 h-4 text-blue-400" />
            </div>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. NH-6 near Shillong Mile 28"
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-lg text-sm font-semibold text-white focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* 4. GPS Location & Button */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-black uppercase tracking-wider text-slate-300">
              GPS Satellite Coordinates *
            </label>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="text-xs font-bold text-blue-300 hover:text-white flex items-center gap-1.5 py-1 px-2.5 rounded bg-slate-900 border border-slate-700 transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>Use Current Location</span>
            </button>
          </div>
          <input
            type="text"
            value={gpsLocation}
            onChange={(e) => setGpsLocation(e.target.value)}
            placeholder="e.g. 25.6120° N, 91.9210° E"
            className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-lg text-sm font-mono font-bold text-emerald-400 focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* 5. Date & Time */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
            Date & Time of Observation *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-lg text-sm font-semibold text-white focus:border-blue-500 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* 6. Description */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
            Hazard Description & Observed Debris *
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe debris dimensions, water runoff, vehicle backlog, and physical slope conditions..."
            className="w-full px-4 py-3 bg-slate-900 border-2 border-slate-600 rounded-lg text-sm font-medium text-white focus:border-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* 7. Photo Capture Card */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
            Photo Evidence Capture
          </label>
          <div className="p-4 bg-slate-900 rounded-xl border-2 border-dashed border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-slate-800 text-blue-400 border border-slate-700">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {capturedPhoto ? 'NH6_Landslide_Evidence_01.jpg' : 'No photo captured yet'}
                </p>
                <p className="text-xs text-slate-400">
                  {capturedPhoto ? 'Attached & watermarked with GPS telemetry' : 'Tap capture photo to attach evidence'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCapturePhoto}
              className="min-h-[42px] px-4 py-2 bg-slate-800 hover:bg-slate-750 border border-slate-600 rounded-lg text-xs font-bold text-white flex items-center gap-2 transition-all shadow"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>Capture Photo</span>
            </button>
          </div>
        </div>

        {/* Action Buttons: Save Report & Submit Report */}
        <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleSaveReport}
            className="w-full sm:w-auto min-h-[48px] px-5 py-3 bg-slate-800 hover:bg-slate-750 border-2 border-slate-600 rounded-lg text-slate-200 hover:text-white text-sm font-bold flex items-center justify-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Report (Draft)</span>
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto min-h-[48px] px-6 py-3 bg-blue-700 hover:bg-blue-600 border-2 border-blue-500 rounded-lg text-white text-sm font-black flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Send className="w-4 h-4" />
            <span>{isOffline ? 'Save to Offline Queue' : 'Submit Report'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
