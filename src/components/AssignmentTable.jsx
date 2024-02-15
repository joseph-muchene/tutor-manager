import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

function AssignmentTable({ authUser }) {
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (user) => {
    setUser(user);
  });
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    const data = [];
    async function getAssignments() {
      if (authUser) {
        const q = query(
          collection(db, "assignments"),
          where("leadTutor", "==", user?.email)
        );

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots

          data.push({ id: doc.id, ...doc.data() });
        });
        setAssignments(data);
      }
      const querySnapshot = await getDocs(collection(db, "assignments"));

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        data.push({ id: doc.id, ...doc.data() });
      });
      setAssignments(data);
    }

    getAssignments();
  }, [user]);

  return (
    <div className="relative overflow-x-scroll md:overflow-x-scroll">
      <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {assignment.school}
              </td>
              <td className="px-6 py-4">{assignment.leadTutor}</td>
              <td className="px-6 py-4">{assignment.arrivalTime}</td>
              <td className="px-6 py-4">{assignment.assignedTutor}</td>
              <td className="px-6 py-4">{assignment.numberOfLaptops}</td>
              <td className="px-6 py-4">{assignment.comments}</td>
              <td className="px-6 py-4">{assignment.status}</td>

              <td className="flex space-x-3  px-6 py-4">
                <button>Delete</button>
                <button>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AssignmentTable;
