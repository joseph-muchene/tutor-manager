import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase.config";
import { setOpen } from "../../app/feartures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import {  EditModal } from "../../components/Modal";
import { useUser } from "../../app/rtkHooks/useUser";
import {toast} from 'react-hot-toast'

function TutorTable() {
  // user from state --- important with redirects
  // console.log("use-x", user);
  const userFromState = useSelector(state => state.user)
  const _ = useUser();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const data = [];
    async function getUsers() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        data.push({ id: doc.id, ...doc.data() });
      });
      setUsers(data);
    }

    getUsers();
  }, []);

  const setEditModal = (data) => {
    if (window.location.pathname.startsWith("/dashboard/manage/users")) {
      dispatch(setOpen("editUser"));
    }

    setUser(data);
  };

 
  const removeUser = async(user) => {
    if(user.role !== "admin"){
      return toast.error("Not authorized")
    }
      try {
        
        if(confirm("Are you sure you want to delete user?")){
          console.log(user)
       await deleteDoc(doc(db, "users", user?.id));
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
      <EditModal isEditingUser={true} user={user} />
 
      <div class="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr className="bg-white border-b  ">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {user?.name}
                </td>
                <td className="px-6 py-4">{user.email} {user.email === userFromState.user.email && "(you)"}</td>
                <td className="px-6 py-4"> {user.role}</td>
                <td className="px-6 py-4">{user.status}</td>
                <td className="px-6 py-4">{user.password}</td>

                <td className="flex space-x-3  px-6 py-4">
                  <button
                    onClick={() => setEditModal(user)}
                    type="button"
                    class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={()=>removeUser(user)}
              
                    class="text-white bg-red-500 ocus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 "
                  >
                    Delete
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

export default TutorTable;
