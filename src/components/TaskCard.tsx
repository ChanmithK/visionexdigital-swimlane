"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "@/types/task";
import {
  Paperclip,
  MessageCircle,
  AlertTriangle,
  Calendar,
  Video,
  Users,
} from "lucide-react";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? "none" : transition,
  };

  if (isDragging && process.env.NODE_ENV === "development") {
    console.log("Task being dragged:", task.id, task.title);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        bg-white rounded-xl md:rounded-2xl border border-gray-100 p-3 sm:p-4 md:p-5 mb-3 sm:mb-4 
        cursor-grab active:cursor-grabbing
        hover:shadow-md hover:border-gray-200 
        transition-all duration-200 ease-out
        transform-gpu will-change-transform
        ${
          isDragging
            ? "opacity-20 scale-95 shadow-2xl"
            : "shadow-sm hover:scale-[1.02]"
        }
      `}
    >
      {/* Category and Menu */}
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex items-center space-x-2">
          <div
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ${
              task.categoryColor || "bg-gray-500"
            }`}
          ></div>
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
            {task.category}
          </span>
        </div>
        <button className="text-gray-300 hover:text-gray-500 transition-colors p-1">
          <svg
            className="w-3.5 h-3.5 md:w-4 md:h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Task Title */}
      <h3 className="font-semibold text-gray-900 text-sm mb-3 md:mb-4 leading-5">
        {task.title}
      </h3>

      {/* Avatars and Priority */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center">
          {task.avatars &&
            task.avatars.length > 0 &&
            task.avatars.map((avatar, index) => (
              <div
                key={index}
                className="w-6 h-6 md:w-7 md:h-7 bg-gray-800 rounded-full border-2 border-white -ml-1.5 first:ml-0 flex items-center justify-center"
                style={{ zIndex: (task.avatars?.length || 0) - index }}
              >
                <span className="text-white text-xs font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
              </div>
            ))}
        </div>

        {task.dueDate && !task.dueDate.includes("April") && (
          <span className="text-xs text-gray-400 font-medium">
            {task.dueDate}
          </span>
        )}
      </div>

      {/* Image placeholder */}
      {task.hasImage && (
        <div className="w-full h-24 md:h-28 rounded-lg md:rounded-xl mb-3 md:mb-4 overflow-hidden">
          <Image
            src="/Image-placeholder.png"
            alt="Task Image"
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Bottom metrics */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3 md:space-x-4">
          {task.metrics?.attachments && (
            <div className="flex items-center space-x-1.5 text-gray-500">
              <Paperclip className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-medium">{task.metrics.attachments}</span>
            </div>
          )}
          {task.metrics?.comments && (
            <div className="flex items-center space-x-1.5 text-gray-500">
              <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-medium">{task.metrics.comments}</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {task.metrics?.reports && (
            <div className="flex items-center space-x-1 text-red-500">
              <AlertTriangle className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-semibold">
                {task.metrics.reports} Reports
              </span>
            </div>
          )}
          {task.hasGroupCall && (
            <div className="bg-blue-500 text-white px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg text-xs flex items-center space-x-1 font-semibold">
              <Users className="w-3 h-3" strokeWidth={2} />
              <span>Group Call</span>
            </div>
          )}
          {task.hasStream && (
            <div className="bg-blue-500 text-white px-2 py-1 md:px-2.5 md:py-1.5 rounded-lg text-xs flex items-center space-x-1 font-semibold">
              <Video className="w-3 h-3" strokeWidth={2} />
              <span>Stream</span>
            </div>
          )}
          {task.dueDate && task.dueDate.includes("April") && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="font-medium">Due: {task.dueDate}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(TaskCard);
