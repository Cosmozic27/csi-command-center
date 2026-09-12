'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Notification } from '@/types/entities';
import { MOCK_NOTIFICATIONS } from '@/data/mock-notifications';
import { useMockSession } from '@/contexts/MockSessionContext';

export function useNotifications() {
  const { currentUser } = useMockSession();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Filter notifications relevant to current user
  const userNotifications = useMemo(() => {
    return notifications.filter(
      (n) => n.userId === currentUser.id || n.userId === 'usr-core-01'
    );
  }, [notifications, currentUser.id]);

  const unreadCount = useMemo(() => {
    return userNotifications.filter((n) => !n.isRead).length;
  }, [userNotifications]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.userId === currentUser.id || n.userId === 'usr-core-01'
          ? { ...n, isRead: true }
          : n
      )
    );
  }, [currentUser.id]);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications: userNotifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearNotification,
  };
}
