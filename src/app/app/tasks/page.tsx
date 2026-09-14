'use client';

import React, { useState, useMemo, useCallback } from 'react';
import type { Task, TaskStatus, TaskPriority, TeamSlug } from '@/types/entities';
import { MOCK_TASKS } from '@/data/mock-tasks';
import { MOCK_TEAMS } from '@/data/mock-teams';
import { MOCK_PROJECTS } from '@/data/mock-projects';
import { useMockSession } from '@/contexts/MockSessionContext';

import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskDetailModal } from '@/components/tasks/TaskDetailModal';
import { CreateTaskModal } from '@/components/tasks/CreateTaskModal';

import {
  CheckSquare,
  Search,
  LayoutGrid,
  LayoutList,
  Plus,
  Filter,
  X,
  SlidersHorizontal,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────
const STATUS_OPTIONS: { value: TaskStatus | 'ALL'; label: string }[] = [
  { value: 'ALL',          label: 'All Statuses' },
  { value: 'TODO',         label: 'To Do' },
  { value: 'IN_PROGRESS',  label: 'In Progress' },
  { value: 'UNDER_REVIEW', label: 'Under Review' },
  { value: 'COMPLETED',    label: 'Completed' },
  { value: 'BLOCKED',      label: 'Blocked' },
];

const PRIORITY_OPTIONS: { value: TaskPriority | 'ALL'; label: string }[] = [
  { value: 'ALL',    label: 'All Priorities' },
  { value: 'URGENT', label: 'Urgent' },
  { value: 'HIGH',   label: 'High' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'LOW',    label: 'Low' },
];

const SORT_OPTIONS = [
  { value: 'dueDate_asc',   label: 'Deadline (Soonest)' },
  { value: 'dueDate_desc',  label: 'Deadline (Latest)' },
  { value: 'priority_desc', label: 'Priority (Highest)' },
  { value: 'priority_asc',  label: 'Priority (Lowest)' },
  { value: 'updatedAt',     label: 'Recently Updated' },
  { value: 'status',        label: 'Status' },
];

const PRIORITY_RANK: Record<TaskPriority, number> = {
  URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1,
};

// ─────────────────────────────────────────────────────────
// Sort helper
// ─────────────────────────────────────────────────────────
function sortTasks(tasks: Task[], sort: string): Task[] {
  return [...tasks].sort((a, b) => {
    switch (sort) {
      case 'dueDate_asc':
        return (a.dueDate ?? '9999').localeCompare(b.dueDate ?? '9999');
      case 'dueDate_desc':
        return (b.dueDate ?? '').localeCompare(a.dueDate ?? '');
      case 'priority_desc':
        return (PRIORITY_RANK[b.priority] ?? 0) - (PRIORITY_RANK[a.priority] ?? 0);
      case 'priority_asc':
        return (PRIORITY_RANK[a.priority] ?? 0) - (PRIORITY_RANK[b.priority] ?? 0);
      case 'updatedAt':
        return b.updatedAt.localeCompare(a.updatedAt);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });
}

// ─────────────────────────────────────────────────────────
// Role-aware filter helper
// ─────────────────────────────────────────────────────────
function getRoleVisibleTasks(tasks: Task[], role: string, userTeamSlug?: string): Task[] {
  if (role === 'FACULTY' || role === 'CORE' || role === 'ADVISORY') return tasks;
  if (role === 'TEAM_LEAD' || role === 'TEAM_MEMBER') {
    return tasks.filter(t => t.assignedTeamSlug === userTeamSlug);
  }
  // GENERAL_MEMBER sees their own + general tasks
  return tasks.filter(t =>
    t.assignedTeamSlug === 'general-members' ||
    t.assignedTeamSlug === userTeamSlug
  );
}

// ─────────────────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────────────────
export default function TasksPage() {
  const { currentUser } = useMockSession();

  // ── State ──────────────────────────────────
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'ALL'>('ALL');
  const [filterPriority, setFilterPriority] = useState<TaskPriority | 'ALL'>('ALL');
  const [filterTeam, setFilterTeam] = useState<string>('ALL');
  const [filterProject, setFilterProject] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState('priority_desc');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [createDefaultStatus, setCreateDefaultStatus] = useState<TaskStatus>('TODO');

  // ── Role-aware base tasks ──────────────────
  const userTeamSlug = currentUser.teamMemberships?.[0]?.teamSlug as TeamSlug | undefined;
  const baseTasks = useMemo(
    () => getRoleVisibleTasks(tasks, currentUser.primaryRole, userTeamSlug),
    [tasks, currentUser.primaryRole, userTeamSlug]
  );

  // ── Filter + Search + Sort ─────────────────
  const filteredTasks = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    let result = baseTasks;

    if (q) {
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.assignedTeamName.toLowerCase().includes(q) ||
        (t.assignedUserName?.toLowerCase().includes(q) ?? false) ||
        (t.projectId?.toLowerCase().includes(q) ?? false) ||
        (t.tags?.some(tag => tag.toLowerCase().includes(q)) ?? false)
      );
    }
    if (filterStatus !== 'ALL') {
      result = result.filter(t => t.status === filterStatus);
    }
    if (filterPriority !== 'ALL') {
      result = result.filter(t => t.priority === filterPriority);
    }
    if (filterTeam !== 'ALL') {
      result = result.filter(t => t.assignedTeamSlug === filterTeam);
    }
    if (filterProject !== 'ALL') {
      result = result.filter(t => t.projectId === filterProject);
    }

    return sortTasks(result, sortBy);
  }, [baseTasks, searchQuery, filterStatus, filterPriority, filterTeam, filterProject, sortBy]);

  const blockedCount = filteredTasks.filter(t => t.status === 'BLOCKED').length;
  const hasActiveFilters =
    searchQuery || filterStatus !== 'ALL' || filterPriority !== 'ALL' ||
    filterTeam !== 'ALL' || filterProject !== 'ALL';

  const clearFilters = () => {
    setSearchQuery('');
    setFilterStatus('ALL');
    setFilterPriority('ALL');
    setFilterTeam('ALL');
    setFilterProject('ALL');
  };

  // ── Task actions ───────────────────────────
  const handleStatusChange = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t =>
      t.id === taskId
        ? {
            ...t,
            status: newStatus,
            completedAt: newStatus === 'COMPLETED' ? new Date().toISOString() : t.completedAt,
            updatedAt: new Date().toISOString(),
            activityLog: [
              ...(t.activityLog ?? []),
              {
                id: `act-${Date.now()}`,
                actorName: currentUser.fullName,
                actorInitials: currentUser.initials,
                action: 'Changed status',
                detail: `${t.status} → ${newStatus}`,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        : t
    ));
    // Keep selected task in sync
    setSelectedTask(prev =>
      prev?.id === taskId ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : prev
    );
  }, [currentUser]);

  const handleTaskUpdate = useCallback((taskId: string, changes: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, ...changes } : t));
    setSelectedTask(prev => prev?.id === taskId ? { ...prev, ...changes } : prev);
  }, []);

  const handleCreateTask = useCallback((newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const handleCreateFromColumn = useCallback((status: TaskStatus) => {
    setCreateDefaultStatus(status);
    setCreateModalOpen(true);
  }, []);

  // Dependency helpers
  const getDependencyTitle = useCallback((id: string) =>
    tasks.find(t => t.id === id)?.title ?? id,
  [tasks]);

  const getDependentTasksOf = useCallback((id: string) =>
    tasks.filter(t => t.dependsOnTaskIds.includes(id)),
  [tasks]);

  // ── Role capability flags ──────────────────
  const canCreate = ['FACULTY', 'CORE', 'TEAM_LEAD'].includes(currentUser.primaryRole);

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────
  return (
    <div className="space-y-6">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <CheckSquare className="h-4 w-4" />
            <span>Workflow Directives</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
            Task Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} — Kanban board &amp; list view
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* View switcher */}
          <div className="flex rounded-xl border border-border/60 overflow-hidden bg-card/50">
            <button
              onClick={() => setView('kanban')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                view === 'kanban' ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
            <div className="w-px bg-border/60" />
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                view === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <LayoutList className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          {/* Create task button */}
          {canCreate && (
            <button
              onClick={() => { setCreateDefaultStatus('TODO'); setCreateModalOpen(true); }}
              className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-400 transition-all shadow-[0_0_15px_-3px_rgba(0,229,255,0.5)] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>New Task</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Blocked tasks alert ── */}
      {blockedCount > 0 && filterStatus !== 'BLOCKED' && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/8 px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
          <p className="text-sm text-red-300/90">
            <span className="font-bold">{blockedCount} task{blockedCount !== 1 ? 's' : ''} blocked</span>
            <span className="text-red-400/70"> — require attention to unblock the workflow.</span>
          </p>
          <button
            onClick={() => setFilterStatus('BLOCKED')}
            className="ml-auto text-xs font-semibold text-red-400 hover:text-red-300 transition-colors cursor-pointer whitespace-nowrap"
          >
            View blocked →
          </button>
        </div>
      )}

      {/* ── Search + Filter Bar ── */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks by title, description, team, assignee..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-border/60 bg-card/60 pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/60 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
              filtersOpen || hasActiveFilters
                ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                : 'border-border/60 bg-card/60 text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && (
              <span className="rounded-full bg-cyan-500 h-1.5 w-1.5" />
            )}
            <ChevronDown className={`h-3 w-3 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="hidden sm:block rounded-xl border border-border/60 bg-card/60 px-3 py-2 text-xs font-semibold text-muted-foreground focus:outline-none focus:border-cyan-500/60 cursor-pointer"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        {/* Expanded filter panel */}
        {filtersOpen && (
          <div className="rounded-xl border border-border/60 bg-card/60 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <FilterSelect
              label="Status"
              value={filterStatus}
              onChange={v => setFilterStatus(v as TaskStatus | 'ALL')}
              options={STATUS_OPTIONS}
            />
            <FilterSelect
              label="Priority"
              value={filterPriority}
              onChange={v => setFilterPriority(v as TaskPriority | 'ALL')}
              options={PRIORITY_OPTIONS}
            />
            <FilterSelect
              label="Team"
              value={filterTeam}
              onChange={setFilterTeam}
              options={[
                { value: 'ALL', label: 'All Teams' },
                ...MOCK_TEAMS.map(t => ({ value: t.slug, label: t.name })),
              ]}
            />
            <FilterSelect
              label="Project"
              value={filterProject}
              onChange={setFilterProject}
              options={[
                { value: 'ALL', label: 'All Projects' },
                ...MOCK_PROJECTS.map(p => ({ value: p.id, label: p.name })),
              ]}
            />

            {/* Sort (mobile) */}
            <div className="sm:hidden col-span-2">
              <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="w-full rounded-lg border border-border/60 bg-muted/40 px-2 py-1.5 text-xs text-foreground focus:outline-none"
              >
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <SlidersHorizontal className="h-3 w-3" />
              <span>Filters:</span>
            </div>
            {searchQuery && (
              <FilterChip label={`"${searchQuery}"`} onRemove={() => setSearchQuery('')} />
            )}
            {filterStatus !== 'ALL' && (
              <FilterChip label={filterStatus.replace('_', ' ')} onRemove={() => setFilterStatus('ALL')} />
            )}
            {filterPriority !== 'ALL' && (
              <FilterChip label={filterPriority} onRemove={() => setFilterPriority('ALL')} />
            )}
            {filterTeam !== 'ALL' && (
              <FilterChip label={MOCK_TEAMS.find(t => t.slug === filterTeam)?.name ?? filterTeam} onRemove={() => setFilterTeam('ALL')} />
            )}
            {filterProject !== 'ALL' && (
              <FilterChip label={MOCK_PROJECTS.find(p => p.id === filterProject)?.name ?? filterProject} onRemove={() => setFilterProject('ALL')} />
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-red-400 transition-colors ml-1 cursor-pointer"
            >
              Clear all
            </button>
            <span className="text-xs text-muted-foreground ml-auto">
              {filteredTasks.length} result{filteredTasks.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {/* ── Main Board / List ── */}
      {view === 'kanban' ? (
        <KanbanBoard
          tasks={filteredTasks}
          onTaskClick={setSelectedTask}
          onStatusChange={handleStatusChange}
          onCreateTask={canCreate ? handleCreateFromColumn : undefined}
        />
      ) : (
        <TaskList
          tasks={filteredTasks}
          onTaskClick={setSelectedTask}
        />
      )}

      {/* ── Task Detail Modal ── */}
      <TaskDetailModal
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onUpdate={handleTaskUpdate}
        getDependencyTitle={getDependencyTitle}
        getDependentTasks={getDependentTasksOf}
      />

      {/* ── Create Task Modal ── */}
      <CreateTaskModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateTask}
        defaultStatus={createDefaultStatus}
        currentUserId={currentUser.id}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────
function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-border/60 bg-muted/40 px-2 py-1.5 text-xs text-foreground focus:outline-none focus:border-cyan-500/60 cursor-pointer"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-400">
      {label}
      <button onClick={onRemove} className="cursor-pointer hover:text-white transition-colors">
        <X className="h-2.5 w-2.5" />
      </button>
    </span>
  );
}
