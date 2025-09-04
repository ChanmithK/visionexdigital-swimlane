"use client";

import React, { useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
  rectIntersection,
  pointerWithin,
  CollisionDetection,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import useTaskStore from "@/store/taskStore";
import { TaskStatus, SwimLaneConfig, Task } from "@/types/task";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProjectHeader from "./ProjectHeader";
import Swimlane from "./Swimlane";
import TaskCard from "./TaskCard";

const swimlaneConfigs: SwimLaneConfig[] = [
  {
    id: "todo",
    title: "To Do",
    pill: {
      text: "To Do",
      bgColor: "bg-gray-200",
      textColor: "text-gray-700",
    },
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
  const {
    tasks,
    filteredTasks,
    searchQuery,
    updateTaskStatus,
    initializeTasks,
  } = useTaskStore();

  const [activeTask, setActiveTask] = React.useState<Task | null>(null);

  // Custom collision detection for better drop zone detection
  const customCollisionDetection: CollisionDetection = React.useCallback(
    (args) => {
      const pointerIntersections = pointerWithin(args);

      if (pointerIntersections.length > 0) {
        return pointerIntersections;
      }

      return rectIntersection(args);
    },
    []
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Initialize tasks on component mount
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

  const handleDragStart = (event: DragStartEvent) => {
    const taskId = event.active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    setActiveTask(task || null);

    if (process.env.NODE_ENV === "development") {
      console.log("Drag started:", event.active.id);
    }
  };

  const handleDragOver = () => {};

  const handleDragCancel = () => {
    setActiveTask(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (process.env.NODE_ENV === "development") {
      console.log("Drag end:", { activeId: active.id, overId: over?.id });
    }

    if (!over) {
      if (process.env.NODE_ENV === "development") {
        console.log("No drop target found");
      }
      return;
    }

    const taskId = active.id as string;
    const newStatus = over.id as TaskStatus;

    const validStatuses: TaskStatus[] = [
      "todo",
      "in-progress",
      "approved",
      "reject",
    ];
    if (!validStatuses.includes(newStatus)) {
      if (process.env.NODE_ENV === "development") {
        console.log("Invalid drop target:", newStatus);
      }
      return;
    }

    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
      if (process.env.NODE_ENV === "development") {
        console.error("Task not found:", taskId);
      }
      return;
    }

    if (task.status === newStatus) {
      if (process.env.NODE_ENV === "development") {
        console.log("Task already in target status");
      }
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("Updating task status:", {
        taskId,
        from: task.status,
        to: newStatus,
      });
    }

    // Update the task status
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden sm:flex md:flex lg:flex flex-shrink-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Project Header */}
          <ProjectHeader />

          {/* Board Content */}
          <div className="flex-1 bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-6 overflow-hidden">
            <DndContext
              sensors={sensors}
              collisionDetection={customCollisionDetection}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <div className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-6 overflow-x-auto pb-4 md:pb-6 h-full">
                {swimlaneConfigs.map((config) => {
                  const swimlaneTasks = getTasksByStatus(config.id);
                  if (process.env.NODE_ENV === "development") {
                    console.log(`Rendering swimlane ${config.id}:`, {
                      taskCount: swimlaneTasks.length,
                    });
                  }

                  return (
                    <Swimlane
                      key={config.id}
                      config={config}
                      tasks={swimlaneTasks}
                    />
                  );
                })}
              </div>

              <DragOverlay>
                {activeTask ? (
                  <div className="rotate-6 scale-105 opacity-95">
                    <TaskCard task={activeTask} />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
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
