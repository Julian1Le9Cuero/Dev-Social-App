import {
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS,
} from "../actions/types";

const initialState = {
  profiles: [],
  profile: null,
  error: {},
  loading: true,
  repos: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: [...payload],
        loading: false,
        profile: null,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    default:
      return state;
  }
};
