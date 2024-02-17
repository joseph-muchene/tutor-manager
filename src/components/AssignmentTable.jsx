import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setDelete, setOpen } from "../app/feartures/modalSlice";
import { DeleteModal, EditModal } from "./Modal";
function AssignmentTable({ authUser }) {
  const [user, setUser] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [assignmentData, setAssignmentData] = useState({});
  const calenderState = useSelector((state) => state.calender);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      // Fetch user once when the component mounts
      onAuthStateChanged(auth, (userData) => {
        setUser(userData);
      });

      // Fetch assignments only if authUser, user.email, and calendar dates exist
      if (
        authUser &&
        user.email &&
        calenderState.startDate &&
        calenderState.endDate
      ) {
        const startparsedDate = new Date(calenderState.startDate);
        const startunixTimestamp = startparsedDate.getTime() / 1000;
        const endparsedDate = new Date(calenderState.startDate);
        const endunixTimestamp = endparsedDate.getTime() / 1000;
        const q = query(
          collection(db, "assignments"),
          where("leadTutor", "==", user?.email),
          where("dateAssigned", ">=", startunixTimestamp), // Start of the range
          where("dateAssigned", "<=", endunixTimestamp) // End of the range
        );

        const querySnapshot = await getDocs(q);

        const x = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAssignments(x);
      }
      if (!authUser) {
        const q = query(
          collection(db, "assignments"),
          where("leadTutor", "==", user?.email)
        );

        const querySnapshot = await getDocs(q);

        const x = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAssignments(x);
      }
    };

    fetchData();
  }, [authUser, calenderState.startDate, calenderState.endDate, user.email]);

  const setEditModal = (data) => {
    dispatch(setOpen("editAssignment"));
    setAssignmentData(data);
  };

  const setDeleteModal = () => {
    dispatch(setDelete());
  };
  return (
    <>
      <EditModal data={assignmentData} />
      <DeleteModal />
      <div class="relative overflow-x-auto ">
        <table className="  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                School
              </th>
              <th scope="col" className="px-6 py-3">
                Lead Tutor
              </th>
              <th scope="col" className="px-6 py-3">
                Arrival Time
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned Tutor
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned Number of Laptops
              </th>
              <th scope="col" className="px-6 py-3">
                Comments
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              //

              //
              <tr className="bg-white border-b ">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {assignment.school}
                </td>
                <td className="px-6 py-4">{assignment.leadTutor}</td>
                <td className="px-6 py-4">{assignment.arrivalTime}</td>
                <td className="px-6 py-4">{assignment.assignedTutor}</td>
                <td className="px-6 py-4">{assignment.numberOfLaptops}</td>
                <td className="px-6 py-4">{assignment.comments}</td>
                <td className="px-6 py-4">{assignment.status}</td>

                <td className="flex space-x-3  px-6 py-4">
                  <button
                    type="button"
                    onClick={() => setDeleteModal(assignment)}
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setEditModal(assignment)}
                    type="button"
                    class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 "
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AssignmentTable;
