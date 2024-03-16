import React from "react";
import { DashboardAside } from "../components/DashboardAside";

import { Outlet } from "react-router-dom";
import Notify from "../components/Notify";

function Dashboard() {
  return (
    <div>

      <DashboardAside />


      <div class="p-4 sm:ml-64 ">
        <div class="p-4 rounded-lg ">
          <div className="flex justify-end">
            <Notify />
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
