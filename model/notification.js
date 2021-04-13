const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  isRead: {
    type: Boolean,
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
  }
});

exports.Notification = mongoose.model("Notification", NotificationSchema);