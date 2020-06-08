import React from "react";
import { Link } from "react-router-dom";

const ProfileItem = ({ profile }) => {
  const { user, status, company, skills, location } = profile;

  return (
    <div className="profile bg-light">
      <img className="round-img" src={user.avatar} alt="user" />
      <div>
        <h2>{user.name}</h2>
        <p>
          {status} {company && ` at ${company}`}
        </p>
        {location && <p>{location}</p>}
        <Link to={`/profile/${user._id}`} className="btn btn-primary">
          View Full Profile
        </Link>
      </div>

      <ul>
        {skills.slice(0, 4).map((skill, idx) => (
          <li className="text-primary" key={idx}>
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
