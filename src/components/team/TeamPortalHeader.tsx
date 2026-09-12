'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Layers,
  ChevronRight,
  Shield,
  Plus,
  Users,
  CheckSquare,
  ArrowLeft,
  ChevronDown,
} from 'lucide-react';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Button } from '@/components/ui/button';
import { MOCK_TEAMS } from '@/data/mock-teams';
import type { Team } from '@/types/entities';

interface TeamPortalHeaderProps {
  team: Team;
  onOpenCreateTask: () => void;
}

export function TeamPortalHeader({ team, onOpenCreateTask }: TeamPortalHeaderProps) {
  const router = useRouter();
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation & Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Link href="/app/teams" className="hover:text-cyan-400 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Teams Directory</span>
          </Link>
          <ChevronRight className="h-3 w-3 text-slate-600" />
          <span className="text-foreground font-semibold">{team.name}</span>
        </div>

        {/* Quick Portal Jump Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
            className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/60 px-3 py-1.5 text-xs font-semibold text-foreground hover:border-cyan-500/40 transition-colors cursor-pointer"
          >
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span>Switch Sector</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </button>

          {isSwitcherOpen && (
            <div className="absolute right-0 mt-1.5 w-56 rounded-xl border border-border/80 bg-card/95 p-1 shadow-2xl backdrop-blur-xl z-30 animate-in fade-in zoom-in-95 duration-100">
              <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground block">
                9 Team Sectors
              </span>
              <div className="space-y-0.5 max-h-56 overflow-y-auto">
                {MOCK_TEAMS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setIsSwitcherOpen(false);
                      router.push(`/app/team/${t.slug}`);
                    }}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-left transition-colors cursor-pointer ${
                      t.slug === team.slug
                        ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <span className="truncate">{t.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">{t.memberCount}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Sector Header Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-linear-to-r from-card/90 via-card/60 to-cyan-950/20 p-6 backdrop-blur-xl">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_-3px_rgba(0,229,255,0.3)] shrink-0">
              <Layers className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 uppercase tracking-widest">
                  SECTOR // {team.slug.toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  OPERATIONAL
                </span>
              </div>

              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                {team.name}
              </h1>

              <p className="text-xs text-muted-foreground max-w-xl line-clamp-2">
                {team.description}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Team Lead Pill */}
            {team.teamLead && (
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-border/80 bg-card/60">
                <UserAvatar name={team.teamLead.fullName} size="sm" />
                <div className="text-left">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    Team Lead
                  </span>
                  <span className="text-xs font-bold text-foreground">
                    {team.teamLead.fullName}
                  </span>
                </div>
              </div>
            )}

            {/* Quick Create Task button */}
            <Button variant="primary" size="sm" onClick={onOpenCreateTask}>
              <Plus className="h-3.5 w-3.5 mr-1" />
              New Directive
            </Button>
          </div>
        </div>

        {/* Progress Strip */}
        <div className="mt-6 pt-4 border-t border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-cyan-400" />
              {team.memberCount} Members Assigned
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <CheckSquare className="h-3.5 w-3.5 text-violet-400" />
              {team.activeTasks} Active Directives
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-64">
            <span className="text-[10px] font-mono text-muted-foreground shrink-0">
              Throughput: {team.progressPercentage}%
            </span>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-cyan-400 to-indigo-500 rounded-full"
                style={{ width: `${team.progressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
