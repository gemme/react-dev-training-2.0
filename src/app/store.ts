import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "../reducers/counterReducer";
import { usersReducer } from "../reducers/usersReducer";

export default configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
});
