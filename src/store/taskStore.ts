"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task, TaskStore, TaskStatus } from "@/types/task";
import taskData from "@/data/tasks.json";

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      searchQuery: "",
      filteredTasks: [],

      setTasks: (tasks: Task[]) => {
        set({ tasks });
        get().filterTasks();
      },

      setSearchQuery: (query: string) => {
        set({ searchQuery: query });
        get().filterTasks();
      },

      updateTaskStatus: (taskId: string, newStatus: TaskStatus) => {
        const { tasks } = get();

        console.log("Store: Updating task status:", {
          taskId,
          newStatus,
          totalTasks: tasks.length,
        });

        // Validate inputs
        if (!taskId || !newStatus) {
          console.error("Store: Invalid parameters:", { taskId, newStatus });
          return;
        }

        // Find the task index
        const taskIndex = tasks.findIndex((task) => task.id === taskId);
        if (taskIndex === -1) {
          console.error("Store: Task not found:", taskId);
          return;
        }

        // Create updated tasks array with the new status
        const updatedTasks = tasks.map((task, index) =>
          index === taskIndex ? { ...task, status: newStatus } : task
        );

        console.log("Store: Task updated successfully:", {
          taskId,
          oldStatus: tasks[taskIndex].status,
          newStatus,
          taskTitle: tasks[taskIndex].title,
        });

        set({ tasks: updatedTasks });
        get().filterTasks();
      },

      addTask: (taskData: Omit<Task, "id" | "createdAt">) => {
        const { tasks } = get();
        const newTask: Task = {
          ...taskData,
          id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString().split("T")[0],
        };
        const updatedTasks = [...tasks, newTask];
        set({ tasks: updatedTasks });
        get().filterTasks();
      },

      removeTask: (taskId: string) => {
        const { tasks } = get();
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        set({ tasks: updatedTasks });
        get().filterTasks();
      },

      filterTasks: () => {
        const { tasks, searchQuery } = get();

        console.log("Store: Filtering tasks:", {
          totalTasks: tasks.length,
          searchQuery,
        });

        if (!searchQuery.trim()) {
          set({ filteredTasks: [...tasks] });
          return;
        }

        const filtered = tasks.filter(
          (task) =>
            task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            task.assignee?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        console.log("Store: Tasks filtered:", {
          filteredCount: filtered.length,
        });
        set({ filteredTasks: filtered });
      },

      initializeTasks: () => {
        const { tasks } = get();
        if (tasks.length === 0) {
          const validatedTasks = (taskData.tasks as Task[]).map((task) => ({
            ...task,
            avatars: task.avatars || [],
            metrics: task.metrics || {},
            categoryColor: task.categoryColor || "bg-gray-500",
          }));
          set({ tasks: validatedTasks });
          get().filterTasks();
        }
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        tasks: state.tasks,
        searchQuery: state.searchQuery,
      }),
    }
  )
);

export default useTaskStore;
