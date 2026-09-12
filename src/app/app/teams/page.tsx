'use client';

import React from 'react';
import { MOCK_TEAMS } from '@/data/mock-teams';
import { MOCK_TEAM_MEMBERS_EXTENDED } from '@/data/mock-users';
import { Users, Layers } from 'lucide-react';
import { UserAvatar } from '@/components/ui/user-avatar';
import { RoleBadge } from '@/components/ui/role-badge';

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <Layers className="h-4 w-4" />
          <span>Organizational Architecture</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          CSI Committee Teams & Rosters
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          9 specialized operating teams coordinating tasks, events, and deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_TEAMS.map((team) => {
          const members = MOCK_TEAM_MEMBERS_EXTENDED.filter((m) =>
            m.teamMemberships?.some((tm) => tm.teamId === team.id)
          );

          return (
            <div
              key={team.id}
              className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-base text-foreground">{team.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {team.memberCount} MEMBERS
                  </span>
                </div>
                <p className="text-xs text-cyan-300/80 font-mono mt-0.5">
                  Lead: {team.leadName || team.teamLead?.fullName || 'Assigned'}
                </p>
                <p className="mt-3 text-xs text-muted-foreground line-clamp-3">
                  {team.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-border/50">
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider block mb-2">
                  Active Roster Preview
                </span>
                <div className="flex items-center -space-x-2 overflow-hidden">
                  {members.map((m) => (
                    <UserAvatar
                      key={m.id}
                      name={m.fullName || 'Member'}
                      size="sm"
                      className="ring-2 ring-card"
                    />
                  ))}
                  {team.memberCount > members.length && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-[10px] font-mono text-muted-foreground ring-2 ring-card">
                      +{team.memberCount - members.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
