import type { TeamSlug } from "@/types/entities";

export interface TeamFeatureConfig {
  slug: TeamSlug;
  headline: string;
  tagline: string;
  primaryMetricLabel: string;
  primaryMetricValue: string;
  secondaryMetricLabel: string;
  secondaryMetricValue: string;
  customSectionTitle: string;
  customSectionSubtitle: string;
  highlights: { title: string; subtitle: string; tag: string; value: string }[];
  toolsAndLinks: { name: string; type: string; url: string; status: string }[];
}

export const TEAM_CONFIGS: Record<TeamSlug, TeamFeatureConfig> = {
  graphics: {
    slug: "graphics",
    headline: "Creative Direction & Brand Asset Pipeline",
    tagline: "High-fidelity posters, social banners, vector brand packages, and animated promo reels.",
    primaryMetricLabel: "Assets Produced",
    primaryMetricValue: "28 Assets",
    secondaryMetricLabel: "Review Acceptance Rate",
    secondaryMetricValue: "94%",
    customSectionTitle: "Design Submissions & Asset Library",
    customSectionSubtitle: "Review Figma canvases, export archives, and pending brand revisions.",
    highlights: [
      { title: "TechFest 2026 Master Poster", subtitle: "Version 3.2 awaiting Core sign-off", tag: "IN REVIEW", value: "Figma" },
      { title: "Instagram Carousel Series", subtitle: "5 slides on AI Hackathon Problem Statements", tag: "APPROVED", value: "1080x1350" },
      { title: "CSI Official Logo Kit v2", subtitle: "Monochrome, inverted, and vector SVGs", tag: "STABLE", value: "Vector" },
      { title: "Speaker Announcement Cards", subtitle: "3 templates prepared for upcoming workshops", tag: "READY", value: "Photoshop" },
    ],
    toolsAndLinks: [
      { name: "Figma Team Workspace", type: "Design File", url: "https://figma.com/@csi-creative", status: "Live" },
      { name: "Brand Guidelines 2026", type: "PDF Manual", url: "#", status: "Official" },
      { name: "Cloud Asset CDN", type: "Storage", url: "#", status: "Active" },
    ],
  },
  technical: {
    slug: "technical",
    headline: "Software Architecture & Deployment Infrastructure",
    tagline: "Full-stack event portals, registration backends, live scoreboards, and hackathon judge platforms.",
    primaryMetricLabel: "Service Uptime",
    primaryMetricValue: "99.98%",
    secondaryMetricLabel: "Active Pull Requests",
    secondaryMetricValue: "4 Open",
    customSectionTitle: "Engineering Pipelines & System Health",
    customSectionSubtitle: "Repository build statuses, API endpoints, database schema revisions, and bugs.",
    highlights: [
      { title: "TechFest Registration Portal", subtitle: "Next.js 16 + Tailwind + Supabase Auth", tag: "STAGING", value: "v1.4.0" },
      { title: "Hackathon Judge Scoring Engine", subtitle: "Websocket real-time leaderboard pipeline", tag: "DEV", value: "Go API" },
      { title: "PostgreSQL Database Schema", subtitle: "Migration 004 verified with RLS policies", tag: "PASSING", value: "DB v2" },
      { title: "CSI College Main Site", subtitle: "Production deployment on Vercel Edge", tag: "HEALTHY", value: "24ms Latency" },
    ],
    toolsAndLinks: [
      { name: "GitHub Repository", type: "Git VCS", url: "https://github.com/Cosmozic27/csi-command-center", status: "Connected" },
      { name: "Staging URL", type: "Environment", url: "https://staging.csi.college.edu", status: "Active" },
      { name: "API Documentation", type: "Swagger / OpenAPI", url: "#", status: "v2.1" },
    ],
  },
  "event-management": {
    slug: "event-management",
    headline: "Logistics, Stage Coordination & On-Ground Operations",
    tagline: "Venue booking, AV setup, crowd management, volunteer scheduling, and hospitality for VIP guests.",
    primaryMetricLabel: "Venues Booked",
    primaryMetricValue: "4 Halls",
    secondaryMetricLabel: "Volunteer Readiness",
    secondaryMetricValue: "24 Volunteers",
    customSectionTitle: "Operational Run-sheets & Stage Checklists",
    customSectionSubtitle: "Floor maps, audio-visual technical riders, speaker escorts, and security protocol.",
    highlights: [
      { title: "Main Auditorium Reservation", subtitle: "Confirmed for Oct 15-17 (TechFest Flagship)", tag: "CONFIRMED", value: "750 Seats" },
      { title: "Hackathon Innovation Lab Setup", subtitle: "High-speed LAN drops and power multi-plugs", tag: "IN PROGRESS", value: "60 Desks" },
      { title: "Audio / Visual Equipment Rider", subtitle: "Dual 4K projectors & wireless lapel mics", tag: "VERIFIED", value: "AV Crew" },
      { title: "Guest Escort Schedule", subtitle: "Keynote speaker arrival logistics from airport", tag: "SCHEDULED", value: "VIP Protocol" },
    ],
    toolsAndLinks: [
      { name: "Master Floorplan Map", type: "Blueprint", url: "#", status: "Approved" },
      { name: "Stage Schedule Run-sheet", type: "Spreadsheet", url: "#", status: "Final Draft" },
      { name: "Volunteer Shift Roster", type: "Roster", url: "#", status: "Active" },
    ],
  },
  publicity: {
    slug: "publicity",
    headline: "Media Campaigns, Social Reach & Audience Engagement",
    tagline: "Instagram reels, LinkedIn corporate outreach, WhatsApp broadcasts, and campus publicity blitz.",
    primaryMetricLabel: "Audience Reach",
    primaryMetricValue: "18.4K Impressions",
    secondaryMetricLabel: "Registration Conversion",
    secondaryMetricValue: "34.2%",
    customSectionTitle: "Campaign Timelines & Publishing Schedule",
    customSectionSubtitle: "Scheduled social broadcasts, outreach analytics, campus posters, and engagement funnels.",
    highlights: [
      { title: "TechFest Teaser Reel Blitz", subtitle: "4.2K views on Instagram within 48 hours", tag: "VIRAL", value: "IG Reel" },
      { title: "LinkedIn Hackathon Announcement", subtitle: "Targeting engineering colleges across Mumbai & Pune", tag: "SCHEDULED", value: "LinkedIn" },
      { title: "WhatsApp Broadcast Channel", subtitle: "1,200 active student subscribers across branches", tag: "ACTIVE", value: "Broadcast" },
      { title: "Classroom Publicity Drive", subtitle: "Covered 24 engineering classrooms with flyers", tag: "COMPLETED", value: "Physical" },
    ],
    toolsAndLinks: [
      { name: "Social Content Calendar", type: "Notion Calendar", url: "#", status: "Live" },
      { name: "Press Release Kit 2026", type: "Media Kit", url: "#", status: "v1.0" },
      { name: "Outreach Contact Directory", type: "Database", url: "#", status: "Updated" },
    ],
  },
  documentation: {
    slug: "documentation",
    headline: "Institutional Archives, Minutes & Certification Governance",
    tagline: "Meeting summaries, attendance verification, student certificates, and annual committee report compilation.",
    primaryMetricLabel: "Reports Published",
    primaryMetricValue: "16 Reports",
    secondaryMetricLabel: "Certificates Distributed",
    secondaryMetricValue: "142 Issued",
    customSectionTitle: "Knowledge Base & Archival Vault",
    customSectionSubtitle: "Official meeting minutes, compliance documentation, attendance registries, and templates.",
    highlights: [
      { title: "AI Workshop Series Report", subtitle: "Comprehensive summary submitted to HOD", tag: "SUBMITTED", value: "PDF Report" },
      { title: "All-Hands Meeting Minutes (Sept 8)", subtitle: "Action items distributed to 9 team leads", tag: "ARCHIVED", value: "Docx" },
      { title: "Digital Certificate Generator", subtitle: "Automated verification QR codes for attendees", tag: "DEPLOYED", value: "Cert Engine" },
      { title: "CSI Annual Chapter Handbook", subtitle: "Section 4 updated with 2026 constitution", tag: "IN DRAFT", value: "Annual Report" },
    ],
    toolsAndLinks: [
      { name: "Official Chapter Archive", type: "Cloud Vault", url: "#", status: "Encrypted" },
      { name: "Certificate Verification Portal", type: "WebApp", url: "#", status: "Online" },
      { name: "Meeting Minutes Templates", type: "Templates", url: "#", status: "Standard" },
    ],
  },
  advisory: {
    slug: "advisory",
    headline: "Senior Mentorship, Strategic Audits & Quality Control",
    tagline: "Alumni guidance, technical review of hackathon problem statements, and committee milestone evaluation.",
    primaryMetricLabel: "Milestones Audited",
    primaryMetricValue: "14 of 14",
    secondaryMetricLabel: "Strategic Advisory Score",
    secondaryMetricValue: "96 / 100",
    customSectionTitle: "Strategic Reviews & Council Recommendations",
    customSectionSubtitle: "Critical feedback for Core leadership, risk audits, and event roadmap assessments.",
    highlights: [
      { title: "Hackathon Problem Statement Audit", subtitle: "Evaluated 4 tracks for industry relevance & fairness", tag: "AUDITED", value: "High Quality" },
      { title: "TechFest Budget Feasibility Review", subtitle: "Recommended 12% buffer for cloud infrastructure", tag: "ADVISED", value: "Finance Audit" },
      { title: "Alumni Keynote Speaker Outreach", subtitle: "Confirmed 2 senior Google and Microsoft alumni", tag: "CONFIRMED", value: "Keynotes" },
      { title: "Annual Chapter Scaling Blueprint", subtitle: "Long-term recommendations for 2026-2027 committee", tag: "DRAFT", value: "Strategy" },
    ],
    toolsAndLinks: [
      { name: "Advisory Council Minutes", type: "Minutes", url: "#", status: "Quarterly" },
      { name: "Alumni Mentor Directory", type: "Network", url: "#", status: "Active" },
    ],
  },
  faculty: {
    slug: "faculty",
    headline: "Institutional Governance, Academic Compliance & Budgets",
    tagline: "Faculty sponsorship, college administrative liaison, fund disbursements, and official permissions.",
    primaryMetricLabel: "Disbursed Budget",
    primaryMetricValue: "₹1,50,000",
    secondaryMetricLabel: "Sign-Off Approvals",
    secondaryMetricValue: "100% Verified",
    customSectionTitle: "Institutional Oversight & Regulatory Compliance",
    customSectionSubtitle: "Official letters, hall requisitions, departmental sanctions, and faculty approvals.",
    highlights: [
      { title: "Institutional Seed Grant Authorization", subtitle: "Sanctioned ₹50,000 for AWS cloud credits", tag: "SANCTIONED", value: "Accounts" },
      { title: "Auditorium Requisition Form", subtitle: "Approved by College Principal & Registrar", tag: "PERMITTED", value: "Registrar" },
      { title: "Inter-College Participation Sanction", subtitle: "Permission for 200 external delegates to enter campus", tag: "APPROVED", value: "Security" },
      { title: "Faculty Patron Endorsement", subtitle: "Official CSI India chapter compliance documentation", tag: "COMPLIANT", value: "CSI HQ" },
    ],
    toolsAndLinks: [
      { name: "College Approval Letterhead", type: "Document", url: "#", status: "Official" },
      { name: "Financial Sanction Order", type: "Finance", url: "#", status: "Approved" },
    ],
  },
  core: {
    slug: "core",
    headline: "Central Command, Operations Control & Team Orchestration",
    tagline: "Cross-team directive issuance, inter-team handoff management, and committee sprint coordination.",
    primaryMetricLabel: "Directives Active",
    primaryMetricValue: "13 Tasks",
    secondaryMetricLabel: "Cross-Team Sync",
    secondaryMetricValue: "9 Teams Synced",
    customSectionTitle: "Cross-Team Coordination & Sprint Operations",
    customSectionSubtitle: "Dependency tracking, blocker resolution, committee-wide broadcasts, and review queue.",
    highlights: [
      { title: "Weekly Sprint Sync #4", subtitle: "All 9 teams reporting on TechFest deliverables", tag: "ACTIVE SPRINT", value: "Sprint 4" },
      { title: "Cross-Team Blocker: Graphics -> Tech", subtitle: "Registration page waiting on banner dimensions", tag: "UNBLOCKED", value: "Priority" },
      { title: "All-Hands Meeting Summons", subtitle: "Mandatory rehearsal in Seminar Hall 2 on Friday", tag: "TRANSMITTED", value: "Broadcast" },
      { title: "Committee Health Audit Q3", subtitle: "Zero critical bottlenecks identified this cycle", tag: "NOMINAL", value: "Health 99%" },
    ],
    toolsAndLinks: [
      { name: "Executive Roadmap", type: "Roadmap", url: "#", status: "Master" },
      { name: "Inter-Team Handoff Matrix", type: "Workflow", url: "#", status: "Live" },
    ],
  },
  "general-members": {
    slug: "general-members",
    headline: "Student Chapter Assembly, Volunteers & Event Trainees",
    tagline: "Participation in hackathons, workshops, technical squads, and volunteer event squads.",
    primaryMetricLabel: "Active Volunteers",
    primaryMetricValue: "42 Students",
    secondaryMetricLabel: "Upcoming Workshops",
    secondaryMetricValue: "3 Events",
    customSectionTitle: "Volunteer Directives & Active Engagement",
    customSectionSubtitle: "Opportunities to assist with on-ground execution, registration desks, and tech support.",
    highlights: [
      { title: "TechFest Registration Desk Squad", subtitle: "Assisting attendees with badge scanning & swag", tag: "OPEN", value: "10 Needed" },
      { title: "Audio / Visual Trainee Support", subtitle: "Shadowing event management team during keynotes", tag: "ASSIGNED", value: "4 Assigned" },
      { title: "Hackathon Snack & Energy Drinks Station", subtitle: "Managing refreshment supply for 36-hour sprint", tag: "OPEN", value: "6 Needed" },
      { title: "Open-Source Bootcamp Participation", subtitle: "Free entry for all registered general members", tag: "UPCOMING", value: "Oct 2" },
    ],
    toolsAndLinks: [
      { name: "Volunteer Sign-up Form", type: "Form", url: "#", status: "Open" },
      { name: "Chapter Points Leaderboard", type: "Gamification", url: "#", status: "Updated" },
    ],
  },
};
