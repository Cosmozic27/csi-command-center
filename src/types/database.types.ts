export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole =
  | "FACULTY"
  | "CORE"
  | "ADVISORY"
  | "TEAM_LEAD"
  | "TEAM_MEMBER"
  | "GENERAL_MEMBER";

export type TaskStatus =
  | "TODO"
  | "IN_PROGRESS"
  | "UNDER_REVIEW"
  | "COMPLETED"
  | "BLOCKED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export type ApprovalStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "CHANGES_REQUESTED";

export type ApprovalStage =
  | "TEAM_REVIEW"
  | "CORE_REVIEW"
  | "FACULTY_REVIEW";

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          auth_user_id: string;
          full_name: string;
          email: string;
          avatar_url: string | null;
          phone: string | null;
          bio: string | null;
          skills: string[] | null;
          primary_role_id: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          auth_user_id: string;
          full_name: string;
          email: string;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          primary_role_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          auth_user_id?: string;
          full_name?: string;
          email?: string;
          avatar_url?: string | null;
          phone?: string | null;
          bio?: string | null;
          skills?: string[] | null;
          primary_role_id?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "users_primary_role_id_fkey";
            columns: ["primary_role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          }
        ];
      };
      roles: {
        Row: {
          id: string;
          name: UserRole;
          description: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: UserRole;
          description?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: UserRole;
          description?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      teams: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          id: string;
          user_id: string;
          team_id: string;
          role_id: string;
          is_team_lead: boolean;
          joined_at: string;
          left_at: string | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          user_id: string;
          team_id: string;
          role_id: string;
          is_team_lead?: boolean;
          joined_at?: string;
          left_at?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          user_id?: string;
          team_id?: string;
          role_id?: string;
          is_team_lead?: boolean;
          joined_at?: string;
          left_at?: string | null;
          is_active?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "team_members_role_id_fkey";
            columns: ["role_id"];
            isOneToOne: false;
            referencedRelation: "roles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_members_team_id_fkey";
            columns: ["team_id"];
            isOneToOne: false;
            referencedRelation: "teams";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "team_members_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          project_id: string | null;
          event_id: string | null;
          assigned_team_id: string | null;
          assigned_user_id: string | null;
          created_by: string;
          status: TaskStatus;
          priority: TaskPriority;
          task_type: string | null;
          start_date: string | null;
          due_date: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          project_id?: string | null;
          event_id?: string | null;
          assigned_team_id?: string | null;
          assigned_user_id?: string | null;
          created_by: string;
          status?: TaskStatus;
          priority?: TaskPriority;
          task_type?: string | null;
          start_date?: string | null;
          due_date?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          project_id?: string | null;
          event_id?: string | null;
          assigned_team_id?: string | null;
          assigned_user_id?: string | null;
          created_by?: string;
          status?: TaskStatus;
          priority?: TaskPriority;
          task_type?: string | null;
          start_date?: string | null;
          due_date?: string | null;
          completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Team = Database["public"]["Tables"]["teams"]["Row"];
export type UserProfile = Database["public"]["Tables"]["users"]["Row"];
export type Role = Database["public"]["Tables"]["roles"]["Row"];
export type TeamMember = Database["public"]["Tables"]["team_members"]["Row"];
