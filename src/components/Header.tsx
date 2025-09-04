"use client";

import React from "react";
import { Search, Plus, Bell, User, Sliders } from "lucide-react";
import useTaskStore from "@/store/taskStore";
import Image from "next/image";

const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useTaskStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="bg-white border-b border-gray-100 px-4 sm:px-5 md:px-6 lg:px-6 py-3 sm:py-3.5 md:py-4 lg:py-4 w-full">
      <div className="flex items-center justify-between max-w-full gap-2 md:gap-4">
        {/* Left side - Logo */}
        <div className="flex items-center space-x-2 sm:space-x-2.5 md:space-x-3 lg:space-x-3 flex-shrink-0">
          <Image src="/logo.png" alt="Logo" width={124} height={124} />
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-4 lg:space-x-4 flex-shrink-0">
          <div className="hidden sm:flex md:flex lg:flex flex-1 justify-center max-w-xs md:max-w-md">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 lg:px-6 lg:py-3 rounded-xl flex items-center space-x-1.5 md:space-x-2.5 transition-colors font-semibold text-sm shadow-sm border border-blue-600 whitespace-nowrap">
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              <span className="hidden md:inline lg:inline">
                Create new board
              </span>
              <span className="sm:inline md:hidden">Create</span>
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 sm:left-3.5 md:left-4 lg:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              strokeWidth={2}
            />
            <input
              type="text"
              placeholder="Search tasks"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 sm:pl-10 md:pl-11 lg:pl-11 pr-3 sm:pr-3.5 md:pr-4 lg:pr-4 py-2 sm:py-2.5 md:py-3 lg:py-3 border border-gray-200 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-20 sm:w-28 md:w-64 lg:w-80 text-sm placeholder-gray-400 bg-white transition-all"
            />
          </div>

          {/* Filter */}
          <button className="p-2 sm:p-2.5 md:p-3 lg:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-xl transition-colors">
            <Sliders
              className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5"
              strokeWidth={2}
            />
          </button>

          {/* Notifications */}
          <button className="p-2 sm:p-2.5 md:p-3 lg:p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg sm:rounded-lg md:rounded-xl lg:rounded-xl transition-colors relative">
            <Bell
              className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5"
              strokeWidth={2}
            />
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 flex items-center justify-center font-medium">
              1
            </span>
          </button>

          {/* Profile */}
          <div className="flex items-center">
            <div className="w-8 h-8 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-9 lg:h-9 bg-gray-800 rounded-full flex items-center justify-center">
              <User
                className="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-5 lg:h-5 text-white"
                strokeWidth={2}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
