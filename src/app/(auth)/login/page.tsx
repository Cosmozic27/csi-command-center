"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn } from "@/lib/auth/actions";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  KeyRound,
  UserCheck
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const demoAccounts = [
    { role: "FACULTY", email: "faculty@csi.college.edu", label: "Faculty Patron" },
    { role: "CORE", email: "core@csi.college.edu", label: "Core Lead" },
    { role: "ADVISORY", email: "advisory@csi.college.edu", label: "Senior Advisor" },
    { role: "TEAM_LEAD", email: "graphics.lead@csi.college.edu", label: "Graphics Lead" },
    { role: "TEAM_MEMBER", email: "tech.member@csi.college.edu", label: "Technical Dev" },
    { role: "GENERAL_MEMBER", email: "general.member@csi.college.edu", label: "General Member" },
  ];

  const handleSelectDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("DemoPassword2026!");
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const res = await signIn(null, formData);
      if (res && !res.success) {
        setErrorMessage(res.error || "Authentication failed. Please verify credentials.");
      }
    } catch (err: any) {
      // Next.js redirect throws NEXT_REDIRECT which is normal
      if (err?.message && !err.message.includes("NEXT_REDIRECT")) {
        setErrorMessage(err.message || "An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Login Card */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl shadow-cyan-950/20">
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 mb-3 shadow-lg shadow-cyan-500/10">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight text-white">Access Command Center</h2>
          <p className="text-xs text-slate-400 mt-1">
            Authenticate your committee credentials to proceed
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@csi.college.edu"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-cyan-400/80 hover:text-cyan-300 cursor-pointer">
                Forgot key?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 font-bold text-sm tracking-wider uppercase hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 disabled:opacity-50 cursor-pointer mt-2"
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Authenticate Session</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-800/80 text-center">
          <p className="text-xs text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4">
              Register as Member
            </Link>
          </p>
        </div>
      </div>

      {/* Demo Role Selector for Phase 1 Testing */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
        <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-400">
          <UserCheck className="w-4 h-4" />
          <span>PHASE 1 RBAC TEST MATRIX (CLICK TO FILL)</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {demoAccounts.map((account) => (
            <button
              key={account.role}
              type="button"
              onClick={() => handleSelectDemo(account.email)}
              className="text-left p-2 rounded-lg bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-cyan-500/30 transition-all text-xs"
            >
              <div className="font-mono text-[10px] text-cyan-400 font-bold">{account.role}</div>
              <div className="text-slate-300 truncate text-[11px]">{account.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
