import { create } from "zustand";
import { Task, TaskStatus } from "@/types/task";

interface TaskStore {
  tasks: Task[];
  filteredTasks: Task[];
  searchQuery: string;
  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => void;
  setSearchQuery: (query: string) => void;
  initializeTasks: () => void;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design System Update",
    status: "todo",
    category: "Design",
    categoryColor: "bg-blue-500",
    dueDate: "Apr 15",
    avatars: ["A", "B"],
    hasImage: true,
    metrics: {
      attachments: 3,
      comments: 7,
    },
  },
];

const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  searchQuery: "",

  updateTaskStatus: (taskId: string, newStatus: TaskStatus) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      );

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      }

      return { tasks: updatedTasks };
    });
  },

  setSearchQuery: (query: string) => {
    set((state) => {
      const filteredTasks = query
        ? state.tasks.filter(
            (task) =>
              task.title.toLowerCase().includes(query.toLowerCase()) ||
              task.category.toLowerCase().includes(query.toLowerCase())
          )
        : [];

      return { searchQuery: query, filteredTasks };
    });
  },

  initializeTasks: () => {
    if (typeof window !== "undefined") {
      const savedTasks = localStorage.getItem("tasks");
      const tasks = savedTasks ? JSON.parse(savedTasks) : mockTasks;

      if (!savedTasks) {
        localStorage.setItem("tasks", JSON.stringify(mockTasks));
      }

      set({ tasks });
    }
  },
}));

export default useTaskStore;
