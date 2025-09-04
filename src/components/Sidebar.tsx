"use client";

import React from "react";
import {
  LayoutDashboard,
  Folder,
  MessageCircle,
  Calendar,
  Users,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [boardsExpanded, setBoardsExpanded] = React.useState(true);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    {
      icon: Folder,
      label: "Boards",
      expandable: true,
      expanded: boardsExpanded,
    },
    { icon: MessageCircle, label: "Messages", badge: 3 },
    { icon: Calendar, label: "Calendar" },
    { icon: Users, label: "Team members" },
    { icon: HelpCircle, label: "Support" },
  ];

  const subItems = [
    "Create routes",
    "Delopment React App",
    "Sport XI Project",
    "Wordpress theme",
  ];

  return (
    <div className="bg-white h-screen w-64 max-w-64 border-r border-gray-100 flex flex-col flex-shrink-0">
      {/* Workspace Header */}
      <div className="px-5 py-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center">
            <Image src="/Image-team.png" alt="Logo" width={124} height={124} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">
                  Workspace
                </p>
                <p className="font-semibold text-gray-900 text-sm mt-1 truncate">
                  Root folder
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-5">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-colors group
                  ${
                    item.active
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
                onClick={() => {
                  if (item.expandable) {
                    setBoardsExpanded(!boardsExpanded);
                  }
                }}
              >
                <div className="flex items-center space-x-3">
                  <item.icon
                    className={`w-5 h-5 ${
                      item.active
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-600"
                    }`}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item.badge}
                    </span>
                  )}
                  {item.expandable && (
                    <ChevronRight
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        item.expanded ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </div>
              </button>

              {/* Sub-items for Boards */}
              {item.expandable && item.expanded && (
                <ul className="mt-2 ml-9 space-y-1">
                  {subItems.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <button
                        className={`
                        w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors
                        ${
                          subItem === "Sport XI Project"
                            ? "text-blue-600 font-medium bg-blue-50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                        }
                      `}
                      >
                        {subItem}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-4 py-5 border-t border-gray-100">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors group">
          <LogOut className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
