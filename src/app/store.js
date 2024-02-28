import { configureStore } from "@reduxjs/toolkit";
import calenderReducer from "./feartures/calenderSlice";
import modalReducer from "./feartures/modalSlice";
import taskReducer from "./feartures/taskSlice";
export const store = configureStore({
  reducer: {
    calender: calenderReducer,
    modal: modalReducer,
    task: taskReducer,
  },
});
