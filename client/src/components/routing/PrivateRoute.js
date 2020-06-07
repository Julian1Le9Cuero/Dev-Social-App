import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

// This component is used to only show certain routes for authenticated users
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...otherProps
}) => {
  // If loading return the spinner otherwise return a route that checks inside the render if user isAuthenticated
  return loading ? (
    <Spinner />
  ) : isAuthenticated ? (
    <Route {...otherProps} render={(props) => <Component {...props} />} />
  ) : (
    <Redirect to="/login" />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
