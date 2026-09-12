'use client';

import React from 'react';
import { MOCK_EVENTS } from '@/data/mock-events';
import { Calendar, MapPin, Users } from 'lucide-react';
import { StatusBadge } from '@/components/ui/status-badge';

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
          <Calendar className="h-4 w-4" />
          <span>Operational Operations</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground mt-1">
          CSI Events Schedule
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Official flagship events, technical workshops, and coding challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {MOCK_EVENTS.map((event) => (
          <div
            key={event.id}
            className="rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-base text-foreground">{event.name}</h3>
                <StatusBadge status={event.status} size="sm" />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{event.description}</p>
            </div>

            <div className="mt-6 pt-4 border-t border-border/50 space-y-2 text-xs text-slate-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  Venue:
                </span>
                <span className="text-foreground font-medium">{event.venue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-violet-400" />
                  Date:
                </span>
                <span className="font-mono text-[11px]">
                  {new Date(event.startDatetime).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-emerald-400" />
                  Teams:
                </span>
                <span className="font-mono text-[11px] text-cyan-300">
                  {event.participatingTeams.length} Teams Involved
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
