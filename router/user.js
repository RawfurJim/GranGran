const router = require("express").Router();
const { User, validate } = require("../model/user.js");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e) {
    res.status(500).send('Internal server error.')
  }
});

router.get("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).send("User does not exist.");
      return;
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send('Internal server error.')
  }
});

module.exports = router;