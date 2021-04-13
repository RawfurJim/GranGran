const router = require("express").Router();
const { Notification } = require("../model/notification");

router.get("/", async (req, res) => {
	try {
    	const notifications = await Notification.find({ userId: req.authUser._id});
    	res.send(notifications);
  	} catch (error) {
    	res.status(500).send('Internal server error.')
  	}
});

module.exports = router;