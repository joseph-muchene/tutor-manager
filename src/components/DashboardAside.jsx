import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ClipboardList,
  School,
  LayoutDashboard,
  Notebook,
} from "lucide-react";
export const DashboardAside = () => {
  return (
    <div>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200 "
      >
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div
          class="h-full px-3 py-4 overflow-y-auto 
        
        
        
        "
        >
          <ul class="space-y-10 font-medium">
            <li>
              <Link className="flex items-center space-x-3" to={`/dashboard`}>
                <LayoutDashboard />
                <span class="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center space-x-3"
                to={`/dashboard/assign/jobs`}
              >
                <School />
                <span class="flex-1 ms-3 whitespace-nowrap">Assign task</span>
              </Link>
            </li>
            {/* <li className="flex items-center space-x-3"></li>{" "} */}
            <li>
              <Link
                className="flex items-center space-x-3"
                to={`/dashboard/manage/jobs`}
              >
                <ClipboardList />
                <span class="flex-1 ms-3 whitespace-nowrap">Manage tasks</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center space-x-3"
                to={`/dashboard/manage/users`}
              >
                <Users />
                <span class="flex-1 ms-3 whitespace-nowrap">Manage Users</span>
              </Link>
            </li>
            <li>
              <Link className="flex items-center space-x-3" to={`#`}>
                <Notebook />
                <span class="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="absolute bottom-3 left-8 bg-red-500 px-4 py-2 rounded text-white">
          <button>Log out</button>
        </div>
      </aside>
    </div>
  );
};
