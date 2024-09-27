import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  value: 111,
};

export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        value: state.value + 1,
      };
    case "DECREMENT":
      return {
        ...state,
        value: state.value - 1,
      };

    default:
      return state;
  }
};
