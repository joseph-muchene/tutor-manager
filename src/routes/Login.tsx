import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";


import Logo from "../assets/smartbrains.jpeg";

import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate("/dashboard");
        } else {
            return;
        }
    });

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const onChangeHandlerEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangeHandlerPassword = (e) => {
        setPassword(e.target.value);
    };

    async function loginUser(e) {
        e.preventDefault();
        if (!email || !password) {
            return toast.error("All fields are required");
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;
                return navigate('/dashboard')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                return toast.error(errorMessage)
            });

    }
    return (
        <>
            <div className="mx-auto md:w-[700px] h-[100vh] flex flex-col  justify-center items-center">
                <img src={Logo} alt="" className="rounded-full h-32" />
                <form onSubmit={loginUser} className="md:w-[400px]">

                    <div className="flex flex-col space-y-3 mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={onChangeHandlerEmail}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                    </div>
                    <div className="flex flex-col space-y-3 mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={onChangeHandlerPassword}
                            type="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded p-[5px] my-2 bg-orange-400 w-full text-white"
                        >
                            Login
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Dont have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</Link>
                        </p>
                    </div>


                </form>
            </div>
        </>
    );
}
