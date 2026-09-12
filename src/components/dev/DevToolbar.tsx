'use client';

import React, { useState } from 'react';
import { useMockSession } from '@/contexts/MockSessionContext';
import { Sparkles, ChevronUp, ChevronDown, Check } from 'lucide-react';
import { RoleBadge } from '@/components/ui/role-badge';
import { UserAvatar } from '@/components/ui/user-avatar';

export function DevToolbar() {
  const { currentUser, switchUserById, allUsers } = useMockSession();
  const [isOpen, setIsOpen] = useState(false);

  // In production or demo mode, keep it available for committee reviews
  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <div className="w-80 rounded-2xl border border-cyan-500/40 bg-card/95 p-3.5 shadow-2xl shadow-cyan-950/80 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2.5 border-b border-border/80">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                Demo Role Switcher
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
            >
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          <p className="py-2 text-[11px] text-muted-foreground">
            Switch persona to test role-specific dashboards, permissions, and views:
          </p>

          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {allUsers.map((user) => {
              const isSelected = user.id === currentUser.id;
              return (
                <button
                  key={user.id}
                  onClick={() => {
                    switchUserById(user.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all duration-150 text-left cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-500/40 shadow-[0_0_12px_-3px_rgba(0,229,255,0.3)]'
                      : 'bg-card/50 border-border/60 hover:bg-muted/60 hover:border-border'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <UserAvatar name={user.fullName} avatarUrl={user.avatarUrl} size="xs" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {user.fullName}
                      </span>
                      <RoleBadge role={user.primaryRole} size="sm" showIcon={false} />
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-cyan-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full border border-cyan-500/40 bg-card/90 px-3.5 py-2 text-xs font-semibold text-foreground shadow-lg shadow-cyan-950/50 backdrop-blur-lg hover:border-cyan-400 hover:bg-card hover:shadow-[0_0_20px_-3px_rgba(0,229,255,0.4)] transition-all cursor-pointer group"
        >
          <UserAvatar name={currentUser.fullName} avatarUrl={currentUser.avatarUrl} size="xs" />
          <span className="text-cyan-300 font-mono text-[11px] font-bold">
            {currentUser.primaryRole}
          </span>
          <ChevronUp className="h-3.5 w-3.5 text-muted-foreground group-hover:text-cyan-400 transition-colors" />
        </button>
      )}
    </div>
  );
}
