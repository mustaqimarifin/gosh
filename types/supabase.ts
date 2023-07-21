export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      hotline: {
        Row: {
          author_id: string;
          body: string | null;
          id: number;
          parent_id: number | null;
          posted_at: string;
        };
        Insert: {
          author_id: string;
          body?: string | null;
          id?: number;
          parent_id?: number | null;
          posted_at?: string;
        };
        Update: {
          author_id?: string;
          body?: string | null;
          id?: number;
          parent_id?: number | null;
          posted_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "hotline_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hotline_parent_id_fkey";
            columns: ["parent_id"];
            referencedRelation: "hotline";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "hotline_parent_id_fkey";
            columns: ["parent_id"];
            referencedRelation: "hotline_bling";
            referencedColumns: ["id"];
          },
        ];
      };
      pageviews: {
        Row: {
          id: number;
          slug: string;
          view_count: number;
        };
        Insert: {
          id?: number;
          slug: string;
          view_count?: number;
        };
        Update: {
          id?: number;
          slug?: string;
          view_count?: number;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          email: string | null;
          full_name: string | null;
          id: string;
          updated_at: string;
          user_name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id: string;
          updated_at?: string;
          user_name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          email?: string | null;
          full_name?: string | null;
          id?: string;
          updated_at?: string;
          user_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      hotline_bling: {
        Row: {
          author_id: string | null;
          avatar: string | null;
          body: string | null;
          fullname: string | null;
          id: number | null;
          posted_at: string | null;
          username: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "hotline_author_id_fkey";
            columns: ["author_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      increment_page_view: {
        Args: {
          page_slug: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
