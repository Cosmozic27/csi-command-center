import Link from "next/link";
import {
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  Calendar,
  CheckCircle2,
  Lock,
  Cpu,
  Zap,
  ChevronRight,
} from "lucide-react";
import { MOCK_TEAMS } from "@/data/mock-teams";
import { MOCK_EVENTS } from "@/data/mock-events";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-background cyber-grid">
      {/* Background Cyber Glowing Orbs */}
      <div className="pointer-events-none absolute top-[-10%] left-[25%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-[40%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[160px]" />

      {/* Top Navigation */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-6 py-6 flex items-center justify-between border-b border-border/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-500/30 ring-1 ring-cyan-400/50">
            <Shield className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider text-foreground uppercase">
              CSI Command Center
            </h1>
            <p className="text-[10px] text-cyan-400 font-mono tracking-widest">
              DIGITAL OPERATING SYSTEM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </Link>

          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_-3px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-7xl w-full mx-auto px-6 py-16">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            <span>PHASE 2 FRONTEND SYSTEM ACTIVE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            One Committee. <br />
            <span className="bg-linear-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Connected Teams.
            </span>{" "}
            <br />
            Smarter Execution.
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            The futuristic centralized management and automation platform designed specifically for the College CSI Committee. Connecting 9 teams, real-time rosters, automated cross-team handoffs, and event workflows.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/app/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-linear-to-r from-cyan-400 to-blue-500 hover:shadow-[0_0_25px_-2px_rgba(0,229,255,0.5)] transition-all"
            >
              <span>Explore Interactive Prototype</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/app/teams"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-cyan-300 border border-cyan-500/30 bg-card/60 hover:bg-card hover:border-cyan-500/60 transition-all"
            >
              <Layers className="w-4 h-4" />
              <span>Inspect 9 Team Portals</span>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
          <div className="p-6 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-cyan-500/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mb-4">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-2">Cross-Team Automation</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Automated workflows trigger task assignments and notifications across Graphics, Technical, Publicity, and Event Management without manual friction.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-violet-500/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 mb-4">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-2">6-Tier RBAC Architecture</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Fine-grained access control tailored for Faculty Sponsors, Core Committee, Advisory Board, Team Leads, Members, and General Volunteers.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-emerald-500/30 transition-all">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-2">Real-Time Telemetry</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Instant feedback, active project timelines, unread alerts, and live committee activity streams in a unified futuristic dashboard.
            </p>
          </div>
        </div>

        {/* 9 Operating Teams Section */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Organizational Roster
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                9 Specialized Operating Teams
              </h3>
            </div>
            <Link
              href="/app/teams"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>View Roster Directory</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_TEAMS.map((team) => (
              <div
                key={team.id}
                className="p-5 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md hover:border-cyan-500/30 transition-all group"
              >
                <div className="flex items-start justify-between">
                  <span className="font-bold text-sm text-foreground group-hover:text-cyan-300 transition-colors">
                    {team.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
                    {team.memberCount} members
                  </span>
                </div>
                <p className="text-xs text-cyan-400/80 font-mono mt-1">
                  Lead: {team.leadName || team.teamLead?.fullName || 'Assigned'}
                </p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                  {team.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Flagship Events Section */}
        <div className="mt-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                Event Horizon
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-foreground mt-1">
                Upcoming Flagship Events
              </h3>
            </div>
            <Link
              href="/app/events"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
            >
              <span>Full Calendar</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {MOCK_EVENTS.map((event) => (
              <div
                key={event.id}
                className="p-5 rounded-xl border border-border/80 bg-card/70 backdrop-blur-md hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 mb-2">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(event.startDatetime).toLocaleDateString()}</span>
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{event.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
                    {event.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>{event.venue}</span>
                  <span className="text-cyan-300">{event.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action card */}
        <div className="mt-24 p-8 rounded-2xl border border-cyan-500/30 bg-linear-to-r from-card/90 via-cyan-950/20 to-card/90 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-cyan-950/40">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground">
              Ready to experience the CSI Command Center?
            </h3>
            <p className="text-xs text-muted-foreground">
              Explore the live prototype with demo persona switching across all 6 roles.
            </p>
          </div>
          <Link
            href="/app/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-[0_0_20px_-3px_rgba(0,229,255,0.4)] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>Launch Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto px-6 py-8 border-t border-border/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
        <div>CSI Command Center © 2026 • Digital Operating System</div>
        <div className="flex items-center gap-4">
          <span>BRANCH: main</span>
          <span>•</span>
          <span>REPO: Cosmozic27/csi-command-center</span>
        </div>
      </footer>
    </div>
  );
}
