const express = require("express");
const router = new express.Router();

const User = require("../models/user");
const auth = require("../middleware/auth");

// Creating a new user
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exist");

    user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Sign In and Sign Out User Routes:
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send({
      error: "Create user first"});
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send(`User has been logOut successfully :
      ${req.user}`);
  } catch (error) {
    res.status(500).send(error);
  }
});

// get and delete users from the database
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
