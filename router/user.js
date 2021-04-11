const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { User, validate } = require("../model/user.js");
const bcrypt = require("bcrypt");

const router = express.Router();

router.get("/", async (req, res) => {
  let result = await User.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  let checkUser = await User.findById(req.params.id);
  if (!checkUser) {
    res.status(404).send("Invalid User Id");
    return;
  }
  
  res.send(checkUser);
});

router.post("/", async (req, res) => {
  let valid = await validate(req.body);
  if (valid.error) {
    res.status(400).send(valid.error.details[0].message);
    return;
  }
  let checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    res.status(400).send("email already exist");
    return;
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  let result = await user.save();
  const token = user.getAuthToken();

  res.send(result);
});

router.put("/:id",  async (req, res) => {
  let checkUser = await User.findById(req.params.id);
  if (!checkUser) {
    res.status(404).send("invalid User id");
    return;
  }
  let valid = validate(req.body);
  if (valid.error) {
    res.status(400).send(valid.error.details[0].message);
    return;
  }
  (checkUser.name = req.body.name),
    (checkUser.email = req.body.email),
    (checkUser.password = req.body.password),
    (checkUser.mobile = req.body.mobile);
  const salt = await bcrypt.genSalt(10);
  checkUser.password = await bcrypt.hash(checkUser.password, salt);

  let result = await checkUser.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  let deleteUser = await User.findByIdAndRemove(req.params.id);

  if (!deleteUser) {
    res.status(404).send("invalid id");
    return;
  }
  res.send(deleteUser);
});

module.exports = router;