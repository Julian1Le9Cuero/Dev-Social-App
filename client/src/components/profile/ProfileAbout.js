import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({ profile }) => {
  const { bio, skills, user } = profile;
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{user.name.split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </Fragment>
      )}
      <h2 className="text-primary">Skills Set</h2>
      <div className="skills">
        {skills.slice(0, 5).map((skill, idx) => (
          <div className="p-1" key={idx}>
            <i className="fa fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
