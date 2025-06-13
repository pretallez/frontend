import { createSlice } from "@reduxjs/toolkit";

const sheetSlice = createSlice({
  name: "sheet",
  initialState: { isOpen: false },
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
    toggle: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { open, close, toggle } = sheetSlice.actions;
export default sheetSlice.reducer;
