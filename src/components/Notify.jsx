
import { Bell } from 'lucide-react'
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";

export default function Notify() {
    const [user, setUser] = useState({});
    const [assignments, setAssignments] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            // Fetch user once when the component mounts
            onAuthStateChanged(auth, (userData) => {
                setUser(userData);
            });

            // Fetch assignments only if authUser, user.email, and calendar dates exist


            const q = query(
                collection(db, "assignments"),
                where("status", "==", "IN PROGRESS"), // Start of the range

            );

            const querySnapshot = await getDocs(q);

            const x = querySnapshot.docs
                .filter(doc => doc.data().assignedTutor === user?.email || doc.data().leadTutor === user?.email)
                .map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

            return setAssignments(x);
        }



        fetchData();
    }, [user.email]);
    console.log(assignments)

    return (

        <>
            <button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-orange-600 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                <Bell/>
                <span class="inline-flex items-center justify-center w-4 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                    {assignments.length}
                </span>

            </button>





            <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div class="relative p-4 w-full max-w-2xl max-h-full">

                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                Notifications
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className='p-2'>

                            <ol class="relative border-s border-gray-200 dark:border-gray-700 ">
                                {assignments.length > 0 && assignments.map(assignment => (
                                    <li class="mb-10 ms-4">
                                        <div class="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                                        <time class="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{assignment.dateAssigned
                                        }</time>
                                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">school: {assignment.school}
                                        </h3>
                                        <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">{assignment.comment}</p>

                                        <span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">{assignment.status}</span>


                                    </li>
                                ))}
                            </ol>

                        </div>



                    </div>
                </div>
            </div>

        </>
    )
}