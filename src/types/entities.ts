// ============================================================
// CSI COMMAND CENTER — Frontend Entity Types
// Source of truth for mock data and future API integration.
// When backend is integrated, replace mock data with real API
// calls — these types should remain compatible.
// ============================================================

// ------------------------------------------------------------
// Roles
// ------------------------------------------------------------
export type UserRole =
  | "FACULTY"
  | "CORE"
  | "ADVISORY"
  | "TEAM_LEAD"
  | "TEAM_MEMBER"
  | "GENERAL_MEMBER";

// ------------------------------------------------------------
// User
// ------------------------------------------------------------
export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  initials: string;
  primaryRole: UserRole;
  phone?: string;
  bio?: string;
  skills: string[];
  isActive: boolean;
  joinedAt: string; // ISO date string
  teamMemberships: TeamMembership[];
}

// ------------------------------------------------------------
// Team
// ------------------------------------------------------------
export type TeamSlug =
  | "faculty"
  | "core"
  | "advisory"
  | "graphics"
  | "event-management"
  | "technical"
  | "documentation"
  | "publicity"
  | "general-members";

export interface Team {
  id: string;
  name: string;
  slug: TeamSlug;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind color class
  isActive: boolean;
  memberCount: number;
  activeTasks: number;
  completedTasks: number;
  progressPercentage: number;
  teamLead: Pick<User, "id" | "fullName" | "initials" | "avatarUrl"> | null;
}

export interface TeamMembership {
  teamId: string;
  teamName: string;
  teamSlug: TeamSlug;
  role: UserRole;
  isTeamLead: boolean;
  joinedAt: string;
}

// ------------------------------------------------------------
// Task
// ------------------------------------------------------------
export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "UNDER_REVIEW"
  | "COMPLETED"
  | "BLOCKED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type TaskType =
  | "DESIGN"
  | "DEVELOPMENT"
  | "DOCUMENTATION"
  | "EVENT"
  | "MARKETING"
  | "REVIEW"
  | "GENERAL";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  taskType: TaskType;
  assignedTeamId: string;
  assignedTeamName: string;
  assignedTeamSlug: TeamSlug;
  assignedUserId: string | null;
  assignedUserName: string | null;
  createdById: string;
  projectId: string | null;
  eventId: string | null;
  startDate: string | null;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
  dependsOnTaskIds: string[];
}

// ------------------------------------------------------------
// Project
// ------------------------------------------------------------
export type ProjectStatus =
  | "PLANNING"
  | "ACTIVE"
  | "ON_HOLD"
  | "COMPLETED"
  | "ARCHIVED";

export type ProjectPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  ownerId: string;
  ownerName: string;
  participatingTeams: Pick<Team, "id" | "name" | "slug" | "icon" | "color">[];
  startDate: string;
  endDate: string;
  progressPercentage: number;
  taskCount: number;
  completedTaskCount: number;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------------------------------
// Event
// ------------------------------------------------------------
export type EventStatus =
  | "PLANNING"
  | "UPCOMING"
  | "LIVE"
  | "COMPLETED"
  | "CANCELLED";

export type EventType =
  | "WORKSHOP"
  | "HACKATHON"
  | "SEMINAR"
  | "COMPETITION"
  | "SOCIAL"
  | "MEETING"
  | "OTHER";

export interface Event {
  id: string;
  name: string;
  description: string;
  eventType: EventType;
  venue: string;
  startDatetime: string;
  endDatetime: string;
  eventLeadId: string;
  eventLeadName: string;
  status: EventStatus;
  registrationUrl: string | null;
  participatingTeams: Pick<Team, "id" | "name" | "slug" | "icon" | "color">[];
  projectId: string | null;
  taskCount: number;
  completedTaskCount: number;
  progressPercentage: number;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------------------------------
// Notification
// ------------------------------------------------------------
export type NotificationType =
  | "TASK_ASSIGNED"
  | "TASK_COMPLETED"
  | "TASK_OVERDUE"
  | "DEADLINE_APPROACHING"
  | "WORK_SUBMITTED"
  | "WORK_APPROVED"
  | "WORK_REJECTED"
  | "COMMENT"
  | "MENTION"
  | "PROJECT_UPDATED"
  | "EVENT_CREATED"
  | "DEPENDENCY_COMPLETED"
  | "MEMBER_ADDED"
  | "ANNOUNCEMENT";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  relatedTaskId: string | null;
  relatedProjectId: string | null;
  relatedEventId: string | null;
  createdAt: string;
}

// ------------------------------------------------------------
// Announcement
// ------------------------------------------------------------
export type AnnouncementVisibility =
  | "PUBLIC"
  | "COMMITTEE"
  | "FACULTY"
  | "CORE"
  | "TEAM";

export type AnnouncementPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdById: string;
  createdByName: string;
  visibility: AnnouncementVisibility;
  priority: AnnouncementPriority;
  publishedAt: string;
  expiresAt: string | null;
}

// ------------------------------------------------------------
// Approval
// ------------------------------------------------------------
export type ApprovalStage =
  | "TEAM_REVIEW"
  | "CORE_REVIEW"
  | "FACULTY_REVIEW";

export type ApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CHANGES_REQUESTED";

export interface ApprovalAction {
  id: string;
  approvalId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerRole: UserRole;
  action: "APPROVE" | "REJECT" | "REQUEST_CHANGES";
  comment: string;
  createdAt: string;
}

export interface Approval {
  id: string;
  title: string;
  description: string;
  requestedById: string;
  requestedByName: string;
  currentStage: ApprovalStage;
  status: ApprovalStatus;
  taskId: string | null;
  projectId: string | null;
  fileId: string | null;
  actions: ApprovalAction[];
  submittedAt: string;
  completedAt: string | null;
}

// ------------------------------------------------------------
// Activity Log
// ------------------------------------------------------------
export type ActivityType =
  | "TASK_CREATED"
  | "TASK_UPDATED"
  | "TASK_COMPLETED"
  | "FILE_UPLOADED"
  | "APPROVAL_SUBMITTED"
  | "APPROVAL_APPROVED"
  | "APPROVAL_REJECTED"
  | "PROJECT_UPDATED"
  | "EVENT_CREATED"
  | "MEMBER_JOINED"
  | "ROLE_CHANGED"
  | "ANNOUNCEMENT_POSTED";

export interface ActivityLog {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  actorTeam: string;
  type: ActivityType;
  description: string;
  relatedId: string | null;
  relatedType: "task" | "project" | "event" | "file" | "user" | null;
  createdAt: string;
}

// ------------------------------------------------------------
// Stats (for dashboard widgets)
// ------------------------------------------------------------
export interface OrgStats {
  totalMembers: number;
  activeTeams: number;
  activeProjects: number;
  activeEvents: number;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  pendingApprovals: number;
}
