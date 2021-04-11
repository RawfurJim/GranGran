const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Event, validate } = require("../model/event.js");
const Userauth = require("../middleware/userAuth");


const router = express.Router();

router.get("/", async (req, res) => {
  let result = await Event.find();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  let checkEvent = await Event.findById(req.params.id);
  if (!checkEvent) {
    res.status(404).send("Invalid Event Id");
    return;
  }
  
  res.send(checkEvent);
});

router.post("/", async (req, res) => {
  let newEvent = 
  { title: req.body.title,
    dateTime: new Date(req.body.dateTime),
    remainderStartBefore: req.body.remainderStartBefore,
    description: req.body.description,
  }
  let valid = await validate(newEvent);
  if (valid.error) {
    res.status(400).send(valid.error.details[0].message);
    return;
  }
  const event = new Event(newEvent);

  let result = await event.save();
  
  res.send(result);
});

router.put("/:id",  async (req, res) => {
  let checkEvent = await Event.findById(req.params.id);
  if (!checkEvent) {
    res.status(404).send("invalid Event id");
    return;

  }
  let valid = validate(req.body);
  if (valid.error) {
    res.status(400).send(valid.error.details[0].message);
    return;
  }
  (checkEvent.title = req.body.title),
    (checkEvent.dateTime = req.body.dateTime),
    ( checkEvent.remainderStartBefore= req.body.remainderStartBefore),
    (checkEvent.description = req.body.description);
  
  let result = await checkEvent.save();
  res.send(result);
});

router.delete("/:id", async (req, res) => {
  let deleteEvent = await Event.findByIdAndRemove(req.params.id);

  if (!deleteEvent) {
    res.status(404).send("invalid id");
    return;
  }
  res.send(deleteEvent);
});

module.exports = router;