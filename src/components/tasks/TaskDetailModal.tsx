'use client';

import React, { useState } from 'react';
import type { Task, TaskStatus, TaskPriority } from '@/types/entities';
import { Modal } from '@/components/ui/modal';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import {
  Calendar, Users, FolderKanban, Zap, Link2, AlertTriangle,
  CheckCircle2, XCircle, Edit3, ArrowRight, Clock, Shield,
} from 'lucide-react';

const STATUS_OPTIONS: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'UNDER_REVIEW', 'COMPLETED', 'BLOCKED'];
const PRIORITY_OPTIONS: TaskPriority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

function formatDateTime(iso: string | null | undefined) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

interface TaskDetailModalProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (taskId: string, changes: Partial<Task>) => void;
  getDependencyTitle: (id: string) => string;
  getDependentTasks: (id: string) => Task[];
}

export function TaskDetailModal({
  task,
  isOpen,
  onClose,
  onUpdate,
  getDependencyTitle,
  getDependentTasks,
}: TaskDetailModalProps) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [editBlocker, setEditBlocker] = useState('');

  if (!task) return null;

  const dependentTasks = getDependentTasks(task.id);
  const isBlocked = task.status === 'BLOCKED';

  const handleEdit = () => {
    setEditTitle(task.title);
    setEditDesc(task.description);
    setEditBlocker(task.blockerReason ?? '');
    setEditing(true);
  };

  const handleSave = () => {
    onUpdate(task.id, {
      title: editTitle,
      description: editDesc,
      blockerReason: editBlocker || null,
      updatedAt: new Date().toISOString(),
    });
    setEditing(false);
  };

  const handleStatusChange = (s: TaskStatus) => {
    onUpdate(task.id, {
      status: s,
      completedAt: s === 'COMPLETED' ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString(),
    });
  };

  const handlePriorityChange = (p: TaskPriority) => {
    onUpdate(task.id, { priority: p, updatedAt: new Date().toISOString() });
  };

  const handleUnblock = () => {
    onUpdate(task.id, {
      status: 'IN_PROGRESS',
      blockerReason: null,
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={() => { setEditing(false); onClose(); }} title="Task Details" maxWidth="xl">
      <div className="space-y-5 max-h-[70vh] overflow-y-auto pr-1 -mr-1">

        {/* Title & Description */}
        <div>
          {editing ? (
            <div className="space-y-3">
              <input
                className="w-full rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm font-semibold text-foreground focus:outline-none focus:border-cyan-500/60"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
              />
              <textarea
                rows={3}
                className="w-full rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-xs text-muted-foreground focus:outline-none focus:border-cyan-500/60 resize-none"
                value={editDesc}
                onChange={e => setEditDesc(e.target.value)}
              />
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold text-foreground leading-snug">{task.title}</h3>
                <button onClick={handleEdit} className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer" title="Edit task">
                  <Edit3 className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{task.description}</p>
            </div>
          )}
        </div>

        {/* Status + Priority selectors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {STATUS_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => handleStatusChange(s)}
                  className={`cursor-pointer transition-all ${task.status === s ? 'ring-2 ring-cyan-500/60 rounded-full' : 'opacity-60 hover:opacity-100'}`}
                >
                  <StatusBadge status={s} size="sm" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Priority</p>
            <div className="flex flex-wrap gap-1.5">
              {PRIORITY_OPTIONS.map(p => (
                <button
                  key={p}
                  onClick={() => handlePriorityChange(p)}
                  className={`cursor-pointer transition-all ${task.priority === p ? 'ring-2 ring-cyan-500/60 rounded-md' : 'opacity-60 hover:opacity-100'}`}
                >
                  <PriorityBadge priority={p} size="sm" showIcon />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Blocker section */}
        {isBlocked && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/8 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Blocked</span>
              </div>
              <button
                onClick={handleUnblock}
                className="flex items-center gap-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Unblock
              </button>
            </div>
            {editing ? (
              <textarea
                rows={2}
                placeholder="Blocker reason..."
                className="w-full rounded-lg border border-red-500/30 bg-red-500/8 px-3 py-2 text-xs text-red-200 focus:outline-none resize-none"
                value={editBlocker}
                onChange={e => setEditBlocker(e.target.value)}
              />
            ) : (
              <p className="text-sm text-red-300/90 leading-relaxed">
                {task.blockerReason || 'No reason specified.'}
              </p>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-border/50" />

        {/* Metadata grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <MetaItem
              icon={Users}
              label="Team"
              value={
                <span className="inline-flex rounded-md bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 text-xs font-mono font-semibold text-cyan-400">
                  {task.assignedTeamName}
                </span>
              }
            />
            <MetaItem
              icon={Shield}
              label="Assignee"
              value={task.assignedUserName ? (
                <div className="flex items-center gap-1.5">
                  <UserAvatar name={task.assignedUserName} size="xs" />
                  <span className="text-xs text-foreground">{task.assignedUserName}</span>
                </div>
              ) : (
                <span className="text-xs text-slate-500 italic">Unassigned</span>
              )}
            />
            <MetaItem
              icon={FolderKanban}
              label="Project"
              value={
                <span className="text-xs text-slate-300">
                  {task.projectId ? task.projectId.replace('proj-', '').replace(/-/g, ' ') : '—'}
                </span>
              }
            />
          </div>
          <div className="space-y-3">
            <MetaItem
              icon={Calendar}
              label="Start Date"
              value={<span className="text-xs text-slate-300 font-mono">{formatDateTime(task.startDate)}</span>}
            />
            <MetaItem
              icon={Clock}
              label="Deadline"
              value={
                <span className={`text-xs font-mono ${
                  task.dueDate && new Date(task.dueDate) < new Date()
                    ? 'text-red-400' : 'text-slate-300'
                }`}>
                  {formatDateTime(task.dueDate)}
                </span>
              }
            />
            {task.completedAt && (
              <MetaItem
                icon={CheckCircle2}
                label="Completed"
                value={<span className="text-xs text-emerald-400 font-mono">{formatDateTime(task.completedAt)}</span>}
              />
            )}
          </div>
        </div>

        {/* Dependencies */}
        {(task.dependsOnTaskIds.length > 0 || dependentTasks.length > 0) && (
          <>
            <div className="border-t border-border/50" />
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Link2 className="h-3.5 w-3.5" />
                Dependencies
              </div>

              {task.dependsOnTaskIds.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">This task depends on:</p>
                  <div className="space-y-1.5">
                    {task.dependsOnTaskIds.map(depId => (
                      <div key={depId} className="flex items-center gap-2 rounded-lg bg-muted/40 border border-border/50 px-3 py-2">
                        <ArrowRight className="h-3 w-3 text-indigo-400 shrink-0" />
                        <span className="text-xs text-foreground">{getDependencyTitle(depId)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {dependentTasks.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1.5">Unlocks these tasks:</p>
                  <div className="space-y-1.5">
                    {dependentTasks.map(dep => (
                      <div key={dep.id} className="flex items-center justify-between rounded-lg bg-muted/40 border border-border/50 px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Zap className="h-3 w-3 text-amber-400 shrink-0" />
                          <span className="text-xs text-foreground">{dep.title}</span>
                        </div>
                        <StatusBadge status={dep.status} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Activity log */}
        {task.activityLog && task.activityLog.length > 0 && (
          <>
            <div className="border-t border-border/50" />
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Activity</p>
              <div className="space-y-2 max-h-36 overflow-y-auto">
                {[...task.activityLog].reverse().map(entry => (
                  <div key={entry.id} className="flex items-start gap-2.5">
                    <UserAvatar name={entry.actorName} size="xs" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-xs font-semibold text-foreground">{entry.actorName}</span>
                        <span className="text-xs text-muted-foreground">{entry.action}</span>
                        {entry.detail && (
                          <span className="text-xs text-cyan-400 font-mono">{entry.detail}</span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                        {new Date(entry.timestamp).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Save / Cancel buttons */}
        {editing && (
          <div className="flex gap-2 pt-2 border-t border-border/50">
            <button
              onClick={handleSave}
              className="flex-1 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded-lg border border-border/60 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Quick actions (when not editing) */}
        {!editing && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
            {task.status !== 'COMPLETED' && (
              <button
                onClick={() => handleStatusChange('COMPLETED')}
                className="flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/25 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Mark Complete
              </button>
            )}
            {task.status !== 'BLOCKED' && (
              <button
                onClick={() => handleStatusChange('BLOCKED')}
                className="flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                <XCircle className="h-3.5 w-3.5" />
                Mark Blocked
              </button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
      <div>
        <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mb-0.5">{label}</p>
        {value}
      </div>
    </div>
  );
}
