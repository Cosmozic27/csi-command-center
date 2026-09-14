'use client';

import React, { useState } from 'react';
import type { Task, TaskStatus } from '@/types/entities';
import { KanbanColumn } from './KanbanColumn';

const COLUMN_CONFIGS: {
  status: TaskStatus;
  label: string;
  accentClass: string;
  dotClass: string;
}[] = [
  { status: 'TODO',        label: 'To Do',        accentClass: 'text-slate-400',   dotClass: 'bg-slate-400' },
  { status: 'IN_PROGRESS', label: 'In Progress',  accentClass: 'text-cyan-400',    dotClass: 'bg-cyan-400 animate-pulse' },
  { status: 'UNDER_REVIEW',label: 'Under Review', accentClass: 'text-indigo-400',  dotClass: 'bg-indigo-400' },
  { status: 'COMPLETED',   label: 'Completed',    accentClass: 'text-emerald-400', dotClass: 'bg-emerald-400' },
  { status: 'BLOCKED',     label: 'Blocked',      accentClass: 'text-red-400',     dotClass: 'bg-red-500' },
];

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onCreateTask?: (status: TaskStatus) => void;
}

export function KanbanBoard({ tasks, onTaskClick, onStatusChange, onCreateTask }: KanbanBoardProps) {
  const [dragOverColumn, setDragOverColumn] = useState<TaskStatus | null>(null);
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingTaskId(task.id);
  };

  const handleDragOver = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onStatusChange(taskId, status);
    }
    setDragOverColumn(null);
    setDraggingTaskId(null);
  };

  const handleDragEnd = () => {
    setDragOverColumn(null);
    setDraggingTaskId(null);
  };

  const tasksByStatus = (status: TaskStatus) =>
    tasks.filter((t) => t.status === status);

  return (
    <div
      className="flex gap-4 overflow-x-auto pb-4 min-h-[600px]"
      onDragEnd={handleDragEnd}
    >
      {COLUMN_CONFIGS.map(({ status, label, accentClass, dotClass }) => (
        <KanbanColumn
          key={status}
          status={status}
          label={label}
          tasks={tasksByStatus(status)}
          onTaskClick={onTaskClick}
          onDragStart={handleDragStart}
          onDragOver={(e) => handleDragOver(e, status)}
          onDrop={handleDrop}
          isDragOver={dragOverColumn === status}
          onCreateTask={onCreateTask}
          accentClass={accentClass}
          dotClass={dotClass}
        />
      ))}
    </div>
  );
}
