import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase.config";
function UpdateAssignment() {
  const { task } = useSelector((state) => state.task);
  const [tutors, setTutors] = useState([]);
  const [users, setUsers] = useState([]);

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

  const [formData, setFormData] = useState({
    school: task?.school,
    leadTutor: task?.leadTutor,
    arrivalTime: task?.arrivalTime,
    assignedTutor: task?.assignedTutor,
    numberOfLaptops: task?.numberOfLaptops,
    comment: task?.comment,
   

  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const updateUser = async (e) => {
    e.preventDefault();
   
    const querySnapshot = await getDocs(
      query(collection(db, "assignments"), where("key", "==", task?.key))
    );

    querySnapshot.forEach(async (c) => {
 
      try {
        // Construct document reference using doc() function
        const docRef = doc(db, `assignments`, c.id);

        await updateDoc(docRef, formData);

        toast.success(`Document ${c.id}  successfully updated `);
      } catch (error) {
   
        toast.error(`Error updating document `);
      }
    });
  };
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">update tutor assignment</h2>
      <form onSubmit={updateUser}>
        <div className="mb-4">
          <label
            htmlFor="school"
            className="block text-sm font-medium text-gray-700"
          >
            School
          </label>
          <input
            type="text"
            id="school"
            name="school"
            value={formData.school}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="leadTutor"
            className="block text-sm font-medium text-gray-700"
          >
            Lead Tutor
          </label>

          <select
            value={formData.leadTutor}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
            name="leadTutor"
            id="leadTutor"
          >
            <option value=""></option>
            {users.map((tutor) => (
              <option value={tutor.email}>{tutor.email}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="arrivalTime"
            className="block text-sm font-medium text-gray-700"
          >
            Arrival Time
          </label>
          <input
            type="time"
            id="arrivalTime"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="dateAssigned"
            className="block text-sm font-medium text-gray-700"
          >
            Date Assigned
          </label>
          <input
            type="date"
            id="dateAssigned"
            name="dateAssigned"
            value={formData.dateAssigned}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
          <span className="ml-2">{formatDate(formData.dateAssigned)}</span>
        </div>
        <div className="mb-4">
          <label
            htmlFor="assignedTutor"
            className="block text-sm font-medium text-gray-700"
          >
            Assigned Tutor
          </label>

          <select
            id="assignedTutor"
            name="assignedTutor"
            value={formData.assignedTutor}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          >
            <option value=""></option>
            {users.map((tutor) => (
              <option value={tutor.email}>{tutor.email}</option>
            ))}
          </select>
          {/* <input
            type="text"
            id="assignedTutor"
            name="assignedTutor"
            value={formData.assignedTutor}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          /> */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="numberOfLaptops"
            className="block text-sm font-medium text-gray-700"
          >
            Assigned Number of Laptops
          </label>
          <input
            type="number"
            id="numberOfLaptops"
            name="numberOfLaptops"
            value={formData.numberOfLaptops}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="numberOfClasses"
            className="block text-sm font-medium text-gray-700"
          >
          Number of classes
          </label>
          <input
            type="number"
            id="numberOfClasses"
            name="numberOfClasses"
            value={formData.numberOfClasses}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700"
          >
            Comments
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            update assignment
          </button>
        </div>
      </form>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}


export default UpdateAssignment;
