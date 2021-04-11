const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const NotificationSchema = new mongoose.Schema({
  isRead: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
      ref: "event",
  },
  
  content: {
    type: String,
    required: true,
  },
 
});


const Notification = mongoose.model("Notification", NotificationSchema);

function validationEvent(value) {
  const schema = Joi.object({
 
    content: Joi.string().required()
  });
  const result = schema.validate(value);
  return result;
}

exports.Event = Event;
exports.validate = validationEvent;