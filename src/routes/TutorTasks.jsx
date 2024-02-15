import React, { useState } from "react";
import { Calender } from "../components/Calender";
import TutorTable from "../components/AssignmentTable";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";

const TutorTasks = () => {
  const [user, setUser] = useState("");
  const [photo, setPhoto] = useState("");
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      setPhoto(user.photoURL);
    } else {
      // User is signed out
      // ...
    }
  });
  console.log(user.photoURL);
  return (
    <div>
      <div>
        {user && user.photoURL && (
          <img
            src={
              !user
                ? "https://media.istockphoto.com/id/1867789156/vector/vector-flat-illustration-suitable-for-social-media-profiles-screensavers-and-templates.jpg?s=612x612&w=0&k=20&c=MescrM_1R0rrcBx7_WCSn39yuktdqbGZcr_SVo0A3yo="
                : photo
            }
            alt=""
            className=" my-3 rounded"
            srcset=""
          />
        )}
      </div>
      <div>
        <Calender />
      </div>

      <div className="my-4 m">
        <TutorTable authUser={true} />
      </div>
    </div>
  );
};

export default TutorTasks;
