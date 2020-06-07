import {
  UPDATE_PROFILE,
  PROFILE_ERROR,
  GET_PROFILE,
  CLEAR_PROFILE,
} from "../actions/types";

const initialState = {
  profiles: [],
  profile: null,
  error: {},
  loading: true,
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
    case PROFILE_ERROR:
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};
