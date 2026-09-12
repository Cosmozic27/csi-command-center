'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  FolderKanban,
  CheckSquare,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Activity,
  AlertCircle,
  Clock,
  Layers,
} from 'lucide-react';
import { useMockSession } from '@/contexts/MockSessionContext';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { RoleBadge } from '@/components/ui/role-badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { MOCK_TASKS } from '@/data/mock-tasks';
import { MOCK_PROJECTS } from '@/data/mock-projects';
import { MOCK_TEAMS } from '@/data/mock-teams';
import { MOCK_ACTIVITY } from '@/data/mock-activity';

export default function DashboardPage() {
  const { currentUser, isCoreOrFaculty } = useMockSession();
  const [activeTab, setActiveTab] = useState('overview');

  // Filter tasks for current user or overall
  const pendingTasks = MOCK_TASKS.filter((t) => t.status !== 'COMPLETED').slice(0, 5);
  const urgentTasks = MOCK_TASKS.filter((t) => t.priority === 'URGENT' || t.priority === 'HIGH').slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-linear-to-r from-card/80 via-card/50 to-cyan-950/20 p-6 backdrop-blur-xl">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-cyan-400">
                // COMMAND CENTER v2.0
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {currentUser.fullName}
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl">
              Centralized automation and operations hub for the CSI Committee. All 9 team sectors are connected.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <RoleBadge role={currentUser.primaryRole} size="md" />
            <Link href="/app/tasks">
              <Button variant="cyber" size="sm">
                View All Tasks
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Projects"
          value="2 / 3"
          subtitle="TechFest & Hackathon 2026"
          icon={FolderKanban}
          glowColor="cyan"
          trend={{ value: "+1 this month", isPositive: true }}
        />
        <StatCard
          title="Tasks in Progress"
          value="13"
          subtitle="4 in progress, 2 blocked"
          icon={CheckSquare}
          glowColor="violet"
          trend={{ value: "68% completion rate", isPositive: true }}
        />
        <StatCard
          title="Active Committee"
          value="38"
          subtitle="Across 9 specialized teams"
          icon={Users}
          glowColor="emerald"
          badge="100% Onboarded"
        />
        <StatCard
          title="Next Milestone"
          value="48d"
          subtitle="CSI TechFest 2026 Launch"
          icon={Calendar}
          glowColor="amber"
          badge="HIGH PRIORITY"
        />
      </div>

      {/* Tab Navigation for Views */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <Tabs
          tabs={[
            { id: 'overview', label: 'Command Overview' },
            { id: 'teams', label: 'Team Sectors', badge: '9' },
            { id: 'design-system', label: 'Design System Primitives' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <span>Last sync: Live mock stream</span>
        </div>
      </div>

      {/* Tab Content: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main 2-Col Area: Priority Tasks & Projects */}
          <div className="space-y-6 lg:col-span-2">
            {/* Urgent Items Alert */}
            {urgentTasks.length > 0 && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-wider">
                    <AlertCircle className="h-4 w-4" />
                    <span>Urgent & High Priority Directives</span>
                  </div>
                  <span className="text-[11px] text-red-400/80 font-mono">
                    {urgentTasks.length} requiring immediate attention
                  </span>
                </div>

                <div className="space-y-2">
                  {urgentTasks.map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-card/60 border border-border/60 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <PriorityBadge priority={t.priority} size="sm" />
                        <span className="font-semibold text-foreground">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="text-cyan-400 font-medium">{t.assignedTeamName}</span>
                        <span>•</span>
                        <span>Due {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'TBD'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Active Projects Showcase */}
            <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Active Strategic Projects
                  </h3>
                </div>
                <Link
                  href="/app/projects"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                >
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MOCK_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-border/60 bg-card/40 hover:border-cyan-500/30 hover:bg-card/80 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-sm text-foreground group-hover:text-cyan-400 transition-colors">
                        {proj.name}
                      </span>
                      <StatusBadge status={proj.status} size="sm" />
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                      {proj.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-border/40">
                      <span>Lead: {proj.leadTeamName || proj.participatingTeams?.[0]?.name || 'Core Team'}</span>
                      <span>Target: {new Date(proj.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Tasks List */}
            <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Cross-Team Task Queue
                  </h3>
                </div>
                <Link
                  href="/app/tasks"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                >
                  <span>Full Board</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-2">
                {pendingTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border border-border/50 bg-card/40 hover:bg-card/80 hover:border-border transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <StatusBadge status={task.status} size="sm" />
                      <div>
                        <span className="text-xs font-semibold text-foreground block">
                          {task.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {task.assignedTeamName} • Assigned to {task.assignedUserName || 'Unassigned'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <PriorityBadge priority={task.priority} size="sm" showIcon={false} />
                      <span className="text-[10px] font-mono text-slate-400">
                        Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar: Activity Stream & System Telemetry */}
          <div className="space-y-6">
            {/* Live Activity Stream */}
            <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm text-foreground">Live Telemetry</h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  REAL-TIME
                </span>
              </div>

              <div className="space-y-3">
                {MOCK_ACTIVITY.slice(0, 6).map((act) => (
                  <div key={act.id} className="flex items-start gap-3 text-xs">
                    <UserAvatar name={act.actorName} size="xs" isOnline={false} />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300">
                        <span className="font-semibold text-foreground">{act.actorName}</span>{' '}
                        {act.description}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(act.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-xl border border-cyan-500/30 bg-linear-to-br from-cyan-950/30 to-card/60 p-5 backdrop-blur-md">
              <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Command Actions</span>
              </h3>
              <div className="space-y-2">
                <Link href="/app/teams" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-3.5 w-3.5 mr-2 text-cyan-400" />
                    Inspect Team Rosters
                  </Button>
                </Link>
                <Link href="/app/projects" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FolderKanban className="h-3.5 w-3.5 mr-2 text-violet-400" />
                    Project Timeline
                  </Button>
                </Link>
                <Link href="/app/events" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-3.5 w-3.5 mr-2 text-emerald-400" />
                    Event Calendar
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Teams */}
      {activeTab === 'teams' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_TEAMS.map((team) => (
            <div
              key={team.id}
              className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_20px_-5px_rgba(0,229,255,0.2)] transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted border border-border text-cyan-400">
                    <Layers className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{team.name}</h3>
                    <span className="text-[10px] font-mono text-cyan-400">
                      LEAD: {team.leadName || team.teamLead?.fullName || 'Assigned'}
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                {team.description}
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40 text-xs text-slate-400 font-mono">
                <span>{team.memberCount} Members</span>
                <span className="text-cyan-400">{team.activeTasks} Active Tasks</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Design System Primitives Showcase */}
      {activeTab === 'design-system' && (
        <div className="rounded-xl border border-border/80 bg-card/70 p-6 backdrop-blur-md space-y-8">
          <div>
            <h3 className="text-base font-bold text-foreground">Phase 2 Design System Showcase</h3>
            <p className="text-xs text-muted-foreground mt-1">
              All UI primitives adhere to the futuristic CSI Command Center dark navy & cyan aesthetic.
            </p>
          </div>

          {/* Button Variants */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              1. Button Variants & Sizes
            </h4>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary Cyan</Button>
              <Button variant="secondary">Secondary Violet</Button>
              <Button variant="cyber">Cyber Accent</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="primary" isLoading>Loading</Button>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              2. Status & Priority Badges
            </h4>
            <div className="flex flex-wrap gap-2.5 items-center">
              <StatusBadge status="COMPLETED" />
              <StatusBadge status="IN_PROGRESS" />
              <StatusBadge status="TODO" />
              <StatusBadge status="BLOCKED" />
              <PriorityBadge priority="LOW" />
              <PriorityBadge priority="MEDIUM" />
              <PriorityBadge priority="HIGH" />
              <PriorityBadge priority="URGENT" />
            </div>
          </div>

          {/* Role Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              3. Role Badges (All 6 Tiers)
            </h4>
            <div className="flex flex-wrap gap-2.5 items-center">
              <RoleBadge role="FACULTY" />
              <RoleBadge role="CORE" />
              <RoleBadge role="ADVISORY" />
              <RoleBadge role="TEAM_LEAD" />
              <RoleBadge role="TEAM_MEMBER" />
              <RoleBadge role="GENERAL_MEMBER" />
            </div>
          </div>

          {/* Avatars */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              4. Avatars with Online Status Ring
            </h4>
            <div className="flex items-center gap-3">
              <UserAvatar name="Dr. Priya Sharma" size="lg" isOnline={true} />
              <UserAvatar name="Arjun Mehta" size="md" isOnline={true} />
              <UserAvatar name="Rahul Verma" size="sm" isOnline={false} />
              <UserAvatar name="Sneha Iyer" size="xs" isOnline={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
