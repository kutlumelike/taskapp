export interface Task {
  id?: number;
  title: string;
  description: string;
  duedate?: string;
  status: string;
  priority: string;
  category: string;
  userid?: number;
  assigned_by?: number;
  reminder_date?: string;
}
