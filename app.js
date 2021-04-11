const express = require("express");
const pathUser = require("./router/user");
const pathEvent = require("./router/event");
const mongoose = require("mongoose");
const pathLoginUser = require("./router/loginuser");

const app = express();
app.use(express.json());

app.use("/api/user", pathUser);
app.use("/api/event", pathEvent);
app.use("/api/loginuser", pathLoginUser);
mongoose
  .connect("mongodb+srv://rmjimj:rmjim123@cluster0.hex75.mongodb.net/gran", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch(() => console.log("not"));

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`start server ${port}`);
});