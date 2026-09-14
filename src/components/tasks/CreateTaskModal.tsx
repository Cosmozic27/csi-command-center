'use client';

import React, { useState } from 'react';
import type { Task, TaskStatus, TaskPriority, TaskType, TeamSlug } from '@/types/entities';
import { Modal } from '@/components/ui/modal';
import { MOCK_TEAMS } from '@/data/mock-teams';
import { MOCK_PROJECTS } from '@/data/mock-projects';
import { MOCK_EVENTS } from '@/data/mock-events';
import { MOCK_USERS, MOCK_TEAM_MEMBERS_EXTENDED } from '@/data/mock-users';

const ALL_USERS = [
  ...MOCK_USERS,
  ...MOCK_TEAM_MEMBERS_EXTENDED.map(u => ({ ...u, email: '', skills: [], isActive: true, joinedAt: '', teamMemberships: [] })),
];

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (task: Task) => void;
  defaultStatus?: TaskStatus;
  currentUserId?: string;
}

const emptyForm = {
  title: '',
  description: '',
  teamId: '',
  teamName: '',
  teamSlug: '' as TeamSlug | '',
  assigneeId: '',
  assigneeName: '',
  projectId: '',
  eventId: '',
  priority: 'MEDIUM' as TaskPriority,
  status: 'TODO' as TaskStatus,
  taskType: 'GENERAL' as TaskType,
  dueDate: '',
  dependsOnTaskId: '',
};

export function CreateTaskModal({ isOpen, onClose, onCreate, defaultStatus = 'TODO', currentUserId }: CreateTaskModalProps) {
  const [form, setForm] = useState({ ...emptyForm, status: defaultStatus });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleClose = () => {
    setForm({ ...emptyForm, status: defaultStatus });
    setErrors({});
    onClose();
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Title is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (!form.teamId) errs.team = 'Team is required';
    return errs;
  };

  const handleTeamChange = (teamId: string) => {
    const team = MOCK_TEAMS.find(t => t.id === teamId);
    setForm(f => ({
      ...f,
      teamId,
      teamName: team?.name ?? '',
      teamSlug: (team?.slug ?? '') as TeamSlug | '',
    }));
  };

  const handleAssigneeChange = (userId: string) => {
    const user = ALL_USERS.find(u => u.id === userId);
    setForm(f => ({
      ...f,
      assigneeId: userId,
      assigneeName: user?.fullName ?? '',
    }));
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: form.title.trim(),
      description: form.description.trim(),
      status: form.status,
      priority: form.priority,
      taskType: form.taskType,
      assignedTeamId: form.teamId,
      assignedTeamName: form.teamName,
      assignedTeamSlug: form.teamSlug as TeamSlug,
      assignedUserId: form.assigneeId || null,
      assignedUserName: form.assigneeName || null,
      createdById: currentUserId ?? 'usr-core-01',
      projectId: form.projectId || null,
      eventId: form.eventId || null,
      startDate: new Date().toISOString(),
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
      completedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dependsOnTaskIds: form.dependsOnTaskId ? [form.dependsOnTaskId] : [],
      blockerReason: null,
      tags: [],
      activityLog: [
        {
          id: `act-${Date.now()}`,
          actorName: MOCK_USERS.find(u => u.id === currentUserId)?.fullName ?? 'System',
          actorInitials: MOCK_USERS.find(u => u.id === currentUserId)?.initials ?? 'SY',
          action: 'Created task',
          timestamp: new Date().toISOString(),
        }
      ],
    };

    onCreate(newTask);
    setForm({ ...emptyForm, status: defaultStatus });
    setErrors({});
    onClose();
  };

  const field = (label: string, key: keyof typeof form, type: 'text' | 'textarea' | 'date' = 'text') => (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}
        {(key === 'title' || key === 'description') && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          rows={3}
          value={String(form[key])}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={`Enter ${label.toLowerCase()}...`}
          className="w-full rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/60 resize-none"
        />
      ) : (
        <input
          type={type}
          value={String(form[key])}
          onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
          placeholder={type !== 'date' ? `Enter ${label.toLowerCase()}...` : undefined}
          className="w-full rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-cyan-500/60"
        />
      )}
      {errors[key as string] && <p className="text-xs text-red-400 mt-1">{errors[key as string]}</p>}
    </div>
  );

  const selectField = (label: string, value: string, onChange: (v: string) => void, options: { value: string; label: string }[], required?: boolean) => (
    <div>
      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-border/60 bg-muted/40 px-3 py-2 text-sm text-foreground focus:outline-none focus:border-cyan-500/60 cursor-pointer"
      >
        <option value="">Select {label}...</option>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {errors[label.toLowerCase().replace(/ /g, '_')] && (
        <p className="text-xs text-red-400 mt-1">{errors[label.toLowerCase().replace(/ /g, '_')]}</p>
      )}
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Task" subtitle="Add a new task to the committee workflow" maxWidth="xl">
      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1 -mr-1">

        {field('Task Title', 'title')}
        {field('Description', 'description', 'textarea')}

        <div className="grid grid-cols-2 gap-3">
          {selectField('Team', form.teamId, handleTeamChange, MOCK_TEAMS.map(t => ({ value: t.id, label: t.name })), true)}
          {selectField(
            'Assignee',
            form.assigneeId,
            handleAssigneeChange,
            ALL_USERS
              .filter(u => u.fullName && (!form.teamSlug || u.teamMemberships?.some(m => m.teamSlug === form.teamSlug)))
              .map(u => ({ value: u.id!, label: u.fullName! }))
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {selectField('Priority', form.priority, v => setForm(f => ({ ...f, priority: v as TaskPriority })), [
            { value: 'LOW', label: '🔽 Low' },
            { value: 'MEDIUM', label: '🔼 Medium' },
            { value: 'HIGH', label: '⚠️ High' },
            { value: 'URGENT', label: '🚨 Urgent' },
          ])}
          {selectField('Status', form.status, v => setForm(f => ({ ...f, status: v as TaskStatus })), [
            { value: 'TODO', label: 'To Do' },
            { value: 'IN_PROGRESS', label: 'In Progress' },
            { value: 'UNDER_REVIEW', label: 'Under Review' },
            { value: 'COMPLETED', label: 'Completed' },
            { value: 'BLOCKED', label: 'Blocked' },
          ])}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {selectField('Task Type', form.taskType, v => setForm(f => ({ ...f, taskType: v as TaskType })), [
            { value: 'GENERAL', label: 'General' },
            { value: 'DESIGN', label: 'Design' },
            { value: 'DEVELOPMENT', label: 'Development' },
            { value: 'DOCUMENTATION', label: 'Documentation' },
            { value: 'EVENT', label: 'Event' },
            { value: 'MARKETING', label: 'Marketing' },
            { value: 'REVIEW', label: 'Review' },
          ])}
          {field('Deadline', 'dueDate', 'date')}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {selectField('Project (optional)', form.projectId, v => setForm(f => ({ ...f, projectId: v })), MOCK_PROJECTS.map(p => ({ value: p.id, label: p.name })))}
          {selectField('Event (optional)', form.eventId, v => setForm(f => ({ ...f, eventId: v })), MOCK_EVENTS.map(e => ({ value: e.id, label: e.name })))}
        </div>

      </div>

      <div className="flex gap-2 pt-4 border-t border-border/50 mt-4">
        <button
          onClick={handleSubmit}
          className="flex-1 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer"
        >
          Create Task
        </button>
        <button
          onClick={handleClose}
          className="rounded-xl border border-border/60 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
