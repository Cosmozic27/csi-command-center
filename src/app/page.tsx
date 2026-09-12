import Link from "next/link";
import { 
  ShieldCheck, 
  Database, 
  GitBranch, 
  Terminal, 
  Cpu, 
  Layers, 
  ArrowRight,
  Sparkles
} from "lucide-react";

export default function Home() {
  const foundationChecks = [
    {
      title: "Architecture & Specification",
      description: "PROJECT_SPEC, ROADMAP, and DATABASE_ARCHITECTURE defined as single source of truth.",
      icon: Layers,
      status: "Ready",
    },
    {
      title: "Next.js 15 + TypeScript",
      description: "App Router initialized with strict type checking and custom path aliases.",
      icon: Cpu,
      status: "Verified",
    },
    {
      title: "Design System & CSS Tokens",
      description: "Futuristic dark palette with glassmorphism, cyan/violet glowing accents.",
      icon: Sparkles,
      status: "Configured",
    },
    {
      title: "Supabase Client Scaffolding",
      description: "SSR-ready browser, server, and middleware clients configured for Phase 1.",
      icon: Database,
      status: "Scaffolded",
    },
    {
      title: "Git & Version Control",
      description: "Repository initialized and linked to Cosmozic27/csi-command-center.",
      icon: GitBranch,
      status: "Connected",
    },
    {
      title: "Security & RBAC Foundation",
      description: "Edge middleware session handler configured for multi-tier authorization.",
      icon: ShieldCheck,
      status: "Structured",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 overflow-hidden bg-[#060b13]">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute top-[-15%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-15%] right-[10%] w-[600px] h-[600px] rounded-full bg-indigo-500/10 blur-[150px]" />

      {/* Top Bar */}
      <header className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between border-b border-slate-800/80 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-black shadow-lg shadow-cyan-500/20">
            <Terminal className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wider text-slate-100 uppercase">CSI Command Center</h1>
            <p className="text-xs text-cyan-400 font-mono">SYSTEM STATUS // PHASE 0 ONLINE</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            PHASE 0 PASSED
          </span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-6xl w-full mx-auto my-auto py-12">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-mono bg-cyan-950/60 text-cyan-300 border border-cyan-800/50 mb-4">
            <span className="text-cyan-400">⚡</span>
            <span>Digital Operating System for College CSI Committee</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            One Committee. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Connected Teams.
            </span> <br />
            Smarter Execution.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
            Phase 0 foundation is established. Ready for Phase 1 Database & Authentication integration according to the development roadmap.
          </p>
        </div>

        {/* Foundation Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {foundationChecks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/5 backdrop-blur-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-200 mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Step Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 to-indigo-950/30 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">Next Milestone</span>
            <h4 className="text-lg font-bold text-white">Phase 1: Database & Authentication</h4>
            <p className="text-xs text-slate-400">
              Users, roles, teams, team_members tables, Supabase Auth, session cookies, and RLS policies.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Ready for review</span>
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400">
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-6xl w-full mx-auto pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono">
        <div>CSI Command Center © 2026. All systems nominal.</div>
        <div className="flex items-center gap-4">
          <span>BRANCH: main</span>
          <span>•</span>
          <span>REPO: Cosmozic27/csi-command-center</span>
        </div>
      </footer>
    </div>
  );
}
