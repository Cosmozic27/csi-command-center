import React from 'react';
import type { TaskPriority } from '@/types/entities';
import { AlertCircle, AlertTriangle, ArrowDown, ArrowUp } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TaskPriority;
  showIcon?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

const priorityConfig: Record<
  TaskPriority,
  { label: string; bg: string; text: string; border: string; icon: React.ComponentType<{ className?: string }> }
> = {
  LOW: {
    label: 'Low',
    bg: 'bg-slate-500/10',
    text: 'text-slate-400',
    border: 'border-slate-500/20',
    icon: ArrowDown,
  },
  MEDIUM: {
    label: 'Medium',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    icon: ArrowUp,
  },
  HIGH: {
    label: 'High',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    icon: AlertTriangle,
  },
  URGENT: {
    label: 'Urgent',
    bg: 'bg-red-500/15',
    text: 'text-red-400',
    border: 'border-red-500/40',
    icon: AlertCircle,
  },
};

export function PriorityBadge({
  priority,
  showIcon = true,
  size = 'sm',
  className = '',
}: PriorityBadgeProps) {
  const config = priorityConfig[priority] || priorityConfig.MEDIUM;
  const Icon = config.icon;

  const sizeStyles =
    size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-sm font-medium';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border ${config.bg} ${config.text} ${config.border} ${sizeStyles} ${className}`}
    >
      {showIcon && <Icon className="h-3 w-3 shrink-0" />}
      {config.label}
    </span>
  );
}
