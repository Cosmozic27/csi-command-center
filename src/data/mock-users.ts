import type { User } from "@/types/entities";

// ============================================================
// MOCK USERS — One per role for demo/review purposes
// Replace with real Supabase Auth + public.users queries
// when backend integration begins.
// ============================================================

export const MOCK_USERS: User[] = [
  {
    id: "usr-faculty-01",
    fullName: "Dr. Priya Sharma",
    email: "priya.sharma@college.edu",
    avatarUrl: null,
    initials: "PS",
    primaryRole: "FACULTY",
    phone: "+91 98765 43210",
    bio: "Faculty Advisor for the CSI Committee. Professor of Computer Science with 15 years of academic experience.",
    skills: ["Leadership", "Research", "Mentorship", "Project Management"],
    isActive: true,
    joinedAt: "2023-07-01T00:00:00Z",
    teamMemberships: [
      {
        teamId: "team-faculty",
        teamName: "Faculty Team",
        teamSlug: "faculty",
        role: "FACULTY",
        isTeamLead: true,
        joinedAt: "2023-07-01T00:00:00Z",
      },
    ],
  },
  {
    id: "usr-core-01",
    fullName: "Arjun Mehta",
    email: "arjun.mehta@csi.college.edu",
    avatarUrl: null,
    initials: "AM",
    primaryRole: "CORE",
    phone: "+91 87654 32109",
    bio: "Core Committee President. Final year CSE student with a passion for building systems and leading teams.",
    skills: [
      "Leadership",
      "Communication",
      "Event Management",
      "Strategy",
    ],
    isActive: true,
    joinedAt: "2023-08-01T00:00:00Z",
    teamMemberships: [
      {
        teamId: "team-core",
        teamName: "Core Team",
        teamSlug: "core",
        role: "CORE",
        isTeamLead: true,
        joinedAt: "2023-08-01T00:00:00Z",
      },
    ],
  },
  {
    id: "usr-advisory-01",
    fullName: "Sneha Iyer",
    email: "sneha.iyer@csi.college.edu",
    avatarUrl: null,
    initials: "SI",
    primaryRole: "ADVISORY",
    phone: "+91 76543 21098",
    bio: "Senior Advisory Member and CSI Alumni. Provides strategic guidance on technical initiatives.",
    skills: ["Advisory", "Feedback", "Project Review", "Mentorship"],
    isActive: true,
    joinedAt: "2023-08-15T00:00:00Z",
    teamMemberships: [
      {
        teamId: "team-advisory",
        teamName: "Advisory Team",
        teamSlug: "advisory",
        role: "ADVISORY",
        isTeamLead: false,
        joinedAt: "2023-08-15T00:00:00Z",
      },
    ],
  },
  {
    id: "usr-graphics-lead-01",
    fullName: "Rahul Verma",
    email: "rahul.verma@csi.college.edu",
    avatarUrl: null,
    initials: "RV",
    primaryRole: "TEAM_LEAD",
    phone: "+91 65432 10987",
    bio: "Graphics Team Lead. Specializes in UI/UX design, poster design, and brand identity.",
    skills: ["Figma", "Illustrator", "Photoshop", "Brand Design", "Motion Graphics"],
    isActive: true,
    joinedAt: "2023-09-01T00:00:00Z",
    teamMemberships: [
      {
        teamId: "team-graphics",
        teamName: "Graphics Team",
        teamSlug: "graphics",
        role: "TEAM_LEAD",
        isTeamLead: true,
        joinedAt: "2023-09-01T00:00:00Z",
      },
    ],
  },
  {
    id: "usr-tech-member-01",
    fullName: "Ananya Krishnan",
    email: "ananya.krishnan@csi.college.edu",
    avatarUrl: null,
    initials: "AK",
    primaryRole: "TEAM_MEMBER",
    phone: "+91 54321 09876",
    bio: "Technical Team Developer. Working on web projects and hackathon systems.",
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "Docker"],
    isActive: true,
    joinedAt: "2023-09-10T00:00:00Z",
    teamMemberships: [
      {
        teamId: "team-technical",
        teamName: "Technical Team",
        teamSlug: "technical",
        role: "TEAM_MEMBER",
        isTeamLead: false,
        joinedAt: "2023-09-10T00:00:00Z",
      },
    ],
  },
  {
    id: "usr-general-01",
    fullName: "Vikram Patel",
    email: "vikram.patel@csi.college.edu",
    avatarUrl: null,
    initials: "VP",
    primaryRole: "GENERAL_MEMBER",
    bio: "Second year student interested in joining the technical or graphics team.",
    skills: ["Python", "HTML", "CSS"],
    isActive: true,
    joinedAt: "2024-07-15T00:00:00Z",
    teamMemberships: [
      {
        teamId: "team-general-members",
        teamName: "General Members",
        teamSlug: "general-members",
        role: "GENERAL_MEMBER",
        isTeamLead: false,
        joinedAt: "2024-07-15T00:00:00Z",
      },
    ],
  },
];

// Additional members for team rosters
export const MOCK_TEAM_MEMBERS_EXTENDED: Partial<User>[] = [
  { id: "usr-tech-lead-01", fullName: "Karan Shah", initials: "KS", primaryRole: "TEAM_LEAD", teamMemberships: [{ teamId: "team-technical", teamName: "Technical Team", teamSlug: "technical", role: "TEAM_LEAD", isTeamLead: true, joinedAt: "2023-09-01T00:00:00Z" }] },
  { id: "usr-event-lead-01", fullName: "Meera Nair", initials: "MN", primaryRole: "TEAM_LEAD", teamMemberships: [{ teamId: "team-event-management", teamName: "Event Management Team", teamSlug: "event-management", role: "TEAM_LEAD", isTeamLead: true, joinedAt: "2023-09-01T00:00:00Z" }] },
  { id: "usr-pub-lead-01", fullName: "Rohit Das", initials: "RD", primaryRole: "TEAM_LEAD", teamMemberships: [{ teamId: "team-publicity", teamName: "Publicity Team", teamSlug: "publicity", role: "TEAM_LEAD", isTeamLead: true, joinedAt: "2023-09-01T00:00:00Z" }] },
  { id: "usr-doc-lead-01", fullName: "Preethi Rajan", initials: "PR", primaryRole: "TEAM_LEAD", teamMemberships: [{ teamId: "team-documentation", teamName: "Documentation Team", teamSlug: "documentation", role: "TEAM_LEAD", isTeamLead: true, joinedAt: "2023-09-01T00:00:00Z" }] },
];

export const DEFAULT_DEMO_USER = MOCK_USERS[0]; // Faculty by default
