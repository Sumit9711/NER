import React from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Clock,
  Cpu,
  Database,
  CheckCircle2,
  CloudRain,
  Sliders,
  Eye,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { DETAILED_RISK_CARD_DATA, getRiskTier } from '../../data/riskData';

export const DetailedRiskCard = ({ selectedCorridor = null }) => {
  // Use selected corridor data if passed, otherwise use default DETAILED_RISK_CARD_DATA
  const data = DETAILED_RISK_CARD_DATA;
  const corridorCode = selectedCorridor ? selectedCorridor.code : data.corridorCode;
  const corridorName = selectedCorridor ? selectedCorridor.name : data.corridorName;
  const score = selectedCorridor ? (selectedCorridor.code === 'NH-6' ? 86 : selectedCorridor.score) : data.riskScore;
  const tier = getRiskTier(score);

  // Dynamic contributing factors reflecting selected corridor or default user specs
  const contributingFactors = [
    {
      name: 'Rainfall',
      level: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'Low' : 'High',
      detail: selectedCorridor ? selectedCorridor.rainfall : data.contributingFactors.rainfall.detail,
      color: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'text-emerald-300' : 'text-red-300',
      badgeBg: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'bg-emerald-950 border-emerald-500' : 'bg-red-950 border-red-500'
    },
    {
      name: 'Road Condition',
      level: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'Good' : 'Poor',
      detail: selectedCorridor ? selectedCorridor.roadCondition : data.contributingFactors.roadCondition.detail,
      color: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'text-emerald-300' : 'text-red-300',
      badgeBg: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'bg-emerald-950 border-emerald-500' : 'bg-red-950 border-red-500'
    },
    {
      name: 'Recent Incident',
      level: selectedCorridor ? selectedCorridor.recentIncident.split(' ')[0] : 'Landslide',
      detail: selectedCorridor ? selectedCorridor.recentIncident : data.contributingFactors.recentIncident.detail,
      color: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'text-emerald-300' : 'text-red-300',
      badgeBg: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'bg-emerald-950 border-emerald-500' : 'bg-red-950 border-red-500'
    },
    {
      name: 'Terrain/Slope',
      level: selectedCorridor && selectedCorridor.terrainSlope ? selectedCorridor.terrainSlope.split(' ')[0] : 'High',
      detail: selectedCorridor ? selectedCorridor.terrainSlope : data.contributingFactors.terrainSlope.detail,
      color: 'text-amber-300',
      badgeBg: 'bg-amber-950 border-amber-500'
    },
    {
      name: 'Traffic Signal',
      level: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'Normal' : 'Abnormal',
      detail: selectedCorridor ? selectedCorridor.trafficSignal : data.contributingFactors.trafficSignal.detail,
      color: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'text-emerald-300' : 'text-red-300',
      badgeBg: selectedCorridor && selectedCorridor.code === 'NH-13' ? 'bg-emerald-950 border-emerald-500' : 'bg-red-950 border-red-500'
    }
  ];

  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl shadow-xl overflow-hidden">
      {/* 1. Mandatory Top Banner: AI / DECISION SUPPORT */}
      <div className="bg-purple-950/80 border-b-2 border-purple-500/50 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 rounded-lg bg-purple-900 border-2 border-purple-400 text-purple-200 text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-inner">
              <Cpu className="w-4 h-4 text-purple-300 animate-pulse" />
              <span>{data.aiBadge}</span>
            </span>
            <span className="text-sm font-bold text-purple-200">
              {corridorCode} Disruption Risk Synthesis
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
            <span>Model: {data.modelVersion}</span>
          </div>
        </div>

        {/* Mandatory User Requirement Statement */}
        <div className="mt-3 p-3 rounded-lg bg-red-950/70 border-2 border-red-500/80 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-black text-red-200 tracking-wide">
              "{data.mandatoryDisclaimer}"
            </div>
            <div className="text-xs text-red-300/90 font-medium mt-0.5">
              {data.precisionStatement}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* 2. Top Summary & Score Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Corridor Focus
              </span>
              <span className="text-xs text-slate-400 font-medium">
                {data.locationDetail}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {corridorCode} : {corridorName}
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Real-time multi-hazard assessment factoring live monsoon downpours, slope shear, and highway blockages.
            </p>

            {/* Metadata Tags */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-800 text-xs text-slate-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Prediction Time:</span>
                <strong className="text-white font-mono">{data.predictionTime}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Model Version:</span>
                <strong className="text-white">{data.modelVersion}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Data Quality:</span>
                <strong className="text-emerald-300">{data.dataQuality}</strong>
              </span>
            </div>
          </div>

          {/* Primary Score Badge */}
          <div className="bg-slate-850 border-2 border-slate-700 rounded-xl p-5 text-center flex flex-col items-center justify-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Evaluated Risk Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className={`text-5xl font-black ${tier.text}`}>
                {score}
              </span>
              <span className="text-2xl font-black text-slate-500">
                / {data.maxScore}
              </span>
            </div>
            <span className={`mt-2 px-3 py-1 rounded-md border-2 text-xs font-black uppercase tracking-wider ${tier.bg} ${tier.border} ${tier.text}`}>
              {tier.label}
            </span>
            <span className="text-[11px] text-slate-400 mt-2 font-medium">
              Scale: 0–25 Low | 26–50 Med | 51–75 High | 76–100 Crit
            </span>
          </div>
        </div>

        {/* 3. The 5 User-Specified Contributing Factors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Contributing Factors (Real-Time Inputs)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {contributingFactors.map((factor) => (
              <div
                key={factor.name}
                className="bg-slate-800/80 border-2 border-slate-700 rounded-xl p-3.5 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    {factor.name}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between">
                    <span className={`text-base font-black ${factor.color}`}>
                      {factor.level}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${factor.badgeBg} ${factor.color}`}>
                      {factor.level.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-300 font-medium mt-2 pt-2 border-t border-slate-700/60 leading-tight">
                  {factor.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Strict Separation: OBSERVED DATA vs PREDICTION */}
        <div className="pt-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Data Provenance & Governance (Strict Architectural Separation)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Observed Data Panel */}
            <div className="bg-slate-950/70 border-2 border-emerald-600/60 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-700 text-white font-black text-[10px] px-3 py-1 rounded-bl-lg tracking-wider uppercase flex items-center gap-1.5">
                <Eye className="w-3 h-3" />
                <span>Empirical Ground Truth</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-300 font-black text-sm uppercase tracking-wider mb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h4>OBSERVED DATA</h4>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Raw sensor measurements, physical camera verification, and on-ground field officer submissions:
              </p>

              <div className="space-y-3">
                {data.observedData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs"
                  >
                    <span className="w-5 h-5 rounded bg-emerald-950 border border-emerald-600 text-emerald-300 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-emerald-200 block">
                        {item.label}:
                      </span>
                      <span className="text-slate-300 font-medium">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI / Model Prediction Panel */}
            <div className="bg-slate-950/70 border-2 border-purple-600/60 rounded-xl p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-700 text-white font-black text-[10px] px-3 py-1 rounded-bl-lg tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Predictive Simulation</span>
              </div>

              <div className="flex items-center gap-2 text-purple-300 font-black text-sm uppercase tracking-wider mb-3">
                <Cpu className="w-5 h-5 text-purple-400" />
                <h4>AI / MODEL PREDICTION</h4>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Machine learning inferences, regression projections, and automated diversion path recommendations:
              </p>

              <div className="space-y-3">
                {data.modelPredictions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2.5 text-xs"
                  >
                    <span className="w-5 h-5 rounded bg-purple-950 border border-purple-600 text-purple-300 text-[10px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <span className="font-bold text-purple-200 block">
                        {item.label}:
                      </span>
                      <span className="text-slate-300 font-medium">
                        {item.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Hybrid Risk Score Dimensions (Demonstration Model Weights) */}
        <div className="bg-slate-850 border border-slate-700 rounded-xl p-5">
          <div className="flex items-center justify-between gap-4 mb-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  Hybrid Risk Formulation Dimensions
                </h3>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Composite calculation formula weighting physical ground observations with probabilistic risk vectors:
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/70 border border-amber-500/60 px-3 py-1 rounded">
              Total Synthesized Score: {score} / 100
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {data.hybridWeights.map((hw) => {
              const pct = (hw.weight / hw.max) * 100;
              return (
                <div key={hw.factor} className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-white">{hw.factor}</span>
                    <span className="font-mono font-black text-amber-400">
                      +{hw.weight} <span className="text-slate-500 text-[11px]">/ {hw.max} pts</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-700 mb-1.5">
                    <div
                      className="bg-amber-500 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    Input: <span className="text-slate-300 font-medium">{hw.observed}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
