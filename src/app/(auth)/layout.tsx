import React from "react";
import Link from "next/link";
import { Terminal, Shield } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-[#060b13] text-foreground p-4 sm:p-8 overflow-hidden">
      {/* Futuristic Background Glows */}
      <div className="pointer-events-none absolute top-[-20%] left-[25%] w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[-20%] right-[15%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />

      {/* Top Header */}
      <header className="relative z-10 max-w-5xl w-full mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-slate-950 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <Terminal className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-wider text-slate-100 uppercase">CSI Command Center</h1>
            <p className="text-[11px] text-cyan-400 font-mono">AUTHENTICATION GATEWAY</p>
          </div>
        </Link>
        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <Shield className="w-4 h-4 text-cyan-400" />
          <span>SECURE // TLS-256</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 max-w-md w-full mx-auto my-auto py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-5xl w-full mx-auto text-center text-xs text-slate-500 font-mono py-4">
        Computer Society of India © 2026. Authorized personnel only.
      </footer>
    </div>
  );
}
