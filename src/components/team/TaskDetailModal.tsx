'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Check, Clock, Layers, Calendar, AlertCircle, Link2 } from 'lucide-react';
import type { Task } from '@/types/entities';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onToggleStatus: (taskId: string) => void;
}

export function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onToggleStatus,
}: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Task Directive Specification"
      subtitle={`ID: ${task.id} • Sector: ${task.assignedTeamName}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Header & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl border border-border/70 bg-card/60">
          <div className="flex items-center gap-2">
            <StatusBadge status={task.status} size="md" />
            <PriorityBadge priority={task.priority} size="md" />
          </div>

          <Button
            variant={task.status === 'COMPLETED' ? 'outline' : 'primary'}
            size="sm"
            onClick={() => {
              onToggleStatus(task.id);
              onClose();
            }}
          >
            <Check className="h-3.5 w-3.5 mr-1" />
            {task.status === 'COMPLETED' ? 'Reopen Directive' : 'Mark Completed'}
          </Button>
        </div>

        {/* Title & Description */}
        <div>
          <h3 className="text-base font-bold text-foreground">{task.title}</h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
            {task.description}
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-border/50 text-xs">
          <div className="p-3 rounded-lg border border-border/50 bg-muted/30 flex items-center gap-3">
            <UserAvatar name={task.assignedUserName || 'Unassigned'} size="sm" />
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Assignee
              </span>
              <span className="font-semibold text-foreground">
                {task.assignedUserName || 'Pending Assignment'}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-border/50 bg-muted/30 flex items-center gap-3">
            <div className="p-2 rounded-md bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                Deadline
              </span>
              <span className="font-semibold text-foreground font-mono">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'TBD'}
              </span>
            </div>
          </div>
        </div>

        {/* Cross-Team Dependency / Blocker Notice */}
        <div className="p-3 rounded-lg border border-indigo-500/20 bg-indigo-500/5 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-indigo-300">
            <Link2 className="h-3.5 w-3.5 text-indigo-400" />
            <span>Cross-Team Dependency Coordination</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            This directive coordinates with the <span className="text-cyan-300 font-medium">{task.assignedTeamName}</span>. Deliverable artifacts are automatically indexed in the team asset repository upon completion.
          </p>
        </div>

        {/* Close Button */}
        <div className="flex justify-end pt-2 border-t border-border/60">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
