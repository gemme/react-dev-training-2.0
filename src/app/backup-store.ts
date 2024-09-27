import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
