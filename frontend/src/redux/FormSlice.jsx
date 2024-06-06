import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FormData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    otp: "",
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    update: (state, action) => {
      state.FormData = action.payload;
    },
  },
});

export const { update } = formSlice.actions;

export default formSlice.reducer;
