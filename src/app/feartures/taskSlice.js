import { createSlice } from "@reduxjs/toolkit";

import { addDays, format } from "date-fns";

const initialState = {
  task: {},
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.task = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTask } = taskSlice.actions;

export default taskSlice.reducer;
