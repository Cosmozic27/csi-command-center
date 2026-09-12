import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/session";
import { canAccessTeamPortal, canManageTeam } from "@/lib/auth/permissions";
import { createClient } from "@/lib/supabase/server";
import type { Team } from "@/types/database.types";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Users, 
  CheckCircle2 
} from "lucide-react";

interface TeamPortalProps {
  params: Promise<{
    teamSlug: string;
  }>;
}

export default async function TeamPortalPage({ params }: TeamPortalProps) {
  const { teamSlug } = await params;
  const user = await requireAuth();

  // Server-side RBAC verification: Check if user has clearance for this team portal
  const hasAccess = canAccessTeamPortal(user, teamSlug);
  if (!hasAccess) {
    redirect("/unauthorized");
  }

  const isLeadOrSuper = canManageTeam(user, teamSlug);

  const supabase = await createClient();

  // Fetch team info
  const { data: rawTeam } = await supabase
    .from("teams")
    .select("*")
    .eq("slug", teamSlug)
    .single();

  const team = rawTeam as Team | null;

  if (!team) {
    notFound();
  }

  // Fetch team members with profile and role details
  const { data: rawMembers } = await supabase
    .from("team_members")
    .select(`
      id,
      is_team_lead,
      joined_at,
      users:user_id ( id, full_name, email, skills ),
      roles:role_id ( name )
    `)
    .eq("team_id", team.id)
    .eq("is_active", true);

  const teamMembers = rawMembers as any[] | null;

  return (
    <div className="space-y-8">
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href={user.primaryRole === "FACULTY" || user.primaryRole === "CORE" ? "/command-center" : "/dashboard"}
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO DASHBOARD</span>
        </Link>
      </div>

      {/* Team Portal Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-indigo-950/40 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase">
              {team.slug} // TEAM PORTAL
            </span>
            {isLeadOrSuper && (
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                LEAD MANAGEMENT CLEARANCE
              </span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{team.name}</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            {team.description || "Operational team workspace under CSI Committee."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>SESSION: {user.primaryRole}</span>
          </div>
        </div>
      </div>

      {/* Team Members Roster (Phase 1 Database Join & RLS Verification) */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Registered Team Personnel
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {teamMembers?.length || 0} MEMBERS ACTIVE
          </span>
        </div>

        <div className="divide-y divide-slate-800/60">
          {teamMembers && teamMembers.length > 0 ? (
            teamMembers.map((tm: any) => (
              <div key={tm.id} className="py-3.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-200">
                      {tm.users?.full_name || "Member"}
                    </span>
                    {tm.is_team_lead && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                        TEAM LEAD
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-slate-500">{tm.users?.email}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                    {tm.roles?.name || "MEMBER"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 font-mono">
              No personnel directly assigned to this team in initial seed.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
