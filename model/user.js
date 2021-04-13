const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const jwtSecretKey = "jwtPrivatekey"
UserSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      mobile: this.mobile
    },
    jwtSecretKey,
    {
      expiresIn:"7d"
    }
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

function validateUser(value) {
  const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    mobile: Joi.string().min(11).max(11).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(value);
}

exports.User = User;
exports.validate = validateUser;