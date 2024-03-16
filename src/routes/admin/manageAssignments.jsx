import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase.config";

import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import {toast} from 'react-hot-toast'
import { addTask } from "../../app/feartures/taskSlice";
import { setOpen } from "../../app/feartures/modalSlice";
import { EditModal } from "../../components/Modal";
function ManageAssignment({ authUser, isEditTask }) {
  const [user, setUser] = useState({});
  const [assignments, setAssignments] = useState([]);
  const [assignmentData, setAssignmentData] = useState({});
  const [id, setId] = useState("");
  const calenderState = useSelector((state) => state.calender);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch user once when the component mounts
      onAuthStateChanged(auth, (userData) => {
        setUser(userData);
      });

      // Fetch assignments only if authUser, user.email, and calendar dates exist

    
        const q = query(
          collection(db, "assignments"),
      
        );

        const querySnapshot = await getDocs(q);

        const x = querySnapshot.docs
  .filter(doc => doc.data().assignedTutor === user?.email || doc.data().leadTutor === user?.email)
  .map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

        return setAssignments(x);
      }
      
    

    fetchData();
  }, [authUser, user.email]);

  const setEditModal = (data) => {
    if (window.location.pathname.startsWith("/dashboard/manage")) {
      dispatch(addTask(data));
      return dispatch(setOpen("editTask"));
    }
    dispatch(setOpen("editAssignment"));
    setAssignmentData(data);
  };

 
  const removeAssignment = async(assignment) => {
    if(!user.role == "admin"){
      return toast.error("Not authorized")
    }
      try {
        
        if(confirm("Are you sure you want to delete assignment?")){
       await deleteDoc(doc(db, "assignments", assignment?.id));
       toast.success("Document was removed")

       setTimeout(()=>{
        return window.location.reload()
       },3000)
       
        }else{

      return     toast.error("cancelled")
        }

      } catch (error) {
        console.log("REMOVE ASSIGNMENT ERROR",error)
      }
  }
  return (
    <>
   
      <EditModal data={assignmentData} isEditTask={isEditTask} />
      <div class="relative overflow-x-auto ">
        <table className="  text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase   ">
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
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              //

              //
              <tr className="bg-white border-b " key={assignment?.id}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {assignment.school}
                </td>
                <td className="px-6 py-4">{assignment.leadTutor}</td>
                <td className="px-6 py-4">{assignment.arrivalTime}</td>
                <td className="px-6 py-4">{assignment.assignedTutor}</td>
                <td className="px-6 py-4">{assignment.numberOfLaptops}</td>
                <td className="px-6 py-4">{assignment.comment}</td>
                <td className="px-6 py-4">{assignment.status}</td>

                <td className="flex space-x-3  px-6 py-4">
                  <>
                    <button
                      type="button"
                      onClick={() =>removeAssignment(assignment)}
                      // onClick={() => setDeleteModal(assignment)}
                      disabled={
                        !window.location.pathname.startsWith(
                          "/dashboard/manage"
                        )
                      }
                      class=" py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
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
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ManageAssignment;
