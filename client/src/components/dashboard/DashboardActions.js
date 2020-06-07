import React from "react";
import PropTypes from "prop-types";

const DashboardActions = (props) => {
  return (
    <div className="dash-buttons">
      <a href="edit-profile.html" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </a>
      <a href="add-experience.html" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </a>
      <a href="add-education.html" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </a>
    </div>
  );
};

DashboardActions.propTypes = {};

export default DashboardActions;
