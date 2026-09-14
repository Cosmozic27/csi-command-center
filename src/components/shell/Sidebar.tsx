'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Calendar,
  CheckSquare,
  FileText,
  BarChart3,
  Activity,
  ChevronLeft,
  ChevronRight,
  Shield,
  Layers,
} from 'lucide-react';
import { useMockSession } from '@/contexts/MockSessionContext';
import { UserAvatar } from '@/components/ui/user-avatar';
import { RoleBadge } from '@/components/ui/role-badge';
import { MOCK_TEAMS } from '@/data/mock-teams';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Teams & Rosters', href: '/app/teams', icon: Users, badge: '9' },
  { name: 'Projects', href: '/app/projects', icon: FolderKanban, badge: '3' },
  { name: 'Events', href: '/app/events', icon: Calendar, badge: '3' },
  { name: 'Tasks & Board', href: '/app/tasks', icon: CheckSquare, badge: '13' },
  { name: 'Media & Files', href: '/app/files', icon: FileText },
  { name: 'Calendar', href: '/app/calendar', icon: Calendar },
  { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { name: 'Members', href: '/app/members', icon: Users },
  { name: 'Activity', href: '/app/activity', icon: Activity },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser } = useMockSession();
  const [collapsed, setCollapsed] = useState(false);
  const [showTeamsDropdown, setShowTeamsDropdown] = useState(false);

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-border/80 bg-card/60 backdrop-blur-xl transition-all duration-300 z-30 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border/60">
        <Link href="/app/dashboard" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(0,229,255,0.4)] ring-1 ring-cyan-400/50">
            <Shield className="h-5 w-5 text-slate-950" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-wider text-foreground uppercase group-hover:text-cyan-400 transition-colors">
                CSI Command
              </span>
              <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase">
                Operating System
              </span>
            </div>
          )}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Quick Team Portal Switcher */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-border/40">
          <button
            onClick={() => setShowTeamsDropdown(!showTeamsDropdown)}
            className="w-full flex items-center justify-between rounded-lg border border-cyan-500/20 bg-cyan-500/5 px-3 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/10 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              <span>Team Portals</span>
            </span>
            <span className="text-[10px] bg-cyan-500/20 px-1.5 py-0.5 rounded text-cyan-300">
              9
            </span>
          </button>

          {showTeamsDropdown && (
            <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border border-border/60 bg-card p-1 space-y-0.5">
              {MOCK_TEAMS.map((team) => (
                <Link
                  key={team.id}
                  href={`/app/teams?team=${team.slug}`}
                  onClick={() => setShowTeamsDropdown(false)}
                  className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <span className="truncate">{team.name}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">
                    {team.memberCount}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Navigation Links */}
      <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/app/dashboard' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_-4px_rgba(0,229,255,0.3)]'
                  : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
              } ${collapsed ? 'justify-center' : ''}`}
              title={collapsed ? item.name : undefined}
            >
              <Icon
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive ? 'text-cyan-400' : 'text-muted-foreground group-hover:text-foreground'
                }`}
              />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between">
                  <span>{item.name}</span>
                  {item.badge && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                        isActive
                          ? 'bg-cyan-500/25 text-cyan-300'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Current User Card */}
      <div className="p-3 border-t border-border/60 bg-card/40">
        <div
          className={`flex items-center gap-3 rounded-lg p-2 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <UserAvatar
            name={currentUser.fullName}
            avatarUrl={currentUser.avatarUrl}
            size="sm"
          />
          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-foreground truncate">
                {currentUser.fullName}
              </span>
              <div className="mt-0.5">
                <RoleBadge role={currentUser.primaryRole} size="sm" showIcon={false} />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
