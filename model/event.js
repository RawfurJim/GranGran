const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const EventSchema = new mongoose.Schema({
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

function validationEvent(value) {
  const schema = Joi.object({
    title: Joi.string()
      .required(),

    dateTime: Joi.date().required(),
    remainderStartBefore: Joi.number().required(),
    description: Joi.string().required()
  });
  const result = schema.validate(value);
  return result;
}

exports.Event = Event;
exports.validate = validationEvent;