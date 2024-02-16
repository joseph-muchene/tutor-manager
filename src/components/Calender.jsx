import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { changeDate } from "../app/feartures/calenderSlice";

export const Calendar = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState([
    {
      startDate: new Date(),
    },
  ]);

  const handleDateRangeChange = (ranges) => {

    const { startDate } = ranges.selection;
    const formattedStartDate = format(startDate, "dd MMM yyyy");

    setState([
      {
        startDate: formattedStartDate,
        key: "selection",
      },
    ]);

    // Dispatch action to update calendar state in Redux
    dispatch(changeDate({ startDate: formattedStartDate }));
  };

  return (
    <div>
      <DateRangePicker
        onChange={(ranges) => handleDateRangeChange(ranges)}
        ranges={state}
      />
    </div>
  );
};
