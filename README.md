# CSI Command Center

A futuristic, centralized digital command center for managing the college CSI (Computer Society of India) committee.

CSI Command Center brings teams, projects, events, tasks, files, approvals, communication, notifications, and analytics into one unified platform.

---

## 🎯 Project Vision

The goal of CSI Command Center is to replace scattered communication and manual coordination with a single intelligent platform where every committee team can collaborate efficiently.

The platform is designed as a **digital operating system for the CSI committee**, rather than a traditional committee website.

---

## 👥 Teams

The platform supports the following teams:

- Faculty Team
- Core Team
- Advisory Team
- Graphics Team
- Event Management Team
- Technical Team
- Documentation Team
- Publicity Team
- General Members

Faculty and Core members can coordinate activities across multiple teams through a unified system.

---

## 🚀 Key Features

### Command Center
- Organization-wide dashboard
- Important events and deadlines
- Pending tasks
- Notifications
- Recent activity
- Team and project overview

### Team Management
- Team portals
- Team members
- Roles and permissions
- Team workload
- Team-specific tasks and projects

### Task Management
- Kanban board
- Task assignment
- Priorities
- Deadlines
- Task dependencies
- Progress tracking
- TODO / IN PROGRESS / UNDER REVIEW / COMPLETED / BLOCKED statuses

### Project Management
- Cross-team projects
- Participating teams
- Project tasks
- Files
- Discussions
- Progress tracking

### Event Management
- Event planning
- Event timelines
- Venue and speaker information
- Registration management
- Volunteer assignments
- Event checklists

### Cross-Team Collaboration

Example workflow:

Event Management
        ↓
Technical Team
        ↓
Graphics Team
        ↓
Publicity Team
        ↓
Documentation Team

The platform connects these teams through shared projects, tasks, files, dependencies and approvals.

### Approval System

Work can move through:

DRAFT
↓
SUBMITTED FOR REVIEW
↓
TEAM LEAD REVIEW
↓
CORE REVIEW
↓
FACULTY APPROVAL
↓
APPROVED / PUBLISHED

### File Management
- Centralized file storage
- Project/event/task files
- File versions
- Upload and preview
- Approval workflow

### Notifications
Users can receive notifications for:

- Task assignments
- Task completion
- Deadlines
- Overdue tasks
- File uploads
- Approvals
- Rejections
- Comments
- Mentions
- Project updates
- Event creation

### Calendar
- Events
- Meetings
- Deadlines
- Team activities

### Analytics
- Task completion
- Pending and overdue tasks
- Team workload
- Project progress
- Event progress
- Member workload
- Approval turnaround time

### Global Search

Search across:

- Members
- Teams
- Tasks
- Projects
- Events
- Files
- Announcements

### Command Palette

Press:

`Ctrl + K`

to quickly navigate and search across the platform.

---

## 🔐 Roles & Access Control

The platform uses role-based access control (RBAC).

| Role | Access |
|---|---|
| Faculty | Full organization access |
| Core | Organization-wide operational access |
| Advisory | Review and monitoring |
| Team Lead | Manage assigned team |
| Team Member | Team and assigned work |
| General Member | Limited participation |

Authorization must be enforced on the server/database level and not only through frontend UI restrictions.

---

## 🛠️ Technology Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons
- Framer Motion

### Backend
- Next.js backend/API
- PostgreSQL
- Supabase

### Authentication
- Supabase Auth

### Storage
- Supabase Storage

### Deployment
- Vercel

### Development
- Git
- GitHub

---

## 🗄️ Database

The application uses a **single shared PostgreSQL database**.

Teams do NOT have separate databases.

Major entities include:

- Users
- Roles
- Teams
- Team Members
- Projects
- Events
- Tasks
- Task Dependencies
- Comments
- Files
- Approvals
- Notifications
- Announcements
- Calendar Events
- Campaigns
- Documents
- Automation Templates
- Automation Runs
- Activity Logs

See `DATABASE_ARCHITECTURE.md` for the complete database design.

---

## 🤖 Automation

The system is designed to automate repetitive committee workflows.

For example:

When an event is created:

1. Recommended tasks are generated.
2. Relevant teams are notified.
3. Deadlines are calculated.
4. Calendar entries are created.
5. Dependencies are established.
6. Progress can be tracked centrally.

The long-term goal is to make the platform an intelligent workflow engine for the committee.

---

## 🎨 Design Philosophy

The interface should feel like a:

**Futuristic Digital Command Center**

Design principles:

- Dark mode
- Glassmorphism
- Dark navy/black foundation
- Subtle cyan/violet/blue accents
- Soft glowing borders
- Modern typography
- Rounded cards
- Smooth transitions
- Premium SaaS aesthetic
- Responsive design

Avoid:

- Excessive neon
- Gaming-style interfaces
- Excessive animations
- Cluttered layouts
- Childish visuals

The interface should remain professional and usable.

---

## 📱 Responsive Design

The application must work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

Mobile should have an intentionally designed layout rather than simply shrinking the desktop interface.

---

## 🔒 Security Principles

Security is a core requirement.

The application should implement:

- Authentication
- Role-based authorization
- Server-side permission checks
- Database-level security
- PostgreSQL Row Level Security (RLS)
- Secure file access
- Input validation
- Secure API endpoints
- Audit logging
- Protected environment variables

Secrets must never be committed to GitHub.

---

## 📂 Project Documentation

The project uses three main specification documents:

### `PROJECT_SPEC.md`

Contains the complete product requirements, features, roles, design principles and technical expectations.

### `ROADMAP.md`

Contains the development phases and implementation order.

### `DATABASE_ARCHITECTURE.md`

Contains the database structure, relationships, security model and storage architecture.

These files should be treated as the **source of truth** for development.

---

## 🗺️ Development Roadmap

The project will be developed incrementally.

Main stages include:

1. Project Foundation
2. Database & Authentication
3. Application Shell
4. Command Center
5. Team Management
6. Task Management
7. Project Management
8. Event Management
9. Cross-Team Dependencies
10. File Management
11. Approval System
12. Notifications
13. Communication
14. Calendar
15. Automation Engine
16. Team-Specific Features
17. Analytics
18. Member Directory
19. Activity Log
20. Public Website
21. Security Audit
22. Responsive Optimization
23. Performance Optimization
24. Production Deployment

See `ROADMAP.md` for detailed implementation instructions.

---

## 🧑‍💻 Development Principles

- Build the project phase by phase.
- Do not implement the entire application at once.
- Complete and test each phase before moving to the next.
- Keep the three specification files updated.
- Reuse components wherever possible.
- Never bypass authorization.
- Never expose secrets.
- Do not delete working functionality without confirmation.
- Use Git for version control.
- Make focused commits.

### Commit Examples

```text
feat: add authentication
feat: add team dashboard
feat: add task management
feat: add event automation
fix: correct team authorization
fix: resolve notification bug