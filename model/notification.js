const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  isRead: {
    type: Boolean,
    default: false,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  content: {
    type: String,
    required: true,
  },
  meta: {
    type: mongoose.Schema.Types.Mixed
  }
});

NotificationSchema.statics.createEventNotification = function (event) {
  const newNotification = {
    isRead: false,
    userId: event.userId,
    eventId: event._id,
    content: `Just a reminder that you have an event(${event.title}) coming up.`,
    meta: {...event}
  }
  this.create(newNotification)
}

exports.Notification = mongoose.model("Notification", NotificationSchema);