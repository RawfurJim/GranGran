const router = require("express").Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User, validate } = require("../model/user");

function validateUserCredentials(value) {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(value);
}

router.post("/signin", async (req, res) => {
  const credentials = { email: req.body.email, password: req.body.password }
  const { error } = validateUserCredentials(credentials);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    res.status(400).send("Invalid credentials");
    return;
  }
  const isValid = await bcrypt.compare(credentials.password, user.password);
  if (!isValid) {
    res.status(400).send("Invalid credentials");
    return;
  }
  const token = user.getAuthToken();
  res.status(200).send({ token });
});

router.post("/signup", async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      mobile: req.body.mobile,
    }
    const { error } = await validate(newUser);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const existedUser = await User.findOne({ email: newUser.email });
    if (existedUser) {
      res.status(400).send("email already exist");
      return;
    }
    const user = new User(newUser);
  
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.getAuthToken();
  
    res.status(201).send({ token: token });
  } catch (error) {
    res.status(500).send('Internal server error.')
  }
});

module.exports = router;