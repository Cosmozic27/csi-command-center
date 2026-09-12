import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/40 p-8 text-center backdrop-blur-xs ${className}`}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_-3px_rgba(0,229,255,0.2)]">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cyan-500/40 bg-cyan-500/15 px-4 py-2 text-xs font-semibold text-cyan-300 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-500/25 hover:shadow-[0_0_15px_-3px_rgba(0,229,255,0.3)] active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
