'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MOCK_TEAMS } from '@/data/mock-teams';
import type { Task, TaskPriority, TeamSlug } from '@/types/entities';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreated: (task: Task) => void;
  defaultTeamSlug?: TeamSlug;
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onTaskCreated,
  defaultTeamSlug = 'technical',
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [teamSlug, setTeamSlug] = useState<TeamSlug>(defaultTeamSlug);
  const [priority, setPriority] = useState<TaskPriority>('HIGH');
  const [dueDate, setDueDate] = useState('2026-09-25');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    const selectedTeam = MOCK_TEAMS.find((t) => t.slug === teamSlug) || MOCK_TEAMS[0];

    setTimeout(() => {
      const newTask: Task = {
        id: `task-custom-${Date.now()}`,
        title: title.trim(),
        description: description.trim() || 'No description provided.',
        status: 'TODO',
        priority,
        taskType: 'GENERAL',
        assignedTeamId: selectedTeam.id,
        assignedTeamName: selectedTeam.name,
        assignedTeamSlug: selectedTeam.slug,
        assignedUserId: selectedTeam.teamLead?.id || null,
        assignedUserName: selectedTeam.teamLead?.fullName || 'Assigned Lead',
        createdById: 'usr-core-01',
        projectId: 'proj-techfest-2026',
        eventId: null,
        startDate: new Date().toISOString(),
        dueDate: new Date(dueDate).toISOString(),
        completedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        dependsOnTaskIds: [],
      };

      onTaskCreated(newTask);
      setIsSubmitting(false);
      setTitle('');
      setDescription('');
      onClose();
    }, 400);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Operational Directive"
      subtitle="Issue a cross-team task assignment with priority and deadline."
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
            Directive Title
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Deploy Registration Portal Backend"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
            Description & Scope
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Specify deliverables, links, dependencies, or required formats..."
            rows={3}
            className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:border-cyan-500/60 focus:bg-card/90 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
              Assigned Team Sector
            </label>
            <select
              value={teamSlug}
              onChange={(e) => setTeamSlug(e.target.value as TeamSlug)}
              className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              {MOCK_TEAMS.map((t) => (
                <option key={t.id} value={t.slug} className="bg-card text-foreground">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
              Priority Tier
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            >
              <option value="LOW" className="bg-card">LOW</option>
              <option value="MEDIUM" className="bg-card">MEDIUM</option>
              <option value="HIGH" className="bg-card">HIGH</option>
              <option value="URGENT" className="bg-card">URGENT</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-1">
            Deadline
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full rounded-lg border border-border/80 bg-card/60 px-3 py-2 text-xs text-foreground focus:border-cyan-500/60 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
            required
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/60">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            Dispatch Directive
          </Button>
        </div>
      </form>
    </Modal>
  );
}
