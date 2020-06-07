import React from "react";
import EducationItem from "./EducationItem";

const Education = ({ educations }) => {
  return (
    <div>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {educations.map((education) => (
            <EducationItem key={education._id} education={education} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Education;
