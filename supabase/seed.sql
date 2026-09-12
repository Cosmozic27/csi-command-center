-- ==============================================================================
-- CSI COMMAND CENTER - SEED DATA (PHASE 1)
-- Creates initial demo users, team assignments, and roles for testing
-- ==============================================================================

DO $$
DECLARE
    role_faculty UUID;
    role_core UUID;
    role_advisory UUID;
    role_lead UUID;
    role_member UUID;
    role_general UUID;

    team_faculty UUID;
    team_core UUID;
    team_advisory UUID;
    team_graphics UUID;
    team_technical UUID;
    team_event UUID;
    team_documentation UUID;
    team_publicity UUID;
    team_general UUID;

    u_faculty UUID;
    u_core UUID;
    u_advisory UUID;
    u_graphics_lead UUID;
    u_tech_member UUID;
    u_general UUID;
BEGIN
    -- Resolve Roles
    SELECT id INTO role_faculty FROM public.roles WHERE name = 'FACULTY';
    SELECT id INTO role_core FROM public.roles WHERE name = 'CORE';
    SELECT id INTO role_advisory FROM public.roles WHERE name = 'ADVISORY';
    SELECT id INTO role_lead FROM public.roles WHERE name = 'TEAM_LEAD';
    SELECT id INTO role_member FROM public.roles WHERE name = 'TEAM_MEMBER';
    SELECT id INTO role_general FROM public.roles WHERE name = 'GENERAL_MEMBER';

    -- Resolve Teams
    SELECT id INTO team_faculty FROM public.teams WHERE slug = 'faculty';
    SELECT id INTO team_core FROM public.teams WHERE slug = 'core';
    SELECT id INTO team_advisory FROM public.teams WHERE slug = 'advisory';
    SELECT id INTO team_graphics FROM public.teams WHERE slug = 'graphics';
    SELECT id INTO team_technical FROM public.teams WHERE slug = 'technical';
    SELECT id INTO team_event FROM public.teams WHERE slug = 'event-management';
    SELECT id INTO team_documentation FROM public.teams WHERE slug = 'documentation';
    SELECT id INTO team_publicity FROM public.teams WHERE slug = 'publicity';
    SELECT id INTO team_general FROM public.teams WHERE slug = 'general-members';

    -- 1. Faculty User
    INSERT INTO public.users (email, full_name, primary_role_id, skills)
    VALUES ('faculty@csi.college.edu', 'Dr. Ramesh Sharma (Faculty Patron)', role_faculty, ARRAY['Governance', 'Mentorship'])
    ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name
    RETURNING id INTO u_faculty;

    -- 2. Core Lead User
    INSERT INTO public.users (email, full_name, primary_role_id, skills)
    VALUES ('core@csi.college.edu', 'Aarav Mehta (Core President)', role_core, ARRAY['Operations', 'Strategy', 'Coordination'])
    ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name
    RETURNING id INTO u_core;

    -- 3. Advisory User
    INSERT INTO public.users (email, full_name, primary_role_id, skills)
    VALUES ('advisory@csi.college.edu', 'Pooja Iyer (Senior Advisor)', role_advisory, ARRAY['Advisory', 'Alumni Relations'])
    ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name
    RETURNING id INTO u_advisory;

    -- 4. Graphics Lead User
    INSERT INTO public.users (email, full_name, primary_role_id, skills)
    VALUES ('graphics.lead@csi.college.edu', 'Siddharth Roy (Graphics Lead)', role_lead, ARRAY['Photoshop', 'Illustrator', 'Figma'])
    ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name
    RETURNING id INTO u_graphics_lead;

    -- 5. Technical Member User
    INSERT INTO public.users (email, full_name, primary_role_id, skills)
    VALUES ('tech.member@csi.college.edu', 'Neha Gupta (Technical Developer)', role_member, ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL'])
    ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name
    RETURNING id INTO u_tech_member;

    -- 6. General Member User
    INSERT INTO public.users (email, full_name, primary_role_id, skills)
    VALUES ('general.member@csi.college.edu', 'Karan Verma (General Member)', role_general, ARRAY['Event Volunteer'])
    ON CONFLICT (email) DO UPDATE SET full_name = EXCLUDED.full_name
    RETURNING id INTO u_general;

    -- Assign Team Memberships
    -- Faculty in Faculty Team
    INSERT INTO public.team_members (user_id, team_id, role_id, is_team_lead)
    VALUES (u_faculty, team_faculty, role_faculty, TRUE)
    ON CONFLICT (user_id, team_id) DO NOTHING;

    -- Core in Core Team
    INSERT INTO public.team_members (user_id, team_id, role_id, is_team_lead)
    VALUES (u_core, team_core, role_core, TRUE)
    ON CONFLICT (user_id, team_id) DO NOTHING;

    -- Advisory in Advisory Team
    INSERT INTO public.team_members (user_id, team_id, role_id, is_team_lead)
    VALUES (u_advisory, team_advisory, role_advisory, FALSE)
    ON CONFLICT (user_id, team_id) DO NOTHING;

    -- Graphics Lead in Graphics Team
    INSERT INTO public.team_members (user_id, team_id, role_id, is_team_lead)
    VALUES (u_graphics_lead, team_graphics, role_lead, TRUE)
    ON CONFLICT (user_id, team_id) DO NOTHING;

    -- Tech Member in Technical Team
    INSERT INTO public.team_members (user_id, team_id, role_id, is_team_lead)
    VALUES (u_tech_member, team_technical, role_member, FALSE)
    ON CONFLICT (user_id, team_id) DO NOTHING;

    -- General Member in General Members Team
    INSERT INTO public.team_members (user_id, team_id, role_id, is_team_lead)
    VALUES (u_general, team_general, role_general, FALSE)
    ON CONFLICT (user_id, team_id) DO NOTHING;
END $$;
