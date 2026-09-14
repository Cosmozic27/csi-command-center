'use client';

import React from 'react';
import type { Task } from '@/types/entities';
import { TaskCard } from './TaskCard';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Calendar, Link2, AlertTriangle, Clock } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

function formatDueDate(dueDate: string | null) {
  if (!dueDate) return { label: '—', overdue: false, urgent: false };
  const due = new Date(dueDate);
  const now = new Date();
  const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return {
    label: due.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }),
    overdue: diff < 0,
    urgent: diff >= 0 && diff <= 3,
  };
}

export function TaskList({ tasks, onTaskClick }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-border/50 border-dashed">
        <p className="text-muted-foreground text-sm font-medium">No tasks match your filters</p>
        <p className="text-muted-foreground/60 text-xs mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-border/60 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-muted/30">
              <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Task</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Priority</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Team</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Assignee</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Deadline</th>
              <th className="text-left px-3 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden xl:table-cell">Project</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {tasks.map((task) => {
              const { label: dueDateLabel, overdue, urgent } = formatDueDate(task.dueDate);
              const isBlocked = task.status === 'BLOCKED';
              return (
                <tr
                  key={task.id}
                  onClick={() => onTaskClick(task)}
                  className={`
                    group cursor-pointer transition-colors hover:bg-muted/30
                    ${isBlocked ? 'bg-red-500/3' : ''}
                  `}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-start gap-2">
                      {isBlocked && (
                        <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-foreground text-sm truncate max-w-[280px] group-hover:text-cyan-400 transition-colors">
                          {task.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[280px] mt-0.5">
                          {task.description}
                        </p>
                        {task.dependsOnTaskIds.length > 0 && (
                          <span className="inline-flex items-center gap-1 mt-1 text-[10px] text-indigo-400">
                            <Link2 className="h-3 w-3" />
                            {task.dependsOnTaskIds.length} dependency
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <StatusBadge status={task.status} size="sm" />
                  </td>
                  <td className="px-3 py-3.5">
                    <PriorityBadge priority={task.priority} size="sm" />
                  </td>
                  <td className="px-3 py-3.5 hidden lg:table-cell">
                    <span className="inline-flex items-center rounded-md bg-cyan-500/8 border border-cyan-500/20 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-400 whitespace-nowrap">
                      {task.assignedTeamName}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 hidden xl:table-cell">
                    <div className="flex items-center gap-1.5">
                      {task.assignedUserName ? (
                        <>
                          <UserAvatar name={task.assignedUserName} size="xs" />
                          <span className="text-xs text-slate-300 whitespace-nowrap">{task.assignedUserName}</span>
                        </>
                      ) : (
                        <span className="text-xs text-slate-500 italic">Unassigned</span>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3.5 hidden lg:table-cell">
                    <span className={`flex items-center gap-1 text-xs font-mono whitespace-nowrap ${
                      overdue ? 'text-red-400' : urgent ? 'text-amber-400' : 'text-slate-500'
                    }`}>
                      {overdue ? <AlertTriangle className="h-3 w-3" /> : urgent ? <Clock className="h-3 w-3" /> : <Calendar className="h-3 w-3" />}
                      {dueDateLabel}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 hidden xl:table-cell">
                    <span className="text-xs text-slate-500 truncate max-w-[160px]">
                      {task.projectId ? task.projectId.replace('proj-', '').replace(/-/g, ' ') : '—'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onClick={onTaskClick} draggable={false} compact />
        ))}
      </div>
    </>
  );
}
