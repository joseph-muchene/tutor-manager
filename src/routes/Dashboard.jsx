import React, { useState } from "react";
import { DashboardAside } from "../components/DashboardAside";
import { Calender } from "../components/Calender";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import TutorTable from "../components/TutorTable";
import { Outlet } from "react-router-dom";

function Dashboard() {

  return (
    <div>
      <DashboardAside />

      <div class="p-4 sm:ml-64 ">
        <div class="p-4 rounded-lg ">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
