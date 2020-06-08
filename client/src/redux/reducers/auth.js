import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  user: null,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };
    case LOAD_USER:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
    case CLEAR_PROFILE:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};
