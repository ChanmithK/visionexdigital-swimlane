"use client";

import React, { useEffect } from "react";
import useTaskStore from "@/store/taskStore";
import { TaskStatus, SwimLaneConfig } from "@/types/task";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProjectHeader from "./ProjectHeader";
import Swimlane from "./Swimlane";

const swimlaneConfigs: SwimLaneConfig[] = [
  {
    id: "todo",
    title: "To Do",
  },
  {
    id: "in-progress",
    title: "In Progress",
    pill: {
      text: "In Progress",
      bgColor: "bg-orange-400",
      textColor: "text-white",
    },
  },
  {
    id: "approved",
    title: "Approved",
    pill: {
      text: "Approved",
      bgColor: "bg-green-500",
      textColor: "text-white",
    },
  },
  {
    id: "reject",
    title: "Reject",
    pill: {
      text: "Reject",
      bgColor: "bg-red-500",
      textColor: "text-white",
    },
  },
];

const Dashboard: React.FC = () => {
  const { tasks, filteredTasks, searchQuery, initializeTasks } = useTaskStore();

  useEffect(() => {
    initializeTasks();
  }, [initializeTasks]);

  const displayTasks = React.useMemo(() => {
    return searchQuery ? filteredTasks : tasks;
  }, [searchQuery, filteredTasks, tasks]);

  const getTasksByStatus = React.useCallback(
    (status: TaskStatus) => {
      return displayTasks.filter((task) => task.status === status);
    },
    [displayTasks]
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header - Full Width */}
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile, visible on tablet (640px+) */}
        <div className="hidden sm:flex md:flex lg:flex flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Project Header */}
          <ProjectHeader />

          {/* Board Content */}
          <div className="flex-1 bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-6 overflow-hidden">
            <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-6 overflow-x-auto pb-4 md:pb-6 h-full">
              {swimlaneConfigs.map((config) => {
                const swimlaneTasks = getTasksByStatus(config.id);

                return (
                  <Swimlane
                    key={config.id}
                    config={config}
                    tasks={swimlaneTasks}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center py-16 text-gray-500 pointer-events-none z-10 bg-white/80">
          <div className="text-lg font-medium mb-2">No tasks yet</div>
          <p className="text-sm text-center max-w-md px-4">
            Your task board is empty. Tasks will be loaded from the mock data
            file automatically. Try refreshing the page if you don&apos;t see
            any tasks.
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
