import React from 'react';
import type { TaskStatus, ProjectStatus, EventStatus } from '@/types/entities';

type AnyStatus = TaskStatus | ProjectStatus | EventStatus | string;

interface StatusBadgeProps {
  status: AnyStatus;
  size?: 'sm' | 'md';
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  COMPLETED: {
    label: 'Completed',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400 animate-pulse',
  },
  TODO: {
    label: 'To Do',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/30',
    dot: 'bg-slate-400',
  },
  BLOCKED: {
    label: 'Blocked',
    bg: 'bg-red-500/10',
    text: 'text-red-400',
    border: 'border-red-500/30',
    dot: 'bg-red-500',
  },
  CANCELLED: {
    label: 'Cancelled',
    bg: 'bg-zinc-500/10',
    text: 'text-zinc-500',
    border: 'border-zinc-500/30',
    dot: 'bg-zinc-500',
  },
  ACTIVE: {
    label: 'Active',
    bg: 'bg-cyan-500/10',
    text: 'text-cyan-400',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
  },
  PLANNING: {
    label: 'Planning',
    bg: 'bg-indigo-500/10',
    text: 'text-indigo-400',
    border: 'border-indigo-500/30',
    dot: 'bg-indigo-400',
  },
  UPCOMING: {
    label: 'Upcoming',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
  },
  ON_HOLD: {
    label: 'On Hold',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
};

export function StatusBadge({ status, size = 'sm', className = '' }: StatusBadgeProps) {
  const normalized = status?.toUpperCase() || 'TODO';
  const config = statusConfig[normalized] || {
    label: status,
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/30',
    dot: 'bg-slate-400',
  };

  const sizeStyles =
    size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-sm font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeStyles} ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
