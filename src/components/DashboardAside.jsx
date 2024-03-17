import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Users,
  ClipboardList,
  School,
  LayoutDashboard,
  Notebook,
} from "lucide-react";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { auth, db } from "../firebase.config";
import { setUserResult } from "../app/feartures/userSlice";
import {LogOut as L} from 'lucide-react'
export const DashboardAside = () => {
  const [user, setUser] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const auth = getAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LogOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        return navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user === null) {
        navigate("/");
        return
      } else {
        setUser(user);
      }
    });
  }, [auth]);


  useEffect(() => {
    async function checkUser() {
      const q = query(
        collection(db, "users"),
        where("email", "==", user?.email)
      );

      const querySnapshot = await getDocs(q);

      const x = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (user && user.email) {
        if (x[0].role == "admin") {
          dispatch(setUserResult(x[0]));
          setIsAdminUser(true);
        }
      }

      // return setAssignments(x);
    }
    checkUser();
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => setToggle(!toggle)}
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg   focus:outline-none focus:ring-2 focus:ring-gray-200 "
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
        id="default-sidebar"
        class={`fixed top-0 left-0 z-40 w-64 h-[100vh] transition-transform ${!toggle ? "-translate-x-full" : ""
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul class="space-y-10 font-medium">
            <button
              onClick={() => setToggle(!toggle)}
              className="absolute top-4 right-4  text-gray-500 rounded-lg "
            >
              <svg
                class="w-3 h-3 md:hidden "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <li>
              <Link className="flex items-center space-x-3" to={`/dashboard`}>
                <LayoutDashboard className="text-blue-700"/>
                <span class="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center space-x-3"
                to={`/dashboard/reports`}
              >
                <Notebook className="text-blue-700"/>
                <span class="flex-1 ms-3 whitespace-nowrap">Reports</span>
              </Link>
            </li>
            {isAdminUser && (
              <>
                <li>
                  <Link
                    className="flex items-center space-x-3"
                    to={`/dashboard/assign/jobs`}
                  >
                    <School className="text-blue-700" />
                    <span class="flex-1 ms-3 whitespace-nowrap">
                      Assign task
                    </span>
                  </Link>
                </li>
                {/* <li className="flex items-center space-x-3"></li>{" "} */}
                <li>
                  <Link
                    className="flex items-center space-x-3"
                    to={`/dashboard/manage/jobs`}
                  >
                    <ClipboardList className="text-blue-700"/>
                    <span class="flex-1 ms-3 whitespace-nowrap">
                      Manage tasks
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    className="flex items-center space-x-3"
                    to={`/dashboard/manage/users`}
                  >
                    <Users className="text-blue-700"/>
                    <span class="flex-1 ms-3 whitespace-nowrap">
                      Manage Users
                    </span>
                  </Link>
                </li>

              </>
            )}
          </ul>
        </div>

        <li>
          <Link className="flex items-center space-x-3">
            <div className="absolute bottom-3 left-8 bg-red-700 px-4 py-2  rounded text-white">
              <button onClick={LogOut} className="flex space-x-2"><L /> </button>
            </div>
          </Link>
        </li>
      </aside>
    </div>
  );
};
