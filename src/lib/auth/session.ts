import { createClient } from "@/lib/supabase/server";
import type { UserRole } from "@/types/database.types";
import { redirect } from "next/navigation";

export interface UserTeamMembership {
  teamId: string;
  teamName: string;
  teamSlug: string;
  roleName: UserRole;
  isTeamLead: boolean;
}

export interface AuthenticatedUserProfile {
  id: string;
  authUserId: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  primaryRole: UserRole;
  skills: string[];
  memberships: UserTeamMembership[];
}

/**
 * Resolves the currently authenticated user and their profile from PostgreSQL.
 * Returns null if the user is unauthenticated or has no profile yet.
 */
export async function getCurrentUser(): Promise<AuthenticatedUserProfile | null> {
  const supabase = await createClient();

  const {
    data: { user: authUser },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !authUser) {
    return null;
  }

  // Query user profile from public.users with joined role
  const { data: rawUserProfile, error: profileError } = await supabase
    .from("users")
    .select(`
      id,
      auth_user_id,
      full_name,
      email,
      avatar_url,
      skills,
      roles:primary_role_id ( name )
    `)
    .eq("auth_user_id", authUser.id)
    .single();

  const userProfile = rawUserProfile as any;

  if (profileError || !userProfile) {
    return {
      id: authUser.id,
      authUserId: authUser.id,
      email: authUser.email || "",
      fullName: authUser.user_metadata?.full_name || authUser.email || "User",
      avatarUrl: authUser.user_metadata?.avatar_url || null,
      primaryRole: "GENERAL_MEMBER",
      skills: [],
      memberships: [],
    };
  }

  // Query team memberships with joined team and role
  const { data: rawMemberships } = await supabase
    .from("team_members")
    .select(`
      team_id,
      is_team_lead,
      teams:team_id ( id, name, slug ),
      roles:role_id ( name )
    `)
    .eq("user_id", userProfile.id)
    .eq("is_active", true);

  const memberships: UserTeamMembership[] = [];
  if (rawMemberships) {
    for (const tm of rawMemberships as any[]) {
      if (tm.teams && tm.roles) {
        memberships.push({
          teamId: tm.teams.id,
          teamName: tm.teams.name,
          teamSlug: tm.teams.slug,
          roleName: (tm.roles.name || "TEAM_MEMBER") as UserRole,
          isTeamLead: Boolean(tm.is_team_lead),
        });
      }
    }
  }

  const roleName = (userProfile.roles?.name || "GENERAL_MEMBER") as UserRole;

  return {
    id: userProfile.id,
    authUserId: userProfile.auth_user_id,
    email: userProfile.email,
    fullName: userProfile.full_name,
    avatarUrl: userProfile.avatar_url,
    primaryRole: roleName,
    skills: userProfile.skills || [],
    memberships,
  };
}

/**
 * Server-side guard requiring an authenticated user.
 * Redirects to /login if not authenticated.
 */
export async function requireAuth(): Promise<AuthenticatedUserProfile> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

/**
 * Server-side guard requiring one of the specified roles.
 * Redirects or throws if the user does not possess required role.
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<AuthenticatedUserProfile> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.primaryRole)) {
    redirect("/unauthorized");
  }
  return user;
}
