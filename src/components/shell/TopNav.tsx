'use client';

import React from 'react';
import { Search, Bell, Menu, ArrowUpRight } from 'lucide-react';
import { useMockSession } from '@/contexts/MockSessionContext';
import { UserAvatar } from '@/components/ui/user-avatar';
import Link from 'next/link';

interface TopNavProps {
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
  onToggleMobileMenu: () => void;
  unreadNotificationsCount: number;
}

export function TopNav({
  onOpenCommandPalette,
  onOpenNotifications,
  onToggleMobileMenu,
  unreadNotificationsCount,
}: TopNavProps) {
  const { currentUser } = useMockSession();

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-border/70 bg-background/80 px-4 md:px-6 backdrop-blur-xl">
      {/* Left: Mobile hamburger + workspace context */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="md:hidden rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <span className="text-sm font-semibold text-foreground">Committee workspace</span>
          <span className="text-xs text-muted-foreground">Plan, coordinate, and deliver together</span>
        </div>
      </div>

      {/* Center: Command Palette Trigger Button */}
      <div className="flex-1 max-w-md mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between rounded-lg border border-border/80 bg-card px-3.5 py-2 text-xs text-muted-foreground hover:border-cyan-500/40 hover:bg-card hover:text-foreground transition-all duration-200 cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <Search className="h-3.5 w-3.5 text-cyan-400" />
            <span>Search tasks, projects, teams...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Notifications, Public Home Link, User Avatar */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/"
          target="_blank"
          className="hidden lg:inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-cyan-300 hover:bg-white/5 transition-colors"
          title="View public landing page"
        >
          <span>Public Portal</span>
          <ArrowUpRight className="h-3 w-3" />
        </Link>

        {/* Notifications button */}
        <button
          onClick={onOpenNotifications}
          className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-slate-950 ring-2 ring-background">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 border-l border-border/60">
          <UserAvatar
            name={currentUser.fullName}
            avatarUrl={currentUser.avatarUrl}
            size="sm"
          />
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-xs font-semibold text-foreground">
              {currentUser.fullName}
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">
              {currentUser.primaryRole}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
