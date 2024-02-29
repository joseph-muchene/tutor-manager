import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";

export default function ReportsData() {
  const [reports, setReports] = useState([]);
  const { user } = useSelector((state) => state.user);

  const sampleData = [
    {
      school: "Sample School 1",
      comments: "Great performance by students",
      numberOfClasses: 5,
      leadTutor: "john.doe@example.com",
      assignedTutor: "jane.smith@example.com",
      date: "2024-02-29",
    },
    {
      school: "Sample School 2",
      comments: "Need improvement in math",
      numberOfClasses: 3,
      leadTutor: "alice.johnson@example.com",
      assignedTutor: "bob.brown@example.com",
      date: "2024-02-28",
    },
    // Add more sample data as needed
  ];

  useEffect(() => {
    async function fetchAssignment() {
      const q = query(
        collection(db, "assignments"),
        where("leadTutor", "==", user?.email)
      );

      const querySnapshot = await getDocs(q);

      const x = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return setReports(x);
    }
    fetchAssignment();
  }, [user, db]);
  return (
    <div>
      <div class="relative">
        <table className="  text-sm text-left rtl:text-right text-gray-500 ">
          <thead class="text-xs text-gray-700 uppercase dark:text-gray-400">
            {/* arrivalTime : "20:25" assignedTutor : "ken@gmail.com" comments :
            "mm" dateAssigned : "23 Feb 2024" id : "jzQc7t2xSUePrgUHoLbF" key :
            "34c7c985-8d1f-4aa6-b502-85bf3485f2b5" leadTutor :
            "ngugimuchene@gmail.com" numberOfLaptops : "32" school : "gommery"
            status : "IN PROGRESS" */}
            <tr>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                school
              </th>
              <th>Arrival time</th>
              <th scope="col" class="px-6 py-3">
                comments
              </th>
              <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                NO of classes
              </th>
              <th scope="col" class="px-6 py-3">
                lead tutor
              </th>
              <th scope="col" class="px-6 py-3">
                Assigned tutor
              </th>
              <th>Status</th>
              <th>Date</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((data, index) => (
              <tr
                class="border-b border-gray-200 dark:border-gray-700"
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="px-6 py-4">{data.school}</td>
                <td className="px-6 py-4">{data.arrivalTime}</td>
                <td className="px-6 py-4">{data.comments}</td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">{data.leadTutor}</td>
                <td className="px-6 py-4">{data.assignedTutor}</td>
                <td className="px-6 py-4">{data.status}</td>
                <td className="px-6 py-4">{data.date}</td>
                <td className="px-6 py-4 flex justify-center">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                    Generate
                  </button>
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
