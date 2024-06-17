import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

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
    resp: {},
    courses: [],
    c_id: "",
    hello: "false",
    query: "",
    enrolled: {},
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
    reset: (state) => {
      state.FormData = initialState.FormData;
      localStorage.removeItem("reduxState");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      state = initialState;
    });
  },
});

export const { update, reset } = formSlice.actions;
export default formSlice.reducer;
