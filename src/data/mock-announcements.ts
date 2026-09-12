import type { Announcement } from "@/types/entities";

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "All-Hands Committee Meeting for TechFest 2026",
    content: "Mandatory hybrid sync for all 9 teams on Friday at 5:00 PM in Seminar Hall 2. Team leads must bring updated sprint roadmaps and cross-team dependencies.",
    createdById: "usr-core-01",
    createdByName: "Arjun Mehta",
    visibility: "COMMITTEE",
    priority: "HIGH",
    publishedAt: "2026-09-12T08:00:00Z",
    expiresAt: "2026-09-18T23:59:59Z",
  },
  {
    id: "ann-002",
    title: "Institutional Grant Approved for AI Hackathon",
    content: "The college academic council and faculty sponsor have approved the institutional seed grant of ₹50,000 for server infrastructure and AWS student credits.",
    createdById: "usr-faculty-01",
    createdByName: "Dr. Priya Sharma",
    visibility: "PUBLIC",
    priority: "NORMAL",
    publishedAt: "2026-09-11T12:00:00Z",
    expiresAt: null,
  },
  {
    id: "ann-003",
    title: "Volunteer Registrations Open for TechFest Ops",
    content: "General members can now register to assist with venue management, participant kit distribution, and audio-visual setup during TechFest.",
    createdById: "usr-core-01",
    createdByName: "Arjun Mehta",
    visibility: "PUBLIC",
    priority: "NORMAL",
    publishedAt: "2026-09-10T15:30:00Z",
    expiresAt: "2026-10-01T23:59:59Z",
  },
];
