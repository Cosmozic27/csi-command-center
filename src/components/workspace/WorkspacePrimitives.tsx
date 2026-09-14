import type { ReactNode } from 'react';

export function WorkspaceCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-2xl border border-border/70 bg-card/70 p-5 shadow-[0_12px_40px_-28px_rgba(0,229,255,0.45)] backdrop-blur-md ${className}`}>{children}</section>;
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">{eyebrow}</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p></div>{action}</div>;
}

export function ProgressBar({ value, color = 'bg-cyan-400' }: { value: number; color?: string }) {
  return <div className="h-2 overflow-hidden rounded-full bg-muted"><div className={`h-full rounded-full ${color}`} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} /></div>;
}

export function Pill({ children, tone = 'slate' }: { children: ReactNode; tone?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'red' | 'slate' }) {
  const styles = { cyan: 'border-cyan-400/25 bg-cyan-400/10 text-cyan-300', violet: 'border-violet-400/25 bg-violet-400/10 text-violet-300', emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300', amber: 'border-amber-400/25 bg-amber-400/10 text-amber-300', red: 'border-red-400/25 bg-red-400/10 text-red-300', slate: 'border-border bg-muted/60 text-muted-foreground' };
  return <span className={`inline-flex items-center rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider ${styles[tone]}`}>{children}</span>;
}

export function SectionTitle({ title, detail, action }: { title: string; detail?: string; action?: ReactNode }) {
  return <div className="mb-4 flex items-center justify-between gap-3"><div><h2 className="font-semibold text-foreground">{title}</h2>{detail && <p className="mt-1 text-xs text-muted-foreground">{detail}</p>}</div>{action}</div>;
}
