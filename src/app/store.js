import { configureStore } from "@reduxjs/toolkit";
import calenderReducer from "./feartures/calenderSlice";
export const store = configureStore({
  reducer: {
    calender: calenderReducer,
  },
});
