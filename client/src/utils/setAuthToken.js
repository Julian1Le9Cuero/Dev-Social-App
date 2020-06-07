import axios from "axios";

const setAuthToken = (token) => {
  if (token) {
    // Set global header with the token of the auth user to make the request
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
