export interface Notification {
  id: number;
  user_id: number;
  workspace_id?: number;
  workspace_name?: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}
