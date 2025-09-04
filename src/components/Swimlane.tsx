"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task, SwimLaneConfig } from "@/types/task";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

interface SwimlaneProps {
  config: SwimLaneConfig;
  tasks: Task[];
}

const Swimlane: React.FC<SwimlaneProps> = ({ config, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: config.id,
  });

  return (
    <div className="flex flex-col h-full min-w-64 w-64 sm:min-w-72 sm:w-72 md:min-w-80 md:w-80 lg:min-w-80 lg:w-80 flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-3 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3">
          {config.pill ? (
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${config.pill.bgColor} ${config.pill.textColor}`}
            >
              {config.pill.text}
            </span>
          ) : (
            <h2 className="font-semibold text-gray-900 text-base">
              {config.title}
            </h2>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-400 hover:text-gray-600">
            <Plus className="w-4 h-4" strokeWidth={2} />
          </button>
          <button className="text-gray-400 hover:text-gray-600 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div
        ref={setNodeRef}
        className={`
          flex-1 relative
          min-h-64 sm:min-h-80 md:min-h-96 lg:min-h-96 
          transition-all duration-300 ease-in-out
          rounded-xl
          ${
            isOver
              ? "bg-blue-50 border-2 border-blue-300 border-dashed shadow-lg"
              : "border-2 border-transparent"
          }
        `}
      >
        {isOver && (
          <div className="absolute inset-0 bg-blue-50/80 rounded-xl flex items-center justify-center z-10 pointer-events-none">
            <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium text-sm shadow-sm">
              Drop task here
            </div>
          </div>
        )}
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3 sm:space-y-4 md:space-y-4 lg:space-y-4 p-2 min-h-32">
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 sm:h-40 md:h-40 lg:h-40 text-gray-400">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-12 md:h-12 lg:w-12 lg:h-12 rounded-full bg-gray-50 flex items-center justify-center mb-3">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-6 lg:h-6" />
                </div>
                <p className="text-sm text-center">
                  No tasks yet
                  <br />
                  <span className="text-xs">
                    Drop tasks here or click + to add
                  </span>
                </p>
              </div>
            ) : (
              tasks.map((task) => <TaskCard key={task.id} task={task} />)
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
};

export default React.memo(Swimlane);
