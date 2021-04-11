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
UserSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, email: this.email },"jwtPrivatekey"
    
  );
  return token;
};

const User = mongoose.model("User", UserSchema);

function validationUser(value) {
  const schema = Joi.object({
    name: Joi.string()
      .required(),

    password: Joi.string().required(),

    mobile: Joi.string().min(11).max(11).required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  });
  const result = schema.validate(value);
  return result;
}

exports.User = User;
exports.validate = validationUser;