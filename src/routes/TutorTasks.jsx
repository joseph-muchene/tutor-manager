import TutorTable from "../components/AssignmentTable";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { changeDate } from "../app/feartures/calenderSlice";

const TutorTasks = React.memo(() => {
  const [user, setUser] = useState(null);
  const [photo, setPhoto] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setPhoto(user.photoURL);
      } else {
        setUser(null);
        setPhoto("");
      }
    });

    return () => unsubscribe();
  }, []);

  const dispatch = useDispatch();

  const handleDateRangeChange = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    const formattedStartDate = format(startDate, "dd MMM yyyy");
    const formattedEndDate = format(endDate, "dd MMM yyyy");

    const newDateRange = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      key: "selection",
    };

    setDateRange(newDateRange);
    dispatch(changeDate(newDateRange));
  };
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
        <DateRangePicker
          onChange={handleDateRangeChange}
          showSelectionPreview={false}
          moveRangeOnFirstSelection={false}
          editableDateInputs={true}
          ranges={[dateRange]}
          direction="horizontal"
        />
      </div>

      <div className="my-4 m">
        <TutorTable authUser={true} />
      </div>
    </div>
  );
});

export default TutorTasks;
