import { createSlice } from "@reduxjs/toolkit";

import { addDays, format } from "date-fns";

const initialState = {
  open: false,
  key: "",
  state:""
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = !state.open;
      state.state = action.payload;
      state.key = "edit";
    },

    setDelete: (state, action) => {
      state.open = false;
      state.open = true;
      state.key = "delete";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpen, setDelete } = ModalSlice.actions;

export default ModalSlice.reducer;
