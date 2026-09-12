import type { Notification } from "@/types/entities";

// ============================================================
// MOCK NOTIFICATIONS — Realistic notifications for demo users
// ============================================================

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-001",
    userId: "usr-faculty-01",
    title: "Approval Required",
    message: "TechFest 2026 budget proposal is awaiting your approval.",
    type: "APPROVAL_SUBMITTED",
    isRead: false,
    relatedTaskId: null,
    relatedProjectId: "proj-techfest-2026",
    relatedEventId: null,
    createdAt: "2026-09-12T08:30:00Z",
  },
  {
    id: "notif-002",
    userId: "usr-faculty-01",
    title: "Task Overdue",
    message: "Hackathon speaker confirmation is 2 days overdue.",
    type: "TASK_OVERDUE",
    isRead: false,
    relatedTaskId: "task-009",
    relatedProjectId: null,
    relatedEventId: "evt-hackathon-2026",
    createdAt: "2026-09-12T07:00:00Z",
  },
  {
    id: "notif-003",
    userId: "usr-faculty-01",
    title: "Project Milestone Reached",
    message: "AI Workshop Series has been marked as completed. 14/14 tasks done.",
    type: "PROJECT_UPDATED",
    isRead: true,
    relatedTaskId: null,
    relatedProjectId: "proj-ai-workshop",
    relatedEventId: null,
    createdAt: "2026-09-10T18:00:00Z",
  },
  // Core user notifications
  {
    id: "notif-004",
    userId: "usr-core-01",
    title: "New Task Review",
    message: "TechFest webpage is now under review. Please check and approve.",
    type: "WORK_SUBMITTED",
    isRead: false,
    relatedTaskId: "task-005",
    relatedProjectId: "proj-techfest-2026",
    relatedEventId: null,
    createdAt: "2026-09-11T16:30:00Z",
  },
  {
    id: "notif-005",
    userId: "usr-core-01",
    title: "Blocked Task Alert",
    message: "Speaker coordination task is blocked. Waiting on venue confirmation.",
    type: "TASK_OVERDUE",
    isRead: false,
    relatedTaskId: "task-009",
    relatedProjectId: null,
    relatedEventId: "evt-techfest-2026",
    createdAt: "2026-09-12T09:00:00Z",
  },
  // Graphics Lead notifications
  {
    id: "notif-006",
    userId: "usr-graphics-lead-01",
    title: "Task Assigned",
    message: "You have been assigned: Design TechFest 2026 Event Poster.",
    type: "TASK_ASSIGNED",
    isRead: true,
    relatedTaskId: "task-001",
    relatedProjectId: "proj-techfest-2026",
    relatedEventId: null,
    createdAt: "2026-09-08T10:30:00Z",
  },
  {
    id: "notif-007",
    userId: "usr-graphics-lead-01",
    title: "Deadline Approaching",
    message: "TechFest Poster is due in 8 days. Current status: In Progress.",
    type: "DEADLINE_APPROACHING",
    isRead: false,
    relatedTaskId: "task-001",
    relatedProjectId: null,
    relatedEventId: null,
    createdAt: "2026-09-12T09:00:00Z",
  },
  // Tech member notifications
  {
    id: "notif-008",
    userId: "usr-tech-member-01",
    title: "Task Under Review",
    message: "Your TechFest webpage submission is being reviewed by the Core team.",
    type: "WORK_SUBMITTED",
    isRead: false,
    relatedTaskId: "task-005",
    relatedProjectId: "proj-techfest-2026",
    relatedEventId: null,
    createdAt: "2026-09-11T16:00:00Z",
  },
  {
    id: "notif-009",
    userId: "usr-tech-member-01",
    title: "Task Completed",
    message: "AI Workshop resources portal deployment marked as complete.",
    type: "TASK_COMPLETED",
    isRead: true,
    relatedTaskId: "task-006",
    relatedProjectId: null,
    relatedEventId: "evt-ai-workshop",
    createdAt: "2026-09-04T18:30:00Z",
  },
];

export function getNotificationsForUser(userId: string): Notification[] {
  return MOCK_NOTIFICATIONS.filter((n) => n.userId === userId);
}

export function getUnreadCount(userId: string): number {
  return MOCK_NOTIFICATIONS.filter((n) => n.userId === userId && !n.isRead).length;
}
