import React from "react";
import Link from "next/link";
import { requireRole } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import type { Team } from "@/types/database.types";
import { 
  ShieldCheck, 
  Layers, 
  ExternalLink, 
  CheckCircle2 
} from "lucide-react";

export default async function CommandCenterPage() {
  // Enforce server-side RBAC guard: Only FACULTY and CORE
  const user = await requireRole(["FACULTY", "CORE"]);
  const supabase = await createClient();

  // Query teams from PostgreSQL
  const { data: rawTeams } = await supabase
    .from("teams")
    .select("*")
    .order("name");

  const teams = rawTeams as Team[] | null;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              EXECUTIVE CLEARANCE
            </span>
            <span className="text-xs text-slate-500 font-mono">
              USER ID // {user.id.slice(0, 8)}...
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Central Command Center
          </h1>
          <p className="text-xs text-slate-400">
            High-level supervision for {user.primaryRole === "FACULTY" ? "Faculty Patron" : "Core Executive Body"}. Full cross-team portal access granted.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" />
            <span>RBAC CLEARANCE: {user.primaryRole}</span>
          </div>
        </div>
      </div>

      {/* Cross-Team Portal Switcher Grid (Phase 1 Access Verification) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Operational Team Portals (Cross-Team Access)
            </h2>
            <p className="text-xs text-slate-400">
              As a {user.primaryRole} member, you have unrestricted clearance to inspect and manage all 9 team portals.
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-lg">
            {teams?.length || 9} TEAMS REGISTERED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams?.map((team) => (
            <Link
              key={team.id}
              href={`/portals/${team.slug}`}
              className="p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                    <Layers className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400/80 group-hover:text-cyan-300 flex items-center gap-1">
                    <span>PORTAL ACCESS</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {team.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {team.description || "Active committee operational division."}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>SLUG: {team.slug}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>PERMITTED</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
