const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Post = require("../../models/Post");
const User = require("../../models/User");
const auth = require("../../middleware/auth");

// @route POST /api/posts
// @desc  Create post
// @access Private
router.post(
  "/",
  [auth, check("text", "Text is required").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user);
      if (!user) {
        return res.status(404).json("No user found");
      }
      let newPost = {
        text: req.body.text,
        user: req.user,
        avatar: user.avatar,
        name: user.name,
      };
      newPost = new Post(newPost);
      await newPost.save();
      res.json(newPost);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route GET /api/posts
// @desc  Get posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) {
      return res.status(404).json("No posts found.");
    }
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route GET /api/posts/:post_id
// @desc  Get post by Id
// @access Private
router.get("/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json("This post does not exist.");
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route PUT /api/posts/like/:post_id
// @desc  Like a post
// @access Private
router.put("/like/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json("This post does not exist.");
    }
    //   Check if post was already liked by user
    const alreadyLiked = post.likes.find(
      (like) => like.user.toString() === req.user
    );

    if (alreadyLiked) {
      return res.status(400).json("You already liked this post.");
    }
    post.likes.unshift({ user: req.user });
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route PUT /api/posts/unlike/:post_id
// @desc  Unlike a post
// @access Private
router.put("/unlike/:post_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json("This post does not exist.");
    }
    //   Check if post was already liked by user
    const alreadyLiked = post.likes.find(
      (like) => like.user.toString() === req.user
    );

    if (!alreadyLiked) {
      return res.status(400).json("You have to like this post first.");
    }
    post.likes = post.likes.filter((like) => like.user.toString() !== req.user);
    await post.save();
    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route PUT /api/posts/comments/:post_id
// @desc  Comment a post
// @access Private
router.put(
  "/comments/:post_id",
  [auth, check("text", "Text is required").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await Post.findById(req.params.post_id);
      const user = await User.findById(req.user);
      if (!post) {
        return res.status(404).json("This post does not exist.");
      }

      const newComment = {
        text: req.body.text,
        user: req.user,
        name: user.name,
        avatar: user.avatar,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route DELETE /api/posts/comments/:post_id/:comment_id
// @desc  Delete a comment
// @access Private
router.delete("/comments/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json("This post does not exist.");
    }

    // Check if comment exists
    const commentExists = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id
    );
    // Check if the comment belongs to the user
    if (!commentExists || commentExists.user.toString() !== req.user) {
      return res.status(404).json("This comment does not exist.");
    }

    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
    );
    await post.save();
    res.json(post.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
