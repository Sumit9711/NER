import React from 'react';

export const RiskBadge = ({ level, size = 'normal' }) => {
  const normalized = String(level || 'MODERATE').toUpperCase();

  const getStyle = () => {
    switch (normalized) {
      case 'CRITICAL':
      case 'SEVERE':
        return {
          bg: 'bg-red-950',
          text: 'text-red-100',
          border: 'border-red-500',
          dot: 'bg-red-400 animate-ping',
          label: 'CRITICAL RISK'
        };
      case 'HIGH':
        return {
          bg: 'bg-amber-950',
          text: 'text-amber-100',
          border: 'border-amber-500',
          dot: 'bg-amber-400',
          label: 'HIGH RISK'
        };
      case 'MODERATE':
      case 'MEDIUM':
        return {
          bg: 'bg-yellow-950',
          text: 'text-yellow-100',
          border: 'border-yellow-500',
          dot: 'bg-yellow-400',
          label: 'MODERATE RISK'
        };
      case 'LOW':
      case 'CLEAR':
      default:
        return {
          bg: 'bg-emerald-950',
          text: 'text-emerald-100',
          border: 'border-emerald-500',
          dot: 'bg-emerald-400',
          label: 'LOW RISK'
        };
    }
  };

  const style = getStyle();
  const sizeClasses = size === 'large'
    ? 'px-3.5 py-1.5 text-xs font-black tracking-wider gap-2'
    : 'px-2.5 py-1 text-[11px] font-black tracking-wider gap-1.5';

  return (
    <span className={`inline-flex items-center rounded-md border ${style.bg} ${style.border} ${style.text} ${sizeClasses} uppercase`}>
      <span className={`w-2 h-2 rounded-full ${style.dot} shrink-0`} aria-hidden="true" />
      <span>{style.label}</span>
    </span>
  );
};
