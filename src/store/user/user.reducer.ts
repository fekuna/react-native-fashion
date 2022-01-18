import { SIGN_IN, UPDATE_CURRENT_USER } from "./user.type";

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
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};
