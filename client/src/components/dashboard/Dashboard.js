import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
{
  /* <h1 class="large text-primary">
        Dashboard
      </h1>
      <p class="lead"><i class="fas fa-user"></i> Welcome John Doe</p> */
}
const Dashboard = (props) => {
  return (
    <div>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome John Doe
      </p>
      <div>
        <p className="lead">
          You haven't yet setup a profile, please add some info.
        </p>
        <Link className="btn btn-primary" to="/create-profile">
          Create Profile
        </Link>
      </div>
      <div className="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
