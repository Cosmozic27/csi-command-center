'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Shield,
  FolderKanban,
  CheckSquare,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  Activity,
  AlertCircle,
  Clock,
  Layers,
  Plus,
  Bell,
  CheckCircle2,
  FileCheck,
  Megaphone,
  Eye,
  Filter,
  Check,
} from 'lucide-react';
import { useMockSession } from '@/contexts/MockSessionContext';
import { StatCard } from '@/components/ui/stat-card';
import { StatusBadge } from '@/components/ui/status-badge';
import { PriorityBadge } from '@/components/ui/priority-badge';
import { RoleBadge } from '@/components/ui/role-badge';
import { UserAvatar } from '@/components/ui/user-avatar';
import { Button } from '@/components/ui/button';
import { Tabs } from '@/components/ui/tabs';
import { MOCK_TASKS } from '@/data/mock-tasks';
import { MOCK_PROJECTS } from '@/data/mock-projects';
import { MOCK_TEAMS } from '@/data/mock-teams';
import { MOCK_ACTIVITY } from '@/data/mock-activity';
import { MOCK_APPROVALS } from '@/data/mock-approvals';
import { MOCK_ANNOUNCEMENTS } from '@/data/mock-announcements';
import { MOCK_EVENTS } from '@/data/mock-events';
import { CreateTaskModal } from '@/components/dashboard/CreateTaskModal';
import { ApprovalModal } from '@/components/dashboard/ApprovalModal';
import { CreateAnnouncementModal } from '@/components/dashboard/CreateAnnouncementModal';
import type { Task, Approval, Announcement, TaskStatus } from '@/types/entities';

export default function DashboardPage() {
  const { currentUser, isCoreOrFaculty } = useMockSession();

  // Interactive Frontend State
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [approvals, setApprovals] = useState<Approval[]>(MOCK_APPROVALS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(MOCK_ANNOUNCEMENTS);
  const [activeTab, setActiveTab] = useState('command');
  const [taskFilter, setTaskFilter] = useState<'ALL' | 'IN_PROGRESS' | 'URGENT' | 'COMPLETED'>('ALL');

  // Modals state
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isCreateAnnOpen, setIsCreateAnnOpen] = useState(false);
  const [activeApproval, setActiveApproval] = useState<Approval | null>(null);

  // User team identification
  const userTeamSlug = currentUser.teamMemberships?.[0]?.teamSlug || 'technical';
  const userRole = currentUser.primaryRole;

  // Filter tasks based on role & filter tab
  const filteredTasks = useMemo(() => {
    let list = tasks;

    // For team members & leads, give option to view team-specific tasks
    if (userRole === 'TEAM_MEMBER') {
      list = tasks.filter(
        (t) => t.assignedUserId === currentUser.id || t.assignedTeamSlug === userTeamSlug
      );
    } else if (userRole === 'TEAM_LEAD') {
      list = tasks.filter((t) => t.assignedTeamSlug === userTeamSlug);
    }

    if (taskFilter === 'IN_PROGRESS') {
      return list.filter((t) => t.status === 'IN_PROGRESS');
    }
    if (taskFilter === 'URGENT') {
      return list.filter((t) => t.priority === 'URGENT' || t.priority === 'HIGH');
    }
    if (taskFilter === 'COMPLETED') {
      return list.filter((t) => t.status === 'COMPLETED');
    }

    return list;
  }, [tasks, userRole, currentUser.id, userTeamSlug, taskFilter]);

  // Urgent tasks across whole org
  const urgentTasks = useMemo(() => {
    return tasks.filter((t) => (t.priority === 'URGENT' || t.priority === 'HIGH') && t.status !== 'COMPLETED').slice(0, 3);
  }, [tasks]);

  // Pending approvals
  const pendingApprovals = useMemo(() => {
    return approvals.filter((a) => a.status === 'PENDING');
  }, [approvals]);

  // Action handlers
  const handleToggleTaskStatus = (taskId: string) => {
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

  const handleApprove = (approvalId: string, comment: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId
          ? {
              ...a,
              status: 'APPROVED',
              completedAt: new Date().toISOString(),
              actions: [
                ...a.actions,
                {
                  id: `act-${Date.now()}`,
                  approvalId: a.id,
                  reviewerId: currentUser.id,
                  reviewerName: currentUser.fullName,
                  reviewerRole: currentUser.primaryRole,
                  action: 'APPROVE',
                  comment,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : a
      )
    );
  };

  const handleRequestChanges = (approvalId: string, comment: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === approvalId
          ? {
              ...a,
              status: 'CHANGES_REQUESTED',
              actions: [
                ...a.actions,
                {
                  id: `act-${Date.now()}`,
                  approvalId: a.id,
                  reviewerId: currentUser.id,
                  reviewerName: currentUser.fullName,
                  reviewerRole: currentUser.primaryRole,
                  action: 'REQUEST_CHANGES',
                  comment,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : a
      )
    );
  };

  const handleAnnouncementCreated = (newAnn: Announcement) => {
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Executive Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/90 p-6">

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
                <span className="text-sm font-medium text-cyan-400">
                {userRole === 'FACULTY' ? 'Faculty overview' : userRole === 'CORE' ? 'Core team overview' : 'Your workspace'}
                </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Welcome back, {currentUser.fullName}
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {userRole === 'FACULTY' &&
                'Review committee health, approvals, budgets, and upcoming events from one place.'}
              {userRole === 'CORE' &&
                'Coordinate cross-team work, project milestones, task bottlenecks, and committee priorities.'}
              {userRole === 'ADVISORY' &&
                'Review active initiatives, monitor event readiness, and support committee leads.'}
              {userRole === 'TEAM_LEAD' &&
                `Manage deliverables, assign tasks, and coordinate work for ${currentUser.teamMemberships?.[0]?.teamName || 'your team'}.`}
              {userRole === 'TEAM_MEMBER' &&
                `Review assigned tasks, prepare work, and keep milestones up to date.`}
              {userRole === 'GENERAL_MEMBER' &&
                'Find announcements, volunteer opportunities, and upcoming committee activities.'}
            </p>
          </div>

          {/* Role-Specific Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <RoleBadge role={currentUser.primaryRole} size="md" />

            {(userRole === 'CORE' || userRole === 'FACULTY' || userRole === 'TEAM_LEAD') && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateTaskOpen(true)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Create task
              </Button>
            )}

            {(userRole === 'CORE' || userRole === 'FACULTY') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreateAnnOpen(true)}
              >
                <Megaphone className="h-3.5 w-3.5 mr-1 text-cyan-400" />
                New announcement
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Role-Aware KPI Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {userRole === 'FACULTY' ? (
          <>
            <StatCard
              title="Pending Sign-Offs"
              value={pendingApprovals.length}
              subtitle="Budget & event approvals"
              icon={Shield}
              glowColor="cyan"
              badge="ACTION REQUIRED"
            />
            <StatCard
              title="Active Initiatives"
              value="2 / 3"
              subtitle="TechFest & Hackathon 2026"
              icon={FolderKanban}
              glowColor="violet"
              trend={{ value: "On schedule", isPositive: true }}
            />
            <StatCard
              title="Committee Strength"
              value="38"
              subtitle="9 teams fully staffed"
              icon={Users}
              glowColor="emerald"
            />
            <StatCard
              title="Institutional Grant"
              value="₹1.5L"
              subtitle="Allocated for Q3-Q4 ops"
              icon={CheckCircle2}
              glowColor="amber"
            />
          </>
        ) : userRole === 'CORE' ? (
          <>
            <StatCard
              title="Active Initiatives"
              value="2 / 3"
              subtitle="TechFest & Hackathon 2026"
              icon={FolderKanban}
              glowColor="cyan"
              trend={{ value: "+1 this month", isPositive: true }}
            />
            <StatCard
              title="Cross-Team Directives"
              value={tasks.length}
              subtitle={`${tasks.filter((t) => t.status === 'IN_PROGRESS').length} in progress, ${urgentTasks.length} urgent`}
              icon={CheckSquare}
              glowColor="violet"
              trend={{ value: "72% throughput", isPositive: true }}
            />
            <StatCard
              title="Pending Approvals"
              value={pendingApprovals.length}
              subtitle="Awaiting Faculty/Core review"
              icon={FileCheck}
              glowColor="amber"
              badge="REVIEW QUEUE"
            />
            <StatCard
              title="Active Committee"
              value="38"
              subtitle="Across 9 specialized sectors"
              icon={Users}
              glowColor="emerald"
            />
          </>
        ) : userRole === 'TEAM_LEAD' ? (
          <>
            <StatCard
              title="Sector Active Tasks"
              value={tasks.filter((t) => t.assignedTeamSlug === userTeamSlug).length}
              subtitle="Directives under team management"
              icon={CheckSquare}
              glowColor="cyan"
            />
            <StatCard
              title="Team Members"
              value="8"
              subtitle="Specialists currently assigned"
              icon={Users}
              glowColor="emerald"
            />
            <StatCard
              title="Work Submissions"
              value="1"
              subtitle="Under Core review"
              icon={FileCheck}
              glowColor="violet"
            />
            <StatCard
              title="Next Deadline"
              value="Sept 20"
              subtitle="Event poster delivery"
              icon={Calendar}
              glowColor="amber"
              badge="CRITICAL"
            />
          </>
        ) : userRole === 'TEAM_MEMBER' ? (
          <>
            <StatCard
              title="My Assigned Tasks"
              value={tasks.filter((t) => t.assignedUserId === currentUser.id).length}
              subtitle="Active individual directives"
              icon={CheckSquare}
              glowColor="cyan"
            />
            <StatCard
              title="Tasks Completed"
              value={tasks.filter((t) => t.assignedUserId === currentUser.id && t.status === 'COMPLETED').length}
              subtitle="Successfully signed off"
              icon={CheckCircle2}
              glowColor="emerald"
            />
            <StatCard
              title="My Team Sector"
              value="Technical"
              subtitle="12 active team tasks"
              icon={Layers}
              glowColor="violet"
            />
            <StatCard
              title="Upcoming Milestone"
              value="Sept 22"
              subtitle="Registration portal deploy"
              icon={Calendar}
              glowColor="amber"
            />
          </>
        ) : userRole === 'ADVISORY' ? (
          <>
            <StatCard
              title="Initiatives Audited"
              value="3"
              subtitle="TechFest, Hackathon, AI Workshop"
              icon={FolderKanban}
              glowColor="cyan"
            />
            <StatCard
              title="Strategic Health"
              value="94%"
              subtitle="All milestones within threshold"
              icon={Shield}
              glowColor="emerald"
            />
            <StatCard
              title="Quality Reviews"
              value="2"
              subtitle="Pending review notes"
              icon={FileCheck}
              glowColor="violet"
            />
            <StatCard
              title="Advisory Recommendations"
              value="5"
              subtitle="Submitted to Core leadership"
              icon={Sparkles}
              glowColor="amber"
            />
          </>
        ) : (
          <>
            <StatCard
              title="Volunteer Openings"
              value="3"
              subtitle="TechFest event management"
              icon={Users}
              glowColor="cyan"
              badge="OPEN"
            />
            <StatCard
              title="Upcoming Events"
              value="3"
              subtitle="Eligible for member attendance"
              icon={Calendar}
              glowColor="violet"
            />
            <StatCard
              title="Active Bulletins"
              value={announcements.length}
              subtitle="From Core Committee"
              icon={Megaphone}
              glowColor="emerald"
            />
            <StatCard
              title="Chapter Points"
              value="120"
              subtitle="Member participation index"
              icon={Sparkles}
              glowColor="amber"
            />
          </>
        )}
      </div>

      {/* Main View Tabs */}
      <div className="flex items-center justify-between border-b border-border/80 pb-3">
        <Tabs
          tabs={[
            { id: 'command', label: 'Command Operations' },
            { id: 'approvals', label: 'Governance & Approvals', badge: pendingApprovals.length },
            { id: 'bulletins', label: 'Committee Bulletins', badge: announcements.length },
            { id: 'teams', label: '9 Team Sectors' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-mono">
          <Clock className="h-3.5 w-3.5 text-cyan-400" />
          <span>REAL-TIME LOCAL STREAM</span>
        </div>
      </div>

      {/* TAB 1: COMMAND OPERATIONS */}
      {activeTab === 'command' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main 2-Column Section */}
          <div className="space-y-6 lg:col-span-2">
            {/* Urgent Directives Section */}
            {urgentTasks.length > 0 && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-wider">
                    <AlertCircle className="h-4 w-4" />
                    <span>Urgent Directives & Blocker Watch</span>
                  </div>
                  <span className="text-[11px] text-red-400/80 font-mono">
                    {urgentTasks.length} items flagged
                  </span>
                </div>

                <div className="space-y-2">
                  {urgentTasks.map((t) => (
                    <div
                      key={t.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-lg bg-card/70 border border-border/70 hover:border-red-500/40 transition-all text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleTaskStatus(t.id)}
                          title="Click to mark complete"
                          className="h-5 w-5 rounded border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500/20 cursor-pointer"
                        >
                          {t.status === 'COMPLETED' && <Check className="h-3.5 w-3.5" />}
                        </button>
                        <div>
                          <span className="font-semibold text-foreground block">{t.title}</span>
                          <span className="text-[10px] text-muted-foreground">
                            {t.assignedTeamName} • Lead: {t.assignedUserName || 'Assigned'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <PriorityBadge priority={t.priority} size="sm" />
                        <span className="text-[10px] font-mono text-slate-400">
                          Due {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'TBD'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Strategic Projects Overview */}
            <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Strategic Initiatives & Event Horizon
                  </h3>
                </div>
                <Link
                  href="/app/projects"
                  className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-medium"
                >
                  <span>All Projects</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {MOCK_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl border border-border/70 bg-card/40 hover:border-cyan-500/40 hover:bg-card/80 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="font-semibold text-sm text-foreground group-hover:text-cyan-300 transition-colors">
                          {proj.name}
                        </span>
                        <StatusBadge status={proj.status} size="sm" />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                        {proj.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border/40 space-y-2">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span>Progress: {proj.progressPercentage}%</span>
                        <span>{proj.completedTaskCount}/{proj.taskCount} Tasks</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-cyan-400 to-blue-500 rounded-full"
                          style={{ width: `${proj.progressPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-Team Task Queue with Filterable Tabs */}
            <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm text-foreground">
                    Operational Task Queue
                  </h3>
                </div>

                <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-lg border border-border/60">
                  <button
                    onClick={() => setTaskFilter('ALL')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      taskFilter === 'ALL'
                        ? 'bg-card text-cyan-400 shadow-xs border border-cyan-500/30'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    All ({tasks.length})
                  </button>
                  <button
                    onClick={() => setTaskFilter('IN_PROGRESS')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      taskFilter === 'IN_PROGRESS'
                        ? 'bg-card text-cyan-400 shadow-xs border border-cyan-500/30'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    In Progress
                  </button>
                  <button
                    onClick={() => setTaskFilter('URGENT')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      taskFilter === 'URGENT'
                        ? 'bg-card text-cyan-400 shadow-xs border border-cyan-500/30'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Urgent
                  </button>
                  <button
                    onClick={() => setTaskFilter('COMPLETED')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                      taskFilter === 'COMPLETED'
                        ? 'bg-card text-cyan-400 shadow-xs border border-cyan-500/30'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Done
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {filteredTasks.slice(0, 7).map((task) => (
                  <div
                    key={task.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-lg border transition-all duration-150 ${
                      task.status === 'COMPLETED'
                        ? 'border-emerald-500/20 bg-emerald-500/5 opacity-70'
                        : 'border-border/60 bg-card/50 hover:bg-card/90 hover:border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleTaskStatus(task.id)}
                        className={`h-5 w-5 rounded border flex items-center justify-center transition-colors cursor-pointer ${
                          task.status === 'COMPLETED'
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'border-border hover:border-cyan-400 text-transparent'
                        }`}
                        title={task.status === 'COMPLETED' ? 'Mark incomplete' : 'Mark complete'}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <div>
                        <span
                          className={`text-xs font-semibold block ${
                            task.status === 'COMPLETED' ? 'line-through text-muted-foreground' : 'text-foreground'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {task.assignedTeamName} • {task.assignedUserName || 'Unassigned'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <PriorityBadge priority={task.priority} size="sm" showIcon={false} />
                      <StatusBadge status={task.status} size="sm" />
                      <span className="text-[10px] font-mono text-slate-400 ml-1">
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'TBD'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Telemetry, Approvals & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions Panel */}
            <div className="rounded-xl border border-cyan-500/30 bg-linear-to-br from-cyan-950/30 via-card/80 to-card/60 p-5 backdrop-blur-md space-y-3">
              <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Command Directives</span>
              </h3>
              <div className="space-y-2">
                {(userRole === 'CORE' || userRole === 'FACULTY' || userRole === 'TEAM_LEAD') && (
                  <Button
                    variant="cyber"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setIsCreateTaskOpen(true)}
                  >
                    <Plus className="h-3.5 w-3.5 mr-2" />
                    Issue Directive to Team
                  </Button>
                )}

                {(userRole === 'CORE' || userRole === 'FACULTY') && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setIsCreateAnnOpen(true)}
                  >
                    <Megaphone className="h-3.5 w-3.5 mr-2 text-cyan-400" />
                    Broadcast to All 9 Teams
                  </Button>
                )}

                <Link href="/app/teams" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Users className="h-3.5 w-3.5 mr-2 text-emerald-400" />
                    Inspect Roster Directory
                  </Button>
                </Link>

                <Link href="/app/events" className="block">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-3.5 w-3.5 mr-2 text-violet-400" />
                    Event Calendar & Timeline
                  </Button>
                </Link>
              </div>
            </div>

            {/* Pending Approvals Widget */}
            <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-amber-400" />
                  <h3 className="font-semibold text-sm text-foreground">Pending Sign-Offs</h3>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  {pendingApprovals.length} AWAITING
                </span>
              </div>

              <div className="space-y-2.5">
                {pendingApprovals.map((appr) => (
                  <div
                    key={appr.id}
                    onClick={() => setActiveApproval(appr)}
                    className="p-3 rounded-lg border border-border/60 bg-card/40 hover:border-cyan-500/40 hover:bg-card/90 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-xs text-foreground group-hover:text-cyan-300 transition-colors line-clamp-1">
                        {appr.title}
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 shrink-0 ml-2">
                        {appr.currentStage.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                      {appr.description}
                    </p>
                    <div className="mt-2.5 pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                      <span>By: {appr.requestedByName}</span>
                      <span className="text-cyan-400 group-hover:underline">Click to Review →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Telemetry Activity Stream */}
            <div className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <h3 className="font-semibold text-sm text-foreground">Live Telemetry</h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                  ONLINE
                </span>
              </div>

              <div className="space-y-3">
                {MOCK_ACTIVITY.slice(0, 5).map((act) => (
                  <div key={act.id} className="flex items-start gap-2.5 text-xs">
                    <UserAvatar name={act.actorName} size="xs" isOnline={false} />
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300">
                        <span className="font-semibold text-foreground">{act.actorName}</span>{' '}
                        {act.description}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(act.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GOVERNANCE & APPROVALS */}
      {activeTab === 'approvals' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Official Approvals & Sign-Offs</h2>
              <p className="text-xs text-muted-foreground">
                All submitted deliverables, budgets, rulebooks, and creative assets requiring Core or Faculty authorization.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {approvals.map((appr) => (
              <div
                key={appr.id}
                className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-sm text-foreground">{appr.title}</h3>
                    <StatusBadge status={appr.status} size="sm" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{appr.description}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-between">
                  <div className="text-[11px] font-mono text-slate-400">
                    <span>Submitted by {appr.requestedByName}</span>
                  </div>

                  <Button
                    variant="cyber"
                    size="sm"
                    onClick={() => setActiveApproval(appr)}
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    Review Audit
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BULLETINS & ANNOUNCEMENTS */}
      {activeTab === 'bulletins' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">Official Committee Bulletins</h2>
              <p className="text-xs text-muted-foreground">
                Broadcast messages, meeting summons, and institutional grant updates.
              </p>
            </div>

            {(userRole === 'CORE' || userRole === 'FACULTY') && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsCreateAnnOpen(true)}
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Post Announcement
              </Button>
            )}
          </div>

          <div className="space-y-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-5 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-cyan-500/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold uppercase">
                      {ann.visibility}
                    </span>
                    <h3 className="font-bold text-sm text-foreground">{ann.title}</h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(ann.publishedAt).toLocaleDateString()} by {ann.createdByName}
                  </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: 9 TEAM SECTORS DIRECTORY */}
      {activeTab === 'teams' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">9 Specialized Committee Sectors</h2>
            <p className="text-xs text-muted-foreground">
              Direct access into each team's active tasks, member roster, and leadership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_TEAMS.map((team) => (
              <div
                key={team.id}
                className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md hover:border-cyan-500/40 hover:shadow-[0_0_20px_-5px_rgba(0,229,255,0.2)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted border border-border text-cyan-400">
                        <Layers className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-foreground">{team.name}</h3>
                        <span className="text-[10px] font-mono text-cyan-400">
                          LEAD: {team.leadName || team.teamLead?.fullName || 'Assigned'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {team.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between pt-3 border-t border-border/40 text-xs text-slate-400 font-mono">
                  <span>{team.memberCount} Members</span>
                  <span className="text-cyan-400">{team.activeTasks} Active Tasks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Modals */}
      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onTaskCreated={handleTaskCreated}
        defaultTeamSlug={userTeamSlug}
      />

      <ApprovalModal
        isOpen={!!activeApproval}
        onClose={() => setActiveApproval(null)}
        approval={activeApproval}
        onApprove={handleApprove}
        onRequestChanges={handleRequestChanges}
      />

      <CreateAnnouncementModal
        isOpen={isCreateAnnOpen}
        onClose={() => setIsCreateAnnOpen(false)}
        onAnnouncementCreated={handleAnnouncementCreated}
        authorName={currentUser.fullName}
      />
    </div>
  );
}
