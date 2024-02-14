import React, { useState } from "react";

function TutorTable() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle form submission, such as adding the task to the database or updating the state
    console.log(formData);
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
          <input
            type="text"
            id="leadTutor"
            name="leadTutor"
            value={formData.leadTutor}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="arrivalTime"
            className="block text-sm font-medium text-gray-700"
          >
            Arrival Time
          </label>
          <input
            type="text"
            id="arrivalTime"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="assignedTutor"
            className="block text-sm font-medium text-gray-700"
          >
            Assigned Tutor
          </label>
          <input
            type="text"
            id="assignedTutor"
            name="assignedTutor"
            value={formData.assignedTutor}
            onChange={handleChange}
            className="px-4 py-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300"
          />
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

export default TutorTable;
