import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileById } from "../../redux/actions/profile";

import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({
  match,
  auth,
  getProfileById,
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return loading || profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back To Profiles
      </Link>
      {/* Show this button if user is logged in and the profile belongs to the user*/}
      {auth.isAuthenticated && auth.user._id === profile.user._id && (
        <Link to="/edit-profile" className="btn btn-dark">
          Edit Profile
        </Link>
      )}
      <div className="profile-grid my-1">
        <ProfileTop profile={profile} />
        <ProfileAbout profile={profile} />
        <ProfileExperience experiences={profile.experience} />
        <ProfileEducation educations={profile.education} />
        <ProfileGithub username={profile.githubusername} />
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
