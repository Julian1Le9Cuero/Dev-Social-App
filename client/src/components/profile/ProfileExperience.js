import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileExperience = ({ experiences }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>
      {experiences.length === 0 ? (
        <h4>No experience credentials.</h4>
      ) : (
        experiences.map((exp) => (
          <div key={exp._id}>
            <h3 className="text-dark">{exp.company}</h3>
            <p>
              <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
              {exp.current || !exp.to ? (
                "Current"
              ) : (
                <Moment format="DD/MM/YYYY">{exp.to}</Moment>
              )}
            </p>
            <p>
              <strong>Position: </strong>
              {exp.title}
            </p>
            {exp.description && (
              <p>
                <strong>Description: </strong>
                {exp.description}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

ProfileExperience.propTypes = {
  experiences: PropTypes.array.isRequired,
};

export default ProfileExperience;
