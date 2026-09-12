import type { TeamSlug } from "@/types/entities";

export interface TeamFileRecord {
  id: string;
  name: string;
  teamSlug: TeamSlug;
  category: string;
  size: string;
  uploaderName: string;
  updatedAt: string;
  version: string;
  status: "CURRENT" | "UNDER_REVIEW" | "ARCHIVED";
}

export const MOCK_TEAM_FILES: TeamFileRecord[] = [
  // Graphics
  {
    id: "file-gfx-01",
    name: "TechFest_2026_Main_Poster_PrintReady.fig",
    teamSlug: "graphics",
    category: "Design File",
    size: "42.8 MB",
    uploaderName: "Rahul Verma",
    updatedAt: "2026-09-12T10:00:00Z",
    version: "v3.2",
    status: "UNDER_REVIEW",
  },
  {
    id: "file-gfx-02",
    name: "Instagram_Carousel_Kit_AI_Hackathon.zip",
    teamSlug: "graphics",
    category: "Social Creative",
    size: "18.4 MB",
    uploaderName: "Nisha Sen",
    updatedAt: "2026-09-11T14:20:00Z",
    version: "v2.0",
    status: "CURRENT",
  },
  {
    id: "file-gfx-03",
    name: "CSI_Monochrome_Vector_Logo_Kit.svg",
    teamSlug: "graphics",
    category: "Brand Assets",
    size: "1.2 MB",
    uploaderName: "Rahul Verma",
    updatedAt: "2026-09-05T09:00:00Z",
    version: "v1.0",
    status: "CURRENT",
  },

  // Technical
  {
    id: "file-tech-01",
    name: "CSI_Database_Architecture_v2.sql",
    teamSlug: "technical",
    category: "Schema / Code",
    size: "340 KB",
    uploaderName: "Karan Shah",
    updatedAt: "2026-09-12T11:30:00Z",
    version: "v2.4",
    status: "CURRENT",
  },
  {
    id: "file-tech-02",
    name: "Registration_Engine_OpenAPI_Spec.json",
    teamSlug: "technical",
    category: "API Specification",
    size: "85 KB",
    uploaderName: "Ananya Krishnan",
    updatedAt: "2026-09-10T16:45:00Z",
    version: "v1.2",
    status: "CURRENT",
  },
  {
    id: "file-tech-03",
    name: "Hackathon_Docker_Compose_SelfHost.yml",
    teamSlug: "technical",
    category: "DevOps Script",
    size: "12 KB",
    uploaderName: "Rohan Bhatia",
    updatedAt: "2026-09-08T18:00:00Z",
    version: "v1.0",
    status: "CURRENT",
  },

  // Event Management
  {
    id: "file-evt-01",
    name: "Auditorium_Technical_Rider_AudioVisual.pdf",
    teamSlug: "event-management",
    category: "Logistics Checklist",
    size: "3.4 MB",
    uploaderName: "Meera Nair",
    updatedAt: "2026-09-12T09:15:00Z",
    version: "v2.1",
    status: "CURRENT",
  },
  {
    id: "file-evt-02",
    name: "TechFest_Master_Stage_Schedule_Runsheet.xlsx",
    teamSlug: "event-management",
    category: "Stage Schedule",
    size: "720 KB",
    uploaderName: "Sameer Joshi",
    updatedAt: "2026-09-11T12:00:00Z",
    version: "v1.5",
    status: "CURRENT",
  },

  // Publicity
  {
    id: "file-pub-01",
    name: "TechFest_2026_Official_Sponsorship_Brochure.pdf",
    teamSlug: "publicity",
    category: "Media Kit",
    size: "8.6 MB",
    uploaderName: "Rohit Das",
    updatedAt: "2026-09-11T17:00:00Z",
    version: "v2.0",
    status: "CURRENT",
  },
  {
    id: "file-pub-02",
    name: "Social_Media_Captions_Hashtag_Strategy.docx",
    teamSlug: "publicity",
    category: "Copywriting",
    size: "450 KB",
    uploaderName: "Kavya Menon",
    updatedAt: "2026-09-10T13:30:00Z",
    version: "v1.1",
    status: "CURRENT",
  },

  // Documentation
  {
    id: "file-doc-01",
    name: "AI_Workshop_Series_Comprehensive_Report.pdf",
    teamSlug: "documentation",
    category: "Institutional Report",
    size: "5.2 MB",
    uploaderName: "Preethi Rajan",
    updatedAt: "2026-09-10T16:00:00Z",
    version: "Final",
    status: "CURRENT",
  },
  {
    id: "file-doc-02",
    name: "AllHands_Committee_Meeting_Minutes_Sept8.docx",
    teamSlug: "documentation",
    category: "Meeting Minutes",
    size: "290 KB",
    uploaderName: "Aditya Hegde",
    updatedAt: "2026-09-08T19:00:00Z",
    version: "v1.0",
    status: "ARCHIVED",
  },

  // Faculty
  {
    id: "file-fac-01",
    name: "Institutional_Grant_Sanction_Order_50K.pdf",
    teamSlug: "faculty",
    category: "Financial Sanction",
    size: "1.1 MB",
    uploaderName: "Dr. Priya Sharma",
    updatedAt: "2026-09-11T12:00:00Z",
    version: "Official",
    status: "CURRENT",
  },

  // Core
  {
    id: "file-core-01",
    name: "Cross_Team_InterDependency_Matrix_Q3.xlsx",
    teamSlug: "core",
    category: "Operations Matrix",
    size: "890 KB",
    uploaderName: "Arjun Mehta",
    updatedAt: "2026-09-12T08:30:00Z",
    version: "v4.0",
    status: "CURRENT",
  },

  // Advisory
  {
    id: "file-adv-01",
    name: "National_Hackathon_Track_Feasibility_Audit.pdf",
    teamSlug: "advisory",
    category: "Quality Audit",
    size: "2.3 MB",
    uploaderName: "Sneha Iyer",
    updatedAt: "2026-09-09T14:00:00Z",
    version: "v1.0",
    status: "CURRENT",
  },

  // General Members
  {
    id: "file-gen-01",
    name: "Volunteer_Onboarding_Handbook_2026.pdf",
    teamSlug: "general-members",
    category: "Orientation Guide",
    size: "3.1 MB",
    uploaderName: "Arjun Mehta",
    updatedAt: "2026-09-01T10:00:00Z",
    version: "v1.0",
    status: "CURRENT",
  },
];

export function getFilesByTeamSlug(teamSlug: TeamSlug): TeamFileRecord[] {
  return MOCK_TEAM_FILES.filter((f) => f.teamSlug === teamSlug);
}
