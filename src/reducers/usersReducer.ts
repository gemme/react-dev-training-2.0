const initialState = {
  value: 0,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        value: state.value + 1,
      };
    case "ADD_TOTAL_USERS":
      return {
        ...state,
        value: action.payload,
      };

    default:
      return state;
  }
};
