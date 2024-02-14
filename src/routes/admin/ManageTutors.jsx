import React from "react";

function TutorTable() {
  return (
    <div className="relative">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              Date Added
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              John Doe
            </td>
            <td className="px-6 py-4">john.doe@example.com</td>
            <td className="px-6 py-4">Admin</td>
            <td className="px-6 py-4">Active</td>
            <td className="px-6 py-4">2022-01-15</td>
            <td className="flex space-x-3  px-6 py-4">
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>

          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Alice Johnson
            </td>
            <td className="px-6 py-4">alice.johnson@example.com</td>
            <td className="px-6 py-4">Editor</td>
            <td className="px-6 py-4">Inactive</td>
            <td className="px-6 py-4">2022-02-05</td>
            <td className="flex space-x-3 px-6 py-4">
              <button>Delete</button>
              <button>Edit</button>
            </td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              Sarah Lee
            </td>
            <td className="px-6 py-4">sarah.lee@example.com</td>
            <td className="px-6 py-4">User</td>
            <td className="px-6 py-4">Active</td>
            <td className="px-6 py-4">2022-02-28</td>
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
