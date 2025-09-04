"use client";

import React from "react";
import { Link2 } from "lucide-react";

const ProjectHeader: React.FC = () => {
  const teamMembers = [
    { id: 1, name: "John" },
    { id: 2, name: "Jane" },
    { id: 3, name: "Mike" },
  ];

  return (
    <div className="bg-white px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8 border-b border-gray-100">
      <div className="flex items-start justify-between">
        {/* Left side - Project info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 mb-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
              Sport Xi Project
            </h1>
            <span className="bg-orange-400 text-white text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full w-fit">
              In progress
            </span>
          </div>

          <p className="text-gray-400 mb-4 sm:mb-6 md:mb-8 text-sm lowercase tracking-wide">
            event production
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 md:space-x-8">
            {/* Assigned team */}
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <span className="text-sm text-gray-500 font-medium lowercase">
                assigned
              </span>
              <div className="flex items-center">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gray-800 rounded-full border-2 border-white -ml-1.5 first:ml-0 flex items-center justify-center"
                    style={{ zIndex: teamMembers.length - index }}
                  >
                    <span className="text-white text-xs font-semibold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                ))}
                <span className="ml-2 sm:ml-3 text-sm text-gray-600 font-semibold">
                  +2
                </span>
              </div>
            </div>

            {/* Manage button */}
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
              <span>Manage</span>
              <Link2 className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4 sm:mt-6 md:mt-8 lowercase">
            Last updated on 04 April, 2022
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
