import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({ educations }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>
      {educations.length === 0 ? (
        <h4>No education credentials.</h4>
      ) : (
        educations.map((edu) => (
          <div key={edu._id}>
            <h3>{edu.school}</h3>
            <p>
              <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
              {edu.current || !edu.to ? (
                "Current"
              ) : (
                <Moment format="DD/MM/YYYY">{edu.to}</Moment>
              )}
            </p>
            <p>
              <strong>Degree: </strong>
              {edu.degree}
            </p>
            <p>
              <strong>Field Of Study: </strong>
              {edu.fieldofstudy}
            </p>
            {edu.description && (
              <p>
                <strong>Description: </strong>
                {edu.description}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

ProfileEducation.propTypes = {
  educations: PropTypes.array.isRequired,
};

export default ProfileEducation;
