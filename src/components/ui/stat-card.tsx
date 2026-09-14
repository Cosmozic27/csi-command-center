import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; isPositive: boolean };
  glowColor?: 'cyan' | 'violet' | 'emerald' | 'amber';
  badge?: string;
  className?: string;
}

const colorVariants = {
  cyan: { iconBg: 'bg-cyan-400/10 text-cyan-300 border-cyan-400/25', accentText: 'text-cyan-400' },
  violet: { iconBg: 'bg-violet-400/10 text-violet-300 border-violet-400/25', accentText: 'text-violet-400' },
  emerald: { iconBg: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25', accentText: 'text-emerald-400' },
  amber: { iconBg: 'bg-amber-400/10 text-amber-300 border-amber-400/25', accentText: 'text-amber-400' },
};

export function StatCard({ title, value, subtitle, icon: Icon, trend, glowColor = 'cyan', badge, className = '' }: StatCardProps) {
  const theme = colorVariants[glowColor];
  return <div className={`rounded-xl border border-border/70 bg-card/90 p-5 transition-colors hover:border-cyan-400/35 ${className}`}>
    <div className="flex items-start justify-between gap-3"><span className="text-xs font-medium text-muted-foreground">{title}</span><div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${theme.iconBg}`}><Icon className="h-4 w-4" /></div></div>
    <div className="mt-4 flex items-baseline gap-2"><span className="text-3xl font-bold tracking-tight text-foreground">{value}</span>{badge && <span className="rounded-md border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{badge}</span>}</div>
    {(subtitle || trend) && <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">{trend && <span className={`inline-flex items-center gap-0.5 font-medium ${trend.isPositive ? 'text-emerald-400' : 'text-red-400'}`}>{trend.isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}{trend.value}</span>}{subtitle && <span>{subtitle}</span>}</div>}
  </div>;
}
