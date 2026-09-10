import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine
} from 'recharts';
import {
  DELIVERY_DELAYS_DATA,
  INCIDENT_FREQUENCY_DATA,
  RISK_TREND_DATA,
  VEHICLE_ACTIVITY_DATA,
  ROUTE_ACCESSIBILITY_DATA,
  ALERT_RESPONSE_TIME_DATA,
  SUCCESSFUL_DELIVERIES_DATA
} from '../../data/analyticsData';

// Reusable tooltip style
const tooltipStyle = {
  backgroundColor: '#0f172a',
  borderColor: '#334155',
  color: '#ffffff',
  borderRadius: '8px',
  fontSize: '12px',
  fontWeight: 600,
  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
};

// 1. Delivery Delays Chart
export const DeliveryDelaysChart = () => (
  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-2">
    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          1. Delivery Delays across Corridors
        </h3>
        <p className="text-xs text-slate-400">
          Average and maximum transit delays caused by monsoon bottlenecks (Unit: Minutes)
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded border border-amber-600">
        Unit: Minutes Delay
      </span>
    </div>

    <div className="h-72 w-full pt-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DELIVERY_DELAYS_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="corridor"
            stroke="#94a3b8"
            tick={{ fill: '#f1f5f9', fontSize: 11, fontWeight: 700 }}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            unit=" min"
            domain={[0, 300]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(value, name) => [`${value} minutes`, name === 'avgDelayMinutes' ? 'Average Delay' : 'Maximum Peak Delay']}
            labelFormatter={(label) => `Corridor: ${label}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 700 }}
            formatter={(val) => (val === 'avgDelayMinutes' ? 'Average Delay (min)' : 'Max Peak Delay (min)')}
          />
          <Bar dataKey="avgDelayMinutes" fill="#f59e0b" radius={[4, 4, 0, 0]} name="avgDelayMinutes" />
          <Bar dataKey="maxDelayMinutes" fill="#ef4444" radius={[4, 4, 0, 0]} name="maxDelayMinutes" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// 2. Incident Frequency Chart
export const IncidentFrequencyChart = () => (
  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-2">
    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          2. Incident Frequency by Hazard Classification
        </h3>
        <p className="text-xs text-slate-400">
          Monthly breakdown of verified road-blocking geological events (Unit: Incident Count)
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-red-400 bg-red-950 px-2.5 py-1 rounded border border-red-600">
        Unit: Count of Events
      </span>
    </div>

    <div className="h-72 w-full pt-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={INCIDENT_FREQUENCY_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#f1f5f9', fontSize: 11, fontWeight: 700 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" ev" domain={[0, 130]} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 700 }} />
          <Bar dataKey="landslides" stackId="a" fill="#dc2626" name="Landslides" />
          <Bar dataKey="flashFloods" stackId="a" fill="#3b82f6" name="Flash Floods" />
          <Bar dataKey="mudslides" stackId="a" fill="#d97706" name="Mudslides" />
          <Bar dataKey="rockfalls" stackId="a" fill="#8b5cf6" name="Rockfalls" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// 3. Risk Trend Chart
export const RiskTrendChart = () => (
  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-2">
    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          3. 7-Day Regional Risk Trend vs Rainfall Deluge
        </h3>
        <p className="text-xs text-slate-400">
          Composite disruption risk score tracked against catchment cloudburst precipitation
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950 px-2.5 py-1 rounded border border-purple-600">
        Units: Risk (0–100) & Rainfall (mm)
      </span>
    </div>

    <div className="h-72 w-full pt-3">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={RISK_TREND_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="day" stroke="#94a3b8" tick={{ fill: '#f1f5f9', fontSize: 11, fontWeight: 700 }} />
          <YAxis
            yAxisId="left"
            stroke="#c084fc"
            domain={[0, 100]}
            unit=" pts"
            tick={{ fill: '#c084fc', fontSize: 11 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#38bdf8"
            domain={[0, 150]}
            unit=" mm"
            tick={{ fill: '#38bdf8', fontSize: 11 }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 700 }} />
          <Bar yAxisId="right" dataKey="rainfallMm" fill="#0284c7" name="Daily Rainfall (mm)" radius={[4, 4, 0, 0]} opacity={0.6} />
          <Line yAxisId="left" type="monotone" dataKey="regionalRiskScore" stroke="#a855f7" strokeWidth={3} dot={{ r: 4 }} name="Risk Score (0–100)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// 4. Vehicle Activity Chart
export const VehicleActivityChart = () => (
  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-2">
    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          4. Vehicle Activity across 24h Timeline
        </h3>
        <p className="text-xs text-slate-400">
          Fleet movement velocity versus night curfews and staging bottlenecks (Unit: Convoys)
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-600">
        Unit: Active Vehicles
      </span>
    </div>

    <div className="h-72 w-full pt-3">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={VEHICLE_ACTIVITY_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="timeHour" stroke="#94a3b8" tick={{ fill: '#f1f5f9', fontSize: 11, fontWeight: 700 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" veh" domain={[0, 45]} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 700 }} />
          <Area type="monotone" dataKey="moving" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.6} name="Moving (Transit)" />
          <Area type="monotone" dataKey="delayed" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} name="Delayed (Blocked)" />
          <Area type="monotone" dataKey="stagingHold" stackId="1" stroke="#64748b" fill="#64748b" fillOpacity={0.4} name="Staging Hold / Parked" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// 5. Route Accessibility Chart
export const RouteAccessibilityChart = () => (
  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-2">
    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          5. Route Accessibility Percentage by NER State
        </h3>
        <p className="text-xs text-slate-400">
          Proportion of arterial highway network currently operable for heavy transport (Unit: % Operable)
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-600">
        Unit: % Network Open
      </span>
    </div>

    <div className="h-72 w-full pt-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ROUTE_ACCESSIBILITY_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="state" stroke="#94a3b8" tick={{ fill: '#f1f5f9', fontSize: 11, fontWeight: 700 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} unit="%" domain={[0, 100]} />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(val, name, item) => [`${val}% Accessible (${item.payload.blockedKm} km blocked of ${item.payload.totalKm} km)`]}
          />
          <ReferenceLine y={75} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Target 75%', fill: '#f59e0b', fontSize: 10 }} />
          <Bar dataKey="accessiblePct" name="Accessibility (%)" radius={[4, 4, 0, 0]}>
            {ROUTE_ACCESSIBILITY_DATA.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.accessiblePct >= 80 ? '#10b981' : entry.accessiblePct >= 65 ? '#f59e0b' : '#ef4444'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// 6. Alert Response Time Chart
export const AlertResponseTimeChart = () => (
  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-2">
    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          6. Alert Response Time (MTTR) by District Disaster Cell
        </h3>
        <p className="text-xs text-slate-400">
          Mean Time to Acknowledge emergency directives across district operations rooms (Unit: Minutes)
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950 px-2.5 py-1 rounded border border-blue-600">
        Unit: Minutes MTTR
      </span>
    </div>

    <div className="h-72 w-full pt-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ALERT_RESPONSE_TIME_DATA}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 60, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis type="number" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" min" domain={[0, 10]} />
          <YAxis
            type="category"
            dataKey="district"
            stroke="#94a3b8"
            tick={{ fill: '#f1f5f9', fontSize: 11, fontWeight: 700 }}
            width={140}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(val) => [`${val} minutes MTTR`]} />
          <ReferenceLine x={5} stroke="#ef4444" strokeDasharray="3 3" label={{ value: '5 min Max SOP Limit', fill: '#ef4444', fontSize: 10 }} />
          <Bar dataKey="mttrMinutes" name="MTTR (Minutes)" radius={[0, 4, 4, 0]}>
            {ALERT_RESPONSE_TIME_DATA.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.mttrMinutes <= 5 ? '#10b981' : '#ef4444'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

// 7. Successful Deliveries Chart
export const SuccessfulDeliveriesChart = () => (
  <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-5 shadow-lg space-y-2">
    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2">
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider">
          7. Successful Deliveries Over Past 6 Weeks
        </h3>
        <p className="text-xs text-slate-400">
          Weekly aggregate tonnage of emergency rations & medicines successfully delivered (Unit: Metric Tonnes)
        </p>
      </div>
      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-600">
        Unit: Metric Tonnes (MT)
      </span>
    </div>

    <div className="h-72 w-full pt-3">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={SUCCESSFUL_DELIVERIES_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="week" stroke="#94a3b8" tick={{ fill: '#f1f5f9', fontSize: 11, fontWeight: 700 }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} unit=" MT" domain={[0, 2500]} />
          <Tooltip contentStyle={tooltipStyle} formatter={(val) => [`${val} MT`]} />
          <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '11px', fontWeight: 700 }} />
          <Bar dataKey="onTimeMT" stackId="a" fill="#10b981" name="On-Time Delivery (MT)" />
          <Bar dataKey="delayedMT" stackId="a" fill="#f59e0b" name="Delayed but Delivered (MT)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
