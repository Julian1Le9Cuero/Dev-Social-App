import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../redux/actions/profile";
import { connect } from "react-redux";

const ExperienceItem = ({ experience, deleteExperience }) => {
  const { company, title, from, to, current, _id } = experience;
  return (
    <tr>
      <td>{company}</td>
      <td className="hide-sm">{title}</td>
      <td className="hide-sm">
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {current || !to ? "Now" : <Moment format="DD/MM/YYYY">{to}</Moment>}
      </td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExperience(_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

ExperienceItem.propTypes = {
  experience: PropTypes.object.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(ExperienceItem);
