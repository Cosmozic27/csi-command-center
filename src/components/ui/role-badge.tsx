import React from 'react';
import type { UserRole } from '@/types/entities';
import { ShieldCheck, Crown, Sparkles, UserCheck, Users, User } from 'lucide-react';

interface RoleBadgeProps {
  role: UserRole;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const roleConfig: Record<
  UserRole,
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  FACULTY: {
    label: 'Faculty Sponsor',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    icon: ShieldCheck,
  },
  CORE: {
    label: 'Core Committee',
    bg: 'bg-cyan-500/15',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    icon: Crown,
  },
  ADVISORY: {
    label: 'Advisory Board',
    bg: 'bg-purple-500/15',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    icon: Sparkles,
  },
  TEAM_LEAD: {
    label: 'Team Lead',
    bg: 'bg-blue-500/15',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: UserCheck,
  },
  TEAM_MEMBER: {
    label: 'Team Member',
    bg: 'bg-indigo-500/15',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    icon: Users,
  },
  GENERAL_MEMBER: {
    label: 'General Member',
    bg: 'bg-slate-500/15',
    text: 'text-slate-400',
    border: 'border-slate-500/30',
    icon: User,
  },
};

export function RoleBadge({
  role,
  showIcon = true,
  size = 'sm',
  className = '',
}: RoleBadgeProps) {
  const config = roleConfig[role] || roleConfig.GENERAL_MEMBER;
  const Icon = config.icon;

  const sizeStyles =
    size === 'sm' ? 'px-2 py-0.5 text-xs font-semibold' : 'px-2.5 py-1 text-sm font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border tracking-wide uppercase ${config.bg} ${config.text} ${config.border} ${sizeStyles} ${className}`}
    >
      {showIcon && <Icon className="h-3 w-3 shrink-0" />}
      {config.label}
    </span>
  );
}
