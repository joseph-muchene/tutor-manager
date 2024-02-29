import { configureStore } from "@reduxjs/toolkit";
import calenderReducer from "./feartures/calenderSlice";
import modalReducer from "./feartures/modalSlice";
import taskReducer from "./feartures/taskSlice";
import userReducer from "./feartures/userSlice";

export const store = configureStore({
  reducer: {
    calender: calenderReducer,
    modal: modalReducer,
    task: taskReducer,
    user: userReducer,
  },
});
