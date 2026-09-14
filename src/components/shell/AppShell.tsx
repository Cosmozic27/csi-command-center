'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { MobileNav } from './MobileNav';
import { CommandPalette } from './CommandPalette';
import { NotificationPanel } from './NotificationPanel';
import { DevToolbar } from '@/components/dev/DevToolbar';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { useNotifications } from '@/hooks/useNotifications';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isOpen: isCmdOpen, open: openCmd, close: closeCmd } = useCommandPalette();
  const { unreadCount } = useNotifications();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav
          onOpenCommandPalette={openCmd}
          onOpenNotifications={() => setIsNotifOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(true)}
          unreadNotificationsCount={unreadCount}
        />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>

      {/* Mobile Nav & Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Command Palette (Ctrl+K) */}
      <CommandPalette isOpen={isCmdOpen} onClose={closeCmd} />

      {/* Notification Drawer */}
      <NotificationPanel
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />

      {/* Dev Persona Switcher Toolbar */}
      <DevToolbar />
    </div>
  );
}
