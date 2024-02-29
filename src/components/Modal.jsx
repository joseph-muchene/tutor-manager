import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setOpen } from "../app/feartures/modalSlice";
import AssignmentTable from "./AssignmentTable";
import AssignTutors from "../routes/admin/AssignTutors";
import { db } from "../firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import UpdateUser from "./UpdateUser";
import UpdateAssignment from "./UpdateAssignment";
export function EditModal({ data, isEditingUser, user, isEditTask }) {
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const { open, key, state } = useSelector((state) => state.modal);

  const dispatch = useDispatch();

 
  return (
    <div>
      <div
        class={`${
          open && key == "edit" ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-2xl max-h-full">
          <div class="relative bg-white rounded-lg shadow ">
            <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <button
                type="button"
                onClick={() => dispatch(setOpen())}
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  class="w-3 h-3"
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
                <span class="sr-only">Close modal</span>
              </button>
            </div>

            <div class="p-4 md:p-5 space-y-4">
              {state == "editAssignment" &&
                EditAssignment(
                  data?.key,
                  setStatus,
                  setComment,
                  comment,
                  status
                )}
              {state == "editTask" && EditTask(isEditTask)}

              {state === "editUser" && <UpdateUser user={user} />}
            </div>

            <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                data-modal-hide="default-modal"
                type="button"
                onClick={() => dispatch(setOpen())}
                class="bg-red-600 py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100   "
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DeleteModal = () => {
  const { open, key } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  return (
    <div>
      <div
        id="popup-modal"
        tabindex="-1"
        class={`${
          open && key == "delete" ? "" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div class="relative p-4 w-full max-w-md max-h-full">
          <div class="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              onClick={() => dispatch(setOpen())}
              class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                class="w-3 h-3"
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
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-4 md:p-5 text-center">
              <svg
                class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this product?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={() => dispatch(setOpen())}
                class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function EditAssignment(key, setStatus, setComment, comment, status) {
  const handleChange = (e) => {
    try {
      setStatus(e.target.value);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCommentChange = (e) => {
    try {
      setComment(e.target.value);
    } catch (error) {
      console.log(error.message);
    }
  };
  // here update the  assignment...
  //{

  // get Id
  //}
  const updateAssignment = async (e) => {
    e.preventDefault();

    
    const querySnapshot = await getDocs(
      query(collection(db, "assignments"), where("key", "==", key))
    );

    querySnapshot.forEach(async (c) => {
      try {
        // Construct document reference using doc() function
        const docRef = doc(db, `assignments`, c.id);

        await updateDoc(docRef, { status: status, comment: comment });

        toast.success(
          `Document ${doc.id} status successfully updated to ${status}`
        );
      } catch (error) {
        console.log(error.message);
        toast.error(`Error updating document ${doc.id} status: ${error}`);
      }
    });
  };
  return (
    <>
      <form onSubmit={updateAssignment}>
        <div className="mb-4">
          <label
            htmlFor="leadTutor"
            className="block text-sm font-medium text-gray-700"
          >
            update status
          </label>

          <select
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            name="status"
            id="status"
          >
            <option value=""></option>

            <option value="in progress">In progress</option>
            <option value="in progress">terminated</option>

            <option value="completed">completed</option>
          </select>
        </div>

        <div className="mb-4">
          <textarea
            cols="30"
            rows="10"
            onChange={handleCommentChange}
            value={comment}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            name="comments"
            placeholder="Give a brief description of what you did in class"
          ></textarea>
        </div>
        <button
          type="submit"
          onSubmit={updateAssignment}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          update
        </button>
      </form>
    </>
  );
}

function EditTask({ isEditTask }) {
  return (
    <div>
      <UpdateAssignment />
    </div>
  );
}
