import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FormData: {
    isTrue: "false",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    otp: "",
    auth: "false",
    _id: "",
    authToken: "",
    profile: {},
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    update: (state, action) => {
      state.FormData = action.payload;
      localStorage.setItem("reduxState", JSON.stringify(state));
    },
  },
});

export const { update } = formSlice.actions;

export default formSlice.reducer;
