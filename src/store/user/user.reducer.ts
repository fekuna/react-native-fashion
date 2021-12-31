import { SIGN_IN } from "./user.type";

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: !!action.payload.sub,
        user: action.payload,
      };
    default:
      return state;
  }
};
