import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { provider } from "../auth/provider";
import Logo from "../assets/smartbrains.jpeg";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { query, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
export default function App() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/dashboard");
    } else {
      return;
    }
  });

  const navigate = useNavigate();
  function signInWithPopUp() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Check if the user is already registered
        const user = result.user;
        const userEmail = user.email;

        getDocs(collection(db, "users"))
          .then((querySnapshot) => {
            let userExists = false;
            querySnapshot.forEach((doc) => {
              if (doc.data().email === userEmail) {
                userExists = true;
                return;
              }
            });

            if (!userExists) {
              // User is not registered, add their data to the 'users' collection
              addDoc(collection(db, "users"), {
                userId: uuidv4(),
                email: userEmail,
                password: "", // Password is an empty string
              })
                .then(() => {
                  toast.success("user registered");
                  navigate("/dashboard");
                })
                .catch((error) => {
                  toast.error("Error adding user: ", error);
                });
            } else {
              toast.error("User is already registered");
            }
          })
          .catch((error) => {
            console.error("Error checking user registration: ", error);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(
          "Sign in error - Code:",
          errorCode,
          "Message:",
          errorMessage
        );
      });
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState("");

  const onChangeHandlerName = (e) => {
    setName(e.target.value);
  };
  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  function createUser(e) {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("All fields are required");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        const email = user?.email;
        // Add a new document with a generated id.
        const docRef = addDoc(collection(db, "users"), {
          userId: uuidv4(),
          email,
          password,
        }).then(() => {
          navigate("/dashboard");
          toast.success("user was created");
        });

        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  }
  return (
    <>
      <div className="mx-auto md:w-[700px] h-[100vh] flex flex-col  justify-center items-center">
        <img src={Logo} alt="" srcset="" className="rounded-full h-32" />
        <form onSubmit={createUser} className="md:w-[400px]">
          <div className="flex flex-col space-y-3 mb-3">
            <label htmlFor="name">Name</label>
            <input
              value={name}
              onChange={onChangeHandlerName}
              type="text"
              className="border rounded p-[5px] "
            />
          </div>
          <div className="flex flex-col space-y-3 mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={onChangeHandlerEmail}
              className="border rounded p-[5px]"
            />
          </div>
          <div className="flex flex-col space-y-3 mb-3">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={onChangeHandlerPassword}
              type="password"
              className="border rounded p-[5px] "
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 rounded p-[5px] my-2 bg-orange-400 w-full text-white"
            >
              Create user account
            </button>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={() => signInWithPopUp()}
              type="button"
              class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
            >
              <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
