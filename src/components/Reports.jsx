import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.config";
import jsPDF from "jspdf";
import Logo from "../assets/smartbrains.jpeg";
import "jspdf-autotable";
export default function ReportsData() {
  const [reports, setReports] = useState([]);
  const { user } = useSelector((state) => state.user);

  // Create a new PDF instance
  const doc = new jsPDF();

  useEffect(() => {
    async function fetchAssignment() {
      const q = query(
        collection(db, "assignments"),
        where("status", "==", "completed")
      );


      const querySnapshot = await getDocs(q);

      const x = querySnapshot.docs
        .filter(doc => doc.data().assignedTutor === user?.email || doc.data().leadTutor === user?.email)
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }));


      return setReports(x);
    }
    fetchAssignment();
  }, [user, db]);

  function generateAndDownloadReports() {
    // Create a new PDF instance
    const doc = new jsPDF();

    // Add logo
    const logo = new Image();

    logo.src = Logo; // Provide the path to your logo image
    doc.addImage(logo, "PNG", 10, 10, 30, 30); // Adjust the position and size as needed
    // Add table with additional information
    const additionalInfoHeaders = [["Name", "Email", "Month", "Mobile Number"]];
    const additionalInfoRows = [
      [
        user.name,
        user?.email,
        months[new Date().getMonth()],
        user?.mobileNumber,
      ],
    ];
    doc.autoTable({
      head: additionalInfoHeaders,
      body: additionalInfoRows,
      startY: 40,
    });

    // Set up table headers for reports
    const headers = [
      [
        "School",
        "Arrival time",
        "Comments",
        "NO of classes",
        "Lead Tutor",
        "Assigned Tutor",
        "Status",
        "Date",
      ],
    ];

    // Convert data to table rows for reports
    const rows = reports.map((report) => [
      report.school,
      report.arrivalTime,
      report.comments,
      report.numberOfClasses,
      report.leadTutor,
      report.assignedTutor,
      report.status,
      report.date,
    ]);

    // Add the table headers and rows for reports to the PDF
    doc.autoTable({ head: headers, body: rows }); // Adjust startY to leave space for the additional table

    // Save the PDF with a unique name
    doc.save(`report-${user?.email}.pdf`);
  }


  return (
    <div>
      <div class="relative">
        <button
          onClick={generateAndDownloadReports}
          className=" my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Generate Report
        </button>
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

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
