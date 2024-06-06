import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./FormSlice";

export const Store = configureStore({
  reducer: {
    form: formReducer,
  },
});
