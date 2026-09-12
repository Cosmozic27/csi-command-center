import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#060b13] flex flex-col items-center justify-center p-6 text-center">
      <div className="p-8 rounded-2xl bg-slate-900/80 border border-red-800/40 max-w-md w-full backdrop-blur-xl shadow-2xl shadow-red-950/20">
        <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="text-xs font-mono text-red-400 uppercase tracking-widest mb-1">
          403 // ACCESS DENIED
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Unauthorized Clearance</h1>
        <p className="text-xs text-slate-400 leading-relaxed mb-6">
          Your current credentials do not possess the required RBAC clearance level to access this team portal or administrative subsystem.
        </p>
        <div className="flex flex-col gap-2">
          <Link
            href="/login"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Switch Active Session
          </Link>
          <Link
            href="/"
            className="w-full py-2.5 px-4 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-mono transition-colors"
          >
            Return to Gateway
          </Link>
        </div>
      </div>
    </div>
  );
}
