-- ==============================================================================
-- CSI COMMAND CENTER - DATABASE MIGRATION
-- Migration: 20260912000001_phase1_auth_rbac.sql
-- Phase: 1 (Database + Authentication + RBAC Foundation)
-- Tables: roles, teams, users, team_members
-- ==============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ROLES TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial 6 core roles
INSERT INTO public.roles (name, description) VALUES
    ('FACULTY', 'Complete organization access and administrative governance'),
    ('CORE', 'Organization-wide operational access and cross-team coordination'),
    ('ADVISORY', 'Advisory review, feedback and monitoring permissions'),
    ('TEAM_LEAD', 'Full operational control and task delegation within own team'),
    ('TEAM_MEMBER', 'Standard operational access within assigned team and work'),
    ('GENERAL_MEMBER', 'Limited participation in public events and permitted projects')
ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description;

-- ==============================================================================
-- 2. TEAMS TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial 9 committee teams
INSERT INTO public.teams (name, slug, description, icon) VALUES
    ('Faculty Team', 'faculty', 'Faculty advisors supervising committee governance', 'Shield'),
    ('Core Team', 'core', 'Executive student body coordinating cross-team initiatives', 'Cpu'),
    ('Advisory Team', 'advisory', 'Senior advisors and mentors providing strategic guidance', 'Lightbulb'),
    ('Graphics Team', 'graphics', 'Visual designs, branding, posters and social media creatives', 'Palette'),
    ('Event Management Team', 'event-management', 'Logistics, event operations, venues and schedules', 'Calendar'),
    ('Technical Team', 'technical', 'Software engineering, websites, systems and hackathons', 'Code'),
    ('Documentation Team', 'documentation', 'Meeting minutes, reports, archives and certificates', 'FileText'),
    ('Publicity Team', 'publicity', 'Social media marketing, PR campaigns and outreach', 'Megaphone'),
    ('General Members', 'general-members', 'Committee student members and volunteers', 'Users')
ON CONFLICT (slug) DO UPDATE SET 
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    icon = EXCLUDED.icon;

-- ==============================================================================
-- 3. USERS PROFILE TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    bio TEXT,
    skills TEXT[] DEFAULT '{}'::text[],
    primary_role_id UUID REFERENCES public.roles(id),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 4. TEAM MEMBERSHIP TABLE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.team_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES public.roles(id) ON DELETE RESTRICT,
    is_team_lead BOOLEAN DEFAULT FALSE NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    left_at TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    CONSTRAINT uq_user_team UNIQUE (user_id, team_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_auth_user_id ON public.users(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user ON public.team_members(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_role ON public.team_members(role_id);

-- ==============================================================================
-- 5. AUTOMATED TIMESTAMPS & AUTH TRIGGER
-- ==============================================================================

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_users_updated_at ON public.users;
CREATE TRIGGER tr_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS tr_teams_updated_at ON public.teams;
CREATE TRIGGER tr_teams_updated_at
    BEFORE UPDATE ON public.teams
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to create public.users profile when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
DECLARE
    default_role_id UUID;
BEGIN
    -- Resolve default role (GENERAL_MEMBER)
    SELECT id INTO default_role_id FROM public.roles WHERE name = 'GENERAL_MEMBER' LIMIT 1;

    INSERT INTO public.users (
        auth_user_id,
        email,
        full_name,
        avatar_url,
        primary_role_id
    ) VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        NEW.raw_user_meta_data->>'avatar_url',
        default_role_id
    )
    ON CONFLICT (auth_user_id) DO UPDATE SET
        email = EXCLUDED.email,
        full_name = EXCLUDED.full_name;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_auth_user();

-- ==============================================================================
-- 6. RBAC SECURITY HELPER FUNCTIONS
-- ==============================================================================

-- Get user's primary role name
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT r.name INTO user_role
    FROM public.users u
    JOIN public.roles r ON u.primary_role_id = r.id
    WHERE u.auth_user_id = auth.uid();

    RETURN COALESCE(user_role, 'ANONYMOUS');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Check if current authenticated user is Faculty
CREATE OR REPLACE FUNCTION public.is_faculty()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (SELECT public.get_auth_role() = 'FACULTY');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Check if current authenticated user is Core
CREATE OR REPLACE FUNCTION public.is_core()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (SELECT public.get_auth_role() IN ('FACULTY', 'CORE'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Check if user is a member of a specific team
CREATE OR REPLACE FUNCTION public.is_member_of_team(target_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.team_members tm
        JOIN public.users u ON tm.user_id = u.id
        WHERE u.auth_user_id = auth.uid()
          AND tm.team_id = target_team_id
          AND tm.is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Check if user is a Team Lead of a specific team
CREATE OR REPLACE FUNCTION public.is_lead_of_team(target_team_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM public.team_members tm
        JOIN public.users u ON tm.user_id = u.id
        WHERE u.auth_user_id = auth.uid()
          AND tm.team_id = target_team_id
          AND tm.is_team_lead = TRUE
          AND tm.is_active = TRUE
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ==============================================================================
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all Phase 1 tables
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- ROLES POLICIES
CREATE POLICY "Allow authenticated read on roles"
    ON public.roles FOR SELECT
    TO authenticated
    USING (TRUE);

CREATE POLICY "Allow faculty to modify roles"
    ON public.roles FOR ALL
    TO authenticated
    USING (public.is_faculty())
    WITH CHECK (public.is_faculty());

-- TEAMS POLICIES
CREATE POLICY "Allow authenticated read on teams"
    ON public.teams FOR SELECT
    TO authenticated
    USING (is_active = TRUE OR public.is_core());

CREATE POLICY "Allow faculty to manage teams"
    ON public.teams FOR ALL
    TO authenticated
    USING (public.is_faculty())
    WITH CHECK (public.is_faculty());

-- USERS POLICIES
CREATE POLICY "Allow authenticated read on active users"
    ON public.users FOR SELECT
    TO authenticated
    USING (is_active = TRUE OR public.is_core());

CREATE POLICY "Allow users to update own profile"
    ON public.users FOR UPDATE
    TO authenticated
    USING (auth_user_id = auth.uid())
    WITH CHECK (auth_user_id = auth.uid());

CREATE POLICY "Allow faculty full management on users"
    ON public.users FOR ALL
    TO authenticated
    USING (public.is_faculty())
    WITH CHECK (public.is_faculty());

-- TEAM MEMBERS POLICIES
CREATE POLICY "Allow authenticated read on team_members"
    ON public.team_members FOR SELECT
    TO authenticated
    USING (
        public.is_core() OR
        public.is_member_of_team(team_id) OR
        user_id = (SELECT id FROM public.users WHERE auth_user_id = auth.uid())
    );

CREATE POLICY "Allow faculty and core to manage team_members"
    ON public.team_members FOR ALL
    TO authenticated
    USING (public.is_core())
    WITH CHECK (public.is_core());

CREATE POLICY "Allow team leads to manage own team members"
    ON public.team_members FOR ALL
    TO authenticated
    USING (public.is_lead_of_team(team_id))
    WITH CHECK (public.is_lead_of_team(team_id));
