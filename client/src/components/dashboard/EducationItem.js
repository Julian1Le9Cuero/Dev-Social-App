import React from "react";
import PropTypes from "prop-types";
import { deleteEducation } from "../../redux/actions/profile";
// Use the Moment component to format the dates
import Moment from "react-moment";
import { connect } from "react-redux";

const EducationItem = ({ education, deleteEducation }) => {
  const { school, degree, from, to, current, _id } = education;
  return (
    <tr>
      <td>{school}</td>
      <td className="hide-sm">{degree}</td>
      <td className="hide-sm">
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {current || !to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteEducation(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

EducationItem.propTypes = {
  education: PropTypes.object.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(EducationItem);
