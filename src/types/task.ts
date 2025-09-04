export type TaskStatus = "todo" | "in-progress" | "approved" | "reject";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  category: string;
  categoryColor?: string;
  dueDate?: string;
  avatars?: string[];
  hasImage?: boolean;
  hasGroupCall?: boolean;
  hasStream?: boolean;
  metrics?: {
    attachments?: number;
    comments?: number;
    reports?: number;
  };
}

export interface SwimLaneConfig {
  id: TaskStatus;
  title: string;
  pill?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
}
