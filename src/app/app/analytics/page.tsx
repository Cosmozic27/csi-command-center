'use client';

import React from 'react';
import { BarChart3, TrendingUp, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { MOCK_TEAMS } from '@/data/mock-teams';

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <BarChart3 className="h-4 w-4" />
          <span>Operational Intelligence</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Performance & Cross-Team Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Execution throughput, task velocity, team member participation, and event readiness metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Task Velocity"
          value="84%"
          subtitle="On-time task deliveries"
          icon={TrendingUp}
          glowColor="cyan"
          trend={{ value: "+6% this sprint", isPositive: true }}
        />
        <StatCard
          title="Tasks Completed"
          value="4"
          subtitle="Out of 13 active directives"
          icon={CheckCircle2}
          glowColor="emerald"
        />
        <StatCard
          title="Blocked Directives"
          value="2"
          subtitle="Awaiting cross-team dependency"
          icon={AlertTriangle}
          glowColor="amber"
        />
        <StatCard
          title="Committee Health"
          value="99.4%"
          subtitle="All 9 teams reporting"
          icon={ShieldCheck}
          glowColor="violet"
        />
      </div>

      {/* Team Throughput breakdown */}
      <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
        <h3 className="font-semibold text-sm text-foreground mb-4">
          Team Workload Distribution
        </h3>
        <div className="space-y-3">
          {MOCK_TEAMS.map((team) => (
            <div key={team.id} className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-foreground">{team.name}</span>
                <span className="text-muted-foreground font-mono">
                  {team.activeTasks} active tasks
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-cyan-500 to-blue-500 rounded-full"
                  style={{ width: `${Math.min(team.activeTasks * 25, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
