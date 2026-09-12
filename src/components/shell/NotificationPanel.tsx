'use client';

import React from 'react';
import {
  X,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  AlertCircle,
  FileCheck,
  MessageSquare,
  AtSign,
  FolderKanban,
  Calendar,
  UserPlus,
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import type { NotificationType } from '@/types/entities';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const typeIconMap: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  TASK_ASSIGNED: { icon: FileCheck, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  TASK_COMPLETED: { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  TASK_OVERDUE: { icon: AlertCircle, color: 'text-red-400 bg-red-500/10 border-red-500/30' },
  DEADLINE_APPROACHING: { icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  APPROVAL_SUBMITTED: { icon: Info, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  WORK_SUBMITTED: { icon: Info, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  WORK_APPROVED: { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  WORK_REJECTED: { icon: AlertCircle, color: 'text-red-400 bg-red-500/10 border-red-500/30' },
  COMMENT: { icon: MessageSquare, color: 'text-slate-400 bg-slate-500/10 border-slate-500/30' },
  MENTION: { icon: AtSign, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
  PROJECT_UPDATED: { icon: FolderKanban, color: 'text-violet-400 bg-violet-500/10 border-violet-500/30' },
  EVENT_CREATED: { icon: Calendar, color: 'text-blue-400 bg-blue-500/10 border-blue-500/30' },
  DEPENDENCY_COMPLETED: { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
  MEMBER_ADDED: { icon: UserPlus, color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30' },
  ANNOUNCEMENT: { icon: Bell, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
};

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Flyout panel */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-card/95 border-l border-border/80 shadow-2xl backdrop-blur-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/80">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-cyan-400" />
            <span className="font-semibold text-sm text-foreground">Notifications</span>
            {unreadCount > 0 && (
              <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300 font-bold border border-cyan-500/30">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-cyan-400 hover:text-cyan-300 px-2 py-1 rounded transition-colors cursor-pointer"
                title="Mark all as read"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((n) => {
              const typeCfg = typeIconMap[n.type] || {
                icon: Info,
                color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
              };
              const Icon = typeCfg.icon;

              return (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={`relative flex gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    n.isRead
                      ? 'bg-card/40 border-border/50 opacity-75'
                      : 'bg-cyan-500/5 border-cyan-500/25 shadow-[0_0_15px_-5px_rgba(0,229,255,0.15)]'
                  } hover:bg-cyan-500/10`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${typeCfg.color}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-1">
                      <span className="text-xs font-semibold text-foreground truncate">
                        {n.title}
                      </span>
                      {!n.isRead && (
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                      {n.message}
                    </p>
                    <span className="mt-1.5 block text-[10px] text-slate-500 font-mono">
                      {new Date(n.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
