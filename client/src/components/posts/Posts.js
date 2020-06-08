import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getPosts } from "../../redux/actions/post";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { loading, posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome to the community!
      </p>
      <PostForm />
      <div className="posts">
        {posts.length === 0 ? (
          <h4>Sorry, there aren't any posts yet.</h4>
        ) : (
          posts.map((post) => <PostItem key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
