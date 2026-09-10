import React from 'react';
import { Truck, AlertTriangle, Package, CloudRain } from 'lucide-react';
import { StatCard } from '../common/StatCard';
import { DASHBOARD_METRICS } from '../../data/mockDashboardData';

export const MetricGrid = ({ selectedSector }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        title="Active Relief Convoys"
        value={DASHBOARD_METRICS.activeConvoys.value}
        unit={DASHBOARD_METRICS.activeConvoys.unit}
        subtext={DASHBOARD_METRICS.activeConvoys.subtext}
        trend={DASHBOARD_METRICS.activeConvoys.trend}
        status={DASHBOARD_METRICS.activeConvoys.status}
        icon={Truck}
        accentColor="blue"
      />

      <StatCard
        title="Blocked Corridors / Chokepoints"
        value={DASHBOARD_METRICS.blockedCorridors.value}
        unit={DASHBOARD_METRICS.blockedCorridors.unit}
        subtext={DASHBOARD_METRICS.blockedCorridors.subtext}
        trend={DASHBOARD_METRICS.blockedCorridors.trend}
        status={DASHBOARD_METRICS.blockedCorridors.status}
        icon={AlertTriangle}
        accentColor="red"
      />

      <StatCard
        title="Relief Cargo Delivered"
        value={DASHBOARD_METRICS.criticalReliefDelivered.value}
        unit={DASHBOARD_METRICS.criticalReliefDelivered.unit}
        subtext={DASHBOARD_METRICS.criticalReliefDelivered.subtext}
        trend={DASHBOARD_METRICS.criticalReliefDelivered.trend}
        status={DASHBOARD_METRICS.criticalReliefDelivered.status}
        icon={Package}
        accentColor="emerald"
      />

      <StatCard
        title="Monsoon Hazard Index"
        value={DASHBOARD_METRICS.monsoonRiskIndex.value}
        unit={DASHBOARD_METRICS.monsoonRiskIndex.unit}
        subtext={DASHBOARD_METRICS.monsoonRiskIndex.subtext}
        trend={DASHBOARD_METRICS.monsoonRiskIndex.trend}
        status={DASHBOARD_METRICS.monsoonRiskIndex.status}
        icon={CloudRain}
        accentColor="amber"
      />
    </div>
  );
};
