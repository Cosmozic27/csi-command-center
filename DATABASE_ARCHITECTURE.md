# CSI COMMAND CENTER

## Database Architecture

**Database:** PostgreSQL
**Recommended Platform:** Supabase
**Architecture:** Relational + Row Level Security

---

# 1. DATABASE DESIGN PRINCIPLE

The database must represent the committee as a connected organization rather than as independent team databases.

The primary relationship is:

```text
Organization
    ↓
Teams
    ↓
Members
    ↓
Projects / Events
    ↓
Tasks
    ↓
Dependencies
    ↓
Files / Comments / Approvals
```

Teams should not have separate databases.

All teams use the same database while authorization determines what each user can access.

---

# 2. CORE ENTITIES

Initial entities:

```text
users
roles
teams
team_members
projects
project_teams
events
event_teams
tasks
task_dependencies
comments
files
file_versions
approvals
approval_actions
notifications
announcements
calendar_events
campaigns
documents
automation_templates
automation_runs
activity_logs
```

---

# 3. USERS

Table:

```text
users
```

Purpose:

Stores application users.

Suggested fields:

```text
id                  UUID PRIMARY KEY
auth_user_id        UUID UNIQUE
full_name           TEXT NOT NULL
email               TEXT UNIQUE NOT NULL
avatar_url          TEXT
phone               TEXT
bio                 TEXT
skills              TEXT[]
is_active           BOOLEAN DEFAULT TRUE
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Do not store passwords in this table.

Authentication should be handled by Supabase Auth.

---

# 4. ROLES

Table:

```text
roles
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
name                TEXT UNIQUE
description         TEXT
created_at          TIMESTAMP
```

Initial roles:

```text
FACULTY
CORE
ADVISORY
TEAM_LEAD
TEAM_MEMBER
GENERAL_MEMBER
```

---

# 5. TEAMS

Table:

```text
teams
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
name                TEXT UNIQUE
slug                TEXT UNIQUE
description         TEXT
icon                TEXT
is_active           BOOLEAN DEFAULT TRUE
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Initial teams:

```text
faculty
core
advisory
graphics
event-management
technical
documentation
publicity
general-members
```

---

# 6. TEAM MEMBERSHIP

Table:

```text
team_members
```

Purpose:

Connect users to teams.

Suggested fields:

```text
id                  UUID PRIMARY KEY
user_id             UUID REFERENCES users(id)
team_id             UUID REFERENCES teams(id)
role_id             UUID REFERENCES roles(id)
is_team_lead        BOOLEAN DEFAULT FALSE
joined_at           TIMESTAMP
left_at             TIMESTAMP NULL
is_active           BOOLEAN DEFAULT TRUE
```

A user may have different roles in different contexts if required.

Example:

```text
User A
→ Technical Team
→ TEAM_LEAD
```

---

# 7. PROJECTS

Table:

```text
projects
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
name                TEXT NOT NULL
slug                TEXT UNIQUE
description         TEXT
status              TEXT
priority            TEXT
owner_id            UUID REFERENCES users(id)
start_date          DATE
end_date            DATE
progress_percentage INTEGER DEFAULT 0
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Statuses:

```text
PLANNING
ACTIVE
ON_HOLD
COMPLETED
ARCHIVED
```

---

# 8. PROJECT TEAMS

Table:

```text
project_teams
```

Purpose:

Connect multiple teams to a project.

Fields:

```text
id                  UUID PRIMARY KEY
project_id          UUID REFERENCES projects(id)
team_id             UUID REFERENCES teams(id)
role_description    TEXT
created_at          TIMESTAMP
```

Example:

```text
Hackathon
 ├── Event Management
 ├── Technical
 ├── Graphics
 ├── Publicity
 └── Documentation
```

---

# 9. EVENTS

Table:

```text
events
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
project_id          UUID REFERENCES projects(id) NULL
name                TEXT NOT NULL
description         TEXT
event_type          TEXT
venue               TEXT
start_datetime      TIMESTAMP
end_datetime        TIMESTAMP
event_lead_id       UUID REFERENCES users(id)
status              TEXT
registration_url    TEXT
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Statuses:

```text
PLANNING
UPCOMING
LIVE
COMPLETED
CANCELLED
```

---

# 10. EVENT TEAMS

Table:

```text
event_teams
```

Purpose:

Connect teams to events.

Fields:

```text
id                  UUID PRIMARY KEY
event_id            UUID REFERENCES events(id)
team_id             UUID REFERENCES teams(id)
responsibility      TEXT
created_at          TIMESTAMP
```

Example:

```text
AI Workshop

Event Management:
Event execution

Technical:
Registration system

Graphics:
Poster

Publicity:
Promotion

Documentation:
Report
```

---

# 11. TASKS

Table:

```text
tasks
```

This is one of the most important tables.

Suggested fields:

```text
id                  UUID PRIMARY KEY
title               TEXT NOT NULL
description         TEXT
project_id          UUID REFERENCES projects(id) NULL
event_id            UUID REFERENCES events(id) NULL
assigned_team_id    UUID REFERENCES teams(id) NULL
assigned_user_id    UUID REFERENCES users(id) NULL
created_by          UUID REFERENCES users(id)
status              TEXT
priority            TEXT
task_type           TEXT
start_date          TIMESTAMP
due_date            TIMESTAMP
completed_at        TIMESTAMP NULL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Statuses:

```text
TODO
IN_PROGRESS
UNDER_REVIEW
COMPLETED
BLOCKED
```

Priorities:

```text
LOW
MEDIUM
HIGH
URGENT
```

---

# 12. TASK DEPENDENCIES

Table:

```text
task_dependencies
```

Purpose:

Represent workflows between teams.

Fields:

```text
id                  UUID PRIMARY KEY
task_id             UUID REFERENCES tasks(id)
depends_on_task_id  UUID REFERENCES tasks(id)
dependency_type     TEXT
created_at          TIMESTAMP
```

Example:

```text
Publicity Campaign
depends on
Event Poster
```

Relationship:

```text
Graphics:
Create Poster
       ↓
Publicity:
Create Campaign
```

---

# 13. COMMENTS

Table:

```text
comments
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
author_id           UUID REFERENCES users(id)
task_id             UUID REFERENCES tasks(id) NULL
project_id          UUID REFERENCES projects(id) NULL
event_id            UUID REFERENCES events(id) NULL
parent_comment_id   UUID REFERENCES comments(id) NULL
content             TEXT NOT NULL
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

This supports threaded discussions.

---

# 14. FILES

Table:

```text
files
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
name                TEXT NOT NULL
storage_path        TEXT NOT NULL
mime_type           TEXT
size_bytes          BIGINT
uploaded_by         UUID REFERENCES users(id)
team_id             UUID REFERENCES teams(id) NULL
project_id          UUID REFERENCES projects(id) NULL
event_id            UUID REFERENCES events(id) NULL
task_id             UUID REFERENCES tasks(id) NULL
file_category       TEXT
current_version     INTEGER DEFAULT 1
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

---

# 15. FILE VERSIONS

Table:

```text
file_versions
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
file_id             UUID REFERENCES files(id)
version_number      INTEGER
storage_path        TEXT
uploaded_by         UUID REFERENCES users(id)
change_description  TEXT
created_at          TIMESTAMP
```

Example:

```text
Poster
 ├── V1
 ├── V2
 ├── V3
 └── FINAL
```

---

# 16. APPROVALS

Table:

```text
approvals
```

Suggested fields:

```text
id                  UUID PRIMARY KEY
file_id             UUID REFERENCES files(id) NULL
task_id             UUID REFERENCES tasks(id) NULL
project_id          UUID REFERENCES projects(id) NULL
requested_by        UUID REFERENCES users(id)
current_stage       TEXT
status              TEXT
current_reviewer_id UUID REFERENCES users(id) NULL
submitted_at        TIMESTAMP
completed_at        TIMESTAMP NULL
```

Stages:

```text
TEAM_REVIEW
CORE_REVIEW
FACULTY_REVIEW
```

Statuses:

```text
PENDING
APPROVED
REJECTED
CHANGES_REQUESTED
```

---

# 17. APPROVAL ACTIONS

Table:

```text
approval_actions
```

Purpose:

Maintain approval history.

Fields:

```text
id                  UUID PRIMARY KEY
approval_id         UUID REFERENCES approvals(id)
reviewer_id         UUID REFERENCES users(id)
action              TEXT
comment             TEXT
created_at          TIMESTAMP
```

Actions:

```text
APPROVE
REJECT
REQUEST_CHANGES
```

This allows the system to display:

```text
V1 submitted
↓
Core requested changes
↓
V2 submitted
↓
Faculty approved
```

---

# 18. NOTIFICATIONS

Table:

```text
notifications
```

Fields:

```text
id                  UUID PRIMARY KEY
user_id             UUID REFERENCES users(id)
title               TEXT
message             TEXT
notification_type   TEXT
related_task_id     UUID REFERENCES tasks(id) NULL
related_project_id  UUID REFERENCES projects(id) NULL
related_event_id    UUID REFERENCES events(id) NULL
is_read             BOOLEAN DEFAULT FALSE
created_at          TIMESTAMP
```

---

# 19. ANNOUNCEMENTS

Table:

```text
announcements
```

Fields:

```text
id                  UUID PRIMARY KEY
title               TEXT
content             TEXT
created_by          UUID REFERENCES users(id)
visibility          TEXT
priority            TEXT
published_at        TIMESTAMP
expires_at          TIMESTAMP NULL
created_at          TIMESTAMP
```

Visibility examples:

```text
PUBLIC
COMMITTEE
FACULTY
CORE
TEAM
```

If team-specific announcements are needed, create a separate mapping table.

---

# 20. CALENDAR EVENTS

Table:

```text
calendar_events
```

Fields:

```text
id                  UUID PRIMARY KEY
title               TEXT
description         TEXT
event_type          TEXT
start_datetime      TIMESTAMP
end_datetime        TIMESTAMP
created_by          UUID REFERENCES users(id)
project_id          UUID REFERENCES projects(id) NULL
event_id            UUID REFERENCES events(id) NULL
team_id             UUID REFERENCES teams(id) NULL
created_at          TIMESTAMP
```

---

# 21. CAMPAIGNS

Table:

```text
campaigns
```

Mainly used by Publicity.

Fields:

```text
id                  UUID PRIMARY KEY
name                TEXT
description         TEXT
event_id            UUID REFERENCES events(id) NULL
owner_id            UUID REFERENCES users(id)
status              TEXT
start_date          DATE
end_date            DATE
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Statuses:

```text
PLANNING
ACTIVE
COMPLETED
CANCELLED
```

---

# 22. DOCUMENTS

Table:

```text
documents
```

Mainly used by Documentation Team.

Fields:

```text
id                  UUID PRIMARY KEY
title               TEXT
document_type       TEXT
event_id            UUID REFERENCES events(id) NULL
project_id          UUID REFERENCES projects(id) NULL
created_by          UUID REFERENCES users(id)
file_id             UUID REFERENCES files(id) NULL
status              TEXT
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Types:

```text
EVENT_REPORT
MEETING_MINUTES
ATTENDANCE
CERTIFICATE
PROPOSAL
OTHER
```

---

# 23. AUTOMATION TEMPLATES

Table:

```text
automation_templates
```

Purpose:

Store reusable workflows.

Fields:

```text
id                  UUID PRIMARY KEY
name                TEXT
description         TEXT
trigger_type        TEXT
is_active           BOOLEAN DEFAULT TRUE
created_by          UUID REFERENCES users(id)
configuration      JSONB
created_at          TIMESTAMP
updated_at          TIMESTAMP
```

Example configuration:

```text
Trigger:
EVENT_CREATED

Actions:
Create Graphics Task
Create Technical Task
Create Publicity Task
Create Documentation Task
Notify Team Leads
```

---

# 24. AUTOMATION RUNS

Table:

```text
automation_runs
```

Fields:

```text
id                  UUID PRIMARY KEY
template_id         UUID REFERENCES automation_templates(id)
triggered_by        UUID REFERENCES users(id) NULL
trigger_entity_type TEXT
trigger_entity_id   UUID
status              TEXT
execution_log       JSONB
started_at          TIMESTAMP
completed_at        TIMESTAMP NULL
```

Statuses:

```text
RUNNING
COMPLETED
FAILED
PARTIAL
```

---

# 25. ACTIVITY LOGS

Table:

```text
activity_logs
```

Purpose:

Audit trail.

Fields:

```text
id                  UUID PRIMARY KEY
user_id             UUID REFERENCES users(id) NULL
action              TEXT
entity_type        TEXT
entity_id           UUID
metadata            JSONB
created_at          TIMESTAMP
```

Example:

```text
user: Rahul
action: TASK_COMPLETED
entity: task
entity_id: XYZ
```

---

# 26. ENTITY RELATIONSHIPS

High-level relationship:

```text
USERS
 │
 ├──────────────┐
 │              │
 ▼              ▼
ROLES         TEAM_MEMBERS
                │
                ▼
              TEAMS
                │
        ┌───────┴────────┐
        ▼                ▼
     PROJECTS          EVENTS
        │                │
        │                │
        └───────┬────────┘
                ▼
              TASKS
                │
                ▼
       TASK_DEPENDENCIES
                │
       ┌────────┼─────────┐
       ▼        ▼         ▼
    COMMENTS   FILES   APPROVALS
                 │
                 ▼
           FILE_VERSIONS
```

---

# 27. PROJECT RELATIONSHIP

```text
PROJECT
   │
   ├── PROJECT_TEAMS
   │
   ├── TASKS
   │
   ├── FILES
   │
   ├── COMMENTS
   │
   └── ACTIVITY
```

---

# 28. EVENT RELATIONSHIP

```text
EVENT
 │
 ├── EVENT_TEAMS
 │
 ├── TASKS
 │
 ├── FILES
 │
 ├── DOCUMENTS
 │
 ├── CALENDAR EVENTS
 │
 ├── COMMENTS
 │
 └── AUTOMATION
```

---

# 29. TEAM WORKFLOW

Example:

```text
EVENT MANAGEMENT
       │
       │ creates event
       ▼
      EVENT
       │
       ├──────────────┐
       ▼              ▼
   PROJECT         CALENDAR
       │
       ▼
 PARTICIPATING TEAMS
       │
 ┌─────┼─────────┬────────────┐
 ▼     ▼         ▼            ▼
GRAPHICS TECHNICAL PUBLICITY DOCUMENTATION
   │       │         │            │
   ▼       ▼         ▼            ▼
Poster   Website   Campaign      Report
```

---

# 30. ROLE-BASED ACCESS CONTROL

Authorization should be implemented at multiple levels.

## Faculty

```text
Organization-wide read/write
Organization administration
```

## Core

```text
Organization-wide operational access
```

## Advisory

```text
Read + review + comment
```

## Team Lead

```text
Own team management
```

## Team Member

```text
Own team + assigned work
```

## General Member

```text
Limited permitted access
```

---

# 31. ROW LEVEL SECURITY

Use PostgreSQL Row Level Security.

Rules should conceptually follow:

### Faculty

Can access all organization data.

### Core

Can access all operational team/project/event/task data.

### Team Lead

Can access:

* Own team
* Own team's tasks
* Own team's files
* Projects/events involving own team

### Team Member

Can access:

* Own team
* Assigned tasks
* Relevant projects
* Relevant files

### General Member

Can access only explicitly permitted records.

---

# 32. IMPORTANT SECURITY RULE

Never implement security like:

```text
if role === "faculty":
    show button
```

and consider that sufficient.

The backend/database must also verify:

```text
Does this authenticated user have permission
to perform this operation on this record?
```

Frontend visibility is only a UX feature.

Database/API authorization is the actual security layer.

---

# 33. INDEXING

Add indexes to frequently queried fields.

Recommended:

```text
users.email
team_members.user_id
team_members.team_id

tasks.assigned_user_id
tasks.assigned_team_id
tasks.project_id
tasks.event_id
tasks.status
tasks.due_date

project_teams.project_id
project_teams.team_id

event_teams.event_id
event_teams.team_id

notifications.user_id
notifications.is_read

activity_logs.user_id
activity_logs.entity_type
activity_logs.entity_id
```

Use composite indexes where query patterns justify them.

---

# 34. AUDITABILITY

Important operations should create activity logs.

Examples:

```text
USER_CREATED
USER_UPDATED
ROLE_CHANGED
TEAM_CREATED
MEMBER_ADDED
TASK_CREATED
TASK_ASSIGNED
TASK_COMPLETED
FILE_UPLOADED
FILE_APPROVED
FILE_REJECTED
PROJECT_CREATED
EVENT_CREATED
APPROVAL_REQUESTED
APPROVAL_COMPLETED
```

---

# 35. DATA VALIDATION

Validate all incoming data.

Examples:

* Required fields
* UUID validity
* Date validity
* Role validity
* Team validity
* File type
* File size
* Task status
* Permission checks

Never trust client-provided IDs or roles.

---

# 36. STORAGE ARCHITECTURE

Recommended Supabase Storage structure:

```text
committee/
    projects/
        {project_id}/
    events/
        {event_id}/
    teams/
        {team_id}/
    tasks/
        {task_id}/
```

Storage access must also respect application permissions.

---

# 37. AUTOMATION DATA FLOW

Example:

```text
User creates EVENT
        ↓
Database inserts EVENT
        ↓
Automation engine detects EVENT_CREATED
        ↓
Load automation template
        ↓
Check participating teams
        ↓
Create required TASKS
        ↓
Create CALENDAR entry
        ↓
Create NOTIFICATIONS
        ↓
Write AUTOMATION_RUN
        ↓
Write ACTIVITY_LOG
```

---

# 38. DATABASE MIGRATION RULE

All schema changes must be version-controlled.

Never manually make undocumented production schema changes.

Recommended migration workflow:

```text
Create migration
      ↓
Test locally
      ↓
Apply to development database
      ↓
Test application
      ↓
Commit migration
      ↓
Apply to production
```

---

# 39. SEED DATA

Development environment should contain:

### Teams

```text
Faculty Team
Core Team
Advisory Team
Graphics Team
Event Management Team
Technical Team
Documentation Team
Publicity Team
General Members
```

### Sample Events

```text
CSI TechFest 2026
AI Workshop
National Level Hackathon 2026
```

### Sample users

Create users representing:

```text
Faculty
Core Lead
Graphics Lead
Technical Lead
Event Management Lead
Documentation Lead
Publicity Lead
Team Members
General Members
```

Do not use real people's personal information in development seed data.

---

# 40. DATABASE DEFINITION OF DONE

Database architecture is considered complete when:

* All tables exist
* Foreign keys are correct
* Constraints are defined
* Indexes are created
* RLS is implemented
* Storage permissions are configured
* Seed data works
* Migrations are version-controlled
* Unauthorized access has been tested
* Application queries work correctly

---

# 41. FUTURE EXTENSIBILITY

The architecture should later support:

* Attendance management
* Member applications
* Event registrations
* Certificates
* Budget management
* Inventory
* Meeting scheduling
* AI task suggestions
* AI report generation
* Email integration
* WhatsApp/notification integrations
* External calendar integration
* GitHub integration
* Advanced analytics

These should NOT be implemented during the initial foundation unless explicitly added to the roadmap.

---

# 42. FINAL DATABASE PRINCIPLE

The database should model:

```text
WHO
  ↓
belongs to which TEAM

WHAT
  ↓
PROJECT / EVENT

WHAT WORK
  ↓
TASK

WHO DOES IT
  ↓
USER / TEAM

WHAT DOES IT DEPEND ON
  ↓
TASK DEPENDENCY

WHAT WAS PRODUCED
  ↓
FILE / DOCUMENT

WHO APPROVED IT
  ↓
APPROVAL

WHAT HAPPENED
  ↓
ACTIVITY LOG

WHAT CAN BE AUTOMATED
  ↓
AUTOMATION TEMPLATE
```

The goal is a connected organizational data model rather than isolated team dashboards.
