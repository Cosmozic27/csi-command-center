import type { ActivityLog, User, Team, Project, Event } from '@/types/entities';

export type WorkspaceFile = {
  id: string;
  name: string;
  type: 'PDF' | 'IMAGE' | 'CODE' | 'DOC';
  size: string;
  version: number;
  team: string;
  project: string;
  status: 'APPROVED' | 'IN REVIEW' | 'DRAFT';
  updatedAt: string;
};

export type CalendarEntry = {
  id: string;
  title: string;
  type: 'EVENT' | 'DEADLINE' | 'MEETING' | 'MILESTONE';
  date: string;
  time: string;
  team: string;
  detail: string;
};

export const MOCK_WORKSPACE_FILES: WorkspaceFile[] = [
  { id: 'file-1', name: 'TechFest sponsorship brochure.pdf', type: 'PDF', size: '4.2 MB', version: 2, team: 'Publicity', project: 'CSI TechFest 2026', status: 'APPROVED', updatedAt: '2 hours ago' },
  { id: 'file-2', name: 'Hackathon rulebook.docx', type: 'DOC', size: '1.8 MB', version: 1, team: 'Documentation', project: 'National Hackathon 2026', status: 'IN REVIEW', updatedAt: 'Yesterday' },
  { id: 'file-3', name: 'TechFest hero banner.png', type: 'IMAGE', size: '12.4 MB', version: 3, team: 'Graphics', project: 'CSI TechFest 2026', status: 'IN REVIEW', updatedAt: 'Yesterday' },
  { id: 'file-4', name: 'registration-schema.sql', type: 'CODE', size: '45 KB', version: 1, team: 'Technical', project: 'National Hackathon 2026', status: 'DRAFT', updatedAt: '2 days ago' },
  { id: 'file-5', name: 'AI Workshop minutes.pdf', type: 'PDF', size: '820 KB', version: 4, team: 'Documentation', project: 'AI Workshop Series', status: 'APPROVED', updatedAt: '3 days ago' },
  { id: 'file-6', name: 'CSI logo pack.zip', type: 'IMAGE', size: '8.1 MB', version: 1, team: 'Graphics', project: 'CSI TechFest 2026', status: 'APPROVED', updatedAt: 'Last week' },
];

export const MOCK_CALENDAR_ENTRIES: CalendarEntry[] = [
  { id: 'cal-1', title: 'CSI TechFest 2026', type: 'EVENT', date: '2026-10-18', time: '09:00', team: 'Event Management', detail: 'Main auditorium · 400 seats' },
  { id: 'cal-2', title: 'Registration flow freeze', type: 'DEADLINE', date: '2026-10-08', time: '18:00', team: 'Technical', detail: 'Registration and payments release' },
  { id: 'cal-3', title: 'Core + team leads sync', type: 'MEETING', date: '2026-10-05', time: '17:30', team: 'Core', detail: 'Weekly operating review' },
  { id: 'cal-4', title: 'Hackathon launch campaign', type: 'MILESTONE', date: '2026-10-12', time: '10:00', team: 'Publicity', detail: 'All channels live' },
  { id: 'cal-5', title: 'AI Workshop Series', type: 'EVENT', date: '2026-10-28', time: '14:00', team: 'Technical', detail: 'Seminar hall B' },
  { id: 'cal-6', title: 'TechFest final report', type: 'DEADLINE', date: '2026-10-25', time: '20:00', team: 'Documentation', detail: 'Publish event outcomes' },
];

export const MOCK_MEMBERS: Array<User & { team: string; workload: number; status: 'ACTIVE' | 'AWAY' }> = [
  { id: 'member-1', fullName: 'Dr. Priya Sharma', email: 'priya@csi.edu', avatarUrl: null, initials: 'PS', primaryRole: 'FACULTY', skills: ['Mentorship', 'Strategy'], isActive: true, joinedAt: '2024-06-01', teamMemberships: [], team: 'Faculty Team', workload: 4, status: 'ACTIVE' },
  { id: 'member-2', fullName: 'Arjun Mehta', email: 'arjun@csi.edu', avatarUrl: null, initials: 'AM', primaryRole: 'CORE', skills: ['Operations', 'Planning'], isActive: true, joinedAt: '2024-07-12', teamMemberships: [], team: 'Core Team', workload: 11, status: 'ACTIVE' },
  { id: 'member-3', fullName: 'Riya Kapoor', email: 'riya@csi.edu', avatarUrl: null, initials: 'RK', primaryRole: 'TEAM_LEAD', skills: ['Brand Design', 'Figma'], isActive: true, joinedAt: '2025-01-10', teamMemberships: [], team: 'Graphics Team', workload: 7, status: 'ACTIVE' },
  { id: 'member-4', fullName: 'Kabir Nair', email: 'kabir@csi.edu', avatarUrl: null, initials: 'KN', primaryRole: 'TEAM_LEAD', skills: ['React', 'DevOps', 'Testing'], isActive: true, joinedAt: '2024-09-04', teamMemberships: [], team: 'Technical Team', workload: 9, status: 'ACTIVE' },
  { id: 'member-5', fullName: 'Ananya Iyer', email: 'ananya@csi.edu', avatarUrl: null, initials: 'AI', primaryRole: 'TEAM_MEMBER', skills: ['Copywriting', 'Social Media'], isActive: true, joinedAt: '2025-02-14', teamMemberships: [], team: 'Publicity Team', workload: 5, status: 'AWAY' },
  { id: 'member-6', fullName: 'Dev Malhotra', email: 'dev@csi.edu', avatarUrl: null, initials: 'DM', primaryRole: 'TEAM_MEMBER', skills: ['Reports', 'Documentation'], isActive: true, joinedAt: '2025-03-18', teamMemberships: [], team: 'Documentation Team', workload: 3, status: 'ACTIVE' },
];

export const MOCK_COMMENTS = [
  { id: 'comment-1', author: 'Riya Kapoor', initials: 'RK', text: 'V3 is ready for core review. I incorporated the accessibility notes from the last handoff.', time: '18 min ago', replies: 2 },
  { id: 'comment-2', author: 'Kabir Nair', initials: 'KN', text: '@Graphics Team the final dimensions are now available in the technical brief.', time: '1 hour ago', replies: 0 },
];

export const MOCK_ACTIVITY_LOG: ActivityLog[] = [
  { id: 'activity-1', actorId: 'member-3', actorName: 'Riya Kapoor', actorRole: 'TEAM_LEAD', actorTeam: 'Graphics Team', type: 'FILE_UPLOADED', targetName: 'TechFest hero banner.png', description: 'uploaded version 3 for review', relatedId: 'file-3', relatedType: 'file', createdAt: '2026-09-14T18:00:00Z', timestamp: '18 min ago' },
  { id: 'activity-2', actorId: 'member-4', actorName: 'Kabir Nair', actorRole: 'TEAM_LEAD', actorTeam: 'Technical Team', type: 'TASK_COMPLETED', targetName: 'Registration flow', description: 'completed a workflow task', relatedId: 'task-4', relatedType: 'task', createdAt: '2026-09-14T17:00:00Z', timestamp: '1 hour ago' },
  { id: 'activity-3', actorId: 'member-2', actorName: 'Arjun Mehta', actorRole: 'CORE', actorTeam: 'Core Team', type: 'PROJECT_UPDATED', targetName: 'National Hackathon 2026', description: 'updated project progress to 68%', relatedId: 'project-2', relatedType: 'project', createdAt: '2026-09-14T14:00:00Z', timestamp: '4 hours ago' },
  { id: 'activity-4', actorId: 'member-1', actorName: 'Dr. Priya Sharma', actorRole: 'FACULTY', actorTeam: 'Faculty Team', type: 'APPROVAL_APPROVED', targetName: 'AI Workshop minutes', description: 'approved a documentation submission', relatedId: 'file-5', relatedType: 'file', createdAt: '2026-09-13T12:00:00Z', timestamp: 'Yesterday' },
  { id: 'activity-5', actorId: 'member-5', actorName: 'Ananya Iyer', actorRole: 'TEAM_MEMBER', actorTeam: 'Publicity Team', type: 'TASK_CREATED', targetName: 'Launch countdown copy', description: 'created a new task', relatedId: 'task-8', relatedType: 'task', createdAt: '2026-09-12T12:00:00Z', timestamp: '2 days ago' },
];

export const WORKFLOW_STEPS = [
  { team: 'Event Management', task: 'Confirm event brief', status: 'COMPLETED', owner: 'Event Management' },
  { team: 'Technical', task: 'Ship registration experience', status: 'IN PROGRESS', owner: 'Technical' },
  { team: 'Graphics', task: 'Approve hero creative V3', status: 'UNDER REVIEW', owner: 'Graphics' },
  { team: 'Publicity', task: 'Launch campaign', status: 'BLOCKED', owner: 'Publicity' },
  { team: 'Documentation', task: 'Prepare final report template', status: 'TODO', owner: 'Documentation' },
];

export const ANALYTICS = {
  taskHealth: [
    { label: 'Completed', value: 42, color: 'bg-emerald-400' },
    { label: 'In progress', value: 18, color: 'bg-cyan-400' },
    { label: 'Under review', value: 9, color: 'bg-violet-400' },
    { label: 'Blocked', value: 4, color: 'bg-red-400' },
  ],
  teamLoad: [
    { label: 'Technical', value: 82 }, { label: 'Graphics', value: 68 }, { label: 'Publicity', value: 54 }, { label: 'Events', value: 47 }, { label: 'Docs', value: 36 },
  ],
};

export type WorkspaceReference = { projects: Project[]; events: Event[]; teams: Team[] };
