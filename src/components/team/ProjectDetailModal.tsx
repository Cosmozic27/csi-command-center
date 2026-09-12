'use client';

import React from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/ui/status-badge';
import { FolderKanban, Calendar, Users, ArrowRight, CheckCircle2, Layers } from 'lucide-react';
import type { Project } from '@/types/entities';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

export function ProjectDetailModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Strategic Project Specification"
      subtitle={`Code: ${project.slug} • Lead: ${project.ownerName}`}
      maxWidth="lg"
    >
      <div className="space-y-4">
        {/* Header & Status */}
        <div className="p-4 rounded-xl border border-border/80 bg-card/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-foreground">{project.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Target Milestone: {new Date(project.startDate).toLocaleDateString()} to {new Date(project.endDate).toLocaleDateString()}
            </p>
          </div>
          <StatusBadge status={project.status} size="md" />
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        {/* Progress Bar */}
        <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-foreground font-medium">Sprint Completion: {project.progressPercentage}%</span>
            <span className="text-cyan-400">{project.completedTaskCount} of {project.taskCount} Directives Done</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-cyan-400 via-sky-400 to-indigo-500 rounded-full"
              style={{ width: `${project.progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Cross-Team Workflow Sequence Pipeline */}
        <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Cross-Team Execution Pipeline
            </h4>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-1.5 scrollbar-none">
            {project.participatingTeams.map((team, idx) => (
              <React.Fragment key={team.id}>
                <div className="flex flex-col items-center shrink-0 rounded-lg border border-cyan-500/30 bg-card/80 px-3 py-2 text-center min-w-[110px]">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Phase {idx + 1}</span>
                  <span className="text-xs font-semibold text-foreground truncate mt-0.5">{team.name}</span>
                </div>
                {idx < project.participatingTeams.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-cyan-400/60 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Participating Teams Badges */}
        <div>
          <span className="text-xs font-semibold text-foreground uppercase tracking-wider block mb-2">
            Participating Sectors ({project.participatingTeams.length})
          </span>
          <div className="flex flex-wrap gap-2">
            {project.participatingTeams.map((team) => (
              <span
                key={team.id}
                className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium border border-border/80 bg-card/50 text-foreground"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                {team.name}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2 border-t border-border/60">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
