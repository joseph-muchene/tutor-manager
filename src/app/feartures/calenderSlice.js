import { createSlice } from "@reduxjs/toolkit";

import { addDays, format } from "date-fns";

const initialState = {
  startDate: "",
  endDate: "",
  key: "selection",
};

export const calenderSlice = createSlice({
  name: "calender",
  initialState,
  reducers: {
    changeDate: (state, action) => {
      const { startDate, endDate } = action.payload;
      state.startDate = startDate;
      state.endDate = endDate;
      state.key = "selection";
    },
    clear: (state) => {
      state.startDate = "";
      state.endDate = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { clear, changeDate } = calenderSlice.actions;

export default calenderSlice.reducer;
