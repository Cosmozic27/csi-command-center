'use client';

import React from 'react';
import { MockSessionProvider } from '@/contexts/MockSessionContext';
import { AppShell } from '@/components/shell/AppShell';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MockSessionProvider>
      <AppShell>{children}</AppShell>
    </MockSessionProvider>
  );
}
