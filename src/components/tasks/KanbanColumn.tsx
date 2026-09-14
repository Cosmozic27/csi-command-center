'use client';

import React from 'react';
import type { Task, TaskStatus } from '@/types/entities';
import { TaskCard } from './TaskCard';
import { Plus } from 'lucide-react';

interface KanbanColumnProps {
  status: TaskStatus;
  label: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
  isDragOver: boolean;
  onCreateTask?: (status: TaskStatus) => void;
  accentClass: string;
  dotClass: string;
}

export function KanbanColumn({
  status,
  label,
  tasks,
  onTaskClick,
  onDragStart,
  onDragOver,
  onDrop,
  isDragOver,
  onCreateTask,
  accentClass,
  dotClass,
}: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-[280px] max-w-[320px] w-full flex-shrink-0">
      {/* Column header */}
      <div className={`flex items-center justify-between mb-3 px-1`}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dotClass}`} />
          <span className={`text-xs font-semibold uppercase tracking-wider ${accentClass}`}>
            {label}
          </span>
          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono font-bold ${accentClass} bg-current/10 opacity-80`}
            style={{ background: 'transparent' }}
          >
            <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono ${accentClass} bg-slate-800/60`}>
              {tasks.length}
            </span>
          </span>
        </div>

        {onCreateTask && (
          <button
            onClick={() => onCreateTask(status)}
            className="rounded-lg p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            title={`Add task to ${label}`}
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
        className={`
          flex-1 min-h-[120px] rounded-xl p-2 space-y-2.5 transition-all duration-200
          ${isDragOver
            ? 'bg-cyan-500/8 border-2 border-dashed border-cyan-500/50 shadow-[inset_0_0_20px_-10px_rgba(0,229,255,0.2)]'
            : 'border-2 border-dashed border-transparent'
          }
        `}
      >
        {tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-20 rounded-xl border border-border/40 border-dashed">
            <p className="text-xs text-muted-foreground/50 font-medium">
              Drop tasks here
            </p>
          </div>
        )}

        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onTaskClick}
            draggable
            onDragStart={onDragStart}
          />
        ))}
      </div>
    </div>
  );
}
