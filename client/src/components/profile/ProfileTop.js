import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileTop = ({ profile }) => {
  const { user, status, company, location, website, social } = profile;

  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user.avatar} alt="user" />
      <h1 className="large">{user.name}</h1>
      <p className="lead">
        {status} {company && ` at ${company}`}
      </p>
      {location && <p>{location}</p>}
      <div className="icons my-1">
        {/* Check if profile has these fields to show them */}
        {website && (
          <Link to={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </Link>
        )}

        {social && social.twitter && (
          <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x"></i>
          </Link>
        )}
        {social && social.facebook && (
          <Link to={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x"></i>
          </Link>
        )}
        {social && social.linkedin && (
          <Link to={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x"></i>
          </Link>
        )}
        {social && social.youtube && (
          <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x"></i>
          </Link>
        )}
        {social && social.instagram && (
          <Link to={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x"></i>
          </Link>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
