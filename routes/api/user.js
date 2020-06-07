const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("config");
const gravatar = require("gravatar");
const User = require("../../models/User");

// @route POST /api/users
// @desc  Register new user
// @access Public
router.post(
  "/",
  [
    check("name", "Name is required.").notEmpty(),
    check("email", "Please provide a valid email.").isEmail(),
    check(
      "password",
      "The password must be at least 6 characters long."
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if email already exists in DB
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists." }] });
      }

      // Create avatar image with email
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        password,
        avatar,
      });

      // Hash password
      user.password = await bcrypt.hash(user.password, 10);
      await user.save();

      // Generate jwt to log users in right away
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jsonSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error.");
    }
  }
);

module.exports = router;
