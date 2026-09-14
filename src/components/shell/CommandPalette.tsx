'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  LayoutDashboard,
  Users,
  FolderKanban,
  Calendar,
  CheckSquare,
  FileText,
  BarChart3,
  Activity,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { MOCK_TASKS } from '@/data/mock-tasks';
import { MOCK_PROJECTS } from '@/data/mock-projects';
import { MOCK_TEAMS } from '@/data/mock-teams';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  const navCommands = [
    { label: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard, category: 'Navigation' },
    { label: 'Teams & Rosters', href: '/app/teams', icon: Users, category: 'Navigation' },
    { label: 'Projects Overview', href: '/app/projects', icon: FolderKanban, category: 'Navigation' },
    { label: 'Events Calendar', href: '/app/events', icon: Calendar, category: 'Navigation' },
    { label: 'Task Kanban Board', href: '/app/tasks', icon: CheckSquare, category: 'Navigation' },
    { label: 'Files & Repository', href: '/app/files', icon: FileText, category: 'Navigation' },
    { label: 'Calendar', href: '/app/calendar', icon: Calendar, category: 'Navigation' },
    { label: 'Analytics', href: '/app/analytics', icon: BarChart3, category: 'Navigation' },
    { label: 'Members', href: '/app/members', icon: Users, category: 'Navigation' },
    { label: 'Activity Log', href: '/app/activity', icon: Activity, category: 'Navigation' },
  ];

  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) {
      return {
        nav: navCommands,
        tasks: MOCK_TASKS.slice(0, 3),
        projects: MOCK_PROJECTS.slice(0, 2),
      };
    }

    return {
      nav: navCommands.filter((item) => item.label.toLowerCase().includes(q)),
      tasks: MOCK_TASKS.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.assignedTeamName.toLowerCase().includes(q) ||
          (t.assignedUserName && t.assignedUserName.toLowerCase().includes(q))
      ),
      projects: MOCK_PROJECTS.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      ),
      teams: MOCK_TEAMS.filter((t) => t.name.toLowerCase().includes(q)),
    };
  }, [query]);

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-500/40 bg-card/95 shadow-2xl shadow-cyan-950/80 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Search Bar */}
        <div className="flex items-center border-b border-border/80 px-4 py-3">
          <Search className="h-5 w-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            autoFocus
            className="ml-3 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <kbd className="rounded border border-border bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-4">
          {/* Navigation Section */}
          {filteredItems.nav && filteredItems.nav.length > 0 && (
            <div>
              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Navigation
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredItems.nav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors cursor-pointer group text-left"
                    >
                      <span className="flex items-center gap-2.5">
                        <Icon className="h-4 w-4 text-slate-400 group-hover:text-cyan-400" />
                        <span className="font-medium text-foreground">{item.label}</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tasks Section */}
          {filteredItems.tasks && filteredItems.tasks.length > 0 && (
            <div>
              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tasks
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredItems.tasks.slice(0, 4).map((task) => (
                  <button
                    key={task.id}
                    onClick={() => handleSelect('/app/tasks')}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-foreground truncate">{task.title}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {task.assignedTeamName} • {task.assignedUserName || 'Unassigned'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 bg-cyan-500/10 rounded">
                      {task.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {filteredItems.projects && filteredItems.projects.length > 0 && (
            <div>
              <span className="px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Projects
              </span>
              <div className="mt-1 space-y-0.5">
                {filteredItems.projects.map((proj) => (
                  <button
                    key={proj.id}
                    onClick={() => handleSelect('/app/projects')}
                    className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-300 transition-colors cursor-pointer group text-left"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-medium text-foreground truncate">{proj.name}</span>
                      <span className="text-[10px] text-muted-foreground truncate">
                        {proj.description}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-violet-400 px-1.5 py-0.5 bg-violet-500/10 rounded">
                      {proj.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border/80 px-4 py-2.5 bg-card/50 flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>Search anything across CSI OS</span>
          </span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
