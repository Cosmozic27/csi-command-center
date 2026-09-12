'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, ChevronRight } from 'lucide-react';
import { MOCK_EVENTS } from '@/data/mock-events';
import { StatusBadge } from '@/components/ui/status-badge';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <CalendarIcon className="h-4 w-4" />
          <span>Timeline & Milestones</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          Integrated Operations Calendar
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upcoming deadlines, workshop dates, committee syncs, and flagship releases.
        </p>
      </div>

      <div className="space-y-3">
        {MOCK_EVENTS.map((event) => (
          <div
            key={event.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <span className="text-[10px] font-mono uppercase">
                  {new Date(event.startDatetime).toLocaleString('default', { month: 'short' })}
                </span>
                <span className="text-base font-bold font-mono">
                  {new Date(event.startDatetime).getDate()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{event.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {event.venue} • {new Date(event.startDatetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <StatusBadge status={event.status} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
