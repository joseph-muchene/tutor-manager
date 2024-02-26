import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-hot-toast";
import { useState } from "react";

function UpdateUser({ user }) {

  const [formData, setFormData] = useState({
    name: "",
    status: "",
    email: "",
    role: "",
    password: "",
  });
  const { status } = formData;
  const onChangeHandler = (e, name) => {
    setFormData((initialState) => ({
      ...initialState,
      [name]: e.target.value,
    }));
  };

  const updateUser = async (e) => {
    e.preventDefault();

    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", user?.email))
    );

    querySnapshot.forEach(async (c) => {
      try {
        // Construct document reference using doc() function
        const docRef = doc(db, `users`, c.id);

        await updateDoc(docRef, formData);

        toast.success(
          `Document ${c.id} status successfully updated to ${status}`
        );
      } catch (error) {
        console.log(error.message);
        toast.error(`Error updating document ${doc.id} status: ${error}`);
      }
    });
  };
  return (
    <>
      <div>
        <h2 className="text-lg font-bold mb-4">update user</h2>
        <form onSubmit={updateUser}>
          <div className="mb-4">
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue={user?.name}
              onChange={(e) => onChangeHandler(e, "name")}
              name="name"
              className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => onChangeHandler(e, "email")}
              defaultValue={user?.email}
              className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>

            <select
              id="role"
              name="role"
              defaultValue={user?.role}
              onChange={(e) => onChangeHandler(e, "role")}
              className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            >
              <option value="regular">regular</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              defaultValue={user?.status}
              name="status"
              onChange={(e) => onChangeHandler(e, "status")}
              className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            >
              <option value="active">active</option>
              <option value="not active">not active</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              type="text"
              id="password"
              onChange={(e) => onChangeHandler(e, "password")}
              name="password"
              defaultValue={user?.password}
              className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              update
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UpdateUser;
