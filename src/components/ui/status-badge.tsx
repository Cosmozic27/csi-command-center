import React from 'react';
import type { TaskStatus, ProjectStatus, EventStatus } from '@/types/entities';

type AnyStatus = TaskStatus | ProjectStatus | EventStatus | string;
interface StatusBadgeProps { status: AnyStatus; size?: 'sm' | 'md'; className?: string; }

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string; dot: string }> = {
  COMPLETED: { label: 'Completed', bg: 'bg-[#e4eee3]', text: 'text-[#58735b]', border: 'border-[#b7ceb7]', dot: 'bg-[#6f8b72]' },
  IN_PROGRESS: { label: 'In Progress', bg: 'bg-[#eadfd5]', text: 'text-[#795548]', border: 'border-[#cdb8a5]', dot: 'bg-[#a67c52]' },
  TODO: { label: 'To Do', bg: 'bg-[#eee8df]', text: 'text-[#756b63]', border: 'border-[#d8c7b5]', dot: 'bg-[#96887d]' },
  BLOCKED: { label: 'Blocked', bg: 'bg-[#f4e3e0]', text: 'text-[#9a514b]', border: 'border-[#d9aaa4]', dot: 'bg-[#a85d55]' },
  CANCELLED: { label: 'Cancelled', bg: 'bg-[#eee8df]', text: 'text-[#756b63]', border: 'border-[#d8c7b5]', dot: 'bg-[#96887d]' },
  ACTIVE: { label: 'Active', bg: 'bg-[#eadfd5]', text: 'text-[#795548]', border: 'border-[#cdb8a5]', dot: 'bg-[#a67c52]' },
  PLANNING: { label: 'Planning', bg: 'bg-[#eee4db]', text: 'text-[#6b5147]', border: 'border-[#d4bdaa]', dot: 'bg-[#8d6e63]' },
  UPCOMING: { label: 'Upcoming', bg: 'bg-[#eee4db]', text: 'text-[#6b5147]', border: 'border-[#d4bdaa]', dot: 'bg-[#8d6e63]' },
  ON_HOLD: { label: 'On Hold', bg: 'bg-[#f4eadb]', text: 'text-[#946c35]', border: 'border-[#dec39a]', dot: 'bg-[#b1844f]' },
};

export function StatusBadge({ status, size = 'sm', className = '' }: StatusBadgeProps) {
  const normalized = status?.toUpperCase() || 'TODO';
  const config = statusConfig[normalized] || statusConfig.TODO;
  const sizeStyles = size === 'sm' ? 'px-2 py-0.5 text-xs font-medium' : 'px-2.5 py-1 text-sm font-medium';
  return <span className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeStyles} ${className}`}><span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />{config.label || status}</span>;
}
