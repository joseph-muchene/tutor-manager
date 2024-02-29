import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { db } from "../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { Timestamp, addDoc, collection, getDocs } from "firebase/firestore";
function TutorTable() {
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
    school: "",
    leadTutor: "",
    arrivalTime: "",
    assignedTutor: "",
    numberOfLaptops: "",
    comments: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you can handle form submission, such as adding the task to the database or updating the state
    // Add a new document with a generated id.

    const docRef = await addDoc(collection(db, "assignments"), {
      ...formData,
      dateAssigned: formatDate(formData.dateAssigned),
      key: uuidv4(),
      status: "IN PROGRESS",
    });
    if (docRef.id) {
      toast.success("Assignment created");
    }
    // Reset the form after submission
    setFormData({
      school: "",
      leadTutor: "",
      arrivalTime: "",
      assignedTutor: "",
      numberOfLaptops: "",
      comments: "",
    });
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Assign Task to Tutor</h2>
      <form onSubmit={handleSubmit}>
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
            htmlFor="comments"
            className="block text-sm font-medium text-gray-700"
          >
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Assign Task
          </button>
        </div>
      </form>
    </div>
  );
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("en-GB", options);
}

export default TutorTable;
