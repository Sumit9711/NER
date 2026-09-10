import React from 'react';
import { getStatusBadgeStyle } from '../../utils/statusColors';

export const StatusBadge = ({ status, size = 'normal', showDot = true, customLabel }) => {
  const style = getStatusBadgeStyle(status);
  const label = customLabel || style.label || status;

  const sizeClasses = size === 'large'
    ? 'px-3.5 py-1.5 text-sm font-semibold tracking-wide gap-2'
    : 'px-2.5 py-1 text-xs font-bold tracking-wider uppercase gap-1.5';

  return (
    <span
      className={`inline-flex items-center rounded-md border ${style.bg} ${style.border} ${style.text} ${sizeClasses}`}
    >
      {showDot && (
        <span
          className={`h-2 w-2 rounded-full ${style.dot} ring-2 ring-slate-900/50 shrink-0`}
          aria-hidden="true"
        />
      )}
      <span>{label}</span>
    </span>
  );
};
