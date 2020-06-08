const express = require("express");
const config = require("config");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const axios = require("axios");

const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

// @route GET /api/profile/me
// @desc  Get profile for auth user
// @access Private
router.get("/me", auth, async (req, res) => {
  try {
    // Find profile and populate the field from the user refererence
    const profile = await Profile.findOne({ user: req.user }).populate("user", [
      "name",
      "avatar",
    ]);
    if (!profile) {
      return res.status(404).json("No profile found for the user.");
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route PUT /api/profile
// @desc  Create or update profile for auth user
// @access Private
router.put(
  "/",
  [
    auth,
    check("status", "Status is required").notEmpty(),
    check("skills", "Skills are required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Convert the mandatory field 'skills' into an array
    const profileFields = {
      ...req.body,
      skills: req.body.skills.split(",").map((skill) => skill.trim()),
    };
    const { twitter, facebook, linkedin, youtube, instagram } = profileFields;

    try {
      // Use upsert option to create a NEW profile if the user does not have one
      const profile = await Profile.findOneAndUpdate(
        { user: req.user },
        profileFields,
        { new: true, upsert: true }
      );
      // Check if social fields were provided to update social field in the profile model
      if (twitter) profile.social.twitter = twitter;
      if (facebook) profile.social.facebook = facebook;
      if (youtube) profile.social.youtube = youtube;
      if (instagram) profile.social.instagram = instagram;
      if (linkedin) profile.social.linkedin = linkedin;

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route GET /api/profile/:user_id
// @desc  Get profile by Id
// @access Public
router.get("/:user_id", async (req, res) => {
  try {
    // Find profile and populate the field from the user refererence
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(404).json("No profile found for the user.");
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route GET /api/profile
// @desc  Get profiles
// @access Public
router.get("/", async (req, res) => {
  try {
    // Find profiles and populate the field from the user refererence
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(404).json("No profiles found.");
    }
    // Send profiles array
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route PUT /api/profile/experience
// @desc  Add experience to profile
// @access Private
router.put(
  "/experience",
  [
    auth,
    check("title", "Title is required").notEmpty(),
    check("company", "Company is required").notEmpty(),
    check("from", "From date is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user });
      if (!profile) {
        return res.status(404).json("No profile found for the user.");
      }
      profile.experience.unshift(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route PUT /api/profile/education
// @desc  Add education to profile
// @access Private
router.put(
  "/education",
  [
    auth,
    check("school", "School is required").notEmpty(),
    check("degree", "Degree is required").notEmpty(),
    check("fieldofstudy", "Field of study is required").notEmpty(),
    check("from", "From date is required").notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user });
      if (!profile) {
        return res.status(404).json("No profile found for the user.");
      }
      profile.education.unshift(req.body);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

// @route DELETE /api/profile/experience/:exp_id
// @desc  Delete experience from profile
// @access Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });

    if (!profile) {
      return res.status(404).json("No profile found for the user.");
    }

    const expExists = profile.experience.find(
      (exp) => exp._id.toString() === req.params.exp_id
    );
    if (!expExists) {
      return res
        .status(404)
        .json("This experience does not exist or was already deleted.");
    }

    profile.experience = profile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );
    await profile.save();
    res.json(profile);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json("No profile found for the user.");
    }
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route DELETE /api/profile/education/:edu_id
// @desc  Delete education from profile
// @access Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (!profile) {
      return res.status(404).json("No profile found for the user.");
    }

    const eduExists = profile.education.find(
      (edu) => edu._id.toString() === req.params.edu_id
    );

    if (!eduExists) {
      return res
        .status(404)
        .json("This education does not exist or was already deleted.");
    }

    profile.education = profile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route DELETE /api/profile
// @desc  Delete profile, user account and posts (cascade delete)
// @access Private
router.delete("/", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user });
    if (!profile) {
      return res.status(404).json({ error: "No profile found for this user." });
    }
    await profile.remove();
    await Post.deleteMany({ user: req.user });
    await User.findByIdAndDelete(req.user);
    res.json("The account has been permanently removed.");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

// @route GET /api/profile/repos/:username
// @desc  Get Github repos from a user
// @access Public
router.get("/repos/:username", async (req, res) => {
  try {
    const options = {
      headers: {
        "user-agent": "node.js",
        Authorization: `token ${config.get("githubToken")}`,
      },
    };

    const resp = await axios.get(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`,
      options
    );

    if (resp.status !== 200) {
      return res.status(404).json({ msg: "No Github profile found" });
    }

    res.json(resp.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error.");
  }
});

module.exports = router;
