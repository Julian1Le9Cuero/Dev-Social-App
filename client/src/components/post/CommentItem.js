import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { removeComment } from "../../redux/actions/post";
import { connect } from "react-redux";

import Moment from "react-moment";

const CommentItem = ({ removeComment, comment, postId, auth }) => {
  const { _id, user, name, avatar, date, text } = comment;

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="user" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {auth.isAuthenticated && auth.user._id === user && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => removeComment(postId, _id)}
          >
            Delete Comment
          </button>
        )}
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  removeComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { removeComment })(CommentItem);
