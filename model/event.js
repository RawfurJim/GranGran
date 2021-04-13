const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)

const EventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  remainderStartBefore:{
    type: Number,
    required:true,
  },
  description: {
    type: String,
    required: true,
  },
});


const Event = mongoose.model("Event", EventSchema);

function validateEvent(value) {
  const schema = Joi.object({
    userId: Joi.objectId(),
    title: Joi.string().required(),
    dateTime: Joi.date().required(),
    remainderStartBefore: Joi.number().required(),
    description: Joi.string().required()
  });
  return schema.validate(value);
}

exports.Event = Event;
exports.validate = validateEvent;