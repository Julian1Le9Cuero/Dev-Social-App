import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import ProfileItem from "./ProfileItem";
import Spinner from "../layout/Spinner";
import { getProfiles } from "../../redux/actions/profile";
import { connect } from "react-redux";

const Profiles = ({ getProfiles, profiles, loading }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fab fa-connectdevelop"></i> Browse and connect with
        developers
      </p>
      <div className="profiles">
        {loading ? (
          <Spinner />
        ) : profiles.length > 0 ? (
          profiles.map((profile) => (
            <ProfileItem key={profile._id} profile={profile} />
          ))
        ) : (
          <p className="lead">No profiles found.</p>
        )}
      </div>
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profiles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.profile.loading,
  profiles: state.profile.profiles,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
