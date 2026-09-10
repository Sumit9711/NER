import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { BarChart3, AlertOctagon, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { REGIONAL_RISK_OVERVIEW } from '../../data/riskData';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border-2 border-slate-750 p-3 rounded-lg shadow-xl text-xs text-white">
        <div className="font-black text-sm" style={{ color: data.fill }}>
          {data.name}
        </div>
        <div className="mt-1 flex items-center justify-between gap-4 text-slate-300">
          <span>Corridors Affected:</span>
          <span className="font-bold text-white text-sm">{data.count} routes</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-slate-300">
          <span>Regional Share:</span>
          <span className="font-bold text-white text-sm">{data.percentage}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export const RiskDistributionChart = ({ distribution = REGIONAL_RISK_OVERVIEW.distribution }) => {
  const getIcon = (tier) => {
    switch (tier) {
      case 'CRITICAL':
        return <AlertOctagon className="w-4 h-4 text-red-400" />;
      case 'HIGH':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'MEDIUM':
        return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-slate-900/90 border-2 border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-black text-white uppercase tracking-wider">
              Regional Risk Distribution
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            22 Monitored Corridors
          </span>
        </div>
        <p className="text-xs text-slate-300 mb-4">
          Percentage and route count of arterial highways classified under each vulnerability tier
        </p>
      </div>

      {/* Recharts Bar Chart */}
      <div className="h-44 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 50]}
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              unit="%"
            />
            <YAxis
              type="category"
              dataKey="tier"
              tick={{ fill: '#f1f5f9', fontSize: 12, fontWeight: 800 }}
              width={75}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} />
            <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={20}>
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quantitative Grid Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800">
        {distribution.map((item) => (
          <div
            key={item.tier}
            className="bg-slate-800/80 border border-slate-700 rounded-lg p-2.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-xs font-black">
              <span style={{ color: item.fill }}>{item.tier}</span>
              {getIcon(item.tier)}
            </div>
            <div className="mt-1 flex items-baseline justify-between">
              <span className="text-xl font-black text-white">{item.percentage}%</span>
              <span className="text-xs font-bold text-slate-300">{item.count} routes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
