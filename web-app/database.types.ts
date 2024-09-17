export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      femeterics: {
        Row: {
          accessibility: number | null
          bestpractices: number | null
          cumulativelayoutshift: number | null
          endpoint: string | null
          firstcontentfulpaint: number | null
          largestcontentfulpaint: number | null
          performance: number | null
          projectid: number
          speedindex: number | null
          timestamp: string
          timetointeractive: number | null
          totalblockingtime: number | null
          totalbyteweight: number | null
          user_id: number
        }
        Insert: {
          accessibility?: number | null
          bestpractices?: number | null
          cumulativelayoutshift?: number | null
          endpoint?: string | null
          firstcontentfulpaint?: number | null
          largestcontentfulpaint?: number | null
          performance?: number | null
          projectid?: number
          speedindex?: number | null
          timestamp?: string
          timetointeractive?: number | null
          totalblockingtime?: number | null
          totalbyteweight?: number | null
          user_id: number
        }
        Update: {
          accessibility?: number | null
          bestpractices?: number | null
          cumulativelayoutshift?: number | null
          endpoint?: string | null
          firstcontentfulpaint?: number | null
          largestcontentfulpaint?: number | null
          performance?: number | null
          projectid?: number
          speedindex?: number | null
          timestamp?: string
          timetointeractive?: number | null
          totalblockingtime?: number | null
          totalbyteweight?: number | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "femeterics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      metrics: {
        Row: {
          average_payload_size: number | null
          average_response_time: number | null
          concurrent_requests: number | null
          cumulativelayoutshift: number | null
          cwe_id: string | null
          description: string | null
          duration: number | null
          errors: number | null
          external: number | null
          filename: number | null
          firstcontentfulpaint: number | null
          heap_total: number | null
          heap_used: number | null
          largestcontentfulpaint: number | null
          line_number: number | null
          path: string | null
          performance: number | null
          performance_score: number | null
          projectid: number
          request_body_size: number | null
          rss: number | null
          severity: string | null
          speedindex: number | null
          timestamp: string
          title: string | null
          total_requests: number | null
          totalblockingtime: number | null
          user_id: number | null
          userid: string | null
        }
        Insert: {
          average_payload_size?: number | null
          average_response_time?: number | null
          concurrent_requests?: number | null
          cumulativelayoutshift?: number | null
          cwe_id?: string | null
          description?: string | null
          duration?: number | null
          errors?: number | null
          external?: number | null
          filename?: number | null
          firstcontentfulpaint?: number | null
          heap_total?: number | null
          heap_used?: number | null
          largestcontentfulpaint?: number | null
          line_number?: number | null
          path?: string | null
          performance?: number | null
          performance_score?: number | null
          projectid?: number
          request_body_size?: number | null
          rss?: number | null
          severity?: string | null
          speedindex?: number | null
          timestamp?: string
          title?: string | null
          total_requests?: number | null
          totalblockingtime?: number | null
          user_id?: number | null
          userid?: string | null
        }
        Update: {
          average_payload_size?: number | null
          average_response_time?: number | null
          concurrent_requests?: number | null
          cumulativelayoutshift?: number | null
          cwe_id?: string | null
          description?: string | null
          duration?: number | null
          errors?: number | null
          external?: number | null
          filename?: number | null
          firstcontentfulpaint?: number | null
          heap_total?: number | null
          heap_used?: number | null
          largestcontentfulpaint?: number | null
          line_number?: number | null
          path?: string | null
          performance?: number | null
          performance_score?: number | null
          projectid?: number
          request_body_size?: number | null
          rss?: number | null
          severity?: string | null
          speedindex?: number | null
          timestamp?: string
          title?: string | null
          total_requests?: number | null
          totalblockingtime?: number | null
          user_id?: number | null
          userid?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "metrics_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      project: {
        Row: {
          created_at: string
          id: number
          project_name: string
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          project_name: string
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          project_name?: string
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          id: number
          user_email: string
          user_password: string
        }
        Insert: {
          created_at?: string
          id?: number
          user_email: string
          user_password: string
        }
        Update: {
          created_at?: string
          id?: number
          user_email?: string
          user_password?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
