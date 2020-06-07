import React from "react";
import ExperienceItem from "./ExperienceItem";

const Experience = ({ experiences }) => {
  return (
    <div>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experience) => (
            <ExperienceItem key={experience._id} experience={experience} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Experience;
