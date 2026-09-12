'use client';

import React, { useState, useMemo } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Layers,
  CheckSquare,
  FolderKanban,
  Users,
  FileText,
  Activity,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Sparkles,
  Download,
  Clock,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Check,
} from 'lucide-react';
import { getTeamBySlug, MOCK_TEAMS } from '@/data/mock-teams';
import { TEAM_CONFIGS } from '@/data/mock-team-configs';
import { getMembersByTeamSlug } from '@/data/mock-team-members';
import { getFilesByTeamSlug } from '@/data/mock-team-files';
import { MOCK_TASKS } from '@/data/mock-tasks';
import { MOCK_PROJECTS } from '@/data/mock-projects';
import { MOCK_ACTIVITY } from '@/data/mock-activity';
import { TeamPortalHeader } from '@/components/team/TeamPortalHeader';
import { MemberCard } from '@/components/team/MemberCard';
import { TaskDetailModal } from '@/components/team/TaskDetailModal';
import { ProjectDetailModal } from '@/components/team/ProjectDetailModal';
import { CreateTaskModal } from '@/components/dashboard/CreateTaskModal';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import type { TeamSlug, Task, Project, TaskStatus, TaskPriority } from '@/types/entities';

export default function TeamPortalPage() {
  const routeParams = useParams<{ team: string }>();
  const teamSlug = (routeParams?.team || '') as TeamSlug;
  const team = getTeamBySlug(teamSlug);

  // Fallback if invalid team slug
  if (!team) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Team Sector Not Found</h2>
        <p className="text-xs text-muted-foreground">The specified committee sector does not exist.</p>
        <Link href="/app/teams">
          <Button variant="primary" size="sm">
            Return to Teams Directory
          </Button>
        </Link>
      </div>
    );
  }

  // Team configurations & datasets
  const config = TEAM_CONFIGS[teamSlug] || TEAM_CONFIGS.technical;
  const teamMembers = useMemo(() => getMembersByTeamSlug(teamSlug), [teamSlug]);
  const teamFiles = useMemo(() => getFilesByTeamSlug(teamSlug), [teamSlug]);

  // Interactive state
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [activeTab, setActiveTab] = useState('overview');
  const [taskSearch, setTaskSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | TaskStatus>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | TaskPriority>('ALL');

  // Modals state
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  // Filtered tasks for this team
  const teamTasks = useMemo(() => {
    return tasks.filter((t) => t.assignedTeamSlug === teamSlug);
  }, [tasks, teamSlug]);

  const filteredTasks = useMemo(() => {
    return teamTasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
        task.description.toLowerCase().includes(taskSearch.toLowerCase()) ||
        (task.assignedUserName && task.assignedUserName.toLowerCase().includes(taskSearch.toLowerCase()));

      const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'ALL' || task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [teamTasks, taskSearch, statusFilter, priorityFilter]);

  // Projects participating in or led by this team
  const teamProjects = useMemo(() => {
    return MOCK_PROJECTS.filter(
      (p) =>
        p.participatingTeams.some((pt) => pt.slug === teamSlug) ||
        p.ownerId === team.teamLead?.id
    );
  }, [teamSlug, team.teamLead?.id]);

  // Activity logs related to this team
  const teamActivity = useMemo(() => {
    return MOCK_ACTIVITY.filter(
      (act) => act.actorTeam.toLowerCase().includes(team.name.toLowerCase()) ||
      act.actorTeam.toLowerCase().includes(teamSlug.toLowerCase())
    );
  }, [team.name, teamSlug]);

  // Task actions
  const handleToggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextStatus: TaskStatus = t.status === 'COMPLETED' ? 'IN_PROGRESS' : 'COMPLETED';
          return {
            ...t,
            status: nextStatus,
            completedAt: nextStatus === 'COMPLETED' ? new Date().toISOString() : null,
          };
        }
        return t;
      })
    );
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Team Portal Dynamic Header */}
      <TeamPortalHeader
        team={team}
        onOpenCreateTask={() => setIsCreateTaskOpen(true)}
      />

      {/* Main Tab Navigation */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3 overflow-x-auto scrollbar-none">
        <Tabs
          tabs={[
            { id: 'overview', label: 'Sector Overview' },
            { id: 'tasks', label: 'Directives & Tasks', badge: teamTasks.length },
            { id: 'projects', label: 'Projects & Milestones', badge: teamProjects.length },
            { id: 'members', label: 'Roster & Specialists', badge: teamMembers.length },
            { id: 'files', label: 'Asset Vault', badge: teamFiles.length },
            { id: 'activity', label: 'Telemetry Stream' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <span>SECTOR SYNCHRONIZED</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: OVERVIEW */}
      {/* ============================================================ */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Sector Highlight Banner */}
          <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider">
                  Operational Mandate
                </span>
                <h3 className="text-lg font-bold text-foreground mt-0.5">
                  {config.headline}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  {config.tagline}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg border border-border/70 bg-card/80 p-3 text-center min-w-[120px]">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    {config.primaryMetricLabel}
                  </span>
                  <span className="text-base font-bold font-mono text-cyan-300">
                    {config.primaryMetricValue}
                  </span>
                </div>

                <div className="rounded-lg border border-border/70 bg-card/80 p-3 text-center min-w-[120px]">
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground block">
                    {config.secondaryMetricLabel}
                  </span>
                  <span className="text-base font-bold font-mono text-emerald-400">
                    {config.secondaryMetricValue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Team-Specific Highlights Grid */}
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-bold text-foreground">{config.customSectionTitle}</h3>
              <p className="text-xs text-muted-foreground">{config.customSectionSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {config.highlights.map((item, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-border/70 bg-card/50 backdrop-blur-md hover:border-cyan-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {item.tag}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{item.value}</span>
                    </div>
                    <h4 className="font-semibold text-xs text-foreground">{item.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Repositories, Toolkits & Links */}
          <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>Sector Infrastructure & Integrations</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {config.toolsAndLinks.map((tool, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/60 bg-card/40 hover:border-cyan-500/30 transition-all"
                >
                  <div className="min-w-0">
                    <span className="font-semibold text-xs text-foreground block truncate">
                      {tool.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono">
                      {tool.type}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 shrink-0 ml-2">
                    {tool.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks Queue Preview */}
          <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-foreground">Top Active Directives</h3>
                <p className="text-xs text-muted-foreground">Highest priority work currently in progress for {team.name}.</p>
              </div>
              <Button variant="cyber" size="sm" onClick={() => setActiveTab('tasks')}>
                View All {teamTasks.length} Tasks
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>

            <div className="space-y-2">
              {teamTasks.slice(0, 4).map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="p-3 rounded-lg border border-border/60 bg-card/40 hover:border-cyan-500/30 hover:bg-card/90 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTask(task.id);
                      }}
                      className={`h-5 w-5 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        task.status === 'COMPLETED'
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'border-border hover:border-cyan-400 text-transparent'
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                    <div className="min-w-0">
                      <span className={`text-xs font-semibold block truncate ${task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {task.title}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        Assignee: {task.assignedUserName || 'Pending Assignment'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <PriorityBadge priority={task.priority} size="sm" showIcon={false} />
                    <StatusBadge status={task.status} size="sm" />
                    <span className="text-[10px] font-mono text-slate-400">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'TBD'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: TASKS */}
      {/* ============================================================ */}
      {activeTab === 'tasks' && (
        <div className="space-y-4">
          {/* Filter, Search & Create Bar */}
          <div className="p-4 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Input
                icon={Search}
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                placeholder="Search directives by keyword, deliverable, or assignee..."
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Status filter dropdown */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-lg border border-border/80 bg-card/80 px-3 py-2 text-xs text-foreground focus:border-cyan-500/60 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
                <option value="BLOCKED">Blocked</option>
              </select>

              {/* Priority filter dropdown */}
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value as any)}
                className="rounded-lg border border-border/80 bg-card/80 px-3 py-2 text-xs text-foreground focus:border-cyan-500/60 focus:outline-none"
              >
                <option value="ALL">All Priorities</option>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateTaskOpen(true)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Issue Directive
              </Button>
            </div>
          </div>

          {/* Tasks List */}
          {filteredTasks.length === 0 ? (
            <EmptyState
              title="No Directives Found"
              description="No tasks match the active filters for this sector. Issue a new directive to begin work."
              actionLabel="Issue New Directive"
              onAction={() => setIsCreateTaskOpen(true)}
            />
          ) : (
            <div className="space-y-2">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer group ${
                    task.status === 'COMPLETED'
                      ? 'border-emerald-500/20 bg-emerald-500/5 opacity-70'
                      : 'border-border/70 bg-card/50 hover:bg-card/90 hover:border-cyan-500/40 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleTask(task.id);
                      }}
                      className={`h-5 w-5 rounded border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                        task.status === 'COMPLETED'
                          ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                          : 'border-border hover:border-cyan-400 text-transparent'
                      }`}
                      title={task.status === 'COMPLETED' ? 'Mark incomplete' : 'Mark complete'}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>

                    <div className="min-w-0">
                      <span
                        className={`text-xs font-semibold block truncate ${
                          task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {task.title}
                      </span>
                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-1">
                        <span>Assignee: {task.assignedUserName || 'Pending Assignment'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <PriorityBadge priority={task.priority} size="sm" />
                    <StatusBadge status={task.status} size="sm" />
                    <span className="text-[11px] font-mono text-slate-400 ml-1">
                      Due {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'TBD'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: PROJECTS */}
      {/* ============================================================ */}
      {activeTab === 'projects' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Associated Strategic Initiatives</h3>
            <p className="text-xs text-muted-foreground">Flagship events and initiatives involving {team.name}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="p-5 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_20px_-5px_rgba(0,229,255,0.2)] transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-bold text-sm text-foreground group-hover:text-cyan-300 transition-colors">
                      {project.name}
                    </h4>
                    <StatusBadge status={project.status} size="sm" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/50 space-y-3">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-muted-foreground">Sprint Progress</span>
                    <span className="text-cyan-400 font-bold">{project.progressPercentage}%</span>
                  </div>

                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-cyan-400 to-indigo-500 rounded-full"
                      style={{ width: `${project.progressPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>{project.participatingTeams.length} Sectors Involved</span>
                    <span className="text-cyan-400 group-hover:underline">View Pipeline →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: MEMBERS */}
      {/* ============================================================ */}
      {activeTab === 'members' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Active Sector Roster</h3>
            <p className="text-xs text-muted-foreground">Assigned specialists, leads, and contributors for {team.name}.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: FILES */}
      {/* ============================================================ */}
      {activeTab === 'files' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Sector Asset Vault</h3>
            <p className="text-xs text-muted-foreground">Published deliverables, specification sheets, and creative assets.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamFiles.map((file) => (
              <div
                key={file.id}
                className="p-4 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-semibold text-xs text-foreground block truncate">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-mono">
                        {file.category} • {file.version}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{file.size}</span>
                  <span className="text-cyan-400 flex items-center gap-1 cursor-pointer hover:underline">
                    <Download className="h-3 w-3" />
                    Download
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 6: ACTIVITY */}
      {/* ============================================================ */}
      {activeTab === 'activity' && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-foreground">Sector Telemetry Stream</h3>
            <p className="text-xs text-muted-foreground">Historical actions and milestone deliveries for {team.name}.</p>
          </div>

          <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md space-y-4">
            {teamActivity.length === 0 ? (
              <p className="text-xs text-muted-foreground py-8 text-center">No recent telemetry entries logged for this sector.</p>
            ) : (
              teamActivity.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-xs border-b border-border/40 pb-3 last:border-b-0 last:pb-0">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-200">
                      <span className="font-semibold text-foreground">{act.actorName}</span>{' '}
                      {act.description}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(act.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <TaskDetailModal
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        task={selectedTask}
        onToggleStatus={handleToggleTask}
      />

      <ProjectDetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onTaskCreated={handleTaskCreated}
        defaultTeamSlug={teamSlug}
      />
    </div>
  );
}
