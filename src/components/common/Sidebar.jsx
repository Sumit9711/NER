import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Truck,
  AlertOctagon,
  Activity,
  Compass,
  Timer,
  Bell,
  PackageCheck,
  FileText,
  BarChart3,
  Users,
  ClipboardList,
  Shield,
  ChevronLeft,
  ChevronRight,
  Lock
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';

export const NAVIGATION_ITEMS = [
  {
    key: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: 'LIVE',
    badgeColor: 'bg-emerald-800 text-emerald-100 border border-emerald-500'
  },
  {
    key: 'liveMap',
    path: '/live-map',
    label: 'Live Map',
    icon: Map,
    badge: 'GIS',
    badgeColor: 'bg-blue-800 text-blue-100 border border-blue-500'
  },
  {
    key: 'vehicles',
    path: '/vehicles',
    label: 'Vehicles',
    icon: Truck,
    badge: '42',
    badgeColor: 'bg-slate-700 text-slate-200'
  },
  {
    key: 'incidents',
    path: '/incidents',
    label: 'Incidents',
    icon: AlertOctagon,
    badge: '3 BLOCK',
    badgeColor: 'bg-red-800 text-red-100 border border-red-500 font-black animate-pulse'
  },
  {
    key: 'riskIntelligence',
    path: '/risk-intelligence',
    label: 'Risk Intelligence',
    icon: Activity,
    badge: 'AI PREDICT',
    badgeColor: 'bg-purple-800 text-purple-100 border border-purple-500'
  },
  {
    key: 'routeRecommendations',
    path: '/route-recommendations',
    label: 'Route Recommendations',
    icon: Compass,
    badge: 'DYNAMIC',
    badgeColor: 'bg-cyan-800 text-cyan-100 border border-cyan-500'
  },
  {
    key: 'etaDelays',
    path: '/eta-delays',
    label: 'ETA & Delays',
    icon: Timer,
    badge: '+42m AVG',
    badgeColor: 'bg-amber-800 text-amber-100 border border-amber-500'
  },
  {
    key: 'alerts',
    path: '/alerts',
    label: 'Alerts',
    icon: Bell,
    badge: '4 CRIT',
    badgeColor: 'bg-red-800 text-red-100 border border-red-500'
  },
  {
    key: 'deliveries',
    path: '/deliveries',
    label: 'Deliveries',
    icon: PackageCheck,
    badge: '2.1k MT',
    badgeColor: 'bg-emerald-800 text-emerald-100 border border-emerald-500'
  },
  {
    key: 'fieldReports',
    path: '/field-reports',
    label: 'Field Reports',
    icon: FileText,
    badge: 'OFFLINE',
    badgeColor: 'bg-slate-700 text-slate-200'
  },
  {
    key: 'analytics',
    path: '/analytics',
    label: 'Analytics',
    icon: BarChart3
  },
  {
    key: 'usersRoles',
    path: '/users-roles',
    label: 'Users & Roles',
    icon: Users
  },
  {
    key: 'auditLogs',
    path: '/audit-logs',
    label: 'Audit Logs',
    icon: ClipboardList
  }
];

export const Sidebar = ({
  isOpen = false,
  isCollapsed = false,
  onToggleCollapse,
  onCloseMobile
}) => {
  const { user, canAccessRoute } = useAuth();
  const { t } = useLanguage();

  // Basic Frontend RBAC: Filter navigation items accessible to user's active role
  const accessibleItems = NAVIGATION_ITEMS.filter((item) => canAccessRoute(item.path));

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          bg-slate-950 border-r-2 border-slate-800 text-slate-100
          transition-all duration-300 ease-in-out flex flex-col justify-between
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-64 sm:w-72'}
        `}
        aria-label="Sidebar Command Navigation"
      >
        {/* Top Header / Collapser */}
        <div>
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            {!isCollapsed && (
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-300">
                  COMMAND CONSOLE
                </span>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title={isCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Sidebar to Icons'}
              aria-label={isCollapsed ? 'Expand Navigation Sidebar' : 'Collapse Sidebar to Icons'}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Active Role Indicator in Sidebar */}
          {!isCollapsed && user && (
            <div className="px-4 py-2.5 bg-slate-900/60 border-b border-slate-800/80 text-xs">
              <span className="text-[10px] font-black uppercase text-slate-400 block tracking-wider">
                RBAC Active View:
              </span>
              <div className="font-bold text-white truncate mt-0.5">
                {user.role}
              </div>
              <div className="text-[10px] text-cyan-400 font-mono mt-0.5">
                {accessibleItems.length} of {NAVIGATION_ITEMS.length} modules permitted
              </div>
            </div>
          )}

          {/* Navigation Links List */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-230px)]">
            {accessibleItems.map((item) => {
              const Icon = item.icon;
              const translatedLabel = t(`nav.${item.key}`, item.label);

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onCloseMobile}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-black
                    transition-all duration-150 group relative
                    ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg border-2 border-blue-400'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white border-2 border-transparent'
                    }
                    ${isCollapsed ? 'justify-center px-2' : ''}
                  `}
                  title={isCollapsed ? translatedLabel : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && (
                    <span className="flex-1 truncate tracking-wide">
                      {translatedLabel}
                    </span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span className={`text-[10px] font-mono font-black px-1.5 py-0.5 rounded shadow-sm ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip on collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-900 text-white text-xs font-bold rounded-md whitespace-nowrap shadow-xl border border-slate-700 hidden group-hover:block z-50">
                      {translatedLabel}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Security / Government Stamp */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          {!isCollapsed ? (
            <div className="text-center space-y-1">
              <p className="text-[11px] font-black text-slate-300 uppercase tracking-tight">
                NIC SECURE INTRANET
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                RBAC Policy NEC-2026.04
              </p>
            </div>
          ) : (
            <div className="flex justify-center" title="NIC Secure Intranet Active">
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
