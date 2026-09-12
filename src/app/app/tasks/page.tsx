'use client';

import React, { useState } from 'react';
import { MOCK_TASKS } from '@/data/mock-tasks';
import { CheckSquare, Filter } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Tabs } from '@/components/ui/tabs';

export default function TasksPage() {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredTasks =
    filterStatus === 'ALL'
      ? MOCK_TASKS
      : MOCK_TASKS.filter((t) => t.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <CheckSquare className="h-4 w-4" />
            <span>Workflow Directives</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Task Queue & Cross-Team Kanban
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Coordinating assignments, status transitions, and dependencies.
          </p>
        </div>

        {/* Filter tabs */}
        <Tabs
          tabs={[
            { id: 'ALL', label: 'All Tasks', badge: MOCK_TASKS.length },
            { id: 'IN_PROGRESS', label: 'In Progress' },
            { id: 'TODO', label: 'To Do' },
            { id: 'COMPLETED', label: 'Done' },
          ]}
          activeTab={filterStatus}
          onChange={setFilterStatus}
        />
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="rounded-xl border border-border/80 bg-card/70 p-4 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_15px_-5px_rgba(0,229,255,0.2)] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <StatusBadge status={task.status} size="sm" />
                <PriorityBadge priority={task.priority} size="sm" />
              </div>
              <h3 className="font-semibold text-sm text-foreground">{task.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {task.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between text-xs text-slate-400">
              <span className="font-mono text-cyan-400 text-[11px]">{task.assignedTeamName}</span>
              <span className="truncate max-w-[120px]">{task.assignedUserName || 'Unassigned'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
