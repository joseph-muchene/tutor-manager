import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import App from "./routes/App";
import Dashboard from "./routes/Dashboard";
import TutorTasks from "./routes/TutorTasks";
import AssignTutors from "./routes/admin/AssignTutors";
import ManageJobs from "./routes/admin/ManageJobs";
import ManageTutors from "./routes/admin/ManageTutors";

import { store } from "./app/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard",
        element: <TutorTasks />,
      },
      {
        path: "/dashboard/assign/jobs",
        element: <AssignTutors />,
      },
      {
        path: "/dashboard/manage/jobs",
        element: <ManageJobs />,
      },
      {
        path: "/dashboard/manage/users",
        element: <ManageTutors />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
