import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { signOutAction } from "@/lib/auth/actions";
import { Terminal, Shield, LogOut, User, Cpu } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // If unauthenticated, redirect to login
  if (!user) {
    redirect("/login");
  }

  const roleColors: Record<string, string> = {
    FACULTY: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    CORE: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    ADVISORY: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    TEAM_LEAD: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    TEAM_MEMBER: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    GENERAL_MEMBER: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  };

  const badgeClass = roleColors[user.primaryRole] || roleColors.GENERAL_MEMBER;

  return (
    <div className="min-h-screen bg-[#060b13] text-foreground flex flex-col">
      {/* Top Command Bar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-slate-950 shadow-md shadow-cyan-500/10 group-hover:scale-105 transition-transform">
              <Terminal className="w-4 h-4 text-slate-950" />
            </div>
            <span className="text-sm font-bold tracking-wider text-slate-200 uppercase hidden sm:inline">
              CSI Command Center
            </span>
          </Link>

          <span className="text-slate-700">|</span>

          {/* User Role Pill */}
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono border ${badgeClass}`}>
            {user.primaryRole}
          </span>
        </div>

        {/* User Session Info & Logout */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-200">{user.fullName}</span>
            <span className="text-[10px] text-slate-500 font-mono">{user.email}</span>
          </div>

          <form action={signOutAction}>
            <button
              type="submit"
              className="py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-red-950/40 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-800/40 text-xs font-mono transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
}
