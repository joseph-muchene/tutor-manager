import React from "react";

function TutorTable() {

  return (
    <div className="relative">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Elm Street Elementary
            </td>
            <td className="px-6 py-4">John Doe</td>
            <td className="px-6 py-4">8:00 AM</td>
            <td className="px-6 py-4">Emily Smith</td>
            <td className="px-6 py-4">10</td>
            <td className="px-6 py-4">Regular session</td>
            <td className="flex space-x-3  px-6 py-4">
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Maplewood High School
            </td>
            <td className="px-6 py-4">Alice Johnson</td>
            <td className="px-6 py-4">9:30 AM</td>
            <td className="px-6 py-4">Michael Brown</td>
            <td className="px-6 py-4">15</td>
            <td className="px-6 py-4">Advanced class</td>
            <td className="flex space-x-3 px-6 py-4">
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Oakridge Middle School
            </td>
            <td className="px-6 py-4">Sarah Lee</td>
            <td className="px-6 py-4">10:45 AM</td>
            <td className="px-6 py-4">David Rodriguez</td>
            <td className="px-6 py-4">12</td>
            <td className="px-6 py-4">Special needs class</td>
            <td className="flex space-x-3 px-6 py-4">
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TutorTable;
