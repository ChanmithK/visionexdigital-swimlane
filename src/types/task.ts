export type TaskStatus = "todo" | "in-progress" | "approved" | "reject";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  category: string;
  categoryColor?: string;
  avatars?: string[];
  metrics?: {
    attachments?: number;
    comments?: number;
    reports?: number;
  };
  hasImage?: boolean;
  hasGroupCall?: boolean;
  hasStream?: boolean;
  createdAt: string;
}

export interface TaskStore {
  tasks: Task[];
  searchQuery: string;
  filteredTasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setSearchQuery: (query: string) => void;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  removeTask: (taskId: string) => void;
  filterTasks: () => void;
  initializeTasks: () => void;
}

export interface SwimLaneConfig {
  id: TaskStatus;
  title: string;
  headerStyle?: string;
  pill?: {
    text: string;
    bgColor: string;
    textColor: string;
  };
}
