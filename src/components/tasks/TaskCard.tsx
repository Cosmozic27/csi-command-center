'use client';

import React from 'react';
import type { Task } from '@/types/entities';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
  Calendar,
  Link2,
  AlertTriangle,
  MessageSquare,
  Clock,
} from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent, task: Task) => void;
  compact?: boolean;
}

function formatDueDate(dueDate: string | null): { label: string; overdue: boolean; urgent: boolean } {
  if (!dueDate) return { label: 'No deadline', overdue: false, urgent: false };
  const due = new Date(dueDate);
  const now = new Date();
  const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  const label = due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  return {
    label,
    overdue: diff < 0,
    urgent: diff >= 0 && diff <= 3,
  };
}

export function TaskCard({ task, onClick, draggable = true, onDragStart, compact = false }: TaskCardProps) {
  const { label: dueDateLabel, overdue, urgent } = formatDueDate(task.dueDate);
  const isBlocked = task.status === 'BLOCKED';
  const hasDependencies = task.dependsOnTaskIds.length > 0;
  const activityCount = task.activityLog?.length ?? 0;

  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart ? (e) => onDragStart(e, task) : undefined}
      onClick={() => onClick(task)}
      className={`
        group relative rounded-xl border bg-card/80 backdrop-blur-sm
        transition-all duration-200 cursor-pointer select-none
        ${isBlocked
          ? 'border-red-500/40 hover:border-red-400/60 hover:shadow-[0_0_18px_-5px_rgba(239,68,68,0.35)]'
          : 'border-border/70 hover:border-cyan-500/40 hover:shadow-[0_0_18px_-5px_rgba(0,229,255,0.25)]'
        }
        ${draggable ? 'active:scale-[0.98] active:opacity-90' : ''}
        ${compact ? 'p-3' : 'p-4'}
      `}
    >
      {/* Blocked stripe accent */}
      {isBlocked && (
        <div className="absolute inset-y-0 left-0 w-1 rounded-l-xl bg-red-500/80" />
      )}

      {/* Drag handle visual (only on hover for draggable cards) */}
      {draggable && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-40 transition-opacity">
          <div className="flex flex-col gap-[3px]">
            {[0, 1, 2].map(i => (
              <div key={i} className="flex gap-[3px]">
                <div className="h-[3px] w-[3px] rounded-full bg-slate-400" />
                <div className="h-[3px] w-[3px] rounded-full bg-slate-400" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Header row: status + priority */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <StatusBadge status={task.status} size="sm" />
        <PriorityBadge priority={task.priority} size="sm" />
      </div>

      {/* Title */}
      <h3 className={`font-semibold text-foreground leading-snug mb-1 pr-4 ${compact ? 'text-xs' : 'text-sm'}`}>
        {task.title}
      </h3>

      {/* Description */}
      {!compact && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {task.description}
        </p>
      )}

      {/* Blocker reason */}
      {isBlocked && task.blockerReason && (
        <div className="flex items-start gap-1.5 mt-2 mb-3 rounded-lg bg-red-500/8 border border-red-500/20 px-2.5 py-2">
          <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 shrink-0" />
          <p className="text-xs text-red-300/90 line-clamp-2">{task.blockerReason}</p>
        </div>
      )}

      {/* Team tag */}
      <div className="mb-3">
        <span className="inline-flex items-center rounded-md bg-cyan-500/8 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-400 tracking-wide">
          {task.assignedTeamName}
        </span>
      </div>

      {/* Footer: assignee + deadline + indicators */}
      <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-2.5">
        <div className="flex items-center gap-1.5 min-w-0">
          {task.assignedUserName ? (
            <>
              <UserAvatar name={task.assignedUserName} size="xs" />
              <span className="text-[11px] text-slate-400 truncate max-w-[90px]">
                {task.assignedUserName}
              </span>
            </>
          ) : (
            <span className="text-[11px] text-slate-500 italic">Unassigned</span>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Dependency indicator */}
          {hasDependencies && (
            <span title={`Depends on ${task.dependsOnTaskIds.length} task(s)`}>
              <Link2 className="h-3 w-3 text-indigo-400" />
            </span>
          )}

          {/* Activity indicator */}
          {activityCount > 0 && (
            <span className="flex items-center gap-0.5 text-[10px] text-slate-500" title="Activity log">
              <MessageSquare className="h-3 w-3" />
              {activityCount}
            </span>
          )}

          {/* Due date */}
          {task.dueDate && (
            <span
              className={`flex items-center gap-1 text-[10px] font-mono ${
                overdue
                  ? 'text-red-400'
                  : urgent
                    ? 'text-amber-400'
                    : 'text-slate-500'
              }`}
            >
              {overdue ? <AlertTriangle className="h-3 w-3" /> : urgent ? <Clock className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
              {dueDateLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
