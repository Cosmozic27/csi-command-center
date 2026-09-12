import React from "react";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/session";
import { Shield, Layers, UserCheck, ArrowRight, ExternalLink } from "lucide-react";

export default async function GeneralDashboardPage() {
  const user = await requireAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              OPERATIONAL MEMBER CLEARANCE
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome, {user.fullName}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Role: <span className="font-mono text-cyan-400 font-semibold">{user.primaryRole}</span>. You can view your assigned team workspaces and permitted activities.
          </p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-emerald-400" />
          <span>AUTHENTICATED</span>
        </div>
      </div>

      {/* Assigned Teams Grid */}
      <div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-4">
          Your Permitted Team Workspaces
        </h2>

        {user.memberships.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.memberships.map((membership) => (
              <Link
                key={membership.teamId}
                href={`/portals/${membership.teamSlug}`}
                className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/30 flex items-center justify-center text-cyan-400">
                      <Layers className="w-4 h-4" />
                    </div>
                    {membership.isTeamLead && (
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded">
                        LEAD
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {membership.teamName}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Role in Team: {membership.roleName}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Enter Portal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-slate-900/40 border border-slate-800 text-center">
            <p className="text-xs text-slate-400 font-mono">
              You are not currently assigned to any specific committee team. Contact Faculty or Core administrators to update your team membership.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
