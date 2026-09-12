import type { UserRole } from "@/types/database.types";
import type { AuthenticatedUserProfile } from "./session";

/**
 * Role hierarchy order for privilege comparison
 */
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  FACULTY: 100,
  CORE: 80,
  ADVISORY: 60,
  TEAM_LEAD: 40,
  TEAM_MEMBER: 20,
  GENERAL_MEMBER: 10,
};

/**
 * Checks whether user can access the executive Command Center (Faculty and Core only)
 */
export function canAccessCommandCenter(role: UserRole): boolean {
  return role === "FACULTY" || role === "CORE";
}

/**
 * Checks whether user can access a specific team portal.
 * Faculty and Core can access ALL team portals.
 * Other roles must have an active membership in that team.
 */
export function canAccessTeamPortal(user: AuthenticatedUserProfile, teamSlug: string): boolean {
  if (user.primaryRole === "FACULTY" || user.primaryRole === "CORE") {
    return true;
  }
  return user.memberships.some((m) => m.teamSlug === teamSlug);
}

/**
 * Checks whether user has operational management authority over a team.
 * Faculty and Core can manage all teams.
 * Team Leads can manage only their assigned team.
 */
export function canManageTeam(user: AuthenticatedUserProfile, teamSlug: string): boolean {
  if (user.primaryRole === "FACULTY" || user.primaryRole === "CORE") {
    return true;
  }
  return user.memberships.some((m) => m.teamSlug === teamSlug && m.isTeamLead);
}

/**
 * Checks whether user can review/approve work at the designated stage.
 */
export function canApproveStage(
  user: AuthenticatedUserProfile,
  stage: "TEAM_REVIEW" | "CORE_REVIEW" | "FACULTY_REVIEW",
  teamSlug?: string
): boolean {
  if (user.primaryRole === "FACULTY") {
    return true;
  }
  if (stage === "FACULTY_REVIEW") {
    return false;
  }
  if (user.primaryRole === "CORE") {
    return true;
  }
  if (stage === "CORE_REVIEW") {
    return false;
  }
  if (stage === "TEAM_REVIEW" && teamSlug) {
    return canManageTeam(user, teamSlug);
  }
  return false;
}

/**
 * Determines the default landing route after successful authentication based on role
 */
export function getDefaultDashboardRoute(user: AuthenticatedUserProfile): string {
  if (canAccessCommandCenter(user.primaryRole)) {
    return "/command-center";
  }
  if (user.memberships.length > 0) {
    const leadMembership = user.memberships.find((m) => m.isTeamLead);
    const primaryTeam = leadMembership || user.memberships[0];
    return `/portals/${primaryTeam.teamSlug}`;
  }
  return "/dashboard";
}
