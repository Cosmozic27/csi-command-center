'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Calendar,
  FolderKanban,
  X,
  FileText,
  BarChart3,
  Shield,
} from 'lucide-react';
import { useMockSession } from '@/contexts/MockSessionContext';
import { UserAvatar } from '@/components/ui/user-avatar';
import { RoleBadge } from '@/components/ui/role-badge';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const { currentUser } = useMockSession();

  const primaryLinks = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Teams', href: '/app/teams', icon: Users },
    { name: 'Tasks', href: '/app/tasks', icon: CheckSquare },
    { name: 'Events', href: '/app/events', icon: Calendar },
  ];

  const allLinks = [
    { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Teams & Rosters', href: '/app/teams', icon: Users },
    { name: 'Projects', href: '/app/projects', icon: FolderKanban },
    { name: 'Events', href: '/app/events', icon: Calendar },
    { name: 'Tasks & Board', href: '/app/tasks', icon: CheckSquare },
    { name: 'Media & Files', href: '/app/files', icon: FileText },
    { name: 'Calendar', href: '/app/calendar', icon: Calendar },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  ];

  return (
    <>
      {/* Slide-out Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border p-4 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500 text-slate-950 font-bold">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="font-bold text-sm tracking-wider uppercase">CSI Command</span>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-4 space-y-1">
                {allLinks.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-border/60">
              <div className="flex items-center gap-3">
                <UserAvatar name={currentUser.fullName} avatarUrl={currentUser.avatarUrl} size="sm" />
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-foreground truncate">
                    {currentUser.fullName}
                  </span>
                  <RoleBadge role={currentUser.primaryRole} size="sm" showIcon={false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom Tab Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-14 border-t border-border/80 bg-card/90 backdrop-blur-xl px-2 flex items-center justify-around">
        {primaryLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-lg transition-colors ${
                isActive ? 'text-cyan-400' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px] font-medium">{link.name}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
