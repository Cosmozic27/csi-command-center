'use client';

import React from 'react';
import { UserAvatar } from '@/components/ui/user-avatar';
import { RoleBadge } from '@/components/ui/role-badge';
import type { TeamMemberProfile } from '@/data/mock-team-members';
import { CheckSquare, Crown, Zap } from 'lucide-react';

interface MemberCardProps {
  member: TeamMemberProfile;
  className?: string;
}

const workloadColors = {
  Light: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Optimal: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  High: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

const statusDot = {
  ACTIVE: 'bg-emerald-400',
  BUSY: 'bg-amber-400',
  AVAILABLE: 'bg-cyan-400',
};

export function MemberCard({ member, className = '' }: MemberCardProps) {
  return (
    <div
      className={`rounded-xl border border-border/80 bg-card/60 p-4 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_15px_-4px_rgba(0,229,255,0.2)] transition-all duration-200 flex flex-col justify-between ${className}`}
    >
      <div>
        {/* Header: Avatar, Name, Lead Tag */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <UserAvatar name={member.fullName} avatarUrl={member.avatarUrl} size="md" isOnline={member.status !== 'BUSY'} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-semibold text-sm text-foreground truncate">{member.fullName}</h4>
                {member.isLead && (
                  <span className="p-0.5 rounded bg-amber-500/20 text-amber-300" title="Team Lead">
                    <Crown className="h-3 w-3" />
                  </span>
                )}
              </div>
              <p className="text-[11px] text-cyan-400 font-mono truncate">{member.roleTitle}</p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono border ${
              workloadColors[member.workload]
            }`}
          >
            <span className={`h-1 w-1 rounded-full ${statusDot[member.status]}`} />
            {member.workload} Workload
          </span>
        </div>

        {/* Skills Tag Strip */}
        <div className="mt-3.5 flex flex-wrap gap-1">
          {member.skills.map((skill, idx) => (
            <span
              key={idx}
              className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground border border-border/40 font-mono"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Footer: Tasks count & Membership period */}
      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <CheckSquare className="h-3.5 w-3.5 text-cyan-400" />
          <span className="font-mono text-[11px]">{member.assignedTasksCount} Active Directives</span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Since {member.joinedDate}</span>
      </div>
    </div>
  );
}
