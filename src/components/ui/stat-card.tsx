import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  glowColor?: 'cyan' | 'violet' | 'emerald' | 'amber';
  badge?: string;
  className?: string;
}

const colorVariants = {
  cyan: {
    iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 ring-cyan-500/20',
    borderGlow: 'hover:border-cyan-500/40 hover:shadow-[0_0_20px_-5px_rgba(0,229,255,0.2)]',
    accentText: 'text-cyan-400',
  },
  violet: {
    iconBg: 'bg-violet-500/10 text-violet-400 border-violet-500/30 ring-violet-500/20',
    borderGlow: 'hover:border-violet-500/40 hover:shadow-[0_0_20px_-5px_rgba(99,102,241,0.2)]',
    accentText: 'text-violet-400',
  },
  emerald: {
    iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 ring-emerald-500/20',
    borderGlow: 'hover:border-emerald-500/40 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.2)]',
    accentText: 'text-emerald-400',
  },
  amber: {
    iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30 ring-amber-500/20',
    borderGlow: 'hover:border-amber-500/40 hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.2)]',
    accentText: 'text-amber-400',
  },
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  glowColor = 'cyan',
  badge,
  className = '',
}: StatCardProps) {
  const theme = colorVariants[glowColor];

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border/80 bg-card/70 p-5 backdrop-blur-md transition-all duration-300 ${theme.borderGlow} ${className}`}
    >
      {/* Background cyber accent */}
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-linear-to-br from-cyan-500/5 to-transparent blur-2xl pointer-events-none" />

      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          {title}
        </span>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-lg border ring-1 ${theme.iconBg}`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-foreground font-mono">
            {value}
          </span>
          {badge && (
            <span className="rounded bg-secondary/20 px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground border border-secondary/30">
              {badge}
            </span>
          )}
        </div>

        {(subtitle || trend) && (
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            {trend && (
              <span
                className={`inline-flex items-center gap-0.5 font-medium ${
                  trend.isPositive ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {trend.isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {trend.value}
              </span>
            )}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
      </div>

      {/* Cyber line accent at bottom on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-cyan-400 to-violet-500 transition-all duration-300 group-hover:w-full" />
    </div>
  );
}
