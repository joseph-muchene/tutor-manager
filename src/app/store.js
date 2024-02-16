import { configureStore } from "@reduxjs/toolkit";
import calenderReducer from "./feartures/calenderSlice";
import modalReducer from "./feartures/modalSlice";
export const store = configureStore({
  reducer: {
    calender: calenderReducer,
    modal: modalReducer,
  },
});
