const router = require("express").Router();
const { Event, validate } = require("../model/event.js");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find({ userId: req.authUser._id});
    res.send(events);
  } catch (error) {
    res.status(500).send('Internal server error.')
  }
});

router.get("/:id", async (req, res) => {
  let event = await Event.findById(req.params.id);
  if (!event) {
    return res.status(404).send("Event does not exist.");
  }
  res.send(event);
});

router.post("/", async (req, res) => {
  try {
    const { authUser } = req
    let newEvent = {
      title: req.body.title,
      dateTime: new Date(req.body.dateTime),
      remainderStartBefore: req.body.remainderStartBefore,
      description: req.body.description,
      userId: authUser._id
    }
    let { error } = await validate(newEvent);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const event = new Event(newEvent);
    let result = await event.save();
    res.send(result);
  } catch (error) {
    res.status(500).send('Internal server error.')
  }
});

module.exports = router;