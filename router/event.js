const router = require("express").Router();
const { Event, validate } = require("../model/event.js");
const { Notification } = require("../model/notification");
const dateFns = require('date-fns')
const scheduler = require("../scheduler")

router.get("/", async (req, res) => {
  try {
    const { month } = req.query
    let query
    console.log(month)
    if (month) {
      const startOfMonth = dateFns.startOfMonth(new Date(month))
      const endOfMonth = dateFns.endOfMonth(new Date(month))
      query = Event.find({
        userId: req.authUser._id,
        dateTime: {$gte: startOfMonth, $lt: endOfMonth}
      })
    } else {
      query = Event.find({ userId: req.authUser._id})
    }
    const events = await query;
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
    const eventDateTime = new Date(req.body.dateTime)
    const reminderStartBefore = +req.body.reminderStartBefore
    let newEvent = {
      title: req.body.title,
      dateTime: eventDateTime,
      reminderStartBefore: req.body.reminderStartBefore,
      reminderStartDateTime: dateFns.sub(eventDateTime, { minutes: reminderStartBefore }),
      description: req.body.description,
      userId: authUser._id
    }
    let { error } = await validate(newEvent);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const event = new Event(newEvent);
    const createdEvent = await event.save();
    scheduler.run(createdEvent, function (e) {
      Notification.createEventNotification(e)
    })
    res.send(createdEvent);
  } catch (error) {
    res.status(500).send('Internal server error.')
  }
});

module.exports = router;