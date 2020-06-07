import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../../redux/actions/profile";

import DashboardActions from "./DashboardActions";
import Spinner from "../layout/Spinner";
import Education from "./Education";
import Experience from "./Experience";

// Bring values from the state to check if the profile is loading and the user is authenticated
const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getProfile,
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);

  // If we're fetching the data show spinner
  return loading ? (
    <Spinner />
  ) : (
    // otherwise show the Dashboard
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {/* Show the dashboard actions and experience if user has a profile */}
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {/* Pass the education and profile arrays to both components */}
          <Experience experiences={profile.experience} />
          <Education educations={profile.education} />
          <div className="my-2">
            <button className="btn btn-danger">
              <i className="fas fa-user-minus"></i> {" Delete My Account"}
            </button>
          </div>
        </Fragment>
      ) : (
        <div>
          <p className="lead">
            You haven't yet setup a profile, please add some info.
          </p>
          <Link className="btn btn-primary" to="/create-profile">
            Create Profile
          </Link>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfile })(Dashboard);
